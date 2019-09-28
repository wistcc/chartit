<template>
  <div>
    <div>
      <p>Select chart type</p>

      <div>
        <input
          type="radio"
          value="Line"
          name="type"
          :checked="chartType === types.CHART_TYPE_LINE"
          @change="selectChartType(types.CHART_TYPE_LINE)">
        <label for="huey">Line</label>
      </div>

      <div>
        <input
          type="radio"
          value="Bar"
          name="type"
          :checked="chartType === types.CHART_TYPE_BAR"
          @change="selectChartType(types.CHART_TYPE_BAR)">
        <label for="dewey">Bar</label>
      </div>

      <div>
        <input
          type="radio"
          value="Pie"
          name="type"
          :checked="chartType === types.CHART_TYPE_PIE"
          @change="selectChartType(types.CHART_TYPE_PIE)">
        <label for="louie">Pie</label>
      </div>
    </div>

    <div v-if="chartType">
      <p>Select chart style</p>

      <div>
        <input
          type="radio"
          value="xkcd"
          name="style"
          :checked="chartStyle === styles.CHART_STYLE_XKCD"
          @change="selectChartStyle(styles.CHART_STYLE_XKCD)">
        <label for="huey">xkcd</label>
      </div>

      <div>
        <input
          type="radio"
          value="Chart.js"
          name="style"
          :checked="chartStyle === styles.CHART_STYLE_CHARTJS"
          @change="selectChartStyle(styles.CHART_STYLE_CHARTJS)">
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
import {
  CHART_TYPE_LINE,
  CHART_TYPE_BAR,
  CHART_TYPE_PIE,
  CHART_STYLE_XKCD,
  CHART_STYLE_CHARTJS,
} from '../helpers/constants'

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
      types: {
        CHART_TYPE_LINE,
        CHART_TYPE_BAR,
        CHART_TYPE_PIE,
      },
      styles: {
        CHART_STYLE_XKCD,
        CHART_STYLE_CHARTJS,
      },
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
