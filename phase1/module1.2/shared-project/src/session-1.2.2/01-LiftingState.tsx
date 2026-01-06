/**
 * Exercise 1: Temperature Converter - Lifting State Up
 *
 * Mục tiêu:
 * - Hiểu lifting state up pattern
 * - Tạo single source of truth
 * - Sync 2 inputs với nhau
 *
 * Yêu cầu:
 * - Nhập Celsius → Fahrenheit tự động cập nhật
 * - Nhập Fahrenheit → Celsius tự động cập nhật
 * - Cả 2 inputs luôn sync với nhau
 */

import { useState } from "react";

// Conversion functions - dùng trong implementation
export function toCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

export function toFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

// ============================================================
// Component chính - Bạn cần implement ở đây
// ============================================================

export default function TemperatureConverter() {
  const [temperature, setTemperature] = useState(0);
  const fahrenheit = toFahrenheit(temperature);
  const handleCelsiusChange = (value: number) => {
    setTemperature(value);
  };
  const handleFahrenheitChange = (value: number) => {
    setTemperature(toCelsius(value));
  };
  // ╔════════════════════════════════════════════════════════╗
  // ║  👉 YOUR CODE HERE                                     ║
  // ║                                                        ║
  // ║  1. Tạo state cho temperature (dùng Celsius làm base)  ║
  // ║  2. Tính fahrenheit từ celsius (derived value)         ║
  // ║  3. Tạo 2 handler functions:                           ║
  // ║     - handleCelsiusChange: update celsius trực tiếp    ║
  // ║     - handleFahrenheitChange: convert về celsius       ║
  // ╚════════════════════════════════════════════════════════╝

  return (
    <div style={styles.container}>
      <h2>Temperature Converter</h2>

      <div style={styles.inputGroup}>
        {/*
          👉 Pass props cho TemperatureInput:
          - scale: "C" hoặc "F"
          - value: giá trị temperature
          - onChange: handler function
        */}
        <TemperatureInput
          scale="C"
          value={temperature} // 👈 Thay bằng celsius state
          onChange={(value) => {
            handleCelsiusChange(value);
          }} // 👈 Thay bằng handler
        />

        <TemperatureInput
          scale="F"
          value={fahrenheit} // 👈 Thay bằng fahrenheit (derived)
          onChange={(value) => {
            handleFahrenheitChange(value);
          }} // 👈 Thay bằng handler
        />
      </div>

      <div style={styles.result}>
        <p>
          {temperature.toFixed(1)}°C = {fahrenheit.toFixed(1)}°F
          {/* 👉 Hiển thị kết quả: "{celsius}°C = {fahrenheit}°F" */}
        </p>
      </div>
    </div>
  );
}

// ============================================================
// Component con - ĐÃ HOÀN THÀNH, không cần sửa
// ============================================================

interface TemperatureInputProps {
  scale: "C" | "F";
  value: number;
  onChange: (value: number) => void;
}

function TemperatureInput({ scale, value, onChange }: TemperatureInputProps) {
  const scaleNames = {
    C: "Celsius",
    F: "Fahrenheit",
  };

  return (
    <div style={styles.inputWrapper}>
      <label style={styles.label}>
        {scaleNames[scale]}:
        <input
          type="number"
          value={value.toFixed(1)}
          onChange={(e) => onChange(Number(e.target.value))}
          style={styles.input}
        />
        °{scale}
      </label>
    </div>
  );
}

// ============================================================
// Styles - Đã có sẵn
// ============================================================

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "20px",
    maxWidth: "400px",
    margin: "0 auto",
    fontFamily: "system-ui, sans-serif",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "20px",
  },
  inputWrapper: {
    padding: "12px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
  },
  input: {
    padding: "8px 12px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    width: "100px",
  },
  result: {
    padding: "16px",
    backgroundColor: "#e8f5e9",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
  },
};
