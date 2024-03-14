import AES from "crypto-js/aes";
import Base64 from "crypto-js/enc-base64";
import Hex from "crypto-js/enc-hex";
import Utf8 from "crypto-js/enc-utf8";
import WordArray from "crypto-js/lib-typedarrays";
import MD5 from "crypto-js/md5";
import CFB from "crypto-js/mode-cfb";
import Pkcs7 from "crypto-js/pad-pkcs7";

export async function encrypt(secretKey: string, payload: string) {
  const iv = WordArray.random(16);
  const key = MD5(secretKey);
  const value = Utf8.parse(payload).clone().concat(MD5(payload));
  const encrypted = AES.encrypt(value, key, { iv: iv, mode: CFB, padding: Pkcs7 });
  return iv.clone().concat(encrypted.ciphertext).toString(Hex);
}

export async function decrypt(secretKey: string, encrypted: string) {
  const key = MD5(secretKey);
  const cipherData = Hex.parse(encrypted);
  const iv = WordArray.create(cipherData.words.slice(0, 4), 16);
  const data = WordArray.create(cipherData.words.slice(4), cipherData.sigBytes - 16);
  const decrypted = AES.decrypt(data.toString(Base64), key, { iv: iv, mode: CFB, padding: Pkcs7 });
  const dataPart = WordArray.create(decrypted.words.slice(0, -4), decrypted.sigBytes - 16);
  const hashPart = uint8ArrayToWordArray(wordArrayToUint8Array(decrypted).slice(decrypted.sigBytes - 16));
  const result = dataPart.toString(Utf8);

  if (MD5(result).toString(Hex) !== hashPart.toString(Hex)) {
    throw new Error("checksum invalid");
  }
  return result;
}

function wordArrayToUint8Array(wordArray: WordArray) {
  const l = wordArray.sigBytes;
  const words = wordArray.words;
  const result = new Uint8Array(l);
  var i = 0,
    j = 0;
  while (true) {
    // here i is a multiple of 4
    if (i == l) break;
    var w = words[j++];
    result[i++] = (w & 0xff000000) >>> 24;
    if (i == l) break;
    result[i++] = (w & 0x00ff0000) >>> 16;
    if (i == l) break;
    result[i++] = (w & 0x0000ff00) >>> 8;
    if (i == l) break;
    result[i++] = w & 0x000000ff;
  }
  return result;
}

function uint8ArrayToWordArray(u8Array: Uint8Array) {
  var words = [],
    i = 0,
    len = u8Array.length;
  while (i < len) {
    words.push((u8Array[i++] << 24) | (u8Array[i++] << 16) | (u8Array[i++] << 8) | u8Array[i++]);
  }
  return WordArray.create(words, u8Array.length);
}
