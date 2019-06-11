import { Word } from './word';

export class WordModel {
    constructor(public letter: string,
        public words: Word[] = [],
        public exactlyWord: boolean = false) {
    }
}
