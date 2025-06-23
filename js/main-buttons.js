// Quick Access Buttons functionality for Cassie Clip main page

// Direct initialization function
function initializeQuickAccessButtons() {
    console.log('=== INITIALIZING QUICK ACCESS BUTTONS ===');
    
    const quickAccessButtons = document.querySelectorAll('.quick-access-button');
    console.log(`Found ${quickAccessButtons.length} quick access buttons`);
    
    if (quickAccessButtons.length === 0) {
        console.warn('No quick access buttons found!');
        return;
    }
    
    quickAccessButtons.forEach((button, index) => {
        console.log(`Setting up button ${index + 1}:`, button);
        
        // Ensure the button has the right styles
        button.style.cursor = 'pointer';
        button.style.userSelect = 'none';
        
        // Add click event listener
        button.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            console.log('=== BUTTON CLICKED ===');
            console.log('Clicked button:', this);
            
            const buttonText = this.querySelector('h2')?.textContent || 'Unknown';
            console.log('Button text:', buttonText);
            
            // Show notification
            if (typeof showNotification !== 'undefined') {
                showNotification(`Clicked: ${buttonText}`, 'info');
                console.log('Notification shown');
            } else {
                console.warn('showNotification function not available');
                alert(`Clicked: ${buttonText}`);
            }
            
            // Add loading effect
            this.classList.add('loading');
            console.log('Added loading class');
            
            // Handle the specific action
            handleQuickAccessClick(buttonText);
            
            // Remove loading after delay
            setTimeout(() => {
                this.classList.remove('loading');
                console.log('Removed loading class');
            }, 1000);
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', function() {
            console.log('Mouse entered button:', this.querySelector('h2')?.textContent);
        });
        
        button.addEventListener('mouseleave', function() {
            console.log('Mouse left button:', this.querySelector('h2')?.textContent);
        });
        
        console.log(`Button ${index + 1} setup complete`);
    });
    
    console.log('=== QUICK ACCESS BUTTONS INITIALIZATION COMPLETE ===');
}

// Handle quick access button clicks
function handleQuickAccessClick(buttonType) {
    console.log(`Handling quick access click: ${buttonType}`);
    
    switch(buttonType) {
        case 'Command Reference':
            console.log('Opening Command Reference');
            if (typeof showNotification !== 'undefined') {
                setTimeout(() => {
                    showNotification('Command reference loaded successfully', 'success');
                }, 1000);
            }
            break;
        case 'User Settings':
            console.log('Opening User Settings');
            if (typeof showNotification !== 'undefined') {
                setTimeout(() => {
                    showNotification('Settings panel ready', 'success');
                }, 1000);
            }
            break;
        case 'Support & FAQs':
            console.log('Opening Support & FAQs');
            if (typeof showNotification !== 'undefined') {
                setTimeout(() => {
                    showNotification('Support center loaded successfully', 'success');
                }, 1000);
            }
            break;
        default:
            console.log(`Opening ${buttonType}`);
            if (typeof showNotification !== 'undefined') {
                setTimeout(() => {
                    showNotification(`${buttonType} loaded successfully`, 'success');
                }, 1000);
            }
            break;
    }
}

// Add ripple effect to buttons
function addRippleEffect() {
    console.log('Adding ripple effects...');
    const buttons = document.querySelectorAll('.quick-access-button, .discord-login-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            // Add ripple animation if not already added
            if (!document.querySelector('#ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    @keyframes ripple {
                        from { transform: scale(0); opacity: 1; }
                        to { transform: scale(2); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
}

// Make functions globally available
window.initializeQuickAccessButtons = initializeQuickAccessButtons;
window.handleQuickAccessClick = handleQuickAccessClick;
window.addRippleEffect = addRippleEffect;

console.log('main-buttons.js loaded successfully');