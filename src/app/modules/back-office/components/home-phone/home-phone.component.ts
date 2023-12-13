import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home-phone',
  templateUrl: './home-phone.component.html',
  styleUrls: ['./home-phone.component.css']
})
export class HomePhoneComponent implements OnInit {
  phoneIndex!: number;

  @Input() phoneControl!: FormControl;
  @Input() phoneGroup!: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
  }

  deletePhone(){
   console.log("deletePhone");
  }
}
