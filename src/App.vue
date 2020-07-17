<template>
  <div id="app">
    <view-calendar :date="date"/>
  </div>
</template>

<script>
import viewCalendar from './components/viewCalendar'

export default {
  name: 'App',
  components: {
    viewCalendar
  },
  data() {
    return {
      date: new Date('2018-02-10')
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
