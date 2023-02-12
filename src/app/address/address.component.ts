import { Component, OnDestroy, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: AddressComponent,
      multi: true,
    },
  ],
})
export class AddressComponent
  implements ControlValueAccessor, OnDestroy, Validator
{
  addressForm: FormGroup = this.fb.group({
    addressLine1: [null, Validators.required],
    addressLine2: [null],
    city: [null, Validators.required],
    state: ['', Validators.required],
    zip: [null, Validators.required],
  });

  onTouched = () => {};
  onChangeSubscription!: Subscription;

  constructor(private fb: FormBuilder) {}

  get addressLine1() {
    return this.addressForm.get('addressLine1');
  }

  get city() {
    return this.addressForm.get('city');
  }

  get state() {
    return this.addressForm.get('state');
  }

  get zip() {
    return this.addressForm.get('zip');
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (this.addressForm.valid) {
      return null;
    }
    let errors = {};
    Object.keys(this.addressForm.value).forEach((key) => {
      const control = this.addressForm.get(key);
      if (control?.invalid) {
        let error = control.errors;
        errors = { ...errors, error };
      }
    });
    return errors;
  }

  ngOnDestroy(): void {
    console.log('1');
    this.onChangeSubscription.unsubscribe();
  }

  writeValue(value: any): void {
    if (value) {
      this.addressForm.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeSubscription = this.addressForm.valueChanges.subscribe(
      (value) => {
        fn(value);
      }
    );
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.addressForm.disable();
    } else {
      this.addressForm.enable();
    }
  }
}
