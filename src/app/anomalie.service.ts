import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalDataSource } from 'ng2-smart-table';
import { Injectable } from '@angular/core';
import { Anomalie } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class AnomalieService {

API_URL = 'http://localhost:8080/CreditHabitatBis/CreditHabitat/Anomalie';

  constructor(private http: HttpClient) {}

  getAllAnomalie(): Observable<Anomalie[]> {
     return this.http.get<Anomalie[]>(this.API_URL);
  }


}
