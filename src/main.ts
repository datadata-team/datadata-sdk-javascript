import { APIKeyService } from "@lib";

const KEY = "500c33c5485e4d7eb5c89dd8f33084dc";

async function b() {
  const token = await APIKeyService.encrypt(KEY, `{"uid":"abc","host":"www.example.com","expired":1710313863}`);
  console.log(token);

  const result = await APIKeyService.decrypt(
    "500c33c5485e4d7eb5c89dd8f33084dc",
    "1c67be15cb6a3be5a9b86dffca7f348f.b5ceadf998cbca486c0e089c65a76a6440643977aa2f8ac8f279f4f437977f0df597e3a4e5316728b7aa2d6a5793f852bd221fcca183a22131"
  );
  console.log({ result });
}

async function c() {
  const encoder = new TextEncoder();

  const key = new CryptoKey();
  crypto.subtle.encrypt(
    {
      name: "AES-CFB",
    },
    key,
    encoder.encode("abc")
  );
}

async function main() {
  b();
  // c();
}

main().catch((err) => console.error(err));
