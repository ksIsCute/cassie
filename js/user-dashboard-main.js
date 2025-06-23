// Main User Dashboard JavaScript for Cassie Clip
// This file coordinates all dashboard functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Cassie Clip User Dashboard...');
    
    // Initialize core dashboard functionality
    initializeUserDashboard();
    initializeQuickActions();
    
    // Initialize notification system
    initializeNotificationSystem();
    initializeUserNotificationButton();
    
    // Initialize sidebar with slight delay to ensure DOM is ready
    setTimeout(() => {
        initializeSidebar();
        initializeSmoothScrolling();
    }, 50);
    
    // Initialize charts with delay to ensure Chart.js is loaded
    setTimeout(() => {
        initializeUserCharts();
    }, 150);
    
    // Start periodic updates
    startUserUpdates();
    
    console.log('Cassie Clip User Dashboard initialized successfully');
});

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Dashboard error:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Expose key functions globally for debugging
window.CassieClipDashboard = {
    showNotification,
    updateDashboardStats,
    updateDailyProgress,
    updatePowerLevel
};
