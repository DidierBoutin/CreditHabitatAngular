import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Materiel } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class MaterielService {

  API_URL = 'http://localhost:8080/CreditHabitatBis/CreditHabitat/Materiel';


  constructor(private http: HttpClient) { }

  getAllMateriel(): Observable<Materiel[]> {
    return this.http.get<Materiel[]>(this.API_URL);
 }



 deleteMateriel (materiel: String ): Observable<any> {
  return this.http.delete<any>(this.API_URL + '/' + materiel);
}


createMateriel(materiel: Materiel ): Observable<Materiel> {
  return this.http.post<Materiel>(this.API_URL, materiel);
}


updateMateriel(materiel: Materiel ): Observable<Materiel> {
  return this.http.put<Materiel>(this.API_URL , materiel);
}




}
