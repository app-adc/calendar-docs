<script setup lang="ts">
import type { IconName } from '@/ABC/bc-types'
import BcIcon from '@/ABC/components/BcIcon.vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter, type RouteLocationRaw } from 'vue-router'

// Types
type MenuItem = {
    label: string
    icon: IconName
    path?: RouteLocationRaw
    selected?: boolean
    children?: MenuItem[]
    badge?: number | string
}

type PropsBcLayout = {
    title: string
    subtitle?: string
    icon?: IconName
    isSticky?: boolean
    loading?: boolean
    collapsed?: boolean
}

const props = withDefaults(defineProps<PropsBcLayout>(), {
    subtitle: '',
    icon: undefined,
    isSticky: false,
    loading: false,
    collapsed: false,
})

const emit = defineEmits<{
    (e: 'collapse'): void
}>()

// Responsive state
const isMobile = ref(false)
const showMobileMenu = ref(false)

// Watch mobile menu state
watch(showMobileMenu, (isOpen) => {
    if (isOpen) {
        document.body.classList.add('menu-open')
    } else {
        document.body.classList.remove('menu-open')
    }
})

// Composables
function useLayoutNavigation() {
    const router = useRouter()
    const isCollapsed = ref(false)
    const activeMenuItem = ref<string | null>(null)

    const menus = ref<MenuItem[]>([
        {
            label: 'ADC Calendar',
            icon: 'CalendarDays',
            children: [
                {
                    label: 'Props ที่รองรับ',
                    icon: 'ListFilter',
                    path: '/#props',
                },
                {
                    label: 'Interactive Playground',
                    icon: 'PenTool',
                    path: '/#interactive-playground',
                },
                {
                    label: 'ตัวอย่างการใช้งาน',
                    icon: 'BookOpen',
                    path: '/#examples',
                },
                {
                    label: 'คำแนะนำเพิ่มเติม',
                    icon: 'Info',
                    path: '/#additional-documentation',
                },
                {
                    label: 'Type System',
                    icon: 'FileCode',
                    path: '/#type-system',
                },
            ],
        },
    ])

    const handleMenuClick = (item: MenuItem) => {
        if (item.path) {
            activeMenuItem.value =
                typeof item.path === 'string' ? item.path : null
            router.push(item.path)
            if (isMobile.value) {
                showMobileMenu.value = false
            }
        }
    }

    const toggleCollapse = () => {
        if (!isMobile.value) {
            isCollapsed.value = !isCollapsed.value
            emit('collapse')
        }
    }

    const asideWidth = computed(() =>
        isCollapsed.value && !isMobile.value ? 'w-[4rem]' : 'w-[16rem]'
    )

    const headerClass = computed(() => ({
        'sticky top-0 z-10 bg-white shadow-sm': props.isSticky,
        'border-b border-border': true,
        'px-6 py-4': true,
    }))

    const menuItemClass = computed(() => (item: MenuItem) => ({
        'flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-all duration-200':
            true,
        'hover:bg-slate-50 rounded-lg mx-2': true,
        'bg-primary/10 text-primary font-medium': item.selected,
        'text-slate-600': !item.selected,
    }))

    return {
        menus,
        isCollapsed,
        activeMenuItem,
        asideWidth,
        headerClass,
        menuItemClass,
        handleMenuClick,
        toggleCollapse,
    }
}

// Setup responsive behavior
onMounted(() => {
    const checkMobile = () => {
        isMobile.value = window.innerWidth < 1024
        if (isMobile.value) {
            showMobileMenu.value = false
        }
    }

    window.addEventListener('resize', checkMobile)
    checkMobile()

    onUnmounted(() => {
        window.removeEventListener('resize', checkMobile)
        document.body.classList.remove('menu-open')
    })
})

const {
    menus,
    isCollapsed,
    asideWidth,
    headerClass,
    menuItemClass,
    handleMenuClick,
    toggleCollapse,
} = useLayoutNavigation()
</script>

<template>
    <div class="flex min-h-screen bg-slate-100">
        <!-- Mobile Header -->
        <div
            v-if="isMobile"
            class="fixed top-0 left-0 right-0 z-30 flex items-center px-4 py-3 bg-white border-b"
        >
            <button
                @click="showMobileMenu = true"
                class="p-2 hover:bg-slate-50 rounded-lg"
            >
                <BcIcon name="Menu" size="24" />
            </button>
            <h1 class="text-lg font-semibold">{{ title }}</h1>
        </div>

        <!-- Mobile Overlay -->
        <div
            v-if="showMobileMenu && isMobile"
            @click="showMobileMenu = false"
            class="fixed inset-0 bg-black/50 z-40"
        />

        <!-- Aside Menu -->
        <aside
            :class="[
                asideWidth,
                'border-r border-border bg-white transition-all duration-300',
                'fixed top-0 left-0 h-full flex flex-col z-50',
                {
                    'translate-x-0 fixed': showMobileMenu || !isMobile,
                    '-translate-x-full': !showMobileMenu && isMobile,
                },
            ]"
        >
            <!-- Header -->
            <div
                class="flex-shrink-0 h-16 flex items-center justify-between px-4 border-b border-border"
            >
                <transition name="fade">
                    <div
                        v-if="!isCollapsed || isMobile"
                        class="flex items-center gap-2"
                    >
                        <BcIcon name="Box" size="24" color="primary" />
                        <h1 class="text-lg font-bold text-slate-800">
                            {{ title }}
                        </h1>
                    </div>
                </transition>
                <button
                    v-if="isMobile"
                    @click="showMobileMenu = false"
                    class="p-2 hover:bg-slate-50 rounded-lg"
                >
                    <BcIcon name="X" size="20" />
                </button>
                <button
                    v-else
                    @click="toggleCollapse"
                    class="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                    <BcIcon
                        :name="isCollapsed ? 'ChevronRight' : 'ChevronLeft'"
                        size="20"
                    />
                </button>
            </div>

            <!-- Navigation -->
            <nav
                class="flex-1 overflow-y-auto overflow-x-hidden py-4 space-y-1"
            >
                <template v-for="item in menus" :key="item.label">
                    <!-- Group with Children -->
                    <div v-if="item.children" class="space-y-1">
                        <div
                            v-if="!isCollapsed || isMobile"
                            class="px-4 py-2 text-xs font-bold text-slate-400 uppercase"
                        >
                            {{ item.label }}
                        </div>
                        <router-link
                            v-for="child in item.children"
                            :key="child.label"
                            :to="child.path!"
                            :class="menuItemClass(child)"
                            @click="handleMenuClick(child)"
                        >
                            <BcIcon :name="child.icon" size="20" />
                            <transition name="fade">
                                <div
                                    v-if="!isCollapsed || isMobile"
                                    class="flex items-center justify-between flex-1"
                                >
                                    <span class="text-sm">{{
                                        child.label
                                    }}</span>
                                    <span
                                        v-if="child.badge"
                                        class="px-2 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded-full"
                                    >
                                        {{ child.badge }}
                                    </span>
                                </div>
                            </transition>
                        </router-link>
                    </div>

                    <!-- Single Item -->
                    <router-link
                        v-else
                        :to="item.path!"
                        :class="menuItemClass(item)"
                        @click="handleMenuClick(item)"
                    >
                        <BcIcon :name="item.icon" size="20" />
                        <transition name="fade">
                            <span
                                v-if="!isCollapsed || isMobile"
                                class="text-sm"
                                >{{ item.label }}</span
                            >
                        </transition>
                    </router-link>
                </template>
            </nav>
        </aside>

        <!-- Main Content -->
        <div
            :class="[
                {
                    'lg:ml-16': isCollapsed && !isMobile,
                    'lg:ml-64': !isCollapsed && !isMobile,
                },
                { 'mt-16': isMobile },
                'flex-1 transition-all duration-300 flex flex-col',
            ]"
        >
            <!-- Header -->
            <header :class="headerClass">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <BcIcon
                            v-if="icon"
                            :name="icon"
                            size="24"
                            class="text-slate-400"
                        />
                        <div>
                            <h1 class="text-xl font-bold text-slate-800">
                                {{ title }}
                            </h1>
                            <p
                                v-if="subtitle"
                                class="mt-1 text-sm text-slate-500"
                            >
                                {{ subtitle }}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center gap-4">
                        <slot name="actions" />
                    </div>
                </div>
                <slot name="header" />
            </header>

            <!-- Main Content -->
            <main
                class="flex-1 p-2 lg:p-6"
                :class="{ 'opacity-50 pointer-events-none': loading }"
            >
                <slot />
            </main>

            <!-- Footer -->
            <footer class="px-6 py-4 border-t border-border bg-white">
                <slot name="footer">
                    <div class="text-sm text-slate-500 text-center">
                        © {{ new Date().getFullYear() }} ABC Components. All
                        rights reserved.
                    </div>
                </slot>
            </footer>
        </div>
    </div>
</template>

<style>
/* Animations */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Custom Scrollbar */
nav {
    scrollbar-width: thin;
    scrollbar-color: #e2e8f0 transparent;
    -webkit-overflow-scrolling: touch;
}

nav::-webkit-scrollbar {
    width: 4px;
}

nav::-webkit-scrollbar-track {
    background: transparent;
}

nav::-webkit-scrollbar-thumb {
    background-color: #e2e8f0;
    border-radius: 2px;
}

/* Prevent body scroll when mobile menu is open */
body.menu-open {
    overflow: hidden;
    touch-action: none;
}

/* Main scrollbar customization */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #666;
}

/* Card effects */
.shadow-lg {
    transition: transform 0.2s, box-shadow 0.2s;
}

/* Code block customization */
pre {
    font-family: 'Fira Code', monospace;
    padding: 1rem;
    border-radius: 0.5rem;
    tab-size: 2;
}

code {
    font-family: inherit;
}

.bg-slate-800 :deep(.bg-white) {
    --tw-bg-opacity: 0.9;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.bg-slate-800 :deep(.bg-white:hover) {
    --tw-bg-opacity: 1;
}

/* Mobile menu transitions */
.translate-x-0 {
    transform: translateX(0);
}

.-translate-x-full {
    transform: translateX(-100%);
}
</style>
