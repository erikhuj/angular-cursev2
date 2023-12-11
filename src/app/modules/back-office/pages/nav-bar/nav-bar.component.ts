import { Component, Input, OnInit } from '@angular/core';

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
  
  constructor() { }

  ngOnInit(): void {
  }

}
