import { Component, Input, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-company-logo',
  templateUrl: './company-logo.component.html',
  styleUrls: ['./company-logo.component.scss']
})
export class CompanyLogoComponent implements OnInit {
  @Input() data:any;
  constructor() { }
  ip_id:any='my_file'
  ngOnInit(): void {
    //console.log(this.data);
    this.ip_id=this.ip_id+'-'+this.data.pid+'-'+this.data.id
  }

  changeFiles(event:any){
    //console.log(this.data);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        // //console.log(reader.result);
        this.data.text=reader.result;
    };
  }

  openuploadfun(){
    $('#'+this.ip_id).click();
  }
}
