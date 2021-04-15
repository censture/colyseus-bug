const colyseus = require('colyseus');
const schema = require('@colyseus/schema');

class RoomState extends schema.Schema {
}

schema.defineTypes(RoomState, {
    cards: ["number"],
    count: "uint32",
});

schema.filter(function (client, value, root) {
    return this.cards.length !== 0 && root.count % 2 === 0
})(RoomState.prototype, "cards");

class MyRoom extends colyseus.Room {
    constructor() {
        super();

        const roomState = new RoomState();
        roomState.count = 0;
        roomState.cards = [];

        this.setState(roomState);

        this.clock.setInterval(() => {
            this.state.count++;
            this.state.cards.push(this.state.count);
            if (this.state.cards.length % 10 === 0)
                this.state.cards = [];
        }, 1000)
    }
}

module.exports = MyRoom;