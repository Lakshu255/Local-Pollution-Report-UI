# 🚗 Vehicle Registration Number Support

## Now Supports Both PIN Codes AND Vehicle Registration Numbers!

### What is MH-17?

**MH-17** is a vehicle registration code where:
- **MH** = Maharashtra (State code)
- **17** = District code (within Maharashtra)

The format varies across India:
- **MH-1718** - Full RTO code
- **MH-17** - Short form
- **DL-1C** - Delhi with district
- **KA-01** - Karnataka district 1

---

## ✅ Supported Vehicle Registration Codes

### Format Examples:
- `MH-17` → Maharashtra District 17 (Mumbai region)
- `DL-1C` → Delhi District 1C
- `KA-01` → Karnataka District 01 (Bangalore)
- `TN-09` → Tamil Nadu District 09 (Chennai)

### All Supported State Codes:

| Code | State | Region | AQI Base |
|------|-------|--------|----------|
| **MH** | Maharashtra | Mumbai/Pune Region | 155 |
| **DL** | Delhi | Delhi NCR | 220 |
| **KA** | Karnataka | Bangalore Region | 125 |
| **TN** | Tamil Nadu | Chennai Region | 140 |
| **AP** | Andhra Pradesh | Andhra Pradesh | 130 |
| **TS** | Telangana | Hyderabad Region | 140 |
| **GJ** | Gujarat | Gujarat | 165 |
| **RJ** | Rajasthan | Jaipur Region | 170 |
| **UP** | Uttar Pradesh | Lucknow/Noida | 200 |
| **WB** | West Bengal | Kolkata Region | 185 |
| **HR** | Haryana | Gurgaon/Faridabad | 200 |
| **PB** | Punjab | Chandigarh/Ludhiana | 160 |
| **MP** | Madhya Pradesh | Bhopal/Indore | 145 |
| **CH** | Chandigarh | Chandigarh | 155 |
| **BR** | Bihar | Patna Region | 180 |
| **OD/OR** | Odisha | Bhubaneswar | 120 |
| **JH** | Jharkhand | Ranchi | 165 |
| **AS** | Assam | Guwahati | 100 |
| **KL** | Kerala | Kochi/Trivandrum | 78 |
| **GA** | Goa | Goa | 70 |
| **HP** | Himachal Pradesh | Shimla | 65 |
| **UK** | Uttarakhand | Dehradun | 90 |
| **JK** | Jammu & Kashmir | Srinagar/Jammu | 85 |
| **CG** | Chhattisgarh | Raipur | 140 |

---

## 🔍 How It Works

### When you enter `MH-17`:

1. **State Identified**: MH = Maharashtra
2. **District Extracted**: 17 = District 17
3. **Location Mapped**: Mumbai/Pune Region
4. **Data Generated**: 
   - City: "Maharashtra Vehicle - District 17"
   - District: "Mumbai/Pune Region"
   - State: Maharashtra
   - Coordinates: Near Mumbai (19.07°N, 72.87°E)
   - AQI Base: ~155 (moderate pollution)

### Accepted Formats:
✅ `MH-17` (with hyphen)
✅ `MH 17` (with space)
✅ `MH17` (no separator)
✅ `MH1718` (full RTO code)
✅ `DL-1C` (with letters)
✅ `KA01AA1234` (full registration - uses first 4 chars)

---

## 📍 Example Searches

### Try These Vehicle Codes:

**High Pollution Regions:**
- `DL-1C` → Delhi (AQI ~220)
- `DL-5C` → Delhi (AQI ~220)
- `UP-16` → Noida, UP (AQI ~210)
- `HR-51` → Gurgaon, Haryana (AQI ~200)

**Moderate Pollution:**
- `MH-01` → Mumbai (AQI ~160)
- `MH-12` → Pune (AQI ~155)
- `GJ-01` → Ahmedabad (AQI ~165)
- `RJ-01` → Jaipur (AQI ~170)

**Lower Pollution:**
- `KA-01` → Bangalore (AQI ~125)
- `TN-09` → Chennai (AQI ~140)
- `KL-01` → Trivandrum (AQI ~78)
- `GA-01` → Goa (AQI ~70)
- `HP-01` → Shimla (AQI ~65)

---

## 🆚 PIN Code vs Vehicle Registration

### PIN Code (Recommended for accuracy):
- **638656** → Exact location: Dharapuram, Tiruppur, Tamil Nadu
- Precise GPS coordinates
- City-specific data

### Vehicle Registration (Regional):
- **MH-17** → Regional: Mumbai/Pune area, Maharashtra
- Approximate GPS coordinates
- State/region-level data

---

## 💡 Understanding District Codes

### Maharashtra (MH) Examples:
- **MH-01**: Mumbai Central
- **MH-02**: Mumbai Western
- **MH-03**: Mumbai Eastern
- **MH-04**: Mumbai Thane
- **MH-12**: Pune
- **MH-14**: Palghar
- **MH-17**: Approximate Mumbai region

### Delhi (DL) Examples:
- **DL-1C**: Central Delhi
- **DL-2C**: North Delhi
- **DL-3C**: East Delhi
- **DL-4C**: South Delhi
- **DL-5C**: West Delhi

### Karnataka (KA) Examples:
- **KA-01**: Bangalore Urban
- **KA-03**: Tumkur
- **KA-09**: Bangalore (Additional)
- **KA-51**: Bangalore (Further)

---

## 🎯 What You'll See

### For `MH-17` or `MH1718`:

```
Location Details:
├─ PIN Code: MH-17
├─ Area: Maharashtra Vehicle - District 17
├─ District: Mumbai/Pune Region
├─ State: Maharashtra
├─ Latitude: ~19.07°N
└─ Longitude: ~72.87°E

Air Quality:
├─ AQI: ~155 (Moderate pollution)
├─ PM2.5: ~54 µg/m³
├─ PM10: ~90 µg/m³
└─ Category: Unhealthy for Sensitive Groups

Weather (Mumbai region):
├─ Temperature: 28-35°C (warm, coastal)
├─ Humidity: 60-85% (high, coastal)
├─ Wind: 10-20 km/h (coastal winds)
└─ Visibility: 6-8 km
```

---

## 📊 Accuracy Comparison

| Input Type | Location Accuracy | Data Precision |
|------------|------------------|----------------|
| **PIN Code** (638656) | Exact city/area | Very High ✅✅✅ |
| **Vehicle Reg** (MH-17) | State/region | Moderate ✅✅ |

**Best Practice**: Use PIN codes for exact location data, vehicle registration for quick regional checks.

---

## ❓ FAQ

**Q: Why does MH-17 show "Unknown Location"?**
A: The old version didn't support vehicle registration. Now it does! ✅

**Q: Can I enter my full vehicle number like MH17AB1234?**
A: Yes! We extract the state code (MH) and district (17) automatically.

**Q: What if my district code isn't recognized?**
A: We use the state-level data. All major state codes are supported.

**Q: Is vehicle registration data as accurate as PIN code?**
A: PIN codes give exact location. Vehicle codes give regional/state-level data.

**Q: Can I mix formats?**
A: Yes! Try: MH-17, MH17, MH 17, MH1718 - all work!

---

## 🚀 Quick Test

**Enter these codes to test:**

1. `MH-17` or `MH1718` → Maharashtra region ✅
2. `638656` → Exact: Dharapuram, Tamil Nadu ✅
3. `DL-1C` → Delhi region ✅
4. `110001` → Exact: Connaught Place, Delhi ✅
5. `KA-01` → Karnataka/Bangalore region ✅
6. `560001` → Exact: Bangalore GPO ✅

---

## ✅ Summary

**Now you can search using:**
- ✅ PIN Codes (6 digits): 638656, 110001, 400001
- ✅ Vehicle Reg (State codes): MH-17, DL-1C, KA-01
- ✅ Mixed formats: MH17, MH 17, MH1718
- ✅ 25+ state codes supported
- ✅ Automatic format detection

**Your MH-17 input now works perfectly!** 🎉
