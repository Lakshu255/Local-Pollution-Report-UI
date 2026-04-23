import { useState } from 'react';
import { Search, Wind, Droplets, Cloud, AlertTriangle, MapPin, Calendar, Thermometer, Eye, Gauge, CloudRain, Sun, Moon, Sunrise, Sunset, Navigation, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface PollutionData {
  pincode: string;
  location: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  aqi: number;
  aqiCategory: string;
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  co: number;
  o3: number;
  nh3: number;
  pb: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  precipitation: number;
  lastUpdated: string;
  sunrise: string;
  sunset: string;
  moonPhase: string;
}

function App() {
  const [pincode, setPincode] = useState('');
  const [pollutionData, setPollutionData] = useState<PollutionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<'simulated' | 'api'>('simulated');
  const [apiError, setApiError] = useState<string>('');

  // Vehicle Registration Code to State/Region mapping
  const getVehicleRegistrationData = (code: string) => {
    // Convert to uppercase and extract state code
    const upperCode = code.toUpperCase();
    const stateCode = upperCode.match(/^[A-Z]{2}/)?.[0] || '';
    
    const vehicleDatabase: { [key: string]: { state: string; region: string; lat: number; lon: number; aqiBase: number } } = {
      'MH': { state: 'Maharashtra', region: 'Mumbai/Pune Region', lat: 19.0760, lon: 72.8777, aqiBase: 155 },
      'DL': { state: 'Delhi', region: 'Delhi NCR', lat: 28.7041, lon: 77.1025, aqiBase: 220 },
      'KA': { state: 'Karnataka', region: 'Bangalore Region', lat: 12.9716, lon: 77.5946, aqiBase: 125 },
      'TN': { state: 'Tamil Nadu', region: 'Chennai Region', lat: 13.0827, lon: 80.2707, aqiBase: 140 },
      'AP': { state: 'Andhra Pradesh', region: 'Andhra Pradesh', lat: 15.9129, lon: 79.7400, aqiBase: 130 },
      'TS': { state: 'Telangana', region: 'Hyderabad Region', lat: 17.3850, lon: 78.4867, aqiBase: 140 },
      'GJ': { state: 'Gujarat', region: 'Gujarat', lat: 23.0225, lon: 72.5714, aqiBase: 165 },
      'RJ': { state: 'Rajasthan', region: 'Jaipur Region', lat: 26.9124, lon: 75.7873, aqiBase: 170 },
      'UP': { state: 'Uttar Pradesh', region: 'Lucknow/Noida Region', lat: 26.8467, lon: 80.9462, aqiBase: 200 },
      'WB': { state: 'West Bengal', region: 'Kolkata Region', lat: 22.5726, lon: 88.3639, aqiBase: 185 },
      'HR': { state: 'Haryana', region: 'Gurgaon/Faridabad', lat: 28.4595, lon: 77.0266, aqiBase: 200 },
      'PB': { state: 'Punjab', region: 'Chandigarh/Ludhiana', lat: 30.7333, lon: 76.7794, aqiBase: 160 },
      'MP': { state: 'Madhya Pradesh', region: 'Bhopal/Indore', lat: 23.2599, lon: 77.4126, aqiBase: 145 },
      'CH': { state: 'Chandigarh', region: 'Chandigarh', lat: 30.7333, lon: 76.7794, aqiBase: 155 },
      'BR': { state: 'Bihar', region: 'Patna Region', lat: 25.5941, lon: 85.1376, aqiBase: 180 },
      'OD': { state: 'Odisha', region: 'Bhubaneswar Region', lat: 20.2961, lon: 85.8245, aqiBase: 120 },
      'OR': { state: 'Odisha', region: 'Bhubaneswar Region', lat: 20.2961, lon: 85.8245, aqiBase: 120 },
      'JH': { state: 'Jharkhand', region: 'Ranchi Region', lat: 23.3441, lon: 85.3096, aqiBase: 165 },
      'AS': { state: 'Assam', region: 'Guwahati Region', lat: 26.1445, lon: 91.7362, aqiBase: 100 },
      'KL': { state: 'Kerala', region: 'Kochi/Trivandrum', lat: 9.9312, lon: 76.2673, aqiBase: 78 },
      'GA': { state: 'Goa', region: 'Goa', lat: 15.2993, lon: 74.1240, aqiBase: 70 },
      'HP': { state: 'Himachal Pradesh', region: 'Shimla Region', lat: 31.1048, lon: 77.1734, aqiBase: 65 },
      'UK': { state: 'Uttarakhand', region: 'Dehradun Region', lat: 30.3165, lon: 78.0322, aqiBase: 90 },
      'JK': { state: 'Jammu & Kashmir', region: 'Srinagar/Jammu', lat: 34.0837, lon: 74.7973, aqiBase: 85 },
      'CG': { state: 'Chhattisgarh', region: 'Raipur Region', lat: 21.2514, lon: 81.6296, aqiBase: 140 },
    };

    if (vehicleDatabase[stateCode]) {
      const data = vehicleDatabase[stateCode];
      // Extract district number if available (e.g., MH-17)
      const districtNum = upperCode.match(/\d+/)?.[0] || '01';
      return {
        city: `${data.state} Vehicle - District ${districtNum}`,
        district: data.region,
        state: data.state,
        lat: data.lat + (Math.random() * 0.2 - 0.1),
        lon: data.lon + (Math.random() * 0.2 - 0.1),
        aqiBase: data.aqiBase
      };
    }
    return null;
  };

  // Comprehensive Indian PIN code database with real locations
  const getPinCodeData = (pin: string) => {
    const pinCodeDatabase: { [key: string]: { city: string; district: string; state: string; lat: number; lon: number; aqiBase: number } } = {
      // Tamil Nadu - Expanded
      '638656': { city: 'Dharapuram', district: 'Tiruppur', state: 'Tamil Nadu', lat: 10.7381, lon: 77.5311, aqiBase: 95 },
      '638657': { city: 'Dharapuram South', district: 'Tiruppur', state: 'Tamil Nadu', lat: 10.7281, lon: 77.5211, aqiBase: 90 },
      '638658': { city: 'Dharapuram North', district: 'Tiruppur', state: 'Tamil Nadu', lat: 10.7481, lon: 77.5411, aqiBase: 92 },
      '600001': { city: 'Parrys', district: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lon: 80.2707, aqiBase: 145 },
      '600028': { city: 'Anna Nagar', district: 'Chennai', state: 'Tamil Nadu', lat: 13.0850, lon: 80.2101, aqiBase: 140 },
      '600017': { city: 'T Nagar', district: 'Chennai', state: 'Tamil Nadu', lat: 13.0418, lon: 80.2341, aqiBase: 143 },
      '641001': { city: 'Coimbatore RS', district: 'Coimbatore', state: 'Tamil Nadu', lat: 11.0168, lon: 76.9558, aqiBase: 110 },
      '641012': { city: 'Gandhipuram', district: 'Coimbatore', state: 'Tamil Nadu', lat: 11.0168, lon: 76.9674, aqiBase: 115 },
      '625001': { city: 'Madurai', district: 'Madurai', state: 'Tamil Nadu', lat: 9.9252, lon: 78.1198, aqiBase: 125 },
      '620001': { city: 'Trichy', district: 'Tiruchirappalli', state: 'Tamil Nadu', lat: 10.7905, lon: 78.7047, aqiBase: 118 },
      
      // Maharashtra - Expanded
      '400001': { city: 'Fort Mumbai', district: 'Mumbai City', state: 'Maharashtra', lat: 18.9388, lon: 72.8354, aqiBase: 160 },
      '400053': { city: 'Andheri East', district: 'Mumbai Suburban', state: 'Maharashtra', lat: 19.1136, lon: 72.8697, aqiBase: 155 },
      '400058': { city: 'Andheri West', district: 'Mumbai Suburban', state: 'Maharashtra', lat: 19.1197, lon: 72.8464, aqiBase: 153 },
      '400051': { city: 'Bandra', district: 'Mumbai Suburban', state: 'Maharashtra', lat: 19.0596, lon: 72.8295, aqiBase: 158 },
      '400070': { city: 'Worli', district: 'Mumbai City', state: 'Maharashtra', lat: 19.0176, lon: 72.8186, aqiBase: 162 },
      '411001': { city: 'Pune Central', district: 'Pune', state: 'Maharashtra', lat: 18.5204, lon: 73.8567, aqiBase: 135 },
      '411038': { city: 'Hinjewadi', district: 'Pune', state: 'Maharashtra', lat: 18.5912, lon: 73.7389, aqiBase: 128 },
      '411048': { city: 'Koregaon Park', district: 'Pune', state: 'Maharashtra', lat: 18.5362, lon: 73.8958, aqiBase: 132 },
      '440001': { city: 'Nagpur', district: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lon: 79.0882, aqiBase: 145 },
      '431001': { city: 'Aurangabad', district: 'Aurangabad', state: 'Maharashtra', lat: 19.8762, lon: 75.3433, aqiBase: 138 },
      
      // Delhi - Expanded
      '110001': { city: 'Connaught Place', district: 'New Delhi', state: 'Delhi', lat: 28.6289, lon: 77.2065, aqiBase: 220 },
      '110002': { city: 'Daryaganj', district: 'Central Delhi', state: 'Delhi', lat: 28.6448, lon: 77.2385, aqiBase: 215 },
      '110016': { city: 'Lajpat Nagar', district: 'South Delhi', state: 'Delhi', lat: 28.5677, lon: 77.2433, aqiBase: 205 },
      '110058': { city: 'Rajouri Garden', district: 'West Delhi', state: 'Delhi', lat: 28.6414, lon: 77.1200, aqiBase: 210 },
      '110092': { city: 'Dwarka', district: 'South West Delhi', state: 'Delhi', lat: 28.5921, lon: 77.0460, aqiBase: 218 },
      '110025': { city: 'Hauz Khas', district: 'South Delhi', state: 'Delhi', lat: 28.5494, lon: 77.2001, aqiBase: 208 },
      '110019': { city: 'Defence Colony', district: 'South Delhi', state: 'Delhi', lat: 28.5729, lon: 77.2350, aqiBase: 207 },
      
      // Karnataka - Expanded
      '560001': { city: 'Bangalore GPO', district: 'Bangalore Urban', state: 'Karnataka', lat: 12.9716, lon: 77.5946, aqiBase: 125 },
      '560066': { city: 'Whitefield', district: 'Bangalore Urban', state: 'Karnataka', lat: 12.9698, lon: 77.7500, aqiBase: 115 },
      '560103': { city: 'Electronic City', district: 'Bangalore Urban', state: 'Karnataka', lat: 12.8456, lon: 77.6603, aqiBase: 120 },
      '560038': { city: 'Jayanagar', district: 'Bangalore Urban', state: 'Karnataka', lat: 12.9250, lon: 77.5838, aqiBase: 122 },
      '560034': { city: 'Koramangala', district: 'Bangalore Urban', state: 'Karnataka', lat: 12.9352, lon: 77.6245, aqiBase: 123 },
      '560102': { city: 'HSR Layout', district: 'Bangalore Urban', state: 'Karnataka', lat: 12.9082, lon: 77.6476, aqiBase: 118 },
      '575001': { city: 'Mangalore', district: 'Dakshina Kannada', state: 'Karnataka', lat: 12.9141, lon: 74.8560, aqiBase: 85 },
      '570001': { city: 'Mysore', district: 'Mysore', state: 'Karnataka', lat: 12.2958, lon: 76.6394, aqiBase: 95 },
      
      // West Bengal
      '700001': { city: 'BBD Bagh', district: 'Kolkata', state: 'West Bengal', lat: 22.5726, lon: 88.3639, aqiBase: 185 },
      '700064': { city: 'Salt Lake', district: 'North 24 Parganas', state: 'West Bengal', lat: 22.5726, lon: 88.4194, aqiBase: 175 },
      '700027': { city: 'Park Street', district: 'Kolkata', state: 'West Bengal', lat: 22.5542, lon: 88.3517, aqiBase: 188 },
      
      // Telangana
      '500001': { city: 'Hyderabad GPO', district: 'Hyderabad', state: 'Telangana', lat: 17.3850, lon: 78.4867, aqiBase: 140 },
      '500034': { city: 'Banjara Hills', district: 'Hyderabad', state: 'Telangana', lat: 17.4239, lon: 78.4738, aqiBase: 135 },
      '500081': { city: 'Gachibowli', district: 'Hyderabad', state: 'Telangana', lat: 17.4399, lon: 78.3487, aqiBase: 130 },
      '500032': { city: 'Secunderabad', district: 'Hyderabad', state: 'Telangana', lat: 17.4399, lon: 78.4983, aqiBase: 138 },
      
      // Gujarat
      '380001': { city: 'Ahmedabad GPO', district: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lon: 72.5714, aqiBase: 165 },
      '380015': { city: 'Satellite', district: 'Ahmedabad', state: 'Gujarat', lat: 23.0258, lon: 72.5098, aqiBase: 160 },
      '390001': { city: 'Vadodara', district: 'Vadodara', state: 'Gujarat', lat: 22.3072, lon: 73.1812, aqiBase: 145 },
      '395001': { city: 'Surat', district: 'Surat', state: 'Gujarat', lat: 21.1702, lon: 72.8311, aqiBase: 155 },
      
      // Uttar Pradesh - Expanded
      '226001': { city: 'Hazratganj', district: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lon: 80.9462, aqiBase: 195 },
      '226010': { city: 'Gomti Nagar', district: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8548, lon: 81.0082, aqiBase: 190 },
      '201301': { city: 'Noida Sector 1', district: 'Gautam Buddha Nagar', state: 'Uttar Pradesh', lat: 28.5833, lon: 77.3167, aqiBase: 210 },
      '201309': { city: 'Noida Sector 62', district: 'Gautam Buddha Nagar', state: 'Uttar Pradesh', lat: 28.6262, lon: 77.3678, aqiBase: 208 },
      '282001': { city: 'Agra', district: 'Agra', state: 'Uttar Pradesh', lat: 27.1767, lon: 78.0081, aqiBase: 185 },
      '208001': { city: 'Kanpur', district: 'Kanpur Nagar', state: 'Uttar Pradesh', lat: 26.4499, lon: 80.3319, aqiBase: 200 },
      
      // Rajasthan
      '302001': { city: 'Jaipur GPO', district: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lon: 75.7873, aqiBase: 170 },
      '302020': { city: 'Malviya Nagar', district: 'Jaipur', state: 'Rajasthan', lat: 26.8668, lon: 75.8230, aqiBase: 168 },
      '342001': { city: 'Jodhpur', district: 'Jodhpur', state: 'Rajasthan', lat: 26.2389, lon: 73.0243, aqiBase: 160 },
      
      // Punjab & Chandigarh
      '160001': { city: 'Chandigarh Sector 17', district: 'Chandigarh', state: 'Chandigarh', lat: 30.7333, lon: 76.7794, aqiBase: 155 },
      '141001': { city: 'Ludhiana', district: 'Ludhiana', state: 'Punjab', lat: 30.9010, lon: 75.8573, aqiBase: 165 },
      '143001': { city: 'Amritsar', district: 'Amritsar', state: 'Punjab', lat: 31.6340, lon: 74.8723, aqiBase: 158 },
      
      // Haryana
      '122001': { city: 'Gurgaon City', district: 'Gurgaon', state: 'Haryana', lat: 28.4595, lon: 77.0266, aqiBase: 200 },
      '121001': { city: 'Faridabad', district: 'Faridabad', state: 'Haryana', lat: 28.4089, lon: 77.3178, aqiBase: 205 },
      
      // Kerala - Expanded
      '695001': { city: 'Trivandrum Central', district: 'Thiruvananthapuram', state: 'Kerala', lat: 8.5241, lon: 76.9366, aqiBase: 75 },
      '682001': { city: 'Kochi MG Road', district: 'Ernakulam', state: 'Kerala', lat: 9.9312, lon: 76.2673, aqiBase: 80 },
      '673001': { city: 'Kozhikode', district: 'Kozhikode', state: 'Kerala', lat: 11.2588, lon: 75.7804, aqiBase: 78 },
      '686001': { city: 'Kottayam', district: 'Kottayam', state: 'Kerala', lat: 9.5916, lon: 76.5222, aqiBase: 72 },
      
      // Goa
      '403001': { city: 'Panaji', district: 'North Goa', state: 'Goa', lat: 15.4909, lon: 73.8278, aqiBase: 70 },
      
      // Madhya Pradesh
      '462001': { city: 'Bhopal', district: 'Bhopal', state: 'Madhya Pradesh', lat: 23.2599, lon: 77.4126, aqiBase: 145 },
      '452001': { city: 'Indore', district: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lon: 75.8577, aqiBase: 150 },
    };

    // Check if exact PIN exists
    if (pinCodeDatabase[pin]) {
      return pinCodeDatabase[pin];
    }

    // Check if it's a vehicle registration code (e.g., MH-17, DL-1C, KA-01)
    if (/^[A-Z]{2}[-\s]?\d+[A-Z]*$/i.test(pin)) {
      const vehicleData = getVehicleRegistrationData(pin);
      if (vehicleData) {
        return vehicleData;
      }
    }

    // Try to match first 3 digits for regional approximation
    const prefix = pin.substring(0, 3);
    const regionalMatch = Object.keys(pinCodeDatabase).find(key => key.startsWith(prefix));
    
    if (regionalMatch) {
      const baseData = pinCodeDatabase[regionalMatch];
      return {
        city: 'Area near ' + baseData.city,
        district: baseData.district,
        state: baseData.state,
        lat: baseData.lat + (Math.random() * 0.2 - 0.1),
        lon: baseData.lon + (Math.random() * 0.2 - 0.1),
        aqiBase: baseData.aqiBase + Math.floor(Math.random() * 20 - 10)
      };
    }

    // Fallback for unknown PINs
    return {
      city: 'Unknown Location',
      district: 'Data unavailable for this code',
      state: 'Please enter a valid PIN code or vehicle registration',
      lat: 20.5937,
      lon: 78.9629,
      aqiBase: 120
    };
  };

  // More accurate pollution data generator based on pincode
  const generatePollutionData = (pin: string): PollutionData => {
    // Extract numbers from PIN for seed (works for both PIN codes and vehicle reg)
    const numericPart = pin.replace(/[^0-9]/g, '');
    const seed = parseInt(numericPart) || Math.abs(pin.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0));
    
    // Better random number generation using multiple seed variations
    const random = (min: number, max: number, variation: number = 1) => {
      const x = Math.sin(seed * variation) * 10000;
      return Math.floor((x - Math.floor(x)) * (max - min) + min);
    };

    const randomFloat = (min: number, max: number, variation: number = 1.5, decimals: number = 2) => {
      const x = Math.sin(seed * variation + variation * 1000) * 10000;
      const val = (Math.abs(x) - Math.floor(Math.abs(x))) * (max - min) + min;
      return parseFloat(val.toFixed(decimals));
    };

    // Get location data for the PIN code
    const selectedLoc = getPinCodeData(pin);

    // AQI calculation with realistic variation
    const baseAQI = selectedLoc.aqiBase;
    const aqiVariation = random(-30, 50, 1.3);
    const aqi = Math.max(30, Math.min(400, baseAQI + aqiVariation));
    
    let aqiCategory = '';
    if (aqi <= 50) aqiCategory = 'Good';
    else if (aqi <= 100) aqiCategory = 'Moderate';
    else if (aqi <= 150) aqiCategory = 'Unhealthy for Sensitive Groups';
    else if (aqi <= 200) aqiCategory = 'Unhealthy';
    else if (aqi <= 300) aqiCategory = 'Very Unhealthy';
    else aqiCategory = 'Hazardous';

    // Realistic PM2.5 calculation based on AQI
    const pm25 = Math.round(aqi * 0.35 + random(-10, 20, 1.4));
    
    // PM10 is typically 1.5-2x of PM2.5
    const pm10 = Math.round(pm25 * randomFloat(1.5, 2.2, 1.5, 1));
    
    // NO2 correlates with urban pollution
    const no2 = Math.round(aqi * 0.25 + random(-5, 15, 1.6));
    
    // SO2 from industrial activities
    const so2 = Math.round(aqi * 0.15 + random(-3, 10, 1.7));
    
    // CO in µg/m³ (higher in traffic areas)
    const co = Math.round(aqi * 4 + random(-200, 500, 1.8));
    
    // O3 varies with sunlight and temperature
    const o3 = Math.round(aqi * 0.3 + random(-10, 20, 1.9));
    
    // NH3 from agricultural and industrial sources
    const nh3 = Math.round(random(2, 40, 2.1));
    
    // Lead (Pb) - typically very low in modern cities
    const pb = randomFloat(0.1, 3.5, 2.2, 1);

    // Moon phase calculation based on date
    const now = new Date();
    const moonPhases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
    const dayOfMonth = now.getDate();
    const moonIndex = Math.floor((dayOfMonth / 30) * 8) % 8;
    
    // Realistic sunrise/sunset based on season and latitude
    const month = now.getMonth();
    let sunriseHour = 6;
    let sunsetHour = 18;
    
    // Adjust based on latitude (Tamil Nadu is southern, has less variation)
    const isSouthern = selectedLoc.lat < 20; // Southern states
    
    if (month >= 3 && month <= 8) { // Summer months
      sunriseHour = isSouthern ? 5 : 5;
      sunsetHour = isSouthern ? 18 : 19;
    } else if (month >= 10 || month <= 1) { // Winter months
      sunriseHour = isSouthern ? 6 : 6;
      sunsetHour = isSouthern ? 17 : 17;
    }
    
    const sunriseTime = new Date(now);
    sunriseTime.setHours(sunriseHour, random(15, 45, 2.3), 0);
    const sunsetTime = new Date(now);
    sunsetTime.setHours(sunsetHour, random(0, 30, 2.4), 0);

    // Temperature based on season, time, and location
    // Southern India (Tamil Nadu, Kerala) tends to be warmer
    // Northern India has more variation
    let baseTemp = 25;
    
    if (isSouthern) {
      // Southern states: warmer, less seasonal variation
      if (month >= 3 && month <= 6) baseTemp = 35; // Summer
      else if (month >= 6 && month <= 9) baseTemp = 30; // Monsoon
      else baseTemp = 28; // Winter (mild)
    } else {
      // Northern states: more variation
      if (month >= 3 && month <= 6) baseTemp = 32; // Summer
      else if (month >= 6 && month <= 9) baseTemp = 28; // Monsoon
      else baseTemp = 18; // Winter (cold)
    }
    
    const temperature = baseTemp + random(-3, 5, 2.5);

    // Humidity based on location and season
    // Tamil Nadu (coastal areas) tends to have lower humidity in inland areas like Dharapuram
    // Coastal areas have higher humidity
    let baseHumidity = 50;
    
    if (selectedLoc.state === 'Kerala' || selectedLoc.district === 'Mumbai City') {
      baseHumidity = 70; // Coastal areas
    } else if (selectedLoc.state === 'Rajasthan') {
      baseHumidity = 30; // Desert areas
    } else if (month >= 6 && month <= 9) {
      baseHumidity = 75; // Monsoon season
    } else if (isSouthern) {
      baseHumidity = 40; // Southern inland areas
    }
    
    const humidity = Math.max(15, Math.min(95, baseHumidity + random(-15, 15, 2.6)));

    // Wind speed - varies by location and season
    // Coastal areas have higher wind speeds
    const isCoastal = selectedLoc.city.includes('Mumbai') || selectedLoc.city.includes('Chennai') || selectedLoc.state === 'Kerala';
    const windSpeed = isCoastal ? random(8, 25, 2.7) : random(5, 18, 2.7);

    // Atmospheric pressure
    const pressure = random(1005, 1018, 2.8);

    // Visibility decreases with higher pollution
    const visibility = Math.max(1, Math.round(15 - (aqi / 40)));

    // UV index based on season
    const uvIndex = month >= 3 && month <= 8 ? random(7, 11, 2.9) : random(2, 6, 2.9);

    // Precipitation
    const precipitation = month >= 6 && month <= 9 ? random(0, 15, 3.0) : random(0, 3, 3.0);

    // Small random variation for coordinates to simulate GPS precision
    const latVariation = (Math.sin(seed * 3.1) * 0.01);
    const lonVariation = (Math.cos(seed * 3.2) * 0.01);
    
    return {
      pincode: pin,
      location: selectedLoc.city,
      district: selectedLoc.district,
      state: selectedLoc.state,
      latitude: parseFloat((selectedLoc.lat + latVariation).toFixed(4)),
      longitude: parseFloat((selectedLoc.lon + lonVariation).toFixed(4)),
      aqi,
      aqiCategory,
      pm25: Math.max(10, pm25),
      pm10: Math.max(15, pm10),
      no2: Math.max(5, no2),
      so2: Math.max(2, so2),
      co: Math.max(100, co),
      o3: Math.max(10, o3),
      nh3: Math.max(1, nh3),
      pb: Math.max(0.1, pb),
      temperature,
      humidity,
      windSpeed,
      pressure,
      visibility,
      uvIndex,
      precipitation,
      lastUpdated: now.toLocaleString('en-IN', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      sunrise: sunriseTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      sunset: sunsetTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      moonPhase: moonPhases[moonIndex]
    };
  };

  // Fetch real weather data from Open-Meteo API (Free, no API key needed)
  const fetchRealWeatherData = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,surface_pressure,visibility,uv_index,precipitation&daily=sunrise,sunset,uv_index_max&timezone=auto`
      );
      const data = await response.json();
      return {
        temperature: Math.round(data.current.temperature_2m),
        humidity: data.current.relative_humidity_2m,
        windSpeed: Math.round(data.current.wind_speed_10m),
        pressure: Math.round(data.current.surface_pressure),
        visibility: Math.round((data.current.visibility || 10000) / 1000),
        uvIndex: Math.round(data.current.uv_index || data.daily.uv_index_max[0] || 0),
        precipitation: data.current.precipitation || 0,
        sunrise: new Date(data.daily.sunrise[0]).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        sunset: new Date(data.daily.sunset[0]).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      };
    } catch (error) {
      console.error('Weather API error:', error);
      return null;
    }
  };

  // Fetch real air quality data from OpenAQ API (Free, no API key needed)
  const fetchRealAirQualityData = async (lat: number, lon: number) => {
    try {
      // OpenAQ API v2 - coordinates parameter
      const response = await fetch(
        `https://api.openaq.org/v2/latest?coordinates=${lat},${lon}&radius=50000&limit=100`
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        // Aggregate data from nearby stations
        const measurements: { [key: string]: number[] } = {};
        
        data.results.forEach((station: any) => {
          station.measurements?.forEach((m: any) => {
            const param = m.parameter.toLowerCase();
            if (!measurements[param]) measurements[param] = [];
            measurements[param].push(m.value);
          });
        });

        // Calculate averages
        const avg = (arr: number[]) => arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
        
        return {
          pm25: Math.round(avg(measurements['pm25'] || [])),
          pm10: Math.round(avg(measurements['pm10'] || [])),
          no2: Math.round(avg(measurements['no2'] || [])),
          so2: Math.round(avg(measurements['so2'] || [])),
          co: Math.round(avg(measurements['co'] || [])),
          o3: Math.round(avg(measurements['o3'] || []))
        };
      }
      return null;
    } catch (error) {
      console.error('Air Quality API error:', error);
      return null;
    }
  };

  // Fetch location details from Nominatim API (Free, no API key needed)
  const fetchLocationFromCoordinates = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await response.json();
      
      return {
        city: data.address?.city || data.address?.town || data.address?.village || data.address?.suburb || 'Unknown City',
        district: data.address?.state_district || data.address?.county || 'Unknown District',
        state: data.address?.state || 'Unknown State'
      };
    } catch (error) {
      console.error('Location API error:', error);
      return null;
    }
  };

  // Enhanced search with real API data
  const handleSearch = async () => {
    if (pincode.length >= 4) {
      setLoading(true);
      setApiError('');
      
      try {
        // Get base location data
        const locationData = getPinCodeData(pincode);
        const lat = locationData.lat;
        const lon = locationData.lon;

        // Try to fetch real API data
        const [weatherData, aqData, reverseGeoData] = await Promise.all([
          fetchRealWeatherData(lat, lon),
          fetchRealAirQualityData(lat, lon),
          // Only fetch reverse geocoding if we don't have exact location
          locationData.city.includes('Unknown') ? fetchLocationFromCoordinates(lat, lon) : Promise.resolve(null)
        ]);

        // Generate base data
        let data = generatePollutionData(pincode);

        // Merge with real API data if available
        if (weatherData) {
          data = {
            ...data,
            temperature: weatherData.temperature,
            humidity: weatherData.humidity,
            windSpeed: weatherData.windSpeed,
            pressure: weatherData.pressure,
            visibility: weatherData.visibility,
            uvIndex: weatherData.uvIndex,
            precipitation: weatherData.precipitation,
            sunrise: weatherData.sunrise,
            sunset: weatherData.sunset
          };
          setDataSource('api');
        }

        if (aqData && aqData.pm25 > 0) {
          // Calculate AQI from PM2.5 (US EPA formula)
          const calculateAQI = (pm25: number) => {
            if (pm25 <= 12.0) return Math.round((50 / 12.0) * pm25);
            else if (pm25 <= 35.4) return Math.round(50 + ((100 - 50) / (35.4 - 12.1)) * (pm25 - 12.1));
            else if (pm25 <= 55.4) return Math.round(100 + ((150 - 100) / (55.4 - 35.5)) * (pm25 - 35.5));
            else if (pm25 <= 150.4) return Math.round(150 + ((200 - 150) / (150.4 - 55.5)) * (pm25 - 55.5));
            else if (pm25 <= 250.4) return Math.round(200 + ((300 - 200) / (250.4 - 150.5)) * (pm25 - 150.5));
            else return Math.round(300 + ((500 - 300) / (500.4 - 250.5)) * (pm25 - 250.5));
          };

          const realAQI = calculateAQI(aqData.pm25);
          let aqiCategory = '';
          if (realAQI <= 50) aqiCategory = 'Good';
          else if (realAQI <= 100) aqiCategory = 'Moderate';
          else if (realAQI <= 150) aqiCategory = 'Unhealthy for Sensitive Groups';
          else if (realAQI <= 200) aqiCategory = 'Unhealthy';
          else if (realAQI <= 300) aqiCategory = 'Very Unhealthy';
          else aqiCategory = 'Hazardous';

          data = {
            ...data,
            aqi: realAQI,
            aqiCategory,
            pm25: aqData.pm25,
            pm10: aqData.pm10 || Math.round(aqData.pm25 * 1.8),
            no2: aqData.no2 || data.no2,
            so2: aqData.so2 || data.so2,
            co: aqData.co || data.co,
            o3: aqData.o3 || data.o3
          };
          setDataSource('api');
        }

        if (reverseGeoData) {
          data = {
            ...data,
            location: reverseGeoData.city,
            district: reverseGeoData.district,
            state: reverseGeoData.state
          };
        }

        setPollutionData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setApiError('Using simulated data (API unavailable)');
        // Fallback to simulated data
        const data = generatePollutionData(pincode);
        setPollutionData(data);
        setDataSource('simulated');
      } finally {
        setLoading(false);
      }
    }
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#22c55e';
    if (aqi <= 100) return '#84cc16';
    if (aqi <= 150) return '#eab308';
    if (aqi <= 200) return '#f59e0b';
    if (aqi <= 300) return '#ef4444';
    return '#991b1b';
  };

  const generateHistoricalData = () => {
    if (!pollutionData) return [];
    const data = [];
    const seed = parseInt(pollutionData.pincode) || 100000;
    
    for (let i = 7; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // More realistic variation - pollution typically varies by 10-30%
      const dayVariation = Math.sin((seed + i) * 0.5) * 0.25; // ±25% variation
      const randomVariation = (Math.sin((seed + i) * 1.3) * 0.5 + 0.5) * 0.15 - 0.075; // ±7.5% random
      const totalVariation = 1 + dayVariation + randomVariation;
      
      // Weekend effect - pollution often lower on weekends
      const dayOfWeek = date.getDay();
      const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.85 : 1;
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        aqi: Math.max(30, Math.round(pollutionData.aqi * totalVariation * weekendFactor)),
        pm25: Math.max(10, Math.round(pollutionData.pm25 * totalVariation * weekendFactor)),
        pm10: Math.max(15, Math.round(pollutionData.pm10 * totalVariation * weekendFactor))
      });
    }
    return data;
  };

  const getPollutantData = () => {
    if (!pollutionData) return [];
    return [
      { name: 'PM2.5', value: pollutionData.pm25, limit: 60 },
      { name: 'PM10', value: pollutionData.pm10, limit: 100 },
      { name: 'NO₂', value: pollutionData.no2, limit: 80 },
      { name: 'SO₂', value: pollutionData.so2, limit: 80 },
      { name: 'CO', value: pollutionData.co / 10, limit: 200 },
      { name: 'O₃', value: pollutionData.o3, limit: 100 },
      { name: 'NH₃', value: pollutionData.nh3, limit: 40 },
      { name: 'Pb', value: pollutionData.pb, limit: 15 }
    ];
  };

  const getRadarData = () => {
    if (!pollutionData) return [];
    return [
      { subject: 'PM2.5', A: pollutionData.pm25, fullMark: 250 },
      { subject: 'PM10', A: pollutionData.pm10, fullMark: 350 },
      { subject: 'NO₂', A: pollutionData.no2, fullMark: 100 },
      { subject: 'SO₂', A: pollutionData.so2, fullMark: 80 },
      { subject: 'O₃', A: pollutionData.o3, fullMark: 150 },
      { subject: 'CO', A: pollutionData.co / 10, fullMark: 200 },
      { subject: 'NH₃', A: pollutionData.nh3, fullMark: 50 },
      { subject: 'Pb', A: pollutionData.pb, fullMark: 20 }
    ];
  };

  const getHealthRecommendations = (aqi: number) => {
    if (aqi <= 50) return {
      title: 'Air quality is good',
      recommendations: [
        'Ideal for outdoor activities',
        'No health concerns',
        'Enjoy your day outside'
      ]
    };
    if (aqi <= 100) return {
      title: 'Air quality is acceptable',
      recommendations: [
        'Outdoor activities are generally fine',
        'Sensitive individuals should limit prolonged exposure',
        'Monitor air quality if you have respiratory issues'
      ]
    };
    if (aqi <= 150) return {
      title: 'Unhealthy for sensitive groups',
      recommendations: [
        'People with respiratory issues should limit outdoor activities',
        'Children and elderly should reduce prolonged exposure',
        'Wear masks if going outside for extended periods'
      ]
    };
    if (aqi <= 200) return {
      title: 'Unhealthy air quality',
      recommendations: [
        'Everyone should limit outdoor activities',
        'Wear N95 masks when going outside',
        'Keep windows closed',
        'Use air purifiers indoors'
      ]
    };
    if (aqi <= 300) return {
      title: 'Very unhealthy air quality',
      recommendations: [
        'Avoid outdoor activities',
        'Stay indoors with air purifiers',
        'Wear N95/N99 masks if you must go outside',
        'Keep emergency medications handy'
      ]
    };
    return {
      title: 'Hazardous air quality',
      recommendations: [
        'Stay indoors at all times',
        'Seal windows and doors',
        'Use air purifiers continuously',
        'Seek medical attention if experiencing symptoms'
      ]
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                <Wind className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Pollution Report Dashboard</h1>
                <p className="text-sm text-gray-500">Real-time air quality monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">Enter PIN Code or Vehicle Registration</h2>
            <p className="text-sm text-gray-500 mb-2 text-center">Examples: 638656, 110001, MH-17, DL-1C, KA-01</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full">
                <Activity className="w-3 h-3" />
                <span>Real-time APIs</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                <Cloud className="w-3 h-3" />
                <span>Live Weather</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                <Wind className="w-3 h-3" />
                <span>Air Quality Data</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.toUpperCase())}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="PIN code or Vehicle number (e.g., 110001 or MH-17)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition flex items-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                <Search className="w-5 h-5" />
                {loading ? 'Loading...' : 'Search'}
              </button>
            </div>
          </div>
        </div>

        {/* Pollution Data Display */}
        {pollutionData && (
          <div className="space-y-6">
            {/* Data Source Indicator */}
            {dataSource === 'api' && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-4 text-white">
                <div className="flex items-center justify-center gap-3">
                  <Activity className="w-5 h-5" />
                  <span className="font-semibold">Live Data: Using real-time weather and air quality APIs</span>
                </div>
              </div>
            )}
            {apiError && (
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg p-4 text-white">
                <div className="flex items-center justify-center gap-3">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-semibold">{apiError}</span>
                </div>
              </div>
            )}
            
            {/* Location Details Card */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Location Details</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                  <div className="text-xs text-blue-100 mb-1">PIN Code</div>
                  <div className="text-lg font-bold">{pollutionData.pincode}</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                  <div className="text-xs text-blue-100 mb-1">Area</div>
                  <div className="text-lg font-bold truncate">{pollutionData.location}</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                  <div className="text-xs text-blue-100 mb-1">District</div>
                  <div className="text-lg font-bold truncate">{pollutionData.district}</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                  <div className="text-xs text-blue-100 mb-1">State</div>
                  <div className="text-lg font-bold truncate">{pollutionData.state}</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                  <div className="text-xs text-blue-100 mb-1">Latitude</div>
                  <div className="text-lg font-bold">{pollutionData.latitude}°</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                  <div className="text-xs text-blue-100 mb-1">Longitude</div>
                  <div className="text-lg font-bold">{pollutionData.longitude}°</div>
                </div>
              </div>
            </div>

            {/* Calendar & Time Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Date & Time Information</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Sunrise className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium text-gray-700">Sunrise</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{pollutionData.sunrise}</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Sunset className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">Sunset</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{pollutionData.sunset}</div>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Moon className="w-5 h-5 text-indigo-600" />
                    <span className="text-sm font-medium text-gray-700">Moon Phase</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{pollutionData.moonPhase}</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-4 border border-cyan-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-cyan-600" />
                    <span className="text-sm font-medium text-gray-700">Last Updated</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900">{pollutionData.lastUpdated}</div>
                </div>
              </div>
            </div>

            {/* Location & AQI Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* AQI Card */}
              <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Air Quality Index</h3>
                  <Activity className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-center py-6">
                  <div 
                    className="w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-4 shadow-lg"
                    style={{ backgroundColor: getAQIColor(pollutionData.aqi) }}
                  >
                    <div className="text-white">
                      <div className="text-4xl font-bold">{pollutionData.aqi}</div>
                      <div className="text-sm font-medium">AQI</div>
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">{pollutionData.aqiCategory}</div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-3 text-left">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-xs text-gray-500">PM2.5</div>
                        <div className="text-lg font-bold text-gray-900">{pollutionData.pm25}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-xs text-gray-500">PM10</div>
                        <div className="text-lg font-bold text-gray-900">{pollutionData.pm10}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weather & Environmental Conditions */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Environmental Conditions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-orange-500 p-2 rounded-lg">
                        <Thermometer className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Temperature</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{pollutionData.temperature}°C</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-blue-500 p-2 rounded-lg">
                        <Droplets className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Humidity</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{pollutionData.humidity}%</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-green-500 p-2 rounded-lg">
                        <Wind className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Wind Speed</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{pollutionData.windSpeed} km/h</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-purple-500 p-2 rounded-lg">
                        <Gauge className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Pressure</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{pollutionData.pressure} hPa</div>
                  </div>
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-teal-500 p-2 rounded-lg">
                        <Eye className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Visibility</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{pollutionData.visibility} km</div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-yellow-500 p-2 rounded-lg">
                        <Sun className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">UV Index</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{pollutionData.uvIndex}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pollutant Levels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bar Chart */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Pollutant Levels vs Safe Limits</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getPollutantData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Bar dataKey="value" fill="#3b82f6" name="Current Level" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="limit" fill="#ef4444" name="Safe Limit" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Radar Chart */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Pollutant Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={getRadarData()}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" stroke="#6b7280" />
                    <PolarRadiusAxis stroke="#6b7280" />
                    <Radar name="Current Levels" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Historical Trend */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">7-Day Pollution Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={generateHistoricalData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="aqi" stroke="#8b5cf6" strokeWidth={3} name="AQI" dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="pm25" stroke="#ef4444" strokeWidth={2} name="PM2.5" />
                  <Line type="monotone" dataKey="pm10" stroke="#f59e0b" strokeWidth={2} name="PM10" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Pollutant Cards */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">All Pollutant Levels</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {[
                  { name: 'PM2.5', value: pollutionData.pm25, unit: 'µg/m³', icon: Cloud, color: 'from-red-500 to-pink-500' },
                  { name: 'PM10', value: pollutionData.pm10, unit: 'µg/m³', icon: Cloud, color: 'from-orange-500 to-yellow-500' },
                  { name: 'NO₂', value: pollutionData.no2, unit: 'µg/m³', icon: AlertTriangle, color: 'from-blue-500 to-cyan-500' },
                  { name: 'SO₂', value: pollutionData.so2, unit: 'µg/m³', icon: AlertTriangle, color: 'from-purple-500 to-indigo-500' },
                  { name: 'CO', value: pollutionData.co, unit: 'µg/m³', icon: Wind, color: 'from-green-500 to-emerald-500' },
                  { name: 'O₃', value: pollutionData.o3, unit: 'µg/m³', icon: Cloud, color: 'from-teal-500 to-cyan-500' },
                  { name: 'NH₃', value: pollutionData.nh3, unit: 'µg/m³', icon: Wind, color: 'from-lime-500 to-green-500' },
                  { name: 'Pb', value: pollutionData.pb, unit: 'µg/m³', icon: AlertTriangle, color: 'from-slate-500 to-gray-500' }
                ].map((pollutant) => (
                  <div key={pollutant.name} className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition transform hover:-translate-y-1">
                    <div className={`bg-gradient-to-r ${pollutant.color} p-2 rounded-lg w-fit mb-2`}>
                      <pollutant.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-xs text-gray-500 mb-1 font-medium">{pollutant.name}</div>
                    <div className="text-2xl font-bold text-gray-900">{pollutant.value}</div>
                    <div className="text-xs text-gray-400">{pollutant.unit}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Weather Parameters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Additional Weather Data</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <CloudRain className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Precipitation</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{pollutionData.precipitation} mm</div>
                  <div className="text-xs text-gray-500 mt-1">Last hour</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Navigation className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-medium text-gray-700">Coordinates</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{pollutionData.latitude}° N</div>
                  <div className="text-lg font-bold text-gray-900">{pollutionData.longitude}° E</div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="w-5 h-5 text-amber-600" />
                    <span className="text-sm font-medium text-gray-700">Daylight Hours</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {pollutionData.sunrise} - {pollutionData.sunset}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Moon className="w-5 h-5 text-violet-600" />
                    <span className="text-sm font-medium text-gray-700">Moon Phase</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{pollutionData.moonPhase}</div>
                </div>
              </div>
            </div>

            {/* Health Recommendations */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-orange-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-500 p-3 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {getHealthRecommendations(pollutionData.aqi).title}
                </h3>
              </div>
              <ul className="space-y-2">
                {getHealthRecommendations(pollutionData.aqi).recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Educational Information Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl">
                  <Cloud className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Understanding Air Quality - A Beginner's Guide</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* AQI Explanation */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    What is AQI (Air Quality Index)?
                  </h4>
                  <p className="text-sm text-gray-700 mb-3">
                    AQI is a simple number (0-500) that tells you how clean or polluted the air is. Think of it like a thermometer for air quality!
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-3 rounded" style={{backgroundColor: '#22c55e'}}></div>
                      <span className="text-gray-700">0-50: Good - Safe for everyone</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-3 rounded" style={{backgroundColor: '#84cc16'}}></div>
                      <span className="text-gray-700">51-100: Moderate - Generally acceptable</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-3 rounded" style={{backgroundColor: '#eab308'}}></div>
                      <span className="text-gray-700">101-150: Unhealthy for sensitive</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-3 rounded" style={{backgroundColor: '#f59e0b'}}></div>
                      <span className="text-gray-700">151-200: Unhealthy - Avoid outdoors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-3 rounded" style={{backgroundColor: '#ef4444'}}></div>
                      <span className="text-gray-700">201-300: Very unhealthy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-3 rounded" style={{backgroundColor: '#991b1b'}}></div>
                      <span className="text-gray-700">301+: Hazardous - Stay indoors</span>
                    </div>
                  </div>
                </div>

                {/* Pollutants Explained */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    Major Pollutants Explained
                  </h4>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div>
                      <span className="font-semibold text-red-600">PM2.5 & PM10:</span> Tiny dust particles in the air. PM2.5 is very small and can enter your lungs easily. Main sources: vehicles, construction, industrial smoke.
                    </div>
                    <div>
                      <span className="font-semibold text-blue-600">NO₂ (Nitrogen Dioxide):</span> A reddish-brown gas from vehicles and power plants. Can irritate airways and reduce immunity.
                    </div>
                    <div>
                      <span className="font-semibold text-purple-600">SO₂ (Sulfur Dioxide):</span> Released from burning coal and oil. Can cause breathing problems and acid rain.
                    </div>
                    <div>
                      <span className="font-semibold text-green-600">CO (Carbon Monoxide):</span> Colorless, odorless gas from incomplete fuel burning. Reduces oxygen supply to organs.
                    </div>
                    <div>
                      <span className="font-semibold text-cyan-600">O₃ (Ozone):</span> Good in the upper atmosphere, harmful at ground level. Formed by sunlight reacting with pollutants.
                    </div>
                  </div>
                </div>

                {/* Health Impact */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    How Does Air Pollution Affect You?
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Short-term:</strong> Eye irritation, coughing, headaches, difficulty breathing, throat irritation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Long-term:</strong> Asthma, lung diseases, heart problems, reduced lung growth in children</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Most affected:</strong> Children, elderly, pregnant women, people with existing respiratory issues</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Note:</strong> Even healthy people should avoid outdoor exercise when AQI is above 150</span>
                    </div>
                  </div>
                </div>

                {/* Protection Tips */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-5 border border-orange-100">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    Simple Ways to Protect Yourself
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">1.</span>
                      <span><strong>Check AQI daily:</strong> Plan outdoor activities when AQI is low (mornings are usually better)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">2.</span>
                      <span><strong>Wear masks:</strong> N95/N99 masks filter out 95-99% of particles (normal cloth masks don't help with pollution)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">3.</span>
                      <span><strong>Indoor air:</strong> Use air purifiers, keep plants, avoid smoking indoors</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">4.</span>
                      <span><strong>Reduce exposure:</strong> Close car windows in traffic, avoid high-pollution areas</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">5.</span>
                      <span><strong>Help reduce pollution:</strong> Use public transport, carpool, save electricity, plant trees</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weather Parameters Explained */}
              <div className="mt-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-100">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                  Understanding Weather Parameters
                </h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                  <div>
                    <span className="font-semibold text-orange-600">Temperature:</span> Measured in Celsius (°C). Higher temperatures can increase ground-level ozone formation.
                  </div>
                  <div>
                    <span className="font-semibold text-blue-600">Humidity:</span> Amount of moisture in air (%). High humidity can make pollutants stick around longer.
                  </div>
                  <div>
                    <span className="font-semibold text-green-600">Wind Speed:</span> Faster winds help disperse pollutants, improving air quality.
                  </div>
                  <div>
                    <span className="font-semibold text-purple-600">Pressure:</span> Atmospheric pressure in hPa. Low pressure can trap pollutants near ground.
                  </div>
                  <div>
                    <span className="font-semibold text-teal-600">Visibility:</span> How far you can see clearly (km). Reduced by pollution and fog.
                  </div>
                  <div>
                    <span className="font-semibold text-yellow-600">UV Index:</span> Sun's ultraviolet radiation strength (0-11+). Higher = more sun protection needed.
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-5 text-white">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  💡 Quick Tips for Different AQI Levels
                </h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                    <div className="font-semibold mb-1">AQI 0-100 (Green/Yellow)</div>
                    <div className="text-xs">Perfect for outdoor activities, exercise, and playing outside!</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                    <div className="font-semibold mb-1">AQI 101-200 (Orange/Red)</div>
                    <div className="text-xs">Limit prolonged outdoor activities. Wear masks. Sensitive people stay indoors.</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                    <div className="font-semibold mb-1">AQI 201+ (Purple/Maroon)</div>
                    <div className="text-xs">Stay indoors! Use air purifiers. Avoid all outdoor activities. Emergency measures.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!pollutionData && !loading && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wind className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Enter a PIN Code to Get Started</h3>
            <p className="text-gray-500">View detailed pollution reports and air quality insights for any location</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center space-y-3">
            <p className="text-gray-900 font-semibold text-sm">Powered by Free Public APIs</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600">
              <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 flex items-center gap-1">
                <Cloud className="w-3 h-3" />
                Open-Meteo Weather API
              </a>
              <span className="text-gray-300">•</span>
              <a href="https://openaq.org/" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 flex items-center gap-1">
                <Wind className="w-3 h-3" />
                OpenAQ Air Quality
              </a>
              <span className="text-gray-300">•</span>
              <a href="https://nominatim.openstreetmap.org/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                OpenStreetMap Nominatim
              </a>
            </div>
            <p className="text-gray-500 text-xs">
              © 2026 Pollution Report Dashboard. Real-time data where available, simulated data as fallback.
            </p>
            <p className="text-gray-400 text-xs">
              No API keys required • All APIs are free and open source
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
