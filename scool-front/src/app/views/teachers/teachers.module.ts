import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeInputModule } from 'angular-code-input';

import { TeachersRoutingModule } from './teachers-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { VerifyCodeEmailComponent } from './auth/verify-code-email/verify-code-email.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CandidaturaComponent } from './profile/candidatura/candidatura.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ForgoutPasswordComponent } from './auth/forgout-password/forgout-password.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyCodeEmailComponent,
    CandidaturaComponent,
    ForgoutPasswordComponent,
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CodeInputModule,
    ComponentsModule,
    TeachersRoutingModule
  ]
})
export class TeachersModule { }
