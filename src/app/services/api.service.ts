import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  request(data: any, request: any) {
    const path = `${environment.api}/${request}`;
    return this.http.post(path, data);
  }

  decryptOrEncrypt(data: any, option: number) {
    switch (option) {
      case 1:
        return JSON.parse(
          CryptoJS.AES.decrypt(data, environment.criptKey).toString(
            CryptoJS.enc.Utf8
          )
        );
        break;
      case 2:
        const res = JSON.stringify(data);
        return CryptoJS.AES.encrypt(res, environment.criptKey).toString();
        break;
      default:
        break;
    }
  }
  isAdmin(): boolean {
    const user = localStorage.getItem('user');
    const data = this.decryptOrEncrypt(user, 1);
    if (data.rol == 1) {
      return true;
    }
    return false;
  }
}
