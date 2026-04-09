<script setup lang="ts">
import { ref, computed } from "vue";

type DeviceType = "pc" | "mobile" | "console" | null;
type OS = "windows" | "macos" | "linux" | "android" | "ios" | null;

const step = ref(1);
const selectedDevice = ref<DeviceType>(null);
const selectedOS = ref<OS>(null);
const bedrockMethod = ref<"friend" | "manual">("friend");

const devices = [
    {
        id: "pc",
        name: "PC / Laptop",
        icon: "💻",
        description: "Java Edition players on computer",
    },
    {
        id: "mobile",
        name: "Mobile / Tablet",
        icon: "📱",
        description: "Pocket/Bedrock edition on portable devices",
    },
    {
        id: "console",
        name: "Console",
        icon: "🎮",
        description: "Xbox, PlayStation, or Nintendo Switch",
    },
];

const osOptions = computed(() => {
    if (selectedDevice.value === "pc") {
        return [
            { id: "windows", name: "Windows" },
            { id: "macos", name: "macOS" },
            { id: "linux", name: "Linux" },
        ];
    }
    if (selectedDevice.value === "mobile") {
        return [
            { id: "android", name: "Android" },
            { id: "ios", name: "iOS (iPhone/iPad)" },
        ];
    }
    return [];
});

const selectDevice = (id: DeviceType) => {
    selectedDevice.value = id;
    if (id === "console") {
        step.value = 3; // Consoles don't need OS selection in this guide
    } else {
        step.value = 2;
    }
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
        version: "26.1",
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
        <div class="guide-header">
            <div class="progress-bar">
                <div
                    class="progress"
                    :style="{ width: (step / 3) * 100 + '%' }"
                ></div>
            </div>
            <div class="step-indicator">Step {{ step }} of 3</div>
        </div>

        <Transition name="slide-fade" mode="out-in">
            <!-- Step 1: Device Selection -->
            <div v-if="step === 1" key="device" class="step-content">
                <h2 class="step-title">Choose your Device</h2>
                <div class="grid-options">
                    <button
                        v-for="device in devices"
                        :key="device.id"
                        class="option-card"
                        @click="selectDevice(device.id as DeviceType)"
                    >
                        <span class="option-icon">{{ device.icon }}</span>
                        <span class="option-name">{{ device.name }}</span>
                        <span class="option-desc">{{
                            device.description
                        }}</span>
                    </button>
                </div>
            </div>

            <!-- Step 2: OS Selection -->
            <div v-else-if="step === 2" key="os" class="step-content">
                <div class="back-link" @click="step = 1">← Go back</div>
                <h2 class="step-title">Select Operating System</h2>
                <div class="grid-options os-grid">
                    <button
                        v-for="os in osOptions"
                        :key="os.id"
                        class="option-card compact"
                        @click="selectOS(os.id as OS)"
                    >
                        <span class="option-icon small"></span>
                        <span class="option-name">{{ os.name }}</span>
                    </button>
                </div>
            </div>

            <!-- Step 3: Result -->
            <div v-else-if="step === 3" key="result" class="step-content">
                <div
                    class="back-link"
                    @click="
                        selectedDevice === 'console' ? (step = 1) : (step = 2)
                    "
                >
                    ← Go back
                </div>

                <!-- Java Edition Result -->
                <div v-if="selectedDevice === 'pc'" class="result-display">
                    <div class="result-header">
                        <span class="platform-badge badge-java"
                            >Java Edition</span
                        >
                        <h2>How to connect on {{ selectedOS }}</h2>
                    </div>

                    <div class="info-grid">
                        <div class="info-item">
                            <label>Server Address</label>
                            <code>{{ serverInfo.java.address }}</code>
                        </div>
                        <div class="info-item">
                            <label>Minecraft Version</label>
                            <span>{{ serverInfo.java.version }}</span>
                        </div>
                    </div>

                    <div class="instructions">
                        <h3>Connection Steps:</h3>
                        <ol>
                            <li>
                                Launch Minecraft Java Edition
                                <strong>{{ serverInfo.java.version }}</strong
                                >.
                            </li>
                            <li>Click on <strong>Multiplayer</strong>.</li>
                            <li>Click <strong>Add Server</strong>.</li>
                            <li>
                                Enter server name (e.g., Gilly-SMP) and address:
                                <code>{{ serverInfo.java.address }}</code
                                >.
                            </li>
                            <li>Save and double-click to join!</li>
                        </ol>
                    </div>
                </div>

                <!-- Bedrock Result (Mobile) -->
                <div
                    v-else-if="selectedDevice === 'mobile'"
                    class="result-display"
                >
                    <div class="result-header">
                        <span class="platform-badge badge-bedrock"
                            >Bedrock Edition</span
                        >
                        <h2>
                            How to connect on
                            {{ selectedOS === "ios" ? "iOS" : "Android" }}
                        </h2>
                    </div>

                    <div class="method-tabs">
                        <button
                            class="method-tab"
                            :class="{ active: bedrockMethod === 'friend' }"
                            @click="bedrockMethod = 'friend'"
                        >
                            <span class="tab-icon"></span>
                            <span class="tab-label">Add Friend</span>
                        </button>
                        <button
                            class="method-tab"
                            :class="{ active: bedrockMethod === 'manual' }"
                            @click="bedrockMethod = 'manual'"
                        >
                            <span class="tab-icon"></span>
                            <span class="tab-label">Manual IP</span>
                        </button>
                    </div>

                    <div
                        v-if="bedrockMethod === 'friend'"
                        class="method-content"
                    >
                        <div class="info-grid single">
                            <div class="info-item centered">
                                <label>Minecraft Gamertag</label>
                                <code>GillySMP</code>
                            </div>
                        </div>

                        <div class="instructions">
                            <h3>Connection Steps:</h3>
                            <ol>
                                <li>Open Minecraft</li>
                                <li>Click on Play</li>
                                <li>
                                    Go to the <strong>Friends</strong> tab. (top
                                    right)
                                </li>
                                <li>
                                    Click <strong>Search for players</strong>.
                                </li>
                                <li>
                                    Search for <code>GillySMP</code> and click
                                    <strong>Add Friend</strong>.
                                </li>
                                <li>
                                    Wait a moment, the server will appear under
                                    <strong>Joinable Friends</strong>!
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div v-else class="method-content">
                        <div class="info-grid">
                            <div class="info-item">
                                <label>Server Address</label>
                                <code>{{ serverInfo.bedrock.address }}</code>
                            </div>
                            <div class="info-item">
                                <label>Port</label>
                                <code>{{ serverInfo.bedrock.port }}</code>
                            </div>
                        </div>

                        <div class="instructions">
                            <h3>Connection Steps:</h3>
                            <ol>
                                <li>Open Minecraft.</li>
                                <li>Go to the <strong>Servers</strong> tab.</li>
                                <li>
                                    Scroll down and click
                                    <strong>Add Server</strong>.
                                </li>
                                <li>
                                    Enter Name: <code>Gilly-SMP</code>, Address:
                                    <code>{{ serverInfo.bedrock.address }}</code
                                    >, Port:
                                    <code>{{ serverInfo.bedrock.port }}</code
                                    >.
                                </li>
                                <li>
                                    Click <strong>Save</strong> and select the
                                    server to join!
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>

                <!-- Console Result -->
                <div
                    v-else-if="selectedDevice === 'console'"
                    class="result-display"
                >
                    <div class="result-header">
                        <span class="platform-badge badge-console"
                            >Console Players</span
                        >
                        <h2>Connect to Gilly-SMP</h2>
                    </div>

                    <div class="method-tabs">
                        <button
                            class="method-tab"
                            :class="{ active: bedrockMethod === 'friend' }"
                            @click="bedrockMethod = 'friend'"
                        >
                            <span class="tab-icon"></span>
                            <span class="tab-label">Add a friend</span>
                        </button>
                        <button
                            class="method-tab"
                            :class="{ active: bedrockMethod === 'manual' }"
                            @click="bedrockMethod = 'manual'"
                        >
                            <span class="tab-icon"></span>
                            <span class="tab-label">Alternative method</span>
                        </button>
                    </div>

                    <div
                        v-if="bedrockMethod === 'friend'"
                        class="method-content"
                    >
                        <div class="info-grid single">
                            <div class="info-item centered">
                                <label>Minecraft Gamertag</label>
                                <code>GillySMP</code>
                            </div>
                        </div>

                        <div class="instructions">
                            <h3>Connection Steps:</h3>
                            <ol>
                                <li>Open Minecraft on your console.</li>
                                <li>Go to the <strong>Friends</strong> tab.</li>
                                <li>
                                    Select
                                    <strong>Find Cross-Platform Friends</strong
                                    >.
                                </li>
                                <li>
                                    Search for <code>Gilly-SMP</code> and click
                                    <strong>Add Friend</strong>.
                                </li>
                                <li>
                                    The server will now appear under
                                    <strong>Joinable Friends</strong> whenever
                                    it is online!
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div v-else class="method-content">
                        <p class="summary-text">
                            Use the <strong>NetherLink</strong> app on your
                            phone to bridge the connection to your console.
                        </p>

                        <div class="download-links">
                            <a
                                href="https://play.google.com/store/apps/details?id=net.netherdev.netherLink"
                                target="_blank"
                                class="download-btn google"
                            >
                                <span>Google Play</span>
                            </a>
                            <a
                                href="https://apps.apple.com/be/app/netherlink/id6747323142"
                                target="_blank"
                                class="download-btn apple"
                            >
                                <span>App Store</span>
                            </a>
                        </div>

                        <div class="instructions">
                            <h3>Setup Guide:</h3>
                            <ol>
                                <li>
                                    Download and open **NetherLink** on your
                                    phone.
                                </li>
                                <li>
                                    Enter IP:
                                    <code>{{
                                        serverInfo.bedrock.address
                                    }}</code>
                                    and Port:
                                    <code>{{ serverInfo.bedrock.port }}</code
                                    >.
                                </li>
                                <li>Select <strong>"EU" server</strong>.</li>
                                <li>
                                    Tap <strong>Start Broadcasting</strong>.
                                </li>
                                <li>
                                    On your console, go to
                                    <strong>Friends</strong> tab in Minecraft.
                                </li>
                                <li>
                                    Join <strong>Gilly-SMP</strong> under LAN
                                    Games!
                                </li>
                            </ol>
                            <div class="warning-box">
                                ⚠️ Keep the app open on your phone during play
                                to stay connected.
                            </div>
                        </div>
                    </div>
                </div>

                <button class="reset-btn" @click="reset">Start Over</button>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.join-guide {
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    border-radius: 16px;
    padding: 24px;
    margin: 32px 0;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
    overflow: hidden;
}

.guide-header {
    margin-bottom: 24px;
}

.progress-bar {
    height: 6px;
    background: var(--vp-c-divider);
    border-radius: 3px;
    margin-bottom: 8px;
    overflow: hidden;
}

.progress {
    height: 100%;
    background: linear-gradient(
        90deg,
        var(--vp-c-brand-1),
        var(--vp-c-brand-2)
    );
    transition: width 0.4s ease;
}

.step-indicator {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--vp-c-text-2);
    letter-spacing: 0.05em;
}

.step-title {
    margin-top: 0;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 24px;
    border-bottom: none;
}

.grid-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
}

.os-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

.option-card {
    background: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

.option-card:hover {
    border-color: var(--vp-c-brand-1);
    background: var(--vp-c-brand-soft);
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.option-card.compact {
    padding: 16px;
    flex-direction: row;
    justify-content: center;
}

.option-icon {
    font-size: 32px;
}

.option-icon.small {
    font-size: 24px;
}

.option-name {
    font-size: 18px;
    font-weight: 700;
    color: var(--vp-c-text-1);
}

.option-desc {
    font-size: 13px;
    color: var(--vp-c-text-2);
    line-height: 1.4;
}

.back-link {
    color: var(--vp-c-brand-1);
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 16px;
    cursor: pointer;
    display: inline-block;
}

.back-link:hover {
    text-decoration: underline;
}

/* Result Styles */
.result-display {
    animation: fade-in 0.5s ease;
}

.result-header {
    margin-bottom: 24px;
}

.platform-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 8px;
}

.badge-java {
    background: #52c41a;
    color: white;
}
.badge-bedrock {
    background: #1890ff;
    color: white;
}
.badge-console {
    background: #722ed1;
    color: white;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
}

.info-item {
    background: var(--vp-c-bg);
    padding: 12px;
    border-radius: 8px;
    border: 1px solid var(--vp-c-divider);
}

.info-item label {
    display: block;
    font-size: 11px;
    text-transform: uppercase;
    color: var(--vp-c-text-2);
    margin-bottom: 4px;
}

.info-item code,
.info-item span {
    font-size: 16px;
    font-weight: 600;
    color: var(--vp-c-brand-1);
}

.info-item.centered {
    text-align: center;
    padding: 24px;
}

.info-item.centered code {
    font-size: 24px;
    display: block;
    margin: 8px 0;
}

.sub-label {
    font-size: 13px;
    color: var(--vp-c-text-2);
    margin: 0;
}

.info-grid.single {
    grid-template-columns: 1fr;
}

.method-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    background: var(--vp-c-bg-mute);
    padding: 4px;
    border-radius: 12px;
}

.method-tab {
    flex: 1;
    padding: 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: 600;
    font-size: 14px;
    color: var(--vp-c-text-2);
    transition: all 0.2s ease;
}

.method-tab:hover {
    color: var(--vp-c-text-1);
}

.method-tab.active {
    background: var(--vp-c-bg);
    color: var(--vp-c-brand-1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tab-icon {
    font-size: 18px;
}

.instructions h3 {
    font-size: 18px;
    margin-bottom: 12px;
    border: none;
}

.instructions ol {
    padding-left: 20px;
}

.instructions li {
    margin-bottom: 12px;
    line-height: 1.6;
}

.warning-box {
    background: rgba(255, 197, 61, 0.1);
    border: 1px solid #faad14;
    padding: 12px;
    border-radius: 8px;
    margin-top: 16px;
    font-size: 14px;
    color: #d48806;
}

.dark .warning-box {
    color: #ffc53d;
}

.download-links {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    flex-wrap: wrap;
}

.download-btn {
    padding: 10px 20px;
    border-radius: 8px;
    text-decoration: none !important;
    font-weight: 600;
    display: flex;
    align-items: center;
    transition: opacity 0.2s;
}

.download-btn.google {
    background: #34a853;
    color: white;
}
.download-btn.apple {
    background: #000;
    color: white;
}

.download-btn:hover {
    opacity: 0.9;
}

.reset-btn {
    margin-top: 24px;
    background: transparent;
    border: 1px solid var(--vp-c-divider);
    color: var(--vp-c-text-2);
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;
}

.reset-btn:hover {
    background: var(--vp-c-bg-mute);
    color: var(--vp-c-text-1);
}

/* Transitions */
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 640px) {
    .grid-options {
        grid-template-columns: 1fr;
    }
}
</style>
