import * as _ from 'lodash';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

import { Word } from '../../../core/word/word';
import { WordModel } from '../../../core/word/wordModel';
import { Util } from '../../../util/util';
import { trace } from '../../../diagnostic/trace';

@Component({
    selector: 'app-list-word',
    templateUrl: './list-word.component.html',
    styleUrls: ['./list-word.component.less']
})
export class ListWordComponent implements OnInit {
    private readonly logger = trace.get('ListWordComponent');

    public words: Word[] = [];
    public letter = '';

    constructor(private readonly location: Location,
        private readonly activeRoute: ActivatedRoute,
        private readonly http: HttpClient,
        @Inject('BASE_URL') private readonly baseUrl: string) {
    }

    ngOnInit(): void {
        this.activeRoute.params.subscribe(routeParams => {
            this.letter = routeParams.letter;
            if (!Util.validLetter(this.letter)) {
                this.location.back();
            } else {
                this.logger.info(this.letter);
                this.listWords();
            }
        });
    }

    private listWords(): void {
        let result: WordModel = null;
        this.http.post<WordModel>(this.baseUrl + 'api/Words/ListByLetter',
            new WordModel(this.letter, null)).subscribe(res => {
            result = res;
        },
        error => this.logger.error(error),
        () => {
            this.words = _.orderBy(result.words, [word => _.toLower(word.name)], ['asc']);
        });
    }
}
