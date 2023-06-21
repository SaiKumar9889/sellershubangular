import { Component, Input, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-company-label',
  templateUrl: './company-label.component.html',
  styleUrls: ['./company-label.component.scss']
})
export class CompanyLabelComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

  changeFiles(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //console.log(reader.result);
      this.data.text = reader.result;
    };
  }

  openuploadfun() {
    $('#my-file').click();
  }
}



