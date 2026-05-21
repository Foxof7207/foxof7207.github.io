<script setup lang="ts">
import { ref, computed } from "vue";

type DeviceType = "pc" | "mobile" | "console" | null;
type OS = "windows" | "macos" | "linux" | "android" | "ios" | null;

const step = ref(1);
const selectedDevice = ref<DeviceType>(null);
const selectedOS = ref<OS>(null);

const deviceIcons = {
    pc: "https://api.iconify.design/mdi:laptop.svg?color=%23888888",
    mobile: "https://api.iconify.design/mdi:cellphone.svg?color=%23888888",
    console: "https://api.iconify.design/mdi:gamepad-variant.svg?color=%23888888"
};

const osIcons = {
    windows: "https://api.iconify.design/logos:microsoft-windows.svg",
    macos: "https://api.iconify.design/mdi:apple.svg?color=%23888888",
    linux: "https://api.iconify.design/logos:linux-tux.svg",
    android: "https://api.iconify.design/logos:android-icon.svg",
    ios: "https://api.iconify.design/mdi:apple.svg?color=%23888888"
};

const devices = [
    {
        id: "pc",
        name: "PC / Laptop",
        icon: deviceIcons.pc,
        description: "Java Edition players on computer",
    },
    {
        id: "mobile",
        name: "Mobile / Tablet",
        icon: deviceIcons.mobile,
        description: "Pocket/Bedrock Edition on portable devices",
    },
    {
        id: "console",
        name: "Console",
        icon: deviceIcons.console,
        description: "Xbox, PlayStation, or Nintendo Switch",
    },
];

const osOptions = computed(() => {
    if (selectedDevice.value === "pc") {
        return [
            { id: "windows", name: "Windows", icon: osIcons.windows },
            { id: "macos", name: "macOS", icon: osIcons.macos },
            { id: "linux", name: "Linux", icon: osIcons.linux },
        ];
    }
    if (selectedDevice.value === "mobile") {
        return [
            { id: "android", name: "Android", icon: osIcons.android },
            { id: "ios", name: "iOS (iPhone/iPad)", icon: osIcons.ios },
        ];
    }
    return [];
});

const selectDevice = (id: DeviceType) => {
    selectedDevice.value = id;
    step.value = 2;
};

const selectOS = (id: OS) => {
    selectedOS.value = id;
    step.value = 3;
};

const reset = () => {
    step.value = 1;
    selectedDevice.value = null;
    selectedOS.value = null;
};

const serverInfo = {
    java: {
        address: "mc.gillyb.net",
        port: "Default (25565)",
        version: "26.1.2",
    },
    bedrock: {
        address: "mc.gillyb.net",
        port: "19132",
        version: "Latest",
    },
};
</script>

<template>
    <div class="join-guide">
        <div class="guide-card">
            <div class="guide-header">
                <h2>Join Guide</h2>
                <p>Choose your device and get connected in a few steps.</p>
            </div>

            <div class="guide-body">
                <div class="progress-bar-wrapper">
                    <div class="progress-bar">
                        <div class="progress-fill" :style="{ width: (step / 3) * 100 + '%' }"></div>
                    </div>
                    <div class="progress-label">Step {{ step }} of 3</div>
                </div>

                <Transition name="fade" mode="out-in">
                    <div v-if="step === 1" key="step1" class="step-panel">
                        <h3>Select your device</h3>
                        <div class="grid-options">
                            <button
                                v-for="device in devices"
                                :key="device.id"
                                class="option-card"
                                @click="selectDevice(device.id as DeviceType)"
                            >
                                <img :src="device.icon" alt="device icon" />
                                <strong>{{ device.name }}</strong>
                                <span>{{ device.description }}</span>
                            </button>
                        </div>
                    </div>

                    <div v-else-if="step === 2" key="step2" class="step-panel">
                        <button class="back-link" @click="step = 1">← Back</button>
                        <template v-if="selectedDevice === 'console'">
                            <h3>Console users</h3>
                            <p>You need an active online subscription to join multiplayer on consoles.</p>
                            <ul>
                                <li><strong>Xbox:</strong> Game Pass Core / Live Gold</li>
                                <li><strong>PlayStation:</strong> PlayStation Plus</li>
                                <li><strong>Switch:</strong> Nintendo Switch Online</li>
                            </ul>
                            <button class="continue-btn" @click="step = 3">Continue</button>
                        </template>
                        <template v-else>
                            <h3>Select your operating system</h3>
                            <div class="grid-options os-grid">
                                <button
                                    v-for="os in osOptions"
                                    :key="os.id"
                                    class="option-card compact"
                                    @click="selectOS(os.id as OS)"
                                >
                                    <img :src="os.icon" alt="os icon" />
                                    <strong>{{ os.name }}</strong>
                                </button>
                            </div>
                        </template>
                    </div>

                    <div v-else-if="step === 3" key="step3" class="step-panel">
                        <button class="back-link" @click="step = 2">← Back</button>
                        <div class="result-panel">
                            <div class="result-meta">
                                <span class="badge" :class="selectedDevice === 'pc' ? 'badge-java' : 'badge-bedrock'">
                                    {{ selectedDevice === 'pc' ? 'Java Edition' : 'Bedrock Edition' }}
                                </span>
                                <h3>Connection details</h3>
                            </div>

                            <div class="info-grid">
                                <div class="info-block">
                                    <label>Server Address</label>
                                    <code>{{ selectedDevice === 'pc' ? serverInfo.java.address : serverInfo.bedrock.address }}</code>
                                </div>
                                <div class="info-block">
                                    <label>Server Port</label>
                                    <span>{{ selectedDevice === 'pc' ? serverInfo.java.port : serverInfo.bedrock.port }}</span>
                                </div>
                                <div class="info-block">
                                    <label>Minecraft Version</label>
                                    <span>{{ selectedDevice === 'pc' ? serverInfo.java.version : serverInfo.bedrock.version }}</span>
                                </div>
                            </div>

                            <div class="instructions">
                                <h4>How to join</h4>
                                <ol>
                                    <li v-if="selectedDevice === 'pc'">Open Minecraft Java Edition and select <strong>Multiplayer</strong>.</li>
                                    <li v-if="selectedDevice === 'pc'">Click <strong>Add Server</strong>.</li>
                                    <li v-if="selectedDevice === 'mobile' || selectedDevice === 'console'">Open Minecraft Bedrock Edition and go to <strong>Play</strong> → <strong>Servers</strong> or <strong>Friends</strong>.</li>
                                    <li>Enter the server address shown above.</li>
                                    <li>Use the port shown above, if applicable.</li>
                                    <li>Save and join the server.</li>
                                </ol>
                            </div>
                        </div>
                        <button class="reset-btn" @click="reset">Start over</button>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<style scoped>
.join-guide {
    margin: 24px 0;
}

.guide-card {
    border: 1px solid var(--vp-c-divider);
    border-radius: 22px;
    background: var(--vp-c-bg);
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.guide-header {
    padding: 24px 28px;
    background: linear-gradient(180deg, rgba(88, 91, 255, 0.16), transparent);
}

.guide-header h2 {
    margin: 0 0 8px;
}

.guide-header p {
    margin: 0;
    color: var(--vp-c-text-1);
}

.guide-body {
    padding: 24px 28px 28px;
}

.progress-bar-wrapper {
    margin-bottom: 20px;
}

.progress-bar {
    width: 100%;
    height: 10px;
    border-radius: 999px;
    background: var(--vp-c-divider);
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    border-radius: 999px;
    background: var(--vp-c-brand-1);
    transition: width 0.3s ease;
}

.progress-label {
    margin-top: 10px;
    color: var(--vp-c-text-1);
    font-size: 0.95rem;
}

.step-panel {
    display: grid;
    gap: 18px;
}

.grid-options {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
}

.option-card {
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    border-radius: 18px;
    padding: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 12px;
    cursor: pointer;
    transition: transform 0.2s ease, border-color 0.2s ease;
}

.option-card:hover {
    transform: translateY(-2px);
    border-color: var(--vp-c-brand-1);
}

.option-card img {
    width: 38px;
    height: 38px;
}

.option-card strong {
    display: block;
}

.option-card span {
    color: var(--vp-c-text-1);
    font-size: 0.95rem;
}

.option-card.compact {
    padding: 16px;
}

.os-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.back-link {
    cursor: pointer;
    color: var(--vp-c-brand-1);
    font-weight: 600;
}

.result-panel {
    display: grid;
    gap: 20px;
}

.result-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
}

.badge {
    padding: 6px 14px;
    border-radius: 999px;
    font-weight: 700;
}

.badge-java {
    background: rgba(53, 120, 229, 0.14);
    color: #355ce5;
}

.badge-bedrock {
    background: rgba(38, 163, 110, 0.14);
    color: #26a36e;
}

.info-grid {
    display: grid;
    gap: 16px;
}

.info-block {
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    border-radius: 16px;
    padding: 16px;
}

.info-block label {
    display: block;
    margin-bottom: 8px;
    color: var(--vp-c-text-1);
    font-size: 0.95rem;
}

.info-block code,
.info-block span {
    display: block;
    font-size: 1rem;
    font-weight: 600;
}

.instructions {
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    border-radius: 16px;
    padding: 18px;
}

.instructions h4 {
    margin: 0 0 12px;
}

.instructions ol {
    padding-left: 1.2rem;
    margin: 0;
}

.instructions li {
    margin-bottom: 10px;
}

.continue-btn,
.reset-btn {
    background: var(--vp-c-brand-1);
    color: white;
    border: none;
    border-radius: 14px;
    padding: 12px 20px;
    cursor: pointer;
    font-weight: 700;
}

.reset-btn {
    width: fit-content;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@media (max-width: 820px) {
    .grid-options,
    .os-grid {
        grid-template-columns: 1fr;
    }
}
</style>
