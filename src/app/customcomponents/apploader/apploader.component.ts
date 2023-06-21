import { AfterViewInit, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";

// import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
const PrimaryWhite = '#fec107';
const SecondaryGrey = '#fec107';
const PrimaryRed = '#fec107';
const SecondaryBlue = '#fec107';
@Component({
  selector: 'app-apploader',
  templateUrl: './apploader.component.html',
  styleUrls: ['./apploader.component.css']
})
export class ApploaderComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() Uloading: boolean;
  @Input() loadingMessage: any ='Loading';
  // public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = true;
  // public primaryColour = PrimaryWhite;
  // public secondaryColour = SecondaryGrey;
  // public coloursEnabled = false;
  ngOnChanges(changes: SimpleChanges): void {
    this.loading = changes.Uloading.currentValue;
    if(this.loading){
      this.spinner.show();
    }else{
     this.spinner.hide();
    }
  }
  ngAfterViewInit(): void {
    this.loading = this.Uloading;
    
    // this.primaryColour = PrimaryRed;
    // this.secondaryColour = SecondaryBlue;
  }
  ngOnInit(): void {
    // this.spinner.show();
  }
  constructor(private spinner: NgxSpinnerService) {}

}
