import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as crypto from 'crypto';
import { buffer } from 'stream/consumers';
import config from '../config';

export class CryptoService {
  static generateRandomNumber(lenght: number) {
    try {
      const numbers = new Array(lenght).map(() => Math.random() * 10);
      return numbers.join();
    } catch (error) {
      throw new Error("Can't generate random number");
    }
  }

  static generateRandomString(size: number, encoding: BufferEncoding = 'hex') {
    try {
      const randomBytes = crypto.randomBytes(Math.floor(size / 2));
      return randomBytes.toString(encoding);
    } catch (error) {
      if (error instanceof TypeError)
        throw new Error('Crypto support is disabled');
      throw new Error("Can't generate random number");
    }
  }

  static encrypt(value: string) {
    const initializationVector = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      this.getCipherAlgorithm(),
      this.getKey(),
      initializationVector,
    );
    let encryptedValue = cipher.update(value);
    encryptedValue = Buffer.concat([encryptedValue, cipher.final()]);
    return {
      encryptedValue: encryptedValue.toString('hex'),
      initializationVector: initializationVector.toString('hex'),
    };
  }

  static decrypt(value: string, initializationVector: string) {
    const decipher = crypto.createDecipheriv(
      this.getCipherAlgorithm(),
      this.getKey(),
      Buffer.from(initializationVector, 'hex'),
    );
    let decryptedValue = decipher.update(value, 'hex');
    decryptedValue = Buffer.concat([decryptedValue, decipher.final()]);
    return decryptedValue.toString();
  }

  private static getHashAlgorithm() {
    return process.env.HASH_FUNCTION || 'sha256WithRSAEncryption';
  }

  static getHash(value: string) {
    const hash = crypto
      .createHmac(this.getHashAlgorithm(), this.getKey())
      .update(value)
      .digest()
      .toString('hex');

    return hash;
  }

  private static getCipherAlgorithm() {
    return process.env.CIPHER_ALGORITM || 'aes256';
  }

  private static getKey() {
    const key = process.env.ENCRYPTION_KEY;
    if (!key) throw new Error('Encryption Key is not configured');
    return key;
  }
}
