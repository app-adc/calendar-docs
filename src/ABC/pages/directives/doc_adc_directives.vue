<script setup lang="ts">
import BcButton from '@/ABC/components/BcButton.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcInput from '@/ABC/components/BcInput.vue'
import BcLayout from '@/ABC/pages/bc_doc_layout.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
onMounted(() => {
    handleExampleChange('toCombineText')
})

// สำหรับ Interactive Playground
type ExampleKey = keyof typeof examples
const selectedExample = ref<ExampleKey>('toCombineText')
const codeInput = ref('')

// ตัวอย่างโค้ดสำหรับ playground
// ตัวอย่างโค้ดสำหรับ playground
const examples = {
    // Array Utilities
    mapArray: {
        template: `import { mapArray } from 'adc-directive'

const result = mapArray([1, [2, 3, [4, 5, [6]]]])
// Expected: [1, 2, 3, 4, 5, 6]`,
        description: 'แปลง nested array ให้เป็น flat array',
    },

    chunkArray: {
        template: `import { chunkArray } from 'adc-directive'

const result = chunkArray([1, 2, 3, 4, 5], 2)
// Expected: [[1,2], [3,4], [5]]`,
        description: 'แบ่ง array เป็นชุดตามจำนวนที่กำหนด',
    },

    toChangePositionArray: {
        template: `import { toChangePositionArray } from 'adc-directive'

const array = ['A', 'B', 'C']
const result = toChangePositionArray(array)
// Expected: ['C', 'A', 'B'] (สุ่มตำแหน่ง)`,
        description: 'สลับตำแหน่งข้อมูลใน array แบบสุ่ม',
    },

    // String Utilities
    toCombineText: {
        template: `import { toCombineText } from 'adc-directive'

const result = toCombineText(['a', 'b', null, 'c'], '_')
// Expected: 'a_b_c'`,
        description: 'รวม array เป็น string ด้วยตัวคั่นที่กำหนด',
    },

    toHasKey: {
        template: `import { toHasKey } from 'adc-directive'

const result = toHasKey('19-55 77_88*99 aBC')
// Expected: '195577_8899abc'`,
        description: 'ลบอักขระพิเศษและช่องว่าง เหมาะสำหรับใช้เป็น key',
    },

    toRegExp: {
        template: `import { toRegExp } from 'adc-directive'

const pattern = toRegExp(['th', 'en', 'number'], 'g')
// Expected: RegExp ที่รวม patterns สำหรับภาษาไทย, อังกฤษ และตัวเลข`,
        description: 'สร้าง RegExp จาก patterns ที่กำหนด',
    },

    toReplaceTextByRegExp: {
        template: `import { toReplaceTextByRegExp } from 'adc-directive'

const text = 'Hello123World!'
const result = toReplaceTextByRegExp(text, ['en', 'number'])
// Expected: 'Hello123World'`,
        description: 'แทนที่ข้อความด้วย RegExp pattern',
    },

    // Number Utilities
    toNumber: {
        template: `import { toNumber } from 'adc-directive'

const result1 = toNumber('123')    // Expected: 123
const result2 = toNumber('abc')    // Expected: 0
const result3 = toNumber(null)     // Expected: 0`,
        description: 'แปลงค่าเป็นตัวเลข',
    },

    toCurrency: {
        template: `import { toCurrency } from 'adc-directive'

const result = toCurrency(1234567.89, 2)
// Expected: '1,234,567.89'`,
        description: 'จัดรูปแบบตัวเลขให้อยู่ในรูปแบบเงิน',
    },

    toRandomNumber: {
        template: `import { toRandomNumber } from 'adc-directive'

const result = toRandomNumber(1, 100)
// Expected: random number between 1-100`,
        description: 'สุ่มตัวเลขในช่วงที่กำหนด',
    },

    toNumberByAverage: {
        template: `import { toNumberByAverage } from 'adc-directive'

const items = [
  { value: 10 }, { value: 20 }, { value: 30 }
]
const result = toNumberByAverage(items, item => item.value)
// Expected: 20`,
        description: 'คำนวณค่าเฉลี่ยจาก array of objects',
    },

    toNumberByMax: {
        template: `import { toNumberByMax } from 'adc-directive'

const items = [
  { value: 10 }, { value: 20 }, { value: 30 }
]
const result = toNumberByMax(items, item => item.value)
// Expected: 30`,
        description: 'หาค่าสูงสุดจาก array of objects',
    },

    toNumberByMin: {
        template: `import { toNumberByMin } from 'adc-directive'

const items = [
  { value: 10 }, { value: 20 }, { value: 30 }
]
const result = toNumberByMin(items, item => item.value)
// Expected: 10`,
        description: 'หาค่าต่ำสุดจาก array of objects',
    },

    toNumberBySum: {
        template: `import { toNumberBySum } from 'adc-directive'

const items = [
  { value: 10 },
  { value: 20 },
  { value: 30 }
]
const result = toNumberBySum(items, item => item.value)
// Expected: 60`,
        description: 'คำนวณผลรวมจาก property ใน array of objects',
    },

    // Date Utilities
    dateDiff: {
        template: `import { dateDiff } from 'adc-directive'

const result = dateDiff(new Date('2024-01-01'), new Date('2024-01-15'))
/* Expected: {
  days: 14,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 1209600000
} */`,
        description: 'คำนวณความต่างระหว่างวันที่',
    },

    dateDiffToString: {
        template: `import { dateDiffToString } from 'adc-directive'

const result = dateDiffToString(
  new Date('2024-01-01'),
  new Date('2024-02-01'),
  'th'
)
// Expected: '1 เดือนที่แล้ว'`,
        description: 'แสดงความต่างของวันที่ในรูปแบบข้อความ',
    },

    dateToCombine: {
        template: `import { dateToCombine } from 'adc-directive'

const result = dateToCombine(new Date('2024-01-01'))
/* Expected: {
  valueOfDate: '2024-01-01',
  valueOfTime: '00:00:00',
  valueOfValue: '2024-01-01 00:00:00',
  th: '1 มกราคม 2567'
} */`,
        description: 'แปลงวันที่เป็นรูปแบบต่างๆ',
    },

    // Date Manipulation
    addDate: {
        template: `import { addDate } from 'adc-directive'

const result = addDate(new Date('2024-01-01'), 7)
// Expected: 2024-01-08`,
        description: 'เพิ่มหรือลดจำนวนวัน',
    },

    addMonth: {
        template: `import { addMonth } from 'adc-directive'

const result = addMonth(new Date('2024-01-01'), 2)
// Expected: 2024-03-01`,
        description: 'เพิ่มหรือลดจำนวนเดือน',
    },

    addHour: {
        template: `import { addHour } from 'adc-directive'

const result = addHour(new Date('2024-01-01 10:00'), 3)
// Expected: 2024-01-01 13:00`,
        description: 'เพิ่มหรือลดจำนวนชั่วโมง',
    },

    addMinute: {
        template: `import { addMinute } from 'adc-directive'

const result = addMinute(new Date('2024-01-01 10:00'), 30)
// Expected: 2024-01-01 10:30`,
        description: 'เพิ่มหรือลดจำนวนนาที',
    },

    // Object Utilities
    mergeObject: {
        template: `import { mergeObject } from 'adc-directive'

const obj1 = { a: 1, b: { c: 2 } }
const obj2 = { b: { d: 3 }, e: 4 }
const result = mergeObject(obj1, obj2)
// Expected: { a: 1, b: { c: 2, d: 3 }, e: 4 }`,
        description: 'รวม object หลายตัวเข้าด้วยกันแบบ deep merge',
    },

    findObjectByKey: {
        template: `import { findObjectByKey } from 'adc-directive'

const obj = { user: { profile: { name: 'John' } } }
const exists = findObjectByKey(obj, ['user.profile.name'])
// Expected: true`,
        description: 'ค้นหา key ใน object แบบ nested',
    },

    createObj: {
        template: `import { createObj } from 'adc-directive'

const obj = { user: { profile: { name: 'John' } } }
const result = createObj(obj, 'user.profile')
// Expected: { user: { profile: { name: 'John' } } }`,
        description: 'สร้าง object จาก path',
    },

    selectObject: {
        template: `import { selectObject } from 'adc-directive'

const obj = { id: 1, name: 'John', age: 30 }
const result = selectObject(obj, ['id', 'name'])
// Expected: { id: 1, name: 'John' }`,
        description: 'เลือกเฉพาะบาง keys จาก object',
    },

    checkNestedValue: {
        template: `import { checkNestedValue } from 'adc-directive'

const data = {
  user: {
    profile: {
      name: 'John',
      hobbies: ['reading', 'gaming']
    }
  }
}

const result = checkNestedValue(data, {
  'user.profile.name': 'John',
  'user.profile.hobbies': ['reading', 'gaming']
})
// Expected: true`,
        description: 'ตรวจสอบค่าใน nested object อย่างละเอียด',
    },

    mapToKeys: {
        template: `import { mapToKeys } from 'adc-directive'

const result = mapToKeys('profile.name.colors[2].length')
// Expected: ['profile', 'name', 'colors', '2', 'length']`,
        description: 'แปลง path string เป็น array ของ keys',
    },

    // Payload Utilities
    payloadByMax: {
        template: `import { payloadByMax } from 'adc-directive'

const items = [
  { id: 1, value: 100 },
  { id: 2, value: 200 },
  { id: 3, value: 150 }
]
const result = payloadByMax(items, item => item.value)
// Expected: { id: 2, value: 200 }`,
        description: 'หา object ที่มีค่ามากที่สุดตาม property ที่กำหนด',
    },

    payloadByMin: {
        template: `import { payloadByMin } from 'adc-directive'

const items = [
  { id: 1, value: 100 },
  { id: 2, value: 200 },
  { id: 3, value: 150 }
]
const result = payloadByMin(items, item => item.value)
// Expected: { id: 1, value: 100 }`,
        description: 'หา object ที่มีค่าน้อยที่สุดตาม property ที่กำหนด',
    },

    toPayloadByGroup: {
        template: `import { toPayloadByGroup } from 'adc-directive'

const items = [
  { category: 'A', value: 1 },
  { category: 'B', value: 2 },
  { category: 'A', value: 3 }
]
const result = toPayloadByGroup(items, item => item.category)
/* Expected: {
  A: [{ category: 'A', value: 1 }, { category: 'A', value: 3 }],
  B: [{ category: 'B', value: 2 }]
} */`,
        description: 'จัดกลุ่ม array of objects ตาม key ที่กำหนด',
    },

    toPayloadByKey: {
        template: `import { toPayloadByKey } from 'adc-directive'

const items = [
  { id: 'a', value: 1 },
  { id: 'b', value: 2 }
]
const result = toPayloadByKey(items, item => item.id)
/* Expected: {
  a: { id: 'a', value: 1 },
  b: { id: 'b', value: 2 }
} */`,
        description: 'แปลง array เป็น object โดยใช้ค่าจาก property เป็น key',
    },

    // Validation Utilities
    validateObject: {
        template: `import { validateObject } from 'adc-directive'

const data = {
  id: 1,
  user: { name: 'John' }
}
const result = validateObject(data, ['id', 'user.name'], 'User Data')
// Expected: { status: 1, message: '' }`,
        description: 'ตรวจสอบ key ใน object เชิงลึก',
    },

    validateEmail: {
        template: `import { validateEmail } from 'adc-directive'

const result = validateEmail('test@example.com', {
  allowEmpty: false,
  maxLength: 100,
  allowedDomains: ['example.com']
})
// Expected: { isValid: true, message: '' }`,
        description: 'ตรวจสอบความถูกต้องของอีเมล',
    },

    validatePayloadEmptyToNull: {
        template: `import { validatePayloadEmptyToNull } from 'adc-directive'

const data = {
  name: '',
  age: 0,
  items: [],
  address: {
    street: '',
    city: 'Bangkok'
  }
}
const result = validatePayloadEmptyToNull(data)
/* Expected: {
  name: null,
  age: 0,
  items: null,
  address: {
    street: null,
    city: 'Bangkok'
  }
} */`,
        description: 'แปลงค่าว่างทั้งหมดใน object เป็น null',
    },

    checkFormatDate: {
        template: `import { checkFormatDate } from 'adc-directive'

const result1 = checkFormatDate('2024-01-01', 'YYYY-MM-DD')
// Expected: true

const result2 = checkFormatDate('01/01/2024', 'DD/MM/YYYY')
// Expected: true`,
        description: 'ตรวจสอบรูปแบบวันที่ตามฟอร์แมตที่กำหนด',
    },

    // Process Utilities
    runProcess: {
        template: `import { runProcess } from 'adc-directive'

const items = [1, 2, 3]
runProcess(items, (item, index) => {
  console.log(\`Processing item \${item} at index \${index}\`)
}, 0)`,
        description: 'ทำงานกับ array แบบมีลำดับขั้นตอน',
    },

    delayPromise: {
        template: `import { delayPromise } from 'adc-directive'

// รอ 1 วินาที
await delayPromise(1000)

// รอแล้วทำงาน callback
await delayPromise(1000, () => console.log('Done!'))

// รอพร้อมส่งค่า
const result = await delayPromise(1000, (x) => x * 2, 5)
// Expected: 10`,
        description: 'สร้าง Promise ที่ทำงานหลังจากเวลาที่กำหนด',
    },

    copyDeep: {
        template: `import { copyDeep } from 'adc-directive'

const obj = {
  a: 1,
  b: { c: 2 },
  d: [1, 2, { e: 3 }]
}
const result = copyDeep(obj)
// Expected: deep copy with no references to original`,
        description: 'สร้างสำเนาข้อมูลแบบ deep copy',
    },

    // HTTP Client
    ADC: {
        template: `import { ADC } from 'adc-directive'

const api = new ADC<RequestType, ResponseType>()
const response = await api.request({
  baseURL: 'https://api.example.com',
  method: 'POST',
  variables: { id: 1 },
  storage: 'cache',
  timeToLive: 60000
})`,
        description: 'จัดการ HTTP requests พร้อม caching',
    },

    // Function Composition
    ci: {
        template: `import { ci } from 'adc-directive'

const result = ci(
  5,
  x => x + 1,    // 6
  x => x * 2     // 12
)
// Expected: 12`,
        description: 'Chain/compose functions เข้าด้วยกัน',
    },

    withCi: {
        template: `import { withCi } from 'adc-directive'

const addOne = (x: number) => x + 1
const double = (x: number) => x * 2

const compute = withCi(addOne, double)
const result = compute(5)  // Expected: 12`,
        description: 'สร้าง function composition wrapper',
    },

    withAddDate: {
        template: `import { withAddDate } from 'adc-directive'

const addWeek = withAddDate(7)
const result = addWeek(new Date('2024-01-01'))
// Expected: 2024-01-08`,
        description: 'สร้างฟังก์ชันเพิ่มจำนวนวัน',
    },

    withAddHour: {
        template: `import { withAddHour } from 'adc-directive'

const addThreeHours = withAddHour(3)
const result = addThreeHours(new Date('2024-01-01 10:00'))
// Expected: 2024-01-01 13:00`,
        description: 'สร้างฟังก์ชันเพิ่มจำนวนชั่วโมง',
    },

    withAddMinute: {
        template: `import { withAddMinute } from 'adc-directive'

const addHalfHour = withAddMinute(30)
const result = addHalfHour(new Date('2024-01-01 10:00'))
// Expected: 2024-01-01 10:30`,
        description: 'สร้างฟังก์ชันเพิ่มจำนวนนาที',
    },

    withAddMonth: {
        template: `import { withAddMonth } from 'adc-directive'

const addQuarter = withAddMonth(3)
const result = addQuarter(new Date('2024-01-01'))
// Expected: 2024-04-01`,
        description: 'สร้างฟังก์ชันเพิ่มจำนวนเดือน',
    },

    withDateDiff: {
        template: `import { withDateDiff } from 'adc-directive'

const date1 = new Date('2024-01-01')
const getDaysDiff = withDateDiff(date1)
const result = getDaysDiff(new Date('2024-01-15'))
// Expected: 14`,
        description: 'สร้างฟังก์ชันคำนวณความต่างของวันที่',
    },

    withCombineText: {
        template: `import { withCombineText } from 'adc-directive'

const combineWithDash = withCombineText('-')
const result = combineWithDash(['a', 'b', 'c'])
// Expected: 'a-b-c'`,
        description: 'สร้างฟังก์ชันรวมข้อความด้วยตัวคั่นที่กำหนด',
    },

    // Check Utilities
    checkEmpty: {
        template: `import { checkEmpty } from 'adc-directive'

checkEmpty('')        // true
checkEmpty([])       // true
checkEmpty({})       // true
checkEmpty(null)     // true
checkEmpty('abc')    // false`,
        description: 'ตรวจสอบค่าว่าง',
    },

    checkObject: {
        template: `import { checkObject } from 'adc-directive'

checkObject({})        // true
checkObject([])        // false
checkObject(null)      // false`,
        description: 'ตรวจสอบว่าเป็น object',
    },

    checkEmail: {
        template: `import { checkEmail } from 'adc-directive'

checkEmail('test@email.com')   // true
checkEmail('invalid-email')    // false`,
        description: 'ตรวจสอบรูปแบบอีเมล',
    },

    checkNumber: {
        template: `import { checkNumber } from 'adc-directive'

checkNumber(123)       // true
checkNumber('123')     // true
checkNumber('abc')     // false`,
        description: 'ตรวจสอบว่าเป็นตัวเลข',
    },

    toConvertData: {
        template: `import { toConvertData } from 'adc-directive'

const data = {
  name: 'John',
  items: ['a', '', null, 'b']
}
const result = toConvertData(data, true)
// Expected: cleaned data without special characters`,
        description: 'แปลงข้อมูลเป็น string แบบไม่มีอักขระพิเศษ',
    },

    toUid: {
        template: `import { toUid } from 'adc-directive'

const result = toUid(8)  // Expected: 'xK4m2P9q'
const customResult = toUid(12, 'ABC123') // Expected: 'A1B2C3A1B2C3'`,
        description: 'สร้าง unique identifier',
    },

    checkItemDuplicate: {
        template: `import { checkItemDuplicate } from 'adc-directive'

const users = [
  { name: 'John', id: 1 },
  { name: 'John', id: 2 }
]
const result = checkItemDuplicate(users, user => user.name)
// Expected: true (พบชื่อซ้ำ)`,
        description: 'ตรวจสอบค่าซ้ำใน array',
    },
} as const

// สำหรับการค้นหา
const route = useRoute()
const searchQuery = ref('')

// Function สำหรับ normalize ข้อความเพื่อค้นหาแบบไม่สนใจตัวพิมพ์เล็ก/ใหญ่
const normalizeText = (text: string): string => {
    if (typeof text !== 'string') return ''
    return text.toLowerCase().trim()
}

const highlightText = (text: string): string => {
    if (!searchQuery.value.trim()) return text
    const query = normalizeText(searchQuery.value)
    const regex = new RegExp(`(${query})`, 'gi')
    return text.replace(
        regex,
        '<mark class="bg-yellow-100 rounded px-1">$1</mark>'
    )
}

// รายละเอียดทั้งหมดของ utilities แยกตามหมวดหมู่
const utilityExamples = [
    // เพิ่มส่วนนี้เข้าไปในตัวแปร utilityExamples ก่อนหมวดหมู่อื่นๆ
    {
        category: 'Getting Started',
        description: 'การติดตั้งและเริ่มต้นใช้งาน ADC Directive',
        functions: [
            {
                name: 'Installation',
                description: 'วิธีติดตั้งผ่าน npm หรือ yarn',
                code: `# Using npm
npm install adc-directive

# Using yarn
yarn add adc-directive

# Using pnpm
pnpm add adc-directive`,
            },
            {
                name: 'Basic Usage',
                description: 'การใช้งานพื้นฐาน',
                code: `// นำเข้าทั้งหมด
import * as dc from 'adc-directive'

// นำเข้าเฉพาะฟังก์ชันที่ต้องการ
import { toCombineText, toNumber, addDate } from 'adc-directive'

// ตัวอย่างการใช้งาน
const text = dc.toCombineText(['a', 'b', null, 'c'], '_')
// Result: 'a_b_c'

const num = dc.toNumber('123')
// Result: 123

const tomorrow = dc.addDate(new Date(), 1)
// Result: Date object of tomorrow`,
            },
            {
                name: 'TypeScript Support',
                description: 'การใช้งานกับ TypeScript',
                code: `import { ADC } from 'adc-directive'

// กำหนด types สำหรับ request และ response
interface UserRequest {
  id: number
}

interface UserResponse {
  id: number
  name: string
  email: string
}

// สร้าง instance พร้อม type safety
const api = new ADC<UserRequest, UserResponse>()

// TypeScript จะช่วยตรวจสอบ types
const response = await api.request({
  baseURL: 'https://api.example.com',
  method: 'POST',
  variables: {
    id: 1  // ต้องตรงกับ UserRequest
  }
})`,
            },
            {
                name: 'Features Overview',
                description: 'ความสามารถหลักของ ADC Directive',
                code: `// 1. Function Composition
import { ci } from 'adc-directive'
const result = ci(5, x => x + 1, x => x * 2)  // 12

// 2. Array Manipulation
import { mapArray, chunkArray } from 'adc-directive'
const flat = mapArray([1, [2, [3]]])  // [1, 2, 3]
const chunks = chunkArray([1,2,3,4], 2)  // [[1,2], [3,4]]

// 3. Date Handling
import { dateDiff, addDate } from 'adc-directive'
const diff = dateDiff(date1, date2)
const future = addDate(new Date(), 7)

// 4. HTTP Client with Caching
import { ADC } from 'adc-directive'
const api = new ADC()
const response = await api.request({
  storage: 'cache',
  timeToLive: 60000  // 1 minute cache
})`,
            },
        ],
    },
    {
        category: 'HTTP Utilities',
        description: 'ฟังก์ชันสำหรับจัดการ HTTP Requests',
        functions: [
            {
                name: 'ADC',
                description:
                    'Client สำหรับจัดการ HTTP requests พร้อมระบบ caching อัตโนมัติ',
                code: `const api = new ADC<RequestType, ResponseType>()

// Basic request
const response = await api.request({
  baseURL: 'https://api.example.com',
  method: 'POST',
  variables: { id: 1 }
})

// Request with caching
const cachedResponse = await api.request({
  baseURL: 'https://api.example.com',
  method: 'GET',
  storage: 'cache',
  timeToLive: 60000, // 1 minute
  variables: { id: 1 }
})

// GraphQL request
const graphqlResponse = await api.request({
  baseURL: 'https://api.example.com/graphql',
  query: \`
    query GetUser($id: ID!) {
      user(id: $id) {
        name
        email
      }
    }
  \`,
  variables: { id: 1 }
})`,
            },
        ],
    },

    {
        category: 'Array Functions',
        description: 'ฟังก์ชันสำหรับจัดการข้อมูลแบบ Array',
        functions: [
            {
                name: 'mapArray',
                description:
                    'แปลง Array ทุกตัวให้อยู่ในระดับเดียวกัน (Flatten Nested Arrays)',
                code: `const nestedArray = [1, [2, 3, [4, 5, [6]]]]
const flatArray = mapArray(nestedArray)
// Result: [1, 2, 3, 4, 5, 6]`,
            },
            {
                name: 'chunkArray',
                description: 'แบ่ง Array เป็นชุดตามจำนวนที่กำหนด',
                code: `const items = [1, 2, 3, 4, 5]
const chunked = chunkArray(items, 2)
// Result: [[1,2], [3,4], [5]]`,
            },
            {
                name: 'toChangePositionArray',
                description: 'สลับตำแหน่งข้อมูลใน Array แบบสุ่ม',
                code: `const array = ['A', 'B', 'C', 'D']
const shuffled = toChangePositionArray(array)
// Result: ['C', 'A', 'D', 'B'] (ตำแหน่งจะสุ่มทุกครั้ง)`,
            },
            {
                name: 'checkItemDuplicate',
                description:
                    'ตรวจสอบค่าซ้ำใน Array โดยระบุ key ที่ต้องการตรวจสอบ',
                code: `const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'John' },
  { id: 3, name: 'Jane' }
]

// ตรวจสอบโดยใช้ชื่อ
const hasDuplicateName = checkItemDuplicate(users, user => user.name)
// Result: true

// ตรวจสอบโดยใช้ ID
const hasDuplicateId = checkItemDuplicate(users, user => user.id)
// Result: false`,
            },
        ],
    },

    {
        category: 'Object Functions',
        description: 'ฟังก์ชันสำหรับจัดการข้อมูลแบบ Object',
        functions: [
            {
                name: 'mergeObject',
                description: 'รวม Object หลายตัวเข้าด้วยกันแบบ Deep Merge',
                code: `const obj1 = {
  a: 1,
  b: { c: 2 }
}
const obj2 = {
  b: { d: 3 },
  e: 4
}
const merged = mergeObject(obj1, obj2)
/* Result: {
  a: 1,
  b: { c: 2, d: 3 },
  e: 4
} */`,
            },
            {
                name: 'findObjectByKey',
                description: 'ค้นหา Key ใน Object แบบ Nested Path',
                code: `const data = {
  user: {
    profile: {
      name: 'John',
      settings: {
        theme: 'dark'
      }
    }
  }
}

const hasName = findObjectByKey(data, ['user.profile.name'])
// Result: true

const hasAge = findObjectByKey(data, ['user.profile.age'])
// Result: false`,
            },
            {
                name: 'selectObject',
                description: 'เลือกเฉพาะ Keys ที่ต้องการจาก Object',
                code: `const data = {
  id: 1,
  name: 'John',
  age: 30,
  email: 'john@example.com'
}

const selected = selectObject(data, ['id', 'name'])
// Result: { id: 1, name: 'John' }`,
            },
            {
                name: 'createObj',
                description: 'สร้าง Object จาก Path String',
                code: `const base = {
  user: {
    profile: {
      name: 'John'
    }
  }
}

const newObj = createObj(base, 'user.profile')
/* Result: {
  user: {
    profile: {
      name: 'John'
    }
  }
} */`,
            },
            {
                name: 'mapToKeys',
                description: 'แปลง Path String เป็น Array ของ Keys',
                code: `const result = mapToKeys('profile.name.colors[2].length')
// Result: ['profile', 'name', 'colors', '2', 'length']`,
            },
            {
                name: 'checkNestedValue',
                description: 'ตรวจสอบค่าใน Nested Object',
                code: `const data = {
  user: {
    profile: {
      name: 'John',
      hobbies: ['reading', 'gaming']
    }
  }
}

const result = checkNestedValue(data, {
  'user.profile.name': 'John',
  'user.profile.hobbies': ['reading', 'gaming']
})
// Result: true`,
            },
        ],
    },

    {
        category: 'Validation Functions',
        description: 'ฟังก์ชันสำหรับตรวจสอบความถูกต้องของข้อมูล',
        functions: [
            {
                name: 'validateObject',
                description: 'ตรวจสอบความถูกต้องของ Keys ใน Object',
                code: `const data = {
  id: 1,
  user: {
    name: 'John',
    email: 'john@example.com'
  }
}

const result = validateObject(
  data,
  ['id', 'user.name', 'user.email'],
  'User Data'
)
/* Result: {
  status: 1,  // 1 = ผ่าน, 0 = ไม่ผ่าน, -1 = error
  message: '' // ข้อความ error (ถ้ามี)
} */`,
            },
            {
                name: 'validateEmail',
                description:
                    'ตรวจสอบความถูกต้องของอีเมล พร้อมตัวเลือกเพิ่มเติม',
                code: `const result = validateEmail('test@example.com', {
  allowEmpty: false,
  maxLength: 100,
  allowedDomains: ['example.com'],
  blockDisposable: true
})
/* Result: {
  isValid: true,
  message: ''  // ข้อความ error (ถ้ามี)
} */`,
            },
            {
                name: 'validatePayloadEmptyToNull',
                description: 'แปลงค่าว่างทั้งหมดใน Object เป็น null',
                code: `const data = {
  name: '',
  age: 0,
  items: [],
  address: {
    street: '',
    city: 'Bangkok'
  }
}

const result = validatePayloadEmptyToNull(data)
/* Result: {
  name: null,
  age: 0,
  items: null,
  address: {
    street: null,
    city: 'Bangkok'
  }
} */`,
            },
            {
                name: 'checkEmail',
                description: 'ตรวจสอบรูปแบบอีเมลอย่างง่าย',
                code: `checkEmail('test@example.com')  // true
checkEmail('invalid-email')    // false`,
            },
            {
                name: 'checkEmpty',
                description: 'ตรวจสอบค่าว่างสำหรับทุกประเภทข้อมูล',
                code: `// String
checkEmpty('')         // true
checkEmpty('text')     // false

// Array
checkEmpty([])         // true
checkEmpty([1, 2])     // false

// Object
checkEmpty({})         // true
checkEmpty({ a: 1 })   // false

// Others
checkEmpty(null)       // true
checkEmpty(undefined)  // true
checkEmpty(0)         // false`,
            },
            {
                name: 'checkFormatDate',
                description: 'ตรวจสอบรูปแบบวันที่',
                code: `checkFormatDate('2024-01-01', 'YYYY-MM-DD')     // true
checkFormatDate('01/01/2024', 'DD/MM/YYYY')   // true
checkFormatDate('2024-13-01', 'YYYY-MM-DD')   // false`,
            },
        ],
    },

    {
        category: 'Date Functions',
        description: 'ฟังก์ชันสำหรับจัดการวันที่และเวลา',
        functions: [
            {
                name: 'dateDiff',
                description: 'คำนวณความต่างระหว่างวันที่',
                code: `const diff = dateDiff(
  new Date('2024-01-01'),
  new Date('2024-01-15')
)
/* Result: {
  days: 14,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 1209600000,
  hoursTotal: 336,
  minutesTotal: 20160,
  secondsTotal: 1209600
} */`,
            },
            {
                name: 'dateDiffToString',
                description: 'แสดงความต่างของวันที่ในรูปแบบข้อความ',
                code: `const diff1 = dateDiffToString(
  new Date('2024-01-01'),
  new Date('2024-02-01'),
  'th'  // 'th' | 'en'
)
// Result: '1 เดือนที่แล้ว'

const diff2 = dateDiffToString(
  new Date('2024-01-01'),
  new Date('2024-01-15'),
  'en'
)
// Result: '14 days ago'`,
            },
            {
                name: 'dateToCombine',
                description: 'แปลงวันที่เป็นรูปแบบต่างๆ',
                code: `const result = dateToCombine(new Date('2024-01-01'))
/* Result: {
  year: '2024',
  month: '01',
  day: '01',
  hour: '00',
  minute: '00',
  second: '00',
  valueOfDate: '2024-01-01',
  valueOfTime: '00:00:00',
  valueOfValue: '2024-01-01 00:00:00',
  th: 'วันจันทร์ที่ 1 มกราคม 2567'
} */`,
            },
            {
                name: 'addDate',
                description: 'เพิ่มหรือลดจำนวนวัน',
                code: `const date = new Date('2024-01-01')

// เพิ่ม 7 วัน
const future = addDate(date, 7)
// Result: 2024-01-08

// ลด 3 วัน
const past = addDate(date, -3)
// Result: 2023-12-29`,
            },
            {
                name: 'addMonth',
                description: 'เพิ่มหรือลดจำนวนเดือน',
                code: `const date = new Date('2024-01-01')

// เพิ่ม 3 เดือน
const future = addMonth(date, 3)
// Result: 2024-04-01

// ลด 1 เดือน
const past = addMonth(date, -1)
// Result: 2023-12-01`,
            },
            {
                name: 'addHour',
                description: 'เพิ่มหรือลดจำนวนชั่วโมง',
                code: `const date = new Date('2024-01-01 10:00')

// เพิ่ม 5 ชั่วโมง
const future = addHour(date, 5)
// Result: 2024-01-01 15:00

// ลด 2 ชั่วโมง
const past = addHour(date, -2)
// Result: 2024-01-01 08:00`,
            },
            {
                name: 'addMinute',
                description: 'เพิ่มหรือลดจำนวนนาที',
                code: `const date = new Date('2024-01-01 10:00')

// เพิ่ม 30 นาที
const future = addMinute(date, 30)
// Result: 2024-01-01 10:30

// ลด 15 นาที
const past = addMinute(date, -15)
// Result: 2024-01-01 09:45`,
            },
        ],
    },

    {
        category: 'String Functions',
        description: 'ฟังก์ชันสำหรับจัดการข้อความ',
        functions: [
            {
                name: 'toCombineText',
                description: 'รวม Array เป็น String ด้วยตัวคั่นที่กำหนด',
                code: `const items = ['Hello', null, 'World', '', '!']

const result1 = toCombineText(items)
// Result: 'Hello World !'

const result2 = toCombineText(items, '-')
// Result: 'Hello-World-!'`,
            },
            {
                name: 'toHasKey',
                description: 'ทำความสะอาดข้อความให้เหมาะสำหรับใช้เป็น Key',
                code: `const text = '  User-Name__123 !@#  '
const key = toHasKey(text)
// Result: 'username_123'`,
            },
            {
                name: 'toRegExp',
                description: 'สร้าง RegExp จาก patterns ที่กำหนด',
                code: `const pattern = toRegExp(['th', 'en', 'number'], 'g')
// สร้าง RegExp ที่รองรับภาษาไทย, อังกฤษ และตัวเลข

// ใช้งานร่วมกับ toReplaceTextByRegExp
const text = 'สวัสดี Hello 123'
const result = text.match(pattern)
// Result: ['สวัสดี', 'Hello', '123']`,
            },
            {
                name: 'toReplaceTextByRegExp',
                description: 'แทนที่ข้อความด้วย RegExp pattern',
                code: `const text = 'Hello123World!'
const result = toReplaceTextByRegExp(text, ['en', 'number'])
// Result: 'Hello123World'

// ใช้แค่ตัวอักษรภาษาอังกฤษ
const onlyEn = toReplaceTextByRegExp(text, ['en'])
// Result: 'HelloWorld'`,
            },
        ],
    },

    {
        category: 'Number Functions',
        description: 'ฟังก์ชันสำหรับจัดการตัวเลข',
        functions: [
            {
                name: 'toNumber',
                description: 'แปลงค่าเป็นตัวเลข',
                code: `toNumber('123')      // 123
toNumber('-12.34')   // -12.34
toNumber('abc')      // 0
toNumber(null)       // 0
toNumber(undefined)  // 0
toNumber(true)       // 0`,
            },
            {
                name: 'toCurrency',
                description: 'จัดรูปแบบตัวเลขให้อยู่ในรูปแบบเงิน',
                code: `// จัดรูปแบบเป็นตัวเลขทศนิยม 2 ตำแหน่ง
toCurrency(1234567.89, 2)     // '1,234,567.89'
toCurrency(1234.56, 2)        // '1,234.56'
toCurrency(1234, 0)           // '1,234'`,
            },
            {
                name: 'toRandomNumber',
                description: 'สุ่มตัวเลขในช่วงที่กำหนด',
                code: `// สุ่มตัวเลขระหว่าง 1-100
toRandomNumber(1, 100)    // เช่น 42

// สุ่มตัวเลขระหว่าง 0-10
toRandomNumber(10)        // เช่น 7`,
            },
            {
                name: 'toNumberByAverage',
                description: 'คำนวณค่าเฉลี่ยจาก property ใน array of objects',
                code: `const items = [
  { value: 10 },
  { value: 20 },
  { value: 30 }
]

const avg = toNumberByAverage(items, item => item.value)
// Result: 20`,
            },
            {
                name: 'toNumberByMax',
                description: 'หาค่าสูงสุดจาก property ใน array of objects',
                code: `const items = [
  { value: 10 },
  { value: 20 },
  { value: 30 }
]

const max = toNumberByMax(items, item => item.value)
// Result: 30`,
            },
            {
                name: 'toNumberByMin',
                description: 'หาค่าต่ำสุดจาก property ใน array of objects',
                code: `const items = [
  { value: 10 },
  { value: 20 },
  { value: 30 }
]

const min = toNumberByMin(items, item => item.value)
// Result: 10`,
            },
            {
                name: 'toNumberBySum',
                description: 'คำนวณผลรวมจาก property ใน array of objects',
                code: `const items = [
  { value: 10 },
  { value: 20 },
  { value: 30 }
]

const sum = toNumberBySum(items, item => item.value)
// Result: 60`,
            },
        ],
    },

    {
        category: 'Process Functions',
        description: 'ฟังก์ชันสำหรับการประมวลผลและจัดการ Process',
        functions: [
            {
                name: 'runProcess',
                description: 'ทำงานกับ array แบบมีลำดับขั้นตอน',
                code: `const items = ['A', 'B', 'C']

// ประมวลผลทุกไอเท็ม
runProcess(items, (item, index) => {
  console.log(\`Processing \${item} at index \${index}\`)
})

// เริ่มจาก index ที่กำหนด
runProcess(items, (item, index) => {
  console.log(\`Processing \${item}\`)
}, 1) // เริ่มจาก 'B'`,
            },
            {
                name: 'delayPromise',
                description: 'สร้าง Promise ที่ทำงานหลังจากเวลาที่กำหนด',
                code: `// รอ 1 วินาที
await delayPromise(1000)

// รอแล้วทำงาน callback
await delayPromise(1000, () => {
  console.log('Done!')
})

// รอพร้อมส่งค่า
const result = await delayPromise(
  1000,
  (x) => x * 2,
  5
)
// Result: 10`,
            },
            {
                name: 'copyDeep',
                description: 'สร้างสำเนาข้อมูลแบบ Deep Copy',
                code: `const original = {
  a: 1,
  b: { c: 2 },
  d: [1, 2, { e: 3 }]
}

const copy = copyDeep(original)
// สร้างสำเนาใหม่ทั้งหมด ไม่มีการอ้างอิงถึงข้อมูลเดิม`,
            },
        ],
    },

    {
        category: 'Function Composition',
        description:
            'ฟังก์ชันสำหรับ Function Composition และ Higher-Order Functions',
        functions: [
            {
                name: 'ci',
                description: 'เชื่อมต่อการทำงานของหลายฟังก์ชันเข้าด้วยกัน',
                code: `const result = ci(
  5,                  // ค่าเริ่มต้น
  x => x + 1,        // 6
  x => x * 2,        // 12
  x => x.toString()  // "12"
)
// Result: "12"`,
            },
            {
                name: 'withCi',
                description: 'สร้าง function composition wrapper',
                code: `const addOne = (x: number) => x + 1
const double = (x: number) => x * 2
const toString = (x: number) => x.toString()

const compute = withCi(
  addOne,
  double,
  toString
)

const result = compute(5)
// Result: "12"`,
            },
            {
                name: 'withAddDate',
                description: 'สร้างฟังก์ชันเพิ่มจำนวนวัน',
                code: `const addOneWeek = withAddDate(7)
const result = addOneWeek(new Date('2024-01-01'))
// Result: 2024-01-08

const addDays = withAddDate(new Date('2024-01-01'))
const result2 = addDays(3)
// Result: 2024-01-04`,
            },
            {
                name: 'withAddHour',
                description: 'สร้างฟังก์ชันเพิ่มจำนวนชั่วโมง',
                code: `const addThreeHours = withAddHour(3)
const result = addThreeHours(new Date('2024-01-01 10:00'))
// Result: 2024-01-01 13:00

const addHours = withAddHour(new Date('2024-01-01 10:00'))
const result2 = addHours(2)
// Result: 2024-01-01 12:00`,
            },
            {
                name: 'withAddMinute',
                description: 'สร้างฟังก์ชันเพิ่มจำนวนนาที',
                code: `const addHalfHour = withAddMinute(30)
const result = addHalfHour(new Date('2024-01-01 10:00'))
// Result: 2024-01-01 10:30

const addMinutes = withAddMinute(new Date('2024-01-01 10:00'))
const result2 = addMinutes(15)
// Result: 2024-01-01 10:15`,
            },
            {
                name: 'withAddMonth',
                description: 'สร้างฟังก์ชันเพิ่มจำนวนเดือน',
                code: `const addQuarter = withAddMonth(3)
const result = addQuarter(new Date('2024-01-01'))
// Result: 2024-04-01

const addMonths = withAddMonth(new Date('2024-01-01'))
const result2 = addMonths(2)
// Result: 2024-03-01`,
            },
            {
                name: 'withDateDiff',
                description: 'สร้างฟังก์ชันคำนวณความต่างของวันที่',
                code: `const date1 = new Date('2024-01-01')
const getDaysDiff = withDateDiff(date1)

const result = getDaysDiff(new Date('2024-01-15'))
// Result: 14`,
            },
            {
                name: 'withCombineText',
                description: 'สร้างฟังก์ชันรวมข้อความด้วยตัวคั่นที่กำหนด',
                code: `const joinWithDash = withCombineText('-')
const result = joinWithDash(['a', 'b', 'c'])
// Result: 'a-b-c'

const items = ['x', 'y', 'z']
const joinItems = withCombineText(items)
const result2 = joinItems('_')
// Result: 'x_y_z'`,
            },
        ],
    },

    {
        category: 'Other Utilities',
        description: 'ฟังก์ชันอื่นๆ',
        functions: [
            {
                name: 'toUid',
                description: 'สร้าง Unique Identifier',
                code: `// สร้าง ID ความยาว 8 ตัวอักษร
const id1 = toUid(8)  // เช่น 'xK4m2P9q'

// สร้าง ID ความยาว 12 ตัวอักษร
const id2 = toUid(12) // เช่น 'aB7nJ5vL2pQ8'

// สร้าง ID จากตัวอักษรที่กำหนด
const id3 = toUid(8, 'ABC123') // เช่น 'A1B2C3A1'`,
            },
            {
                name: 'toConvertData',
                description: 'แปลงข้อมูลเป็น String แบบไม่มีอักขระพิเศษ',
                code: `const data = {
  name: 'John Doe',
  items: ['a', '', null, 'b'],
  info: {
    age: 30,
    active: true
  }
}

const result = toConvertData(data, true)
// แปลงเป็น string และลบอักขระพิเศษ`,
            },
        ],
    },
] as const

// แสดงผลการค้นหาพร้อม highlight
const displayResults = computed(() => {
    if (!searchQuery.value.trim()) {
        return utilityExamples.map((category) => ({
            ...category,
            functions: category.functions.map((func) => ({
                ...func,
                highlightedName: func.name,
                highlightedDescription: func.description,
                highlightedCode: func.code,
            })),
        }))
    }

    const query = normalizeText(searchQuery.value)

    return utilityExamples
        .map((category) => {
            const filteredFunctions = category.functions
                .filter(
                    (func) =>
                        normalizeText(func.name).includes(query) ||
                        normalizeText(func.description).includes(query) ||
                        normalizeText(func.code).includes(query)
                )
                .map((func) => ({
                    ...func,
                    highlightedName: highlightText(func.name),
                    highlightedDescription: highlightText(func.description),
                    highlightedCode: highlightText(func.code),
                }))

            if (filteredFunctions.length === 0) return null

            return {
                ...category,
                functions: filteredFunctions,
            }
        })
        .filter(Boolean)
})

// สถิติการค้นหา
const searchStats = computed(() => {
    if (!searchQuery.value.trim()) return null

    return {
        categories: displayResults.value.length,
        functions: displayResults.value.reduce(
            (sum, category) => sum + (category?.functions.length || 0),
            0
        ),
    }
})

// Copy code to clipboard
const copyCode = async (code: string) => {
    try {
        await navigator.clipboard.writeText(code)
        // อาจเพิ่ม notification ตรงนี้
    } catch (err) {
        console.error('Failed to copy:', err)
    }
}

// Scroll to section
const scrollToSection = () => {
    if (route.hash) {
        const element = document.querySelector(route.hash)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }
}
const handlerResetExample = () => {
    selectedExample.value = 'toCombineText'
    handleExampleChange('toCombineText')
}

onMounted(() => {
    scrollToSection()
})

watch(
    () => route.hash,
    () => scrollToSection()
)

// Handle example change in playground
const handleExampleChange = (example: string) => {
    console.log('Example:', example)
    codeInput.value = examples[example as ExampleKey].template
    codeInput.value = examples[example as ExampleKey].template
}
</script>

<template>
    <BcLayout
        title="ADC Directive"
        subtitle="Utility functions สำหรับ TypeScript/JavaScript"
        icon="Code"
        style="-webkit-text-size-adjust: none; touch-action: pan-y pinch-zoom"
        class="w-full"
    >
        <!-- Search Section -->
        <section class="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="Search" size="24" color="primary" />
                <div class="flex-1">
                    <h2 class="text-xl font-bold">ค้นหาฟังก์ชัน</h2>
                    <p class="text-sm text-slate-600 mt-1">
                        ค้นหาจากชื่อฟังก์ชัน คำอธิบาย หรือโค้ดตัวอย่าง
                    </p>
                </div>
            </div>

            <div class="flex flex-col gap-4">
                <BcInput
                    id="searchQuery"
                    :data-value="searchQuery"
                    @input="(v) => (searchQuery = v as string)"
                    placeholder="พิมพ์คำค้นหา..."
                    icon="Search"
                    class="w-full"
                />

                <div
                    v-if="searchQuery.trim() && searchStats"
                    class="text-sm text-slate-600"
                >
                    พบ {{ searchStats.functions }} ฟังก์ชัน ใน
                    {{ searchStats.categories }} หมวดหมู่
                </div>
            </div>
        </section>

        <!-- Interactive Playground -->
        <section
            v-if="!searchQuery.trim()"
            class="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 w-full"
        >
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="Palette" size="24" color="primary" />
                <div>
                    <h2 class="text-xl font-bold">Interactive Playground</h2>
                    <p class="text-sm text-slate-600 mt-1">
                        ทดลองใช้งานฟังก์ชันต่างๆ
                    </p>
                </div>
            </div>

            <div class="grid gap-4">
                <div class="flex flex-col sm:flex-row gap-4">
                    <select
                        v-model="selectedExample"
                        class="w-full sm:w-auto px-4 py-2 border rounded text-[13px] sm:text-sm"
                        @change="handleExampleChange(selectedExample)"
                    >
                        <option
                            v-for="(ex, key) in examples"
                            :key="ex.template"
                            :value="key"
                        >
                            {{ key }}
                        </option>
                    </select>
                    <BcButton
                        variant="primary"
                        icon="RefreshCw"
                        @click="handlerResetExample"
                        class="w-full sm:w-auto"
                    >
                        ล้างข้อมูล
                    </BcButton>
                </div>

                <div class="grid bg-slate-800 rounded-lg p-2 sm:p-4">
                    <BcButton
                        @click="copyCode(codeInput)"
                        variant="white"
                        icon="Copy"
                        class="ml-auto"
                        size="sm"
                    />
                    <textarea
                        v-model="codeInput"
                        class="w-full h-40 font-mono text-[13px] sm:text-sm bg-transparent text-white focus:outline-none p-2 sm:p-4"
                    />
                </div>

                <div class="text-sm text-slate-600">
                    <p>{{ examples[selectedExample].description }}</p>
                </div>
            </div>
        </section>

        <!-- Function Categories -->
        <template v-for="category in displayResults" :key="category.category">
            <section
                :id="category?.category?.toLowerCase().replace(/ /g, '-')"
                class="mb-6 sm:mb-8 w-full"
            >
                <div class="flex items-center gap-3 mb-6">
                    <BcIcon name="Code" size="24" color="primary" />
                    <div>
                        <h2 class="text-xl font-bold">
                            {{ category?.category }}
                        </h2>
                        <p class="text-sm text-slate-600 mt-1">
                            {{ category?.description }}
                        </p>
                    </div>
                </div>

                <div class="space-y-4 sm:space-y-6">
                    <div
                        v-for="func in category?.functions"
                        :key="func.name"
                        class="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full"
                    >
                        <h3
                            class="text-lg font-bold mb-2"
                            v-html="func.highlightedName"
                        />
                        <p
                            class="text-slate-600 mb-4"
                            v-html="func.highlightedDescription"
                        />
                        <div class="bg-slate-800 rounded-lg">
                            <div class="flex justify-end p-2">
                                <BcButton
                                    @click="copyCode(func.code)"
                                    variant="white"
                                    icon="Copy"
                                    size="sm"
                                />
                            </div>
                            <div class="overflow-x-auto">
                                <pre
                                    class="text-[13px] sm:text-sm p-2 sm:p-4"
                                ><code v-html="func.highlightedCode" class="text-[13px] sm:text-sm" /></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </template>

        <!-- No Results -->
        <div
            v-if="searchQuery.trim() && !displayResults.length"
            class="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center w-full"
        >
            <BcIcon
                name="Search"
                size="48"
                class="mx-auto mb-4 text-slate-400"
            />
            <h3 class="text-lg font-bold text-slate-700">ไม่พบผลการค้นหา</h3>
            <p class="text-slate-600 mt-2">
                ลองใช้คำค้นหาอื่น หรือตรวจสอบการสะกดอีกครั้ง
            </p>
        </div>
    </BcLayout>
</template>

<style scoped>
/* Base styles */
:deep(*) {
    -webkit-text-size-adjust: none !important;
    text-size-adjust: none !important;
}

/* Code block styling */
pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: ui-monospace, monospace;
    background-color: rgb(30 41 59);
    color: #e2e8f0;
    margin: 0;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    max-height: 90vh;
}

code {
    font-family: inherit;
    color: #fff;
    display: inline-block;
    min-width: 100%;
}

/* Style for inline code */
:deep(code:not(pre code)) {
    background-color: rgb(241 245 249);
    color: rgb(71 85 105);
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-size: inherit;
}

/* Syntax highlighting colors */
:deep(.string) {
    color: #a5d6ff;
}
:deep(.number) {
    color: #ff9580;
}
:deep(.boolean) {
    color: #ffb1bb;
}
:deep(.comment) {
    color: #8b949e;
    font-style: italic;
}
:deep(.keyword) {
    color: #ff7b72;
}
:deep(.function) {
    color: #d2a8ff;
}
:deep(.operator) {
    color: #79c0ff;
}

/* Mobile optimizations */
@media (max-width: 640px) {
    :deep(*) {
        -webkit-text-size-adjust: none !important;
        text-size-adjust: none !important;
    }

    pre,
    code,
    textarea {
        font-size: 13px !important;
    }

    .overflow-x-auto {
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
    }
}

/* Scrollbar styling */
.overflow-x-auto {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
}

.overflow-x-auto::-webkit-scrollbar {
    height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
    background: transparent;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
}

/* Copy button styling */
.bg-slate-800 :deep(.bg-white) {
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
    color: rgb(30 41 59);
}

.bg-slate-800 :deep(.bg-white:hover) {
    --tw-bg-opacity: 0.9;
}

/* Section margin */
section {
    scroll-margin-top: 6rem;
}

/* Search highlight styling */
:deep(mark) {
    background-color: rgb(254 243 199);
    padding: 0 0.25rem;
    border-radius: 0.25rem;
    font-weight: 500;
}

pre :deep(mark) {
    background-color: rgba(254, 243, 199, 0.2);
    color: inherit;
}

/* Button and input spacing */
.flex-col > * + * {
    margin-top: 0.5rem;
}

@media (min-width: 640px) {
    .flex-col > * + * {
        margin-top: 0;
    }
}
</style>
