import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading = false;


  photoFrom: string = "photo";
  nameFrom: string = "name";
  emailFrom: string = "email";
  passwordFrom: string = "password";

  @Input() photo: string = "";
  @Input() name: string = "";
  @Input() email: string = "";
  @Input() password: string = "";


userPhoto='userPhoto'
userName='userName'
userEmail='userEmail'
userPassword='userPassword'


  registerForm: FormGroup = this.fb.group({
    userPhoto: [this.photo],
    userName: [this.name],
    userEmail: [this.email],
    userPassword: [this.password],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  resgister() {
    this.loading = true;
    console.log(this.registerForm.value);

    this.userService.create(this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res);
        
        if (res.succeed === true) {
          alert('resgistrado correctamente');
        } else {
          alert('NO SE PUDO REGISTRAR');
        }
      },
      complete: () => {
        this.loading = false;
      }
    })

  }
}
