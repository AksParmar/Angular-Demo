import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-scope-package',
  templateUrl: './scope-package.component.html',
  styleUrls: ['./scope-package.component.css']
})
export class ScopePackageComponent implements OnInit {

  @Output() onMoveNextStep = new EventEmitter<any>();

  private apiService: ApiService = inject(ApiService);

  title = '';


  scopeForm: FormGroup;
  formFieldElements: any;

  constructor() {
    this.scopeForm = new FormGroup({});
  }
  ngOnInit(): void {
    this.apiService.getScopePackageData().subscribe((response: any) => {
      this.title = response.data.steps_summary.currentStep.name || '';
      this.formFieldElements = response.data.form_field_config.elements;
      this.generateForm(this.formFieldElements);
    })
  }

  generateForm(formFieldElements: any) {
    let formControls: any = {}
    formFieldElements.forEach((element: any) => {
      let validationOptions = [];

      if (element.input.required) {
        validationOptions.push(Validators.required);
      }

      formControls[element.input.name] = new FormControl(element.input.value, validationOptions)
    });

    this.scopeForm = new FormGroup(formControls);
  }

  onSubmitScopeForm(): void {
    console.log(this.scopeForm.value);

    let payload = this.scopeForm.value;

    this.apiService.postScopePackageData(payload).subscribe((response: any) => {
      if (response.data.form_status == 1 && response.data.moving_direction == "NEXT") {
        let dataToSend = {
          message: response.message,
          scopePackageId: response.data.form_data.scope_package_id
        }

        this.onMoveNextStep.emit(dataToSend);
      }
    });
  }

  // onSubmitScopeForm(): void {
  //   let payload = {
  //     [this.inputElement.name]: this.inputSelectedValue
  //   };


  //   this.apiService.postScopePackageData(payload).subscribe((response: any) => {
  //     if (response.data.form_status == 1 && response.data.moving_direction == "NEXT") {
  //       let dataToSend = {
  //         message: response.message,
  //         scopePackageId: response.data.form_data.scope_package_id
  //       }

  //       this.onMoveNextStep.emit(dataToSend);
  //     }
  //   });

  // }
}
