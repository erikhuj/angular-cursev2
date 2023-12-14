import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
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

}
