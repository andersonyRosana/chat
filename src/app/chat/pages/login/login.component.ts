import {Component, OnInit} from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {ILogin, IRegister} from "../../interfaces/chat.interface";
import { Router } from "@angular/router";
import {ValidateFormsService} from "../../../shared/services/validate-forms.service";
import {AuthServices} from "../../../shared/services/auth-services";
import { CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  usernameInValid = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private validateForm: ValidateFormsService,
              private authService: AuthServices,
              private cookieService: CookieService) {
    // this.cookieService.deleteAll('/chat/login');
  }

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2), Validators.pattern( this.validateForm.username )]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  })

  ngOnInit() {
    const user =  this.cookieService.get('userMemory');
    if(user){
      this.router.navigate(['chat/home']);
    }
  }

  validarCampo( campo: string ){
    return this.loginForm.get(campo)?.invalid && this.loginForm.get(campo)?.touched;
  }

  login() {
    const dataForm = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.authService.getUserByCredentialsByLogin(dataForm.username, dataForm.password).then( data => {
          if(data.docs.length === 0){
            this.usernameInValid = true;
          } else if (data.docs.length > 0) {
            data.forEach((element:any) => {
              const user = {
                avatar: element.data().avatar,
                userId: element.id,
                username: element.data().username,
                name: element.data().name,
                userIp: element.data().userIp
              }
            localStorage.setItem('user-login', JSON.stringify(user));
              this.cookieService.set('userMemory', 'Cookie para sesion activa', 7);
              // this.cookieService.set('userMemory', 'Cookie para sesion activa', 7, '/chat/login');
              // this.cookieService.set('userMemory', 'Cookie para sesion activa', 7, '/chat/register');
              // this.cookieService.set('userMemory', 'Cookie para sesion activa', 7, '/chat/home/contact');
              // this.cookieService.set('userMemory', 'Cookie para sesion activa', 7, '/chat/home/chats');
              // this.cookieService.set('userMemory', 'Cookie para sesion activa', 7, '/chat/home/setting');
              this.router.navigate(['chat/home/']);
            });

          }

      }
    )
  }

}
