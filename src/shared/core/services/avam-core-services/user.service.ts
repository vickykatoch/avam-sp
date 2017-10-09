import { Injectable } from '@angular/core';
import { UserInfo } from "@common-model-utils/index";
import { HttpClient } from '@angular/common/http';


@Injectable()
export class UserService {
  private userInfo: UserInfo;

  constructor(private http: HttpClient) { }

  signIn(userId: string): Promise<UserInfo> {
    return new Promise<UserInfo>((resolve, reject) => {
      // this.http.get()
    });
  }
}
