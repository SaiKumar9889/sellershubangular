import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NG_ASYNC_VALIDATORS } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() obj: any;
  @Output() output = new EventEmitter<any>();
  noofImages: any[] = [];
  selectedposition:string;
  constructor() { }
  ngOnInit(): void {
    let ref = this;
    $(function () {
      $(document).on("change", ".uploadFile", function () {
        var uploadFile = $(this);
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support
        if (/^image/.test(files[0].type)) { // only image file
          ref.obj.file = files[0];
          var reader = new FileReader(); // instance of the FileReader
          reader.readAsDataURL(files[0]); // read the local file
          reader.onloadend = function () { // set image data as background of div
            //alert(uploadFile.closest(".upimage").find('.imagePreview').length);
            ref.obj.file=this.result;
            uploadFile.closest(".imgUp").find('.imagePreview').css("background-image", "url(" + this.result + ")");
          }
        }
      });
    });
  }
  delete() {
    this.output.emit(this.obj);
  }
  openmodal() {
    $('#modal-'+this.obj.id).modal('show');
  }
  changePosition(event: any) {
    //////console.log(event.target.value);
    this.selectedposition=event.target.value;
  }
  modalclosed(){
    $('#modal-'+this.obj.id).modal('hide');
  }
  updateImagesettings(){
     if(this.selectedposition=='text-center'){
      this.obj.position=32;
     }else if(this.selectedposition=='text-right'){
      this.obj.position=62;
     }else{
      this.obj.position=0;
     }
     $('#modal-'+this.obj.id).modal('hide');
  }
  getposition(){
    return this.obj.position+'%';
  }
}
