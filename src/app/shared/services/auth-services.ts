import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from 'firebase/compat/app';
// import {Auth, createUserWithEmailAndPassword} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthServices {

  db = firebase.firestore();

  constructor(/*private  auth: Auth,*/ private firestore: AngularFirestore) { }

  // register({ email, password }: any){
  //   return  createUserWithEmailAndPassword(this.auth, email, password);
  // }

  register(users: any): Promise<any> {
    return this.firestore.collection('user').add(users)
  }

  getUserByCredentialsByLogin(username:string, password:string){
    const myQuery = this.db.collection('user')
      .where('username', '==', username)
      .where('password', '==', password).get();
    return myQuery;
  }
}
