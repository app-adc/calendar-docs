<script setup lang="ts">
import BcButton from '@/ABC/components/BcButton.vue'
import BcCalendar from '@/ABC/components/BcCalendar.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcSelect from '@/ABC/components/BcSelect.vue'
import BcLayout from '@/ABC/pages/bc_doc_layout.vue'
import { swCalendar, swCalendarBetween } from 'adc-calendar'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const installCode = `npm install adc-calendar`
const importCode = `import { swCalendar, swCalendarBetween } from 'adc-calendar'`

// Props documentation
const propsData = [
    {
        prop: 'value',
        type: 'Date',
        required: true,
        default: 'new Date()',
        description: 'วันที่ที่เลือก (สำหรับ swCalendar)',
    },
    {
        prop: 'values',
        type: '[Date, Date]',
        required: true,
        default: '[new Date(), new Date()]',
        description: 'ช่วงวันที่ที่เลือก (สำหรับ swCalendarBetween)',
    },
    {
        prop: 'min',
        type: 'Date | null',
        required: false,
        default: 'null',
        description: 'วันที่ต่ำสุดที่เลือกได้',
    },
    {
        prop: 'max',
        type: 'Date | null',
        required: false,
        default: 'null',
        description: 'วันที่สูงสุดที่เลือกได้',
    },
    {
        prop: 'lang',
        type: '"thai" | "english" | "th" | "en"',
        required: false,
        default: '"thai"',
        description: 'ภาษาที่ใช้แสดงผล',
    },
    {
        prop: 'year',
        type: '"th" | "en"',
        required: false,
        default: '"th"',
        description: 'รูปแบบการแสดงปี (พ.ศ./ค.ศ.)',
    },
    {
        prop: 'style',
        type: `{
    'font-family': string
    'text-picker': string
    'text-week': string
    background: string
    border: string
    text: string
    borderRadius: string
    current: string
    disabled: string
    picker: string
    shadow: string
    width: string
    dateRadius: string
}`,
        required: false,
        default: '{}',
        description: 'กำหนดสไตล์ของปฏิทิน',
    },
    {
        prop: 'nextMonth',
        type: '(date: Date) => void',
        required: false,
        default: 'undefined',
        description: 'callback function เมื่อมีการเปลี่ยนเดือน',
    },
    {
        prop: 'nextDate',
        type: '(date: Date | [Date, Date]) => void ',
        required: true,
        default: 'undefined',
        description: 'callback function เมื่อมีการเลือกวันที่',
    },
]

// Style controls
const styleControls = [
    {
        key: 'text-picker',
        label: 'สีตัวอักษรวันที่เลือก',
        type: 'color',
        default: 'white',
    },
    {
        key: 'text-week',
        label: 'สีตัวอักษรวันในสัปดาห์',
        type: 'color',
        default: '#1e293b',
    },
    {
        key: 'background',
        label: 'สีพื้นหลัง',
        type: 'color',
        default: 'white',
    },
    {
        key: 'text',
        label: 'สีตัวอักษรทั่วไป',
        type: 'color',
        default: 'black',
    },
    {
        key: 'current',
        label: 'สีวันที่ปัจจุบัน',
        type: 'color',
        default: 'var(--primary)',
    },
    {
        key: 'picker',
        label: 'สีวันที่เลือก',
        type: 'color',
        default: 'var(--primary)',
    },
    {
        key: 'disabled',
        label: 'สีวันที่ปิดใช้งาน',
        type: 'color',
        default: 'var(--disabled)',
    },
    {
        key: 'borderRadius',
        label: 'ความมนของขอบ',
        type: 'select',
        options: [
            { value: '0', label: 'ไม่มน' },
            { value: '0.375rem', label: 'มนน้อย' },
            { value: '0.75rem', label: 'มนปานกลาง' },
            { value: '1rem', label: 'มนมาก' },
        ],
        default: '0.75rem',
    },
    {
        key: 'dateRadius',
        label: 'ความมนของวันที่',
        type: 'select',
        options: [
            { value: '0', label: 'เหลี่ยม' },
            { value: '0.5rem', label: 'มนน้อย' },
            { value: '1rem', label: 'มนปานกลาง' },
            { value: '3rem', label: 'กลม' },
        ],
        default: '3rem',
    },
    {
        key: 'shadow',
        label: 'เงา',
        type: 'select',
        options: [
            { value: 'none', label: 'ไม่มีเงา' },
            { value: '0 1px 2px rgb(0 0 0 / 0.1)', label: 'เงาน้อย' },
            { value: '0 4px 6px -1px rgb(0 0 0 / 0.1)', label: 'เงาปานกลาง' },
            { value: '0 10px 15px -3px rgb(0 0 0 / 0.1)', label: 'เงามาก' },
        ],
        default: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    },
    {
        key: 'width',
        label: 'ความกว้าง',
        type: 'select',
        options: [
            { value: '260px', label: 'เล็ก' },
            { value: '300px', label: 'กลาง' },
            { value: '340px', label: 'ใหญ่' },
        ],
        default: '300px',
    },
]

// Default style
const defaultStyle = {
    'font-family': 'Kanit, sans-serif',
    'text-picker': 'white',
    'text-week': '#1e293b',
    background: 'white',
    border: 'none',
    text: 'black',
    borderRadius: '0.75rem',
    current: 'var(--primary)',
    disabled: 'var(--disabled)',
    picker: 'var(--primary)',
    shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    width: '300px',
    dateRadius: '3rem',
}
const examples = [
    {
        title: 'การใช้งานพื้นฐาน',
        description: 'การใช้งาน swCalendar สำหรับเลือกวันที่เดี่ยว',
        code: `import { swCalendar } from 'adc-calendar'

const calendar = new swCalendar('#calendar', {
    value: new Date(),
    lang: 'thai',
    year: 'th',
    nextDate: (date: Date) => {
        console.log('Selected:', date)
    }
})

calendar.render()`,
    },
    {
        title: 'การเลือกช่วงวันที่',
        description: 'การใช้งาน swCalendarBetween สำหรับเลือกช่วงวันที่',
        code: `import { swCalendarBetween } from 'adc-calendar'

const calendar = new swCalendarBetween('#calendar', {
    values: [new Date(), new Date()],
    lang: 'thai',
    year: 'th',
    nextDate: ([start, end]: Date[]) => {
        console.log('Selected range:', { start, end })
    }
})

calendar.render()`,
    },
    {
        title: 'การกำหนดขอบเขตวันที่',
        description: 'การกำหนดวันที่ต่ำสุดและสูงสุดที่เลือกได้',
        code: `const calendar = new swCalendar('#calendar', {
    value: new Date(),
    min: new Date('2024-01-01'),
    max: new Date('2024-12-31'),
    nextDate: (date: Date) => {
        console.log('Selected:', date)
    }
})

calendar.render()`,
    },
    {
        title: 'การใช้งานภาษาอังกฤษ',
        description: 'การแสดงปฏิทินในรูปแบบภาษาอังกฤษและปี ค.ศ.',
        code: `const calendar = new swCalendar('#calendar', {
    value: new Date(),
    lang: 'english',
    year: 'en',
    nextDate: (date: Date) => {
        console.log('Selected:', date)
    }
})

calendar.render()`,
    },
    {
        title: 'การกำหนดสไตล์',
        description: 'การปรับแต่งรูปแบบการแสดงผลของปฏิทิน',
        code: `const calendar = new swCalendar('#calendar', {
    value: new Date(),
    style: {
        'font-family': 'Kanit, sans-serif',
        'text-picker': 'white',
        'text-week': '#1e293b',
        background: 'white',
        text: 'black',
        borderRadius: '0.75rem',
        current: 'var(--primary)',
        disabled: 'var(--disabled)',
        picker: 'var(--primary)',
        shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        width: '300px',
        dateRadius: '3rem'
    }
})

calendar.render()`,
    },
    {
        title: 'การจัดการ Event',
        description: 'การใช้งาน callback functions สำหรับเหตุการณ์ต่างๆ',
        code: `const calendar = new swCalendar('#calendar', {
    value: new Date(),
    nextDate: (date: Date) => {
        console.log('วันที่เลือก:', date)
    },
    nextMonth: (date: Date) => {
        console.log('เปลี่ยนเดือนเป็น:', date)
    }
})

calendar.render()`,
    },
    {
        title: 'การใช้งานแบบสมบูรณ์',
        description: 'ตัวอย่างการใช้งานที่รวมคุณสมบัติต่างๆ',
        code: `import { swCalendarBetween } from 'adc-calendar'

const calendar = new swCalendarBetween('#calendar', {
    values: [new Date(), new Date()],
    min: new Date('2024-01-01'),
    max: new Date('2024-12-31'),
    lang: 'thai',
    year: 'th',
    style: {
        'font-family': 'Kanit, sans-serif',
        'text-picker': 'white',
        'text-week': '#1e293b',
        background: 'white',
        text: 'black',
        borderRadius: '0.75rem',
        current: 'var(--primary)',
        disabled: 'var(--disabled)',
        picker: 'var(--primary)',
        shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        width: '300px',
        dateRadius: '3rem'
    },
    nextDate: ([start, end]: Date[]) => {
        console.log('ช่วงวันที่เลือก:', { start, end })
    },
    nextMonth: (date: Date) => {
        console.log('เปลี่ยนเดือนเป็น:', date)
    }
})

calendar.render()`,
    },
]

// ใช้ในส่วน script setup
const typeSystemExamples = [
    {
        category: 'Calendar Configuration Types',
        description: 'Type สำหรับการกำหนดค่าปฏิทิน',
        code: `// Type สำหรับ swCalendar
type CalendarConfig = {
    // ค่าที่จำเป็น (Required)
    value: Date                      // วันที่ที่เลือก
    
    // ค่าที่เลือกได้ (Optional)
    min?: Date | null               // วันที่ต่ำสุดที่เลือกได้
    max?: Date | null               // วันที่สูงสุดที่เลือกได้
    lang?: 'thai' | 'english'       // ภาษาที่ใช้แสดงผล 
    year?: 'th' | 'en'             // รูปแบบการแสดงปี
    
    // Event Callbacks
    nextDate?: (date: Date) => void  // เมื่อเลือกวันที่
    nextMonth?: (date: Date) => void // เมื่อเปลี่ยนเดือน

    // Style Configuration
    style?: CalendarStyle
}

// Type สำหรับ swCalendarBetween
type CalendarBetweenConfig = Omit<CalendarConfig, 'value'> & {
    values: [Date, Date]            // ช่วงวันที่ที่เลือก [start, end]
    nextDate?: (dates: [Date, Date]) => void  // callback รับช่วงวันที่
}`,
    },
    {
        category: 'Style Types',
        description: 'Type สำหรับการกำหนดสไตล์',
        code: `type CalendarStyle = {
    // Fonts
    'font-family': string           // font-family ของปฏิทิน

    // Colors
    'text-picker': string          // สีตัวอักษรวันที่เลือก
    'text-week': string           // สีตัวอักษรวันในสัปดาห์
    background: string            // สีพื้นหลัง
    text: string                 // สีตัวอักษรทั่วไป
    current: string              // สีวันที่ปัจจุบัน
    disabled: string             // สีวันที่ปิดใช้งาน
    picker: string               // สีวันที่เลือก
    
    // Layout
    borderRadius: string         // ความมนของขอบปฏิทิน
    dateRadius: string          // ความมนของวันที่
    width: string              // ความกว้างของปฏิทิน
    shadow: string             // เงาของปฏิทิน
    border: string             // เส้นขอบของปฏิทิน
}`,
    },

    {
        category: 'Helper Types',
        description: 'Type สำหรับช่วยในการใช้งาน',
        code: `// Type สำหรับตรวจสอบภาษา
type Language = 'thai' | 'english'

// Type สำหรับรูปแบบปี
type YearFormat = 'th' | 'en'

// Type สำหรับ Event Handler
type DateChangeHandler = (date: Date) => void
type DateRangeChangeHandler = (dates: [Date, Date]) => void
type MonthChangeHandler = (date: Date) => void`,
    },
]
// Playground state and methods
const playgroundState = ref({
    single: {
        value: new Date(),
        min: undefined as Date | undefined,
        max: undefined as Date | undefined,
        lang: 'thai' as 'thai' | 'english' | 'th' | 'en',
        year: 'th' as 'th' | 'en',
        style: { ...defaultStyle },
    },
    range: {
        values: [new Date(), new Date()] as [Date, Date],
        min: undefined as Date | undefined,
        max: undefined as Date | undefined,
        lang: 'thai' as 'thai' | 'english' | 'th' | 'en',
        year: 'th' as 'th' | 'en',
        style: { ...defaultStyle },
    },
})

// Update style
type StyleProperties = {
    'font-family': string
    'text-picker': string
    'text-week': string
    background: string
    border: string
    text: string
    borderRadius: string
    current: string
    disabled: string
    picker: string
    shadow: string
    width: string
    dateRadius: string
}

const updateStyle = (
    type: 'single' | 'range',
    property: keyof StyleProperties,
    value: string
) => {
    if (type === 'single') {
        playgroundState.value.single.style[property] = value
    } else {
        playgroundState.value.range.style[property] = value
    }
    reRenderCalendar(type)
}

// Reset styles
const resetStyles = (type: 'single' | 'range') => {
    if (type === 'single') {
        playgroundState.value.single.style = { ...defaultStyle }
    } else {
        playgroundState.value.range.style = { ...defaultStyle }
    }
    reRenderCalendar(type)
}

// Calendar instances
let singleCalendar: swCalendar | null = null
let rangeCalendar: swCalendarBetween | null = null

onMounted(() => {
    singleCalendar = new swCalendar('#playground-single', {
        ...playgroundState.value.single,
        nextDate: (date: Date) => {
            playgroundState.value.single.value = date
        },
        nextMonth: (date: Date) => {
            console.log('Next month:', date)
        },
    })

    rangeCalendar = new swCalendarBetween('#playground-range', {
        ...playgroundState.value.range,
        nextDate: ([start, end]: Date[]) => {
            playgroundState.value.range.values = [start, end]
        },
        nextMonth: (date: Date) => {
            console.log('Next month:', date)
        },
    })

    singleCalendar?.render()
    rangeCalendar.render()
})

onUnmounted(() => {
    singleCalendar?.stop()
    rangeCalendar?.stop()
})

const copyCode = async (code: string) => {
    try {
        await navigator.clipboard.writeText(code)
    } catch (err) {
        console.error('Failed to copy:', err)
    }
}

const reRenderCalendar = (type: 'single' | 'range') => {
    if (type === 'single') {
        singleCalendar = new swCalendar('#playground-single', {
            ...playgroundState.value.single,
            value: playgroundState.value.single.min
                ? playgroundState.value.single.min
                : playgroundState.value.single.value,
            nextDate: (date: Date) => {
                playgroundState.value.single.value = date
            },
            nextMonth: (date: Date) => {
                console.log('Next month:', date)
            },
        })
        setTimeout(() => {
            singleCalendar?.render()
        }, 1)
    } else {
        rangeCalendar = new swCalendarBetween('#playground-range', {
            ...playgroundState.value.range,
            values: playgroundState.value.range.min
                ? [
                      playgroundState.value.range.min,
                      new Date(
                          playgroundState.value.range.min.getTime() + 86400000
                      ),
                  ]
                : playgroundState.value.range.values,
            nextDate: (v: Date[]) => {
                playgroundState.value.range.values = [v[0], v[1]]
            },
            nextMonth: (date: Date) => {
                console.log('Next month:', date)
            },
        })
        setTimeout(() => {
            rangeCalendar?.render()
        }, 1)
    }
}

const singlePlaygroundCode = computed(() => {
    const config = playgroundState.value.single
    const lines = [
        `import { swCalendar } from 'adc-calendar'`,
        '',
        'const calendar = new swCalendar("#calendar", {',
        `    value: new Date('${config.value.toISOString().split('T')[0]}'),`,
    ]

    if (config.min) {
        lines.push(
            `    min: new Date('${config.min.toISOString().split('T')[0]}'),`
        )
    }
    if (config.max) {
        lines.push(
            `    max: new Date('${config.max.toISOString().split('T')[0]}'),`
        )
    }

    lines.push(
        `    lang: '${config.lang}',`,
        `    year: '${config.year}',`,
        `    style: ${JSON.stringify(config.style, null, 8)},`,
        '    nextDate: (date: Date) => {',
        '        console.log("Selected:", date)',
        '    },',
        '    nextMonth: (date: Date) => {',
        '        console.log("Next month:", date)',
        '    }',
        '})',
        '',
        'calendar.render()'
    )

    return lines.join('\n')
})

const rangePlaygroundCode = computed(() => {
    const config = playgroundState.value.range
    const lines = [
        `import { swCalendarBetween } from 'adc-calendar'`,
        '',
        'const calendar = new swCalendarBetween("#calendar", {',
        '    values: [',
        `        new Date('${config.values[0].toISOString().split('T')[0]}'),`,
        `        new Date('${config.values[1].toISOString().split('T')[0]}')`,
        '    ],',
    ]

    if (config.min) {
        lines.push(
            `    min: new Date('${config.min.toISOString().split('T')[0]}'),`
        )
    }
    if (config.max) {
        lines.push(
            `    max: new Date('${config.max.toISOString().split('T')[0]}'),`
        )
    }

    lines.push(
        `    lang: '${config.lang}',`,
        `    year: '${config.year}',`,
        `    style: ${JSON.stringify(config.style, null, 8)},`,
        '    nextDate: ([start, end]: Date[]) => {',
        '        console.log("Range:", { start, end })',
        '    },',
        '    nextMonth: (date: Date) => {',
        '        console.log("Next month:", date)',
        '    }',
        '})',
        '',
        'calendar.render()'
    )

    return lines.join('\n')
})
</script>

<template>
    <BcLayout
        title="ADC Calendar Library"
        subtitle="Library สำหรับสร้าง Calendar สนับสนุนภาษาไทย และรองรับการเลือกวันที่เดี่ยวหรือช่วงวันที่"
        icon="CalendarDays"
    >
        <!-- Installation -->
        <section
            class="bg-white rounded-xl shadow-lg p-6 mb-8"
            id="getting-started"
        >
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="Star" size="24" color="primary" />
                <h2 class="text-xl font-semibold">Getting Started</h2>
            </div>

            <p class="text-slate-600">
                ADC Calendar เป็น Library สำหรับสร้าง Calendar
                ที่สามารถเลือกวันที่เดี่ยวหรือช่วงวันที่ได้
                โดยรองรับภาษาไทยและภาษาอังกฤษ
            </p>

            <div class="space-y-4 mt-4">
                <!-- Installation Code -->
                <div
                    class="bg-slate-800 rounded-lg flex justify-between items-center pr-4 py-1"
                >
                    <pre class="text-white"><code>{{ installCode }}</code></pre>
                    <BcButton
                        @click="copyCode(installCode)"
                        variant="white"
                        icon="Copy"
                        size="sm"
                    >
                    </BcButton>
                </div>

                <!-- Import Code -->
                <div
                    class="bg-slate-800 rounded-lg flex justify-between items-center pr-4 py-1"
                >
                    <pre class="text-white"><code>{{ importCode }}</code></pre>
                    <BcButton
                        @click="copyCode(importCode)"
                        variant="white"
                        icon="Copy"
                        size="sm"
                    >
                    </BcButton>
                </div>
            </div>
        </section>
        <!-- Props Table -->
        <!-- Props Table -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8" id="props">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="ListFilter" size="24" color="primary" />
                <h2 class="text-xl font-semibold">Props ที่รองรับ</h2>
            </div>

            <div class="grid gap-4">
                <!-- Desktop View -->
                <table class="hidden lg:table w-full border-collapse">
                    <thead class="bg-slate-800">
                        <tr>
                            <th
                                class="py-3 px-4 text-left text-white font-medium w-[140px]"
                            >
                                Prop
                            </th>
                            <th
                                class="py-3 px-4 text-left text-white font-medium w-[200px]"
                            >
                                Type
                            </th>
                            <th
                                class="py-3 px-4 text-left text-white font-medium w-[140px]"
                            >
                                Default
                            </th>
                            <th
                                class="py-3 px-4 text-left text-white font-medium"
                            >
                                คำอธิบาย
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200">
                        <tr
                            v-for="prop in propsData"
                            :key="prop.prop"
                            class="hover:bg-slate-50"
                        >
                            <td class="py-3 px-4 font-mono text-sm">
                                {{ prop.prop }}
                            </td>
                            <td
                                class="py-3 px-4 text-blue-600 font-mono text-sm break-words"
                            >
                                {{ prop.type }}
                            </td>
                            <td class="py-3 px-4 text-sm break-words">
                                {{ prop.default }}
                            </td>
                            <td class="py-3 px-4 text-sm">
                                {{ prop.description }}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- Mobile/Tablet View -->
                <div class="lg:hidden space-y-6">
                    <div
                        v-for="prop in propsData"
                        :key="prop.prop"
                        class="bg-slate-50 p-4 rounded-lg space-y-3"
                    >
                        <div class="flex items-center justify-between">
                            <span class="font-mono text-sm font-semibold">{{
                                prop.prop
                            }}</span>
                            <span class="text-sm text-slate-500">{{
                                prop.default
                            }}</span>
                        </div>
                        <div
                            class="text-blue-600 font-mono text-sm break-words"
                        >
                            {{ prop.type }}
                        </div>
                        <div class="text-sm text-slate-600">
                            {{ prop.description }}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Interactive Playground -->
        <section
            class="bg-white rounded-xl shadow-lg p-6 mb-8"
            id="interactive-playground"
        >
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="PenTool" size="24" color="primary" />
                <h2 class="text-xl font-semibold">Interactive Playground</h2>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Single Calendar -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold">Single Calendar</h3>
                    <div class="bg-slate-50 p-4 rounded-lg">
                        <div id="playground-single"></div>
                    </div>

                    <!-- Controls -->
                    <div class="space-y-4">
                        <!-- Language -->
                        <BcSelect
                            id="lang"
                            label="ภาษา"
                            :items="[
                                { value: 'thai', label: 'ภาษาไทย เต็ม' },
                                { value: 'english', label: 'English เต็ม' },
                                { value: 'th', label: 'ภาษาไทย ย่อ' },
                                { value: 'en', label: 'English ย่อ' },
                            ]"
                            :dataValue="playgroundState.single.lang"
                            :reduceValue="(item) => item.value"
                            :reduceLabel="(item) => item.label"
                            @selected="
                                (item) => {
                                    playgroundState.single.lang = item.value as 'thai' | 'english'
                                    reRenderCalendar('single')
                                }
                            "
                        />

                        <!-- Year Format -->
                        <BcSelect
                            id="year"
                            label="รูปแบบปี"
                            :items="[
                                { value: 'th', label: 'พ.ศ.' },
                                { value: 'en', label: 'ค.ศ.' },
                            ]"
                            :dataValue="playgroundState.single.year"
                            :reduceValue="(item) => item.value"
                            :reduceLabel="(item) => item.label"
                            @selected="
                                (item) => {
                                    playgroundState.single.year = item.value as 'th' | 'en'
                                    reRenderCalendar('single')
                                }
                            "
                        />

                        <!-- Style Controls -->
                        <div class="bg-slate-50 rounded-lg p-4 space-y-4">
                            <div class="flex items-center justify-between">
                                <h4 class="font-medium">ปรับแต่งสไตล์</h4>
                                <BcButton
                                    variant="outline"
                                    size="sm"
                                    icon="XCircle"
                                    @click="resetStyles('single')"
                                >
                                    รีเซ็ต
                                </BcButton>
                            </div>

                            <div class="grid grid-cols-1 gap-4">
                                <template
                                    v-for="control in styleControls"
                                    :key="control.key"
                                >
                                    <div class="space-y-2">
                                        <label
                                            class="text-sm font-medium text-slate-700"
                                        >
                                            {{ control.label }}
                                        </label>

                                        <!-- Color Input -->
                                        <template
                                            v-if="control.type === 'color'"
                                        >
                                            <div class="flex gap-2">
                                                <input
                                                    type="color"
                                                    :value="
                                                        playgroundState.single
                                                            .style[control.key as keyof StyleProperties]
                                                    "
                                                    @input="(e) => updateStyle('single', control.key as keyof StyleProperties, (e.target as HTMLInputElement).value)"
                                                    class="w-8 h-8 rounded border"
                                                />
                                                <input
                                                    readonly
                                                    type="text"
                                                    :value="
                                                        playgroundState.single
                                                            .style[control.key as keyof StyleProperties]
                                                    "
                                                    @input="(e) => updateStyle('single', control.key as keyof StyleProperties, (e.target as HTMLInputElement).value)"
                                                    class="flex-1 px-2 py-1 border rounded"
                                                />
                                            </div>
                                        </template>

                                        <!-- Select Input -->
                                        <select
                                            v-else-if="
                                                control.type === 'select'
                                            "
                                            :value="
                                                playgroundState.single.style[
                                                    control.key as keyof StyleProperties
                                                ]
                                            "
                                            @change="(e) => updateStyle('single', control.key as keyof StyleProperties, (e.target as HTMLSelectElement).value)"
                                            class="w-full px-2 py-1 border rounded bg-white"
                                        >
                                            <option
                                                v-for="option in control.options"
                                                :key="option.value"
                                                :value="option.value"
                                            >
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </div>
                                </template>
                            </div>
                        </div>

                        <!-- Date Range Controls -->
                        <BcCalendar
                            id="min"
                            calendar-id="playground-single-min"
                            label="วันที่ต่ำสุด"
                            :dataValue="
                                playgroundState.single.min
                                    ? playgroundState.single.min
                                          .toISOString()
                                          .split('T')[0]
                                    : null
                            "
                            @input="
                                (date) => {
                                    playgroundState.single.min = date
                                        ? new Date(date)
                                        : undefined
                                    reRenderCalendar('single')
                                }
                            "
                            isClear
                        />

                        <BcCalendar
                            id="max"
                            calendar-id="playground-single-max"
                            label="วันที่สูงสุด"
                            :dataValue="
                                playgroundState.single.max
                                    ? playgroundState.single.max
                                          .toISOString()
                                          .split('T')[0]
                                    : null
                            "
                            @input="
                                (date) => {
                                    playgroundState.single.max = date
                                        ? new Date(date)
                                        : undefined
                                    reRenderCalendar('single')
                                }
                            "
                            isClear
                        />
                    </div>

                    <!-- Code Preview -->
                    <div class="bg-slate-800 rounded-lg p-4">
                        <div class="flex justify-end mb-2">
                            <BcButton
                                @click="copyCode(singlePlaygroundCode)"
                                variant="white"
                                icon="Copy"
                                size="sm"
                            >
                            </BcButton>
                        </div>
                        <pre
                            class="text-white"
                        ><code>{{ singlePlaygroundCode }}</code></pre>
                    </div>
                </div>

                <!-- Range Calendar -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold">Range Calendar</h3>
                    <div class="bg-slate-50 p-4 rounded-lg">
                        <div id="playground-range"></div>
                    </div>

                    <!-- Controls (Similar structure as Single Calendar) -->
                    <div class="space-y-4">
                        <!-- Language -->
                        <BcSelect
                            id="lang-range"
                            label="ภาษา"
                            :items="[
                                { value: 'thai', label: 'ภาษาไทย เต็ม' },
                                { value: 'english', label: 'English เต็ม' },
                                { value: 'th', label: 'ภาษาไทย ย่อ' },
                                { value: 'en', label: 'English ย่อ' },
                            ]"
                            :dataValue="playgroundState.range.lang"
                            :reduceValue="(item) => item.value"
                            :reduceLabel="(item) => item.label"
                            @selected="
                                (item) => {
                                    playgroundState.range.lang = item.value as 'thai' | 'english'
                                    reRenderCalendar('range')
                                }
                            "
                        />

                        <!-- Year Format -->
                        <BcSelect
                            id="year-range"
                            label="รูปแบบปี"
                            :items="[
                                { value: 'th', label: 'พ.ศ.' },
                                { value: 'en', label: 'ค.ศ.' },
                            ]"
                            :dataValue="playgroundState.range.year"
                            :reduceValue="(item) => item.value"
                            :reduceLabel="(item) => item.label"
                            @selected="
                                (item) => {
                                    playgroundState.range.year = item.value as 'th' | 'en'
                                    reRenderCalendar('range')
                                }
                            "
                        />

                        <!-- Style Controls -->
                        <div class="bg-slate-50 rounded-lg p-4 space-y-4">
                            <div class="flex items-center justify-between">
                                <h4 class="font-medium">ปรับแต่งสไตล์</h4>
                                <BcButton
                                    variant="outline"
                                    size="sm"
                                    icon="CircleX"
                                    @click="resetStyles('range')"
                                >
                                    รีเซ็ต
                                </BcButton>
                            </div>

                            <div class="grid grid-cols-1 gap-4">
                                <template
                                    v-for="control in styleControls"
                                    :key="control.key"
                                >
                                    <div class="space-y-2">
                                        <label
                                            class="text-sm font-medium text-slate-700"
                                        >
                                            {{ control.label }}
                                        </label>

                                        <!-- Color Input -->
                                        <template
                                            v-if="control.type === 'color'"
                                        >
                                            <div class="flex gap-2">
                                                <input
                                                    type="color"
                                                    :value="
                                                        playgroundState.range
                                                            .style[control.key as keyof StyleProperties]
                                                    "
                                                    @input="(e) => updateStyle('range', control.key as keyof StyleProperties, (e.target as HTMLInputElement).value)"
                                                    class="w-8 h-8 rounded border"
                                                />
                                                <input
                                                    readonly
                                                    type="text"
                                                    :value="
                                                        playgroundState.range
                                                            .style[control.key as keyof StyleProperties]
                                                    "
                                                    @input="(e) => updateStyle('range', control.key as keyof StyleProperties, (e.target as HTMLInputElement).value)"
                                                    class="flex-1 px-2 py-1 border rounded"
                                                />
                                            </div>
                                        </template>

                                        <!-- Select Input -->
                                        <select
                                            v-else-if="
                                                control.type === 'select'
                                            "
                                            :value="
                                                playgroundState.range.style[
                                                    control.key as keyof StyleProperties
                                                ]
                                            "
                                            @change="(e) => updateStyle('range', control.key as keyof StyleProperties, (e.target as HTMLSelectElement).value)"
                                            class="w-full px-2 py-1 border rounded bg-white"
                                        >
                                            <option
                                                v-for="option in control.options"
                                                :key="option.value"
                                                :value="option.value"
                                            >
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </div>
                                </template>
                            </div>
                        </div>

                        <!-- Date Range Controls -->
                        <BcCalendar
                            id="min-range"
                            calendar-id="playground-range-min"
                            label="วันที่ต่ำสุด"
                            :dataValue="
                                playgroundState.range.min
                                    ? playgroundState.range.min
                                          .toISOString()
                                          .split('T')[0]
                                    : null
                            "
                            @input="
                                (date) => {
                                    playgroundState.range.min = date
                                        ? new Date(date)
                                        : undefined
                                    reRenderCalendar('range')
                                }
                            "
                            isClear
                        />

                        <BcCalendar
                            id="max-range"
                            calendar-id="playground-range-max"
                            label="วันที่สูงสุด"
                            :dataValue="
                                playgroundState.range.max
                                    ? playgroundState.range.max
                                          .toISOString()
                                          .split('T')[0]
                                    : null
                            "
                            @input="
                                (date) => {
                                    playgroundState.range.max = date
                                        ? new Date(date)
                                        : undefined
                                    reRenderCalendar('range')
                                }
                            "
                            isClear
                        />
                    </div>

                    <!-- Code Preview -->
                    <div class="bg-slate-800 rounded-lg p-4">
                        <div class="flex justify-end mb-2">
                            <BcButton
                                @click="copyCode(rangePlaygroundCode)"
                                variant="white"
                                icon="Copy"
                                size="sm"
                            >
                            </BcButton>
                        </div>
                        <pre
                            class="text-white"
                        ><code>{{ rangePlaygroundCode }}</code></pre>
                    </div>
                </div>
            </div>
        </section>
        <!-- Examples -->
        <section class="space-y-6" id="examples">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="BookOpen" size="24" color="primary" />
                <h2 class="text-xl font-semibold">ตัวอย่างการใช้งาน</h2>
            </div>

            <div
                v-for="example in examples"
                :key="example.title"
                class="bg-white rounded-xl shadow-lg p-6"
            >
                <h3 class="text-lg font-semibold mb-3">{{ example.title }}</h3>
                <p class="text-slate-600 mb-4">{{ example.description }}</p>

                <!-- Code Example -->
                <div class="bg-slate-800 rounded-lg p-4 mb-6">
                    <div class="flex justify-end mb-2">
                        <BcButton
                            @click="copyCode(example.code)"
                            variant="white"
                            icon="Copy"
                            size="sm"
                        >
                        </BcButton>
                    </div>
                    <pre
                        class="text-white"
                    ><code>{{ example.code }}</code></pre>
                </div>
            </div>
        </section>

        <!-- Additional Documentation -->
        <section
            class="bg-white rounded-xl shadow-lg p-6 mt-8"
            id="additional-documentation"
        >
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="Info" size="24" color="primary" />
                <h2 class="text-xl font-semibold">คำแนะนำเพิ่มเติม</h2>
            </div>

            <div class="space-y-4">
                <!-- Do's -->
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 class="text-lg font-semibold mb-2 text-green-800">
                        แนวทางการใช้งานที่แนะนำ
                    </h3>
                    <ul class="list-disc list-inside space-y-2 text-green-700">
                        <li>
                            ใช้ฟังก์ชัน nextDate
                            เพื่อจัดการเมื่อมีการเลือกวันที่
                        </li>
                        <li>
                            กำหนด min/max date เพื่อจำกัดช่วงวันที่ที่เลือกได้
                        </li>
                        <li>เรียก stop() เมื่อไม่ได้ใช้งาน calendar แล้ว</li>
                        <li>
                            ระบุ id ที่ไม่ซ้ำกันสำหรับแต่ละ calendar instance
                        </li>
                    </ul>
                </div>

                <!-- Don'ts -->
                <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 class="text-lg font-semibold mb-2 text-red-800">
                        ข้อควรระวัง
                    </h3>
                    <ul class="list-disc list-inside space-y-2 text-red-700">
                        <li>หลีกเลี่ยงการสร้าง instance ใหม่โดยไม่จำเป็น</li>
                        <li>อย่าลืมเรียก stop() เมื่อต้องการทำลาย instance</li>
                        <li>ระวังการกำหนด min/max date ที่ขัดแย้งกัน</li>
                        <li>ไม่ควรใช้ id ซ้ำกันในหน้าเดียวกัน</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Type System -->
        <!-- Type System Section -->
        <section
            class="bg-white rounded-xl shadow-lg p-6 mt-8"
            id="type-system"
        >
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="FileCode" size="24" color="primary" />
                <h2 class="text-xl font-semibold">Type System</h2>
            </div>

            <div class="space-y-6">
                <template
                    v-for="type in typeSystemExamples"
                    :key="type.category"
                >
                    <div class="bg-slate-50 rounded-lg p-4">
                        <h3 class="text-lg font-semibold mb-2">
                            {{ type.category }}
                        </h3>
                        <p class="text-slate-600 mb-4">
                            {{ type.description }}
                        </p>

                        <div class="bg-slate-800 rounded-lg p-4">
                            <div class="flex justify-end mb-2">
                                <BcButton
                                    @click="copyCode(type.code)"
                                    variant="white"
                                    icon="Copy"
                                    size="sm"
                                >
                                </BcButton>
                            </div>
                            <pre
                                class="text-slate-200"
                            ><code>{{ type.code }}</code></pre>
                        </div>
                    </div>
                </template>
            </div>
        </section>
    </BcLayout>
</template>

<style scoped>
pre {
    white-space: pre-wrap;
    word-wrap: break-word;
}

code {
    font-family: ui-monospace, monospace;
}

input[type='color'] {
    -webkit-appearance: none;
    appearance: none;
    padding: 0;
}

input[type='color']::-webkit-color-swatch-wrapper {
    padding: 0;
}

input[type='color']::-webkit-color-swatch {
    border: none;
    border-radius: 4px;
}

select {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

:deep([calendar='root']) {
    --background: white;
    --picker: var(--primary);
    --text-picker: white;
    --current: var(--secondary);
    --text-current: white;
    --text: var(--color);
    --text-week: #1e293b;
    --dateRadius: 3rem;
    --borderRadius: 0.75rem;
    --border: none;
    --width: 300px;
    --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

/* Color Picker styling */
input[type='color'] {
    height: 32px;
    border-radius: 4px;
    cursor: pointer;
}

/* Input focus styles */
input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px var(--primary, rgba(0, 0, 0, 0.5));
}

/* Select focus styles */
select:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px var(--primary);
}

/* Smooth transitions */
.calendar-transition {
    transition: all 0.2s ease-in-out;
}

/* Interactive hover effects */
.interactive-hover:hover {
    background-color: var(--hover-bg, rgba(0, 0, 0, 0.05));
}

/* Code block styles */
.code-block {
    font-size: 0.875rem;
    line-height: 1.25rem;
}

/* Calendar container specific styles */
[calendar='root'] {
    font-family: var(--font-family) !important;
}

/* Control panel styles */
.control-panel {
    border-radius: 0.75rem;
    background-color: var(--bg-panel, white);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .responsive-grid {
        grid-template-columns: 1fr;
    }
}

/* Animation for color changes */
.color-transition {
    transition: background-color 0.3s ease, color 0.3s ease,
        border-color 0.3s ease;
}
</style>
