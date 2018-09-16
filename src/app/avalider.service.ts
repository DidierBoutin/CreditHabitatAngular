import { Declarer, AvaliderBoxRow } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvaliderService {

  constructor(private http: HttpClient) {}


  API_URL = 'http://localhost:8080/CreditHabitatBis/CreditHabitat/Declarer/';


  getAvaliderBox(): Observable<AvaliderBoxRow[]> {
     return this.http.get<AvaliderBoxRow[]>(this.API_URL + '/AvaliderBox');
  }

  getAvaliderList(soc: String, an: number, trim: number ): Observable<any> {

    console.log('this.API_URL');

    console.log(this.API_URL +  soc + '/' + an + '/' + trim);

    return this.http.get<any>(this.API_URL +  soc + '/' + an + '/' + trim);
 }
}
