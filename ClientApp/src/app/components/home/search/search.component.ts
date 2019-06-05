import * as _ from 'lodash';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Word } from '../../../core/word/word';
import { WordModel } from '../../../core/word/wordModel';
import { trace } from '../../../diagnostic/trace';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.less']
})
export class SearchComponent {

    private readonly logger = trace.get('SearchComponent');

    public filteredWords: Word[] = [];
    public inputWord: string = null;
    public resultWord: Word = null;
    public isDropdownDisplayed = false;

    constructor(private readonly http: HttpClient,
        @Inject('BASE_URL') private readonly baseUrl: string) {
        this.resultWord = new Word('Term...', '', 'Description...', '');
    }

    public selectElement(word: string) {
        this.inputWord = word;
        this.isDropdownDisplayed = false;

        this.filterWords(word, true);
    }

    public inputCLick() {
        this.isDropdownDisplayed = !this.isDropdownDisplayed;

        if (!this.inputWord) {
            return;
        }

        this.filterWords(this.inputWord);
    }

    public onInputWord() {
        if (!this.inputWord) {
            return;
        }
        this.isDropdownDisplayed = true;

        this.filterWords(this.inputWord);
    }

    public blur() {
        this.isDropdownDisplayed = false;
    }

    public search() {
        if (!this.inputWord) {
            return;
        }
        this.filterWords(this.inputWord, true);
    }

    public get isTermDisplayed() {
        return this.resultWord && this.inputWord
            && (_.toLower(this.inputWord) === _.toLower(this.resultWord.name))
            && !this.isDropdownDisplayed;
    }

    private filterWords(inputWord: string, setDescription?: boolean) {
        let result: WordModel = null;
        this.http.post<WordModel>(this.baseUrl + 'api/Words/GetWords',
            new WordModel(inputWord, null)).subscribe(res => {
            result = res;
        },
        error => this.logger.error(error),
        () => {
            this.filteredWords = _.orderBy(result.words, [word => _.toLower(word.name)], ['asc']);
            if (setDescription) {
                if (result.words[0]) {
                    this.isDropdownDisplayed = false;
                }
                if (this.resultWord.name !== result.words[0].name) {
                    this.resultWord = result.words[0];
                    if (this.isTermDisplayed) {
                        this.logger.info(this.resultWord);
                    }
                }
            }
        });
    }


}
