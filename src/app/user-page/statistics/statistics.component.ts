import { Component, OnInit } from '@angular/core';
import { single } from './data';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  userId: number;

  single: any[];
  multi: any[];
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showDataLabel = true;
  xAxisLabel = '状态';
  showYAxisLabel = true;
  yAxisLabel = '数量';
  

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C']
  };

  listOfData = [
    {
      key: '1',
      name: '北京',
      address: '已提交未通过'
    },
    {
      key: '2',
      name: '天津',
      address: '提交已通过'
    },
    {
      key: '3',
      name: '上海',
      address: '未提交'
    }
  ];

  constructor(private route: ActivatedRoute) {
    Object.assign(this, { single })
  }

  ngOnInit(): void {
    this.userId= +this.route.snapshot.paramMap.get('id');
    
  }

  onSelect(event) {
    console.log(event);
  }
}
