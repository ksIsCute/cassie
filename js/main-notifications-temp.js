// Main Page Notifications for Cassie Clip

// Initialize notification system for main page
function initializeNotifications() {
    try {
        // Create notification container if it doesn't exist
        if (!document.querySelector('.notification-container')) {
            const container = document.createElement('div');
            container.className = 'notification-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
            document.body.appendChild(container);
            console.log('Notification container created');
        }
    } catch (error) {
        console.error('Error initializing notifications:', error);
    }
}

// Show notification for main page
function showNotification(message, type = 'info') {
    try {
        let container = document.querySelector('.notification-container');
        if (!container) {
            console.warn('Notification container not found, creating one...');
            initializeNotifications();
            container = document.querySelector('.notification-container');
        }
        
        if (!container) {
            console.error('Could not create notification container, using fallback');
            alert(`${type.toUpperCase()}: ${message}`);
            return;
        }
        
        const notification = document.createElement('div');
        
        const colors = {
            success: 'linear-gradient(135deg, #57f287, #43b581)',
            error: 'linear-gradient(135deg, #f85149, #da3633)',
            info: 'linear-gradient(135deg, #5865f2, #4752c4)',
            warning: 'linear-gradient(135deg, #fee75c, #f59e0b)'
        };
        
        notification.style.cssText = `
            background: ${colors[type] || colors.info};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            font-weight: 500;
            max-width: 300px;
            animation: slideInRight 0.3s ease-out;
            cursor: pointer;
            word-wrap: break-word;
        `;
        
        notification.textContent = message || 'Notification';
        
        // Add animation keyframes to document if not already added
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        container.appendChild(notification);
        console.log(`Notification shown: ${message}`);
        
        // Auto-remove notification after 5 seconds
        setTimeout(() => {
            if (notification && notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
        
        // Click to dismiss
        notification.addEventListener('click', function() {
            if (this.parentNode) {
                this.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => {
                    if (this.parentNode) {
                        this.parentNode.removeChild(this);
                    }
                }, 300);
            }
        });
        
    } catch (error) {
        console.error('Error showing notification:', error);
        // Fallback to alert if notification system fails
        try {
            alert(`${type.toUpperCase()}: ${message}`);
        } catch (alertError) {
            console.error('Could not show alert either:', alertError);
        }
    }
}

// Update notification badge (simplified version)
function updateNotificationBadge() {
    try {
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            const count = Math.floor(Math.random() * 5) + 1;
            badge.textContent = count;
            badge.style.display = count > 0 ? 'block' : 'none';
        }
    } catch (error) {
        console.error('Error updating notification badge:', error);
    }
}

// Start periodic notifications (disabled for debugging)
function startPeriodicNotifications() {
    console.log('Periodic notifications disabled for debugging');
    return; // Temporarily disabled to prevent crashes
}

// Show random notifications (disabled)
function showRandomNotification() {
    console.log('Random notifications disabled for debugging');
    return;
}

// Initialize notification button
function initializeNotificationButton() {
    try {
        const notificationBtn = document.querySelector('.notification-btn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', function() {
                showNotification('Notification center opened', 'info');
            });
            console.log('Notification button initialized');
        }
    } catch (error) {
        console.error('Error initializing notification button:', error);
    }
}

// Make functions globally available
window.initializeNotifications = initializeNotifications;
window.showNotification = showNotification;
window.updateNotificationBadge = updateNotificationBadge;
window.startPeriodicNotifications = startPeriodicNotifications;
window.initializeNotificationButton = initializeNotificationButton;

console.log('main-notifications.js loaded successfully');
