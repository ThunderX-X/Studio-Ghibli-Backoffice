import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as crypto from 'crypto';
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

  static generateRandomString(size: number) {
    try {
      const randomBytes = crypto.randomBytes(Math.floor(size / 2));
      return randomBytes.toString('hex');
    } catch (error) {
      if (error instanceof TypeError)
        throw new Error('Crypto support is disabled');
      throw new Error("Can't generate rando7m number");
    }
  }

  static getHash(value: string) {
    const hash = crypto
      .createHmac('sha256WithRSAEncryption', this.getKey())
      .update(value)
      .digest()
      .toString('hex');

    return hash;
  }

  private static getKey() {
    return process.env.ENCRYPTION_KEY;
  }
}
