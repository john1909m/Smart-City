// Vision City Dashboard - Main Application
const API_BASE = 'http://localhost:8080';

// Chart instances
let co2Chart, humidityChart, rainChart;
let refreshInterval = null;

// Data storage
let co2Data = [];
let humidityData = [];
let rainData = [];

// Configuration
const MAX_CHART_POINTS = 50;
const MAX_TABLE_ROWS = 8;

// Helper: Format timestamp (Vision-style)
function formatTimestamp(isoString) {
    if (!isoString) return '—';
    try {
        const date = new Date(isoString);
        return date.toLocaleString(undefined, {
            month: 'short', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
    } catch (e) {
        return isoString?.substring(0, 19) || '—';
    }
}

// Update last update time
function updateLastUpdateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('lastUpdate').textContent = timeStr;
}

// Fetch with proper error handling
async function fetchJSON(url, context) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Invalid response format');
    return data;
}

// Get latest records
function getLatestRecords(data, limit) {
    if (!data?.length) return [];
    const sorted = [...data].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return sorted.slice(0, limit);
}

// Update sensor table
function updateSensorTable(tableId, data, valueKey) {
    const tbody = document.querySelector(`#${tableId} tbody`);
    if (!tbody) return;

    if (!data?.length) {
        tbody.innerHTML = '<tr><td colspan="3" class="loading-placeholder">—<br>No data —</td></tr>';
        return;
    }

    const latest = getLatestRecords(data, MAX_TABLE_ROWS);
    const rows = latest.map(record => `
        <tr>
            <td>${record.id ?? '—'}</td>
            <td>${typeof record[valueKey] === 'number' ? record[valueKey].toFixed(2) : record[valueKey]}</td>
            <td>${formatTimestamp(record.timestamp)}</td>
        </tr>
    `).join('');
    tbody.innerHTML = rows;
}

// Update RFID table
function updateRfidTable(tableId, data) {
    const tbody = document.querySelector(`#${tableId} tbody`);
    if (!tbody) return;

    if (!data?.length) {
        tbody.innerHTML = '<tr><td colspan="4" class="loading-placeholder">—<br>No events —</td></tr>';
        return;
    }

    const latest = getLatestRecords(data, 7);
    const rows = latest.map(log => {
        const statusClass = log.status?.toUpperCase() === 'AUTHORIZED' ? 'status-badge' : 'status-badge unauthorized';
        return `
            <tr>
                <td>${log.id ?? '—'}</td>
                <td>${log.cardId ?? '—'}</td>
                <td><span class="${statusClass}">${log.status || 'UNKNOWN'}</span></td>
                <td>${formatTimestamp(log.timestamp)}</td>
            </tr>
        `;
    }).join('');
    tbody.innerHTML = rows;
}

// Update chart
function updateChart(chart, data, label) {
    if (!chart || !data?.length) return;

    const sorted = [...data].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    const chartData = sorted.slice(-MAX_CHART_POINTS);

    const labels = chartData.map(r => {
        const d = new Date(r.timestamp);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });
    const values = chartData.map(r => r.value);

    chart.data.labels = labels;
    chart.data.datasets[0].data = values;
    chart.update('none');
}

// Update record counts
function updateCounts() {
    document.getElementById('co2Count').textContent = co2Data.length ? `${co2Data.length.toLocaleString()} records` : '--';
    document.getElementById('humidityCount').textContent = humidityData.length ? `${humidityData.length.toLocaleString()} records` : '--';
    document.getElementById('rainCount').textContent = rainData.length ? `${rainData.length.toLocaleString()} records` : '--';
    document.getElementById('dataPoints').textContent = (co2Data.length + humidityData.length + rainData.length).toLocaleString();
}

// API Calls
async function fetchCO2() {
    const data = await fetchJSON(`${API_BASE}/api/readings/2`, 'CO2');
    if (Array.isArray(data)) {
        co2Data = data;
        updateSensorTable('co2Table', data, 'value');
        updateChart(co2Chart, data, 'CO₂');
        updateCounts();
    }
    return data;
}

async function fetchHumidity() {
    const data = await fetchJSON(`${API_BASE}/api/readings/3`, 'Humidity');
    if (Array.isArray(data)) {
        humidityData = data;
        updateSensorTable('humidityTable', data, 'value');
        updateChart(humidityChart, data, 'Humidity');
        updateCounts();
    }
    return data;
}

async function fetchRain() {
    const data = await fetchJSON(`${API_BASE}/api/readings/4`, 'Rain');
    if (Array.isArray(data)) {
        rainData = data;
        updateSensorTable('rainTable', data, 'value');
        updateChart(rainChart, data, 'Rain');
        updateCounts();
    }
    return data;
}

async function fetchRFID() {
    const data = await fetchJSON(`${API_BASE}/api/rfid/5`, 'RFID');
    if (Array.isArray(data)) {
        updateRfidTable('rfidTable', data);
        document.getElementById('rfidCount').textContent = `${data.length.toLocaleString()} events`;
    }
    return data;
}

// Safe fetch wrapper
async function safeFetch(fn, cardId, errorMsg) {
    const card = document.getElementById(cardId);
    const existingError = card?.querySelector('.error-message');
    if (existingError) existingError.remove();

    try {
        await fn();
    } catch (err) {
        console.warn(err);
        if (card) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = `⚠ ${errorMsg}: ${err.message}`;
            const wrapper = card.querySelector('.table-wrapper');
            if (wrapper) wrapper.prepend(errorDiv);
            setTimeout(() => errorDiv.remove(), 5000);
        }
    }
}

// Refresh all data
async function refreshAll() {
    await Promise.allSettled([
        safeFetch(fetchCO2, 'card-co2', 'CO2 sensor'),
        safeFetch(fetchHumidity, 'card-humidity', 'Humidity sensor'),
        safeFetch(fetchRain, 'card-rain', 'Rain sensor'),
        safeFetch(fetchRFID, 'card-rfid', 'RFID logs')
    ]);
    updateLastUpdateTime();
}

// Initialize charts (Vision Pro color scheme)
function initCharts() {
    const gradientStyle = (ctx, color1, color2) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        return gradient;
    };

    co2Chart = new Chart(document.getElementById('co2Chart'), {
        type: 'line',
        data: { labels: [], datasets: [{ label: 'CO₂ (ppm)', data: [], borderColor: '#60a5fa', backgroundColor: 'rgba(96, 165, 250, 0.05)', tension: 0.3, fill: true, pointRadius: 2, pointBorderColor: '#93c5fd' }] },
        options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { labels: { color: '#94a3b8' } } }, scales: { y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#7e8c9e' } }, x: { ticks: { color: '#7e8c9e' } } } }
    });

    humidityChart = new Chart(document.getElementById('humidityChart'), {
        type: 'line',
        data: { labels: [], datasets: [{ label: 'Humidity (%)', data: [], borderColor: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.05)', tension: 0.3, fill: true, pointRadius: 2 }] },
        options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { labels: { color: '#94a3b8' } } }, scales: { y: { min: 0, max: 100, grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#7e8c9e' } }, x: { ticks: { color: '#7e8c9e' } } } }
    });

    rainChart = new Chart(document.getElementById('rainChart'), {
        type: 'line',
        data: { labels: [], datasets: [{ label: 'Rainfall (mm)', data: [], borderColor: '#a78bfa', backgroundColor: 'rgba(167, 139, 250, 0.05)', tension: 0.3, fill: true, pointRadius: 2 }] },
        options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { labels: { color: '#94a3b8' } } }, scales: { y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#7e8c9e' } }, x: { ticks: { color: '#7e8c9e' } } } }
    });
}

// Bootstrap
async function bootstrap() {
    initCharts();
    await refreshAll();
    refreshInterval = setInterval(refreshAll, 5000);
}

// Handle visibility
function handleVisibility() {
    if (document.hidden) {
        if (refreshInterval) clearInterval(refreshInterval);
        refreshInterval = null;
    } else {
        if (!refreshInterval) {
            refreshInterval = setInterval(refreshAll, 5000);
            refreshAll();
        }
    }
}

document.addEventListener('visibilitychange', handleVisibility);
bootstrap().catch(err => {
    console.error(err);
    const grid = document.getElementById('dashboardGrid');
    if (grid) {
        const errDiv = document.createElement('div');
        errDiv.style.gridColumn = '1/-1';
        errDiv.className = 'error-message';
        errDiv.style.textAlign = 'center';
        errDiv.style.padding = '2rem';
        errDiv.innerHTML = '⚠ Connection failed · Verify API at localhost:8080';
        grid.prepend(errDiv);
    }
});