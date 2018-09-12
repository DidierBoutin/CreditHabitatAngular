import { Regroupm, BoxEditNg2, Materiel } from './../interfaces';
import { RegroupementService } from './../regroupement.service';
import { MaterielService } from './../materiel.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.css']
})
export class ParametrageComponent implements OnInit {

  // data list of ng2-smart-table
  source: LocalDataSource;

  // using by ng2-smart table to set parameter
  settings: any;

  // Objet  {title, value} utiliser par ng2-smart-table
  listBox: BoxEditNg2[] = [];



  constructor(public matService: MaterielService, public regroupmService: RegroupementService) { }

  ngOnInit() {

    this.regroupmService.getAllRegroupm().subscribe(

    /* on souscrit  pour recuperer tous les regroupements,
    pour les afficher en mode editon en en-tête de la collone Regroupement de la table  */
      (reg) => {
        reg.forEach(e => {
          this.listBox.push({ title: e.codeRegroupMat, value: e.codeRegroupMat });
        }
        );
      },

      /* gestion en cas d'erreur acces à la base*/
      (error) => { },

      /* ici on a recupéré tous les codes regroupements,
      on peut souscrire pour rechereche tous les materiels */
      () => {
        this.matService.getAllMateriel().subscribe(
          (mats) => {

            this.source = new LocalDataSource(mats);

            /* formattage de la table (liste materiel) */
            this.formatSetting();
          },
          /* gestion en cas d'erreur acces à la base*/
          (error) => { },

        );

      }
    );


  }




  // setting ng2smarttable
  formatSetting(): void {

    this.settings = {


      // activer les actions de mise à jour (add; edit, delete)
      actions: {
        add: true,
        edit: true,
        delete: true,
        position: 'right',
        columnTitle: '',
        width: '30%',

      },
      delete: {
        confirmDelete: true,
        deleteButtonContent: '  <span class="glyphicon glyphicon-trash table-actions-button"></span>  ',
        mode: 'external'
      },
      add: {
        // addButtonContent: 'Ajouter',
        confirmCreate: true,
        addButtonContent: '<span class="glyphicon glyphicon-plus ">',
        createButtonContent: '<span class="glyphicon glyphicon-ok ">',
        cancelButtonContent: '<span class="glyphicon glyphicon-remove ">'

      },
      edit: {
        confirmSave: true,
        editButtonContent: '<span class="glyphicon glyphicon-pencil">',
        saveButtonContent: '<span class="glyphicon glyphicon-ok ">',
        cancelButtonContent: '<span class="glyphicon glyphicon-remove ">'
      },
      setPaging: true,
      pager: {
        perPage: 25,
        display: true,
      },

      // list of columns :
      columns: {
        codeMat: {
          title: 'Code Materiel',
          editable: false,
          sort: true,
          width: '20%',
          filter: true,
        },
        codeRegroupMat: {
          title: 'Regroupement',
          editable: true,
          sort: true,
          width: '20%',
          filter: true,
          editor: {
            type: 'list',
            config: {
              selectText: 'Select...',
              list: this.listBox,
              confirmSave: true,
            },
          },
        },
        libelleMat: {
          title: 'Libellé Matériel   ',
          valuePrepareFunction:
            (value) => {
              return value.toLowerCase();
            },
          editable: true,
          width: '80%',
          filter: true,
        },
      },
    };
  }


  onDeleteConfirm(event) {
    if (window.confirm('Confirmez l\'annulation du  code materiel ' + event.data.codeMat + ', ou annulez la.')) {
      // ***init screen without food deleted
      event.confirm.resolve();
      // *****Delete food in  BDD
      this.matService.deleteMateriel(event.data.codeMat).subscribe();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Confirmez la création du  code materiel ' + event.newData.codeMat + ', ou annulez la.')) {
      event.confirm.resolve();
      this.matService.createMateriel(event.newData).subscribe();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('Confirmez la mise à jour du  code materiel ' + event.newData.codeMat + ', ou annulez la.')) {
      event.confirm.resolve(event.newData);
      this.matService.updateMateriel(event.newData).subscribe();
    } else {
      event.confirm.reject();
    }
  }

}
