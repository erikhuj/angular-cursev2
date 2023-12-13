import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit{
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
