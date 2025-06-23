// Admin Dashboard Charts for Cassie Clip

// Initialize charts using Chart.js
function initializeAdminCharts() {
    // Wait for Chart.js to be available
    if (typeof Chart === 'undefined') {
        console.log('Chart.js not loaded yet, retrying...');
        setTimeout(initializeAdminCharts, 100);
        return;
    }

    // Command Usage Chart
    const commandCtx = document.getElementById('commandChart');
    if (commandCtx) {
        console.log('Initializing command usage chart...');
        try {
            const commandChart = new Chart(commandCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Commands Used',
                        data: [1200, 1900, 3000, 2100, 3200, 2800, 3400],
                        borderColor: '#5865f2',
                        backgroundColor: 'rgba(88, 101, 242, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                        padding: 0
                    },
                    plugins: {
                        legend: {
                            display: false
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
                            min: 0,
                            max: 4000,
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

            // Update chart data periodically with realistic fluctuations
            setInterval(() => {
                const currentData = commandChart.data.datasets[0].data;
                const newData = currentData.map(value => {
                    // Add small random fluctuation within realistic bounds
                    const fluctuation = (Math.random() - 0.5) * 200;
                    const newValue = value + fluctuation;
                    return Math.max(800, Math.min(4000, newValue)); // Keep within reasonable bounds
                });
                
                commandChart.data.datasets[0].data = newData;
                commandChart.update('none'); // Update without animation for smoother real-time effect
            }, 10000); // Update every 10 seconds
        } catch (error) {
            console.error('Error initializing command chart:', error);
            commandCtx.parentElement.innerHTML = `
                <div class="flex items-center justify-center h-64 text-[#a2abb4]">
                    <div class="text-center">
                        <p>Chart temporarily unavailable</p>
                        <p class="text-sm mt-2">Refreshing page may help</p>
                    </div>
                </div>
            `;
        }
    }

    // Server Activity Chart (Doughnut)
    const activityCtx = document.getElementById('activityChart');
    if (activityCtx) {
        console.log('Initializing server activity chart...');
        try {
            const activityChart = new Chart(activityCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Active Users', 'Commands Run', 'Errors', 'Background Tasks'],
                    datasets: [{
                        data: [45, 30, 5, 20],
                        backgroundColor: [
                            '#57f287',
                            '#5865f2',
                            '#f85149',
                            '#fee75c'
                        ],
                        borderColor: '#1e2125',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: '#a2abb4',
                                padding: 20,
                                usePointStyle: true
                            }
                        }
                    }
                }
            });

            // Update activity chart periodically
            setInterval(() => {
                const data = activityChart.data.datasets[0].data;
                data[0] = Math.max(30, Math.min(60, data[0] + (Math.random() - 0.5) * 10)); // Active Users
                data[1] = Math.max(20, Math.min(50, data[1] + (Math.random() - 0.5) * 8));  // Commands
                data[2] = Math.max(1, Math.min(15, data[2] + (Math.random() - 0.5) * 3));   // Errors
                data[3] = Math.max(10, Math.min(30, data[3] + (Math.random() - 0.5) * 5));  // Background
                
                activityChart.update('none');
            }, 15000); // Update every 15 seconds
        } catch (error) {
            console.error('Error initializing activity chart:', error);
            activityCtx.parentElement.innerHTML = `
                <div class="flex items-center justify-center h-64 text-[#a2abb4]">
                    <div class="text-center">
                        <p>Chart temporarily unavailable</p>
                        <p class="text-sm mt-2">Refreshing page may help</p>
                    </div>
                </div>
            `;
        }
    }
}
