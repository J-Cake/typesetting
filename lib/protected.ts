/// <reference path="../../scriptlet/def.d.ts" />

import crypto from 'node:crypto';
import {promises as fs} from 'node:fs';
import os from 'node:os';
import DB from '@j-cake/jcake-utils/db';
import { iter } from '@j-cake/jcake-utils/iter';

export type User = {
    name: string,
    email: string,
    token: string,
}

export type Account = {
    user: {
        name: string,
        email: string,
        password: string
    },
    documents: Record<string, string[]>
};
export let db: DB<Record<number, Account>>;

const IDMap: Map<string, () => Nullable<number>> = new Map(); // store a map of all active user tokens which resolve to user IDs

export type HTTPResponse = AsyncIterable<Buffer | string> | Iterable<Buffer | String>;
export type HTTPHandler<Extra extends any[] = []> = (ans: HTTPRequest, ...extra: Extra) => HTTPResponse | Promise<HTTPResponse>;
export function protect(wrapper: HTTPHandler<[user: Account]>, onFail?: HTTPHandler): HTTPHandler {
    return async function(req: HTTPRequest): Promise<HTTPResponse> {
        const token = [...(req.getHeader('bearer') ?? req.getHeader('auth-token') ?? '')].join('');

        const userId = IDMap.get(token);

        if (!token || !userId)
            if (!onFail) {
                req.status(401)
                    .header('content-type', 'text/plain');

                return iter.from(['No, or invalid token provided']);
            } else
                return onFail(req);

        const id = userId();
        
        if (!id)
            if (onFail)
                return onFail(req);
            else {
                req.status(401)
                    .header('content-type', 'text/plain');

                return iter.from(['Invalid token']);
            }
            
        if (!db) {
            const dbLocation = process.env.DB ?? `${os.homedir()}/data/typesetting_users.db`;
            const db = await DB.load(await fs.open(dbLocation));
        }
        
        const user = await db.getAll([id]);
        if (user)
            return wrapper(req, user);

        else
            if (onFail)
                return onFail(req);
            else {
                req.status(404)
                    .header('content-type', 'text/plain');

                return iter.from(['Not authenticated']);
            }
    }
}
