import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }
  loginForm: FormGroup = this.fb.group({
    email: [''],
    password: [''],
  });

  ngOnInit(): void { }
  login() {
    this.loading = true;
    console.log('login');

    this.authService.logIn(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (res) => {
        if (res.succeed === true) {
          console.log(res);
          
          this.router.navigateByUrl('/back-office/list');
        } else {
          alert('email o contraseña incorrectos');
        }

      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
