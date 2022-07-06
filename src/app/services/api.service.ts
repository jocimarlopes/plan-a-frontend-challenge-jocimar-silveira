import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment'
import 'rxjs/add/operator/map';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private storage: StorageService
    ) { }

  // get method
  get(url) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http.get(`${environment.api_url + url}?api_key=${environment.api_key}`).map((res) => res);
  }

  // post method
  post(url, data) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http.post(`${environment.api_url + url}?api_key=${environment.api_key}`, JSON.stringify(data), httpOptions).map((res) => res);
  }

  //get token with api key
  get_token() {
    return new Promise(resolve => {
      this.http.get(`${environment.api_url}authentication/token/new?api_key=${environment.api_key}`)
        .map(res => res)
        .subscribe((data: any) => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
}
