import * as _ from 'lodash';

export class Util {
    public static letterGroups: string[][] = [['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И'],
                                              ['К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т'],
                                              ['У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Э', 'Ю', 'Я']];
    public static doubleLetters: string[] = ['Ё', 'Й'];
    public static specialLetters: string[] = ['Ъ', 'Ы', 'Ь'];

    public static validLetter(letter: string): boolean {
        if ((!letter) || (letter.length !== 1)) {
            return false;
        }
        letter = _.toUpper(letter);

        if (_.includes(Util.specialLetters, letter)) {
            return false;
        }

        const isLetter = _.some(Util.letterGroups, letters => {
            return _.includes(letters, letter);
        });

        return _.includes(Util.doubleLetters, letter) || isLetter;
    }
}
