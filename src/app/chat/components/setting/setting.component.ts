import {Component, OnInit, Inject, OnChanges} from '@angular/core';
import {ChatServices} from "../../chat-services";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  imagen: any[] = [];
  file: any[] =[];
  avatar: string = '';

  settingForm : FormGroup = this.fb.group({
    editName: [ '', [ Validators.required, Validators.minLength(3) ]],
  })

  constructor(private chatService: ChatServices,
              public dialog: MatDialog,
              private fb: FormBuilder) {
    this.chatService.dataAvatar.subscribe(data => {
      this.avatar = data;
    });
  }

  ngOnInit() {
    // this.getimages();
  }

  dialogMethod(){
      this.dialog.open(ModalComponent);
  }

  sendSetting(){
    const data = this.getDatas();
    this.chatService.updateUserByIp(data.myId, data.avatar, data.name);
    this.settingForm.reset();
  }

  getDatas(){
    const valueStorage = localStorage.getItem('user-login');
    let myId = '';
    if(valueStorage){
      myId = JSON.parse(valueStorage).userId
    }

    return {
      myId: myId,
      name: this.settingForm.value.editName,
      avatar: this.avatar
    }
  }




  //para isar con firebase para gguardar imagen en storage de firebase
  // uploadImage(event:any){
  //   let file = event.target.files;
  //   let reader = new FileReader(); //para transformar el archivo en una  imagen 64
  //   reader.readAsDataURL(file[0]);
  //   reader.onloadend = () => {
  //     this.imagen.push(reader.result);
  //     this.chatService.uploadImg(file[0].name, this.imagen);
  //   }
  // }


}



