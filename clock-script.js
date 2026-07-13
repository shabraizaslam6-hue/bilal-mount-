// Timezone data for different cities
const timezones = {
    'ny-clock': { name: 'New York', offset: -5, id: 'ny' },
    'london-clock': { name: 'London', offset: 0, id: 'london' },
    'paris-clock': { name: 'Paris', offset: 1, id: 'paris' },
    'dubai-clock': { name: 'Dubai', offset: 4, id: 'dubai' },
    'tokyo-clock': { name: 'Tokyo', offset: 9, id: 'tokyo' },
    'sydney-clock': { name: 'Sydney', offset: 11, id: 'sydney' },
    'la-clock': { name: 'Los Angeles', offset: -8, id: 'la' },
    'singapore-clock': { name: 'Singapore', offset: 8, id: 'singapore' },
    'mumbai-clock': { name: 'Mumbai', offset: 5.5, id: 'mumbai' }
};

// Function to format time with leading zeros
function formatTime(hours, minutes, seconds) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Function to format date
function formatDate(date) {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Function to update all clocks
function updateClocks() {
    const now = new Date();

    // Update world clocks
    Object.keys(timezones).forEach(clockId => {
        const tz = timezones[clockId];
        
        // Create a new date adjusted for the timezone
        const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
        const tzTime = new Date(utcTime + (3600000 * tz.offset));

        // Get time components
        const hours = tzTime.getHours();
        const minutes = tzTime.getMinutes();
        const seconds = tzTime.getSeconds();

        // Update clock display
        const clockElement = document.getElementById(clockId);
        if (clockElement) {
            clockElement.textContent = formatTime(hours, minutes, seconds);
        }

        // Update date display
        const dateElement = document.getElementById(`${tz.id}-date`);
        if (dateElement) {
            dateElement.textContent = formatDate(tzTime);
        }
    });

    // Update local time
    updateLocalTime(now);
}

// Function to update local time
function updateLocalTime(now) {
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const localClock = document.getElementById('local-clock');
    if (localClock) {
        localClock.textContent = formatTime(hours, minutes, seconds);
    }

    const localDate = document.getElementById('local-date-display');
    if (localDate) {
        localDate.textContent = formatDate(now);
    }

    // Update timezone display
    const tzElement = document.getElementById('local-timezone');
    if (tzElement) {
        const tzName = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const tzOffset = -now.getTimezoneOffset() / 60;
        const tzSign = tzOffset >= 0 ? '+' : '';
        tzElement.textContent = `${tzName} (UTC${tzSign}${tzOffset})`;
    }
}

// Update clocks immediately and then every second
updateClocks();
setInterval(updateClocks, 1000);

// Add smooth scrolling to navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});
