import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { ListComponent } from './pages/list/list.component';
import { AddContactComponent } from './pages/add-contact/add-contact.component';
import { UpdateContactComponent } from './pages/update-contact/update-contact.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'add-contact',
        component: AddContactComponent,
      },
      {
        path: 'update-contact',
        component: UpdateContactComponent,
      },
      {
        path: 'update-user',
        component: UpdateUserComponent, 
      },
      {
        path: 'about',
        component: AboutComponent,
      }
    ],
  },

  
  {
    path: '',
    redirectTo: 'list',
    pathMatch:  'prefix',
  },
  {
    path: '**',
    redirectTo: 'list',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackOfficeRoutingModule {}
