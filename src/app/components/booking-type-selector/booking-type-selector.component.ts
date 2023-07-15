import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-booking-type-selector',
  templateUrl: './booking-type-selector.component.html',
  styleUrls: ['./booking-type-selector.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BookingTypeSelectorComponent),
      multi: true
    }
  ]
})
export class BookingTypeSelectorComponent implements OnInit, ControlValueAccessor {
  @Input() bookingTypesOptions = [];

  value: number = 0;


  constructor() {

  }

  onSelectBookingType(id:number) {
    this.value = id;
    this.onChange(id);
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

  ngOnInit(): void {
    
  }
}
