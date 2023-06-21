import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
declare var $:any;

@Component({
  selector: 'app-dynamic-uiuilder',
  templateUrl: './dynamic-uiuilder.component.html',
  styleUrls: ['./dynamic-uiuilder.component.scss']
})
export class DynamicUiuilderComponent implements OnInit,OnChanges {

  @Input() childrens=[];
  @Output() modalOpen = new EventEmitter();
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  // this.childrens=
  }

  ngOnInit(): void {
  }


  editorConfig_disable: AngularEditorConfig = {
    editable: false,
    spellcheck: true,
    height: 'auto',
    minHeight: '250',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: false,
    showToolbar: false,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: ''  
  };

  openModal(chaild:any){
   this.modalOpen.emit({chaild:chaild,status:true});
  }
  
}
