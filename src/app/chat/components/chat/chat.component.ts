import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatServices} from "../../chat-services";
import {IRegister, UserChatI} from "../../interfaces/chat.interface";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  dataChatSelect: IRegister = {};

  constructor( public _chatServices: ChatServices ) {

      this._chatServices.dataBySuscribeInChat.subscribe((data) => {
        this.dataChatSelect = data;
      })
  }

}
