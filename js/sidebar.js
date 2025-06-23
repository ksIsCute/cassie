// Sidebar functionality for Cassie Clip User Dashboard

// Initialize sidebar
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mainContent = document.getElementById('mainContent');
    
    // Toggle sidebar function
    function toggleSidebar() {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
        
        // For desktop, adjust main content margin
        if (window.innerWidth > 768) {
            mainContent.classList.toggle('sidebar-open');
        }
    }
    
    // Close sidebar function
    function closeSidebar() {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        mainContent.classList.remove('sidebar-open');
    }
    
    // Event listeners
    if (sidebarToggleBtn) {
        sidebarToggleBtn.addEventListener('click', toggleSidebar);
    }
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }
    
    // Handle section dropdowns
    const sectionHeaders = document.querySelectorAll('.nav-section-header');
    sectionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            const dropdown = document.getElementById(`${section}-dropdown`);
            
            if (dropdown) {
                const isOpen = dropdown.classList.contains('open');
                
                // Close all dropdowns
                document.querySelectorAll('.nav-dropdown').forEach(d => {
                    d.classList.remove('open');
                });
                document.querySelectorAll('.nav-section-header').forEach(h => {
                    h.classList.remove('active');
                });
                
                // Toggle current dropdown
                if (!isOpen) {
                    dropdown.classList.add('open');
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Handle navigation clicks
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the target section
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Close sidebar on mobile after navigation
                if (window.innerWidth <= 768) {
                    closeSidebar();
                }
                
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // On desktop, remove overlay but keep sidebar state
            sidebarOverlay.classList.remove('active');
        } else {
            // On mobile, ensure proper behavior
            mainContent.classList.remove('sidebar-open');
        }
    });
    
    // Initialize with first section open
    const firstSectionHeader = document.querySelector('.nav-section-header[data-section="overview"]');
    if (firstSectionHeader) {
        firstSectionHeader.click();
    }
}

// Smooth scrolling for navigation
function initializeSmoothScrolling() {
    // Handle intersection observer for active nav highlighting
    const sections = document.querySelectorAll('.section-anchor');
    const navItems = document.querySelectorAll('.nav-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                
                // Remove active class from all nav items
                navItems.forEach(item => item.classList.remove('active'));
                
                // Add active class to corresponding nav item
                const activeNavItem = document.querySelector(`.nav-item[href="#${targetId}"]`);
                if (activeNavItem) {
                    activeNavItem.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}
