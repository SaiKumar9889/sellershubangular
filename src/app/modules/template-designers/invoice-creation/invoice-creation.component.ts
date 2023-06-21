import { Component, Input, OnInit } from '@angular/core';
// import { AngularEditorConfig } from '@kolkov/angular-editor';
declare var $: any;
@Component({
  selector: 'app-invoice-creation',
  templateUrl: './invoice-creation.component.html',
  styleUrls: ['./invoice-creation.component.css']
})
export class InvoiceCreationComponent implements OnInit {
  loading: boolean = false;
  html: any = '';
  input: any = '';
  @Input() dashboard: any;
  @Input() isEditInvoiceI: any;
  @Input() apiData: any;
  constructor() { }
  // editorConfig: AngularEditorConfig = {
  //   editable: true,
  //   spellcheck: true,
  //   height: 'auto',
  //   minHeight: '250px',
  //   maxHeight: 'auto',
  //   width: 'auto',
  //   minWidth: '0',
  //   translate: 'yes',
  //   enableToolbar: true,
  //   showToolbar: true,
  //   placeholder: 'Enter text here...',
  //   defaultParagraphSeparator: '',
  //   defaultFontName: '',
  //   defaultFontSize: '',
  //   fonts: [
  //     { class: 'arial', name: 'Arial' },
  //     { class: 'times-new-roman', name: 'Times New Roman' },
  //     { class: 'calibri', name: 'Calibri' },
  //     { class: 'comic-sans-ms', name: 'Comic Sans MS' }
  //   ],
  //   customClasses: [
  //     {
  //       name: 'quote',
  //       class: 'quote',
  //     },
  //     {
  //       name: 'redText',
  //       class: 'redText'
  //     },
  //     {
  //       name: 'titleText',
  //       class: 'titleText',
  //       tag: 'h1',
  //     },
  //   ],
  //   uploadUrl: 'v1/image',
  //   uploadWithCredentials: false,
  //   sanitize: true,
  //   toolbarPosition: 'top',
  //   toolbarHiddenButtons: [
  //     ['fontName'],
  //     ['insertImage', 'insertVideo','customClasses']
  //   ]
  // };
  emithtml() {
    //////console.log(this.input);
    $('#html').html(this.input)
    //////console.log($('#html').text());
  }
  ngOnInit(): void {
  }
  st: any = [];
  selectedChannlesForsave(event: any) {
    this.st = event;
  }
}
