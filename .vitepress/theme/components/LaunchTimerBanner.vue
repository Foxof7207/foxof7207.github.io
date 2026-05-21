<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const isFr = computed(() => lang.value.startsWith('fr'))

const closeDate = new Date('2026-06-03T18:00:00')
const timeLeft = ref(getRemaining())

function getRemaining() {
  return Math.max(0, closeDate.getTime() - Date.now())
}

function pad(value: number) {
  return String(value).padStart(2, '0')
}

function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const d = isFr.value ? 'j' : 'd'
  return `${days}${d} ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`
}

const countdown = computed(() => formatDuration(timeLeft.value))
const isLive = computed(() => timeLeft.value === 0)

const countdownLabel = computed(() =>
  isFr.value
    ? 'Temps restant avant la fin de la saison :'
    : 'Time left until the end of the season:'
)

const closedLabel = computed(() =>
  isFr.value
    ? 'Le serveur est maintenant fermé.'
    : 'Server has now closed.'
)

let intervalId: number | undefined
onMounted(() => {
  intervalId = window.setInterval(() => {
    timeLeft.value = getRemaining()
  }, 1000)
})

onUnmounted(() => {
  if (intervalId !== undefined) {
    window.clearInterval(intervalId)
  }
})
</script>

<template>
    <section class="launch-timer-banner">
        <div class="launch-timer-content">
            <div class="launch-timer-status">
                <span class="launch-status" v-if="!isLive">{{ countdownLabel }} <strong>{{ countdown }}</strong></span>
                <span class="launch-status live" v-else>{{ closedLabel }}</span>
            </div>
        </div>
    </section>
</template>

<style scoped>
.launch-timer-banner {
    display: inline-block;
    max-width: 100%;
    box-sizing: border-box;
    border-radius: 20px;
    padding: 18px 22px;
    margin: 24px 0 0;
    text-align: left;
    background: linear-gradient(135deg, rgba(34, 152, 255, 0.15), rgba(60, 180, 142, 0.14));
    border: 1px solid rgba(34, 152, 255, 0.22);
    overflow: hidden;
}

.launch-timer-content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    color: var(--vp-c-text);
}

.launch-timer-text,
.launch-timer-status {
    min-width: 0;
}

.launch-label {
    font-weight: 700;
    margin-right: 0.6rem;
}

.launch-date {
    color: var(--vp-c-text-1);
}

.launch-status {
    display: inline-block;
    font-weight: 700;
    color: var(--vp-c-text);
}

.launch-status.live {
    color: var(--vp-c-brand-1);
}

@media (max-width: 680px) {
    .launch-timer-content {
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
    }

    .launch-timer-banner {
        padding: 16px 18px;
    }
}
</style>
