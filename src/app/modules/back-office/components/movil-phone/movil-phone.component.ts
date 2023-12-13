import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movil-phone',
  templateUrl: './movil-phone.component.html',
  styleUrls: ['./movil-phone.component.css']
})
export class MovilPhoneComponent implements OnInit {
  phoneIndex!: number;

  constructor() { }

  ngOnInit(): void {
  }

  deletePhone(){
    console.log("deletePhone");
   }
}
