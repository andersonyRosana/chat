import {Component, OnInit} from '@angular/core';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { DocumentData } from "@angular/fire/compat/firestore";
import {ChatServices} from "../../chat-services";
import {publicIpv4} from "public-ip";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  user: any

  constructor( private chatService: ChatServices, private router: Router, private cookieService: CookieService) {

  }

  ngOnInit() {
    this.getUser()
  }

  getUser(){
    const myIp = this.chatService.getMyIp();
    this.chatService.getUserByIp(myIp).then(doc => {
      doc.docs.map((element:any) => {
        this.user = {
          avatar: element.data().avatar,
          name: element.data().name
        }
      })
    })
  }

  logout(){
    localStorage.removeItem('user-login');
    this.cookieService.deleteAll('/')
    this.cookieService.deleteAll('/chat/login');
    this.cookieService.deleteAll('/chat/register');
    this.cookieService.deleteAll('/chat/home');
    this.cookieService.deleteAll('/chat/home/contact');
    this.cookieService.deleteAll('/chat/home/chats');
    this.cookieService.deleteAll('/chat/home/setting');
    this.router.navigate(['/chat/login']);
  }
}

