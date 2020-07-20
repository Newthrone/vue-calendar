<template>
  <div class="viewCalendarDays"
      :class="{ 'viewCalendarDays-isActive' : active }"
      :data-day="number">
      {{ number }}
  </div>
</template>

<script>

export default {
  name: 'viewCalendarDays',
  props: ['number', 'activeDay'],
  computed: {
    active() {
      return this.number === this.activeDay
    }
  }
}
</script>

<style lang="scss">
  .viewCalendarDays {
    cursor: pointer;

     &:hover {
       transition: background-color .3s;
       background-color: #ccc;

     }

    &-isActive {
      background-color: #7ceccb;
      font-weight: bold;

      &:hover {
       background-color: #7ceccb;
     }

    }

  }

</style>
