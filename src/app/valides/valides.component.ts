import { map } from 'rxjs/operators';
import { AvaliderBoxRow, Societe, Departement } from './../interfaces';
import { LocalDataSource } from 'ng2-smart-table';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { AvaliderService } from '../avalider.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogModule } from '@angular/material';

// /*pour le dialogue avec la pop up */
export interface DialogData {
  soc: String;
  an: number;
  trim: number;
}



@Component({
  selector: 'app-valides',
  templateUrl: './valides.component.html',
  styleUrls: ['./valides.component.css'],
})
export class ValidesComponent implements OnInit {

  // data list of ng2-smart table
  source: LocalDataSource;

  // Svgde des criteres selectionnés
  selectedSoc: string;
  selectedAn: number;
  selectedTrim: number;

  // svde du total pour les criteres selectionnés
  totalOfSelecting: string;

  // svgde le la liste de toutes les combinaisons possibles des 3 criters(soc, an, trim)
  listbox: any[];
  // svgde le la liste des critères possibles pour chacun des 3
  listSoc: String[];
  listAn: number[];
  listTrim: number[];

  // using by ng2-smart table to set parameter
  settings: any;
  dataList: any[];
  dataEss: any[];


  totalRows: any;

  // nom des regroupements de credit,  pour le nom des colonnes
  regroupName: String[] = [];

  nbColReg: number;


  constructor(public avaliderService: AvaliderService) { }

  ngOnInit() {

    /* recherche des valeurs 3 criteres possibles  */
    this.prepareScreen();

  }



  prepareScreen() {



    // on recupere les code regroupement pour les mettre en titre des colonnes du tableau
    this.avaliderService.getAvaliderNamesRegr().subscribe(
      (data => {
        for (let i = 0; i < data.length; i++) {
          this.regroupName[i] = data[i].codeRegroupMat;
        }




        this.avaliderService.getValidesBox().subscribe(
          (box) => {

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
            this.getListValides();
          }
        );
      }
      ),
      (error) => { },
      () => { }

    );

  }



  coucou() {
    console.log('coucou');
 //  this.source.setFilter([{ field: 'departement', search: 'AIN'}]);
    // this.source.getFilteredAndSorted().then((d) => console.log(d.map(x => x.mtRg2).reduce((cumul, current) => cumul + current )));
    // this.source.getElements().then((d) => console.log(d.map(x => x.mtRg2).reduce((cumul, current) => cumul + current )));

    // this.source.getFilteredAndSorted().then((d) => console.log(d.map(x => x.codeMat)));
    console.log(this.source.count());

  }

  /* pour une nouvelle selection, on reaffiche la liste principale */
  public changeBoxes() {
    this.getListValides();
  }

  /*recuperation des donnes pour affichage sur liste principam*/
  public getListValides() {

    this.avaliderService.getValideList(this.selectedSoc, this.selectedAn, this.selectedTrim).subscribe(
      (data) => {
        if (data.length !== 0) {

        /* transformer la data pour qu'elle soit lisible via ng2-smart-table via dataTovalides */
          this.dataList = this.dataToValides(data);
const dataEssz =  this.dataList.map(x => x.mtRg1 + x.mtRg2 + x.mtRg3 + x.mtRg4);
         console.log( dataEssz);

        const  mt  =  dataEssz.reduce( (a , b) => a + b);
         console.log( mt);

        //  reduce((cumul, current) => cumul + current));


      } else {this.dataList = [];
              this.nbColReg = 0;
            }

      this.source = new LocalDataSource(this.dataList);
      console.log('ici');
      console.log(this.source.getFilteredAndSorted());

console.log(this.source.getFilteredAndSorted().then(d => this.dataEss = d));
console.log(this.dataEss);

    },

      (error) => { console.log('err'); },

      /*ici on a recuperer toutes les donnees, on peut les affichier*/
      () => {
        if (this.dataList.length === 0) {
          this.totalOfSelecting = '0,00 €';
        } else {
          this.totalOfSelecting =
            Intl.NumberFormat('fr-fr', { style: 'currency', currency: 'EUR' })
              .format(this.listbox.find(elt => (elt.societe === this.selectedSoc)
                && (elt.annee === this.selectedAn)
                && (elt.trimestre === this.selectedTrim))
                .total);
        }
        /* formattage de Ng2-smart-table */
        this.formatSetting();


      }
    );
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
      noDataMessage: '',
      setPaging: true,
      pager: {
        perPage: 20,
        display: true,
      },

      // list of columns :
      columns: {
        departement: {
          title: 'Libellé département',
          editable: false,
          sort: true,
          width: '16%',
          filter: true,
        },
        codePTT: {
          title: 'Département',
          editable: false,
          sort: true,
          width: '4%',
          filter: true,
        },
      },
    };

    /* ajout des colonnes nb dossiers et mt en dynamique */
    this.addColumsNbDossMt();
  }



  addColumsNbDossMt() {

    // Boucle pour inserer  les colonnes nbDoss et mt  au setting
    for (let i = 0; i < this.nbColReg; i++) {

      const  k = i + 1;
      const nameColnb = 'nbDossRg' + k ;
      const nameColmt = 'mtRg' + k ;


      /* si aucun dossier pour le regroupement, on ne l'affiche pas */
      if (!(this.dataList.map(x => x[nameColnb]).filter(e => e !== 0).length === 0)) {


      const objNb = {
        [nameColnb]: {
          title: 'Nombre Dossier ' + this.regroupName[i],
          valuePrepareFunction:
            (value) => {
              return new Intl.NumberFormat('fr-fr').format(value);
            },
          editable: false,
          width: '8%',
          filter: true
        }
      };

      const objMt = {
        [nameColmt]: {
          title: 'Total Montant ' + this.regroupName[i],
          valuePrepareFunction:
            (value) => {
              return Intl.NumberFormat('fr-fr', { style: 'currency', currency: 'EUR' }).format(value);
            },
          editable: false,
          width: '8%',
          filter: true
        }
      };
      this.settings.columns = Object.assign(this.settings.columns, objNb, objMt);

    }
    }

    /* on ajoute la colonne mt total */
    const objMtTot = {
      mtTot: {
        title: 'Total',
        valuePrepareFunction:
          (value) => {
            return Intl.NumberFormat('fr-fr', { style: 'currency', currency: 'EUR' }).format(value);
          },
        editable: false,
        width: '8%',
        filter: true
      }
    };
    this.settings.columns = Object.assign(this.settings.columns, objMtTot);

  }



  /* transformer data recu en data lisible pour NG2-SMART-Table */
  dataToValides(d: any[]): any[] {

  /* init du nbre de regroupement (si 0 : table vide) */
     this.nbColReg =  d[0].nbDossRg.length;

    /* init du nouvel array de data en any */
    const listData: any[] = [];

    /* boucle sur chaque element de l'ancienne data */
    for (let i = 0; i < d.length; i++) {

      /* construction de l'élément du nouvel array  via objet obj*/
      const obj = new Object();

      /* departemet et codePTT sont identiques */
      obj['departement'] = d[i].departement;
      obj['codePTT'] = d[i].codePTT;

      /* boucle sur l'array nbdossReg, pour chaque element on ajoute à l'objet nbdoss et mt */
      for (let j = 0; j < d[i].nbDossRg.length; j++) {
        const k = j + 1;
        const nb = 'nbDossRg' + k;
        const mt = 'mtRg' + k;
        obj[nb] = d[i].nbDossRg[j];
        obj[mt] = d[i].mtRg[j];
        console.log(d[i].mtRg[j]);
      }

      /* ajout du montant total */
      obj['mtTot'] = d[i].mtTot;

      /* l'objet element est ajouté à la liste */
      listData.push(obj);

    }

    return listData;
  }



}
