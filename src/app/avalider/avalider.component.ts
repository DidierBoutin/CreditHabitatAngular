import { map } from 'rxjs/operators';
import { AvaliderBoxRow, Societe } from './../interfaces';
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
  selector: 'app-avalider',
  templateUrl: './avalider.component.html',
  styleUrls: ['./avalider.component.css'],
})
export class AvaliderComponent implements OnInit {

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

  totalRows: any;

  // nom des regroupements de credit,  pour le nom des colonnes
   regroupName: String[] = [];

  constructor(public avaliderService: AvaliderService, public dialog: MatDialog) { }

  ngOnInit() {
    /* recherche des valeurs 3 criteres possibles  */
    this.prepareScreen();

  }



  prepareScreen() {


    console.log('prepareScreen');

    // on recupere les code regroupement pour les mettre en titre des colonnes du tableau
    this.avaliderService.getAvaliderNamesRegr().subscribe(
      (data => {
        for (let  i = 0; i < data.length; i++) {
          this.regroupName[i] = data[i].codeRegroupMat ; }




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
      ),
      (error) => { },
      () => {}

    );

  }


  /* pour une nouvelle selection, on reaffiche la liste principale */
  public changeBoxes() {
    this.getListAvalider();
  }

  /*recuperation des donnes pour affichage sur liste principam*/
  public getListAvalider() {

    this.avaliderService.getAvaliderList(this.selectedSoc, this.selectedAn, this.selectedTrim).subscribe(
      (data) => {
        this.dataList = data;
        data.codePTT = '';
        this.source = new LocalDataSource(data);
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





  public validation() {
    console.log('valdation');
    /*on insere les enregs dans la table declarer */
    this.avaliderService.saveAvalider(this.selectedSoc, this.selectedAn, this.selectedTrim).subscribe(
      (data) => { console.log('save les maj se font'); },
      (error) => { console.log(' avaliderService.saveAvalider err '); },
      () => {
        console.log('save termine');
        /* on supprime les enereg de la table données */
        this.avaliderService.deleteAvalider(this.selectedSoc, this.selectedAn, this.selectedTrim).subscribe(
          (data) => { console.log('delete les maj se font'); },

          (error) => { console.log('err'); },

          () => {
            console.log('del fini');
            /* rreinit ecran */
            this.prepareScreen();
          });
      }
    );
  }



  /*gestion de la pop up de confirmation de save */
  openDialog(): void {


    /* ouverture de la p opup, ==>  gestion dans AvaliderComponentDialogComponent*/
    const dialogRef = this.dialog.open(AvaliderComponentDialogComponent, {
      width: '500px',
      data: { soc: this.selectedSoc, an: this.selectedAn, trim: this.selectedTrim }
    });
    /* retour de la popup*/
    dialogRef.afterClosed().subscribe(validOK => {
      if (validOK) { this.validation(); }
    });
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

      // rowClassFunction: (row) => {
      //   if (row.data.codePTT) {
      //     return 'cell_right';
      //   }
      //   return '';
      // },

      // list of columns :
      columns: {
        departement: {
          title: 'Libellé département',
          editable: false,
          sort: true,
          width: '16%',
          filter: true,

          // valuePrepareFunction:
          // (data) => {
          //    return '<div class="cell_left"> ' + data + ' </div>' }
        },
        codePTT: {
          title: 'Département',
          editable: false,
          sort: true,
          width: '4%',
          filter: true,
        },
        nbDossRg1: {
          title: 'Nombre Dossier ' + this.regroupName[0],
          valuePrepareFunction:
          (value) => {
            return new Intl.NumberFormat('fr-fr').format(value);
          },
          editable: false,
          width: '16%',
          filter: true,
          type: 'number',
        },
        mtRg1: {
          title: 'Total montant ' + this.regroupName[0],
          valuePrepareFunction:
            (value) => {
              return Intl.NumberFormat('fr-fr', { style: 'currency', currency: 'EUR' }).format(value);
            },
          editable: false,
          width: '16%',
          filter: true,
          type: 'number',
        },
        nbDossRg2: {
          title: 'Nombre Dossier ' + this.regroupName[1],
          valuePrepareFunction:
          (value) => {
            return new Intl.NumberFormat('fr-fr').format(value);
          },
          editable: false,
          width: '16%',
          filter: true,
          type: 'number',
        },
        mtRg2: {
          title: 'Total montant '  + this.regroupName[1],
          valuePrepareFunction:
            (value) => {
              return Intl.NumberFormat('fr-fr', { style: 'currency', currency: 'EUR' }).format(value);
            },
          editable: false,
          width: '16%',
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
          width: '16%',
          filter: true,
          type: 'number',

        },
      },
    };
  }
}



/*=======GESTION POP UP=======*/
@Component({
  selector: 'app-avalider-component-dialog',
  templateUrl: './avalider.component.dialog.html'
})

export class AvaliderComponentDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AvaliderComponentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    /*@Inject(MAT_DIALOG_DATA) public data: DialogData) { }*/
  ) { }
  abandonSave(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    console.log('ypo2');
    this.dialogRef.close(true);
  }

}

