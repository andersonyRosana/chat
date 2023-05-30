import {Component, OnChanges, OnInit} from '@angular/core';
import { ChatServices } from "../../chat-services";
import {IUser} from "../../interfaces/chat.interface";
import {UsersService} from "../../../shared/services/users.service";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})

export class ChatsComponent implements OnInit {

  //search
  searchText: any;
  // end search

  id: any;
  users: any[] = [];
  messages: any[] = [];

  constructor(private chatServices: ChatServices, private usersService: UsersService) { }


  ngOnInit() {
    this.getUserByIp();
    this.getUsers();
    const id = localStorage.getItem('user-receiver');
    if(id){
      this.id = JSON.parse(id).id;
    }
  }

  getUserByIp(){
    const ip = this.chatServices.getMyIp();
    this.chatServices.getAllUsers().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if(ip === doc.data()['userIp']){
          const user = {
            userId: doc.id,
            ...doc.data()
          }
          localStorage.setItem('user-login', JSON.stringify(user));
        }
      });
    });
  }

  /*get conversations*/
  getUsers(){
    const myUser = localStorage.getItem('user-login');
    if(myUser){
      const id = JSON.parse(myUser).userId;
      this.usersService.getConversations(id).onSnapshot(data => {
        let users: any[] = [];
        data.docs.forEach(element => {
          users.push({
            senderId: element.id,
            ...element.data()
          });
        });
        this.users = users;
      });
    }
  }

  setUserReceiver(user:any){
    const miUser = localStorage.getItem('user-login');
    const receiver = localStorage.getItem('user-receiver')
    if(miUser && receiver){
      const senderId = JSON.parse(miUser).userId;
      const receiverId = JSON.parse(receiver).id;
      this.updateUnreadToValidateReceivedOrSentMessages(senderId, receiverId);
    }
    this.id = user.id;
    const userReceiver = {
      avatar: user.avatar,
      id: user.senderId,
      register: user.lastMessage,
      username: user.username
    };
    localStorage.setItem('user-receiver', JSON.stringify(userReceiver));
    this.getMessageHistory(userReceiver);
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

  updateUnreadToValidateReceivedOrSentMessages(senderId:string, receiverId:string){
      this.chatServices.updateUnread(senderId, receiverId).then(data => {
        // console.log(data);
      })
  }

}
