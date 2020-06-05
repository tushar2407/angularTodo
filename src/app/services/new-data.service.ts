import { Injectable } from '@angular/core';

import {baseUrl} from '../shared/baseUrl';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewDataService {

  constructor(private http:HttpClient) {}
  
  getNewData():Observable<string[]>{
    return this.http.get<string[]>(baseUrl+"newData/")
    .pipe();
  }
  getDoneData():Observable<string[]>{
    return this.http.get<string[]>(baseUrl+"doneData/").pipe();
  }
}
