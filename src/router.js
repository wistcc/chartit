import Vue from 'vue'
import Router from 'vue-router'
import NewChart from './components/NewChart'
import ChartPage from './components/ChartPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: "/"
    },
    {
      path: '/',
      name: 'new',
      component: NewChart,
    },
    {
      path: '/chart/:id',
      name: 'chart',
      component: ChartPage,
    },
  ]
})
