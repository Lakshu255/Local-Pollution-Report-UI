# 🌐 API Integration - Real-Time Data

## 🎉 NEW: Live Data Integration!

Your pollution dashboard now uses **REAL-TIME DATA** from **FREE PUBLIC APIs** - no login, no API keys, no registration required!

---

## 🚀 Integrated APIs

### 1. **Open-Meteo Weather API** ☁️

**What it provides:**
- Real-time temperature
- Humidity levels
- Wind speed
- Atmospheric pressure
- Visibility
- UV Index
- Precipitation
- Sunrise & sunset times

**Why it's awesome:**
- ✅ **100% Free** - No API key needed
- ✅ **No rate limits** for personal use
- ✅ **Fast & reliable** - European weather service
- ✅ **Global coverage** - Works anywhere in the world
- ✅ **No registration** - Just call the API

**API Endpoint:**
```
https://api.open-meteo.com/v1/forecast
?latitude={lat}
&longitude={lon}
&current=temperature_2m,relative_humidity_2m,wind_speed_10m,
        surface_pressure,visibility,uv_index,precipitation
&daily=sunrise,sunset,uv_index_max
&timezone=auto
```

**Example for Dharapuram (638656):**
```
https://api.open-meteo.com/v1/forecast
?latitude=10.7381
&longitude=77.5311
&current=temperature_2m,relative_humidity_2m,wind_speed_10m
```

**Learn more:** https://open-meteo.com/

---

### 2. **OpenAQ Air Quality API** 🌫️

**What it provides:**
- PM2.5 levels (real measurements)
- PM10 levels
- NO₂ (Nitrogen Dioxide)
- SO₂ (Sulfur Dioxide)
- CO (Carbon Monoxide)
- O₃ (Ozone)
- Real AQI calculation

**Why it's awesome:**
- ✅ **Open data** - Aggregates from 100+ sources
- ✅ **No API key** - Completely open
- ✅ **Global coverage** - 12,000+ locations
- ✅ **Government sources** - Official monitoring stations
- ✅ **Real-time updates** - Live sensor data

**API Endpoint:**
```
https://api.openaq.org/v2/latest
?coordinates={lat},{lon}
&radius=50000
&limit=100
```

**Example for Mumbai:**
```
https://api.openaq.org/v2/latest
?coordinates=19.0760,72.8777
&radius=50000
```

**Learn more:** https://openaq.org/

---

### 3. **OpenStreetMap Nominatim API** 📍

**What it provides:**
- Reverse geocoding (coordinates → address)
- City, district, state names
- Accurate location data
- Fallback for unknown PIN codes

**Why it's awesome:**
- ✅ **Free & open source** - No restrictions
- ✅ **No API key** - Open to all
- ✅ **Worldwide coverage** - OpenStreetMap data
- ✅ **Accurate addresses** - Community maintained
- ✅ **Reliable** - Used by millions

**API Endpoint:**
```
https://nominatim.openstreetmap.org/reverse
?lat={lat}
&lon={lon}
&format=json
```

**Example:**
```
https://nominatim.openstreetmap.org/reverse
?lat=10.7381
&lon=77.5311
&format=json
```

**Learn more:** https://nominatim.openstreetmap.org/

---

## 🔄 How It Works

### Data Flow:

```
User enters PIN/Vehicle code
         ↓
Get coordinates from database
         ↓
Fetch data from 3 APIs in parallel:
    ├─ Open-Meteo → Weather data
    ├─ OpenAQ → Air quality data
    └─ Nominatim → Location details (if needed)
         ↓
Merge API data with base data
         ↓
Calculate AQI from real PM2.5
         ↓
Display comprehensive report
```

### Smart Fallback System:

```javascript
if (API data available) {
  ✅ Use real-time data
  Show: "Live Data: Using real-time APIs"
} else if (API error/timeout) {
  ⚠️ Use simulated data
  Show: "Using simulated data (API unavailable)"
}
```

---

## 📊 Data Sources Comparison

| Metric | API Source | Coverage | Update Frequency |
|--------|-----------|----------|------------------|
| **Temperature** | Open-Meteo | Global | Hourly |
| **Humidity** | Open-Meteo | Global | Hourly |
| **Wind Speed** | Open-Meteo | Global | Hourly |
| **Pressure** | Open-Meteo | Global | Hourly |
| **Visibility** | Open-Meteo | Global | Hourly |
| **UV Index** | Open-Meteo | Global | Daily |
| **Precipitation** | Open-Meteo | Global | Hourly |
| **Sunrise/Sunset** | Open-Meteo | Global | Daily |
| **PM2.5** | OpenAQ | 12,000+ locations | Real-time (varies) |
| **PM10** | OpenAQ | 12,000+ locations | Real-time (varies) |
| **NO₂** | OpenAQ | Limited | Real-time (varies) |
| **SO₂** | OpenAQ | Limited | Real-time (varies) |
| **CO** | OpenAQ | Limited | Real-time (varies) |
| **O₃** | OpenAQ | Limited | Real-time (varies) |
| **Location** | Nominatim | Global | Static (OSM data) |

---

## 💡 Features

### ✅ Real-Time Weather
- Live temperature readings
- Current humidity levels
- Wind speed and direction
- Atmospheric pressure
- Visibility conditions
- UV Index for sun protection
- Precipitation data

### ✅ Real Air Quality
- PM2.5 from actual sensors
- PM10 measurements
- Pollutant gases (NO₂, SO₂, CO, O₃)
- Calculated AQI using EPA formula
- Data from nearby monitoring stations

### ✅ Smart Data Aggregation
- Combines data from multiple stations
- Averages values for accuracy
- Radius: 50km around location
- Prioritizes closest stations

### ✅ Automatic AQI Calculation
```javascript
// US EPA AQI formula
if (pm25 <= 12.0) AQI = (50/12.0) × pm25
if (pm25 <= 35.4) AQI = 50 + ((100-50)/(35.4-12.1)) × (pm25-12.1)
// ... and so on
```

### ✅ Visual Indicators
- 🟢 Green banner: "Live Data - Using real-time APIs"
- 🟡 Yellow banner: "Using simulated data (API unavailable)"
- Footer credits all API sources

---

## 🎯 Coverage Areas

### Best Coverage (Real-time everything):
- **Major Indian cities:** Delhi, Mumbai, Bangalore, Chennai, Kolkata
- **US cities:** All major metros
- **European cities:** Excellent coverage
- **China:** Good coverage in major cities

### Good Coverage (Weather + Limited Air Quality):
- **Tier 2 Indian cities:** Pune, Ahmedabad, Hyderabad
- **Rural areas:** Weather yes, Air quality limited
- **Global:** Weather everywhere, Air quality in monitored areas

### Simulated Data (Fallback):
- Areas without air quality monitors
- Network errors
- API timeouts
- Remote locations

---

## 🔍 Testing the APIs

### Test Case 1: Major City (Best Coverage)
```
Input: 110001 (Delhi)
Expected:
✅ Real weather: Yes (Open-Meteo)
✅ Real air quality: Yes (OpenAQ has Delhi stations)
✅ Real AQI: Calculated from actual PM2.5
✅ Banner: "Live Data - Using real-time APIs"
```

### Test Case 2: Small Town (Weather Only)
```
Input: 638656 (Dharapuram)
Expected:
✅ Real weather: Yes (Open-Meteo covers everywhere)
❌ Real air quality: Maybe not (limited monitors)
⚠️ Banner: May show "Using simulated data for air quality"
```

### Test Case 3: Rural Area
```
Input: Unknown PIN
Expected:
✅ Real weather: Yes (coordinates-based)
❌ Real air quality: Unlikely (no monitors)
⚠️ Simulated data with disclaimer
```

---

## 📱 API Response Examples

### Open-Meteo Response:
```json
{
  "current": {
    "temperature_2m": 32.5,
    "relative_humidity_2m": 65,
    "wind_speed_10m": 12.3,
    "surface_pressure": 1013.2,
    "visibility": 8500,
    "uv_index": 7,
    "precipitation": 0
  },
  "daily": {
    "sunrise": ["2026-01-15T06:24"],
    "sunset": ["2026-01-15T18:12"]
  }
}
```

### OpenAQ Response:
```json
{
  "results": [
    {
      "measurements": [
        {
          "parameter": "pm25",
          "value": 78.5,
          "lastUpdated": "2026-01-15T10:30:00Z"
        }
      ]
    }
  ]
}
```

---

## ⚡ Performance

### Speed:
- **Parallel API calls** - All 3 APIs called simultaneously
- **Typical response time:** 1-3 seconds
- **Timeout:** 10 seconds (then fallback)
- **Loading state:** Shows while fetching

### Caching:
- Browser automatically caches API responses
- Fresh data on each search
- No backend caching needed

### Rate Limits:
- **Open-Meteo:** No limits for personal use
- **OpenAQ:** 10,000 requests/day (more than enough)
- **Nominatim:** 1 request/second (we're well within)

---

## 🛠️ Technical Implementation

### Key Functions:

```javascript
// 1. Fetch weather
fetchRealWeatherData(lat, lon)
  → Open-Meteo API
  → Returns: temperature, humidity, wind, etc.

// 2. Fetch air quality
fetchRealAirQualityData(lat, lon)
  → OpenAQ API
  → Returns: PM2.5, PM10, NO₂, SO₂, etc.

// 3. Reverse geocode
fetchLocationFromCoordinates(lat, lon)
  → Nominatim API
  → Returns: city, district, state

// 4. Main search handler
handleSearch()
  → Get coordinates
  → Call all APIs in parallel (Promise.all)
  → Merge data
  → Display results
```

### Error Handling:

```javascript
try {
  const apiData = await fetchAPI();
  // Use real data ✅
} catch (error) {
  console.error('API error:', error);
  // Fall back to simulated data ⚠️
}
```

---

## 🌟 Benefits

### For Users:
- ✅ **Real data** - Not simulated
- ✅ **Accurate** - From official sources
- ✅ **Current** - Live updates
- ✅ **Reliable** - Multiple sources
- ✅ **Free** - No cost to use

### For Developers:
- ✅ **No API keys** - Zero setup
- ✅ **No authentication** - No hassle
- ✅ **No rate limits** - (for reasonable use)
- ✅ **Well documented** - Good API docs
- ✅ **Open source** - Community supported

---

## 📝 API Attribution

As required by the APIs:

### Open-Meteo:
- Free weather API
- Attribution: https://open-meteo.com/
- License: CC BY 4.0

### OpenAQ:
- Open air quality data
- Attribution: https://openaq.org/
- License: CC BY 4.0

### Nominatim:
- OpenStreetMap geocoding
- Attribution: OpenStreetMap contributors
- License: ODbL

---

## 🔮 Future Enhancements

### Potential Additional APIs (All Free):

1. **World Air Quality Index (WAQI)**
   - https://aqicn.org/api/
   - More air quality stations
   - Free tier: 1000 requests/day

2. **Tomorrow.io (Free Tier)**
   - https://www.tomorrow.io/
   - Advanced weather forecasts
   - Free: 500 calls/day

3. **Weatherbit (Free Tier)**
   - https://www.weatherbit.io/
   - Current & forecast weather
   - Free: 500 calls/day

4. **AirVisual (Free Tier)**
   - https://www.iqair.com/air-pollution-data-api
   - Air quality data
   - Free tier available

---

## ✅ Current Status

**All APIs integrated and working!** ✅

- ✅ Open-Meteo: Live weather data
- ✅ OpenAQ: Real air quality (where available)
- ✅ Nominatim: Location details
- ✅ Smart fallback system
- ✅ Visual indicators
- ✅ Error handling
- ✅ Parallel API calls
- ✅ No authentication required

**Test it now with any PIN code!** 🚀

---

**Remember:** Air quality data availability depends on whether there are monitoring stations near your location. Weather data works everywhere!
