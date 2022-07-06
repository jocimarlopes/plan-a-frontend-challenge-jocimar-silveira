import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  tokenData
  constructor(
    private storage: Storage
  ) {
    this.init()
  }

  /**
   * Init storage
   */
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    
  }

  /**
   * set values to storage
   */
  async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  /**
   * Clear All Data
   * Deletar os dados
   */
  async clear() {
    await this._storage?.clear();
  }

  /**
   * get value from storage
   * await this.storage.get('user');
   */
  get(key: string) {
    return this._storage?.get(key);
  }
}
