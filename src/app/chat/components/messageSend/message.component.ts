import {
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {MessageI, UserChatI} from "../../interfaces/chat.interface";
import {ChatServices} from "../../chat-services";

@Component({
  selector: 'app-messageSend',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnChanges {

  @Input() messages: MessageI[] = [];

  ip = this.chatServices.getMyIp();
  senderId: string = '';

  constructor(private chatServices: ChatServices){
    setTimeout(() => {
      let myList = document.getElementsByClassName('msj') as HTMLCollectionOf<HTMLAnchorElement>;
      document.querySelector('#containerMessages')?.scrollIntoView({  block: 'end', inline: 'nearest' });
    }, 700);
  }

  ngOnInit() {
    const userLogger = localStorage.getItem('user-login');
    if(userLogger){
      this.senderId = JSON.parse(userLogger).userId;

    }
    this.scrollPositionLastMessage();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.scrollPositionLastMessage();
  }

  scrollPositionLastMessage(){
      setTimeout(() => {
        let myList = document.getElementsByClassName('msj') as HTMLCollectionOf<HTMLAnchorElement>;
        document.querySelector('#containerMessages')?.scrollIntoView({  block: 'end', inline: 'nearest' });
    }, 0);
  }



}
