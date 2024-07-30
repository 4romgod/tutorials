import {KafkaConsumer} from '@/kafka/consumer';
import {kafkaClient} from '@/kafka/client';
import {KAFKA_TOPICS} from '@/contants';

const runKafkaConsumer = async () => {
    const kafkaConsumer = new KafkaConsumer(kafkaClient, {
        topics: [KAFKA_TOPICS.topic1, KAFKA_TOPICS.topic2],
        consumerGroupId: 'kafka-consumer-groupId',
    });

    await kafkaConsumer.connect();
};

runKafkaConsumer()
    .then(() => {
        console.log('Consumer is running...');
    })
    .catch((error) => {
        console.error('Failed to run kafka consumer', error);
    });
