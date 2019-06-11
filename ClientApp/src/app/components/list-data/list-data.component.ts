import * as _ from 'lodash';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Word } from '../../core/word/word';
import { trace } from '../../diagnostic/trace';
import { WordModel } from '../../core/word/word.model';


@Component({
    selector: 'app-list-data',
    templateUrl: './list-data.component.html',
    styleUrls: ['./list-data.component.less']
})
export class ListDataComponent implements OnInit {

    private readonly logger = trace.get('SearchComponent');

    public words: Word[] = [];

    constructor(private readonly http: HttpClient,
        @Inject('BASE_URL') private readonly baseUrl: string) {
    }

    ngOnInit(): void {
        this.getWords();
    }

    private getWords(): void {
        let result: WordModel = null;
        this.http.get<WordModel>(this.baseUrl + 'api/Words/GetAllWords').subscribe(res => {
            result = res;
        },
        error => this.logger.error(error),
        () => {
            this.words = _.orderBy(result.words, [word => _.toLower(word.name)], ['asc']);
            this.logger.info(this.words);
        });
    }
}
