const { Kafka } = require('kafkajs');

run();

async function run() {
	try {
		const kafka = new Kafka({
			clientId: 'mykafka',
			brokers: ['localhost:9092']
		})

		const admin = kafka.admin();
		console.log('connecting...')
		await admin.connect()
		console.log('connected!')
		await admin.createTopics({
			'topics': [{
				'topic': 'stackpath-interview-homework',
				'numPrtitions': 1
			}]
		})
		console.log('created successfully')
		await admin.disconnect()

	} catch (err) {

		console.log('caught: ', err)
	}
	finally {
		console.log('you did it!')
		process.exit()

	}
}