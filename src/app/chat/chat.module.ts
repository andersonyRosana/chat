import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from "./components/chat/chat.component";
import { ChatsComponent } from "./components/chats/chats.component";
import { InputComponent } from "./components/input/input.component";
import { MessageComponent } from "./components/messageSend/message.component";
import { MessagesComponent } from "./components/messages/messages.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ContactComponent } from './components/contact/contact.component';
import { SettingComponent } from './components/setting/setting.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatButtonModule} from "@angular/material/button";
import { ModalComponent } from './components/modal/modal.component';
import { CookieService } from "ngx-cookie-service";

@NgModule({
  declarations: [
    ChatComponent,
    ChatsComponent,
    InputComponent,
    MessageComponent,
    MessagesComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    SettingComponent,
    ModalComponent
  ],
  exports: [
    HomeComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    MatButtonModule
  ],
  providers: [
    Storage,
    CookieService
  ],
  entryComponents: [
    ModalComponent
  ]
})
export class ChatModule { }
