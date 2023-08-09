import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TestErrorService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  get404Error(){
    return this.http.get(this.baseUrl + 'products/42');
  }

  get500Error(){
    return this.http.get(this.baseUrl + 'buggy/servererror');
  }
  get400Error(){
    return this.http.get(this.baseUrl + 'buggy/badrequest');
  }
  get400ValidationError(){
    return this.http.get(this.baseUrl + 'products/fortytwo');
  }
}
