import React, {PropsWithChildren, FunctionComponent, ReactElement} from 'react';

type Props = {
    scripts: Array<ReactElement<unknown>>;
    styles: Array<ReactElement<unknown>>;
    initialState: string;
    nonce: string;
    children: ReactElement;
};

const HtmlPage: FunctionComponent<Props> = ({
    scripts,
    styles,
    children,
    initialState,
    nonce,
}: PropsWithChildren<Props>) => (
    <html>
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <title>Baby story</title>
            <meta name="description" content="Build your baby timeline" />
            <link rel="icon" href="./icons/favicon.ico?v=1.1" />
            <link rel="manifest" href="./manifest.json" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            {styles}
        </head>
        <body>
            <div id="root">{children}</div>
            <script
                nonce={nonce}
                defer
                dangerouslySetInnerHTML={{
                    __html: `window.__INITIAL_STATE__=${initialState}`,
                }}
            />
            {scripts}
        </body>
    </html>
);

export default HtmlPage;
