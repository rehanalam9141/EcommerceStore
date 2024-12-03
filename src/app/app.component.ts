import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MenuComponent } from './components/layout/menu/menu.component';
import { FooterComponent } from "./components/layout/footer/footer.component";
import { registerDto, userDto } from './model/auth-dto';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggleModule, MenuComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EcommerceStore';
  
  constructor(private authService:AuthService) {
    const localUser = localStorage.getItem('user');
    if(localUser){
      this.authService.getUser = JSON.parse(localUser);
      console.log("app user", this.authService.getUser)
    }
  }
}
