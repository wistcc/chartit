<template>
  <div>
    <div>
      Add Google Sheet URL
      <input type="text" v-model="sheetUrl">
      <button @click="convertSheetToJson">
        Convert to JSON
      </button>
    </div>

    <div v-if="datasets">
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
        v-if="this.chartType && this.chartStyle"
        @click="saveChart">
        Share
      </button>
    </div>

    <Chart
      v-if="showChart"
      :chart-type="chartType"
      :chart-style="chartStyle"
      :labels="labels"
      :datasets="datasets" />
  </div>
</template>

<script>
import { getJsonObject } from 'sheetyjs'
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
  name: 'NewChart',
  components: {
    Chart,
  },
  data: function () {
    return {
      sheetUrl: '',
      chartType: CHART_TYPE_LINE,
      chartStyle: CHART_STYLE_XKCD,
      labels: null,
      datasets: null,
      chartId: null,
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
  },
  methods: {
    async convertSheetToJson() {
      const values = await getJsonObject(this.sheetUrl)
      const data = []

      values.forEach(value => {
        Object.keys(value).forEach((key, index) => {
          if (!data[index]) {
            data[index] = []
          }

          if (!data[index].length) {
            data[index].push(key)
          }
          data[index].push(value[key])
        })
      })

      this.labels = data.splice(0, 1)[0]
      this.datasets = data.reduce((prev, curr) => {
        const key = curr.splice(0, 1)[0]
        prev[key] = curr
        return prev
      }, {})
    },
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
      this.$router.push(`/chart/${data.id}`)
    },
  },
}
</script>
