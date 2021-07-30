import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProfileSidebarComponent } from '../students/profile/profile-sidebar/profile-sidebar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { VerifyCodeEmailComponent } from './auth/verify-code-email/verify-code-email.component';
import { CandidaturaComponent } from './profile/candidatura/candidatura.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'VerifyCode', component: VerifyCodeEmailComponent
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileSidebarComponent,
        children: [
          {
            path: 'user/:id',
          },
          {
            path: 'candidatura/user/:id',
            component: CandidaturaComponent
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
