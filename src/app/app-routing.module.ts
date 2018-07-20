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
  { path: 'dashboard/users/delete/:id', component: DeleteuserComponent}
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
