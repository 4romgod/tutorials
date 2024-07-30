import {KAFKA_TOPICS} from '@/contants';
import {kafkaClient} from '@/kafka/client';
import {KafkaProducer} from '@/kafka/producer';

const runKafkaProducer = async () => {
    const kafkaProducer = new KafkaProducer(kafkaClient, {});
    await kafkaProducer.connect();

    await kafkaProducer.sendMessage({
        topic: KAFKA_TOPICS.topic1,
        messages: [
            {
                value: 'This is the first message',
                headers: {source: 'test-app'},
            },
            {
                value: 'Hello KafkaJS user!',
            },
        ],
    });
};

runKafkaProducer()
    .then(() => {
        console.log('Producer is running...');
    })
    .catch((error) => {
        console.error('Failed to run kafka producer', error);
    });
