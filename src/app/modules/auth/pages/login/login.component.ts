import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    email:    ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  submitted:boolean = false;
  viewPass:boolean = true;

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  get btnSubmitText() { return this.submitted ? 'Ingresando...' : 'Ingresar'; }


  constructor(
    private router: Router,
    private toastr:ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  onSubmit() {
    this.submitted = true;

    this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!)
        .subscribe({
            next: () => this.router.navigate(['/todo']),
            error: err => {
              this.toastr.error(err);
              this.submitted = false;
            },
        });
  }


}

