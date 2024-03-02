// db.ts
import Dexie from 'dexie';
import type { Table } from 'dexie';
import type { SenderPayload } from './sender';



export class MyTags extends Dexie {
  tags!: Table<{enc:string}>; 

  constructor() {
    super('irl-tags-2.1');
    this.version(1).stores({
      tags: '++id' // Primary key and indexed props
    });
  }
}

export const db = new MyTags();