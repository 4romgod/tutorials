import {Kafka} from 'kafkajs';

export const kafkaClient = new Kafka({
    brokers: ['127.0.0.1:3128'],
});
