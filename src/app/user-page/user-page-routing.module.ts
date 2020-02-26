import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { CheckPageComponent } from './check-page/check-page.component';
import { UserPageComponent } from './user-page.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AuthGuard } from '../auth/auth.guard';
import { UserPageAuthGuard } from '../auth/user-page-auth.guard';

const routes: Routes = [
  {
    path: 'userPage',
    component: UserPageComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '',
      canActivateChild: [UserPageAuthGuard],
      children: [
        { path: 'statistics/:id', component: StatisticsComponent },
        { path: 'upload/:id', component: UploadPageComponent },
        { path: 'check/:id', component: CheckPageComponent }
      ]
    }]
    // children: [
    //   { path: 'statistics/:id', component: StatisticsComponent },
    //   { path: 'upload/:id', component: UploadPageComponent },
    //   { path: 'check/:id', component: CheckPageComponent }
    // ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserPageRoutingModule { }
