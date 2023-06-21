import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { styles, TextModal } from 'src/app/reports/_TextModal';
declare var $: any;
@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements OnInit {
  @Input() obj:TextModal;
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
 changeBackground(event){
  this.tempStyle.backgroud_color=event.target.value;
 }
 changeColor(event){
  this.tempStyle.color=event.target.value;
 }
 changeFontSize(event){
  this.tempStyle.fontsize=event.target.value;
 }
 changePosition(event){

 }
}
