import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/announcments/services/messages.service';
import { TrackMenus } from 'src/app/_models/menuForTrack';
import { pages } from 'src/app/_models/pages';
import { subMenus } from 'src/app/_models/subMenuTrack';
import { usertrackInput } from 'src/app/_models/usertrackInput';
import { AppTrackingService } from 'src/app/_service/app-tracking.service';
declare let $: any ;
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  pageSize: number = 50;
  collectionsize: number = 0;
  allMessages: any = [];
  page: number = 1;
  loading: boolean = false;
  channelid: any = '';
  messageStatus: any = '';

  message: any

  modelState = 0;
  constructor(private appTrackingService:AppTrackingService,private messagesService: MessagesService) {
    let ip:usertrackInput={menu:TrackMenus.CUSTOMERREPLIES,submenu:subMenus.OTHERS,page:pages.CUSTOMERREPLIESPAGE,function:"",descrption:"Customer replies page loaded"};
    this.appTrackingService.trackUserActivity(ip);
   }

  ngOnInit(): void {
    this.getMessages();
  }
  changePageSize() {

  }
  selectall(event: any) {

  }
  individualselection(sel: any) {

  }
  changespage(page:any) {
    this.getMessages();
  }
  getMessages() {
    this.loading=true;
    this.messagesService.getMessages(this.channelid,this.messageStatus,this.page, this.collectionsize).subscribe((res: any) => {
      ////console.log(res);
      this.allMessages=res.filteredMessages;
      this.collectionsize = res?.page?.totalResults;
      this.page = res?.page?.currentPageNumber;
      this.allMessages.map(msg=>msg.selected=false);
      this.loading=false;
    });
  }
  getImage(img:string){
    return 'https://s3-us-west-1.amazonaws.com/khubweb/web/kartzhub'+img+'.png';
  }
replyStatus:any;messageId: any;msgId:any;repContent:any;msgSubject:any;msgContent:any;
  viewMessage(msg){
    this.replyStatus = msg.replied 
    $('#msg-view-modal').modal('show');
    this.loading=true;
    this.messagesService.viewMessages(msg.id).subscribe((res: any) => {
      console.log(res);
      this.message=res.customerMessage;      ;
      $('#msg-view-modal').modal('show');
      this.loading=false;
    }, error => {
      this.loading=false;
    });
  }
  replyMessage(msg){
    console.log(msg)
    this.msgId=msg.id;
    this.msgSubject = msg.messageSubject;
    this.msgContent = msg.messageText;
    $('#reply-view-modal').modal('show');
  }
  onReply(message){
    $('#msg-view-modal').modal('hide');
    $('#reply-view-modal').modal('show');
    this.msgId=message.id;
    this.msgSubject = message.messageSubject;
    this.msgContent = message.messageText;
  }
  modalclosed(){
    $('#msg-view-modal').modal('hide');
  }
  replymodalclosed(){
    $('#reply-view-modal').modal('hide');
  }
  onSubmit(){
    console.log(this.msgId)
    let data =
      {  
        "id":this.msgId,
    "replyMessage":this.repContent

}
    
    this.messagesService.savereplymessage(data).subscribe((res: any) => {
      console.log(res);
      
      this.loading=false;
      $('#reply-view-modal').modal('hide');
    }, error => {
      this.loading=false;
    });
  }
}
