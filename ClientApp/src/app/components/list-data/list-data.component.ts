import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-list-data',
    templateUrl: './list-data.component.html',
    styleUrls: ['./list-data.component.less']
})
export class ListDataComponent {
    public readonly letterGroups: string[][] = [["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И"],
                                                ["К", "Л", "М", "Н", "О", "П", "Р", "С", "Т"], 
                                                ["У", "Ф", "Х", "Ц", "Ч", "Ш", "Э", "Ю", "Я"]]; 

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    }

    public clickByLetter(letter: string) {
        //
    }
}
