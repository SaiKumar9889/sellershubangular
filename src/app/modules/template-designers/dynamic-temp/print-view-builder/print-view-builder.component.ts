import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-print-view-builder',
  templateUrl: './print-view-builder.component.html',
  styleUrls: ['./print-view-builder.component.scss']
})
export class PrintViewBuilderComponent implements OnInit,OnChanges {

 
  @Input() childrens=[];
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  // this.childrens=
  }

  ngOnInit(): void {
  }
  editorConfig_disable: AngularEditorConfig = {
    editable: false,
    spellcheck: false,
    outline:false,
    height: 'auto',
    minHeight: '0',
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


}
