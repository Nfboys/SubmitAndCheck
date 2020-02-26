import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { of, interval, pipe } from 'rxjs';
import { map, filter } from 'rxjs/operators';

class ResponseData {
  data: number;
  reason: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required)
  });
  userID: string;

  constructor(private fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private http: HttpClient,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    // this.validateForm = this.fb.group({
    //   userName: ['', [Validators.required]],
    //   password: ['', [Validators.required]],
    //   remember: [true]
    // });

  }

  submitForm(): void {
    // for (const i in this.validateForm.controls) {
    //   this.validateForm.controls[i].markAsDirty();
    //   this.validateForm.controls[i].updateValueAndValidity();
    // }
  }

  login(): void {
    this.userID=this.validateForm.value.userName;
    let url = 'http://39.99.203.186:2000/login';
    let params = {
      user: this.userID,
      password: this.validateForm.value.password
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    this.http.post(url, params, httpOptions)
      .subscribe((data: ResponseData) => {
        if (data['success'] == 1) {
          this.authService.user = this.userID;
          this.router.navigate(['userPage', 'upload', params.user]);
        } else if (data['success'] == 0) {
          this.msg.error('登录失败，' + data['reason'] + '请检查用户名密码后重试,或联系管理员18534949629');
        }
      })
  }
}
