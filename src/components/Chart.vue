<template>
  <div>
    <ChartLine
      v-if="line"
      :config="line" />
    
    <ChartBar
      v-if="bar"
      :config="bar" />
    
    <ChartPie
      v-if="pie"
      :config="pie" />

    <canvas
      id="myChart" />
  </div>
</template>

<script>
import Chart from 'chart.js'
import { ChartLine, ChartBar, ChartPie } from 'chart.xkcd-vue-wrapper'
import {
  CHART_TYPE_LINE,
  CHART_TYPE_BAR,
  CHART_TYPE_PIE,
  CHART_STYLE_XKCD,
  CHART_STYLE_CHARTJS,
} from '../helpers/constants'

export default {
  name: 'Chart',
  components: {
    ChartLine,
    ChartBar,
    ChartPie,
  },
  props: {
    chartType: Number,
    chartStyle: Number,
    labels: Array,
    datasets: Object,
  },
  data: function () {
    return {
      line: null,
      bar: null,
      pie: null,
      chartjs: null,
      context: null,
    }
  },
  computed: {
    transformedDataset() {
      return Object.keys(this.datasets).map(key => {
        return {
          label: key,
          data: this.datasets[key]
        }
      })
    },
  },
  mounted() {
    this.chartIt()
  },
  watch: {
    chartType: function() {
      this.chartIt()
    },
    chartStyle: function() {
      this.chartIt()
    },
  },
  methods: {
    reset() {
      this.line = null
      this.bar = null
      this.pie = null
      this.chartjs = null
      if (this.context) {
        const canvas = document.getElementById('myChart')
        this.context.clearRect(0, 0, canvas.width, canvas.height)
      }
    },
    chartIt() {
      this.reset()
      
      if (this.chartType === CHART_TYPE_LINE) {
        if (this.chartStyle === CHART_STYLE_XKCD) {
          this.line = {
            // title: '30 days pushups challenge',
            xLabel: this.labels[0],
            // yLabel: 'Pushups',
            data: {
              labels: this.labels,
              datasets: this.transformedDataset,
            },
          }
        } else if (this.chartStyle === CHART_STYLE_CHARTJS) {
          this.context = document.getElementById('myChart').getContext('2d')
          this.chartjs = new Chart(this.context, {
            type: 'line',
            data: {
              labels: this.labels.slice(1),
              datasets: this.transformedDataset,
            },
          })
        }
      } else if (this.chartType === CHART_TYPE_BAR) {
        if (this.chartStyle === CHART_STYLE_XKCD) {
          this.bar = {
            // title: '30 days pushups challenge',
            xLabel: this.labels[0],
            // yLabel: 'Pushups',
            data: {
              labels: this.labels,
              datasets: this.transformedDataset,
            },
          }
        } else if (this.chartStyle === CHART_STYLE_CHARTJS) {
          this.context = document.getElementById('myChart').getContext('2d')
          this.chartjs = new Chart(this.context, {
            type: 'bar',
            data: {
              labels: this.labels.slice(1),
              datasets: this.transformedDataset,
            },
          })
        }
      } else if (this.chartType === CHART_TYPE_PIE) {
        if (this.chartStyle === CHART_STYLE_XKCD) {
          this.pie = {
            // title: '30 days pushups challenge',
            xLabel: this.labels[0],
            // yLabel: 'Pushups',
            data: {
              labels: this.labels.slice(1),
              datasets: this.transformedDataset,
            },
          }
        } else if (this.chartStyle === CHART_STYLE_CHARTJS) {
          this.context = document.getElementById('myChart').getContext('2d')
          this.chartjs = new Chart(this.context, {
            type: 'pie',
            data: {
              labels: this.labels,
              datasets: this.transformedDataset,
            },
          })
        }
      }
    },
  },
}
</script>

<style scoped>
</style>
