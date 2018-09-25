import { Word } from "./Word";

export class WordModel {
    constructor(public letter: string,
        public words: Word[]) {
    }
}
