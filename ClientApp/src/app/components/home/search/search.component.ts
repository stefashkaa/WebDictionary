import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Word } from '../../../core/word/Word';
import { WordModel } from '../../../core/word/WordModel';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.less']
})
export class SearchComponent {
    public filteredWords: Word[] = [];
    public inputWord: string = null;
    public resultWord: Word = null;
    public isDropdownVisible: boolean = false;

    constructor(private readonly http: HttpClient,
        @Inject('BASE_URL') private readonly baseUrl: string) {
        this.resultWord = new Word("Term...", "Description...");
    }

    public selectElement(word: string) {
        this.inputWord = word;
        this.isDropdownVisible = false;

        this.filterWords(word, true);
    }

    public onInputCLick() {
        this.isDropdownVisible = !this.isDropdownVisible;

        if (!this.inputWord) {
            return;
        }

        this.filterWords(this.inputWord);
    }

    public onInputWord() {
        if (!this.inputWord) {
            return;
        }
        this.isDropdownVisible = true;

        this.filterWords(this.inputWord);
    }

    public onInputBlur() {
        this.isDropdownVisible = false;
    }

    public onButtonClick() {
        if (!this.inputWord) {
            return;
        }
        this.filterWords(this.inputWord, true);
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
                this.resultWord = result.words[0];
            }
        });
    }


}
