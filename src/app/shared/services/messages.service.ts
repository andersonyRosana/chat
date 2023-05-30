import { Injectable } from '@angular/core';
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
export class MessagesService {

  constructor() { }

  postNewConversation(senderId: string, receiverId: string, sender: IUser, receiver: IUser) {
    query.doc(senderId)
      .collection(Constants.CONVERSATIONS).doc(receiverId)
      .set(sender).then();

    query.doc(receiverId)
      .collection(Constants.CONVERSATIONS).doc(senderId)
      .set(receiver).then();
  }

}
