import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Regroupm } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class RegroupementService {

  listRegroupm: Regroupm[] = [];

  API_URL = 'http://localhost:8080/CreditHabitatBis/CreditHabitat/Regroupement';

  constructor(private http: HttpClient) { }


  getAllRegroupm(): Observable<Regroupm[]> {
    return this.http.get<Regroupm[]>(this.API_URL);
 }


 deleteRegroupm (regroupm: String ) {
  return this.http.delete<Regroupm>(this.API_URL + '/' + regroupm);
}


}
