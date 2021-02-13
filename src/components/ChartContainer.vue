<template>
<div>
  <h3>Currency history</h3>
  <div class="input-section">
    <input type="date" v-model="from" :max="maxDate" @change="getHistoryOfCurrency()"/>
    <select v-model="base" @change="getHistoryOfCurrency()">
      <option
        v-for="currency in currencies"
        :key="currency"
        :value="currency">{{currency}}</option>
    </select>
  <line-chart :key="reloader" :chart-data="chartdata"></line-chart>
  </div>
</div>
</template>

<script>
import { format } from 'date-fns';
import { mapActions, mapState } from 'vuex';
import LineChart from '@/components/LineChart';
export default {
  name: 'ChartContainer',
  components: {
    LineChart
  },
  data () {
    return {
      base: 'USD',
      from: '',
      chartdata: [],
      reloader: 0, //to rerender the chart
      maxDate: format(new Date(), 'yyy-MM-dd')
    }
  },
  computed: {
    ...mapState([
      'currencies'
      ]
    )
  },
  methods: {
    ...mapActions([
      'getCurrencyHistory'
    ]),
    async getHistoryOfCurrency() {
      let formattedDate;
      if (this.from) {
        formattedDate = format(new Date(this.from), 'yyyy-MM-dd');
      } else {
        return;
      }
      this.chartdata = await this.getCurrencyHistory(
        {
          from: formattedDate,
          for: this.base
        }
      );
      this.reloader++;
    }
  },
}
</script>
<style lang="scss" scoped>
  input[type="date"] {
    font-size: 16px;
  }
  .input-section {
    margin-bottom: 20px;
    padding: 10px 10px;
    border: 1px dotted grey;
    border-radius: 6px;

    input, select {
      margin-bottom: 20px;
    }
  }
</style>