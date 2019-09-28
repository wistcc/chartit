<template>
  <div id="app" v-if="isLoaded">
    <NewChart 
      v-if="!chartId" />
    <ChartPage
      v-else
      :chart="chart" />
  </div>
</template>

<script>
import { getChart } from './helpers/db'
import NewChart from './components/NewChart'
import ChartPage from './components/ChartPage'

export default {
  name: 'app',
  components: {
    NewChart,
    ChartPage,
  },
  data: function () {
    return {
      isLoaded: false,
      chartId: null,
      chart: null,
    }
  },
  created: async function () {
    const chartId = window.location.pathname.replace('/', '')

    if (chartId) {
      try {
        const chart = await getChart(chartId)
        
        if (chart) {
          this.chartId = chartId
          this.chart = chart
        }
      } catch(e) {
        window.location.href = '/'
      }
    }

    this.isLoaded = true
  },
}
</script>

<style>
</style>
