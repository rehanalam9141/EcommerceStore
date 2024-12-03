import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthService } from '../../services/auth.service';
import { GetLoginDto, GetRegisterUsernDto, userDto } from '../../model/auth-dto';

@Component({
  selector: 'app-registerd-user',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './registerd-user.component.html',
  styleUrl: './registerd-user.component.css'
})
export class RegisterdUserComponent {


  constructor(private authService:AuthService) {
    
  }

  userRegisterColumns: string[] = ['Id', 'Name', 'Mobile', 'Password'];
  allUser:userDto[]=[]
  dataSource = new MatTableDataSource(this.allUser);

  
  ngOnInit(): void {
    this.GetAllUser()
  }
  
  GetAllUser(){
    this.authService.getAllUser().subscribe({
      next:(result:GetRegisterUsernDto)=>{
        // this.allUser = result.data
          this.allUser = result.data
      
      }
    })  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
  }

}
