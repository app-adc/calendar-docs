<script setup lang="ts">
import BcButton from '@/ABC/components/BcButton.vue'
import BcCalendar from '@/ABC/components/BcCalendar.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcSelect from '@/ABC/components/BcSelect.vue'
import BcLayout from '@/ABC/pages/bc_doc_layout.vue'
import { swCalendar, swCalendarBetween } from 'adc-calendar'
import { computed, onMounted, onUnmounted, ref } from 'vue'

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
        type: '"thai" | "english"',
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
]

// สถานะสำหรับ Interactive Playground
const playgroundState = ref({
    single: {
        value: new Date(),
        min: undefined as Date | undefined,
        max: undefined as Date | undefined,
        lang: 'thai' as 'thai' | 'english',
        year: 'th' as 'th' | 'en',
    },
    range: {
        values: [new Date(), new Date()] as [Date, Date],
        min: undefined as Date | undefined,
        max: undefined as Date | undefined,
        lang: 'thai' as 'thai' | 'english',
        year: 'th' as 'th' | 'en',
    },
})

// สร้างโค้ดตัวอย่างจากการตั้งค่าปัจจุบัน - Single Calendar
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
        '    nextDate: (date: Date) => {',
        '        console.log("Selected:", date)',
        '    }',
        '})',
        '',
        'calendar.render()'
    )

    return lines.join('\n')
})

// สร้างโค้ดตัวอย่างจากการตั้งค่าปัจจุบัน - Range Calendar
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
        '    nextDate: ([start, end]: Date[]) => {',
        '        console.log("Range:", { start, end })',
        '    }',
        '})',
        '',
        'calendar.render()'
    )

    return lines.join('\n')
})

// ตัวอย่างการใช้งาน
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
})`,
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
        console.log('Range:', { start, end })
    }
})`,
    },
    {
        title: 'การกำหนดขอบเขตวันที่',
        description: 'การกำหนดวันที่ต่ำสุดและสูงสุดที่เลือกได้',
        code: `const calendar = new swCalendar('#calendar', {
    value: new Date(),
    min: new Date('2024-01-01'),  // วันที่ต่ำสุด
    max: new Date('2024-12-31'),  // วันที่สูงสุด
    nextDate: (date: Date) => {
        console.log('Selected:', date)
    }
})`,
    },
]

// Calendar instances สำหรับ Interactive Playground
let singleCalendar: swCalendar | null = null
let rangeCalendar: swCalendarBetween | null = null

// สร้าง calendar instances เมื่อ component mount
onMounted(() => {
    singleCalendar = new swCalendar('#playground-single', {
        ...playgroundState.value.single,
        nextDate: (date: Date) => {
            playgroundState.value.single.value = date
        },
    })

    rangeCalendar = new swCalendarBetween('#playground-range', {
        ...playgroundState.value.range,
        nextDate: ([start, end]: Date[]) => {
            playgroundState.value.range.values = [start, end]
        },
    })

    singleCalendar?.render()
    rangeCalendar.render()
})

// ทำความสะอาด instances เมื่อ component unmount
onUnmounted(() => {
    singleCalendar?.stop()
    rangeCalendar?.stop()
})

// คัดลอกโค้ด
const copyCode = async (code: string) => {
    try {
        await navigator.clipboard.writeText(code)
    } catch (err) {
        console.error('Failed to copy:', err)
    }
}

// Re-render calendar เมื่อมีการเปลี่ยนค่า
const reRenderCalendar = (type: 'single' | 'range') => {
    if (type === 'single') {
        // สร้าง instance ใหม่
        singleCalendar = new swCalendar('#playground-single', {
            ...playgroundState.value.single,
            value: playgroundState.value.single.min
                ? playgroundState.value.single.min
                : playgroundState.value.single.value,
            nextDate: (date: Date) => {
                playgroundState.value.single.value = date
            },
        })
        setTimeout(() => {
            singleCalendar?.render()
        }, 1)
    } else {
        // สร้าง instance ใหม่
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
        })
        setTimeout(() => {
            rangeCalendar?.render()
        }, 1)
    }
}
</script>

<template>
    <BcLayout
        title="ADC Calendar Library"
        subtitle="Library สำหรับสร้าง Calendar สนับสนุนภาษาไทย และรองรับการเลือกวันที่เดี่ยวหรือช่วงวันที่"
        icon="CalendarDays"
    >
        <!-- getting-started -->
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
                <h3 class="text-lg font-semibold">Installation</h3>
                <pre
                    class="bg-slate-800 rounded-lg p-4 text-white"
                ><code>npm install adc-calendar</code></pre>

                <h3 class="text-lg font-semibold">Usage</h3>
                <pre
                    class="bg-slate-800 rounded-lg p-4 text-white"
                ><code>import { swCalendar, swCalendarBetween } from 'adc-calendar'</code></pre>
            </div>
        </section>
        <!-- Props Table -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8" id="props">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="ListFilter" size="24" color="primary" />
                <h2 class="text-xl font-semibold">Props ที่รองรับ</h2>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-slate-800 text-white">
                            <th class="border p-2 text-left">Prop</th>
                            <th class="border p-2 text-left">Type</th>
                            <th class="border p-2 text-left">Default</th>
                            <th class="border p-2 text-left">คำอธิบาย</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="prop in propsData" :key="prop.prop">
                            <td class="border p-2 font-mono">
                                {{ prop.prop }}
                            </td>
                            <td class="border p-2 text-blue-600">
                                {{ prop.type }}
                            </td>
                            <td class="border p-2">{{ prop.default }}</td>
                            <td class="border p-2">{{ prop.description }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Interactive Playground -->
        <section
            class="bg-white rounded-xl shadow-lg p-6 mb-8"
            id="interactive-playground"
        >
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="PenTool" size="24" color="primary" />
                <div>
                    <h2 class="text-xl font-semibold">
                        Interactive Playground
                    </h2>
                    <p class="text-sm text-slate-600 mt-1">
                        ทดลองปรับแต่งค่าต่างๆ ของ Calendar
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Single Calendar -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold">Single Calendar</h3>

                    <!-- Preview -->
                    <div class="bg-slate-50 p-4 rounded-lg">
                        <div id="playground-single"></div>
                    </div>

                    <!-- Controls -->
                    <div class="space-y-4">
                        <BcSelect
                            id="lang"
                            label="ภาษา"
                            :items="[
                                { value: 'thai', label: 'ภาษาไทย' },
                                { value: 'english', label: 'English' },
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

                        <BcCalendar
                            id="min"
                            calendar-id="playground-single-min"
                            label="วันที่ต่ำสุด"
                            :dataValue="
                                playgroundState.single.min
                                    ? playgroundState.single.min
                                          .toISOString()
                                          .split('T')[0]
                                    : ''
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
                                    : ''
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
                                คัดลอกโค้ด
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

                    <!-- Preview -->
                    <div class="bg-slate-50 p-4 rounded-lg">
                        <div id="playground-range"></div>
                    </div>
                    <!-- Controls -->
                    <div class="space-y-4">
                        <BcSelect
                            id="lang"
                            label="ภาษา"
                            :items="[
                                { value: 'thai', label: 'ภาษาไทย' },
                                { value: 'english', label: 'English' },
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

                        <BcSelect
                            id="year"
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

                        <BcCalendar
                            id="min-range"
                            calendar-id="playground-range-min"
                            label="วันที่ต่ำสุด"
                            :dataValue="
                                playgroundState.range.min
                                    ? playgroundState.range.min
                                          .toISOString()
                                          .split('T')[0]
                                    : ''
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
                                    : ''
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
                                คัดลอกโค้ด
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
                            คัดลอกโค้ด
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
        <section
            class="bg-white rounded-xl shadow-lg p-6 mt-8"
            id="type-system"
        >
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="FileCode" size="24" color="primary" />
                <h2 class="text-xl font-semibold">Type System</h2>
            </div>

            <div class="space-y-4">
                <!-- Config Type -->
                <div class="bg-slate-800 rounded-lg p-4">
                    <h3 class="text-lg font-semibold text-white mb-2">
                        Calendar Config
                    </h3>
                    <pre class="text-slate-200"><code>type CalendarConfig = {
    value: Date                  // สำหรับ swCalendar
    values?: [Date, Date]        // สำหรับ swCalendarBetween
    min?: Date | null            // วันที่ต่ำสุด
    max?: Date | null            // วันที่สูงสุด
    lang: 'thai' | 'english'     // ภาษา
    year: 'th' | 'en'           // รูปแบบปี
    nextDate: (date: Date) => void  // callback เมื่อเลือกวันที่
}</code></pre>
                </div>

                <!-- Method Types -->
                <div class="bg-slate-800 rounded-lg p-4">
                    <h3 class="text-lg font-semibold text-white mb-2">
                        Available Methods
                    </h3>
                    <pre
                        class="text-slate-200"
                    ><code>interface CalendarMethods {
    render(): void               // แสดง calendar
    stop(): void                // ทำลาย instance
    getValue(): Date            // รับค่าวันที่ปัจจุบัน
    setValue(date: Date): void  // กำหนดค่าวันที่
}</code></pre>
                </div>
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

.list-disc {
    list-style-type: disc;
    padding-left: 1rem;
}

/* Calendar container styling */
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
</style>
