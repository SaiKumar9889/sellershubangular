import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EbayListService } from '../services/ebay-list.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Input() categories: any;
  @Input() categoryIndex: number = 0;
  @Output() getItem: EventEmitter<any> = new EventEmitter<any>();

  constructor(public ebayListService: EbayListService) { }

  ngOnInit(): void {
    // console.log(this.categories);

  }

  _getItem(event){
    // console.log(event);
    this.getItem.emit(event);
  }


  openNodes(parentItem){
    // console.log(parentItem)
    if(this.categoryIndex< 3){
      this.ebayListService.getSubCategories(parentItem.id, 'US', parentItem.id).subscribe((result:any)=>{
        const index = this.categories.findIndex(item=>item.id == parentItem.id);
        this.categories[index].parent = parentItem.id;
        result.forEach(item=>{ item['expand'] = false, item['level'] = parentItem.level+1 });
        this.categories[index].children = result;
        this.categories[index]['expand'] = true;
      });
    } else {
      this.ebayListService.loadEbayStoreCategories(parentItem.id, 'US', parentItem.id).subscribe((result:any)=>{
        const index = this.categories.findIndex(item=>item.id == item.id);
        this.categories[index].parent = parentItem.id;
        result.forEach(item=>{ item['expand'] = false, item['level'] = parentItem.level+1 });
        this.categories[index].children = result;
        this.categories[index]['expand'] = true;
      }, error=>{
        console.log(error);
      })
    }
   }
}
