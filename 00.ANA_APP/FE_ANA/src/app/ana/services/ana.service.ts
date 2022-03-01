import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {EventEmitter, Injectable} from  '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class anaService {
  static anaEmitter = new EventEmitter<boolean>();

  accessToken= '';

  constructor(
    private http: HttpClient
    ) { 
    }
  user(){
    return this.http.get(`${environment.api}/ana/user`);
  }

  register(body: any){
    return this.http.post(`${environment.api}/ana/register`, body);
  }

  login(body: any){
    return this.http.post(`${environment.api}/ana/login`, body);
  }

  authenticatorLogin(body: any){
    return this.http.post(`${environment.api}/ana/two-factor`, body, {withCredentials: true});
  }

  refresh() {
    return this.http.post(`${environment.api}/ana/refresh`, {}, {withCredentials: true});
  }

  logout() {
    return this.http.post(`${environment.api}/ana/logout`, {}, {withCredentials: true});
  }
}