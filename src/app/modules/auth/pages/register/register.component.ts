import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  photoFrom: string="photo";
  nameFrom: string="name";
  emailFrom: string="email";
  passwordFrom: string="password";

  @Input() photo: string="";
  @Input() name: string="";
  @Input() email: string="";
  @Input() password: string="";
registerForm: FormGroup = this.fb.group({
  photo: [this.photo],
  name: [this.name],
  email: [this.email],
  password: [this.password],
});

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  resgister() {
    console.log("resgister");
  }
}
