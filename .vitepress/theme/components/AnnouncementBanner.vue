<script setup lang="ts">
// AnnouncementBanner.vue
</script>

<template>
  <div class="announcement-banner">
    <div class="container">
      <span class="message">
        The new server will release soon (Gilly-SMP 2.0)
      </span>
    </div>
  </div>
</template>

<style scoped>
.announcement-banner {
  background-color: var(--vp-c-brand-1);
  color: white;
  padding: 8px 12px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  z-index: 100;
  position: relative;
}

.container {
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.message {
  line-height: 1.4;
}

@media (max-width: 768px) {
  .announcement-banner {
    font-size: 12px;
    padding: 6px 10px;
  }
}
</style>
