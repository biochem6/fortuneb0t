
console.log("hello")
const tmi = require("tmi.js");
const fetch = require('node-fetch');

const options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: "fortuneb0t",
        password: ""
    },
    channels: ["fortuneb0t", "phoodd"]
};

const client = new tmi.client(options);

client.connect();

(function chat() {
    client.on("chat", function (channel, user, message, self, accessLvl) {
    
        if (self) return;

        if(message === "!fortune") {
            fetch('http://fortunecookieapi.herokuapp.com/v1/fortunes').then(res => res.json()).then(data => client.action(channel, data[Math.floor((Math.random() * 100) + 1)].message));
        } else if(message === "!lesson") {
            fetch(`http://fortunecookieapi.herokuapp.com/v1/lessons/`).then(res => res.json())
                                                .then(data => {                           
                                                    var rsp = data[Math.floor((Math.random() * 100) + 1)];                                                   
                                                    response =  "English: " + rsp.english + 
                                                                "*******" + 
                                                                "Chinese: " + rsp.chinese +
                                                                "*******" +
                                                                "Pronunciation: " + rsp.pronunciation
                                                    client.action(channel, response)                            
                                                    
                                                });        
        } else if (message === "!lotto") {
            function getRandom() {
                return Math.floor((Math.random() * 99) + 1)
            }

            var lottoArr = [
                getRandom(),
                getRandom(),
                getRandom(),
                getRandom(),
                getRandom(),
                getRandom(),
                getRandom(),
            ];

            var lottoResponse = `Your winning lottery numbers are: ${lottoArr}`;
            client.action(channel, lottoResponse);
        }
    });
})();




