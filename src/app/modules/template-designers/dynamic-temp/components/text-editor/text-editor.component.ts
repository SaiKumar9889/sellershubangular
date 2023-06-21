import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subscription } from 'rxjs';
import { DatasharingService } from 'src/app/_service/datasharing.service';
declare var $:any;
@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit,OnDestroy {

  @Input() data:any;
  modalStatus_ip:Subscription;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '500',
    maxHeight: '500',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'subscript',
        'superscript',
        'fontName'
      ],
      [
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        // 'removeFormat',
        'toggleEditorMode'
      ]
    ]
  };

  constructor(private datasharingService:DatasharingService) { }
  ngOnDestroy(): void {
   this.modalStatus_ip.unsubscribe();
  }

  ngOnInit(): void {
    this.modalStatus_ip=this.datasharingService.editormodal_ip.subscribe(res=>{
      //console.log(res);
      this.data=res;
    });
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

  openModal(){
    this.datasharingService.changeEditorModal(true);
    this.datasharingService.changeEditorModalInput(this.data);
  }
}
