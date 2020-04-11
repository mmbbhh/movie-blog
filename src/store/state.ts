export interface UserOptions {
  nickName?: string,
  name?: string,
  token?: string,
  headImg?: string
  id?: string
}

export class State {
  constructor(public user:UserOptions){
    this.user = user
  }
}

export const state:State = {
  user: {
    headImg: 'http://123.57.217.239:8889/images/2020/04/09/timgimagequality80sizeb9999_10000sec1586426123629di8c9947d78022a9c3f53150682af5fd97imgtype0srchttp3A2F2Fhbimg.huabanimg.com2F9662a766b2e14418b22ed6e8185913c3e7562ab455df-j8mU0R_fw658.jpg'
  }
}

