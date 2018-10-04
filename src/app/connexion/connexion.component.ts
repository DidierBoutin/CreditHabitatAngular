import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, HostListener  } from '@angular/core';
import { AuthService } from './../auth.service';
import { KEY_CODE} from './../interfaces';





@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {


  public uid = '';
  public mdp = '';
  public  messageError: String = null;

  private tabError: String[] =
  [
    'ok',
    'Utilisateur non autorisé',
    'Utilistaur inconnu',
    'Mauvais mot de passe',
    'Saissez votre UID',
    'Saissez le mot de passe'
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private  route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.authService.logout();
  }


/*  declencher authorisation si l'utilisateur à appuyer sur enter*/
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
     if (event.keyCode === KEY_CODE.ENTER) {
      this.verifHabil();
    }
  }



/* verifier habilitation */
  public verifHabil() {
    if (this.authService.auth(this.uid, this.mdp) === 0) {
      this.messageError = null;
      this.router.navigate(['anomalie']);

    } else {
      this.messageError = this.tabError[this.authService.auth(this.uid, this.mdp)];
    }
  }
}
