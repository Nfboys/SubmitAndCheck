import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { switchMap, filter } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service'

class ResponseData {
  data: number;
  reason: string;
}

@Component({
  selector: 'app-check-page',
  templateUrl: './check-page.component.html',
  styleUrls: ['./check-page.component.css']
})
export class CheckPageComponent implements OnInit {
  userId: number;

  listOfData1 = [
  ];

  listOfData2 = [
    {
      key: '1',
      name: '北京',
      address: '已提交待审核'
    },
    {
      key: '2',
      name: '天津',
      address: '已提交待审核'
    },
    {
      key: '3',
      name: '上海',
      address: '已提交待审核'
    },
    {
      key: '4',
      name: '河北',
      address: '已通过'
    }
  ];

  constructor(private route: ActivatedRoute,
    public router: Router,
    private http: HttpClient,
    private auth: AuthService
    ) { }

  ngOnInit(): void {
    let params = {
      date: "2020/02/13",
      user: "admin"
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post('http://39.99.203.186:2000/uncheckedByUser', params, httpOptions)
    .subscribe((data: ResponseData) => {
      if(data['success']==1){
        this.listOfData1=data['results']
      }

    })



  }
}
