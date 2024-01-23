import { Component, OnInit, OnDestroy } from '@angular/core';
import { EvaluatePasswordService } from '../services/evaluate-password.service';
import { Subscription } from 'rxjs';
import { PasswordStrength, StrengthResult } from '../models/password-strength.model';

@Component({
  selector: 'strength-result',
  templateUrl: './strength-result.component.html',
})
export class StrengthResultComponent implements OnInit, OnDestroy {
  public strengthResult = new StrengthResult();
  public strengthEnum = PasswordStrength;
  public subscription: Subscription = new Subscription();

  constructor(public service: EvaluatePasswordService) {}

  ngOnInit(): void {
    this.subscription = this.service.strengthResultSubject$.subscribe((result) => {
      this.strengthResult = result;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
