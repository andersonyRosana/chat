import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked {

  constructor(private cookieService: CookieService, private router: Router) {
  }

  ngOnInit() {
    const userCookie = this.cookieService.get('userMemory').length;
    setTimeout(() => {
    },8000)
      if(!userCookie) {
        this.router.navigate(['chat/login']);
      }

  }

  ngAfterViewChecked() {
    const userCookie = this.cookieService.get('userMemory').length;
      if(!userCookie) {
        this.router.navigate(['chat/login']);
      }
  }

}

