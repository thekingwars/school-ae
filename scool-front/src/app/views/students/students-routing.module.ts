import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoGuard } from 'src/app/guards/aluno.guard';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CodeEmailComponent } from './auth/code-email/code-email.component';
import { CodePhoneComponent } from './auth/code-phone/code-phone.component';
import { ForgoutPasswordComponent } from './auth/forgout-password/forgout-password.component';
import { LoginComponent } from './auth/login/login.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';
import { RegisterComponent } from './auth/register/register.component';
import { EditFamilyComponent } from './profile/edit-family/edit-family.component';
import { IndexProfileComponent } from './profile/index-profile/index-profile.component';
import { InfoStudentComponent } from './profile/info-student/info-student.component';
import { ProfileSidebarComponent } from './profile/profile-sidebar/profile-sidebar.component';

const routes: Routes = [

    {
      path: '',
      children: [
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'register',
          component: RegisterComponent
        },
        {
          path: 'verifyCodePhone',
          component: CodePhoneComponent
        },
        {
          path: 'verifyCodeEmail',
          component: CodeEmailComponent
        },
        {
          path: 'forgoutPassword',
          component: ForgoutPasswordComponent
        },
        {
          path: 'new-password/:token',
          component: NewPasswordComponent
        },
        {
          path: 'profile',
          canActivate: [AuthGuard, AlunoGuard],
          component: ProfileSidebarComponent,
          children: [
            {
              path: 'user/:id',
              component: IndexProfileComponent
            },
            {
              path: 'family/user/:id',
              component: EditFamilyComponent
            },
            {
              path: 'user/infoStudent/:id',
              component: InfoStudentComponent
            }
          ]
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }