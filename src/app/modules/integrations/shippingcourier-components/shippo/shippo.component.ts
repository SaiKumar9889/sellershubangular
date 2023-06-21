import { Component, Input, OnInit } from '@angular/core';
import { DatasharingService } from 'src/app/_service/datasharing.service';
import { DpdIntiService } from '../../services/dpd-inti.service';

@Component({
  selector: 'app-shippo',
  templateUrl: './shippo.component.html',
  styleUrls: ['./shippo.component.scss']
})
export class ShippoComponent implements OnInit {
  @Input() courrierDetails;
  constructor(private datasharingService: DatasharingService, private dpdIntiService: DpdIntiService) { }
  isEnabled: boolean = false; dropdownSettings_country: any; allCountries: any = []; selecte_country: any = [];
  ngOnInit(): void {
    console.log(this.courrierDetails)
    this.allCountries = this.datasharingService.getCountries();
    this.isEnabled = this.courrierDetails?.enable;
    this.getIntegrateDetails()
    this.dropdownSettings_country = {
      singleSelection: true,
      idField: 'country_code',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 100,
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      closeDropDownOnSelection: true
    };
  }
  getIntegrateDetails() {
    this.dpdIntiService.getIntegrationDetials(26).subscribe((res: any) => {
      console.log(res)

    });
  }
  save() { }
  selectashippinglabel(type: any) { }
  testconnection() { }

}
