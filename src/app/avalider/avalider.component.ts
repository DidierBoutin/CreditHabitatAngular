import { map } from 'rxjs/operators';
import { AvaliderBoxRow, Societe } from './../interfaces';
import { LocalDataSource } from 'ng2-smart-table';
import { Component, OnInit } from '@angular/core';
import { AvaliderService } from '../avalider.service';

@Component({
  selector: 'app-avalider',
  templateUrl: './avalider.component.html',
  styleUrls: ['./avalider.component.css']
})
export class AvaliderComponent implements OnInit {

  // data list of ng2-smart table
source: LocalDataSource;


selectedSoc: string;
selectedAn: number;
selectedTrim: number;


listSoc: String[];
listAn: number[];
listTrim: number[];

// using by ng2-smart table to set parameter
settings: any;

  constructor(public avaliderService: AvaliderService) { }

  ngOnInit() {

    this.avaliderService.getAvaliderBox().subscribe(
      (box: AvaliderBoxRow[]) => {

        /* on fait la liste pour chacun des 3 imput  :
        /* recup de la colonne via un map, puis on elimine les doublons via filtre */
        this.listSoc = box.map(x => x.societe).filter(function(item, index, arr) {return arr.indexOf(item) === index; });
        this.listAn = box.map(x => x.annee).filter(function(item, index, arr) {return arr.indexOf(item) === index; }).sort();
        this.listTrim = box.map(x => x.trimestre).filter(function(item, index, arr) {return arr.indexOf(item) === index; }).sort();

        /* init des 3 imput avec les 3 valeurs de la première ligne recupére */
        this.selectedSoc = box[0].societe;
        this.selectedAn = box[0].annee;
        this.selectedTrim = box[0].trimestre;
      },
      /* gestion en cas d'erreur acces à la base*/
       ( error) => { },

      /* ici on a recupéré les selection des box par défaut ,
      on peut souscrire pour rechercher  la liste des montants*/
      () => { this.avaliderService.getAvaliderList(this.selectedSoc, this.selectedAn, this.selectedTrim).subscribe(

        (data) => {

        this.source = new LocalDataSource(data);
        console.log('data');

        console.log(data);

        this.formatSetting();
        }

      );


      }


    );



  }



  public changeBoxes() {
     console.log(this.selectedSoc);
    console.log(this.selectedAn);
    console.log(this.selectedTrim);

  }


 // setting ng2smarttable
 formatSetting(): void {

  this.settings = {


  // activer ou non les actions
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      columnTitle: '',
      },
    setPaging: true,
    pager: {
      perPage:  20,
      display: true,
    },

    // list of columns :
    columns: {
      departement: {
        title: 'Département',
        editable: false,
        sort: true,
        width: '5%',
        filter: true,
        },
        codePTT: {
          title: 'Num Departement',
          editable: false,
          sort: true,
          width: '5%',
           filter: true,
        },
        nbDossRg1: {
        title: 'Nombre Dossier Reg 1    ',
        editable: false,
        width: '5%',
        filter: true,
        type: 'number',
      },
      mtRg1: {
        title: 'Total montant Reg 1   ',
        editable: false,
        width: '5%',
        filter: true,
        type: 'number',
      },
      nbDossRg2: {
        title: 'Nombre Dossier Reg 2    ',
        editable: false,
        width: '5%',
        filter: true,
        type: 'number',
      },
      mtRg2: {
        title: 'Total montant Reg 2   ',
        editable: false,
        width: '5%',
        filter: true,
        type: 'number',
      },

      mtTot: {
        title: 'Total',
        /* du montant en devise euro */
        valuePrepareFunction:
        (value) => {
         return Intl.NumberFormat('fr-fr', {style: 'currency', currency: 'EUR'}).format(value); } ,
        editable: false,
        sort: true,
        width: '10%',
        filter: false,
        type: 'number',

      },
    },
  };
}




}
