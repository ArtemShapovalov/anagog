const Queue = require('../../utils/queue');

function activity(req, res, next) {
  const topic = 'Activity';

  try {
    const producer = new Queue.Producer();

    producer.connect();

    producer.on("ready", (info) => {
      console.info(`Overwrite Producer ready: ${JSON.stringify(info)}`);
      producer.produce(topic, null, Buffer.from(JSON.stringify(req.body.data)));
    });

  } catch (err) {
    console.log('Error: ', err );
  }

  res.send('Activity: ok');
}

module.exports = activity;
