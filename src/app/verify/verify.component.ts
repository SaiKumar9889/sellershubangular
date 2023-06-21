import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../_service/login.service';
import { error } from 'console';
declare var $: any;

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  state = 0;
  constructor(private route:ActivatedRoute, private urlApi: LoginService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any)=> {
      console.log(params);
      this.activateUser(params);
    })
  }
  activateUser(params: any) {
    this.urlApi.verifyUser(params.param1,params.param2).subscribe((resp:any)=>{
      this.state = 1;
      $('#verifyModel').modal("show");
    }, (error)=>{
      this.state = 2;
      $('#verifyModel').modal("show");
    })
  }

}
