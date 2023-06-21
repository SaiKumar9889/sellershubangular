import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHTMLPipe } from './safe-html.pipe';
import { SanitizeUrlPipePipe } from './sanitize-url-pipe.pipe';



@NgModule({
  declarations: [SafeHTMLPipe, SanitizeUrlPipePipe],
  exports:[SafeHTMLPipe,SanitizeUrlPipePipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
