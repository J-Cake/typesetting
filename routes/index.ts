/// <reference path="../../scriptlet/def.d.ts" />

import {iter} from '@j-cake/jcake-utils/iter';

import {protect} from '../lib/protected.js';
import type {Account} from '../lib/protected.js';

export default protect(function(req: HTTPRequest, user: Account): AsyncIterable<string> {
    console.log(user);

    if (req.method.toUpperCase() == 'GET') {

    }

    return iter.from(['Hi']);
}, async function* (req: HTTPRequest): AsyncGenerator<string> {
    return iter.from(["Welcome. This is where you'll find your dashboard. To proceed, you'll need to log in."]);
});
