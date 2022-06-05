import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscribers: Subscription[] = [];
  public isLoading: boolean = false;
  public loginForm: FormGroup = new FormGroup({});

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initFormLogin();
  }

  ngOnDestroy(): void {
    this.subscribers.forEach((each) => each.unsubscribe());
  }

  private initFormLogin() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onLoginForm() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      localStorage.setItem('userData.username', this.loginForm.value.username);
      const subs = timer(2000).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      });

      this.subscribers.push(subs);
    }
  }
}
