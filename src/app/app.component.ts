import {Component, OnInit} from '@angular/core';
import {ChatServices} from "./chat/chat-services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadingIp = true;

  constructor(private chatService: ChatServices) { }

  ngOnInit() {
      this.chatService.loadIp().then(() => {
        this.loadingIp = false;
      });
  }

}
