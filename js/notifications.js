// Notification System for Cassie Clip User Dashboard

// Initialize notification system
function initializeNotificationSystem() {
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
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const container = document.querySelector('.notification-container');
    const notification = document.createElement('div');
    
    const colors = {
        success: 'linear-gradient(135deg, #57f287, #43b581)',
        error: 'linear-gradient(135deg, #f85149, #da3633)',
        info: 'linear-gradient(135deg, #5865f2, #4752c4)',
        warning: 'linear-gradient(135deg, #fee75c, #f59e0b)'
    };
    
    notification.style.cssText = `
        background: ${colors[type]};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        font-weight: 500;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
        cursor: pointer;
    `;
    
    notification.textContent = message;
    
    // Add animation keyframes to document if not already added
    if (!document.querySelector('#user-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'user-notification-styles';
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
    
    // Auto remove notification
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
    
    // Allow manual dismissal
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Initialize notification button functionality for user dashboard
function initializeUserNotificationButton() {
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showUserNotificationPanel();
        });
    }
}

// Show user notification panel
function showUserNotificationPanel() {
    // Remove existing panel if it exists
    const existingPanel = document.querySelector('.notification-panel');
    if (existingPanel) {
        existingPanel.remove();
        return;
    }

    // Clear notification count when opening panel
    const notificationCount = document.querySelector('.notification-count');
    if (notificationCount) {
        notificationCount.textContent = '0';
        notificationCount.style.animation = 'pulse 0.3s ease-out';
    }

    const panel = document.createElement('div');
    panel.className = 'notification-panel';
    
    // Get notification button position for proper placement
    const notificationBtn = document.querySelector('.notification-btn');
    const btnRect = notificationBtn.getBoundingClientRect();
    
    panel.style.cssText = `
        position: fixed;
        top: ${btnRect.bottom + 10}px;
        right: ${window.innerWidth - btnRect.right}px;
        width: 320px;
        max-width: calc(100vw - 40px);
        max-height: 400px;
        background: #1e2125;
        border: 1px solid #40484f;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        overflow: hidden;
        animation: slideInDown 0.3s ease-out;
        transform-origin: top right;
    `;

    panel.innerHTML = `
        <div class="p-4 border-b border-[#40484f]">
            <div class="flex items-center justify-between">
                <h3 class="text-white font-semibold">Your Notifications</h3>
                <button class="clear-all-btn text-[#a2abb4] text-sm hover:text-white">Clear All</button>
            </div>
        </div>
        <div class="notification-list max-h-80 overflow-y-auto">
            <div class="notification-item p-4 border-b border-[#40484f] hover:bg-[#2b3136] cursor-pointer">
                <div class="flex items-start gap-3">
                    <div class="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <div class="flex-1">
                        <p class="text-white text-sm font-medium">Daily Quests Available</p>
                        <p class="text-[#a2abb4] text-xs mt-1">Complete your dailies for V-Bucks rewards</p>
                        <p class="text-[#a2abb4] text-xs mt-1">5 minutes ago</p>
                    </div>
                </div>
            </div>
            <div class="notification-item p-4 border-b border-[#40484f] hover:bg-[#2b3136] cursor-pointer">
                <div class="flex items-start gap-3">
                    <div class="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <div class="flex-1">
                        <p class="text-white text-sm font-medium">Hero XP Gained</p>
                        <p class="text-[#a2abb4] text-xs mt-1">Earned 15,000 Hero XP from mission completion</p>
                        <p class="text-[#a2abb4] text-xs mt-1">12 minutes ago</p>
                    </div>
                </div>
            </div>
            <div class="notification-item p-4 border-b border-[#40484f] hover:bg-[#2b3136] cursor-pointer">
                <div class="flex items-start gap-3">
                    <div class="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <div class="flex-1">
                        <p class="text-white text-sm font-medium">Venture Level Progress</p>
                        <p class="text-[#a2abb4] text-xs mt-1">You're 75% to your next Venture level</p>
                        <p class="text-[#a2abb4] text-xs mt-1">30 minutes ago</p>
                    </div>
                </div>
            </div>
            <div class="notification-item p-4 border-b border-[#40484f] hover:bg-[#2b3136] cursor-pointer">
                <div class="flex items-start gap-3">
                    <div class="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <div class="flex-1">
                        <p class="text-white text-sm font-medium">Storm Shield Defense</p>
                        <p class="text-[#a2abb4] text-xs mt-1">Your Twine Peaks SSD is ready for expansion</p>
                        <p class="text-[#a2abb4] text-xs mt-1">1 hour ago</p>
                    </div>
                </div>
            </div>
            <div class="notification-item p-4 hover:bg-[#2b3136] cursor-pointer">
                <div class="flex items-start gap-3">
                    <div class="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                    <div class="flex-1">
                        <p class="text-white text-sm font-medium">Weekly Reset</p>
                        <p class="text-[#a2abb4] text-xs mt-1">Weekly challenges and venture missions refreshed</p>
                        <p class="text-[#a2abb4] text-xs mt-1">2 hours ago</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-3 border-t border-[#40484f] bg-[#1a1d21]">
            <button class="view-all-btn w-full text-[#5865f2] text-sm font-medium hover:text-[#4752c4]">View All Notifications</button>
        </div>
    `;

    document.body.appendChild(panel);

    // Add event listeners
    const clearAllBtn = panel.querySelector('.clear-all-btn');
    clearAllBtn.addEventListener('click', function() {
        showNotification('All notifications cleared', 'success');
        panel.remove();
    });

    const viewAllBtn = panel.querySelector('.view-all-btn');
    viewAllBtn.addEventListener('click', function() {
        showNotification('Opening notification center...', 'info');
        panel.remove();
    });

    // Add click handlers for individual notifications
    const notificationItems = panel.querySelectorAll('.notification-item');
    notificationItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.font-medium').textContent;
            showNotification(`Opening: ${title}`, 'info');
            
            // Mark as read (fade the indicator)
            const indicator = this.querySelector('.rounded-full');
            indicator.style.opacity = '0.3';
            
            panel.remove();
        });
    });

    // Close panel when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closePanel(e) {
            if (!panel.contains(e.target) && !e.target.closest('.notification-btn')) {
                panel.remove();
                document.removeEventListener('click', closePanel);
            }
        });
    }, 100);

    // Add animation styles if not already added
    if (!document.querySelector('#user-notification-panel-styles')) {
        const style = document.createElement('style');
        style.id = 'user-notification-panel-styles';
        style.textContent = `
            @keyframes slideInDown {
                from { 
                    transform: translateY(-10px) scale(0.95); 
                    opacity: 0; 
                }
                to { 
                    transform: translateY(0) scale(1); 
                    opacity: 1; 
                }
            }
            
            .notification-list::-webkit-scrollbar {
                width: 4px;
            }
            
            .notification-list::-webkit-scrollbar-track {
                background: #2b3136;
            }
            
            .notification-list::-webkit-scrollbar-thumb {
                background: #40484f;
                border-radius: 2px;
            }
            
            .notification-list::-webkit-scrollbar-thumb:hover {
                background: #5865f2;
            }
        `;
        document.head.appendChild(style);
    }
}

// Update notification count
function updateNotificationCount() {
    const notificationCount = document.querySelector('.notification-count');
    if (notificationCount && Math.random() > 0.7) {
        const currentCount = parseInt(notificationCount.textContent);
        notificationCount.textContent = Math.min(currentCount + 1, 9);
        
        // Add pulse effect
        notificationCount.style.animation = 'pulse 0.5s ease-in-out';
        setTimeout(() => {
            notificationCount.style.animation = '';
        }, 500);
    }
}
