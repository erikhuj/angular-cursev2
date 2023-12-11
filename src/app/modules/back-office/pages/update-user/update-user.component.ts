import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  photo: string="photo";
  name: string="name";
  email: string="email";
  password: string="password";
  constructor() { }

  ngOnInit(): void {
  }

    updateUser(){
      
    }
}
