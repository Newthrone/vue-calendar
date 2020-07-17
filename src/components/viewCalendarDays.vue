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
  props: {
    number: Number,
    activeDay: Number
  },
  computed: {
    active() {
      return this.number === this.activeDay
    }
  }
}
</script>

<style lang="scss">
  .viewCalendarDays {
    transition: background-color .3s;
    cursor: pointer;

     &:hover {
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
