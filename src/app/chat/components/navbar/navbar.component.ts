import {Component, OnInit} from '@angular/core';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { DocumentData } from "@angular/fire/compat/firestore";
import {ChatServices} from "../../chat-services";
import {publicIpv4} from "public-ip";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {IRegister} from "../../interfaces/chat.interface";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  user: IRegister = {};

  constructor( private chatService: ChatServices, private router: Router, private cookieService: CookieService) {}

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    const miUser = localStorage.getItem('user-login');
    if(miUser) {
      this.user = {
        name: JSON.parse(miUser).name,
        avatar: JSON.parse(miUser).avatar
      }
      this.chatService.dataSuscribeFromSetting.subscribe((data: any) => {
        this.user = {};
        localStorage.setItem('user-login', JSON.stringify(data));
        this.user = {
          name: data.name,
          avatar: data.avatar
        }
      })
    }
  }

  logout(){
    localStorage.removeItem('user-login');
    localStorage.removeItem('update');
    this.cookieService.delete('userMemory');
    this.router.navigate(['/chat/login']);
  }
}

