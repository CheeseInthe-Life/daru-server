import bcrypt from 'bcrypt';

export const hasing = async ({
  plainText,
}: {
  plainText: string;
}): Promise<string> => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(plainText, salt);
};

export const compareHash = async ({
  planText,
  hash,
}: {
  planText: string;
  hash: string;
}): Promise<boolean> => {
  return bcrypt.compare(planText, hash);
};
