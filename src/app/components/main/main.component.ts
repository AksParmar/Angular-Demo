import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestClientService } from 'src/app/services/rest.client.service';
import { ToastType } from 'src/app/services/toast.types.enum';

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

  constructor(private restClient: RestClientService, private router: Router) {

  }


  onMoveBasicInfoStep(data: any) {
    this.currentStep = 2;
    this.scopePackageId = data.scopePackageId
    this.showToast(data.message, ToastType.SUCCESS, 3000);
  }

  onMoveVehicleAndDriverSection(data:any) {
    this.showToast(data.message, ToastType.SUCCESS, 3000);
    setTimeout(() => {
      this.router.navigate(['booking_steps', data.booking_data_id]);
    }, 3000);

  }

  showToast(message: string, toastType: ToastType, timeoutTime: number): void {
    this.toast.message = message;
    this.toast.type = toastType.toString();
    setTimeout(() => {
      this.toast.show = true;
    }, 1000)
    this.toast.show = true;
    setTimeout(() => {
      this.toast.show = false;
    }, timeoutTime);
  }

  showLoader() : void {
    this.loader =true;
  }

  hideLoader():void {
    this.loader = false;
  }
}