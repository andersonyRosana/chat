

export interface  User {
  displayName: string;
  creationDate?: any;
  ip?: string
}

export interface UserChatI {
  username?: string;
  userIp?: string | number;
  id?: string;
  message?: string;
  register?: Date;
  issuerIp?: string;
  ipReceiver?: string;
  senderId?: string;
  receiverId?: string;
  dateMessage?: any;
}

export interface IUser {
  userId: string | undefined | null;
  avatar: string | undefined | null;
  username: string | undefined | null;
  name: string;
  message: string | undefined | null;
  unread: boolean;
  lastUpdate:any;
}

export interface MessageI {
  dateMessage?: any;
  message?: string;
  receiverId?: string;
  senderId?: string;
  avatarReceiver?: string;
  avatarSender?: string;
}

export interface ILogin {
  username: any;
  password: any;
}

export interface IRegister {
  avatar?: string;
  username?: any;
  name?: string;
  email?: any;
  password?: any;
  register?:  Date;
}


