// Main page coordinator for Cassie Clip

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Cassie Clip Main Dashboard...');
    
    try {
        // Initialize core functionality with error handling
        console.log('About to initialize quick access buttons...');
        if (typeof initializeQuickAccessButtons === 'function') {
            try {
                initializeQuickAccessButtons();
                console.log('Quick access buttons initialized successfully');
                
                // Add ripple effects
                if (typeof addRippleEffect === 'function') {
                    setTimeout(() => {
                        try {
                            addRippleEffect();
                            console.log('Ripple effects added');
                        } catch (rippleError) {
                            console.error('Error adding ripple effects:', rippleError);
                        }
                    }, 200);
                }
            } catch (buttonError) {
                console.error('Error initializing buttons:', buttonError);
            }
        } else {
            console.error('initializeQuickAccessButtons function not found!');
        }
        
        if (typeof initializeDiscordLogin === 'function') {
            try {
                initializeDiscordLogin();
                console.log('Discord login initialized');
            } catch (discordError) {
                console.error('Error initializing Discord login:', discordError);
            }
        } else {
            console.warn('initializeDiscordLogin function not found');
        }
        
        if (typeof initializeNotifications === 'function') {
            try {
                initializeNotifications();
                console.log('Notifications initialized');
            } catch (notificationError) {
                console.error('Error initializing notifications:', notificationError);
            }
        } else {
            console.warn('initializeNotifications function not found');
        }
        
        if (typeof initializeAnimations === 'function') {
            try {
                initializeAnimations();
                console.log('Animations initialized');
            } catch (animationError) {
                console.error('Error initializing animations:', animationError);
            }
        } else {
            console.warn('initializeAnimations function not found');
        }
        
        // Add animation styles
        if (typeof addAnimationStyles === 'function') {
            try {
                addAnimationStyles();
                console.log('Animation styles added');
            } catch (styleError) {
                console.error('Error adding animation styles:', styleError);
            }
        }
        
        // Start periodic notifications (commented out for debugging)
        // if (typeof startPeriodicNotifications === 'function') {
        //     try {
        //         startPeriodicNotifications();
        //         console.log('Periodic notifications started');
        //     } catch (periodicError) {
        //         console.error('Error starting periodic notifications:', periodicError);
        //     }
        // }
        
        console.log('Cassie Clip Main Dashboard loaded successfully!');
    } catch (error) {
        console.error('Critical error during main dashboard initialization:', error);
        // Don't crash the page, just log the error
    }
});

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Main page error:', e.error);
    console.error('Error details:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno
    });
    
    // Try to show a notification if possible
    try {
        if (typeof showNotification === 'function') {
            showNotification('Something went wrong. Please check the console for details.', 'error');
        }
    } catch (notificationError) {
        console.error('Could not show error notification:', notificationError);
    }
    
    // Prevent the error from breaking the page
    return true;
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault(); // Prevent the error from crashing the page
});

// Expose key functions globally for debugging (with safety checks)
window.CassieClipMain = {
    showNotification: typeof showNotification !== 'undefined' ? showNotification : null,
    updateNotificationBadge: typeof updateNotificationBadge !== 'undefined' ? updateNotificationBadge : null,
    handleDiscordLogin: typeof handleDiscordLogin !== 'undefined' ? handleDiscordLogin : null
};
