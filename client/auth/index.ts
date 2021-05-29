import {signUpUser, signInUser, getUpdatedToken, SignInUserArgs, SignUpUserArgs} from 'shared/resolvers/auth';

class AuthService {
    accessToken: string | null = null;

    async signIn(args: SignInUserArgs) {
        const reponse = await signInUser(args);
    }

    signOut(accessToken: string) {
        this.accessToken = accessToken;
    }
}

export default new AuthService();
