import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserPageModule } from './user-page/user-page.module';

const routes: Routes = [
  
  { path: 'login', component: LoginComponent},
  // { path: 'userPage', loadChildren: './user-page/user-page.module'},
  { path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
