import * as bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
  if (!password) throw new Error('password is undefinded');
  const saltRounds = 10;
  const encryptedPass = await bcrypt.hash(password, saltRounds);
  return encryptedPass;
};

const comparePass = async (
  password: string,
  hashedPass: string
): Promise<boolean> => {
  if (!password || !hashedPass)
    throw new Error('password and hashedPass must be provided');
  const isMatched = await bcrypt.compare(password, hashedPass);
  return isMatched;
};

export { hashPassword, comparePass };
