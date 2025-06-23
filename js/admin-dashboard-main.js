// Admin Dashboard Main Coordinator
// This file coordinates all admin dashboard functionality

class AdminDashboardCoordinator {
    constructor() {
        this.adminCore = null;
        this.adminCharts = null;
        this.notifications = null;
        this.sidebar = null;
        this.initCoordinator();
    }

    async initCoordinator() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initialize());
            } else {
                this.initialize();
            }
        } catch (error) {
            console.error('Error initializing admin dashboard coordinator:', error);
        }
    }

    async initialize() {
        try {
            console.log('Initializing admin dashboard...');

            // Initialize core systems first
            await this.initializeCoreModules();
            
            // Initialize UI components
            await this.initializeUIComponents();
            
            // Initialize charts and data visualization
            await this.initializeCharts();
            
            // Initialize event listeners
            this.initializeEventListeners();
            
            console.log('Admin dashboard initialization complete');
        } catch (error) {
            console.error('Error during admin dashboard initialization:', error);
            this.handleInitializationError(error);
        }
    }

    async initializeCoreModules() {
        try {
            // Initialize admin core functionality
            if (typeof AdminCore !== 'undefined') {
                this.adminCore = new AdminCore();
                console.log('Admin core module initialized');
            } else {
                console.warn('AdminCore module not loaded');
            }

            // Initialize notifications
            if (typeof NotificationManager !== 'undefined') {
                this.notifications = new NotificationManager();
                console.log('Notifications module initialized');
            } else {
                console.warn('NotificationManager module not loaded');
            }

            // Initialize sidebar
            if (typeof SidebarManager !== 'undefined') {
                this.sidebar = new SidebarManager();
                console.log('Sidebar module initialized');
            } else {
                console.warn('SidebarManager module not loaded');
            }
        } catch (error) {
            console.error('Error initializing core modules:', error);
            throw error;
        }
    }

    async initializeUIComponents() {
        try {
            // Initialize notification button
            this.initializeNotificationButton();
            
            // Initialize navigation
            this.initializeNavigation();
            
            // Initialize quick actions
            this.initializeQuickActions();
            
            console.log('UI components initialized');
        } catch (error) {
            console.error('Error initializing UI components:', error);
        }
    }

    async initializeCharts() {
        try {
            // Initialize admin charts
            if (typeof AdminCharts !== 'undefined') {
                this.adminCharts = new AdminCharts();
                console.log('Admin charts module initialized');
            } else {
                console.warn('AdminCharts module not loaded');
            }
        } catch (error) {
            console.error('Error initializing charts:', error);
        }
    }

    initializeNotificationButton() {
        const notificationBtn = document.querySelector('.notification-btn');
        if (notificationBtn && this.notifications) {
            notificationBtn.addEventListener('click', () => {
                this.notifications.showNotifications();
            });
        }
    }

    initializeNavigation() {
        // Initialize navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Add active state handling
                navLinks.forEach(l => l.classList.remove('text-[#bfd6ec]'));
                navLinks.forEach(l => l.classList.add('text-white'));
                
                e.target.classList.remove('text-white');
                e.target.classList.add('text-[#bfd6ec]');
            });
        });
    }

    initializeQuickActions() {
        // Initialize quick action buttons
        const quickActionBtns = document.querySelectorAll('[data-action]');
        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                this.handleQuickAction(action);
            });
        });
    }

    handleQuickAction(action) {
        if (this.adminCore && typeof this.adminCore.handleQuickAction === 'function') {
            this.adminCore.handleQuickAction(action);
        } else {
            console.log(`Quick action: ${action}`);
        }
    }

    initializeEventListeners() {
        // Global event listeners for admin dashboard
        window.addEventListener('resize', () => {
            // Handle responsive chart resizing
            if (this.adminCharts && typeof this.adminCharts.handleResize === 'function') {
                this.adminCharts.handleResize();
            }
        });

        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause real-time updates when page is hidden
                this.pauseUpdates();
            } else {
                // Resume updates when page becomes visible
                this.resumeUpdates();
            }
        });
    }

    pauseUpdates() {
        if (this.adminCore && typeof this.adminCore.pauseUpdates === 'function') {
            this.adminCore.pauseUpdates();
        }
    }

    resumeUpdates() {
        if (this.adminCore && typeof this.adminCore.resumeUpdates === 'function') {
            this.adminCore.resumeUpdates();
        }
    }

    handleInitializationError(error) {
        console.error('Failed to initialize admin dashboard:', error);
        
        // Show fallback UI
        const fallbackMessage = document.createElement('div');
        fallbackMessage.className = 'fixed top-4 right-4 bg-red-600 text-white p-4 rounded-lg z-50';
        fallbackMessage.innerHTML = `
            <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                <span>Dashboard initialization failed. Please refresh the page.</span>
            </div>
        `;
        
        document.body.appendChild(fallbackMessage);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (fallbackMessage.parentNode) {
                fallbackMessage.parentNode.removeChild(fallbackMessage);
            }
        }, 5000);
    }
}

// Initialize the admin dashboard coordinator when this script loads
const adminDashboard = new AdminDashboardCoordinator();

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdminDashboardCoordinator;
}
