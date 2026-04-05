<script setup lang="ts">
import { ref, onMounted } from "vue";

const show = ref(false);

// Use localStorage to avoid showing the popup multiple times in a session
onMounted(() => {
    const hasSeen = localStorage.getItem("gilly-announcement-seen");
    if (!hasSeen) {
        setTimeout(() => {
            show.value = true;
        }, 1000);
    }
});

const close = () => {
    show.value = false;
    localStorage.setItem("gilly-announcement-seen", "true");
};
</script>

<template>
    <Transition name="fade">
        <div v-if="show" class="popup-overlay" @click.self="close">
            <div class="popup-content">
                <button class="close-btn" @click="close">&times;</button>

                <div class="popup-header">
                    <div class="icon-wrapper">
                        <span class="icon">🚀</span>
                    </div>
                    <h2>Gilly-SMP 2.0</h2>
                </div>

                <div class="popup-body">
                    <p class="announcement">
                        The new server will release soon!
                    </p>
                    <p class="description">
                        Get ready for a massive update with new features, a
                        fresh world, and improved performance. Stay tuned to our
                        Discord for the official launch date!
                        <b>The wiki is currently incomplete. 🫠</b>
                    </p>
                </div>

                <div class="popup-footer">
                    <button class="action-btn" @click="close">Got it!</button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.popup-content {
    background: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
    border-radius: 20px;
    width: 90%;
    max-width: 450px;
    padding: 32px;
    position: relative;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    text-align: center;
}

.close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: transparent;
    border: none;
    font-size: 24px;
    color: var(--vp-c-text-2);
    cursor: pointer;
    line-height: 1;
    transition: color 0.2s;
}

.close-btn:hover {
    color: var(--vp-c-brand-1);
}

.popup-header {
    margin-bottom: 24px;
}

.icon-wrapper {
    background: var(--vp-c-brand-soft);
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 16px;
    font-size: 32px;
}

.popup-header h2 {
    font-size: 28px;
    font-weight: 800;
    margin: 0;
    background: linear-gradient(
        135deg,
        var(--vp-c-brand-1),
        var(--vp-c-brand-2)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.popup-body {
    margin-bottom: 32px;
}

.announcement {
    font-size: 20px;
    font-weight: 600;
    color: var(--vp-c-text-1);
    margin-bottom: 12px;
}

.description {
    font-size: 15px;
    line-height: 1.6;
    color: var(--vp-c-text-2);
}

.popup-footer {
    display: flex;
    justify-content: center;
}

.action-btn {
    background: var(--vp-c-brand-1);
    color: white;
    padding: 12px 32px;
    border-radius: 12px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition:
        transform 0.2s,
        background 0.2s;
}

.action-btn:hover {
    background: var(--vp-c-brand-2);
    transform: translateY(-2px);
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active .popup-content {
    animation: slide-up 0.4s ease-out;
}

@keyframes slide-up {
    from {
        transform: translateY(30px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
