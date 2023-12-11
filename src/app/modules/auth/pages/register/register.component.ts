import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  photo: string="photo";
  name: string="name";
  email: string="email";
  password: string="password";

  constructor() { }

  ngOnInit(): void {
  }

  resgister() {
    console.log("resgister");
  }
}
