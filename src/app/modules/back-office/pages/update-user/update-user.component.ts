import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  loading = false;

  photoFrom: string = 'photo';
  nameFrom: string = 'name';
  emailFrom: string = 'email';
  passwordFrom: string = 'password';
  fullNameFrom: string = 'fullName';

  @Input() photo: string = '';
  @Input() name: string = '';
  @Input() email: string = '';
  @Input() password: string = '';
  @Input() fullName: string = '';

  userPhoto = 'userPhoto';
  userName = 'userName';
  userEmail = 'userEmail';
  userPassword = 'userPassword';
  userFullName='userFullName'


  
  registerForm: FormGroup = this.fb.group({
    userPhoto: [this.photo],
    userName: [this.name],
    userEmail: [this.email],
    userPassword: [this.password],
    userFullName: [this.fullName],
  });

  constructor(private fb: FormBuilder, private userService: UserService) {
    
    
    
    
    


    const user = localStorage.getItem('user');
    if (user !== null) {
      const userJson = JSON.parse(user);
      console.log(userJson);
      
      this.registerForm.patchValue({
        userPhoto: userJson.userPhoto,
        userName: userJson.userName,
        userEmail: userJson.userEmail,
        userPassword: userJson.userPassword,
        userFullName: userJson.userFullName
      })
         }
    console.log(this.registerForm.value);
    
  }

  ngOnInit(): void {
    
  }


  updateUser() {
    this.loading = true;
    console.log(this.registerForm.value);
    const user = localStorage.getItem('user');
    if (user !== null) {
      const userJson = JSON.parse(user);

    this.userService.update(this.registerForm.value,userJson.userId).subscribe({
      next: (res) => {
        console.log(res);

        if (res.succeed === true) {
          alert('modificado correctamente');
          this.registerForm.value.userId=userJson.userId
          localStorage.setItem('user', JSON.stringify(this.registerForm.value));
        } else {
          alert('NO SE PUDO MODIFICAR');
        }
      },
      complete: () => {
        this.loading = false;
      },
    });
    }}
}
