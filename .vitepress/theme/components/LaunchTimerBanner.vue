<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

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

  return `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`
}

const countdown = computed(() => formatDuration(timeLeft.value))
const isLive = computed(() => timeLeft.value === 0)

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
    <div class="launch-timer-banner">
        <div class="launch-timer-content">
            <span class="launch-label">Server closure:</span>
            <span class="launch-date">3 June 2026 at 18:00</span>
            <span class="launch-status" v-if="!isLive">Time left until close: <strong>{{ countdown }}</strong></span>
            <span class="launch-status live" v-else>Server has now closed.</span>
        </div>
    </div>
</template>

<style scoped>
.launch-timer-banner {
    border-radius: 18px;
    padding: 16px 20px;
    margin: 0 auto 24px;
    max-width: 920px;
    background: linear-gradient(135deg, rgba(34, 152, 255, 0.14), rgba(60, 180, 142, 0.14));
    border: 1px solid rgba(34, 152, 255, 0.18);
}

.launch-timer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    font-size: 1rem;
    color: var(--vp-c-text);
    text-align: center;
}

.launch-label {
    font-weight: 700;
}

.launch-date {
    color: var(--vp-c-text-1);
}

.launch-status {
    font-weight: 700;
}

.launch-status.live {
    color: var(--vp-c-brand-1);
}
</style>
