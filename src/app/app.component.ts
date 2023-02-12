import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form: FormGroup = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null],
    userName: [null, Validators.required],
    address: []
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    this.form.markAllAsTouched();
    console.log(this.form, this.form.value);
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get userName() {
    return this.form.get('userName');
  }

}
