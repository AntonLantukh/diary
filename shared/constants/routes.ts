export const PRIVATE_ROUTE = {
    cabinet: '/caibent',
} as const;

export const PUBLIC_ROUTE = {
    main: '/main',
    auth: '/auth',
    about: '/about',
} as const;

export const API_ROUTE = {
    signUp: '/api/auth/sign-up',
    signIn: '/api/auth/sign-in',
    signOut: '/api/auth/sign-out',
    refreshToken: '/api/auth/refresh-token',
    user: 'api/user',
    locale: 'api/locale',
} as const;
