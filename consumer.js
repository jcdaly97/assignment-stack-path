const { Kafka } = require('kafkajs');
const fs = require('fs')

run();

async function run() {
	try {
		const kafka = new Kafka({
			clientId: 'mykafka',
			brokers: ['localhost:9092']
		})

		const consumer = kafka.consumer({ "groupId": "test" })
		console.log('connecting...')
		await consumer.connect()
		console.log('connected!')
		consumer.subscribe({
			topic: 'stackpath-interview-homework',
			fromBeginning: true
		})

		await consumer.run({
			eachMessage: result => {
				fizzbuzz(JSON.parse(result.message.value))
			}
		})

	} catch (err) {

		console.log('caught: ', err)
	}
	finally {
		console.log('you did it!')
		//process.exit()

	}
}

//fizzbuzz function
function fizzbuzz(msg) {
	let num = msg.eventSequence
	let translation = `${num}`
	if (num % 15 == 0) translation = "FizzBuzz"
	else if (num % 3 == 0) translation = "Fizz"
	else if (num % 5 == 0) translation = "Buzz"
	newMsg = {
		...msg,
		translated: translation
	}
	console.log(newMsg)
	fs.appendFile('result.txt', JSON.stringify(newMsg), function (err) {
		console.log(err)
	})

}
