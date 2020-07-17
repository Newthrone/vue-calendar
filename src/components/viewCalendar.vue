<template>
  <div class="viewCalendar" @click="clickHandler">
    <h1>pick the date</h1>
    <div class="viewCalendarTitle">
      {{ month }}
      <a data-change_month="-1" class="viewCalendarArrow viewCalendarArrow-prev"></a>
      <a data-change_month="1" class="viewCalendarArrow viewCalendarArrow-next"></a>
    </div>
    <section class="calendarBody">
      <div v-for="day in langEn.weekDays"
           class="calendarCell"
           :key='day'>
        {{ day }}
      </div>
      <view-calendar-days v-for="num in lastDay"
                          class="calendarCell"
                          :number="num"
                          :activeDay="activeDay"
                          :key='num'/>
    </section>
  </div>
</template>

<script>
import viewCalendarDays from './viewCalendarDays'

export default {
  name: 'viewCalendar',
  components: {
    viewCalendarDays
  },
  props: {
    date: {
      type: Date,
      default: () => new Date()
    },
    lang: {
      type: String,
      default: 'langEn'
    }
  },
  data() {
    return {
      langRu: {
        locale: 'ru',
        weekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
      },
      langEn: {
        locale: 'en-Us',
        weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      },
      lastDay: 0,
      activeDay: 0,
      newDate: this.date
    }
  },
  computed: {
    month() {
      const option = { month: 'long', year: 'numeric' }
      return this.date.toLocaleString(this[this.lang].locale, option)
    }
  },
  created() {
    // this.$store.dispatch('SET_CURRENT_DATE', this.date)
    // this.date = this.$store.getters.GET_CURRENT_DATE
    this.activeDay = this.date.getDate()
    this.getLastDay()
  },
  methods: {
    getLastDay() {
      const year = this.date.getFullYear()
      const nextMonth = this.date.getMonth() + 1
      this.lastDay = new Date(year, nextMonth, 0).getDate()
    },
    clickHandler({ target }) {
      if (target.classList.contains('viewCalendarDays')) {
        this.activeDay = parseInt(target.dataset.day, 10)
      } else if (target.classList.contains('viewCalendarArrow')) {
        this.changeMonth(parseInt(target.dataset.change_month, 10))
      }
    },
    changeMonth(shift) {
      console.log('shift', shift)
    }
  }
}
</script>

<style lang="scss">
  .viewCalendar {
    width: 400px;
    margin: 0 auto;
    text-align: center;
  }

  .viewCalendarTitle {
    position: relative;
    margin: 0 0 15px;
  }

  .viewCalendarArrow {
    position: absolute;
    top: 0;
    display: block;
    border-top: 8px solid #000;
    border-right: 8px solid #000;
    border-bottom: 8px solid #fff;
    border-left: 8px solid #fff;
    cursor: pointer;

    &:after {
      content: '';
      position: absolute;
      bottom: -20px;
      left: -20px;
      display: block;
      width: 45px;
      height: 45px;
    }

    &-prev {
      left: 10px;
      transform: rotate(225deg);
    }

    &-next {
      right: 10px;
      transform: rotate(45deg);
    }

  }

  .calendarBody {
    display: grid;
    grid-template-rows: 40px;
    grid-auto-rows: 40px;
    grid-template-columns: repeat(7, 1fr);
  }

  .calendarCell {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    margin: 0 -1px -1px 0;
  }
</style>

// нужно добавить для активного дня полное отслеживание даты
