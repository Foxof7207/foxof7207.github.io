<script setup lang="ts">
import { ref, computed } from "vue";
import { useData } from "vitepress";

const { lang } = useData();
const isFr = computed(() => lang.value.startsWith("fr"));

const t = computed(() =>
    isFr.value
        ? {
              stepOf: "Étape {step} sur 3",
              chooseDevice: "Choisissez votre appareil",
              devices: [
                  {
                      id: "pc",
                      name: "PC / Portable",
                      description: "Joueurs Java Edition sur ordinateur",
                  },
                  {
                      id: "mobile",
                      name: "Mobile / Tablette",
                      description:
                          "Édition Pocket/Bedrock sur appareils portables",
                  },
                  {
                      id: "console",
                      name: "Console",
                      description: "Xbox, PlayStation ou Nintendo Switch",
                  },
              ],
              goBack: "← Retour",
              subscriptionRequired: "⚠️ Abonnement requis",
              subscriptionText:
                  "Pour jouer en multijoueur sur console, vous devez avoir un abonnement payant actif pour votre plateforme :",
              subscriptionXbox: "Game Pass Core / Live Gold",
              subscriptionPS: "PlayStation Plus",
              subscriptionNintendo: "Nintendo Switch Online",
              understandContinue: "Je comprends, Continuer →",
              selectOS: "Sélectionnez le système d'exploitation",
              javaEdition: "Java Edition",
              bedrockEdition: "Bedrock Edition",
              consolePlayers: "Joueurs Console",
              howToConnectOn: "Comment se connecter sur",
              connectToGilly: "Se connecter à GillySMP",
              serverAddress: "Adresse du serveur",
              minecraftVersion: "Version Minecraft",
              port: "Port",
              gamertag: "Gamertag Minecraft",
              connectionSteps: "Étapes de connexion :",
              setupGuide: "Guide d'installation :",
              addFriend: "Ajouter un ami",
              manualIP: "IP manuelle",
              addAFriend: "Ajouter un ami",
              altMethod: "Méthode alternative",
              startOver: "Recommencer",
              // Java steps
              javaStep1: "Lancez Minecraft Java Edition",
              javaStep2: "Cliquez sur",
              javaStep2Bold: "Multijoueur",
              javaStep3: "Cliquez sur",
              javaStep3Bold: "Ajouter un serveur",
              javaStep4Prefix:
                  "Entrez le nom du serveur (ex: Gilly-SMP) et l'adresse :",
              javaStep5: "Enregistrez et double-cliquez pour rejoindre !",
              // Bedrock friend steps
              bedrockFriendStep1: "Ouvrez Minecraft",
              bedrockFriendStep2: "Cliquez sur Jouer",
              bedrockFriendStep3: "Allez dans l'onglet",
              bedrockFriendStep3Bold: "Amis",
              bedrockFriendStep3Suffix: ". (en haut à droite)",
              bedrockFriendStep4: "Cliquez sur",
              bedrockFriendStep4Bold: "Rechercher des joueurs",
              bedrockFriendStep5Prefix: "Recherchez",
              bedrockFriendStep5Suffix: "et cliquez sur",
              bedrockFriendStep5Bold: "Ajouter un ami",
              bedrockFriendStep6Prefix:
                  "Attendez un moment, le serveur apparaîtra sous",
              bedrockFriendStep6Bold: "Amis joignables",
              // Bedrock manual steps
              bedrockManualStep1: "Ouvrez Minecraft.",
              bedrockManualStep2: "Allez dans l'onglet",
              bedrockManualStep2Bold: "Serveurs",
              bedrockManualStep3Prefix: "Descendez et cliquez sur",
              bedrockManualStep3Bold: "Ajouter un serveur",
              bedrockManualStep4Prefix: "Entrez Nom :",
              bedrockManualStep4Address: ", Adresse :",
              bedrockManualStep4Port: ", Port :",
              bedrockManualStep5: "Cliquez sur",
              bedrockManualStep5Bold: "Enregistrer",
              bedrockManualStep5Suffix:
                  "et sélectionnez le serveur pour rejoindre !",
              // Console friend steps
              consoleFriendStep1:
                  "Ouvrez Minecraft sur votre console.",
              consoleFriendStep2: "Allez dans l'onglet",
              consoleFriendStep2Bold: "Amis",
              consoleFriendStep3: "Sélectionnez",
              consoleFriendStep3Bold:
                  "Trouver des amis multiplateformes",
              consoleFriendStep4Prefix: "Recherchez",
              consoleFriendStep4Suffix: "et cliquez sur",
              consoleFriendStep4Bold: "Ajouter un ami",
              consoleFriendStep5Prefix:
                  "Le serveur apparaîtra désormais sous",
              consoleFriendStep5Bold: "Amis joignables",
              consoleFriendStep5Suffix:
                  "chaque fois qu'il est en ligne !",
              // Console alternative
              netherlinkText:
                  "Utilisez l'application NetherLink sur votre téléphone pour établir la connexion avec votre console.",
              netherlinkStep1:
                  "Téléchargez et ouvrez NetherLink sur votre téléphone.",
              netherlinkStep2Prefix: "Entrez IP :",
              netherlinkStep2Port: "et Port :",
              netherlinkStep3: 'Sélectionnez le serveur "EU".',
              netherlinkStep4: "Appuyez sur",
              netherlinkStep4Bold: "Démarrer la diffusion",
              netherlinkStep5:
                  "Sur votre console, allez dans l'onglet Amis dans Minecraft.",
              netherlinkStep6Prefix: "Rejoignez",
              netherlinkStep6Suffix: "sous Jeux LAN !",
              netherlinkWarning:
                  "⚠️ Gardez l'application ouverte sur votre téléphone pendant le jeu pour rester connecté.",
          }
        : {
              stepOf: "Step {step} of 3",
              chooseDevice: "Choose your Device",
              devices: [
                  {
                      id: "pc",
                      name: "PC / Laptop",
                      description: "Java Edition players on computer",
                  },
                  {
                      id: "mobile",
                      name: "Mobile / Tablet",
                      description:
                          "Pocket/Bedrock edition on portable devices",
                  },
                  {
                      id: "console",
                      name: "Console",
                      description: "Xbox, PlayStation, or Nintendo Switch",
                  },
              ],
              goBack: "← Go back",
              subscriptionRequired: "⚠️ Subscription Required",
              subscriptionText:
                  "To play multiplayer on consoles, you must have an active paid subscription for your platform:",
              subscriptionXbox: "Game Pass Core / Live Gold",
              subscriptionPS: "PlayStation Plus",
              subscriptionNintendo: "Nintendo Switch Online",
              understandContinue: "I understand, Continue →",
              selectOS: "Select Operating System",
              javaEdition: "Java Edition",
              bedrockEdition: "Bedrock Edition",
              consolePlayers: "Console Players",
              howToConnectOn: "How to connect on",
              connectToGilly: "Connect to GillySMP",
              serverAddress: "Server Address",
              minecraftVersion: "Minecraft Version",
              port: "Port",
              gamertag: "Minecraft Gamertag",
              connectionSteps: "Connection Steps:",
              setupGuide: "Setup Guide:",
              addFriend: "Add Friend",
              manualIP: "Manual IP",
              addAFriend: "Add a friend",
              altMethod: "Alternative method",
              startOver: "Start Over",
              // Java steps
              javaStep1: "Launch Minecraft Java Edition",
              javaStep2: "Click on",
              javaStep2Bold: "Multiplayer",
              javaStep3: "Click",
              javaStep3Bold: "Add Server",
              javaStep4Prefix:
                  "Enter server name (e.g., Gilly-SMP) and address:",
              javaStep5: "Save and double-click to join!",
              // Bedrock friend steps
              bedrockFriendStep1: "Open Minecraft",
              bedrockFriendStep2: "Click on Play",
              bedrockFriendStep3: "Go to the",
              bedrockFriendStep3Bold: "Friends",
              bedrockFriendStep3Suffix: "tab. (top right)",
              bedrockFriendStep4: "Click",
              bedrockFriendStep4Bold: "Search for players",
              bedrockFriendStep5Prefix: "Search for",
              bedrockFriendStep5Suffix: "and click",
              bedrockFriendStep5Bold: "Add Friend",
              bedrockFriendStep6Prefix:
                  "Wait a moment, the server will appear under",
              bedrockFriendStep6Bold: "Joinable Friends",
              // Bedrock manual steps
              bedrockManualStep1: "Open Minecraft.",
              bedrockManualStep2: "Go to the",
              bedrockManualStep2Bold: "Servers",
              bedrockManualStep3Prefix: "Scroll down and click",
              bedrockManualStep3Bold: "Add Server",
              bedrockManualStep4Prefix: "Enter Name:",
              bedrockManualStep4Address: ", Address:",
              bedrockManualStep4Port: ", Port:",
              bedrockManualStep5: "Click",
              bedrockManualStep5Bold: "Save",
              bedrockManualStep5Suffix:
                  "and select the server to join!",
              // Console friend steps
              consoleFriendStep1:
                  "Open Minecraft on your console.",
              consoleFriendStep2: "Go to the",
              consoleFriendStep2Bold: "Friends",
              consoleFriendStep3: "Select",
              consoleFriendStep3Bold: "Find Cross-Platform Friends",
              consoleFriendStep4Prefix: "Search for",
              consoleFriendStep4Suffix: "and click",
              consoleFriendStep4Bold: "Add Friend",
              consoleFriendStep5Prefix:
                  "The server will now appear under",
              consoleFriendStep5Bold: "Joinable Friends",
              consoleFriendStep5Suffix:
                  "whenever it is online!",
              // Console alternative
              netherlinkText:
                  "Use the NetherLink app on your phone to bridge the connection to your console.",
              netherlinkStep1:
                  "Download and open NetherLink on your phone.",
              netherlinkStep2Prefix: "Enter IP:",
              netherlinkStep2Port: "and Port:",
              netherlinkStep3: 'Select "EU" server.',
              netherlinkStep4: "Tap",
              netherlinkStep4Bold: "Start Broadcasting",
              netherlinkStep5:
                  "On your console, go to Friends tab in Minecraft.",
              netherlinkStep6Prefix: "Join",
              netherlinkStep6Suffix: "under LAN Games!",
              netherlinkWarning:
                  "⚠️ Keep the app open on your phone during play to stay connected.",
          }
);

type DeviceType = "pc" | "mobile" | "console" | null;
type OS = "windows" | "macos" | "linux" | "android" | "ios" | null;

const step = ref(1);
const selectedDevice = ref<DeviceType>(null);
const selectedOS = ref<OS>(null);
const bedrockMethod = ref<"friend" | "manual">("friend");

const deviceIcons = {
    pc: "/icons/laptop.svg",
    mobile: "/icons/cellphone.svg",
    console: "/icons/gamepad.svg",
};

const osIcons = {
    windows: "/icons/windows.svg",
    macos: "/icons/apple.svg",
    linux: "/icons/linux.svg",
    android: "/icons/android.svg",
};

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
            { id: "ios", name: "iOS (iPhone/iPad)", icon: osIcons.macos },
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

const stepIndicator = computed(() =>
    t.value.stepOf.replace("{step}", String(step.value))
);
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
            <div class="step-indicator">{{ stepIndicator }}</div>
        </div>

        <Transition name="slide-fade" mode="out-in">
            <!-- Step 1: Device Selection -->
            <div v-if="step === 1" key="device" class="step-content">
                <h2 class="step-title">{{ t.chooseDevice }}</h2>
                <div class="grid-options">
                    <button
                        v-for="device in t.devices"
                        :key="device.id"
                        class="option-card"
                        @click="selectDevice(device.id as DeviceType)"
                    >
                        <img
                            :src="deviceIcons[device.id as keyof typeof deviceIcons]"
                            class="option-icon-img"
                            alt="icon"
                        />
                        <span class="option-name">{{ device.name }}</span>
                        <span class="option-desc">{{
                            device.description
                        }}</span>
                    </button>
                </div>
            </div>

            <!-- Step 2: OS Selection -->
            <div v-else-if="step === 2" key="step2" class="step-content">
                <div class="back-link" @click="step = 1">{{ t.goBack }}</div>

                <template v-if="selectedDevice === 'console'">
                    <h2 class="step-title">{{ t.subscriptionRequired }}</h2>
                    <div class="warning-box large-warning">
                        <p>{{ t.subscriptionText }}</p>
                        <ul>
                            <li>
                                <strong>Xbox:</strong> {{ t.subscriptionXbox }}
                            </li>
                            <li>
                                <strong>PlayStation:</strong> {{ t.subscriptionPS }}
                            </li>
                            <li>
                                <strong>Nintendo Switch:</strong> {{ t.subscriptionNintendo }}
                            </li>
                        </ul>
                    </div>
                    <button class="continue-btn" @click="step = 3">
                        {{ t.understandContinue }}
                    </button>
                </template>

                <template v-else>
                    <h2 class="step-title">{{ t.selectOS }}</h2>
                    <div class="grid-options os-grid">
                        <button
                            v-for="os in osOptions"
                            :key="os.id"
                            class="option-card compact"
                            @click="selectOS(os.id as OS)"
                        >
                            <img
                                :src="os.icon"
                                class="option-icon-img small"
                                alt="icon"
                            />
                            <span class="option-name">{{ os.name }}</span>
                        </button>
                    </div>
                </template>
            </div>

            <!-- Step 3: Result -->
            <div v-else-if="step === 3" key="result" class="step-content">
                <div class="back-link" @click="step = 2">{{ t.goBack }}</div>

                <!-- Java Edition Result -->
                <div v-if="selectedDevice === 'pc'" class="result-display">
                    <div class="result-header">
                        <span class="platform-badge badge-java"
                            >{{ t.javaEdition }}</span
                        >
                        <h2>{{ t.howToConnectOn }} {{ selectedOS }}</h2>
                    </div>

                    <div class="info-grid">
                        <div class="info-item">
                            <label>{{ t.serverAddress }}</label>
                            <code>{{ serverInfo.java.address }}</code>
                        </div>
                        <div class="info-item">
                            <label>{{ t.minecraftVersion }}</label>
                            <span>{{ serverInfo.java.version }}</span>
                        </div>
                    </div>

                    <div class="instructions">
                        <h3>{{ t.connectionSteps }}</h3>
                        <ol>
                            <li>
                                {{ t.javaStep1 }}
                                <strong>{{ serverInfo.java.version }}</strong>.
                            </li>
                            <li>{{ t.javaStep2 }} <strong>{{ t.javaStep2Bold }}</strong>.</li>
                            <li>{{ t.javaStep3 }} <strong>{{ t.javaStep3Bold }}</strong>.</li>
                            <li>
                                {{ t.javaStep4Prefix }}
                                <code>{{ serverInfo.java.address }}</code>.
                            </li>
                            <li>{{ t.javaStep5 }}</li>
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
                            >{{ t.bedrockEdition }}</span
                        >
                        <h2>
                            {{ t.howToConnectOn }}
                            {{ selectedOS === "ios" ? "iOS" : "Android" }}
                        </h2>
                    </div>

                    <div class="method-tabs">
                        <button
                            class="method-tab"
                            :class="{ active: bedrockMethod === 'friend' }"
                            @click="bedrockMethod = 'friend'"
                        >
                            <span class="tab-icon">👥</span>
                            <span class="tab-label">{{ t.addFriend }}</span>
                        </button>
                        <button
                            class="method-tab"
                            :class="{ active: bedrockMethod === 'manual' }"
                            @click="bedrockMethod = 'manual'"
                        >
                            <span class="tab-icon">⚙️</span>
                            <span class="tab-label">{{ t.manualIP }}</span>
                        </button>
                    </div>

                    <div
                        v-if="bedrockMethod === 'friend'"
                        class="method-content"
                    >
                        <div class="info-grid single">
                            <div class="info-item centered">
                                <label>{{ t.gamertag }}</label>
                                <code>GillySMP</code>
                            </div>
                        </div>

                        <div class="instructions">
                            <h3>{{ t.connectionSteps }}</h3>
                            <ol>
                                <li>{{ t.bedrockFriendStep1 }}</li>
                                <li>{{ t.bedrockFriendStep2 }}</li>
                                <li>
                                    {{ t.bedrockFriendStep3 }} <strong>{{ t.bedrockFriendStep3Bold }}</strong> {{ t.bedrockFriendStep3Suffix }}
                                </li>
                                <li>
                                    {{ t.bedrockFriendStep4 }} <strong>{{ t.bedrockFriendStep4Bold }}</strong>.
                                </li>
                                <li>
                                    {{ t.bedrockFriendStep5Prefix }} <code>GillySMP</code> {{ t.bedrockFriendStep5Suffix }}
                                    <strong>{{ t.bedrockFriendStep5Bold }}</strong>.
                                </li>
                                <li>
                                    {{ t.bedrockFriendStep6Prefix }}
                                    <strong>{{ t.bedrockFriendStep6Bold }}</strong>!
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div v-else class="method-content">
                        <div class="info-grid">
                            <div class="info-item">
                                <label>{{ t.serverAddress }}</label>
                                <code>{{ serverInfo.bedrock.address }}</code>
                            </div>
                            <div class="info-item">
                                <label>{{ t.port }}</label>
                                <code>{{ serverInfo.bedrock.port }}</code>
                            </div>
                        </div>

                        <div class="instructions">
                            <h3>{{ t.connectionSteps }}</h3>
                            <ol>
                                <li>{{ t.bedrockManualStep1 }}</li>
                                <li>{{ t.bedrockManualStep2 }} <strong>{{ t.bedrockManualStep2Bold }}</strong>.</li>
                                <li>
                                    {{ t.bedrockManualStep3Prefix }}
                                    <strong>{{ t.bedrockManualStep3Bold }}</strong>.
                                </li>
                                <li>
                                    {{ t.bedrockManualStep4Prefix }} <code>GillySMP</code>{{ t.bedrockManualStep4Address }}
                                    <code>{{ serverInfo.bedrock.address }}</code>{{ t.bedrockManualStep4Port }}
                                    <code>{{ serverInfo.bedrock.port }}</code>.
                                </li>
                                <li>
                                    {{ t.bedrockManualStep5 }} <strong>{{ t.bedrockManualStep5Bold }}</strong> {{ t.bedrockManualStep5Suffix }}
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
                            >{{ t.consolePlayers }}</span
                        >
                        <h2>{{ t.connectToGilly }}</h2>
                    </div>

                    <div class="method-tabs">
                        <button
                            class="method-tab"
                            :class="{ active: bedrockMethod === 'friend' }"
                            @click="bedrockMethod = 'friend'"
                        >
                            <span class="tab-icon">👥</span>
                            <span class="tab-label">{{ t.addAFriend }}</span>
                        </button>
                        <button
                            class="method-tab"
                            :class="{ active: bedrockMethod === 'manual' }"
                            @click="bedrockMethod = 'manual'"
                        >
                            <span class="tab-icon">⚙️</span>
                            <span class="tab-label">{{ t.altMethod }}</span>
                        </button>
                    </div>

                    <div
                        v-if="bedrockMethod === 'friend'"
                        class="method-content"
                    >
                        <div class="info-grid single">
                            <div class="info-item centered">
                                <label>{{ t.gamertag }}</label>
                                <code>GillySMP</code>
                            </div>
                        </div>

                        <div class="instructions">
                            <h3>{{ t.connectionSteps }}</h3>
                            <ol>
                                <li>{{ t.consoleFriendStep1 }}</li>
                                <li>{{ t.consoleFriendStep2 }} <strong>{{ t.consoleFriendStep2Bold }}</strong>.</li>
                                <li>
                                    {{ t.consoleFriendStep3 }}
                                    <strong>{{ t.consoleFriendStep3Bold }}</strong>.
                                </li>
                                <li>
                                    {{ t.consoleFriendStep4Prefix }} <code>GillySMP</code> {{ t.consoleFriendStep4Suffix }}
                                    <strong>{{ t.consoleFriendStep4Bold }}</strong>.
                                </li>
                                <li>
                                    {{ t.consoleFriendStep5Prefix }}
                                    <strong>{{ t.consoleFriendStep5Bold }}</strong>
                                    {{ t.consoleFriendStep5Suffix }}
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div v-else class="method-content">
                        <p class="summary-text">
                            {{ t.netherlinkText }}
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
                            <h3>{{ t.setupGuide }}</h3>
                            <ol>
                                <li>{{ t.netherlinkStep1 }}</li>
                                <li>
                                    {{ t.netherlinkStep2Prefix }}
                                    <code>{{ serverInfo.bedrock.address }}</code>
                                    {{ t.netherlinkStep2Port }}
                                    <code>{{ serverInfo.bedrock.port }}</code>.
                                </li>
                                <li>{{ t.netherlinkStep3 }}</li>
                                <li>
                                    {{ t.netherlinkStep4 }} <strong>{{ t.netherlinkStep4Bold }}</strong>.
                                </li>
                                <li>{{ t.netherlinkStep5 }}</li>
                                <li>
                                    {{ t.netherlinkStep6Prefix }} <strong>GillySMP</strong> {{ t.netherlinkStep6Suffix }}
                                </li>
                            </ol>
                            <div class="warning-box">
                                {{ t.netherlinkWarning }}
                            </div>
                        </div>
                    </div>
                </div>

                <button class="reset-btn" @click="reset">{{ t.startOver }}</button>
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

.option-icon-img {
    height: 32px;
    width: 32px;
    object-fit: contain;
}

.option-icon-img.small {
    height: 24px;
    width: 24px;
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
    cursor: pointer;
    border: none;
    background: transparent;
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

.large-warning {
    font-size: 16px;
    padding: 16px;
    margin-bottom: 24px;
}
.large-warning ul {
    margin-top: 12px;
    padding-left: 20px;
}
.large-warning li {
    margin-bottom: 6px;
}

.continue-btn {
    background: var(--vp-c-brand-1);
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
.continue-btn:hover {
    background: var(--vp-c-brand-2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
