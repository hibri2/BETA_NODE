import { HttpClient } from '@angular/common/http';
import {Observable, map} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { PlannedReqListModel } from '../pages/plannedreq/home/plannedreq_datamodel.model';

@Injectable({
  providedIn: 'root'
})
export class ttsService {
  private url: string = `${environment.api}`;
  constructor(
    private http: HttpClient
  ) { 
  }

  list(){
    return this.http.get<PlannedReqListModel[]>(this.url + `/tts/`);
  }

  listplannedreq(): Observable<PlannedReqListModel[]>{
    return this.http.get<PlannedReqListModel[]>(`${environment.api}/tts/`);
  }

  getList() {
    return this.http.get(`${environment.api}/tts/`).pipe(
      map((res: any) => Object.values(res))
      )
  }

  plannedreqs(body: any){
    return this.http.post(`${environment.api}/tts/`, body);
  }
}