const Kafka = require('node-rdkafka');
const config = require('config');

class Producer {
  constructor() {
    const producer = new Kafka.Producer({
      'metadata.broker.list': config.get('kafka.host')
    });

    producer.on("ready", (info) => {
      console.info(`Producer ready: ${JSON.stringify(info)}`);
    });

    producer.on("delivery-report", (err, report) => {
      console.info(`Producer delivery-report: ${JSON.stringify(report)}`);
    });
    producer.on("disconnected", (args) => {
      console.warn(`Producer disconnected: ${JSON.stringify(args)}`);
    });
    producer.on("event.log", (lg) => {
      console.info(`Producer log: ${JSON.stringify(lg)}`);
    });
    producer.on("event.error", (err) => {
      console.error(`Producer error: ${err}`);
    });

    this.producer = producer;
  }

  connect() {
    return this.producer.connect();
  }

  produce(...args) {
    return this.producer.produce(...args);
  }

  on(event, cb) {
    this.producer.on(event, cb);
  }
}

class Consumer {
  constructor() {
    const consumer = new Kafka.KafkaConsumer({
      'group.id': 'kafka',
      'metadata.broker.list': config.get('kafka.host'),
    }, {});

    this.consumer = consumer;
    return this;
  }

  connect() {
    this.consumer.connect();
    return this;
  }

  subscribe(...args) {
    this.consumer.subscribe(...args);
    return this;
  }

  consume(...args) {
    this.consumer.consume(...args);
    return this;
  }

  on(event, cb) {
    this.consumer.on(event, cb);
    return this;
  }
}

module.exports = {
  Producer,
  Consumer
};
