import { Injectable } from '@angular/core';

import {baseUrl} from '../shared/baseUrl';
import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class NewDataService {

  constructor(private http:HttpClient) {}
  httpHeader=new HttpHeaders({'Content-Type':'application/json'});
  getNewData():Observable<any>{
    return this.http.get<any>(baseUrl+"newData/")
    .pipe();
  }
  getDoneData():Observable<string[]>{
    return this.http.get<string[]>(baseUrl+"doneData/").pipe();
  }
  postData(task : any):Observable<any>{
    // const httpOptions={
    //   headers:new HttpHeaders({
    //     'Content-type':'application/json',
    //   })
    // };
    //console.log(typeof (task));
    //body : any;
    //const body=encodeURI(JSON.stringify(task));
    //return this.http.post<any[]>(baseUrl, task,{headers:this.httpHeader});
    //return this.http.put<any>(baseUrl+'newData/',task,{headers:this.httpHeader});
    const body={name:task.name};
    console.log(task.name);
    return this.http.post(baseUrl+"newData/",body,{headers:this.httpHeader});
  }
}
