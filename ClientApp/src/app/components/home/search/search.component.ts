import * as _ from 'lodash';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger, state, style, animate, transition, group } from '@angular/animations';

import { Word } from '../../../core/word/word';
import { WordModel } from '../../../core/word/wordModel';
import { trace } from '../../../diagnostic/trace';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.less'],
    animations: [
        trigger('showWordState', [
            state('show', style({
                opacity: 1
            })),
            state('hide', style({
                opacity: 0
            })),
            // transition('show => hide', animate('600ms ease-out')),
            transition('hide => show', animate('1000ms ease-in'))
        ])
    ]
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

    public get stateWord(): string {
        return this.isTermDisplayed ? 'show' : 'hide';
    }

    public selectElement(word: string): void {
        this.inputWord = word;
        this.isDropdownDisplayed = false;

        this.filterWords(word, true);
    }

    public inputCLick(): void {
        this.isDropdownDisplayed = !this.isDropdownDisplayed;

        if (!this.inputWord) {
            return;
        }

        this.filterWords(this.inputWord);
    }

    public onInputWord(): void {
        if (!this.inputWord) {
            return;
        }
        this.isDropdownDisplayed = true;

        this.filterWords(this.inputWord);
    }

    public blur(): void {
        this.isDropdownDisplayed = false;
    }

    public search(): void {
        if (!this.inputWord) {
            return;
        }
        this.filterWords(this.inputWord, true);
    }

    public get isTermDisplayed(): boolean {
        return this.resultWord && this.inputWord
            && (_.toLower(this.inputWord) === _.toLower(this.resultWord.name))
            && !this.isDropdownDisplayed;
    }

    private filterWords(inputWord: string, setDescription?: boolean): void {
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
