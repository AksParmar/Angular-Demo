import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestClientService } from 'src/app/services/rest.client.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
  @Input() scopePackageId: number = 0;
  @Output() onMoveNextStep = new EventEmitter<any>();
  @Output() showAppLoader = new EventEmitter();
  @Output() hideAppLoader = new EventEmitter();

  formElements: any = {};
  formControls: any = {};

  constructor(private restClient: RestClientService, private router: Router) {

  }

  ngOnInit(): void {
    this.showLoader();
    this.restClient.getBasicInfoData("", this.scopePackageId.toString()).subscribe((response: any) => {
      response.data.form_field_config.elements.map((element: any) => {
        this.formControls[element.name] = new FormControl(element.input.value, Validators.required);
        this.formElements[element.name] = element;
        this.hideLoader();
      })
    })
  }

  onSubmitBasicInfoForm() {
    let payload = {
      booking_id: null,
      booking_type_id: this.formControls['booking-type-id'].value,
      contact_mobile_number: this.formControls['contact-mobile-number'].value,
      contact_name: this.formControls['contact-name'].value,
      delivery_or_collection: this.formControls['delivery-or-collection'].value,
      geo_coordinates: null,
      is_recurring: null,
      scope_package_id: this.scopePackageId,
      submit_button: "next",
      zone_id: null
    }
    this.showLoader();
    this.restClient.postBasicInfoData(payload).subscribe((response: any) => {
      this.hideLoader();
      if (response.data.form_status == 1 && response.data.moving_direction == "NEXT") {
        let dataToSend = {
          message: response.message,
          booking_data_id: response.data.booking_data.id
        }
          this.onMoveNextStep.emit(dataToSend);
          
      }
    })

  }

  showLoader() {
    this.showAppLoader.emit();
  }

  hideLoader() {
    this.hideAppLoader.emit();
  }

}
