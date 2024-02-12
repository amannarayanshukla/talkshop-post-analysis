export class PostAnalysis {
    private post_id: string;
    word_count: string;
    average_word_length: string;
    private analysis_date: Date;
    status: string;
    user_id: string;

    constructor(post_id: string, word_count: string, average_word_length: string, user_id: string) {
        this.post_id = post_id;
        this.word_count = word_count;
        this.average_word_length = average_word_length;
        this.analysis_date = new Date(); // Timestamp for when the analysis was done
        this.status = 'DEAD'; // Status of the analysis
        this.user_id = user_id;
    }

}
