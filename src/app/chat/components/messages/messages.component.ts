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

  methodToChangeBackground(){
    const backgrounds = [
      'fondo-cars.jpg',
      'fondo.jpg',
      'fondo-telita2.jpg',
      'fondo-flor.jpg',
      'fondo-flores.jpg',
      'fondo-cuadros.png',
      'fondo-mar.jpg',
      'fondo-gato.jpg',
      'fondo-cars2.jpg',
      'fondo-triangulo.jpg',
      'fondo-arbol.jpg',
      'fondo-accesorios.jpg',
      'fondo-bola.jpg',
      'fondo-sofa.jpg',
      'fondo-gatitos.jpg',
      'fondo-reloj.jpg',
      'fondo-leon.jpg',
      'fondo-ositos.jpg',
      'fondo-woll.jpg',
      'fondo-clasico.jpg',
    ];

    const myElement: any = document.getElementById("messages");
    let currentBackgroundIndex = 0;
    setInterval(() => {
      currentBackgroundIndex++;
      if (currentBackgroundIndex >= backgrounds.length) {
        currentBackgroundIndex = 0;
      }
      myElement.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('assets/${backgrounds[currentBackgroundIndex]}')`;
    }, 1800000);
  }

  ngOnInit() {
    this.getMessagesSend();
    this.methodToChangeBackground();
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
