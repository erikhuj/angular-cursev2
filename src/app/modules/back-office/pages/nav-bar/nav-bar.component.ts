import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() photo: string = "PHOTO.png";
  @Input() name: string = "ERIK";
  @Input() email: string = "erik@gmai.com";
  @Input() contactsNumber: number = 0;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { 

  }

  ngOnInit(): void {
    const currentContacts = localStorage.getItem('currentContact')

    console.log(currentContacts);
    console.log(typeof(Number(currentContacts)));
    
    if (currentContacts==null) {
      this.contactsNumber=0
    }else{
      
      this.contactsNumber=Number(currentContacts)
    }
    
    this.getUserInformation()
  }

  getUserInformation() {
    const haveUserinfo = localStorage.getItem('user');
    if (haveUserinfo === null) {
      this.userService.getOne(123).subscribe(
        {
          next: (response) => {
            localStorage.setItem('user', JSON.stringify(response.result.user));
          },
          complete: () => { },
        }
      );
    }
    const user = JSON.parse(localStorage.getItem('user')!);
    this.photo = user.userPhoto;
    this.name = user.userName;
    this.email = user.userEmail;
  }

  logOut() {
    if (confirm('¿Desea cerrar sesion?')) {
      this.authService.logOut().subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigateByUrl('/login');
        },
        error: (error) => {
          console.log(error);
          alert('Error al cerrar sesion');
        },
      });
    }
  }

}
