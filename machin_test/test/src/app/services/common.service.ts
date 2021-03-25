import { Injectable } from '@angular/core';
import { getLocaleDateFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) {
  
   }
   //getting data by using get Method
  
   getData(){
    return this.http.get<any>(environment.GetData);
   }

}
