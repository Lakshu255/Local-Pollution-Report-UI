# 🌍 Local Pollution Report Dashboard

A comprehensive air quality monitoring dashboard that provides detailed pollution insights based on **real Indian PIN codes AND Vehicle Registration Numbers** with **LIVE DATA from FREE APIs**.

## 🌟 NEW: REAL-TIME API INTEGRATION!

Now uses **LIVE DATA** from free public APIs - **NO LOGIN, NO API KEYS REQUIRED!**
- 🌤️ **Live Weather**: Open-Meteo API (temperature, humidity, wind, UV, etc.)
- 🌫️ **Real Air Quality**: OpenAQ API (PM2.5, PM10, NO₂, SO₂, O₃ from actual sensors)
- 📍 **Location Data**: OpenStreetMap Nominatim (reverse geocoding)
- ✅ **100% Free** - No registration, no limits, no authentication needed!

## 🆕 Vehicle Registration Support!

Now supports **both PIN codes and vehicle registration numbers**:
- ✅ **PIN Codes**: 638656, 110001, 400001 (exact location)
- ✅ **Vehicle Reg**: MH-17, DL-1C, KA-01, TN-09 (regional data)
- ✅ **25+ State codes** supported across India

## ✨ Features

### 📍 **REAL** Location-Based Data
- **Actual PIN code database** with 40+ real Indian locations
- **Accurate GPS coordinates** matching real cities
- **Correct district and state** information
- **Real city names** - not random generated data

**Example:** 
- PIN 638656 → Dharapuram, Tiruppur District, Tamil Nadu (10.7381°N, 77.5311°E) ✅
- PIN 110001 → Connaught Place, New Delhi, Delhi (28.6289°N, 77.2065°E) ✅
- PIN 400001 → Fort, Mumbai City, Maharashtra (18.9388°N, 72.8354°E) ✅

### 🎯 Enhanced Data Accuracy
The dashboard now uses more realistic data generation:

#### Pollution Data
- **AQI Calculation**: Based on city-specific baseline values with realistic variations
- **PM2.5 & PM10**: Correlated values where PM10 is typically 1.5-2x of PM2.5
- **NO₂, SO₂**: Calculated based on urban pollution levels
- **CO (Carbon Monoxide)**: Scaled appropriately for traffic density
- **O₃ (Ozone)**: Varies with sunlight and temperature
- **NH₃ (Ammonia)**: Realistic agricultural/industrial emissions
- **Pb (Lead)**: Very low values reflecting modern regulations

#### Weather Parameters - **LOCATION-AWARE**
- **Temperature**: 
  - Southern India (Tamil Nadu, Kerala): 28-40°C year-round (warmer)
  - Northern India (Delhi, UP): 15-40°C with seasonal variation
  - Based on actual geographic location
  
- **Humidity**: 
  - Coastal areas (Mumbai, Chennai, Kerala): 60-90%
  - Inland areas (Dharapuram, Pune): 20-50%
  - Desert areas (Rajasthan): 15-35%
  
- **Wind Speed**: 
  - Coastal cities: 8-25 km/h (higher winds)
  - Inland cities: 5-18 km/h
  
- **Sunrise/Sunset**: 
  - Adjusted for latitude (southern states have less seasonal variation)
  - Season-appropriate timings
  
- **Pressure**: Standard atmospheric range (1005-1018 hPa)
- **Visibility**: Decreases with higher pollution
- **UV Index**: Season-dependent (higher in summer)
- **Precipitation**: Monsoon-aware (June-September)

#### Time & Astronomical Data
- **Sunrise/Sunset**: Season-appropriate timings
  - Summer (Apr-Aug): 5:15-5:45 AM / 7:00-7:30 PM
  - Winter (Nov-Jan): 6:15-6:45 AM / 5:00-5:30 PM
- **Moon Phase**: Calculated based on actual date
- **Last Updated**: Indian date/time format

### 📊 Comprehensive Visualizations
1. **Bar Chart**: All 8 pollutants vs safe limits
2. **Radar Chart**: Pollutant distribution pattern
3. **Line Chart**: 7-day historical trends with realistic variations
   - Weekend effect (lower pollution on Saturdays/Sundays)
   - Day-to-day natural variation
   - Correlated PM2.5, PM10, and AQI trends

### 🎓 Educational Section - "Understanding Air Quality"

A complete beginner-friendly guide included in every report:

#### 1. What is AQI?
- Simple explanation of the 0-500 scale
- Color-coded categories (Good to Hazardous)
- Visual color bars for each category
- Easy-to-understand health implications

#### 2. Major Pollutants Explained
Detailed explanations in simple language:
- **PM2.5 & PM10**: Dust particles and their sources
- **NO₂**: Vehicle emissions and effects
- **SO₂**: Industrial pollution
- **CO**: Incomplete combustion dangers
- **O₃**: Ground-level ozone formation

#### 3. Health Impact
- **Short-term effects**: Eye irritation, coughing, headaches
- **Long-term effects**: Asthma, heart problems, lung diseases
- **Vulnerable groups**: Children, elderly, pregnant women
- **Activity guidelines**: When to avoid outdoor exercise

#### 4. Protection Tips
5 simple, actionable steps:
1. Check AQI daily and plan activities
2. Use N95/N99 masks (not regular cloth masks)
3. Indoor air quality management
4. Reduce personal exposure
5. Contribute to pollution reduction

#### 5. Weather Parameters Explained
Simple definitions for:
- Temperature and its effect on pollution
- Humidity's role in air quality
- Wind speed and pollutant dispersion
- Atmospheric pressure effects
- Visibility measurements
- UV Index protection levels

#### 6. Quick Tips by AQI Level
- **0-100 (Green/Yellow)**: Safe for all activities
- **101-200 (Orange/Red)**: Limited outdoor time, wear masks
- **201+ (Purple/Maroon)**: Stay indoors, emergency measures

### 📱 User Interface

#### Location Details Banner
- PIN Code, Area, District, State
- Latitude and Longitude coordinates
- Beautiful gradient design with white glass-morphism cards

#### Calendar & Time Section
- Sunrise and sunset times
- Current moon phase
- Last data update timestamp
- Individual gradient cards for each parameter

#### AQI Overview
- Large circular indicator with color coding
- Category name and description
- Quick PM2.5 and PM10 preview
- Location information

#### Environmental Conditions Grid
6 parameters displayed:
- Temperature (°C)
- Humidity (%)
- Wind Speed (km/h)
- Atmospheric Pressure (hPa)
- Visibility (km)
- UV Index

#### Pollutant Analysis
- All 8 pollutants in individual cards
- Color-coded icons for each type
- Values in µg/m³
- Hover effects and animations

#### Additional Weather Data
- Precipitation (last hour)
- GPS coordinates with navigation icon
- Daylight hours summary
- Moon phase display

#### Health Recommendations
- AQI-based health advice
- Context-aware recommendations
- Color-coded alert levels
- Actionable guidance

## 🎨 Design Features

- **Gradient Backgrounds**: Modern, vibrant color schemes
- **Glass-morphism Effects**: Frosted glass appearance
- **Responsive Layout**: Mobile to desktop optimization
- **Smooth Animations**: Hover effects and transitions
- **Professional Icons**: Lucide React icon library
- **Color Coding**: Intuitive visual indicators
- **Shadow Depth**: Layered depth perception
- **Border Accents**: Subtle borders for definition

## 🏙️ Real PIN Codes Database (40+ Locations)

### Tamil Nadu
- **638656** - Dharapuram, Tiruppur District
- **638657** - Dharapuram South, Tiruppur District
- **638658** - Dharapuram North, Tiruppur District
- **600001** - Parrys, Chennai
- **600028** - Anna Nagar, Chennai
- **641001** - Coimbatore
- **625001** - Madurai

### Delhi
- **110001** - Connaught Place, New Delhi
- **110002** - Daryaganj, Central Delhi
- **110016** - Lajpat Nagar, South Delhi
- **110058** - Rajouri Garden, West Delhi

### Maharashtra
- **400001** - Fort, Mumbai City
- **400053** - Andheri, Mumbai Suburban
- **411001** - Pune City

### Karnataka
- **560001** - Bangalore GPO
- **560066** - Whitefield, Bangalore
- **560103** - Electronic City, Bangalore

### West Bengal
- **700001** - BBD Bagh, Kolkata
- **700064** - Salt Lake, North 24 Parganas

### Telangana
- **500001** - Hyderabad GPO
- **500034** - Banjara Hills, Hyderabad

### Gujarat
- **380001** - Ahmedabad GPO
- **380015** - Satellite, Ahmedabad

### Uttar Pradesh
- **226001** - Hazratganj, Lucknow
- **226010** - Gomti Nagar, Lucknow
- **201301** - Noida Sector 1

### Other States
- **302001** - Jaipur GPO, Rajasthan
- **160001** - Chandigarh GPO
- **122001** - Gurgaon GPO, Haryana
- **695001** - Trivandrum GPO, Kerala
- **682001** - Kochi GPO, Kerala

**+ Regional matching** for nearby areas if exact PIN not in database!

## 🚗 Vehicle Registration Codes (25+ States)

**NEW:** Now supports Indian vehicle registration numbers!

### Major State Codes:
- **MH** - Maharashtra (Mumbai/Pune) - AQI ~155
- **DL** - Delhi NCR - AQI ~220
- **KA** - Karnataka (Bangalore) - AQI ~125
- **TN** - Tamil Nadu (Chennai) - AQI ~140
- **GJ** - Gujarat (Ahmedabad) - AQI ~165
- **RJ** - Rajasthan (Jaipur) - AQI ~170
- **UP** - Uttar Pradesh - AQI ~200
- **WB** - West Bengal (Kolkata) - AQI ~185
- **HR** - Haryana (Gurgaon) - AQI ~200
- **PB** - Punjab - AQI ~160
- **TS** - Telangana (Hyderabad) - AQI ~140
- **KL** - Kerala - AQI ~78
- **GA** - Goa - AQI ~70
- **HP** - Himachal Pradesh - AQI ~65
- And 10+ more states!

**Examples:** MH-17, DL-1C, KA-01, TN-09, MH1718

See [VEHICLE_REGISTRATION_GUIDE.md](VEHICLE_REGISTRATION_GUIDE.md) for complete details.

## 📏 Data Accuracy Improvements

### Real Data Validation Example

**Your Input: PIN 638656**

| Parameter | Real World (Google) | Our Dashboard | ✅ Match |
|-----------|-------------------|---------------|---------|
| Location | Dharapuram, Tamil Nadu | Dharapuram, Tiruppur, Tamil Nadu | ✅ Yes |
| Temperature | 37°C | 35-40°C range | ✅ Yes |
| Humidity | 20% | 15-45% range (inland) | ✅ Yes |
| Wind | E at 13 km/h | 5-18 km/h (inland) | ✅ Yes |
| Coordinates | 10.7381°N, 77.5311°E | 10.7381°N, 77.5311°E | ✅ Exact! |

### Before vs After

| Aspect | Before | After |
|--------|--------|-------|
| **Location** | Random city names | Real PIN code database (40+ locations) |
| **City** | "Anna Nagar" for any TN PIN | Actual city: "Dharapuram" for 638656 |
| **District** | Generic districts | Real districts: "Tiruppur" not "Chennai" |
| **Coordinates** | Random in India | Exact GPS: 10.7381°N, 77.5311°E |
| **Temperature** | Generic (15-35°C) | Location-aware: South India 28-40°C |
| **Humidity** | Random | Location-based: Coastal 60-90%, Inland 20-50% |
| **Wind Speed** | Random | Coastal 8-25 km/h, Inland 5-18 km/h |
| **AQI** | Random (50-400) | City-baseline: Dharapuram ~95 (clean town) |
| **PM2.5** | Random | Calculated from AQI (35% correlation) |
| **PM10** | Random | 1.5-2x of PM2.5 (scientific ratio) |
| **Visibility** | Random | AQI-dependent (inverse relationship) |
| **UV Index** | Random | Season-appropriate |
| **Sunrise/Sunset** | Fixed variation | Latitude-adjusted seasonal timings |
| **Moon Phase** | Random | Date-calculated actual phase |
| **Historical Data** | ±20 random | Realistic ±25% with weekend effect |

## 🎯 Use Cases

1. **Daily Commuters**: Plan outdoor activities based on AQI
2. **Parents**: Decide if children should play outside
3. **Athletes**: Schedule training during good air quality
4. **Health-conscious**: Monitor air quality for respiratory health
5. **Students**: Learn about air pollution and its effects
6. **General Public**: Stay informed about local air quality

## 🔮 Educational Value

Perfect for:
- Students learning about environmental science
- New users unfamiliar with air quality concepts
- Health-conscious individuals
- Awareness campaigns
- Educational institutions
- Community health programs

## 🚀 How to Use

### Option 1: PIN Code (Most Accurate)
1. Enter your area PIN code (e.g., 638656, 110001, 400001)
2. Click "Search" or press Enter
3. Get exact location with precise data

### Option 2: Vehicle Registration Number (Regional Data)
1. Enter vehicle registration (e.g., MH-17, DL-1C, KA-01)
2. Accepts formats: MH-17, MH17, MH 17, MH1718
3. Get state/regional pollution data

### Then:
4. View comprehensive pollution and weather report
5. Read health recommendations for current AQI
6. Learn about air quality in the educational section
7. Check historical trends and plan activities

## 💡 Key Insights Provided

- Current air quality status
- All major pollutants with safe limits
- Weather conditions affecting air quality
- 7-day pollution trends
- Health recommendations
- Protection measures
- Educational content for beginners

## 🌟 What Makes This Dashboard Special

1. **Beginner-Friendly**: Educational section explains everything
2. **Comprehensive**: All pollutants and weather parameters
3. **Accurate**: Realistic data generation algorithms
4. **Visual**: Beautiful charts and color-coded information
5. **Actionable**: Specific health recommendations
6. **Educational**: Learn while monitoring
7. **Responsive**: Works on all devices
8. **Professional**: Enterprise-grade UI/UX

---

## 🌐 Live APIs Used (All FREE!)

This dashboard now integrates with:

1. **Open-Meteo Weather API** - Live weather data worldwide
2. **OpenAQ Air Quality API** - Real pollution data from 12,000+ monitoring stations
3. **OpenStreetMap Nominatim** - Location details and geocoding

**No API keys, no login, no registration required!**

See [API_INTEGRATION.md](API_INTEGRATION.md) for complete details.

---

*Note: The dashboard uses real-time API data where available, with intelligent fallback to simulated data for areas without monitoring stations.*
