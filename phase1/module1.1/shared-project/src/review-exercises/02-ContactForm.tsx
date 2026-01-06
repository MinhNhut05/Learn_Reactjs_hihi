import React, { useEffect, useState } from "react";
const fieldStyle = {
  marginBottom: "16px",
};
const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "500",
  color: "#374151",
};
const inputStyle = {
  width: "100%",
  padding: "12px",
  fontSize: "16px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  outline: "none",
  transition: "border-color 0.2s",
};
const errorStyle = {
  color: "#ef4444",
  fontSize: "14px",
  marginTop: "4px",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical" as const,
  minHeight: "120px",
};

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "tel";
  value: string;
  error: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

function FormField({
  label,
  name,
  type = "text",
  value,
  error,
  placeholder,
  onChange,
  onBlur,
}: FormFieldProps) {
  return (
    <div style={fieldStyle}>
      <label htmlFor={name} style={labelStyle}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        style={inputStyle}
      />
      {error && <div style={errorStyle}>{error}</div>}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  error: string;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectField({
  label,
  name,
  value,
  error,
  options,
  onChange,
  onBlur,
}: SelectFieldProps) {
  return (
    <div style={fieldStyle}>
      <label htmlFor={name} style={labelStyle}>
        {label}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={inputStyle}
      >
        {options.map((opt) => (
          <option value={opt.value} key={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <div style={errorStyle}>{error}</div>}
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  error: string;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

function TextAreaField({
  label,
  name,
  value,
  error,
  placeholder,
  maxLength = 500,
  rows = 5,
  onChange,
  onBlur,
}: TextAreaFieldProps) {
  const isNearLimit = maxLength ? value.length > maxLength * 0.8 : false;

  const counterStyle = {
    textAlign: "right" as const,
    fontSize: "14px",
    color: isNearLimit ? "#f59e0b" : "#9ca3af", // vàng : xám
    marginTop: "4px",
  };

  return (
    <div style={fieldStyle}>
      <label htmlFor={name} style={labelStyle}>
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        style={textareaStyle}
      ></textarea>
      {error && <div style={errorStyle}>{error}</div>}
      {maxLength && (
        <div style={counterStyle}>
          {value.length} / {maxLength}
        </div>
      )}
    </div>
  );
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

export default function ContactForm() {
  // ============================================
  // PHẦN 1: Chỉ có UI, chưa có state hay logic
  // ============================================

  const containerStyle = {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "24px",
    textAlign: "center" as const,
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#3b82f6",
    color: "white",
    fontWeight: "500",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [messageError, setMessageError] = useState("");
  const debouncedName = useDebounce(name, 500);
  const debouncedEmail = useDebounce(email, 500);
  const debouncedMessage = useDebounce(message, 500);
  const debouncedPhone = useDebounce(phone, 500);
  const subjectOptions = [
    { value: "", label: "Select a subject hihi..." },
    { value: "general", label: "General Inquiry" },
    { value: "support", label: "Technical Support" },
    { value: "sales", label: "Sales Question" },
    { value: "other", label: "Other" },
  ];

  function validateName(value: string): string {
    if (value.trim() === "") return "Name is required";
    if (value.trim().length < 2) return "Name must be at least 2 characters";
    return "";
  }
  function validateEmail(value: string): string {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.trim() === "") return "Email is required";
    if (!emailRegex.test(value)) return "Invalid email format";
    return "";
  }
  function validatePhone(value: string): string {
    const phoneRegex = /^\d{10,11}$/;
    if (value.trim() === "") return "";
    if (!phoneRegex.test(value)) return "Phone must be 10-11 digits";
    return "";
  }
  function validateSubject(value: string): string {
    if (value === "") return "Please select a subject";
    return "";
  }
  function validateMessage(value: string): string {
    if (value.trim() === "") return "Message is required";
    if (value.trim().length < 10)
      return "Message must be at least 10 characters";
    if (value.trim().length > 500)
      return "Message must be less than 500 characters";
    return "";
  }
  useEffect(() => {
    if (name) {
      setNameError(validateName(debouncedName));
    }
  }, [debouncedName]);
  useEffect(() => {
    if (email) {
      setEmailError(validateEmail(debouncedEmail));
    }
  }, [debouncedEmail]);
  useEffect(() => {
    if (phone) {
      setPhoneError(validatePhone(debouncedPhone));
    }
  }, [debouncedPhone]);
  useEffect(() => {
    if (message) {
      setMessageError(validateMessage(debouncedMessage));
    }
  }, [debouncedMessage]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const phoneErr = validatePhone(phone);
    const subjectErr = validateSubject(subject);
    const messageErr = validateMessage(message);
    setNameError(nameErr);
    setEmailError(emailErr);
    setPhoneError(phoneErr);
    setSubjectError(subjectErr);
    setMessageError(messageErr);
    if (nameErr || emailErr || phoneErr || subjectErr || messageErr) {
      console.log("Form has errors!");
      return;
    }
    console.log("Form is valid! Submitting...", {
      name,
      email,
      phone,
      subject,
      message,
    });
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Contact Us</h1>

      <form>
        {/* ===== FIELD 1: Name ===== */}
        <FormField
          label="Name *"
          name="name"
          type="text"
          value={name}
          error={nameError}
          placeholder="John Doe"
          onChange={(e) => {
            setName(e.target.value);
            setNameError("");
          }}
          onBlur={() => setNameError(validateName(name))}
        />
        {/* ===== FIELD 2: Email ===== */}
        <FormField
          label="Email *"
          name="email"
          type="email"
          value={email}
          error={emailError}
          placeholder="john@example.com"
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
          onBlur={() => setEmailError(validateEmail(email))}
        />

        {/* ===== FIELD 3: Phone (Optional) ===== */}
        <FormField
          label="Phone (Optional)"
          name="phone"
          type="tel"
          value={phone}
          error={phoneError}
          placeholder="0123456789"
          onChange={(e) => {
            setPhone(e.target.value);
            setPhoneError("");
          }}
          onBlur={() => setPhoneError(validatePhone(phone))}
        />

        {/* ===== FIELD 4: Subject (Dropdown) ===== */}

        <SelectField
          label="Subject *"
          name="subject"
          value={subject}
          error={subjectError}
          options={subjectOptions}
          onChange={(e) => {
            setSubject(e.target.value);
            setSubjectError("");
          }}
          onBlur={() => setSubjectError(validateSubject(subject))}
        />

        {/* ===== FIELD 5: Message (Textarea) ===== */}
        <TextAreaField
          label="Message *"
          name="message"
          value={message}
          error={messageError}
          placeholder="Tell us what's on your mind..."
          maxLength={500}
          rows={5}
          onChange={(e) => {
            setMessage(e.target.value);
            setMessageError("");
          }}
          onBlur={() => setMessageError(validateMessage(message))}
        />

        {/* ===== SUBMIT BUTTON ===== */}
        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#2563eb")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#3b82f6")
          }
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
