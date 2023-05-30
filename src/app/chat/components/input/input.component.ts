import {Component, Input, OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import {IUser} from "../../interfaces/chat.interface";
import {ChatServices} from "../../chat-services";
import {MessagesService} from "../../../shared/services/messages.service";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() username: string | undefined;

  inputForm : FormGroup = this.fb.group({
    text: [ '', [ Validators.required, Validators.minLength(3) ]]
  })

  constructor(private fb: FormBuilder, private chatServices: ChatServices, private message: MessagesService){}

  ngOnInit() {}

  send() {
    const sender = this.sender();
    const receiver = this.receiver();
    const data = this.loadingData();
    this.chatServices.addSendMessage(data, data.senderId, data.receiverId);
    this.inputForm.reset();
    this.message.postNewConversation(data.senderId, data.receiverId, sender, receiver);
  }

  loadingData(){
    const  sender = localStorage.getItem('user-login');
    const receiver = localStorage.getItem('user-receiver');
    let senderId = '';
    let receiverId = '';
    if(sender && receiver){
      senderId = JSON.parse(sender).userId;
      receiverId = JSON.parse(receiver).id;
    }
    return {
      senderId: senderId,
      receiverId: receiverId,
      message: this.inputForm.value.text,
      dateMessage: new Date()
    }
  }

  sender(): IUser {
    const user = localStorage.getItem('user-login');
    const  receiver = localStorage.getItem('user-receiver');
    let senderId = '';
    let username = '';
    let avatar = '';
    let name = ''
    if(user && receiver){
      avatar = JSON.parse(receiver).avatar
      senderId = JSON.parse(user).userId;
      username = JSON.parse(receiver).username;
      name = JSON.parse(receiver).name;
    }
    return {
      userId: senderId,
      avatar: avatar,
      username: username,
      name: name,
      message: this.inputForm.value.text,
      unread: false,
      lastUpdate: new Date()
    }
  }

  receiver(): IUser {
    const user = localStorage.getItem('user-login');
    const receiver = localStorage.getItem('user-receiver')
    let senderId = '';
    let username = '';
    let avatar = '';
    let name = '';
    if(user && receiver){
      avatar = JSON.parse(user).avatar
      senderId = JSON.parse(user).userId;
      username = JSON.parse(user).username;
      name = JSON.parse(user).name;
    }
    return {
      userId: senderId,
      avatar: avatar,
      username: username,
      name: name,
      message: this.inputForm.value.text,
      unread: true,
      lastUpdate: new Date()
    }
  }



}
