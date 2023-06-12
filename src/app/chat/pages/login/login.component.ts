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
      username: this.loginForm.value.username.toLowerCase(),
      password: this.loginForm.value.password.toLowerCase()
    }
    this.authService.getUserByCredentialsByLogin(dataForm.username, dataForm.password).then( data => {
          if(data.docs.length === 0){
            this.usernameInValid = true;
          } else if (data.docs.length > 0) {
            let user = {
              userId : data.docs[0].id,
              ...data.docs[0].data()
            };

            localStorage.clear(); // por borrar solo por prueba
            localStorage.setItem('user-login', JSON.stringify(user));
            this.cookieService.set('userMemory', 'Cookie para sesion activa', 7);
            this.router.navigate(['chat/home/']);
          }

      }
    )
  }

}
