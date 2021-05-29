class AccessTokenService {
    accessToken: string | null = null;

    getAccessToken() {
        return this.accessToken;
    }

    setAccessToken(accessToken: string) {
        this.accessToken = accessToken;
    }

    ereaseAccessToken() {
        this.accessToken = null;
    }
}

export default new AccessTokenService();
