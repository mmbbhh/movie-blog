import { httpRequest } from "@/service/index";

interface UserOption {
  id?: string,
  name?: string,
  nickName?: string,
  password?: string,
  checkPassword?: string,
  sex?: boolean,
  token?: string
}

export class User {
  option: UserOption
  constructor(option: UserOption) {
    this.option = option
  }

  static fromJson(json: any): User {
    const options: UserOption = {
      id: json['id'],
      name: json['login_name'],
      nickName: json['nick_name'],
      token: json['token']
    }
    return new User(options);
  }
}

export const resign = (option: UserOption) => {
  const user = new User(option)
  return httpRequest.request({
    method: 'post',
    url: '/resign',
    data: user.option
  })
}

export const login = (option: UserOption) => {
  const user = new User(option)
  return httpRequest.request({
    method: 'post',
    url: '/login',
    data: user.option
  })
}