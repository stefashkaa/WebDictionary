import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WordComponent } from './word.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        WordComponent
    ],
    imports: [
        FormsModule,
        BrowserAnimationsModule,
        CommonModule,
        RouterModule.forRoot([
            { path: 'word', redirectTo: '' },
            { path: 'word/:wordName', component: WordComponent }
        ])
    ],
    providers: [],
    bootstrap: [WordComponent]
})
export class WordModule { }
