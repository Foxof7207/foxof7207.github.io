// Server address configuration for different editions
// Server address configuration for different editions
// Stores IP addresses and ports for Java/Bedrock connections
const serverData = {
    java: "mc.gillyb.net:25568",
    bedrock: "mc.gillyb.net:19132"
};

// Handles edition selection and UI updates
function switchEdition(edition) {
    const serverIP = document.getElementById('server-ip');
    const connectBedrockBtn = document.getElementById('connect-bedrock');
    const copyButton = document.querySelector('button[onclick="copyIP()"]');
    const javaBtn = document.getElementById('java-btn');
    const bedrockBtn = document.getElementById('bedrock-btn');

    serverIP.textContent = serverData[edition];
    connectBedrockBtn.style.display = edition === 'bedrock' ? 'inline-block' : 'none';
    copyButton.style.display = edition === 'java' ? 'inline-block' : 'none';
    javaBtn.classList.toggle('active', edition === 'java');
    bedrockBtn.classList.toggle('active', edition === 'bedrock');
}

// Copies server IP to clipboard with feedback
function copyIP(elementId) {
    const serverIP = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(serverIP)
        .then(() => {
            const copyMessage = document.getElementById('copy-message');
            copyMessage.textContent = 'IP copied to clipboard!';
            setTimeout(() => {
                copyMessage.textContent = '';
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy IP:', err);
        });
}

// Launches Bedrock connection protocol
function connectBedrock() {
    const serverIP = document.getElementById('bedrock-ip').textContent;
    try {
        window.location.href = `minecraft://?connect=${serverIP}`;
    } catch (error) {
        console.error('Bedrock connection failed:', error);
        alert('Failed to launch Bedrock Edition. Please ensure Minecraft is installed.');
    }
}

// Closes top announcement banner
function closeAnnouncement() {
    const banner = document.getElementById('announcement');
    banner.style.display = 'none';
}