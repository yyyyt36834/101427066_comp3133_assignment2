// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl:  './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '101427066_comp3133_assignment2';

  constructor() {
    console.log('AppComponent loaded');
  }
}
