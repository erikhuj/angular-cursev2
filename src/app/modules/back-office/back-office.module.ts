import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackOfficeRoutingModule } from './back-office-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { ListComponent } from './pages/list/list.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { AddContactComponent } from './pages/add-contact/add-contact.component';
import { UpdateContactComponent } from './pages/update-contact/update-contact.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { AboutComponent } from './pages/about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { HomePhoneComponent } from './components/home-phone/home-phone.component';
import { MovilPhoneComponent } from './components/movil-phone/movil-phone.component';
import { WhatsAppPhoneComponent } from './components/whats-app-phone/whats-app-phone.component';


@NgModule({
  declarations: [
    LayoutComponent,
    ListComponent,
    UpdateUserComponent,
    AddContactComponent,
    UpdateContactComponent,
    NavBarComponent,
    AboutComponent,
    HomePhoneComponent,
    MovilPhoneComponent,
    WhatsAppPhoneComponent

  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,


  ]
})
export class BackOfficeModule { }
