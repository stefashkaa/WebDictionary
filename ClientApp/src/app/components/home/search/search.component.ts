import * as _ from 'lodash';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Word } from '../../../core/word/word';
import { WordModel } from '../../../core/word/wordModel';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.less']
})
export class SearchComponent {
    public filteredWords: Word[] = [];
    public inputWord: string = null;
    public resultWord: Word = null;
    public isDropdownDisplayed: boolean = false;

    constructor(private readonly http: HttpClient,
        @Inject('BASE_URL') private readonly baseUrl: string) {
        this.resultWord = new Word("Term...", "Description...");
    }

    public selectElement(word: string) {
        this.inputWord = word;
        this.isDropdownDisplayed = false;

        this.filterWords(word, true);
    }

    public onInputCLick() {
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

    public onInputBlur() {
        this.isDropdownDisplayed = false;
    }

    public onButtonClick() {
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
        error => console.error(error),
        () => {
            this.filteredWords = result.words;
            if (setDescription) {
                if (result.words[0]) {
                    this.isDropdownDisplayed = false;
                }
                this.resultWord = result.words[0];
            }
        });
    }


}
