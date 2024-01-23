import { Component } from '@angular/core';
import { PasswordStrength } from './models/password-strength.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public form: FormGroup<{'passwordInput': FormControl<string|null>}>

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      passwordInput: ['', [Validators.required]]
    })
  }
}
