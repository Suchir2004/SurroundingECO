# 🌿 EcoSync Smart Environmental Monitoring System

> A smart IoT-based safety system designed for monitoring environmental conditions in **confined spaces** like factories, tunnels, and caves — helping protect workers from invisible hazards.

---

## 🚀 Project Overview

EcoSync is a **real-time environmental monitoring system** built using NodeMCU (ESP8266) that:

* Monitors **Temperature, Humidity, Air Quality, Light, and Pressure**
* Provides **AI-style environmental insights**
* Displays data on **OLED + Live Web Dashboard**
* Can be deployed:

  * 🪖 On a **helmet (portable safety device)**
  * 🏭 On **walls (industrial monitoring system)**

---

## 🧠 Key Features

* 📡 Real-time IoT monitoring
* 🌐 Live dashboard (Next.js UI)
* 🚨 Air quality alerts (MQ135)
* 💡 Automatic light detection
* 📊 Smart interpretation (Comfort + Weather)
* ⚡ Fully non-blocking embedded code
* 📱 Mobile-friendly dashboard

---

## 🧰 Components Required

| Component               | Quantity    |
| ----------------------- | ----------- |
| NodeMCU ESP8266         | 1           |
| DHT11 Sensor            | 1           |
| MQ135 Gas Sensor        | 1           |
| BMP180/BMP280           | 1           |
| SSD1306 OLED (I2C)      | 1           |
| LDR Module              | 1           |
| LEDs (Red, White, Blue) | 3           |
| Resistors               | As required |
| Breadboard & Wires      | -           |

---

## 🔌 Circuit Connections

| Component | NodeMCU Pin  |
| --------- | ------------ |
| DHT11     | D5 (GPIO14)  |
| LDR       | D6 (GPIO12)  |
| MQ135     | A0           |
| RED LED   | D7           |
| WHITE LED | D0           |
| BLUE LED  | D3 ⚠️        |
| OLED SDA  | D2           |
| OLED SCL  | D1           |
| BMP180    | I2C (D1, D2) |

⚠️ **Important Notes:**

* ESP8266 works on **3.3V only**
* Analog input range is **0–1V**
* Use voltage divider for MQ135 if needed

---

## ⚙️ Setup Instructions

### 🧩 1. Hardware Setup

1. Connect all components as per the table above
2. Double-check I2C connections (OLED + BMP sensor)

---

### 💻 2. Arduino Setup

1. Install Arduino IDE
2. Add ESP8266 board:

   * File → Preferences
   * Add:

     ```
     http://arduino.esp8266.com/stable/package_esp8266com_index.json
     ```
3. Install Libraries:

   * Adafruit SSD1306
   * Adafruit GFX
   * DHT sensor library
   * Adafruit BMP085

---

### 📡 3. Upload Code

1. Open Arduino code from this repo
2. Replace WiFi credentials:

```cpp
const char* ssid = "YOUR_WIFI";
const char* password = "YOUR_PASSWORD";
```

3. Select board:

   * **NodeMCU 1.0 (ESP-12E)**
4. Upload code

---

### 🌐 4. Get ESP IP Address

* Open Serial Monitor OR check OLED
* Note IP like:

```
192.168.X.X
```

---

### 🔗 5. Test API

Open in browser:

```
http://YOUR_IP/data
```

You should see JSON output

---

### 🖥️ 6. Run Dashboard (v0 UI)

```bash
npm install
npm run dev
```

---

### 🔧 7. Connect UI to ESP

Edit file:

```
/hooks/use-sensor-data.ts
```

Replace:

```ts
const ESP_IP = "YOUR_IP"
```

---

### 📱 8. Open Dashboard

* Laptop:

  ```
  http://localhost:3000
  ```
* Mobile:

  ```
  http://YOUR_LAPTOP_IP:3000
  ```

---

## 📊 System Working

1. Sensors collect environmental data
2. ESP8266 processes and analyzes
3. Sends JSON data via WiFi
4. Dashboard fetches data every 2 seconds
5. Displays insights + alerts

---

## 🚨 Smart Alerts

| Condition       | Action         |
| --------------- | -------------- |
| Gas > Threshold | 🔴 Red LED ON  |
| Darkness        | ⚪ White LED ON |
| Normal          | 🟢 Safe        |

---

## 🤖 Smart Insights

* Comfort Level:

  * HOT & HUMID
  * COMFORTABLE
* Weather Prediction:

  * SUNNY / CLOUDY / RAIN
* Air Quality:

  * SAFE / POOR (VENTILATE)

---

## 🪖 Use Cases

* Worker safety in confined spaces
* Industrial monitoring systems
* Smart helmets
* IoT environmental tracking

---

## 🚀 Future Improvements

* 🔔 Buzzer alerts
* ☁️ Cloud integration
* 📱 Mobile app
* 📷 ESP32-CAM integration
* 🤖 Machine learning predictions

---

## 🧠 Challenges Faced

* Sensor calibration (MQ135)
* WiFi connectivity issues
* CORS errors in web dashboard
* Power management

---

## 📸 Demo

(Add your images / screenshots here)

---

## 🤝 Contributing

Feel free to fork and improve this project!

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---

## 🏁 Conclusion

EcoSync transforms raw sensor data into meaningful insights, making environmental monitoring smarter, safer, and more accessible — especially for workers in hazardous environments.

---
