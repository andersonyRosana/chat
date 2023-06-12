import {EventEmitter, Injectable} from '@angular/core';
import {AngularFirestore,} from "@angular/fire/compat/firestore";
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {publicIpv4} from "public-ip";
import {collectionData, Firestore, query, where} from "@angular/fire/firestore";
import {MessageI, User, UserChatI} from "./interfaces/chat.interface";
import {collection, getFirestore} from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {getStorage, ref} from "firebase/storage";
import {uploadBytes} from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class ChatServices {

    db = firebase.firestore();

    dataBySuscribeInChat : EventEmitter<any> = new EventEmitter<any>;
    dataChatSelect: EventEmitter<any> = new EventEmitter<any>();
    dataMenssageSend: EventEmitter<MessageI> = new EventEmitter<MessageI>();
    getIdSelectionChat: EventEmitter<string> = new EventEmitter<string>();
    dataAvatar: EventEmitter<string> =  new EventEmitter<string>();
    dataSuscribeFromSetting: EventEmitter<any> = new EventEmitter<any>;

    private ip!: string;

    get theFirebase(){
      const db = getFirestore()
     return db;
    }

    get idSelectionChat(){
      return this.getIdSelectionChat;
    }

    public chats:any[] = [];

    constructor( private _newFirestore: Firestore,
                 private http: HttpClient,
                 private firestore: AngularFirestore,
                 ) { }

    getMyIp(): string {
      return this.ip;
    }

    async loadIp(){
      await publicIpv4().then( data => {
        localStorage.setItem('ip-logger', data)
        this.ip = data;
      });
    }

    addDataUsers(users: any): Promise<any> {
      return this.firestore.collection('user').add(users)
    }

    addSendMessage(message: UserChatI, senderId: string, receivedId: string){
     this.firestore.collection('user').doc(senderId).collection('conversation').doc(receivedId).collection('message').add(message) ;
     this.firestore.collection('user').doc(receivedId).collection('conversation').doc(senderId).collection('message').add(message);
    }

    getMessagesSent(myId:string, idMsg: string) {
        return this.db.collection('user').doc(myId)
          .collection('conversation').doc(idMsg)
          .collection('message').orderBy('dateMessage','asc');
    }

    getAllUsers(){
      const myQuery = this.db.collection('user').get();
      return myQuery
    }

    async getUsers() {
      const myQuery = this.db.collection('user');
      let dataArr: any[] = [];

      return new Promise((resolve) => {
        myQuery.get().then((data) => {
          data.forEach(doc => {
            dataArr.push({
              id: doc.id,
              ...doc.data()
            });
          });
          let userToRemove: User | null = null;
          const sender = localStorage.getItem('user-login');
          let myId = '';
          if(sender){
            myId = JSON.parse(sender).userId;
          }
          for (let user of dataArr) {
            if (myId == user.id) { //tomando el valor del usuario comforme al ip
              userToRemove = user;
            }
          }
          if (userToRemove != null) {
            dataArr = dataArr.filter(user => user != userToRemove);
            resolve(dataArr)
          }
        })
      })
    }

    async getUser(ip: string): Promise<any> {
      return new Promise((resolve) => {
        const myQuery = query(collection(this._newFirestore, 'user'), where('userIp', '==', ip));
        const data = collectionData(myQuery) as Observable<User[]>;
        data.subscribe((users) => {
          resolve(users.shift());
        });
      });
    }

    async getUserId(id: string){
      const myQuery = this.firestore.collection('user').doc(id)
      return myQuery.get();
    }

  async getUserUsindSnapshot(id: string):Promise<any>{
    const myQuery = this.firestore.collection('user').doc(id)
    return myQuery
  }

    updateUserById(id:string, avatar:string, username:string){
      const myQuery = this.db.collection('user').doc(id).update({
        avatar: avatar,
        name: username,
        dateUpdate: new Date()
      })
      return myQuery
    }

    updateUnread(id:string, idReceiver:string){
    const myQuery = this.db.collection('user').doc(id).collection('conversation').doc(idReceiver).update({
      unread: false
    })
    return myQuery
    }

    getUserByIp(ip: string){
      return this.db.collection('user').where('userIp', '==', ip).get();
    }

    uploadImg(file:any, imgBase64: any){
      const storage = getStorage();
      const mountainImagesRef = ref(storage, `images/${file}`);
      uploadBytes(mountainImagesRef, file).then((snapshot:any) => {
        console.log(snapshot.ref);
      });
    }
}
