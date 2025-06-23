// Main page animations and interactions for Cassie Clip

// Initialize animations and interactions
function initializeAnimations() {
    console.log('Animations disabled for debugging');
    return; // Temporarily disabled
    
    // Initialize notification button
    initializeNotificationButton();
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements for scroll animations
    document.querySelectorAll('.quick-access-item').forEach(item => {
        observer.observe(item);
    });
    
    // Initialize easter egg
    initializeEasterEgg();
}

// Initialize easter egg
function initializeEasterEgg() {
    let clickCount = 0;
    const logo = document.querySelector('.logo-img');
    
    if (logo) {
        logo.addEventListener('click', function() {
            clickCount++;
            
            if (clickCount === 5) {
                showNotification('You found the secret! 🎉', 'success');
                
                // Add special glow effect
                this.style.filter = 'drop-shadow(0 0 20px #5865f2)';
                this.style.transform = 'scale(1.1) rotate(360deg)';
                this.style.transition = 'all 1s ease';
                
                setTimeout(() => {
                    this.style.filter = '';
                    this.style.transform = '';
                }, 2000);
                
                clickCount = 0;
            }
        });
    }
}

// Add fade in animation styles
function addAnimationStyles() {
    if (!document.querySelector('#main-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'main-animation-styles';
        style.textContent = `
            @keyframes fadeInUp {
                from { 
                    opacity: 0; 
                    transform: translateY(30px); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0); 
                }
            }
            
            .quick-access-item {
                opacity: 0;
            }
            
            .quick-access-item.animated {
                animation: fadeInUp 0.6s ease-out forwards;
            }
        `;
        document.head.appendChild(style);
    }
}
