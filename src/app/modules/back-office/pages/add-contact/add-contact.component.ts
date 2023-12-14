import {
  Component,
  ComponentRef,
  EventEmitter,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneComponent } from '../../components/home-phone/phone.component';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent {
  @ViewChild(PhoneComponent, { read: ViewContainerRef })
  public dynamicHost!: ViewContainerRef;
  private ViewContainerRefPhone!: ComponentRef<PhoneComponent>;

  public phoneIndex!: number;

  contacs: number = 0;
  @Output() addConcatEvent = new EventEmitter<void>();

  selectedTags: string[] = [];
  tags: string[] = [];
  loading = false;
  options = 'add-contact'; //PARA USAR EL MISMO FORMULARIO
  phones = [];
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
    contactTags: [this.selectedTags],
    addTags: [,],
    contactPhones: this.fb.array([]),
  });
  constructor(
    private fb: FormBuilder,
    private contactsService: ContactsService
  ) {}

  ngOnInit(): void {
    this.tags = JSON.parse(localStorage.getItem('tags')!);
  }

  get emails(): FormArray {
    return this.contactForm.get('contactEmails') as FormArray;
  }

  removeEmail(i: number) {
    this.emails.removeAt(i);
  }

  removePhone(i: number) {
    if (this.ViewContainerRefPhone) {
      this.ViewContainerRefPhone.destroy();
    }
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
    this.ViewContainerRefPhone =
      this.dynamicHost.createComponent(PhoneComponent);
    const componentIndexM = this.dynamicHost.indexOf(
      this.ViewContainerRefPhone.hostView
    );
    (this.ViewContainerRefPhone.instance as PhoneComponent).phoneIndex =
      componentIndexM + 2;

    console.log(type);
  }

  addTags() {
    console.log(this.tags);
    console.log(this.selectedTags);

    try {
      this.tags.push(this.contactForm.get('addTags')?.value);
      localStorage.setItem('tags', JSON.stringify(this.tags));
      this.contactForm.value.contactTags = this.tags;
    } catch (error) {
      localStorage.setItem('tags', JSON.stringify([]));
    }
  }

  addTagsToSend() {
    console.log(this.selectedTags);

    try {
      this.selectedTags.push(this.contactForm.get('contactTags')?.value);
      console.log(this.selectedTags);
    } catch (error) {
      console.log(error);

      // localStorage.setItem('tags', JSON.stringify([]));
    }
  }

  removeTag(i: number) {
    this.tags.splice(i, 1);
    localStorage.setItem('tags', JSON.stringify(this.tags));
    this.tags = JSON.parse(localStorage.getItem('tags')!);
    this.contactForm.value.contactTags = this.tags;
  }

  saveContact() {
    this.loading = true;
    this.contactForm.value.contactTags = this.selectedTags;
    console.log(this.contactForm.value);

    console.log(this.validateForm());
    if (this.validateForm() === true) {
      this.contactsService.addConcat(this.contactForm.value).subscribe({
        next: (value) => {
          alert('Contacto agregado');
        },
        complete: () => {
          this.loading = false;
        },
      });
      console.log(this.contactForm.value);
      console.log('entro');
    } else {
      alert('No cumple con los requisitos');
      this.loading = false;

    }
  }

  validateForm(): boolean {
    return this.contactForm.valid;
  }
}
