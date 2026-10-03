# QRious
### Stay QRious. Design, scan, share.

A modern, customizable QR code generator built with React — create, style, preview, save, and download QR codes for everyday use.
<img width="1892" height="912" alt="image" src="https://github.com/user-attachments/assets/4c16ac4d-d8ff-457f-888a-d05a1677f67e" />
<img width="1902" height="912" alt="image" src="https://github.com/user-attachments/assets/b103033a-1757-4053-b45f-758fe785492f" />
<img width="1586" height="911" alt="image" src="https://github.com/user-attachments/assets/aa35debc-a343-4112-a828-4519c6d1cf34" />

## 🌐 Live Demo
https://qrious-seven.vercel.app/

## ✦ What is QRious?
QRious is a client-side QR code generator focused on making QR creation more than just entering a URL and downloading a black-and-white square.
It provides a visual workflow where you can:
**Choose → Enter → Customize → Preview → Save → Download**
The application supports multiple QR formats, customizable colors and sizing, predefined design presets, real-time validation, contrast checking, and locally stored QR history.

## ✨ Features
### 🔗 Multiple QR Types
Generate QR codes for different kinds of content:
- **URL**
- **Plain Text**
- **Email**
- **Phone Number**
- **Wi-Fi**

### 🎨 QR Customization
Create QR codes that match your style.
Customize:
- Foreground color
- Background color
- QR size
- Error correction level
- Margin
Changes are reflected in the live preview.

### 🎭 Design Presets
Don't want to customize everything manually?
Choose from predefined QR styles and apply them instantly.
Presets can still be modified afterwards, so they act as a starting point rather than locking the design.

### 👀 Live QR Preview
The QR code updates as you work.
Before downloading, you can see:
- The generated QR code
- Current styling
- Validation state
- Contrast status
- Final appearance

### ✅ Validation & Contrast Checking
QRious doesn't simply generate a QR code from whatever is entered.
The application validates the content before allowing it to be saved and checks the contrast between the QR foreground and background colors.
This helps maintain a better balance between **visual customization and scanability**.

### 💾 Local Persistence
Recent QR codes are stored using the browser's `localStorage`.
This means your history remains available even after refreshing the page.
No account or backend database is required.

### 📥 Download
Once a QR code is ready, it can be downloaded as a PNG for use elsewhere.

### 🖥️ Responsive Interface
The interface adapts to different screen sizes, allowing QRious to be used across:
- Desktop
- Laptop
- Tablet
- Mobile
  
## 🧭 How It Works
                ┌─────────────────┐
                │   Choose Type   │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │  Enter Content  │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │    Validate     │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │   Customize     │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │  Live Preview   │
                └────────┬────────┘
                         ↓
              ┌──────────┴──────────┐
              ↓                     ↓
        ┌───────────┐         ┌───────────┐
        │   Save    │         │  Download │
        └───────────┘         └───────────┘
