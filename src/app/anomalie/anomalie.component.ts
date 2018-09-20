import { Anomalie, AnomalieNg2Smart } from './../interfaces';
import { AnomalieService } from './../anomalie.service';
import { MaterielService } from './../materiel.service';
import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { DataSource } from 'ng2-smart-table/lib/data-source/data-source';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-anomalie',
  templateUrl: './anomalie.component.html',
  styleUrls: ['./anomalie.component.css']
})
export class AnomalieComponent implements OnInit {

// data list of ng2-smart table
source: LocalDataSource;


// using by ng2-smart table to set parameter
settings: any;

total: any;


  constructor(public anoService: AnomalieService) { }

  ngOnInit() {

    this.anoService.getAllAnomalie().subscribe(
      (anos) => {

        this.source = new LocalDataSource(anos);

        console.log('o');

        console.log(this.source);
        console.log(this.source.empty);

        this.formatSetting();
        delete this.settings.columns['codePTT'];
 

        console.log('this.source.count(): ');
        console.log(this.source.count());
        this.total = this.source.count();

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
        codeSoc: {
          title: 'Société',
          editable: false,
          sort: true,
          width: '5%',
           filter: true,
           show: false

        },
        codePTT: {
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
