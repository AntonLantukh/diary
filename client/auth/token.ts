class AccessTokenManager {
    accessToken = '';

    getAccessToken() {
        return this.accessToken;
    }

    getDecodedToken() {
        return btoa(String(this.accessToken));
    }

    setAccessToken(accessToken: string) {
        this.accessToken = accessToken;
    }

    ereaseAccessToken() {
        this.accessToken = '';
    }
}

export default new AccessTokenManager();
