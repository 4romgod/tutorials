import {Consumer, EachMessagePayload, Kafka} from 'kafkajs';

export interface IKafkaConsumer {
    connect(): Promise<void>;
    handleMessage(message: any): Promise<void>;
    disconnect(): Promise<void>;
}

export interface IKafkaConsumerConfig {
    topics: string[];
    consumerGroupId: string;
}

export class KafkaConsumer implements IKafkaConsumer {
    private readonly consumer: Consumer;
    private readonly consumerConfig: IKafkaConsumerConfig;

    constructor(kafkaClient: Kafka, consumerConfig: IKafkaConsumerConfig) {
        this.consumerConfig = consumerConfig;
        this.consumer = kafkaClient.consumer({groupId: this.consumerConfig.consumerGroupId});
    }

    async connect(): Promise<void> {
        try {
            await this.consumer.connect();
            this.consumerConfig.topics.forEach(async (topic) => {
                await this.consumer.subscribe({topic});
            });

            console.log(`Consumer subscribed to topics: ${this.consumerConfig.topics.reduce((prev, curr) => `${prev}, ${curr}`)}`);

            return await this.consumer.run({
                eachMessage: (payload) => this.handleMessage(payload),
            });
        } catch (e) {
            return console.log(`Can't connect ${e}`);
        }
    }

    async handleMessage({topic, partition, message}: EachMessagePayload): Promise<void> {
        console.log({
            topic: topic,
            partition: partition,
            value: JSON.stringify(message),
        });
    }

    async disconnect(): Promise<void> {
        try {
            return await this.consumer.disconnect();
        } catch (e) {
            return console.log(`Error on disconnect ${e}`);
        }
    }
}
