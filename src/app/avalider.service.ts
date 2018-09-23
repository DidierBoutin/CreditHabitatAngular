import { Declarer, AvaliderBoxRow } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvaliderService {

  constructor(private http: HttpClient) {}


  API_URL_DON = 'http://localhost:8080/CreditHabitatBis/CreditHabitat/Donnees/';
  API_URL_DECL = 'http://localhost:8080/CreditHabitatBis/CreditHabitat/Declarer/';
  API_URL_REGRPT = 'http://localhost:8080/CreditHabitatBis/CreditHabitat/Regroupement/';



  // La fonction renvoie une liste d'objet {codeRegroupMat : String, libelleRegroupMat: String} defini par le back,
  // Json definit automatiquement une liste de cet objet, on peut utiliser les 2 attributs sans les declarer
  getAvaliderNamesRegr(): Observable<any> {
    return this.http.get<any>(this.API_URL_REGRPT);
 }

  getAvaliderBox(): Observable<AvaliderBoxRow[]> {
     return this.http.get<AvaliderBoxRow[]>(this.API_URL_DON + '/AvaliderBox');
  }

  getAvaliderList(soc: String, an: number, trim: number ): Observable<any> {
     console.log(this.API_URL_DON +  soc + '/' + an + '/' + trim);
    return this.http.get<any>(this.API_URL_DON +  soc + '/' + an + '/' + trim);
 }

 saveAvalider(soc: String, an: number, trim: number ): Observable<any> {
 console.log('post ' + this.API_URL_DECL +  soc + '/' + an + '/' + trim);
  return this.http.post<any>(this.API_URL_DECL +  soc + '/' + an + '/' + trim , null);
 }

 deleteAvalider(soc: String, an: number, trim: number): Observable<any> {
  console.log('del ' + this.API_URL_DECL +  soc + '/' + an + '/' + trim);

  return this.http.delete<any>(this.API_URL_DON +  soc + '/' + an + '/' + trim );
 }
}
