import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from "@angular/common";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../environment";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FIREBASE_OPTIONS } from "@angular/fire/compat";
import { HttpClientModule } from '@angular/common/http';
import { FirestoreModule } from "@angular/fire/firestore";
import {ChatModule} from "./chat/chat.module";

import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    provideAuth( () => getAuth()),
    provideFirebaseApp( () => initializeApp(environment.firebaseConfig)),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FirestoreModule,
    HttpClientModule,
    ChatModule,
    MatDialogModule
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
