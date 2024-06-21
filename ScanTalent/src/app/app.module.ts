import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { defineCustomElements } from '@npm-bbta/bbog-dig-dt-webcomponents-lib/loader';
import { DetalleCvComponent } from './components/home/detalle-cv/detalle-cv.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetalleCvComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
