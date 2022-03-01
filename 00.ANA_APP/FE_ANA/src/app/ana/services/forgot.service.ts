import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class forgotService {

  constructor(
    private http: HttpClient
    ) {
    }

  forgotpassword(body: any){
    return this.http.post(`${environment.api}/ana/forgotpassword`, body);
  }

  resetpassword(body: any){
    return this.http.post(`${environment.api}/ana/resetpassword`, body);
  }
}