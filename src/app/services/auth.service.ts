import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { GetAuthDto, GetLoginDto, GetRegisterUsernDto, loginDto, registerDto, userDto } from '../model/auth-dto';
import { environment } from '../envirments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl
  http = inject(HttpClient)
   getUser!: userDto;

  isLoggedIn$ = new BehaviorSubject<boolean>(false)
  getUser$: Subject<userDto> = new Subject<userDto>();
 
  constructor() { }

  isLoggedIn(){
    return !!localStorage.getItem('user')
  }

  registerUser(registerObj:registerDto):Observable<GetAuthDto>{
    return this.http.post<GetAuthDto>(this.baseUrl+'RegisterCustomer', registerObj)
  }

  loginUser(userObj:loginDto):Observable<GetLoginDto>{
    return this.http.post<GetLoginDto>(this.baseUrl+'Login', userObj)
  }

  getAllUser():Observable<GetRegisterUsernDto>{
    return this.http.get<GetRegisterUsernDto>(this.baseUrl+'GetAllCustomer')
  }

  
}
