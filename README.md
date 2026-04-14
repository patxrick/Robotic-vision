<h1 align="center">
  <br>
  <img src="https://raw.githubusercontent.com/Deepakk0506/Robotic-vision-project/main/public/logo.png" alt="IGC-Net" width="200" onerror="this.onerror=null; this.src='https://via.placeholder.com/200?text=IGC-Net';">
  <br>
  IGC-Net
  <br>
</h1>

<h4 align="center">Importance-Guided Neural Image Compression for Low-Latency High-Fidelity Image Reconstruction</h4>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#architecture-pipeline">Architecture Pipeline</a> •
  <a href="#applications">Applications</a> •
  <a href="#metrics-used">Metrics Used</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#installation">Installation</a> •
  <a href="#future-improvements">Future Improvements</a>
</p>

---

## 🚀 Overview

Traditional image compression techniques often degrade visual quality when reducing data size. **IGC-Net** addresses this critical problem using a state-of-the-art neural compression pipeline that intelligently identifies important visual regions and dynamically allocates compression resources across the image.

This importance-guided compression strategy prioritizes critical image regions—ensuring that essential structures, sharp edges, and fine textures remain intact after reconstruction. By reducing data transmission latency while maintaining image fidelity close to the original, IGC-Net represents a robust solution for real-time, high-resolution image transmission frameworks.

---

## ✨ Key Features

- **Importance-Guided Neural Compression**: Dynamically distributes bitrate, prioritizing salient features.
- **Ultra-Low Transmission Latency**: Optimized for real-time and edge AI implementations.
- **High-Fidelity Reconstruction**: Retains structural integrity and visual aesthetics of original images.
- **High-Resolution Support**: Seamlessly processes 4k and higher-resolution imagery.
- **Efficient Bandwidth Utilization**: Substantially reduces bandwidth overhead for scalable transmission.
- **State-of-the-Art Architecture**: Deep learning-based, sophisticated encoder–decoder framework.

---

## 🧠 Architecture Pipeline

The IGC-Net model follows a meticulously designed multi-stage neural compression pipeline:

1. **Image Input**: A high-resolution image is provided as input to the pipeline.
2. **Neural Feature Encoder**: A robust convolution-based neural network extracts highly compact latent features.
3. **Importance Map Generation**: Visually significant regions are isolated to form an importance heat map.
4. **Importance-Guided Compression**: Uses the map to intelligently allocate more bits to critical zones and fewer to less relevant background areas.
5. **Efficient Data Representation**: The processed data is serialized into a highly compressed representation formulated for rapid transmission.
6. **Neural Image Reconstruction**: A specialized decoder reconstructs the visual data, minimizing detail loss and maximizing perceptual quality.

---

## 🎯 Applications

IGC-Net provides fundamental technical infrastructure for diverse domains dependent on efficient image transmission:

| Domain | Application |
|---|---|
| ☁️ **Cloud Computing** | Cloud-based image processing systems |
| 🚗 **Autonomous Systems** | Autonomous vehicles and robotic vision |
| 🛰️ **Space Tech** | Satellite imagery and remote sensing |
| 🏥 **Healthcare** | Tele-medical imaging transmission |
| 📱 **Edge Devices** | Edge AI systems and resource-constrained IoT devices |
| 🎬 **Media Operations** | High-resolution live media streaming |

---

## 📊 Metrics Used

To rigorously evaluate compression efficiency versus reconstruction quality, IGC-Net utilizes industry-standard metrics:

- **PSNR (Peak Signal-to-Noise Ratio)**: Evaluates structural decay.
- **SSIM (Structural Similarity Index)**: Measures perceptual visual fidelity.
- **Compression Ratio**: Validates data footprint reduction.
- **Latency Reduction**: Benchmarks speed improvements in transmission.

---

## 💻 Interactive Demo

The project includes an immersive web interface offering the following capabilities:

- Instantly **upload** custom images.
- **Preview** the compressed data visualization.
- Analyze the fully **reconstructed** image.
- Monitor real-time **compression percentages**.
- Directly **compare similarity metrics** between the source and the reconstructed outputs.

---

## 🛠️ Tech Stack

**Deep Learning & Model Training**
- Python
- PyTorch / TensorFlow
- OpenCV

**Web Interface & Visualization**
- React
- TailwindCSS
- Framer Motion
- Three.js

---

## ⚙️ Installation

To set up and run the IGC-Net framework locally, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/Deepakk0506/Robotic-vision-project.git
   ```

2. **Navigate to the project folder**
   ```bash
   cd Robotic-vision-project
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   npm install # For the frontend application
   ```

4. **Run the model ecosystem**
   ```bash
   python main.py
   npm run dev
   ```

*(Note: Adjust the above paths based on whether you are running the frontend or the backend component.)*

---

## 🔮 Future Improvements

- 📈 Interface with advanced entropy coding mechanisms to push compression efficiency to new limits.
- 🎞️ Extend model architecture to support seamless real-time video stream compression.
- ⚡ Further scale down latency and optimize model inference specifically for low-power edge devices.
- 🤖 Integrate progressive transformer-based compression networks for complex feature extraction.

---

## ✍️ Author

**Patrick Deva A**
<br>
*Research Project – Neural Image Compression*

---

## 📄 License

This project is open-sourced under the **MIT License**.
