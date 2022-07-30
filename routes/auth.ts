/// <reference path="../../def.d.ts" />

import {iter} from '@j-cake/jcake-utils/iter';

export default function (req: HTTPRequest): AsyncIterable<string> {
    req
        .status(200)
        .header('content-type', 'text/html');

    console.log('hi')

    if (req.url.searchParams.get('req') == 'signup')
        return iter.from([`
            <html>
                <head>

                </head>
                <body>
                    <form action="./" method="post">
                        <input type="text" name="name"/>
                        <input type="email" name="email"/>
                        <input type="password" name="password"/>
                        <button>Ok</button>
                    </form>
                </body>
            </html>
        `]);
    else
        return iter.from([`
            <html>
                <head>

                </head>
                <body>
                    <form action="./" method="get">
                        <input type="email" name="email"/>
                        <input type="password" name="password"/>
                        <button>Ok</button>
                    </form>
                </body>
            </html>
        `]);

}
