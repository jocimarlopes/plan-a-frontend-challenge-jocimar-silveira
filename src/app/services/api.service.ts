import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment'
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
  ) { }

  // get method
  get(url) {
    return this.http.get(`${environment.api_url + url}?api_key=${environment.api_key}`).map((res) => res);
  }

  // post method
  post(url, data) {
    return this.http.post(`${environment.api_url + url}?api_key=${environment.api_key}`, JSON.stringify(data), this.httpOptions).map((res) => res);
  }

  // delete method
  delete(url, body) {
    const options = {
      ...this.httpOptions,
      body: JSON.stringify(body)
    }
    return this.http.delete(`${environment.api_url + url}?api_key=${environment.api_key}`, options).map((res) => res);
  }

  //get token with api key
  getToken() {
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
