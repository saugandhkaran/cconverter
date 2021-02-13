<script>
import { Line } from 'vue-chartjs'

export default {
  name: "LineChart",
  extends: Line,
  props: {
    chartData: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    this.chartData.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    })
    this.renderChart({
      labels: this.chartData.map((item) => item.date),
      datasets: [
        {
          label: 'Valuation per EUR',
          backgroundColor: '#2c3e50',
          data: this.chartData.map((item) => item.value)
        }
      ],
    }, {reponsive: true})
  }
}
</script>