import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { GetLoginDto, registerDto } from '../../../model/auth-dto';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { empty } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,  MatFormFieldModule, MatInputModule,MatCardModule, MatButtonModule,ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!:FormGroup;
  private _snackBar = inject(MatSnackBar);

  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router) {
    
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      UserName: ['03135533954',Validators.required],
      UserPassword: ['Test-1',Validators.required],
    })
  }

  get loginFormControl(){
    return this.loginForm.controls;
  }

  login(){
    this.authService.loginUser(this.loginForm.value).subscribe({
      next:(result:GetLoginDto)=>{
        if(result.result == false){
          this._snackBar.open(result.message,'X',{
            duration:3000,
            panelClass: ['danger-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          })
          this.loginForm.reset()
          this.router.navigateByUrl('/login')
          return;
        }


        localStorage.setItem('user', JSON.stringify(result.data))
        this.authService.isLoggedIn$.next(true)
        this.authService.getUser = result.data
        this.authService.getUser$.next(result.data)
        console.log("login",result.data)

        // to show top right notification
        this._snackBar.open(result.message,'X',{
          duration:3000,
          panelClass: ['custom-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        })
        this.router.navigateByUrl('/products')
      },
      error:(error:GetLoginDto)=>{
        this._snackBar.open(error.message,'X',{
          duration:3000,
          panelClass: ['danger-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        })
      }
    })
  }
}
