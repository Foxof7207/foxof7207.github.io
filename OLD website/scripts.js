function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Update the copy IP function
document.getElementById('copy-ip-button').addEventListener('click', function() {
    const serverIP = document.getElementById('server-ip').value;
    navigator.clipboard.writeText(serverIP)
        .then(() => {
            showNotification('Server IP copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy IP:', err);
            showNotification('Failed to copy IP');
        });
});