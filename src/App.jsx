import { useEffect, useState } from "react";

import Header from "./components/Header";
import QRTypeSelector from "./components/QRTypeSelector";
import QRForm from "./components/QRForm";
import CustomizationPanel from "./components/CustomizationPanel";
import PresetSelector from "./components/PresetSelector";
import QRPreview from "./components/QRPreview";
import RecentQRs from "./components/RecentQRs";
import CustomCursor from "./components/CustomCursor";
import { qrTypes } from "./data/qrTypes";
import { presets } from "./data/presets";
import { buildPayload } from "./utils/qrPayload";
import { validateQRData } from "./utils/validation";
import { getContrastStatus } from "./utils/contrast";

const HISTORY_KEY = "qrStudioHistory";
const HISTORY_LIMIT = 20;

const DEFAULT_DATA = {
  url: "",
  text: "",
  email: "",
  subject: "",
  body: "",
  phone: "",
  ssid: "",
  password: "",
  security: "WPA",
  hidden: false,
};

/*
 * Deep indigo on soft lilac: not pure black/white,
 * but still very high contrast, so it scans reliably.
 */
const DEFAULT_SETTINGS = {
  foreground: "#2a1f5c",
  background: "#f3eefc",
  size: 320,
  errorCorrectionLevel: "M",
  margin: 4,
};

function createId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function App() {
  const [activeType, setActiveType] = useState("url");

  const [data, setData] = useState(DEFAULT_DATA);

  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const [history, setHistory] = useState([]);

  const [showHistory, setShowHistory] = useState(false);

  /*
   * Load saved history when the application starts.
   */
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(HISTORY_KEY);

      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);

        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch (error) {
      console.error("Could not load QR history:", error);
    }
  }, []);

  /*
   * Save history whenever it changes.
   */
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Could not save QR history:", error);
    }
  }, [history]);

  /*
   * Change QR type.
   * Keep the fields that belong to the new type, clear the rest.
   */
  const handleTypeChange = (type) => {
    setActiveType(type);

    setData((previous) => ({
      ...DEFAULT_DATA,
      url: type === "url" ? previous.url : "",
      text: type === "text" ? previous.text : "",
      email: type === "email" ? previous.email : "",
      subject: type === "email" ? previous.subject : "",
      body: type === "email" ? previous.body : "",
      phone: type === "phone" ? previous.phone : "",
      ssid: type === "wifi" ? previous.ssid : "",
      password: type === "wifi" ? previous.password : "",
      security: type === "wifi" ? previous.security : "WPA",
      hidden: type === "wifi" ? previous.hidden : false,
    }));
  };

  /*
   * Update form fields.
   */
  const handleDataChange = (field, value) => {
    setData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /*
   * Update customization settings.
   */
  const handleSettingsChange = (field, value) => {
    setSettings((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /*
   * Apply a predefined QR style preset.
   * Users can still change any setting afterwards.
   */
  const handlePresetChange = (presetId) => {
    const preset = presets.find((item) => item.id === presetId);

    if (!preset) {
      return;
    }

    setSettings((previous) => ({
      ...previous,
      foreground: preset.foreground,
      background: preset.background,
      errorCorrectionLevel:
        preset.errorCorrectionLevel || previous.errorCorrectionLevel,
      margin: preset.margin ?? previous.margin,
    }));
  };

  /*
   * Derived values: payload, validation, contrast.
   */
  const payload = buildPayload(activeType, data);

  const validation = validateQRData(activeType, data);

  const contrast = getContrastStatus(
    settings.foreground,
    settings.background
  );

  const isValid = validation.valid && Boolean(payload);

  /*
   * Save the current QR code to history.
   */
  const handleSaveToHistory = () => {
    if (!isValid) {
      return;
    }

    const currentType = qrTypes.find((type) => type.id === activeType);

    const newItem = {
      id: createId(),
      type: activeType,
      typeLabel: currentType?.label || activeType,
      payload,
      data: { ...data },
      settings: { ...settings },
      createdAt: new Date().toISOString(),
    };

    /*
     * Newest first, limited to HISTORY_LIMIT items.
     */
    setHistory((previous) =>
      [newItem, ...previous].slice(0, HISTORY_LIMIT)
    );
  };

  /*
   * Reuse a QR from history.
   */
  const handleReuse = (item) => {
    if (!item) {
      return;
    }

    setActiveType(item.type);

    setData({
      ...DEFAULT_DATA,
      ...(item.data || {}),
    });

    setSettings({
      ...DEFAULT_SETTINGS,
      ...(item.settings || {}),
    });

    setShowHistory(false);
  };

  /*
   * Delete one QR from history.
   */
  const handleDeleteHistory = (id) => {
    setHistory((previous) => previous.filter((item) => item.id !== id));
  };

  /*
   * Clear complete QR history.
   */
  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="app">
      <CustomCursor />

      <Header
        historyCount={history.length}
        onHistoryClick={() => setShowHistory(true)}
      />

      <main className="main-container">
        <section className="hero-section">
          <div>
            
            <p className="eyebrow">Stay QRious</p>

            <h1>
              Stop making
              <br />
              <span>boring QR codes.</span>
            </h1>

            <p className="hero-description">
              Design custom, scan-ready QR codes for any link or text.
              Tweak the style, preview live, and download a crisp PNG
              in one click.
            </p>
          </div>
        </section>

        <section className="workspace">
          <div className="editor-column">
            <div className="card">
              <div className="card-header">
                <div>
                  <p className="section-label">01</p>
                  <h2>Choose QR type</h2>
                </div>
              </div>

              <QRTypeSelector
                activeType={activeType}
                onTypeChange={handleTypeChange}
              />
            </div>

            <div className="card">
              <div className="card-header">
                <div>
                  <p className="section-label">02</p>
                  <h2>Enter your content</h2>
                </div>
              </div>

              <QRForm
                type={activeType}
                data={data}
                onChange={handleDataChange}
                validation={validation}
              />
            </div>

            <div className="card">
              <div className="card-header">
                <div>
                  <p className="section-label">03</p>
                  <h2>Customize</h2>
                </div>
              </div>

              <CustomizationPanel
                settings={settings}
                onChange={handleSettingsChange}
                contrast={contrast}
              />

              <PresetSelector
                presets={presets}
                settings={settings}
                onPresetChange={handlePresetChange}
              />
            </div>
          </div>

          <div className="preview-column">
            <QRPreview
              payload={payload}
              settings={settings}
              isValid={isValid}
              validation={validation}
              contrast={contrast}
              onSaveHistory={handleSaveToHistory}
            />
          </div>
        </section>
      </main>

      {showHistory && (
        <RecentQRs
          history={history}
          onClose={() => setShowHistory(false)}
          onReuse={handleReuse}
          onDelete={handleDeleteHistory}
          onClear={handleClearHistory}
        />
      )}
    </div>
  );
}

export default App;