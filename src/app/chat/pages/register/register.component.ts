import {AfterViewChecked, Component, OnChanges, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ChatServices } from "../../chat-services";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {ILogin} from "../../interfaces/chat.interface";
import {ValidateFormsService} from "../../../shared/services/validate-forms.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../../components/modal/modal.component";
import {AuthServices} from "../../../shared/services/auth-services";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewChecked {

  submitted = false;
  avatarValid = false;
  usernameInValid = false;
  loading = false;

  avatar: string = '';

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2), Validators.pattern( this.validateForm.username )]],
    name: ['', [Validators.required, Validators.minLength(2),Validators.pattern( this.validateForm.name )]],
    // email: ['', [Validators.required, Validators.minLength(16),Validators.pattern( this.validateForm.emailPattern ) ]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
  }, {
    validators: [ this.validateForm.equalFields( 'password', 'confirmPassword' ) ]
  } )


  constructor(private  fb: FormBuilder,
               private chatServices: ChatServices,
               private _toastr: ToastrService,
               private router: Router,
               private validateForm: ValidateFormsService,
               public dialog: MatDialog,
               private authService: AuthServices,
               private cookieService: CookieService ){
    this.chatServices.dataAvatar.subscribe(data => {
      this.avatar = data;
      this.avatarValid = true;
    });
  }

  ngOnInit() {
    const user =  this.cookieService.get('userMemory');
    if(user){
      this.router.navigate(['chat/home']);
    }
  }

  ngAfterViewChecked() {
    if ( this.registerForm.controls['username'].value?.length > 0){
      this.usernameInValid = false;
    }
  }

  validarCampo( campo: string ){
    return this.registerForm.get(campo)?.invalid && this.registerForm.get(campo)?.touched;
  }

  register() {
    const formData = {
      username: this.registerForm.value.username.toLowerCase(),
      name: this.registerForm.value.name.toLowerCase(),
      password: this.registerForm.value.password,
      avatar: this.avatar,
      register: new Date(),
      userIp: this.chatServices.getMyIp()
    }


    this.validateForm.validateUsername(formData.username).then(data => {
      data.forEach(element => {
        element.data() ? this.usernameInValid = true : this.usernameInValid = false;
      })
      if(this.usernameInValid){
        this.registerForm.controls['username'].reset();
        return
      } else {
        this.authService.register(formData).then((res) => {
          this.loading = false
          this._toastr.success('Usuario registrado con exito', 'Registro exitoso', {
            positionClass: 'toast-bottom-right'
          });
          this.router.navigate(['/chat/login']);
        }).catch(error => {
          console.log(error)
          this.loading = true;
        })
      }
    })
  }

  /*El metodo que llama al componente donde esta el dialogo de los avatars*/

  dialogMethod(){
    this.dialog.open(ModalComponent);
  }

}
