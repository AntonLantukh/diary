import bcrypt from 'bcrypt';
import process from 'process';

export const generatePassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_LENGTH));
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
};

export const checkPassword = (passwordIncoming: string, passwordSaved: string): Promise<boolean> => {
    return bcrypt.compare(passwordIncoming, passwordSaved);
};
