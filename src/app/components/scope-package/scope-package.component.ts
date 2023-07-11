import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { RestClientService } from 'src/app/services/rest.client.service';

@Component({
  selector: 'app-scope-package',
  templateUrl: './scope-package.component.html',
  styleUrls: ['./scope-package.component.css']
})
export class ScopePackageComponent implements OnInit {
  
  @Output() onMoveNextStep = new EventEmitter<any>();
  @Output() showAppLoader = new EventEmitter();
  @Output() hideAppLoader = new EventEmitter();
  restClient: RestClientService = inject(RestClientService);

  title = '';
  inputElement: any;
  nextButtonDisabled: boolean = true;
  inputSelectedValue: string = '';
  



  ngOnInit(): void {
    this.showLoader();
    this.restClient.getScopePackageData().subscribe((response: any) => {
      this.title = response.data.steps_summary.currentStep.name || '';
      this.inputElement = response.data.form_field_config.elements[0].input;
      this.hideLoader();
    })
  }
  
  onSubmitScopeForm(): void {
    let payload = {
      [this.inputElement.name]: this.inputSelectedValue
    };
    
    
    this.restClient.postScopePackageData(payload).subscribe((response: any) => {
      this.showLoader();
      if (response.data.form_status == 1 && response.data.moving_direction == "NEXT") {
        let dataToSend = {
          message: response.message,
          scopePackageId: response.data.form_data.scope_package_id
        }
        
        this.hideLoader();
        this.onMoveNextStep.emit(dataToSend);
      }
    });

  }

  showLoader() {
    this.showAppLoader.emit();
  }

  hideLoader() {
    this.hideAppLoader.emit();
  }
}
