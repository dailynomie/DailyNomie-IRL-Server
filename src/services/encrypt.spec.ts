
import { assert, expect, test } from 'vitest'
import { decrypt, decryptObject, encrypt, encryptObject } from './encrypt';

const key = '1234';

test("Encryption", ()=>{
  const start = "hello there this is a longer string I hope that you like it.";
  const encrypted = encrypt(start, key);
  console.log({encrypted});
  const decrypted = decrypt(encrypted, key);
  expect(decrypted).toBe(start);
})

test('encryption of an object', ()=>{

  const obj = { name: "Tester", age: '44' };
  const enc = encryptObject(obj, key);
  const decrypted = decryptObject(enc, key);
  expect(decrypted.name).toBe('Tester');

})

