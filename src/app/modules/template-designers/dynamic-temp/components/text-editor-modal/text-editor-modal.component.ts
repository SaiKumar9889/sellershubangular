import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subscription } from 'rxjs';
import { DatasharingService } from 'src/app/_service/datasharing.service';
declare var $:any;
@Component({
  selector: 'app-text-editor-modal',
  templateUrl: './text-editor-modal.component.html',
  styleUrls: ['./text-editor-modal.component.scss']
})
export class TextEditorModalComponent implements OnInit,OnDestroy {
  @Input() data:any;
  modalStatus:Subscription;
  modalStatus_ip:Subscription;
  constructor(private datasharingService:DatasharingService) { }

  ngOnInit(): void {
    this.modalStatus=this.datasharingService.editormodal.subscribe(res=>{
      //console.log(res);
      if(res)
      this.openModal();
    });
    this.modalStatus_ip=this.datasharingService.editormodal_ip.subscribe(res=>{
      //console.log(res);
      this.data=res;
    });
  }
  ngOnDestroy(): void {
    this.modalStatus.unsubscribe();
    this.modalStatus_ip.unsubscribe();
   }
  openModal(){
    $('#editor-modal').modal('show');
  }

  
  hideModalEditor() {
    $('#editor-modal').modal('hide');
  }

  selectedHtml:any;
  saveEditorData() {   
    this.data.text=this.selectedHtml;
    this.datasharingService.changeEditorModalInput(this.data);
  }
  emithtml(event){
    //console.log(this.selectedHtml);
    //console.log('editorCodehtml',event.target.innerHTML);
    //console.log('editorCodehtml',event.target.innerText);
    this.selectedHtml=event.target.innerHTML;
  }
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
}
