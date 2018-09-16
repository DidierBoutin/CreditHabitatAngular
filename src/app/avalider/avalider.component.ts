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
  totalOfSelecting: string;

  listSoc: String[];
  listAn: number[];
  listTrim: number[];
  listbox: any[];
  data: any[];


  // using by ng2-smart table to set parameter
  settings: any;

  constructor(public avaliderService: AvaliderService) { }

  ngOnInit() {

    this.avaliderService.getAvaliderBox().subscribe(
      (box: AvaliderBoxRow[]) => {

        /* sauvegarde de la liste */
        this.listbox = box;

        /* on fait la liste pour chacun des 3 imput  :
        /* recup de la colonne corresponsante via un map, on elimine les doublons via filtre, et on trie si besoin (soc déjà trié)*/
        this.listSoc = box.map(x => x.societe).filter(function (item, index, arr) { return arr.indexOf(item) === index; });
        this.listAn = box.map(x => x.annee).filter(function (item, index, arr) { return arr.indexOf(item) === index; }).sort();
        this.listTrim = box.map(x => x.trimestre).filter(function (item, index, arr) { return arr.indexOf(item) === index; }).sort();

        /* init des 3 imput avec les 3 valeurs de la première ligne recupéree */
        this.selectedSoc = box[0].societe;
        this.selectedAn = box[0].annee;
        this.selectedTrim = box[0].trimestre;

      },
      /* gstion en cas d'erreur acces à la base*/
      (error) => { },

      /* ici on a recupéré les selection des box par défaut ,
      on peut souscrire pour rechercher  la liste principale de l'écran a valider suivant les 3 critères par défaut*/
      () => {
        this.getListAvalider();
      }


    );



  }

  public getListAvalider() {

    this.avaliderService.getAvaliderList(this.selectedSoc, this.selectedAn, this.selectedTrim).subscribe(

      (data) => {

        this.data = data;
        this.source = new LocalDataSource(data);

      },

      (error) => { console.log('err'); },
      () => {


        if (this.data.length === 0) {
          this.totalOfSelecting = '0,00 €';
        } else {
          this.totalOfSelecting =
            Intl.NumberFormat('fr-fr', { style: 'currency', currency: 'EUR' })
                .format(this.listbox.find(elt => (elt.societe === this.selectedSoc)
                                                && (elt.annee === this.selectedAn)
                                                && (elt.trimestre === this.selectedTrim))
                .total);
        }

        this.formatSetting();

      }
    );
  }


  public validation() {

  }

  public changeBoxes() {

    this.getListAvalider();



  }


  // setting ng2smarttable
  formatSetting(): void {

    this.settings = {


      // activer ou non les actions
      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      noDataMessage: 'Auncun regroupement, veuillez vérifier les critères de sélection (société, année, trimestre)',
      setPaging: true,
      pager: {
        perPage: 20,
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
          valuePrepareFunction:
            (value) => {
              return Intl.NumberFormat('fr-fr', { style: 'currency', currency: 'EUR' }).format(value);
            },
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
          valuePrepareFunction:
            (value) => {
              return Intl.NumberFormat('fr-fr', { style: 'currency', currency: 'EUR' }).format(value);
            },
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
              return Intl.NumberFormat('fr-fr', { style: 'currency', currency: 'EUR' }).format(value);
            },
          editable: false,
          sort: true,
          width: '10%',
          filter: true,
          type: 'number',

        },
      },
    };
  }




}
