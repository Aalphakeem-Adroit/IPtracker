let map;

async function trackIP() {
    const ipInput = document.getElementById('ip-input').value;
    const response = await fetch(`https://ipinfo.io/json?token=815762ff0a26bb`);

    if (response.ok) {
        const data = await response.json();
        document.getElementById('ip').textContent = data.ip || 'N/A';
        document.getElementById('loc').textContent = data.region || 'N/A';
        document.getElementById('timezone').textContent = data.timezone || 'N/A';
        document.getElementById('country').textContent = data.country || 'N/A';        

        const [lat, lon] = data.loc.split(',');

        if (!map) {
            map = L.map('map').setView([lat, lon], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        } else {
            map.setView([lat, lon], 13);
        }

        L.marker([lat, lon]).addTo(map)
            .bindPopup(`IP: ${data.ip}<br>Location: ${data.region}<br>Timezone: ${data.timezone}<br>Country: ${data.country}`)
            .openPopup();
    } else {
        alert('Failed to fetch data. Please check the IP address and try again.');
    }
}