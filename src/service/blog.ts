import { HttpRequest } from "@/service/config"
import { User } from "@/service/userService";
import {httpRequest} from "@/service/index";
import moment from "moment";

export interface BlogOptions {
  id?: number,
  name: string,
  date?: string,
  body: string,
  hide?: boolean,
  token?: string
  author?: boolean
  md?: string
}

export class Blog {
  constructor(public blog: BlogOptions) {
    this.blog = blog
  }
  static fromJson(json: any): Blog {
    const options: BlogOptions = {
      id: json['id'],
      name: json['nick_name'],
      date: moment(json['timestamp']).add(-8, 'hours').fromNow(),
      body: json['body'],
      author: json['author'],
      md: json['md_body']
    }
    return new Blog(options);
  }
}

export const allBlog = (id: number) => {
  return httpRequest.request({
    url: '/blog',
    params: {
      "id": id
    }
  })
}

export const upload = (data: BlogOptions) => {
  return httpRequest.request({
    method: 'post',
    url: '/blog/upload',
    data
  })
}

export const userBlog = (id: number) => {
  return httpRequest.request({
    url: '/blog/user/'+id
  })
}

export const update = (data: BlogOptions) => {
  return httpRequest.request({
    method: 'post',
    url: '/blog/update',
    data
  })
}