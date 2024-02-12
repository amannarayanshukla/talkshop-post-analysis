import { KafkaClient, Message, Consumer } from 'kafka-node';

import { PostAnalysisDao } from '../../dao/post-analysis.dao';
import {TextAnalysis} from "../../utils/text-analysis";

export class KafkaConsumerService {
    private consumer: Consumer;

    constructor(client: KafkaClient, topic: string) {
        console.log(`Kafka Consumer Service started for topic: ${topic}`)
         this.consumer = new Consumer(
            client,
            [{ topic: topic, partition: 0 }], // Subscribing to our topic
            {
                autoCommit: true // Automatically commit offsets
            }
        );
        this.consumer.on('message', this.onMessage);
        this.consumer.on('error', this.onError);
    }

    async onMessage(message: Message) {
        console.log('Message received:', message);
        try {
            const post = JSON.parse(message.value as string);
            const { post_id: id, text, user_id } = post;

            await PostAnalysisDao.updatePostAnalysisStatus(id,  user_id, 'IN_PROGRESS').catch((error) => {
                console.error('Error updating post analysis status:', error);
            });

            if (text) {
                const numberOfWords: string = TextAnalysis.countWords(text);
                const averageWordLength: string = TextAnalysis.calculateAverageWordLength();

                console.log(`Processing post with ID: ${id}, message: ${text}, number of words: ${numberOfWords}, average word length: ${averageWordLength}`);

                await PostAnalysisDao.savePostAnalysis(id, {
                    status: "COMPLETE",
                    word_count: numberOfWords,
                    average_word_length: averageWordLength
                }).catch(async (error) => {
                    await PostAnalysisDao.updatePostAnalysisStatus(id,  user_id, 'FAILED');
                    console.error('Error saving post analysis:', error);
                });
            } else {
                console.log('Received message does not contain text.');
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    }
    onError(err: any) {
        console.error('Error:', err);
    }
}

// export const kafkaProducerClient: KafkaProducer = new KafkaProducer('localhost:9092', process.env.POST_ANALYSIS_TOPIC);
