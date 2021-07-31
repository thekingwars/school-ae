import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    SidebarAdminComponent,
    DropzoneComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    SidebarAdminComponent,
    DropzoneComponent,
    LoaderComponent
  ]
})
export class ComponentsModule { }
