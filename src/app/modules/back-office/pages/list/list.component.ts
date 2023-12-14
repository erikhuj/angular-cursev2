import { Component } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  loading = false;

  //to list
  contacts = [];

  //offset (salto)
  offset = 1;
  //limit (por pagina)
  limit = 10;
  //searchTerm (para mandar)
  searchTerm = '';

  //totalContacts (contactos totales)
  totalContacts = 0;
  //totalContactsSum (suma y resta de contactos)
  totalContactsSum = 0;

  currentContact = 0;

  currentPage = 1;
  totalPages = 0;

  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    //start list
    this.getContacts(this.offset, this.searchTerm);
  }

  getContacts(offset: number, searchTerm: string) {
    this.loading = true;

    //calculate offset

    this.offset = (offset - 1) * this.limit;
    //equalize searchTerm
    this.searchTerm = searchTerm;

    //body send
    const body = {
      offset: this.offset,
      limit: this.limit,
      searchTerm: this.searchTerm,
    };
    this.contactsService.getConcats(body).subscribe({
      next: (data) => {
        console.log(data);
        //calculate totalContacts
        if (this.totalContacts === 0) {
          this.totalContacts = data.result.count;
        }
        this.currentContact = this.totalContacts + this.totalContactsSum;
        //compatare if my current page is greater than totalContacts
        if (
          (data.result.list.length * this.offset) / this.limit + this.limit >
          this.currentContact
        ) {
          //calculate end
          const end =
            (data.result.list.length * this.offset) / this.limit +
            this.limit -
            this.currentContact;
          console.log(this.limit - end, 'end');
          this.contacts = data.result.list.splice(0, this.limit - end);
        } else {
          //sent all my contacts
          console.log('soy menor');
          this.contacts = data.result.list;
        }

        //calculate totalPages
        this.totalPages = Math.ceil(this.currentContact / this.limit);
        //calculate currentPage
        this.currentPage = this.offset / this.limit + 1;

        console.log('offset', this.offset);
        console.log('limit', this.limit);
        console.log('searchTerm', this.searchTerm);
        console.log('currentContact', this.currentContact);
        console.log('currentPage', this.currentPage);
        console.log('totalPages', this.totalPages);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  deleteContact(contactId: number) {
    this.loading = true;

    if (confirm('¿Desea borrar el contacto?')) {
      this.contactsService.deleteConcat(contactId).subscribe({
        next: (data) => {
          this.totalContactsSum--;
          alert('Contacto eliminado');
          console.log(data);
        },
        complete: () => {
          this.loading = false;
          this.getContacts(1, '');
        },
      });
    }
  }

}
