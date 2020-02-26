import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadFile } from 'ng-zorro-antd/upload';
import { AuthService } from '../../auth/auth.service'
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { cities } from './cities';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.css']
})
export class UploadPageComponent implements OnInit {
  uploadByForm: FormGroup;

  today: Date;
  startDate: Date;
  endDate: Date;

  selectedCity: string[] = [];
  collectMethod: string;

  userId: string;
  date: string;
  
  uploading = false;
  fileList: UploadFile[] = [];
  listOfData: Array<object>;
  listOfPlace: Array<string>;
  selectedValue: Date = new Date();

  nzOptions = cities;


  dateFormat = 'yyyy/MM/dd';


  dataCollectTime: Date;
  dataPublishTime: Date;
  defaultOpenValue = new Date();
  time: Date | null = null;


  constructor(private route: ActivatedRoute,
    public router: Router,
    private http: HttpClient,
    private msg: NzMessageService,
    private auth: AuthService
  ) {
    //一天86,400,000毫秒
    this.today = new Date();
    let yesterday = new Date(this.today.getTime() - 86400000);
    this.startDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 0, 0, 0, 0);
    this.endDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59, 999);

    this.dataPublishTime = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate(), 8, 0, 0);
    this.dataCollectTime = new Date();

    this.uploadByForm = new FormGroup({
      dataSource: new FormControl('', [Validators.required]),
      dataCollector: new FormControl("", [Validators.required]),
      dataSourceLink: new FormControl('', [Validators.required]),
      dataSourceText: new FormControl(),
      //具体数据

      newConfirm: new FormControl(0, [Validators.required]),
      newSuspect: new FormControl(0, [Validators.required]),
      newCured: new FormControl(0, [Validators.required]),
      newDied: new FormControl(0, [Validators.required]),
      totalConfirm: new FormControl(0, [Validators.required]),
      totalSuspect: new FormControl(0, [Validators.required]),
      totaCured: new FormControl(0, [Validators.required]),
      totaDied: new FormControl(0, [Validators.required]),
      cut: new FormControl(0),
      totalCut: new FormControl(0)
    });
    this.collectMethod = "1";
  }

  ngOnInit(): void {
    console.log(this.startDate);
    this.route.paramMap.subscribe((data) => {
      this.userId = data.get('id');
      this.uploadByForm.controls['dataCollector'].setValue(this.userId);
      this.refresh();
    })
  }

  onValueChange(v): void {
    let month = v.getMonth() >= 9 ? v.getMonth() + 1 : '0' + (v.getMonth() + 1);
    let day = v.getDate() >= 10 ? v.getDate() : '0' + v.getDate();
    this.date = v.getFullYear() + '/' + month + '/' + day;
    console.log(this.date)
  }
  onPanelChange(ev): void {
  }


  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  }
  handleUpload(): void {
    const formData = new FormData();
    formData.append('user', this.userId);
    formData.append("date", this.date);
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    this.uploading = true;
    const req = new HttpRequest('POST', 'http://39.99.203.186:2000/upload', formData, {
    });
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        (data) => {
          console.log(typeof data, data['body']);
          if (data['body'].success == 1) {
            this.uploading = false;
            this.fileList = [];
            this.msg.success('上传成功');
            this.refresh();
          } else {
            this.uploading = false;
            this.fileList = [];
            this.msg.error('上传失败, ' + data['body'].reason);
            this.refresh();
          }
        },
        () => {
          this.uploading = false;
          this.msg.error('上传失败');
        }
      );
  }

  refresh(): void {
    let url = 'http://39.99.203.186:2000/userInfo';
    let params = {
      user: this.userId
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post(url, params, httpOptions)
      .subscribe((data: any) => {
        this.listOfPlace = data.collectArea;
        this.listOfData = [];
        for (let index in data.collectArea) {
          this.listOfData.push({
            name: data.collectArea[index],
            state: '未提交'
          });
        }
      })
  }

  onCityChange(values: string[]): void {
    console.log(values);
    this.uploadByForm.controls['dataSource'].setValue(values[0] + "卫计委");
  }
  onDateChange(date: Date) {
    console.log(date)
  }

  submitForm() {
    window.alert('提交成功')
  }
}
