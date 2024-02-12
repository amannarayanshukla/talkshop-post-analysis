import { clientManager } from '../store/cassandra/cassandra';
import { PostAnalysis } from '../models/post-analysis.model'

export class PostAnalysisDao {
    static async savePostAnalysis(post_id: string, post_analysis: Partial<PostAnalysis>): Promise<Boolean> {
        const query = 'INSERT INTO post_analysis (post_id, word_count, average_word_length, status , user_id, analysis_date) VALUES (?, ?, ?, ?, ?,  toTimestamp(now()))';
        const params = [post_id, post_analysis.word_count, post_analysis.average_word_length, post_analysis.status, post_analysis.user_id];

        try {
            console.log('Saving post analysis:', query, params);
            await clientManager.getClient().execute(query, params, { prepare: true });
            console.log('Post analysis saved successfully');
            return true;
        } catch (error) {
            console.error('Error saving post analysis:', error);
            throw error;
        }
    }

    static async updatePostAnalysisStatus(post_id: string, user_id: string, status: string): Promise<Boolean> {
        const query = 'UPDATE post_analysis SET status = ?, user_id = ? WHERE post_id = ?';
        const params = [status, user_id, post_id];

        try {
            // Assuming clientManager.getClient() returns a properly configured Cassandra client
            await clientManager.getClient().execute(query, params, { prepare: true });
            console.log('Post analysis status updated successfully');
            return true;
        } catch (error) {
            console.error('Error updating post analysis status:', error);
            throw error;
        }
    }
}
