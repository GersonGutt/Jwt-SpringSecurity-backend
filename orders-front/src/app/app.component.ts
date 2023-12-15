import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orders-front';

  status: boolean = false;
  clickEvent(){
    this.status = !this.status;
  }
}
