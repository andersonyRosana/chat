import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {HomeComponent} from "./pages/home/home.component";
import {ChatsComponent} from "./components/chats/chats.component";
import {ContactComponent} from "./components/contact/contact.component";
import {SettingComponent} from "./components/setting/setting.component";
import {LoginGuard} from "../shared/guards/login.guard";
import {RegisterGuard} from "../shared/guards/register.guard";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: "home",
        component: HomeComponent,
        children: [
          {path: '', redirectTo: 'chats', pathMatch: 'full'},
          {path: 'chats', component: ChatsComponent},
          {path: 'contact', component: ContactComponent},
          {path: 'setting', component: SettingComponent}
        ],
        canActivate: [LoginGuard]
      },
      {path: "login", component: LoginComponent},
      {path: "register", component: RegisterComponent, canActivate: [RegisterGuard]},
      {path: '**', redirectTo: 'login'}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule {
}
