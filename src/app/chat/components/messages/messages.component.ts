import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {MessageI, UserChatI} from "../../interfaces/chat.interface";
import {ChatServices} from "../../chat-services";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  messages: MessageI[] = [];

  ip = this.chatServices.getMyIp();

  constructor(private chatServices: ChatServices,
              private rutaActiva: ActivatedRoute) {
  }

  ngOnInit() {
    this.getMessagesSend();
  }

  getReceiverId(){
    return this.rutaActiva.snapshot.paramMap.get("id")
  }

  getMessagesSend() {
      this.chatServices.dataMenssageSend.subscribe((data:any) => {
        this.messages = [];
        const user = localStorage.getItem('user-login');
        const receiver = localStorage.getItem('user-receiver');
        if(user && receiver){
          data.forEach( (element:any) => {
            this.messages.push({
              dateMessage: element.dateMessage,
              message: element.message,
              receiverId: element.receiverId,
              senderId: element.senderId,
              avatarSender: JSON.parse(user).avatar,
              avatarReceiver: JSON.parse(receiver).avatar,
            });
          })
        }
      })
  }


}
