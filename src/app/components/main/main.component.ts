import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  title = '';
  currentStep: number = 1;
  scopePackageId = 0;
  loader: boolean = false; 
  toast = {
    message: '',
    timoutTime: 2000,
    type: '',
    show: false
  }

  constructor(private restClient: ApiService, private router: Router) {

  }


  onMoveBasicInfoStep(data: any) {
    this.currentStep = 2;
    this.scopePackageId = data.scopePackageId
  }

  onMoveVehicleAndDriverSection(data:any) {
    setTimeout(() => {
      this.router.navigate(['booking_steps', data.booking_data_id]);
    }, 3000);

  }

  showLoader() : void {
    this.loader =true;
  }

  hideLoader():void {
    this.loader = false;
  }
}