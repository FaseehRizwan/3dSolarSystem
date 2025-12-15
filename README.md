<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,24,28&height=180&section=header&text=3D%20UNIVERSE&fontSize=50&fontColor=fff&animation=twinkling&fontAlignY=32&desc=Interactive%20Hand-Controlled%20Solar%20System%20%2B%20Space%20Experience&descSize=18&descAlignY=51"/>

[![GitHub Stars](https://img.shields.io/github/stars/FaseehRizwan/3dSolarSystem?style=for-the-badge&logo=github)](https://github.com/FaseehRizwan/3dSolarSystem/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/FaseehRizwan/3dSolarSystem?style=for-the-badge&logo=github)](https://github.com/FaseehRizwan/3dSolarSystem/network)
[![GitHub Issues](https://img.shields.io/github/issues/FaseehRizwan/3dSolarSystem?style=for-the-badge&logo=github)](https://github.com/FaseehRizwan/3dSolarSystem/issues)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Live Demo](https://img.shields.io/badge/🚀_LIVE_DEMO-4CAF50?style=for-the-badge)](https://faseehrizwan.github.io/3dSolarSystem/)

</div>

---

## 🌌 About The Project

**3D Universe** is an interactive web-based application that brings the entire solar system to your fingertips! Explore all 8 planets, the Sun, Earth's moon, mysterious UFOs, and 8000+ stars in stunning 3D with an innovative **hand gesture control system** powered by MediaPipe AI. Simply turn on your camera and use your hands to navigate through space - no mouse or keyboard needed!

### ✨ Key Features

- 🪐 **Complete Solar System** - All 8 planets (Mercury to Neptune) with accurate orbits
- 🌍 **Enhanced Earth** - Atmosphere, clouds, orbiting moon, and 5 satellites
- 🛸 **Mysterious UFOs** - 6 UFO objects with glowing green domes patrolling space
- ⭐ **8000+ Stars** - Procedurally generated starfield with color variations
- 👋 **Hand Gesture Control** - Rotate view with palm, zoom with pinch gestures
- 📷 **Live Camera Preview** - Real-time hand tracking visualization in corner
- 🎮 **Dual Control Mode** - Use hands OR traditional mouse/keyboard
- 🌫️ **Atmospheric Effects** - Fog, lighting, and realistic rendering
- 🚀 **Smooth Performance** - 60 FPS with optimized Three.js rendering
- 💻 **Pure Web Technologies** - HTML, CSS, JavaScript (no build tools required)

<div align="center">

### 🎥 Live Demo

**✨ [Experience the Universe Now!](https://faseehrizwan.github.io/3dSolarSystem/) ✨**

</div>

---

## 🛠️ Built With

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/MediaPipe-0097A7?style=for-the-badge&logo=google&logoColor=white"/>
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white"/>
</p>

### Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **3D Graphics:** Three.js / WebGL
- **Hand Tracking:** Google MediaPipe
- **Camera API:** WebRTC / getUserMedia

---

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Edge, Safari)
- Webcam (for hand gesture control)
- HTTPS connection (required for camera access)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/FaseehRizwan/3dSolarSystem.git
   ```

2. **Navigate to project directory**
   ```bash
   cd 3dSolarSystem
   ```

3. **Open with a local server**
   
   Option 1 - Using VS Code Live Server:
   - Install "Live Server" extension in VS Code
   - Right-click on `index.html`
   - Select "Open with Live Server"

   Option 2 - Using Python:
   ```bash
   # Python 3
   python -m http.server 8000
   ```

   Option 3 - Using Node.js:
   ```bash
   npx http-server
   ```

4. **Open in browser**
   ```
   http://localhost:8000
   ```

---

## 🎮 Usage

### Traditional Controls (Mouse/Keyboard)

- **🖱️ Left Click + Drag** - Rotate view
- **🖱️ Right Click + Drag** - Pan camera
- **⚙️ Scroll Wheel** - Zoom in/out
- **⌨️ Arrow Keys** - Navigate

### Hand Gesture Controls

1. **Enable Camera**
   - Camera activates automatically on page load
   - Allow camera permissions when prompted
   - Hand tracking preview appears in bottom-right corner

2. **Hand Gestures** (Automatically Detected)
   - 🖐️ **Move Hand Left/Right** - Rotate view horizontally (azimuth)
   - 🖐️ **Move Hand Up/Down** - Rotate view vertically (polar)
   - 👌 **Pinch Close** (thumb + index < 0.04) - Zoom IN
   - 🖐️ **Open Wide** (thumb + index > 0.15) - Zoom OUT
   - 📺 **Live Feedback** - Yellow circle appears around pinch gesture

3. **Tips for Best Tracking**
   - Keep your hand 1-2 feet from the camera
   - Ensure good lighting conditions (front-lit, not backlit)
   - Move hand slowly for precise control
   - Use a plain background for better hand detection
   - Green skeleton overlay shows when hand is detected

---

## 🪐 Solar System Objects

The application includes a complete solar system with accurate orbital distances:

| Object | Type | Distance | Size | Color | Special Features |
|--------|------|----------|------|-------|------------------|
| ☀️ **Sun** | Star | Center (0) | 5 units | Yellow (#ffdd00) | Light source, rotation |
| ☿️ **Mercury** | Rocky Planet | 10 units | 0.8 | Gray (#aaaaaa) | Fastest orbit |
| ♀️ **Venus** | Rocky Planet | 15 units | 1.2 | Beige (#e3bb76) | Brightest planet |
| 🌍 **Earth** | Rocky Planet | 22 units | 1.5 | Blue (#1144cc) | Atmosphere, clouds, moon, 5 satellites, label |
| 🌙 **Moon** | Satellite | Orbits Earth | 0.5 | Gray (#cccccc) | Orbits Earth at 3 units |
| 🔴 **Mars** | Rocky Planet | 30 units | 1.0 | Red (#ff4500) | The Red Planet |
| 🪐 **Jupiter** | Gas Giant | 45 units | 3.5 | Tan (#d8ca9d) | Largest planet |
| 🪐 **Saturn** | Gas Giant | 65 units | 3.0 | Beige (#c5a16f) | **Iconic ring system** |
| 🔵 **Uranus** | Ice Giant | 85 units | 2.0 | Cyan (#4fd0e7) | Tilted rotation |
| 🔵 **Neptune** | Ice Giant | 105 units | 1.9 | Deep Blue (#2b32a0) | Farthest planet |
| 🛸 **UFOs (6x)** | Mystery | 35-75 units | 0.6 | Silver + Green | Flying saucers with green domes |
| ⭐ **Stars** | Background | 800 units | 8000+ | White/Blue/Red | Rotating starfield |

---

## 📸 Screenshots

<div align="center">

### Main View
> *Screenshot placeholder - Coming soon*

### Hand Control Mode
> *Screenshot placeholder - Coming soon*

### Different Angles
> *Screenshot placeholder - Coming soon*

</div>

---

## 🎯 Roadmap

### ✅ Completed Features
- [x] Complete solar system (all 8 planets + Sun)
- [x] Hand gesture control integration (rotate + zoom)
- [x] Camera feed with live preview
- [x] Earth special effects (atmosphere, clouds, moon, satellites)
- [x] Saturn ring system
- [x] 8000+ star background with fog
- [x] UFO objects with glowing effects
- [x] Orbit paths visualization
- [x] Dual control mode (hand + mouse/keyboard)
- [x] Live deployment on GitHub Pages

### 🚧 Planned Enhancements
- [ ] Realistic planet textures (NASA imagery)
- [ ] Clickable planets with info panels
- [ ] Sound effects and ambient space music
- [ ] More moons (Mars, Jupiter, Saturn systems)
- [ ] Asteroid belt
- [ ] Comets and shooting stars
- [ ] Mobile touch controls optimization
- [ ] VR mode support (WebXR)
- [ ] Educational quiz mode
- [ ] Customizable camera paths/tours
- [ ] Performance stats overlay

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🐛 Known Issues

- **Low Light Performance**: Hand tracking less accurate in dim lighting (requires well-lit environment)
- **HTTPS Required**: Camera access only works on HTTPS or localhost
- **Pinch Sensitivity**: Pinch gesture detection thresholds may need adjustment for different hand sizes
- **Mobile Performance**: May have reduced FPS on older mobile devices (8000 stars + planets)
- **Camera Mirror Effect**: Video preview is mirrored (scaleX: -1) for natural interaction
- **Browser Compatibility**: Best performance on Chrome/Edge (MediaPipe optimized for Chromium)

*Found a bug? [Open an issue](https://github.com/FaseehRizwan/3dSolarSystem/issues)*

---

## 📝 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 👨‍💻 Author

<div align="center">

**Muhammad Faseeh**

Full-Stack Developer | AI Specialist | 3D Artist | Game Developer

[![Portfolio](https://img.shields.io/badge/🌐_Portfolio-FF5722?style=for-the-badge)](https://mfaseeh.tech)
[![EduLMS](https://img.shields.io/badge/🏫_EduLMS-4CAF50?style=for-the-badge)](https://edulms.online)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mfaseeh115/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/FaseehRizwan)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mfaseehrizwan@gmail.com)

</div>

---

## � Technical Implementation

### Core Architecture
- **Three.js Scene**: 60 FPS rendering with fog effects (density: 0.002)
- **Camera Setup**: PerspectiveCamera (60° FOV, position: 0,20,50)
- **Orbit Controls**: Damping enabled, auto-rotate disabled, min/max distance: 5-200
- **Lighting**: Point light from sun + ambient light for visibility

### Hand Tracking Pipeline
```javascript
// MediaPipe Hands Configuration
maxNumHands: 1
modelComplexity: 1
minDetectionConfidence: 0.5
minTrackingConfidence: 0.5

// Hand State Tracking
Palm Position (Landmark 9) → Camera Rotation
Thumb-Index Distance → Pinch Detection & Zoom
```

### Performance Optimizations
- Low-poly planet models (16-64 segments)
- Efficient particle system for 8000 stars
- Orbit controls with damping (factor: 0.05)
- Responsive rendering with `devicePixelRatio`
- Selective features (Earth gets special treatment)

### File Structure
```
3dSolarSystem/
├── index.html          # Main HTML with embedded Three.js scene
├── style.css          # Separated UI styles (camera preview, legends)
├── script.js          # Separated JavaScript logic
└── README.md          # This file
```

---

## �🙏 Acknowledgments

- [Three.js](https://threejs.org/) - 3D graphics library
- [MediaPipe](https://mediapipe.dev/) - Hand tracking solution by Google
- [NASA](https://www.nasa.gov/) - Reference images and planetary data
- [Solar System Scope](https://www.solarsystemscope.com/) - Inspiration

---

## ⭐ Show Your Support

If you like this project, please consider giving it a ⭐️ on GitHub!

<div align="center">

### 💡 "The cosmos is within us. We are made of star-stuff." - Carl Sagan

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,24,28&height=100&section=footer"/>

</div>
