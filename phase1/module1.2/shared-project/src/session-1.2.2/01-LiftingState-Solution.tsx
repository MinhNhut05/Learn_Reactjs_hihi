/**
 * Exercise 1: Temperature Converter - SOLUTION
 *
 * Key concepts:
 * 1. Single source of truth: celsius là state duy nhất
 * 2. Derived value: fahrenheit được tính từ celsius
 * 3. Lifting state up: state ở parent, pass xuống children
 * 4. Controlled components: cả 2 inputs controlled bởi parent
 */

import { useState } from "react";

// Conversion functions
function toCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export default function TemperatureConverter() {
  // 1. Single source of truth - chỉ có 1 state
  const [celsius, setCelsius] = useState(0);

  // 2. Derived value - không cần state riêng cho fahrenheit
  const fahrenheit = toFahrenheit(celsius);

  // 3. Handler cho Celsius input - update trực tiếp
  const handleCelsiusChange = (value: number) => {
    setCelsius(value);
  };

  // 4. Handler cho Fahrenheit input - convert về celsius rồi update
  const handleFahrenheitChange = (value: number) => {
    setCelsius(toCelsius(value));
  };

  return (
    <div style={styles.container}>
      <h2>Temperature Converter</h2>

      <div style={styles.inputGroup}>
        <TemperatureInput
          scale="C"
          value={celsius}
          onChange={handleCelsiusChange}
        />

        <TemperatureInput
          scale="F"
          value={fahrenheit}
          onChange={handleFahrenheitChange}
        />
      </div>

      <div style={styles.result}>
        <p>
          {celsius.toFixed(1)}°C = {fahrenheit.toFixed(1)}°F
        </p>
      </div>
    </div>
  );
}

// Controlled component - không có state riêng
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
