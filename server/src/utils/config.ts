import { Kafka } from 'kafkajs';

// Initialize Kafka Client 
const kafka = new Kafka({
  brokers: ['localhost:9092'],
  retry: {
      retries: 10,
      initialRetryTime: 300,
  },
});
const producer = kafka.producer();
export const connectProducer = async () => {
  try {
      await producer.connect();
      console.log('Kafka producer connected');
  } catch (error) {
      console.error('Failed to connect Kafka producer:', error);
      throw error;
  }
};

export const sendToKafka = async (topic: string, message: object) => {
  try {
      await producer.send({
          topic,
          messages: [{ value: JSON.stringify(message) }],
      });
      console.log(`Message sent to Kafka topic ${topic}:`, message);
  } catch (error) {
      console.error('Failed to send message to Kafka:', error);
      throw error;
  }
};