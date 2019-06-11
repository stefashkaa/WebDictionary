export class Word {
    constructor(public name: string,
        public grammar: string,
        public description: string,
        public example: string) {
    }
}

export class WordModel {
    constructor(public letter: string,
        public words: Word[] = [],
        public exactlyWord: boolean = false) {
    }
}
