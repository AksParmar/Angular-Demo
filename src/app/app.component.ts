import { Component, OnInit } from '@angular/core';
import { RestClientService } from './services/rest.client.service';
import { InputElement } from './interfaces/input-element';
import { ToastType } from './services/toast.types.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private restClient: RestClientService) {

  }
}