<template>
  <div class="viewCalendar" @click="clickHandler">
    <h1>pick the date</h1>
    <div class="viewCalendarSwitchLang">
      <label for="langRu">
        Russian
        <input type="radio" value="langRu" v-model="currentLang" id="langRu">
      </label>
      <label for="langEn">
        English
        <input type="radio" value="langEn" v-model="currentLang" id="langEn">
      </label>
    </div>
    <div class="viewCalendarTitle">
      {{ month }}
      <a data-change_month="-1" class="viewCalendarArrow viewCalendarArrow-prev"></a>
      <a data-change_month="1" class="viewCalendarArrow viewCalendarArrow-next"></a>
    </div>
    <section class="calendarBody">
      <div v-for="day in week"
           class="calendarCell"
           :key='day'>
        {{ day }}
      </div>
      <view-calendar-days v-for="(num, index) in monthDays"
                          class="calendarCell"
                          :number="num"
                          :activeDay="activeDayNum"
                          :key="index"/>
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
      default: 'langRu'
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
      currentLang: this.lang,
      activeDay: this.date,
      viewDate: {
        firstDayDate: this.date,
        lastDay: 0,
        lastWeekDay: 0
      }
    }
  },
  computed: {
    month() {
      const option = { month: 'long', year: 'numeric' }
      return this.viewDate.firstDayDate.toLocaleString(this[this.currentLang].locale, option)
    },
    monthDays() {
      this.setLastDay()
      const firstWeekDay = this.viewDate.firstDayDate.getDay()
      const monthDays = []
      const cicle = firstWeekDay + this.viewDate.lastDay + (6 - this.viewDate.lastWeekDay)
      for (let i = 0; i < cicle; i++) {
        let numDay
        if (i < firstWeekDay) numDay = ''
        else if (i > (this.viewDate.lastDay + firstWeekDay - 1)) numDay = ''
        else numDay = i - firstWeekDay + 1
        monthDays.push(numDay)
      }
      return monthDays
    },
    activeDayNum() {
      if (this.activeDay.getFullYear() === this.viewDate.firstDayDate.getFullYear() && this.activeDay.getMonth() === this.viewDate.firstDayDate.getMonth()) return this.activeDay.getDate()
      else return 0
    },
    week() {
      return this[this.currentLang].weekDays
    }
  },
  created() {
    this.viewDate.firstDayDate.setDate(1)
  },
  methods: {
    setLastDay() {
      const year = this.viewDate.firstDayDate.getFullYear()
      const nextMonth = this.viewDate.firstDayDate.getMonth() + 1
      this.viewDate.lastDay = new Date(year, nextMonth, 0).getDate()
      this.viewDate.lastWeekDay = new Date(year, nextMonth, 0).getDay()
    },
    clickHandler({ target }) {
      if (target.classList.contains('viewCalendarDays')) {
        this.activeDay = new Date(this.viewDate.firstDayDate)
        this.activeDay.setDate(parseInt(target.dataset.day, 10))
      } else if (target.classList.contains('viewCalendarArrow')) {
        this.changeMonth(parseInt(target.dataset.change_month, 10))
      }
    },
    changeMonth(shift) {
      const year = this.viewDate.firstDayDate.getFullYear()
      const month = this.viewDate.firstDayDate.getMonth() + shift
      this.viewDate.firstDayDate = new Date(year, month, 1)
    }
  }
}
</script>

<style lang="scss">
  .viewCalendar {
    position: relative;
    width: 400px;
    margin: 0 auto;
    text-align: center;
  }

  .viewCalendarTitle {
    position: relative;
    margin: 0 0 15px;
  }

  .viewCalendarSwitchLang {
    position: absolute;
    top:25%;
    right: -150px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
