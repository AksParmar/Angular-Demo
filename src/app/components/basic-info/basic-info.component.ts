import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
  @Input() scopePackageId: number = 0;
  @Output() onMoveNextStep = new EventEmitter<any>();
  title = '';
  basicForm: FormGroup;
  formFieldElements: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {
    this.basicForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.apiService.getBasicInfoData("", this.scopePackageId.toString()).subscribe((response: any) => {
      this.title = response.data.steps_summary.currentStep.name || '';
      response.data.form_field_config.elements.forEach((element: any) => {
        if (!(element.input.name == 'zone_id' || element.input.name == 'geo_coordinates' || element.input.name == 'delivery_or_collection')) {
          this.formFieldElements.push(element);
        }
      });

      this.generateForm(this.formFieldElements);
    })
  }

  generateForm(formFieldElements: any) {
    let formControls: any = {}

    formFieldElements.forEach((element: any) => {
      formControls[element.input.name] = new FormControl(element.input.value)

      if (element.input.required) {
        formControls[element.input.name].setValidators([Validators.required]);
      }

      if (element.input.value) {
        formControls[element.input.name].setValue(element.input.value);
      }
    });

    this.basicForm = new FormGroup(formControls);
  }

  checkValidation(formControl: any) {
    if (formControl.valid) {
      return 'is-valid';
    }

    if (formControl.invalid && (formControl.dirty || formControl.touched)) {
      return 'is-invalid';
    }

    return '';
  }

  onSubmitBasicForm() {

   let payload = this.basicForm.value;

    this.apiService.postBasicInfoData(payload).subscribe((response: any) => {
      if (response.data.form_status == 1 && response.data.moving_direction == "NEXT") {
        let dataToSend = {
          message: response.message,
          booking_data_id: response.data.booking_data.id
        }
          this.onMoveNextStep.emit(dataToSend);
          
      }
    })

  }


}
