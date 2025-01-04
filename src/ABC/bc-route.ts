import { RouteRecordRaw } from 'vue-router'

const routeBc: RouteRecordRaw = {
    path: '/',
    component: () => import('@/ABC/pages/directives/doc_adc_directives.vue'),
    meta: {
        group: 'BC',
        title: 'app components',
    },
}

const routes: Array<RouteRecordRaw> = []
routes.push(routeBc)
export default routes
