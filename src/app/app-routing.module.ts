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
import { MenuComponent } from './dashboard/menu/menu.component';
import { AddMenuComponent } from './dashboard/menu/add-menu.component';
import { EditMenuComponent } from './dashboard/menu/edit-menu.component';
import { AddMediaComponent } from './dashboard/media/add-media.component';
import { RemoveMediaComponent } from './dashboard/media/remove-media.component';
import { AuthenticationGuard } from './dashboard/authentication.guard';



const router: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'blog', component: BlogComponent },
  { path: '*', component: ErrorComponent },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/users', component: UsersComponent, canActivate: [AuthenticationGuard] },
  { path: 'dashboard/users/page/:paged', component: UsersComponent, canActivate: [AuthenticationGuard]  },
  { path: 'dashboard/users/logout', component: LogoutComponent },
  { path: 'dashboard/users/add', component: AddusersComponent, canActivate: [AuthenticationGuard] },
  { path: 'dashboard/users/edit/:id', component: EditUsersComponent, canActivate: [AuthenticationGuard] },
  { path: 'dashboard/users/delete/:id', component: DeleteuserComponent, canActivate: [AuthenticationGuard] },

  { path: 'dashboard/pages', component: PagesComponent, canActivate: [AuthenticationGuard] },
  { path: 'dashboard/page/delete/:id', component: DeletePagesComponent, canActivate: [AuthenticationGuard] },
  { path: 'dashboard/page/add', component: AddPagesComponent, canActivate: [AuthenticationGuard] },
  { path: 'dashboard/page/edit/:id', component: EditPagesComponent, canActivate: [AuthenticationGuard]  },

  { path: 'dashboard/media', component: MediaComponent, canActivate: [AuthenticationGuard] },
  { path: 'dashboard/media/add', component: AddMediaComponent, canActivate: [AuthenticationGuard] },
  { path: 'dashboard/media/remove/:id', component: RemoveMediaComponent, canActivate: [AuthenticationGuard] },
  
  { path: 'dashboard/menu', component: MenuComponent, canActivate: [AuthenticationGuard] },
  { path: 'dashboard/menu/add', component: AddMenuComponent, canActivate: [AuthenticationGuard] },
  { path: 'dashboard/menu/edit/:id', component: EditMenuComponent, canActivate: [AuthenticationGuard] },
  
];	


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      router,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
