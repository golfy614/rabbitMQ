var amqp = require('amqplib/callback_api');
amqp.connect('amqp://localhost', function (err, conn) {
    if (conn) {
        conn.createChannel(function (err, ch) {
            var q = 'hello';
            ch.assertQueue(q, { durable: false });//create new queue "hello"
            ch.sendToQueue(q, new Buffer('Hello World!'));//sent 'Hello World!' to queue
            console.log(" [x] Sent 'Hello World!'");
            ch.consume(q, function(msg) {
                console.log(" [x] Received %s", msg.content.toString());
              }, {noAck: true});//worker ch recive message 'Hello World!' from hello 
        })//create worker
    } else {
        console.log('connect fail')
    }
    // if (conn) {
    //     conn.createChannel(function (err, ch) {
    //         var exchangeName = 'hello';
    //         ch.assertExchange(exchangeName, 'direct', {
    //             durable: true
    //           })
    //         ch.sendToQueue(q, new Buffer('Hello World!'));//sent 'Hello World!' to queue
    //         console.log(" [x] Sent 'Hello World!'");
    //         ch.consume(q, function(msg) {
    //             console.log(" [x] Received %s", msg.content.toString());
    //           }, {noAck: true});//worker ch recive message 'Hello World!' from hello 
    //     })//create worker
    // } else {
    //     console.log('connect fail')
    // }
    setTimeout(function() { conn.close(); process.exit(0) }, 500);//set timeout
});
