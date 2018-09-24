import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ErrorComponent } from './error.component';
import { PricingComponent } from './pricing.component';
import { BlogComponent } from './blog.component';
import { ContactComponent } from './contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './dashboard/users/users.component';
import { LogoutComponent } from './dashboard/users/logout/logout.component';
import { AddusersComponent } from './dashboard/users/addusers.component';
import { DeleteuserComponent } from './dashboard/users/deleteuser.component';
import { EditUsersComponent } from './dashboard/users/edit-users/edit-users.component';

import { PagesComponent } from './dashboard/pages/pages.component';
import { AddPagesComponent } from './dashboard/pages/add-pages.component';
import { EditPagesComponent } from './dashboard/pages/edit-pages.component';
import { DeletePagesComponent } from './dashboard/pages/delete-pages.component';

import { MediaComponent } from './dashboard/media/media.component';
import { AddMediaComponent } from './dashboard/media/add-media.component';
import { RemoveMediaComponent } from './dashboard/media/remove-media.component';



const router: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'blog', component: BlogComponent },
  { path: '*', component: ErrorComponent },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/users', component: UsersComponent },
  { path: 'dashboard/users/page/:paged', component: UsersComponent },
  { path: 'dashboard/users/logout', component: LogoutComponent },
  { path: 'dashboard/users/add', component: AddusersComponent},
  { path: 'dashboard/users/edit/:id', component: EditUsersComponent},
  { path: 'dashboard/users/delete/:id', component: DeleteuserComponent},

  { path: 'dashboard/pages', component: PagesComponent},
  { path: 'dashboard/page/delete/:id', component: DeletePagesComponent},
  { path: 'dashboard/page/add', component: AddPagesComponent},
  { path: 'dashboard/page/edit/:id', component: EditPagesComponent },

  { path: 'dashboard/media', component: MediaComponent},
  { path: 'dashboard/media/add', component: AddMediaComponent},
  { path: 'dashboard/media/remove/:id', component: RemoveMediaComponent},
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      router,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
