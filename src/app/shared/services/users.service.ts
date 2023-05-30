import {EventEmitter, Injectable} from '@angular/core';
import firebase from 'firebase/compat/app';
import {environment} from "../../../environment";
import {Constants} from "../constants/constants";
import {IUser} from "../../chat/interfaces/chat.interface";

firebase.initializeApp(environment.firebaseConfig);

const db = firebase.firestore();
const query = db.collection(Constants.USER_COLLECTION);

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  getIdSelectionChat: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  getConversations(senderId: string){
    return query.doc(senderId).collection(Constants.CONVERSATIONS)
      .orderBy('lastUpdate', 'desc');
  }
}
