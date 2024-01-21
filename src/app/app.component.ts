import { Component } from '@angular/core';

enum PasswordStrength {
  Easy,
  Medium,
  Strong,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public value: string = '';
  public strength: PasswordStrength | null = null;
  public strengthEnum = PasswordStrength;
  public hasError: boolean = false;

  private onlyNumbersRegex = /^[0-9]*$/;
  private onlyLettersRegex = /^[a-zA-Z]*$/;
  private onlySpecialCharactersRegex = /^[^a-zA-Z0-9]*$/;
  private onlyLettersAndNumbersRegex = /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]*$/;
  private onlyLettersAndSpecialCharactersRegex = /^(?=.*?[a-zA-Z])(?=.*?[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
  private onlyNumbersAndSpecialCharactersRegex = /^(?=.*?\d)(?=.*?[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\d]*$/;


  public onChange(inputValue: string): void {
    if (/\s/g.test(inputValue)) { // check if there is a space
      this.hasError = true;
      return;
    }
    if (this.hasError) this.hasError = false;
    this.value = inputValue;
    this.evaluate(inputValue);
  }

  private evaluate(password: string): void {
    if (password.length <= 8) {
      if (this.strength !== null) {
        this.strength = null;
      }
      return;
    }
 
    if (
      this.onlyLettersRegex.test(password) ||
      this.onlyNumbersRegex.test(password) ||
      this.onlySpecialCharactersRegex.test(password)
    ) {
      this.strength = PasswordStrength.Easy;
    } else if (
      this.onlyLettersAndNumbersRegex.test(password) ||
      this.onlyLettersAndSpecialCharactersRegex.test(password) ||
      this.onlyNumbersAndSpecialCharactersRegex.test(password)
    ) {
      this.strength = PasswordStrength.Medium;
    } else {
      this.strength = PasswordStrength.Strong;
    }
  }
}
