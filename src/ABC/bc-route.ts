import { RouteRecordRaw } from 'vue-router'

const routeBc: RouteRecordRaw = {
    path: '/',
    component: () => import('@/ABC/pages/calendar/doc_adc_calendar.vue'),
    meta: {
        group: 'BC',
        title: 'app components',
    },
}

const routes: Array<RouteRecordRaw> = []
routes.push(routeBc)
export default routes
