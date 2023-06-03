import crypto from "crypto";

const generateRandomString = (length: number) => {
  const randomBytes = crypto.randomBytes(length); // 6 bytes = 48 bits of randomness
  const base64 = randomBytes
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
  return base64;
};

export { generateRandomString };
