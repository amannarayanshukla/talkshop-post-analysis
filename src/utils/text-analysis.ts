export class TextAnalysis {

    static words: string[];
    static numberOfWords: string;
    static totalLength: string;
    static averageWordLength: string;
    constructor() {
    }
    static countWords(text: string): string {
        this.words = text.split(/\s+/);
        this.numberOfWords = this.words.length.toString();
        return this.numberOfWords;
    }

    static calculateAverageWordLength(): string {
         this.totalLength = this.words.reduce((acc, word) => acc + word.length, 0).toString();
        this.averageWordLength = ((JSON.parse(this.totalLength) / JSON.parse(this.numberOfWords)).toFixed(2)).toString();
        return this.averageWordLength;
    }
}
