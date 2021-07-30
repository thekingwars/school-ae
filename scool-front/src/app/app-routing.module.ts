import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/pages/home/home.component';
import { Redirect404Component } from './views/pages/redirect404/redirect404.component';

const routes: Routes = [
    {
      path: '404', component: Redirect404Component
    },
    {
      path: '', component: HomeComponent
    },
    {
      path: 'students', loadChildren: () => import('./views/students/students.module').then(m => m.StudentsModule)
    },
    {
      path: 'teachers', loadChildren: () => import('./views/teachers/teachers.module').then(m => m.TeachersModule)
    },
    {
      path: 'admin', loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule)
    },
    {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
