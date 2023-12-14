import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-home-phone',
  templateUrl: './home-phone.component.html',
  styleUrls: ['./home-phone.component.css']
})
export class HomePhoneComponent implements OnInit {
  phoneIndex!: number;

  @Input() phoneControl!: FormControl;
  @Input() phoneGroup!: FormGroup;
  
  constructor(private contactsService:ContactsService) { }

  ngOnInit(): void {
  }

  deletePhone(){
    this.contactsService.notifyDynamicDeleteComponent();
   console.log("deletePhone");
  }
}
