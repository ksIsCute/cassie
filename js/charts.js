// Charts and graphs functionality for Cassie Clip User Dashboard

// Initialize user-specific charts
function initializeUserCharts() {
    // Wait for Chart.js to be available
    if (typeof Chart === 'undefined') {
        console.log('Chart.js not loaded yet, retrying...');
        setTimeout(initializeUserCharts, 100);
        return;
    }

    // Weekly Progress Chart
    const weeklyCtx = document.getElementById('weeklyProgressChart');
    if (weeklyCtx) {
        console.log('Initializing weekly progress chart...');
        try {
            const weeklyChart = new Chart(weeklyCtx, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [
                        {
                            label: 'V-Bucks Earned',
                            data: [50, 100, 50, 150, 50, 200, 50],
                            backgroundColor: 'rgba(254, 231, 92, 0.8)',
                            borderColor: '#fbbf24',
                            borderWidth: 1
                        },
                        {
                            label: 'Missions Completed',
                            data: [3, 5, 2, 8, 4, 12, 3],
                            backgroundColor: 'rgba(88, 101, 242, 0.8)',
                            borderColor: '#5865f2',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                        padding: 0
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: '#a2abb4',
                                padding: 20,
                                usePointStyle: true
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: '#40484f'
                            },
                            ticks: {
                                color: '#a2abb4'
                            }
                        },
                        y: {
                            grid: {
                                color: '#40484f'
                            },
                            ticks: {
                                color: '#a2abb4'
                            }
                        }
                    }
                }
            });

            // Update chart data periodically
            setInterval(() => {
                const currentVBucks = weeklyChart.data.datasets[0].data;
                const currentMissions = weeklyChart.data.datasets[1].data;
                
                // Update today's data (last item) with small increments
                const today = currentVBucks.length - 1;
                if (Math.random() > 0.7) { // 30% chance to update
                    currentVBucks[today] = Math.min(currentVBucks[today] + 50, 300);
                    currentMissions[today] = Math.min(currentMissions[today] + 1, 15);
                    
                    weeklyChart.update('none');
                    updateDashboardStats();
                }
            }, 15000); // Update every 15 seconds
        } catch (error) {
            console.error('Error initializing weekly progress chart:', error);
            // Show fallback message
            weeklyCtx.parentElement.innerHTML = `
                <div class="flex items-center justify-center h-64 text-[#a2abb4]">
                    <div class="text-center">
                        <p>Chart temporarily unavailable</p>
                        <p class="text-sm mt-2">Refreshing page may help</p>
                    </div>
                </div>
            `;
        }
    } else {
        console.log('Weekly progress chart canvas not found');
    }
}

// Update dashboard stats
function updateDashboardStats() {
    // Update V-Bucks earned today
    const vbucksElement = document.querySelectorAll('.stat-card .text-2xl')[1];
    if (vbucksElement) {
        const currentVBucks = parseInt(vbucksElement.textContent);
        if (Math.random() > 0.5 && currentVBucks < 300) {
            vbucksElement.textContent = currentVBucks + 50;
            
            // Update the +50 indicator
            const indicatorElement = vbucksElement.parentElement.parentElement.querySelector('.text-green-400');
            if (indicatorElement) {
                indicatorElement.textContent = `+${currentVBucks + 50 - 100}`;
            }
        }
    }
    
    // Update venture level progress
    const ventureBar = document.querySelector('.bg-purple-400');
    if (ventureBar && Math.random() > 0.8) {
        const currentWidth = parseInt(ventureBar.style.width.replace('%', '') || '75');
        const newWidth = Math.min(currentWidth + 5, 100);
        ventureBar.style.width = `${newWidth}%`;
        
        if (newWidth === 100) {
            // Level up!
            const ventureLevelElement = document.querySelectorAll('.stat-card .text-2xl')[2];
            if (ventureLevelElement) {
                const currentLevel = parseInt(ventureLevelElement.textContent);
                ventureLevelElement.textContent = currentLevel + 1;
                ventureBar.style.width = '0%';
                showNotification('Venture Level Up! New rewards unlocked!', 'success');
            }
        }
    }
}
