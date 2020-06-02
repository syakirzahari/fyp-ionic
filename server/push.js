var FCM = require('fcm-node');
    var serverKey = 'AAAA3ZGHPy8:APA91bFbByr2ZRNoT0Eb7FTFTu0moj56oadNH3o4jz4iWBI-GzDYCfHw_hd-S9Wtdd9aVCzba7cmZ5OnUV47mfpabBwTtBcOZQfRaJnS1yJrguOwobWYeS9IJnHOhtQNvezUIr8N-D4c'; //put your server key here
    var fcm = new FCM(serverKey);
 
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: '/topics/consultationTopic', 
        //collapse_key: 'your_collapse_key',
        
        notification: {
            title: 'New Appointment Approved!', 
            body: 'Body of your push notification' 
        },
        
        data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };
    
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });