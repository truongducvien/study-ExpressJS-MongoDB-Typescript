import * as bcrypt from 'bcrypt';

const hashKey = async (key: string): Promise<string> => {
  if (!key) throw new Error('Input key is undefinded');
  const saltRounds = 10;
  const encryptedPass = await bcrypt.hash(key, saltRounds);
  return encryptedPass;
};

const compareKey = async (key: string, hashedKey: string): Promise<boolean> => {
  if (!key || !hashedKey)
    throw new Error('Key and hashed key must be provided');
  const isMatched = await bcrypt.compare(key, hashedKey);
  return isMatched;
};

export { hashKey, compareKey };
