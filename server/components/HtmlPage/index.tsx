import React, {PropsWithChildren, FunctionComponent, ReactElement} from 'react';

type Props = {
    scripts: Array<ReactElement<unknown>>;
    styles: Array<ReactElement<unknown>>;
    initialState: string;
};

const HtmlPage: FunctionComponent<Props> = ({scripts, styles, children, initialState}: PropsWithChildren<Props>) => (
    <html>
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width,minimum-scale=1,maximum-scale=1,initial-scale=1" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <link rel="shortcut icon" type="image/png" href="/images/favicon.jpg" />
            <title>Baby diary</title>
            {styles}
        </head>
        <body>
            <div id="root">{children}</div>
            <script>window.__INITIAL_STATE__={initialState}</script>
            {scripts}
        </body>
    </html>
);

export default HtmlPage;
