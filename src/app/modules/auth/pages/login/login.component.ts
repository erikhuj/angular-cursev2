import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }
  login() {
    console.log("login");
    this.authService.logIn('','423').subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
        
      complete: () => {
        console.log("complete");
        
      }

    });
    // this.router.navigateByUrl('/back-office/list');
  }
}
