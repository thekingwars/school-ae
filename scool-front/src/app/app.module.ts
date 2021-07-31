import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

//components
import { AppComponent } from './app.component';
import { Redirect404Component } from './views/pages/redirect404/redirect404.component';

//modules
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';

//modules npm
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderInterceptorInterceptor } from './interceptor/loader-interceptor.interceptor';
import { HomeComponent } from './views/pages/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    Redirect404Component,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ComponentsModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
