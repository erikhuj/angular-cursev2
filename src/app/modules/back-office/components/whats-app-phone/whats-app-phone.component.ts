import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whats-app-phone',
  templateUrl: './whats-app-phone.component.html',
  styleUrls: ['./whats-app-phone.component.css']
})
export class WhatsAppPhoneComponent implements OnInit {
  phoneIndex!: number;

  constructor() { }

  ngOnInit(): void {
  }

  deletePhone(){
    console.log("deletePhone");
   }
}

