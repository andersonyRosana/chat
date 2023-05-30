import { Component } from '@angular/core';
import {avatas} from "../../../shared/data/avatar";
import {MatDialog} from "@angular/material/dialog";
import {ChatServices} from "../../chat-services";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  avatars: any[] = avatas;

  constructor(public dialog: MatDialog, private chatService: ChatServices) {}

  avatarSend(value:string){
    this.chatService.dataAvatar.emit(value);
    this.dialog.closeAll();
  }

}
