import {
  Component,
  ComponentRef,
  EventEmitter,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactsService } from 'src/app/services/contacts.service';
import { HomePhoneComponent } from '../../components/home-phone/home-phone.component';
import { MovilPhoneComponent } from '../../components/movil-phone/movil-phone.component';
import { WhatsAppPhoneComponent } from '../../components/whats-app-phone/whats-app-phone.component';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent {
  @ViewChild(HomePhoneComponent, { read: ViewContainerRef })

  public dynamicHost!: ViewContainerRef;
  private ViewContainerRefHome!: ComponentRef<HomePhoneComponent>;
  private ViewContainerRefMovil!: ComponentRef<MovilPhoneComponent>;
  private ViewContainerRefWhats!: ComponentRef<WhatsAppPhoneComponent>;

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

    switch (type) {
      case 'home':
        this.ViewContainerRefHome = this.dynamicHost.createComponent(HomePhoneComponent);
        const componentIndexH = this.dynamicHost.indexOf(this.ViewContainerRefHome.hostView);
        (this.ViewContainerRefHome.instance as HomePhoneComponent).phoneIndex =
          componentIndexH + 2;
            
        break;
    
        case 'movil':
          this.ViewContainerRefMovil = this.dynamicHost.createComponent(MovilPhoneComponent);
          const componentIndexM = this.dynamicHost.indexOf(this.ViewContainerRefHome.hostView);
          (this.ViewContainerRefMovil.instance as MovilPhoneComponent).phoneIndex =
            componentIndexM + 2;
              
        break;
    
        case 'whatsapp':

        this.ViewContainerRefWhats = this.dynamicHost.createComponent(WhatsAppPhoneComponent);
        const componentIndexW = this.dynamicHost.indexOf(this.ViewContainerRefHome.hostView);
        (this.ViewContainerRefWhats.instance as WhatsAppPhoneComponent).phoneIndex =
          componentIndexW + 2;

        break;
    
      default:
        break;
    }
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
