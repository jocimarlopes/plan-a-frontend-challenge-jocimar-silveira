import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  //data state variable
  token_data = {}

  constructor(
    private storage: StorageService
  ) { }

  async set_token_data(data) {
    await this.storage.init()
    await this.storage.set('token_data', data)
    this.token_data = data
  }
  
  // get token_data from storage
  async get_token_data() {
    await this.storage.init()
    const token = await this.storage.get('token_data')
    return token
  }
}
