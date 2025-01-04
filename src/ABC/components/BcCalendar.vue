<script setup lang="ts">
import type { PropsInput } from '@/ABC/bc-types'
import BcForm from '@/ABC/components/BcForm.vue'
import { swCalendar } from 'adc-calendar'
import { dateToCombine } from 'adc-directive'
import { computed, onMounted, ref } from 'vue'

type PropsBcCalendar = Omit<PropsInput, 'dataValue'> & {
    /**
     * Selected date value in string format
     */
    dataValue: string | null
    /**
     * Minimum selectable date
     */
    minDate?: Date
    /**
     * Maximum selectable date
     */
    maxDate?: Date
    /**
     * Calendar ID for DOM reference
     * @default 'bc-calendar'
     * @Param calendarId ใช้สำหรับกำหนด id ของ calendar ที่จะใช้ในการ render ในกรณีที่มีหลาย calendar ในหน้าเดียวกัน
     */
    calendarId?: string
    /**
     * Calendar position style
     * @default 'absolute'
     */
    position?: 'absolute' | 'relative'
}

type CalendarEmits = {
    (e: 'input', date: string | null): void
    (e: 'focus'): void
    (e: 'blur'): void
}

const props = withDefaults(defineProps<PropsBcCalendar>(), {
    calendarId: 'bc-calendar',
    position: 'absolute',
    icon: 'CalendarDays',
    isClear: true,
})

const emit = defineEmits<CalendarEmits>()

// State
const calendarRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const calendar = ref<swCalendar | null>(null)
const dataForSubmit = ref<string | null>(null)

// Computed
const displayValue = computed((): string => {
    const dateValue = dataForSubmit.value || props.dataValue
    if (!dateValue) return ''

    const date = new Date(dateValue)
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    })
})

const containerClasses = computed(() => ({
    'bc-calendar': true,
    'bc-calendar--open': isOpen.value,
    [`bc-calendar--${props.position}`]: true,
}))

// Methods
const initializeCalendar = (): void => {
    calendar.value = new swCalendar(`#${props.calendarId}`, {
        value: props.dataValue ? new Date(props.dataValue) : new Date(),
        min: props.minDate,
        max: props.maxDate,
        lang: 'thai',
        year: 'th',
        nextDate: (res: Date) => {
            const { valueOfDate } = dateToCombine(res)
            emit('input', valueOfDate)
            dataForSubmit.value = valueOfDate
            closeCalendar()
        },
    })
}

const toggleCalendar = (): void => {
    if (isOpen.value) {
        closeCalendar()
    } else {
        openCalendar()
    }
}

const openCalendar = (): void => {
    if (props.disabled) return
    calendar.value?.render()
    isOpen.value = true
    emit('focus')
}

const closeCalendar = (): void => {
    calendar.value?.stop()
    isOpen.value = false
    emit('blur')
}

const handleClear = (): void => {
    emit('input', null)
    dataForSubmit.value = null
    closeCalendar()
}

// Lifecycle hooks
onMounted(() => {
    initializeCalendar()
})
</script>

<template>
    <div ref="calendarRef" class="relative">
        <BcForm v-bind="props" :data-value="displayValue" @clear="handleClear">
            <input
                :id="id"
                readonly
                :value="displayValue"
                class="w-full disabled:bg-[#F9FAFB] cursor-pointer !left-4"
                :class="{ '!pl-9': icon }"
                :placeholder="placeholder"
                :disabled="disabled"
                @click="toggleCalendar"
                :data-cy="id"
            />
        </BcForm>

        <div v-show="isOpen" :class="containerClasses" :aria-details="position">
            <div :id="calendarId"></div>
        </div>
    </div>
</template>

<style scoped>
.bc-calendar {
    min-width: 300px;
    max-width: 320px;
    position: relative;
    z-index: 10;
    background-color: white;
    border-radius: var(--borderRadius);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.bc-calendar--absolute {
    position: absolute;
    top: calc(100% + 4px);
}

.bc-calendar--relative {
    position: relative;
    margin-top: 0.5rem;
}
</style>
