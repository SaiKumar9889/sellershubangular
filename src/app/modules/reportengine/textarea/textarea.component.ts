import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { styles } from 'src/app/reports/_TextModal';
declare var $ : any;
@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {
  @Input() obj:any;
  tempStyle:styles=new styles();
  @Output() output = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    //////console.log(this.obj);
  }
  delete(){
    this.output.emit(this.obj);
  }
  openmodal() {
    $('#modal-'+this.obj.id).modal('show');
  }
  modalclosed(){
    $('#modal-'+this.obj.id).modal('hide');
  }
 updateImagesettings(){
    this.obj.styles=this.tempStyle;
    $('#modal-'+this.obj.id).modal('hide');
 }
 changeWeight(event){
  this.tempStyle.font_weight=event.target.value;
 }
 changeFontSize(event){
  this.tempStyle.fontsize=event.target.value;
 }
 changePosition(event){

 }
 changeBackground(event){
  this.tempStyle.backgroud_color=event.target.value;
 }
 changeColor(event){
  this.tempStyle.color=event.target.value;
 }
}
