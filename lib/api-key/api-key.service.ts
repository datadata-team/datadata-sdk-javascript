import AES from "crypto-js/aes";
import Base64 from "crypto-js/enc-base64";
import Hex from "crypto-js/enc-hex";
import Utf8 from "crypto-js/enc-utf8";
import WordArray from "crypto-js/lib-typedarrays";
import MD5 from "crypto-js/md5";
import CFB from "crypto-js/mode-cfb";
import Pkcs7 from "crypto-js/pad-pkcs7";
import { BaseService } from "../common";

export class APIKeyService extends BaseService {
  public static async encrypt(secretKey: string, payload: string) {
    const iv = WordArray.random(16);
    const key = MD5(secretKey);
    const value = Utf8.parse(payload).clone().concat(MD5(payload));
    // const value = Utf8.parse(payload);

    console.log(value.sigBytes);

    const encrypted = AES.encrypt(value, key, { iv: iv, mode: CFB, padding: Pkcs7 });

    console.log({
      a: MD5(payload),
      b: iv.clone().concat(encrypted.ciphertext),
    });

    return iv.clone().concat(encrypted.ciphertext).toString(Hex);
  }

  public static async decrypt(secretKey: string, ciphertext: string) {
    const key = MD5(secretKey);
    const cipherData = Hex.parse(ciphertext);
    const iv = WordArray.create(cipherData.words.slice(0, 4), 16);
    const data = WordArray.create(cipherData.words.slice(4), cipherData.sigBytes - 16);
    const decrypted = AES.decrypt(data.toString(Base64), key, { iv: iv, mode: CFB });

    console.log({ decrypted });

    return decrypted.toString(Utf8);
  }
}

function CryptJsWordArrayToUint8Array(wordArray: WordArray) {
  const l = wordArray.sigBytes;
  const words = wordArray.words;
  const result = new Uint8Array(l);
  var i = 0 /*dst*/,
    j = 0; /*src*/
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

function hexStringToUint8Array(hexString: string) {
  if (hexString.length % 2 !== 0) {
    throw "Invalid hexString";
  } /*from  w w w.  j  av a 2s  . c  o  m*/
  var arrayBuffer = new Uint8Array(hexString.length / 2);

  for (var i = 0; i < hexString.length; i += 2) {
    var byteValue = parseInt(hexString.substr(i, 2), 16);
    if (isNaN(byteValue)) {
      throw "Invalid hexString";
    }
    arrayBuffer[i / 2] = byteValue;
  }

  return arrayBuffer;
}

function convertUint8ArrayToWordArray(u8Array: Uint8Array): WordArray {
  var words = [],
    i = 0,
    len = u8Array.length;
  while (i < len) {
    words.push((u8Array[i++] << 24) | (u8Array[i++] << 16) | (u8Array[i++] << 8) | u8Array[i++]);
  }
  return WordArray.create(words, u8Array.length);
}
