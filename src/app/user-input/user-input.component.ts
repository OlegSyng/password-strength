import { Component, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { RegexUtil } from '../utils/regex.util';
import { EvaluatePasswordService } from '../services/evaluate-password.service';

@Component({
  selector: 'user-input',
  templateUrl: './user-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UserInputComponent),
      multi: true
    }
  ]
})
export class UserInputComponent implements ControlValueAccessor, Validator {
  public hasError: boolean = false;
  public password: string = '';

  constructor(private service: EvaluatePasswordService) { }

  public onChange = (value: string) => { };
  public onTouched = () => { };

  public writeValue(value: string): void {
    this.password = value;
    this.service.evaluatePassword(value);
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public onPasswordChange(value: string): void {
    this.onChange(value);
    this.password = value;
    this.service.evaluatePassword(value);
  }

  validate(control: AbstractControl<string>): ValidationErrors | null {
    const value = control.value;
    if (RegexUtil.space.test(value)) {
      this.hasError = true;
      return { space: true }
    }
    if (this.hasError) this.hasError = false;
    return null;
  }
}
