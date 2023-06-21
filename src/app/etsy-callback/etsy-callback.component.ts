import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastTypes } from '../_models/_toaster';
import { LoginService } from '../_service/login.service';
import { ToasterService } from '../_service/toaster.service';


@Component({
  selector: 'app-etsy-callback',
  templateUrl: './etsy-callback.component.html',
  styleUrls: ['./etsy-callback.component.scss']
})
export class EtsyCallbackComponent implements OnInit {
  oauth_token: any;
  oauth_verifier: any;
  id: any;
  khubUserId: any;

  constructor(private route: ActivatedRoute, private urlApi: LoginService,
    private toasterService: ToasterService) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.oauth_token = params.oauth_token;
        this.oauth_verifier = params.oauth_verifier;
        this.id = params.id;
        this.khubUserId = params.khubUserId;
        this.urlApi.etsyTokenSave(params.id, params.khubUserId, params.oauth_token, params.oauth_verifier ).subscribe((response:any) =>{
          this.toasterService.openToastMessage(ToastTypes.success, 'SellersHub', 'Successfully Integrated');

        })
      }
    );
  }

}
