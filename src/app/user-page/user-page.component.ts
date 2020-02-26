import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service'
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  userId: string;
  constructor(private route: ActivatedRoute, private auth: AuthService,
    public router: Router, ) { }

  ngOnInit() {
    let subscription = this.route.firstChild.firstChild.paramMap.subscribe((data) => {
      this.userId = data.get('id');
      console.log(this.userId)
    })
  }

}
