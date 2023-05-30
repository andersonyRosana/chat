import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class ValidateFormsService {

  db = firebase.firestore();

  public name: string = '([a-zA-Z]+) ([a-zA-Z]+)';  // para validar conforme a los caracteres de ala a z en minusculas y en mayuscaulas
  public username: string = '^[a-z0-9]{2,16}$';

  public emailPattern: string = '[^@ \\t\\r\\n]+@gmail+\\.[^@ \\t\\r\\n]+';

  constructor() { }

  // validacion personalizada con condicional

  // noPuedeSerStrider = ( control: FormControl ):ValidationErrors | null => {
  //   const  valor:string = control.value?.trim().toLowerCase();
  //   if( valor !== 'strider' ){
  //     return {
  //       noStrider: true
  //     }
  //   } else {
  //     return null
  //   }
  //   console.log( valor )
  // }
  //
  equalFields = ( campo1: string, campo2:string ) => {
    return ( formGroup: AbstractControl ): ValidationErrors | null => {
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;
      // console.log( pass1, pass2 )
      if(pass1 !== pass2){
        formGroup.get(campo2)?.setErrors({ noIguales : true})
        return { noIguales: true }
      }
      formGroup.get(campo2)?.setErrors(null)
      return  null
    }
  }

  validateUsername(username:string){
    const myQuery = this.db.collection('user').where('username', '==', username).get();
    return myQuery;
  }

}
