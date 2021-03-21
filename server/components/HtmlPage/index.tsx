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
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon" />
            <title>Baby o diary</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            {styles}
        </head>
        <body>
            <div id="root">{children}</div>
            <script
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
