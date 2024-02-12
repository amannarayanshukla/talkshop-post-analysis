import dotenv from "dotenv";
dotenv.config();

import { KafkaClient} from "kafka-node";

import { KafkaConsumerService } from './store/kafka/kafka';


// Provide default values for KAFKA_HOST, KAFKA_PORT, and POST_ANALYSIS_TOPIC
const kafkaURL = 'localhost:9092';
const kafkaTopic = 'POST_ANALYSIS_TOPIC';

const client = new KafkaClient({ kafkaHost: kafkaURL });
const kafkaConsumerService = new KafkaConsumerService(client, kafkaTopic);
kafkaConsumerService.onMessage = kafkaConsumerService.onMessage.bind(kafkaConsumerService);
kafkaConsumerService.onError = kafkaConsumerService.onError.bind(kafkaConsumerService);
