import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {
  contacs: number = 0;
  @Output() addConcatEvent = new EventEmitter<void>();

  tags: string[] =[];
  loading = false;
  options = 'add-contact'; //PARA USAR EL MISMO FORMULARIO

  types = ['home', 'movil', 'whatsapp'];

  contactForm: FormGroup = this.fb.group({
    contactPhoto: [,],
    contactFirstName: [, Validators.required],
    contactLastName: [, Validators.required],
    contactCompany: [,],
    contactEmails: this.fb.array([]),
    contactBirthday: [, Validators.required],
    contactAlias: [,],
    contactNotes: [,],
    contactTags: [this.tags,],
    addTags: [,],
    contactPhones: this.fb.array([]),
  });
  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.tags= JSON.parse(localStorage.getItem('tags')!);
  }

  get emails(): FormArray {
    return this.contactForm.get('contactEmails') as FormArray;
  }
  removeEmail(i: number) {
    this.emails.removeAt(i);
  }

  removePhone(i: number) {
    console.log(i);
    
    // this.phones.removeAt(i);
  }

  addEmail() {
    this.emails.push(
      this.fb.group({
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}'
            ),
          ],
        ],
      })
    );
  }

  addPhone(type: string) {
    console.log(type);
    
  //   let validationsToSend = '';
  //   const validatortsToHomePhone = '[0-9]{7}';
  //   const validatortsToMovilPhone = '[0-9]{3}-[0-9]{7}';
  //   const validatortsToWhatsappPhone = '[a-zA-Z,0-9]{3}-[0-9]{3}-[0-9]{7}';

  //   switch (type) {
  //     case 'home':
  //       validationsToSend = validatortsToHomePhone;
  //       break;

  //     case 'movil':
  //       validationsToSend = validatortsToMovilPhone;

  //       break;

  //     case 'whatsapp':
  //       validationsToSend = validatortsToWhatsappPhone;
  //       break;

  //     default:
  //       break;
  //   }
  //   this.phones.push(
  //     this.fb.group({
  //       phone: [, [Validators.required, Validators.pattern(validationsToSend)]],
  //     })
  //   );
  }

  addTags() {
    this.tags.push(this.contactForm.get('addTags')?.value);
    localStorage.setItem('tags', JSON.stringify(this.tags));
    this.contactForm.value.contactTags = this.tags;
    
  }

  removeTag(i: number) {
    this.tags.splice(i, 1);
    localStorage.setItem('tags', JSON.stringify(this.tags));
    this.tags= JSON.parse(localStorage.getItem('tags')!);
    this.contactForm.value.contactTags = this.tags;
  }


  saveContact() {
    this.loading = true;
    console.log(this.validateForm());
    if (this.validateForm() === true) {
     console.log(this.contactForm.value);
     console.log('entro');
     
    } else {
      alert('No cumple con los requisitos');
    }
  }

  validateForm(): boolean {
    return this.contactForm.valid;
  }
}
