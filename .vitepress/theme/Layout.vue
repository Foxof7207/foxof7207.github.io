<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import LaunchTimerBanner from './components/LaunchTimerBanner.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-actions-after>
      <LaunchTimerBanner />
    </template>
  </Layout>
</template>
