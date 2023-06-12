import {Component, OnInit} from '@angular/core';
import {ChatServices} from "../../chat-services";
import {UserChatI} from "../../interfaces/chat.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  searchText: any;

  users: any[] = [];
  id!:string;
  messages: any[] = [];

  constructor(private chatServices: ChatServices, public router: Router) {
  }


ngOnInit() {
    this.getUsers();
}

  getUsers() {
    this.chatServices.getUsers().then( (data:any )=> {
      data.forEach(( element:any) => {
        this.users.push({
            ...element
        });
      })
    })
  }

  setUserReceiver(user:any){
    localStorage.setItem('user-receiver', JSON.stringify(user));
    this.getMessageHistory(user);
    let valuesByEmit: any = {
      avatar: user.avatar,
      name: user.name,
      id: user.id
    }
    sessionStorage.setItem('chatSelectioned', JSON.stringify(valuesByEmit));
    this.chatServices.dataBySuscribeInChat.emit(valuesByEmit);
    this.router.navigate(['chat/home/chats']);
  }

  getMessageHistory(user: any){
    const sender = localStorage.getItem('user-login');
    const receiver = user.id;
    if (sender && receiver) {
      const senderId = JSON.parse(sender).userId;
      this.chatServices.getMessagesSent(senderId, receiver).onSnapshot(data => {
        this.messages = [];
        data.docs.forEach(element => {
          this.messages.push(element.data());
        });
        this.emitValuesToConversations(this.messages);
      });
    }
  }

  emitValuesToConversations(values: any) {
    this.chatServices.dataMenssageSend.emit(values)
  }



}
