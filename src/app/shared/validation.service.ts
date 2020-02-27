import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor(private http: HttpClient) { }
  checkMail(mail) {
    const url = 'http://apilayer.net/api/check?access_key=896300e5534d44ec656c3ab74f8e3ef7&email=' + mail + '&smtp=1&format=1';
    return this.http.get(url);
  }
}
