import { CdkPortal, DomPortalHost } from '@angular/cdk/portal';
import { ApplicationRef, Component, ComponentFactoryResolver, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {

  @Input() url: string;
  @Output() modalstatus: EventEmitter<any> = new EventEmitter();

 // STEP 1: get a reference to the portal
 @ViewChild(CdkPortal) portal: CdkPortal;

 // STEP 2: save a reference to the window so we can close it
 private externalWindow = null;

 // STEP 3: Inject all the required dependencies for a PortalHost
 constructor(
   private componentFactoryResolver: ComponentFactoryResolver,
   private applicationRef: ApplicationRef,
   private injector: Injector){}


 ngOnInit(){
   // STEP 4: create an external window
   this.externalWindow = window.open(this.url, '', 'width=800,height=600,left=100,top=100');

   // STEP 5: create a PortalHost with the body of the new window document    
   const host = new DomPortalHost(
     this.externalWindow.document.body,
     this.componentFactoryResolver,
     this.applicationRef,
     this.injector
     );

   // STEP 6: Attach the portal
   host.attach(this.portal);
 }

 ngOnDestroy(){
   this.modalstatus.emit(false);
   // STEP 7: close the window when this component destroyed
   this.externalWindow.close()
 }

}
