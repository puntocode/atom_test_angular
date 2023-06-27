import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm = this.formBuilder.group({
    name:     ['', Validators.required],
    email:    ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  submitted:boolean = false;
  viewPass:boolean = true;

  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get btnSubmitText() { return this.submitted ? 'Registrando...' : 'Registrar'; }


  constructor(
    private router: Router,
    private toastr:ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  onSubmit() {
    this.submitted = true;

    this.authService.register(this.registerForm.value)
        .subscribe({
            next: () => this.router.navigate(['/todo']),
            error: err => {
              this.toastr.error(err.error.message);
              this.submitted = false;
            },
        });
  }
}
