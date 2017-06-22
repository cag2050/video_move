import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import VideoMove from '@/components/VideoMove'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'VideoMove',
      component: VideoMove
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    }
  ]
})
