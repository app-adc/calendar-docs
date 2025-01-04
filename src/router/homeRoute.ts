import { AppTitle } from '@/store/app'
import { RouteRecordRaw } from 'vue-router'

const homeRoute: Array<RouteRecordRaw> = [
    {
        path: '/', // เปลี่ยนจาก /Docs/
        name: 'Home',
        component: () => import('@/ABC/pages/calendar/doc_adc_calendar.vue'),
        meta: {
            title: `${AppTitle}Home`,
        },
    },
]

export default homeRoute
