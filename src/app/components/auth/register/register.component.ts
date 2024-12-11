import { AuthService } from './../../../services/auth.service';
import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { GetAuthDto, GetLoginDto, loginDto, registerDto } from '../../../model/auth-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,FormsModule, ReactiveFormsModule,CommonModule,MatFormFieldModule, MatInputModule,MatCardModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm!: FormGroup;
  user!:registerDto
  loginUser = new loginDto;

  private _snackBar = inject(MatSnackBar);
  constructor(private fb:FormBuilder, private authService:AuthService,private router:Router) {

    this.registerForm = this.fb.group({
      CustId: [0,Validators.required],
      Name: ['',Validators.required],
      MobileNo: ['',Validators.required],
      Password: ['',Validators.required],
      // CustId:new FormControl('0'),
      // Name:new FormControl(),
      // MobileNo:new FormControl(),
      // Password:new FormControl(),
  })    
  }

  get registrationFormControl(){
    return this.registerForm.controls;
  }
  
  register(){
    this.user = this.registerForm.value
    this.authService.registerUser(this.user).subscribe({
      next:(result:GetAuthDto)=>{
        if(result.result == false){
          this._snackBar.open(result.message,'X',{
            duration:3000,
            panelClass: ['danger-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          })
          this.registerForm.reset()
          return;
        }

        this.loginUser.UserName = this.user.MobileNo;
        this.loginUser.UserPassword = this.user.Password;
        // to show top right notification
        this._snackBar.open(result.message,'X',{
          duration:3000,
          panelClass: ['custom-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        })

        this.login()
      },
      error:(error:GetAuthDto)=>{
        this._snackBar.open(error.message,'X',{
          duration:3000,
          panelClass: ['danger-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        })
        this.registerForm.reset()
        return;
      }
    })
  }


  login(){
    this.authService.loginUser(this.loginUser).subscribe({
      next:(result:GetLoginDto)=>{
        localStorage.setItem('user', JSON.stringify(result.data))
        this.authService.isLoggedIn$.next(true)
        this.authService.getUser = result.data
        this.authService.getUser$.next(result.data)
        this.router.navigateByUrl('/products')
      },
      error:(error:GetLoginDto)=>{
        alert(error.message)
      }
    })
  }

}
