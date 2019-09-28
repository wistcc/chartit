<template>
  <div>
    <div>
      <p>Select chart type</p>

      <div>
        <input type="radio" value="Line" name="type" :checked="chartType === 1" @change="selectChartType(1)">
        <label for="huey">Line</label>
      </div>

      <div>
        <input type="radio" value="Bar" name="type" :checked="chartType === 2" @change="selectChartType(2)">
        <label for="dewey">Bar</label>
      </div>

      <div>
        <input type="radio" value="Pie" name="type" :checked="chartType === 3" @change="selectChartType(3)">
        <label for="louie">Pie</label>
      </div>
    </div>

    <div v-if="chartType">
      <p>Select chart style</p>

      <div>
        <input type="radio" value="xkcd" name="style" :checked="chartStyle === 1" @change="selectChartStyle(1)">
        <label for="huey">xkcd</label>
      </div>

      <div>
        <input type="radio" value="Chart.js" name="style" :checked="chartStyle === 2" @change="selectChartStyle(2)">
        <label for="dewey">Chart.js</label>
      </div>
    </div>

    <button
      v-if="showSaveButton"
      @click="saveChart">
      Share chart with current changes
    </button>

    <Chart
      v-if="showChart"
      :chart-type="chartType"
      :chart-style="chartStyle"
      :labels="labels"
      :datasets="datasets" />
  </div>
</template>

<script>
import { saveChart } from '../helpers/db'
import Chart from './Chart'

export default {
  name: 'ChartPage',
  components: {
    Chart,
  },
  props: {
    chart: Object,
  },
  data: function () {
    return {
      chartType: null,
      chartStyle: null,
      labels: null,
      datasets: null,
    }
  },
  computed: {
    showChart() {
      return this.chartType
        && this.chartStyle
        && this.labels
        && this.datasets
    },
    showSaveButton() {
      return this.chartType !== this.chart.type
        || this.chartStyle !== this.chart.style
    },
  },
  created() {
    this.chartType = this.chart.type
    this.chartStyle = this.chart.style
    this.labels = this.chart.labels
    this.datasets = this.chart.datasets
  },
  methods: {
    selectChartType(type) {
      this.chartType = type
    },
    selectChartStyle(style) {
      this.chartStyle = style
    },
    async saveChart() {
      const chart = {
        type: this.chartType,
        style: this.chartStyle,
        labels: this.labels,
        datasets: this.datasets,
      }
      
      const data = await saveChart(chart)
      window.location.href = `/${data.id}`
    },
  },
}
</script>

<style scoped>
</style>
