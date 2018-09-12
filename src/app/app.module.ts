import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import {FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './/app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
 import { Page404Component } from './page404/page404.component';
import { MatChipsModule, MatTableModule, MatIconModule, MatMenuModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule, MatCardModule, MatAutocompleteModule,
  MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { AnomalieComponent } from './anomalie/anomalie.component';
import { ParametrageComponent } from './parametrage/parametrage.component';
import { AvaliderComponent } from './avalider/avalider.component';
import { ValidesComponent } from './valides/valides.component';




const routes: Routes = [
{ path: '',
   redirectTo: 'anomalie', pathMatch: 'full'
  },

{
  path: 'anomalie',
  component: AnomalieComponent
},
{
  path: 'parametrage',
  component: ParametrageComponent
},
{
  path: 'avalider',
  component: AvaliderComponent
},
{
  path: 'valides',
  component: ValidesComponent
},
{ path: '**',
component: Page404Component  }
];




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    ConnexionComponent,
    Page404Component,
    AnomalieComponent,
    ParametrageComponent,
    AvaliderComponent,
    ValidesComponent,

    ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatCardModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    MatChipsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    Ng2SmartTableModule,
    MatIconModule,
    MatMenuModule
            ],


  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

