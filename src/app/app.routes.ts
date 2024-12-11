import { Routes } from '@angular/router';
import { ContentComponent } from './components/layout/content/content.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { RegisterdUserComponent } from './components/registerd-user/registerd-user.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CategoryComponent } from './components/category/category.component';

export const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home', component:HomeComponent},
    {path:'contact', component:ContactComponent},
    {path:'cart-items', component:CartItemsComponent},
    {path:'products', component:ProductsComponent},
    {path:'productdetail/:id', component:ProductDetailComponent},
    {path:'register', component:RegisterComponent},
    {path:'login', component:LoginComponent},
    {path:'users', component:RegisterdUserComponent},
    {path:'checkout', component:CheckOutComponent},
    {path:'allcategory', component:CategoryComponent},
];
