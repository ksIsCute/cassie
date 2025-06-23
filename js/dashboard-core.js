// User Dashboard Core Functionality for Cassie Clip

// Initialize user dashboard functionality
function initializeUserDashboard() {
    // Add smooth transitions to all interactive elements
    const interactiveElements = document.querySelectorAll('.stat-card, .mission-item, .reward-item, .quick-action-btn, .hero-slot');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Initialize mission click handlers
    initializeMissionInteractions();
}

// Initialize mission interactions
function initializeMissionInteractions() {
    const missionItems = document.querySelectorAll('.mission-item');
    
    missionItems.forEach(item => {
        item.addEventListener('click', function() {
            const missionName = this.querySelector('h4').textContent;
            const missionLevel = this.querySelector('.text-sm.font-medium').textContent;
            
            showNotification(`Loading ${missionName} (${missionLevel})...`, 'info');
            
            // Simulate mission loading
            setTimeout(() => {
                showNotification(`Ready to deploy to ${missionName}!`, 'success');
            }, 1500);
        });
    });
}

// Initialize quick actions
function initializeQuickActions() {
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const actionName = this.querySelector('p').textContent;
            handleQuickAction(actionName);
        });
    });
}

function handleQuickAction(actionName) {
    switch(actionName) {
        case 'Check Dailies':
            showNotification('Loading daily quests...', 'info');
            setTimeout(() => {
                showNotification('Daily quests updated! 1 new quest available.', 'success');
                updateDailyProgress();
            }, 1000);
            break;
        case 'Venture Missions':
            showNotification('Loading venture zone...', 'info');
            setTimeout(() => {
                showNotification('Venture missions available in Twine Peaks!', 'success');
            }, 1000);
            break;
        case 'Item Shop':
            showNotification('Checking current item shop...', 'info');
            setTimeout(() => {
                showNotification('Item shop refreshed! New legendary hero available.', 'success');
            }, 1000);
            break;
        case 'My Stats':
            showNotification('Loading detailed statistics...', 'info');
            setTimeout(() => {
                showNotification('Stats loaded! Power Level increased!', 'success');
                updatePowerLevel();
            }, 1000);
            break;
    }
}

// Update daily progress
function updateDailyProgress() {
    const progressBar = document.querySelector('.bg-blue-400');
    const progressText = document.querySelector('.stat-card .text-2xl');
    const remainingText = document.querySelector('.stat-card .text-sm');
    
    if (progressBar && progressText) {
        const currentProgress = parseInt(progressText.textContent.split('/')[0]);
        if (currentProgress < 3) {
            const newProgress = currentProgress + 1;
            progressText.textContent = `${newProgress}/3`;
            progressBar.style.width = `${(newProgress / 3) * 100}%`;
            
            if (newProgress === 3) {
                remainingText.textContent = 'All quests completed!';
                remainingText.classList.add('text-green-400');
            } else {
                remainingText.textContent = `${3 - newProgress} quest${3 - newProgress > 1 ? 's' : ''} remaining`;
            }
        }
    }
}

// Update power level
function updatePowerLevel() {
    const powerLevelElement = document.querySelector('.text-2xl.font-bold.text-purple-400');
    if (powerLevelElement) {
        const currentPL = parseInt(powerLevelElement.textContent.replace('PL ', ''));
        const newPL = Math.min(currentPL + 1, 140);
        powerLevelElement.textContent = `PL ${newPL}`;
        
        // Add glow effect
        powerLevelElement.style.textShadow = '0 0 10px #a855f7';
        setTimeout(() => {
            powerLevelElement.style.textShadow = '';
        }, 2000);
    }
}

// Start user-specific updates
function startUserUpdates() {
    // Add new rewards periodically
    setInterval(addNewReward, 45000); // Add reward every 45 seconds
    
    // Update mission timers
    setInterval(updateMissionTimers, 60000); // Update every minute
    
    // Update notification count
    setInterval(updateNotificationCount, 30000); // Update every 30 seconds
}

// Add new reward to the list
function addNewReward() {
    const rewards = [
        { type: 'V', name: '50 V-Bucks', source: 'Mission Completion', color: 'yellow' },
        { type: 'XP', name: '8,500 Survivor XP', source: 'Rescue Survivors', color: 'blue' },
        { type: 'M', name: 'Pure Drop of Rain', source: 'Storm Alert', color: 'green' },
        { type: 'S', name: 'Epic Schematic', source: 'Mission Alert', color: 'purple' },
        { type: 'H', name: 'Hero XP', source: 'Daily Quest', color: 'red' }
    ];

    const rewardContainer = document.querySelector('.space-y-3');
    if (rewardContainer) {
        const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
        
        const rewardElement = document.createElement('div');
        rewardElement.className = 'reward-item flex items-center gap-3 p-3 bg-[#2b3136] rounded-lg opacity-0';
        rewardElement.innerHTML = `
            <div class="w-10 h-10 bg-${randomReward.color}-500 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">${randomReward.type}</span>
            </div>
            <div class="flex-1">
                <p class="text-white text-sm font-medium">${randomReward.name}</p>
                <p class="text-[#a2abb4] text-xs">${randomReward.source}</p>
            </div>
            <span class="text-[#a2abb4] text-xs">Just now</span>
        `;

        // Insert at the beginning
        rewardContainer.insertBefore(rewardElement, rewardContainer.firstChild);
        
        // Animate in
        setTimeout(() => {
            rewardElement.style.opacity = '1';
            rewardElement.style.transform = 'translateY(0)';
        }, 100);

        // Remove last item if too many
        const rewardItems = rewardContainer.querySelectorAll('.reward-item');
        if (rewardItems.length > 4) {
            const lastItem = rewardItems[rewardItems.length - 1];
            lastItem.style.opacity = '0';
            setTimeout(() => {
                if (lastItem.parentNode) {
                    lastItem.parentNode.removeChild(lastItem);
                }
            }, 300);
        }
        
        showNotification(`Received: ${randomReward.name}`, 'success');
    }
}

// Update mission timers
function updateMissionTimers() {
    const timerElements = document.querySelectorAll('.mission-item p');
    timerElements.forEach(element => {
        if (element.textContent.includes('minutes remaining')) {
            const currentMinutes = parseInt(element.textContent.split(' ')[2]);
            if (currentMinutes > 1) {
                element.textContent = element.textContent.replace(`${currentMinutes} minutes`, `${currentMinutes - 1} minutes`);
            } else {
                element.textContent = element.textContent.replace('20 minutes remaining', 'Mission Complete!');
                element.style.color = '#10b981';
                
                // Update status indicator
                const statusElement = element.parentElement.querySelector('.text-green-400');
                if (statusElement && statusElement.textContent === 'In Progress') {
                    statusElement.textContent = 'Completed';
                    statusElement.parentElement.querySelector('.rounded-full').classList.remove('animate-pulse');
                }
            }
        }
    });
}
