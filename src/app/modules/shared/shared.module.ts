
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from "ckeditor4-angular";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { UpdateQuantiyComponent } from './update-quantiy/update-quantiy.component';
import { EmailConfigComponent } from './email-config/email-config.component';
import { FormsModule } from '@angular/forms';
import { SplitRulesComponent } from './split-rules/split-rules.component';

@NgModule({
    imports : [CommonModule, CKEditorModule, ScrollingModule, FormsModule],
    declarations:  [
    UpdateQuantiyComponent,
    EmailConfigComponent,
    SplitRulesComponent
  ],
    exports : [CKEditorModule, ScrollingModule, EmailConfigComponent,SplitRulesComponent]
})

export class SharedModule { }
