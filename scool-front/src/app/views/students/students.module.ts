import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


//imports
import { CodeInputModule } from 'angular-code-input';
import { NgxMaskModule, IConfig } from 'ngx-mask'

//Components
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CodePhoneComponent } from './auth/code-phone/code-phone.component';
import { CodeEmailComponent } from './auth/code-email/code-email.component';
import { ForgoutPasswordComponent } from './auth/forgout-password/forgout-password.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';
import { StudentsRoutingModule } from './students-routing.module';
import { IndexProfileComponent } from './profile/index-profile/index-profile.component';
import { ProfileSidebarComponent } from './profile/profile-sidebar/profile-sidebar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditFamilyComponent } from './profile/edit-family/edit-family.component';
import { InfoStudentComponent } from './profile/info-student/info-student.component';
import { ComponentsModule } from 'src/app/components/components.module';


const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    CodePhoneComponent,
    CodeEmailComponent,
    ForgoutPasswordComponent,
    NewPasswordComponent,
    IndexProfileComponent,
    ProfileSidebarComponent,
    EditFamilyComponent,
    InfoStudentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CodeInputModule,
    SharedModule,
    StudentsRoutingModule,
    NgxMaskModule.forRoot(maskConfigFunction),
    ComponentsModule,
  ],
  exports: [
    LoginComponent,
    CodePhoneComponent,
    RegisterComponent,
    CodeEmailComponent,
    ForgoutPasswordComponent,
    NewPasswordComponent
  ]
})
export class StudentsModule { }
