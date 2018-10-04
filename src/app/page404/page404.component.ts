import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';


@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component implements OnInit {

  secondes: number;

  constructor() { }

  ngOnInit() {
    const counter = Observable.interval(1000);

    // counter.subscribe(
    //   (value) => {
    //     this.secondes = value;
    //     console.log(this.secondes);
    //   },
    //   (error) => {
    //     console.log('Uh-oh, an error occurred! : ' + error);
    //   },
    //   () => {
    //     console.log('Observable complete!');
    //   }
    // );

  }




}
