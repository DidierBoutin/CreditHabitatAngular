import { AuthService } from './../auth.service';
import { MenuService } from './../menu.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(public menuService: MenuService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public authService: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    // on verifie qu'il y une autorisation en cours
    if (this.authService.isAuth()) {
      /* initialistion du menu courrant en fdonction de l'url*/
      this.menuService.getCurrentMenu(window.location.href, window.location.origin);
    } else {
      /* pas d'autorisation en cours, on va sur le menu de connexion */
      this.router.navigate(['connexion']);
    }
  }

  /* initialisation du menu selectionné apres click sur le bouton */
  selectMenu(name) {
    this.menuService.selectedMenu = name;
  }

  public get isAuth() {
    return this.authService.isAuth();
  }



}
