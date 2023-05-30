import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ChatServices} from "../../chat-services";
import {UserChatI} from "../../interfaces/chat.interface";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  dataChat!: UserChatI;
  dataNombre: string | undefined = ''
  dataId: string | undefined = ''

  constructor( public _chatServices: ChatServices ) {
    this._chatServices.dataChatSelect.subscribe((data:UserChatI[]) => {
      data.forEach((element:UserChatI) => {
        this.dataChat = {
          id : element.id,
          username: element.username
        }
        this.dataNombre = this.dataChat.username;
        this.dataId = this.dataChat.id;
      })
    })
  }

}
