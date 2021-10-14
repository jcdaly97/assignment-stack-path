const { Kafka } = require('kafkajs');
const { uuid } = require('uuidv4')

run();

async function run() {
	try {
		const kafka = new Kafka({
			clientId: 'mykafka',
			brokers: ['localhost:9092']
		})

		const producer = kafka.producer();
		console.log('connecting...')
		await producer.connect()
		console.log('connected!')

		for (let i = 1; i <= 100; i++) {
			const newMessage = {
				"eventID": uuid(),
				"eventSequence": i,
				"eventTimestamp": Date.now()
			}
			//console.log(newMessage)
			await producer.send({
				topic: 'stackpath-interview-homework',
				messages: [{
					"value": JSON.stringify(newMessage)
				}]

			})
		}

		await producer.disconnect()

	} catch (err) {

		console.log('caught: ', err)
	}
	finally {
		console.log('you did it!')
		process.exit()

	}
}