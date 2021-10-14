# - Stack Path coding challenge

to run this program, execute the following steps in order

1:open three terminals

2:on the first run the following to spin up some docker images using the yml file: 
	docker-compose -f docker-compose.yml up
	(you could run the images in the background but I like to have a dedicated terminal for them)

3:on the second run the following commands to create a topic and a consumer:
	node topic.js
	node consumer.js

4:finally on the third terminal run the following to create a produce and send some messages to the topic
	node producer.js

wait a few seconds and you should see a new file called results.txt