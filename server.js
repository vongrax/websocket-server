const ws = require('ws');
const clients = {};
const messages =[];

const wss = new ws.Server({port: 5000});
wss.on("connection", (ws) => {
    const id = Date.now();
    clients[id] = ws;

    console.log(`New client ${id}`);
    ws.send(JSON.stringify(messages));

    ws.on('message', (rawMessage) => {
        console.log(JSON.parse(rawMessage))
        const {username, code} = JSON.parse(rawMessage);
        messages.push({username, code});
        for (const id in clients) {
            clients[id].send(JSON.stringify([{username, code}]))
        }
    })

    ws.on('close', () => {
        delete clients[id];
        console.log(`Client is closed ${id}`)
    })
})

