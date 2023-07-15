import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicFormFieldComponent),
      multi: true
    }
  ]
})
export class DynamicFormFieldComponent implements OnInit, ControlValueAccessor {
  @Input() formField: any;

  value: any = '';
  
  formControl = new FormControl();

  input = {
    custom_type: null as any,
    disabled: null as any,
    hidden: null as any,
    id: null as any,
    label: null as any,
    multiple: null as any,
    name: null as any,
    options: null as any,
    placeholder: null as any,
    required: null as any,
    type: null as any,
    value: null as any,
  }

  is_tooltip_enabled = null as any
  name = null as any
  tooltip = {
    applicable: null as any,
    enabled: null as any,
    text: null as any
  }
  validation = {
    message: null as any,
    text: null as any
  }
  
  constructor() {

  }
  
  
  ngOnInit(): void {
    this.initializeVariables();

      this.formControl.setValue(this.value);
      
      if(this.input.required) {
        this.formControl.setValidators([Validators.required]);
      }


      this.formControl.valueChanges.subscribe(value => {
        this.value = value;
        this.onChangeValue(value);
        
      })
  }

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: number): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: number): void {
    this.onTouched = fn;
  }


  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange: any = () => { };
  onTouched: any = () => { };
  disabled = false;

  onChangeValue(value: any) {
    this.value = value;
    this.onChange(value);
  }

  onChangeOption(event: any) {
    this.onChangeValue(event)
  }

  checkValidation(formControl:any) {
    if (formControl.valid) {
      return 'is-valid';
    }

    if (formControl.invalid && (formControl.dirty || formControl.touched)) {
      return 'is-invalid';
    }

    return '';
  }

  initializeVariables() {
    this.input.custom_type = this.formField.input.custom_type;
    this.input.disabled = this.formField.input.disabled;
    this.input.hidden = this.formField.input.hidden;
    this.input.id = this.formField.input.id;
    this.input.label = this.formField.input.label;
    this.input.multiple = this.formField.input.multiple;
    this.input.name = this.formField.input.name;
    this.input.options = this.formField.input.options;
    this.input.placeholder = this.formField.input.placeholder;
    this.input.required = this.formField.input.required;
    this.input.type = this.formField.input.type;
    this.input.value = this.formField.input.value;
    
    this.is_tooltip_enabled = this.formField.is_tooltip_enabled;

    this.name = this.formField.name;
    
    this.tooltip.applicable = this.formField.tooltip.applicable;
    this.tooltip.enabled = this.formField.tooltip.enabled;
    this.tooltip.text = this.formField.tooltip.text;

    this.validation.message = this.formField.validation.message; 
    this.validation.text = this.formField.validation.text; 
  }
}
