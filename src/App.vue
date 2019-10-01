<template>
  <div id="app">
    <input type="text" v-model="sheetUrl">
    <button @click="convertSheetToJson">
      Convert to JSON
    </button>
    
    <ChartLine
      v-if="line"
      :config="line" />

    <canvas
      id="myChart" />
  </div>
</template>

<script>
import Chart from 'chart.js'
import { getJsonObject } from 'sheetyjs'
import { ChartLine } from 'chart.xkcd-vue-wrapper';

export default {
  name: 'app',
  components: {
    ChartLine
  },
  data: function () {
    return {
      sheetUrl: '',
      line: null,
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

      const labels = data.splice(0, 1)[0]
      const datasets = data.reduce((prev, curr) => {
        prev.push({
          label: curr.splice(0, 1)[0],
          data: curr,
        })
        return prev
      }, [])
      
      this.line = {
        // title: '30 days pushups challenge',
        xLabel: labels.splice(0, 1)[0],
        // yLabel: 'Pushups',
        data: {
          labels: labels,
          datasets,
        },
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
