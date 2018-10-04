import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor() { }


  public auth(login: string, mdp: string): number {

   /* === SIMUMATION SERVICE PH AUTHORISATION === */
    /*** appel en dur, a remplacer par le service pp */

   let codeRetour = 0;

  switch (1 === 1) {

    /* ok ==> svgde du login en sessionstorage*/
     case (((login === '405667') && (mdp === '405667'))):
     codeRetour = 0;
     sessionStorage.setItem('login', login);
     break;

    /* login non saisi */
      case (!login) : codeRetour = 4; break;

      /* mdp non saisi */
      case (!mdp) : codeRetour = 5; break;

    /* utilisateur ok mais sans droit */
      case ((login === '405668') && (mdp === '405668')): codeRetour = 1; break;
    /* utilisateur inconnu */
      case ((login !== '405667') && (login !== '405668') && (login === mdp)): codeRetour = 2; break;
    /* mauvais mot de passe */
      case (login !== mdp): codeRetour = 3; break;
    }
    return codeRetour;

  }
  public logout() {
  sessionStorage.removeItem('login');
  }

  public isAuth() {
    console.log('login');
    console.log(sessionStorage.getItem('login'));
   return sessionStorage.getItem('login') !== null;
  }


}

