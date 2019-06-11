import * as _ from 'lodash';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';

import { Word } from '../../core/word/word';
import { trace } from '../../diagnostic/trace';
import { WordModel } from '../../core/word/word.model';

@Component({
    selector: 'app-word',
    templateUrl: './word.component.html',
    styleUrls: ['./word.component.less'],
    animations: [
        trigger('enterLeave', [
            transition('void => *', [
                style({
                  opacity: 0.2,
                  transform: 'translateX(-100vw)'
                }),
                animate('500ms ease-in',
                    style({
                      opacity: 1,
                      transform: 'scale(1.2)'
                    })
                )
            ])
        ])
    ]
})
export class WordComponent implements OnInit {

    private readonly logger = trace.get('WordComponent');

    public word: Word = null;

    constructor(private readonly location: Location,
        private readonly activeRoute: ActivatedRoute,
        private readonly http: HttpClient,
        @Inject('BASE_URL') private readonly baseUrl: string) {
    }

    async ngOnInit(): Promise<void> {
        this.activeRoute.params.subscribe(params => {
            const wordName: string = params.wordName;
            if (!wordName) {
                this.location.back();
            }
            this.getWord(wordName);
        });
    }

    private async getWord(wordName: string): Promise<void> {
        const wordModel = await this.http.post<WordModel>(this.baseUrl + 'api/Words/GetWords',
            new WordModel(wordName, null, true)).toPromise();
        if (_.isEmpty(wordModel.words)) {
            this.logger.error(`Cannot find word: '${wordName}'!`);
            this.location.back(); // TODO: is it correct...
            return;
        }
        this.word = _.first(wordModel.words);
    }
}
