import helmet from 'helmet';

export default (): Record<string, unknown> => ({
    crossOriginResourcePolicy: {policy: 'same-site'},
    hsts: {
        maxAge: 15552000,
        includeSubDomains: true,
        preload: false,
    },
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            'script-src': ["'self'", (req: Request) => `'nonce-${req.cspNonce}'`],
            'connect-src': [__IS_PRODUCTION__ ? "'self'" : '*'],
        },
    },
});
