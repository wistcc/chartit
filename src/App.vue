<template>
  <div id="app">
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
          <input type="radio" value="Line" name="type" @change="selectChartType(1)">
          <label for="huey">Line</label>
        </div>

        <div>
          <input type="radio" value="Bar" name="type" @change="selectChartType(2)">
          <label for="dewey">Bar</label>
        </div>

        <div>
          <input type="radio" value="Pie" name="type" @change="selectChartType(3)">
          <label for="louie">Pie</label>
        </div>
      </div>

      <div v-if="chartType">
        <p>Select chart style</p>

        <div>
          <input type="radio" value="xkcd" name="style" @change="selectChartStyle(1)">
          <label for="huey">xkcd</label>
        </div>

        <div>
          <input type="radio" value="Chart.js" name="style" @change="selectChartStyle(2)">
          <label for="dewey">Chart.js</label>
        </div>
      </div>
      
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
  </div>
</template>

<script>
import Chart from 'chart.js'
import { getJsonObject } from 'sheetyjs'
import { ChartLine, ChartBar, ChartPie } from 'chart.xkcd-vue-wrapper';

export default {
  name: 'app',
  components: {
    ChartLine,
    ChartBar,
    ChartPie,
  },
  data: function () {
    return {
      sheetUrl: '',
      line: null,
      bar: null,
      pie: null,
      chartType: null,
      chartStyle: null,
      chartjs: null,
      context: null,
      labels: null,
      datasets: null,
    }
  },
  methods:{
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
        });
      });

      this.labels = data.splice(0, 1)[0]
      this.datasets = data.reduce((prev, curr) => {
        prev.push({
          label: curr.splice(0, 1)[0],
          data: curr,
        })
        return prev
      }, [])
    },
    selectChartType(type) {
      this.chartType = type
      this.chartIt()
    },
    selectChartStyle(style) {
      this.chartStyle = style
      this.chartIt()
    },
    reset() {
      this.line = null
      this.bar = null
      this.pie = null
      this.chartjs = null
      if (this.context) {
        const canvas = document.getElementById('myChart')
        this.context.clearRect(0, 0, canvas.width, canvas.height);
      }
    },
    chartIt() {
      if (!this.chartType || !this.chartStyle) return

      this.reset()

      if (this.chartType === 1) {
        if (this.chartStyle === 1) {
          this.line = {
            // title: '30 days pushups challenge',
            xLabel: this.labels.splice(0, 1)[0],
            // yLabel: 'Pushups',
            data: {
              labels: this.labels,
              datasets: this.datasets,
            },
          }
        } else if (this.chartStyle === 2) {
          this.context = document.getElementById('myChart').getContext('2d');
          this.chartjs = new Chart(this.context, {
            type: 'line',
            data: {
              labels: this.labels,
              datasets: this.datasets,
            },
          })
        }
      } else if (this.chartType === 2) {
        if (this.chartStyle === 1) {
          this.bar = {
            // title: '30 days pushups challenge',
            xLabel: this.labels.splice(0, 1)[0],
            // yLabel: 'Pushups',
            data: {
              labels: this.labels,
              datasets: this.datasets,
            },
          }
        } else if (this.chartStyle === 2) {
          this.context = document.getElementById('myChart').getContext('2d');
          this.chartjs = new Chart(this.context, {
            type: 'bar',
            data: {
              labels: this.labels,
              datasets: this.datasets,
            },
          })
        }
      } else if (this.chartType === 3) {
        if (this.chartStyle === 1) {
          this.pie = {
            // title: '30 days pushups challenge',
            xLabel: this.labels.splice(0, 1)[0],
            // yLabel: 'Pushups',
            data: {
              labels: this.labels,
              datasets: this.datasets,
            },
          }
        } else if (this.chartStyle === 2) {
          this.context = document.getElementById('myChart').getContext('2d');
          this.chartjs = new Chart(this.context, {
            type: 'pie',
            data: {
              labels: this.labels,
              datasets: this.datasets,
            },
          })
        }
      }

      var ctx = document.getElementById('myChart').getContext('2d');
      var chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets,
        },
      })
    }
  },
}
</script>

<style>
</style>
