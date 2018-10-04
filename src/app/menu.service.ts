import { Menu } from './menu';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() {
    this.selectedMenu = this.menu[0];

  }
  public selectedMenu: Menu;

  menu: Menu[] = [

    {
      'id': 0,
      'name': 'Anomalies',
      'icone': 'clear',
      'color': 'red',
      'position': 'header',
      'path': '/anomalie',
    },
    {
      'id': 1,
      'name': 'A valider',
      'icone': 'search',
      'color': 'blue',
      'position': 'header',
      'path': '/avalider',
    },
    {
      'id': 2,
      'name': 'Validés',
      'icone': 'check_circle',
      'color': 'green',
      'position': 'header',
      'path': '/valides',
    },
    {
      'id': 3,
      'name': 'Parametrage',
      'icone': 'settings',
      'color': 'orange',
      'position': 'header',
      'path': '/parametrage',
    },

  ];

  /* retourne une liste de menu correspondant à la position en parmetre*/
  getList(position): Menu [] {
    return this.menu.filter(item => item.position === position);
  }


  /* initialiser le menu courant en fonction du chemin de l'url en parametre */
  getCurrentMenu(curPath, origin) {
      const m = this.menu.find(elt => origin + elt.path === curPath );
       this.selectedMenu =  ( m  ?   m : this.menu[0] );
  }


}
