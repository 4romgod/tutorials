import {Kafka, Partitioners, Producer, ProducerRecord} from 'kafkajs';

export interface IKafkaProducer {
    connect(): Promise<void>;
    sendMessage(message: any): Promise<void>;
    disconnect(): Promise<void>;
}

export interface IKafkaProducerConfig {}

export class KafkaProducer implements IKafkaProducer {
    private readonly producer: Producer;
    private readonly producerConfig: IKafkaProducerConfig;

    constructor(kafkaClient: Kafka, producerConfig: IKafkaProducerConfig) {
        this.producerConfig = producerConfig;
        this.producer = kafkaClient.producer({createPartitioner: Partitioners.DefaultPartitioner});
    }

    async connect(): Promise<void> {
        try {
            await this.producer.connect();
        } catch (e) {
            return console.log(`Can't connect ${e}`);
        }
    }

    async sendMessage({topic, messages}: ProducerRecord): Promise<void> {
        await this.producer.send({topic, messages});
    }

    async disconnect(): Promise<void> {
        try {
            return await this.producer.disconnect();
        } catch (e) {
            return console.log(`Error on disconnect ${e}`);
        }
    }
}
