<template>
  <div id="app">
    <div>
      count: {{ count }}<br>
      cards: {{ JSON.stringify(cards) }}
    </div>
  </div>
</template>

<script>
const Colyseus = require('colyseus.js');

export default {
  name: 'App',
  data() {
    return {
      room: null,
      cards: [],
      count: 0,
    }
  },
  async mounted() {
    const client = new Colyseus.Client('ws://localhost:3000');
    this.room = await client.joinOrCreate('my_room');

    this.room.state.listen('cards', cards => this.cards = cards);
    this.room.state.listen('count', count => this.count = count);
  },
}
</script>

<style>
</style>
