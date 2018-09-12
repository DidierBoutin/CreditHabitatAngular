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


// using by ng2-smart table to set parameter
settings: any;

  constructor(public avaliderService: AvaliderService) { }

  ngOnInit() {

    this.avaliderService.getAllAnomalie().subscribe(
      (valider) => {

 
        this.source = new LocalDataSource(valider);

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
      codePTT: {
        title: 'Departement',
        editable: false,
        sort: true,
        width: '5%',
         filter: true,
      },
      codePTTY: {
        title: 'Département',
        editable: false,
        sort: true,
        width: '5%',
        filter: true,
        type: 'number',
       },
      numTrim: {
        title: 'Trimestre   ',
        editable: false,
        width: '5%',
        filter: true,
        type: 'number',
      },
      anTrim: {
        title: 'Année   ',
        editable: false,
        width: '5%',
        filter: true,
        type: 'number',
      },
      codeMat: {
        title: 'Matériel',
        editable: false,
        sort: true,
        width: '5%',
        filter: true,
      },
      nbDoss: {
        title: 'Nb dossiers',
        editable: false,
        sort: true,
        width: '10%',
        filter: false,
        type: 'number',

      },
      mtAno: {
        title: 'Montant',
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
