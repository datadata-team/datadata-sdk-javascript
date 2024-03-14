import { test } from "vitest";
import { decrypt, encrypt } from "./crypto";

test("encrypt and decrypt", async (t) => {
  const key = "500c33c5485e4d7eb5c89dd8f33084dc";
  const data = `{ "uid": "001", "host": "www.example.com", "expired": 1741918889 }`;
  const encrypted = await encrypt(key, data);
  const decrypted = await decrypt(key, encrypted);
  t.expect(decrypted).toEqual(data);
});
