import { Declarer } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvaliderService {

  constructor(private http: HttpClient) {}


  API_URL = 'http://localhost:8080/CreditHabitatBis/CreditHabitat/Avalider';


  getAllAnomalie(): Observable<Declarer[]> {
     return this.http.get<Declarer[]>(this.API_URL);
  }
}
