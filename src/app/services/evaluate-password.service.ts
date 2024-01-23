import { Injectable } from '@angular/core';
import { RegexUtil } from '../utils/regex.util';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { PasswordStrength, StrengthResult } from '../models/password-strength.model';

@Injectable({
  providedIn: 'root'
})
export class EvaluatePasswordService {

  public strengthResult = new StrengthResult();
  public strengthResultSubject: BehaviorSubject<StrengthResult> = new BehaviorSubject<StrengthResult>(new StrengthResult());
  public strengthResultSubject$ = this.strengthResultSubject.asObservable().pipe(shareReplay())

  public evaluatePassword(password: string): void {
    if (password.length <= 8) {
      this.resetStrength(password);
      return;
    }
    if (
      RegexUtil.onlyLetters.test(password) ||
      RegexUtil.onlyNumbers.test(password) ||
      RegexUtil.onlySpecialChars.test(password)) {
      this.assignStrength(PasswordStrength.Easy)
    } else if (
      RegexUtil.onlyLettersAndNumbers.test(password) ||
      RegexUtil.onlyLettersAndSpecialChars.test(password) ||
      RegexUtil.onlyNumbersAndSpecialChars.test(password)) {
      this.assignStrength(PasswordStrength.Medium)
    } else {
      this.assignStrength(PasswordStrength.Strong)
    }
  }

  public assignStrength(strength: PasswordStrength): void {
    this.strengthResult = { strength, isBelowMinLength: false } ;
    this.strengthResultSubject.next(this.strengthResult);
  }

  public resetStrength(password: string): void {
    this.strengthResult = { strength: null, isBelowMinLength: password.length > 0 && password.length <= 8 };
    this.strengthResultSubject.next(this.strengthResult);
  }
}
