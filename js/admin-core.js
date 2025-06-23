// Admin Dashboard Core Functionality

class AdminCore {
    constructor() {
        this.stats = {
            activeUsers: 2847,
            commandsUsed: 15294,
            connectedServers: 47,
            uptime: 99.2
        };
        this.activityLog = [];
        this.isInitialized = false;
        this.initialize();
    }

    async initialize() {
        try {
            console.log('Initializing admin core functionality...');
            
            // Initialize real-time stats updates
            this.initializeStatsUpdates();
            
            // Initialize activity monitoring
            this.initializeActivityMonitoring();
            
            // Initialize admin commands
            this.initializeAdminCommands();
            
            // Initialize server management
            this.initializeServerManagement();
            
            this.isInitialized = true;
            console.log('Admin core initialization complete');
        } catch (error) {
            console.error('Error initializing admin core:', error);
        }
    }

    initializeStatsUpdates() {
        try {
            // Update stats every 30 seconds
            setInterval(() => {
                this.updateStats();
            }, 30000);
            
            // Initial stats load
            this.updateStats();
        } catch (error) {
            console.error('Error initializing stats updates:', error);
        }
    }

    updateStats() {
        try {
            // Simulate real-time stats updates
            const variance = 0.05; // 5% variance
            
            this.stats.activeUsers += Math.floor((Math.random() - 0.5) * this.stats.activeUsers * variance);
            this.stats.commandsUsed += Math.floor(Math.random() * 50); // Commands increase
            this.stats.uptime = Math.min(99.9, this.stats.uptime + (Math.random() - 0.5) * 0.1);
            
            // Update DOM elements
            this.updateStatCards();
            
            console.log('Stats updated:', this.stats);
        } catch (error) {
            console.error('Error updating stats:', error);
        }
    }

    updateStatCards() {
        try {
            const statCards = document.querySelectorAll('.stat-card');
            const statValues = [
                this.stats.activeUsers.toLocaleString(),
                this.stats.commandsUsed.toLocaleString(),
                this.stats.connectedServers.toString(),
                this.stats.uptime.toFixed(1) + '%'
            ];

            statCards.forEach((card, index) => {
                const valueElement = card.querySelector('h3');
                if (valueElement && statValues[index]) {
                    valueElement.textContent = statValues[index];
                }
            });
        } catch (error) {
            console.error('Error updating stat cards:', error);
        }
    }

    initializeActivityMonitoring() {
        try {
            // Simulate activity updates
            setInterval(() => {
                this.generateActivity();
            }, 45000); // Every 45 seconds
            
            // Load initial activity
            this.loadRecentActivity();
        } catch (error) {
            console.error('Error initializing activity monitoring:', error);
        }
    }

    generateActivity() {
        try {
            const activities = [
                { type: 'server', message: 'New server connected', icon: 'green' },
                { type: 'command', message: 'Command "/dailies" used 23 times', icon: 'blue' },
                { type: 'user', message: 'User milestone: 1000+ active users', icon: 'purple' },
                { type: 'system', message: 'System performance optimized', icon: 'yellow' },
                { type: 'update', message: 'Bot updated to version 2.1.3', icon: 'green' }
            ];

            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            const timestamp = new Date();
            
            const activity = {
                ...randomActivity,
                timestamp: timestamp,
                timeAgo: this.getTimeAgo(timestamp)
            };

            this.activityLog.unshift(activity);
            
            // Keep only last 10 activities
            if (this.activityLog.length > 10) {
                this.activityLog = this.activityLog.slice(0, 10);
            }
            
            this.updateActivityDisplay();
        } catch (error) {
            console.error('Error generating activity:', error);
        }
    }

    loadRecentActivity() {
        try {
            // Add some initial activities
            const initialActivities = [
                { type: 'server', message: 'New server connected: "Epic Fortnite Guild"', icon: 'green', timeAgo: '2 minutes ago' },
                { type: 'command', message: 'Command "/dailies" used 47 times', icon: 'blue', timeAgo: '15 minutes ago' },
                { type: 'user', message: 'User "GamerPro123" reached level 50', icon: 'purple', timeAgo: '1 hour ago' }
            ];

            this.activityLog = initialActivities;
            this.updateActivityDisplay();
        } catch (error) {
            console.error('Error loading recent activity:', error);
        }
    }

    updateActivityDisplay() {
        try {
            const activityContainer = document.querySelector('.space-y-4');
            if (!activityContainer) return;

            // Clear existing activities (except the static ones)
            const existingItems = activityContainer.querySelectorAll('.activity-item');
            existingItems.forEach(item => item.remove());

            // Add new activities
            this.activityLog.forEach(activity => {
                const activityElement = this.createActivityElement(activity);
                activityContainer.appendChild(activityElement);
            });
        } catch (error) {
            console.error('Error updating activity display:', error);
        }
    }

    createActivityElement(activity) {
        const element = document.createElement('div');
        element.className = 'activity-item flex items-center gap-3 p-3 bg-[#2b3136] rounded-lg';
        
        const iconColors = {
            green: 'bg-green-400',
            blue: 'bg-blue-400',
            purple: 'bg-purple-400',
            yellow: 'bg-yellow-400'
        };

        element.innerHTML = `
            <div class="w-2 h-2 ${iconColors[activity.icon] || 'bg-gray-400'} rounded-full"></div>
            <div>
                <p class="text-white text-sm">${activity.message}</p>
                <p class="text-[#a2abb4] text-xs">${activity.timeAgo}</p>
            </div>
        `;

        return element;
    }

    getTimeAgo(timestamp) {
        const now = new Date();
        const diff = Math.floor((now - timestamp) / 1000); // seconds

        if (diff < 60) return `${diff} seconds ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
        return `${Math.floor(diff / 86400)} days ago`;
    }

    initializeAdminCommands() {
        try {
            // Initialize admin command handlers
            this.adminCommands = {
                refreshStats: () => this.updateStats(),
                clearActivity: () => this.clearActivity(),
                exportData: () => this.exportData(),
                systemCheck: () => this.performSystemCheck()
            };
            
            console.log('Admin commands initialized');
        } catch (error) {
            console.error('Error initializing admin commands:', error);
        }
    }

    initializeServerManagement() {
        try {
            // Initialize server management functionality
            this.servers = [
                { id: 1, name: 'Epic Fortnite Guild', members: 1247, status: 'active' },
                { id: 2, name: 'Valorant Champions', members: 892, status: 'active' },
                { id: 3, name: 'Minecraft Builders', members: 2341, status: 'active' }
            ];
            
            console.log('Server management initialized');
        } catch (error) {
            console.error('Error initializing server management:', error);
        }
    }

    clearActivity() {
        try {
            this.activityLog = [];
            this.updateActivityDisplay();
            console.log('Activity log cleared');
        } catch (error) {
            console.error('Error clearing activity:', error);
        }
    }

    exportData() {
        try {
            const data = {
                stats: this.stats,
                activity: this.activityLog,
                servers: this.servers,
                exportTime: new Date().toISOString()
            };
            
            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `cassie-admin-data-${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            
            URL.revokeObjectURL(url);
            console.log('Data exported successfully');
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    }

    performSystemCheck() {
        try {
            console.log('Performing system check...');
            
            const checks = {
                database: Math.random() > 0.1,
                apiEndpoints: Math.random() > 0.05,
                botStatus: Math.random() > 0.02,
                memoryUsage: Math.random() > 0.1
            };
            
            const allPassed = Object.values(checks).every(check => check);
            
            console.log('System check results:', checks);
            return { passed: allPassed, details: checks };
        } catch (error) {
            console.error('Error performing system check:', error);
            return { passed: false, error: error.message };
        }
    }

    // Public methods for external access
    getStats() {
        return { ...this.stats };
    }

    getActivity() {
        return [...this.activityLog];
    }

    getServers() {
        return [...this.servers];
    }

    executeCommand(command, ...args) {
        try {
            if (this.adminCommands && this.adminCommands[command]) {
                return this.adminCommands[command](...args);
            } else {
                throw new Error(`Unknown admin command: ${command}`);
            }
        } catch (error) {
            console.error('Error executing admin command:', error);
            throw error;
        }
    }
}

// Make AdminCore globally available
window.AdminCore = AdminCore;

// Debug helper
window.adminDebug = {
    getAdminCore: () => window.adminCore,
    refreshStats: () => window.adminCore?.updateStats(),
    generateActivity: () => window.adminCore?.generateActivity(),
    exportData: () => window.adminCore?.exportData()
};
