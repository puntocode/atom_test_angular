import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Toastr Module
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
const toast = { timeOut: 3000, closeButton: true, progressBar: true };

//Bootstrap Module
import { ModalModule } from 'ngx-bootstrap/modal';
import { tokenInterceptorProvider } from './shared/interceptors/interceptor.service';

//Fechas en Español
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot(toast),
    ModalModule.forRoot()
  ],
  providers: [
    tokenInterceptorProvider,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
