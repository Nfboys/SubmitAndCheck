import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserPageRoutingModule } from './user-page-routing.module';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { CheckPageComponent } from './check-page/check-page.component';
import { UserPageComponent } from './user-page.component';
import { StatisticsComponent } from './statistics/statistics.component';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
// import { NgxEchartsModule } from 'ngx-echarts';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    UploadPageComponent, 
    CheckPageComponent,
    UserPageComponent,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    UserPageRoutingModule,
    BrowserModule, 
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers:[
    { provide: NZ_I18N, useValue: zh_CN }
  ]
})
export class UserPageModule { }
