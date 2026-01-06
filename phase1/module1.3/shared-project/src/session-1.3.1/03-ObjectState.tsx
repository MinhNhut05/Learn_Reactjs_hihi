import { useState } from "react";

/**
 * ============================================================
 * Exercise 3: Object State & State Structure - SOLUTION
 * ============================================================
 */

// ============================================================
// PART A: OBJECT STATE UPDATES - SOLUTION
// ============================================================

interface Address {
  street: string;
  city: string;
  country: string;
}

interface UserProfile {
  name: string;
  age: number;
  email: string;
  address: Address;
  hobbies: string[];
}

export function ProfileEditor() {
  // TODO 1: Profile state
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    age: 25,
    email: "john@example.com",
    address: {
      street: "123 Main St",
      city: "New York",
      country: "USA",
    },
    hobbies: ["Reading", "Gaming"],
  });

  const [newHobby, setNewHobby] = useState("");

  // TODO 2: Update name (top-level)
  const updateName = (newName: string) => {
    // ✅ Spread operator - create new object
    setProfile({ ...profile, name: newName });
  };

  // TODO 3: Update city (nested field)
  const updateCity = (newCity: string) => {
    // ✅ CRITICAL: Spread BOTH levels!
    setProfile({
      ...profile,
      address: { ...profile.address, city: newCity },
    });
  };

  // TODO 4: Add hobby
  const addHobby = (hobby: string) => {
    if (!hobby.trim()) return;
    // ✅ Functional update + spread array
    setProfile((prev) => ({
      ...prev,
      hobbies: [...prev.hobbies, hobby],
    }));
    setNewHobby("");
  };

  // TODO 5: Remove hobby
  const removeHobby = (hobby: string) => {
    // ✅ Filter creates new array
    setProfile((prev) => ({
      ...prev,
      hobbies: prev.hobbies.filter((h) => h !== hobby),
    }));
  };

  // TODO 6: Render UI
  return (
    <div
      style={{ padding: "1rem", border: "2px solid purple", margin: "1rem" }}
    >
      <h3>🟣 Part A: Object State Updates</h3>

      {/* Profile Info */}
      <div style={{ marginBottom: "1rem" }}>
        <h4>Profile Info:</h4>
        <p>
          <strong>Name:</strong> {profile.name}
        </p>
        <p>
          <strong>Age:</strong> {profile.age}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <input
          type="text"
          placeholder="New name"
          onBlur={(e) => updateName(e.target.value)}
          defaultValue={profile.name}
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        />
      </div>

      {/* Address */}
      <div style={{ marginBottom: "1rem" }}>
        <h4>Address:</h4>
        <p>
          {profile.address.street}, {profile.address.city},{" "}
          {profile.address.country}
        </p>
        <button
          onClick={() => {
            const cities = ["New York", "Los Angeles", "Chicago", "Houston"];
            const randomCity =
              cities[Math.floor(Math.random() * cities.length)];
            updateCity(randomCity);
          }}
          style={{ padding: "0.5rem" }}
        >
          Change City (Random)
        </button>
      </div>

      {/* Hobbies */}
      <div>
        <h4>Hobbies:</h4>
        <ul>
          {profile.hobbies.map((hobby, index) => (
            <li key={index}>
              {hobby}{" "}
              <button
                onClick={() => removeHobby(hobby)}
                style={{
                  marginLeft: "0.5rem",
                  padding: "0.2rem 0.5rem",
                  background: "#ff6b6b",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addHobby(newHobby)}
            placeholder="New hobby"
            style={{ padding: "0.5rem", marginRight: "0.5rem" }}
          />
          <button
            onClick={() => addHobby(newHobby)}
            style={{ padding: "0.5rem" }}
          >
            Add Hobby
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PART B: STATE STRUCTURE - BAD VERSION
// ============================================================

export function BadContactForm() {
  // TODO 7: 8 separate states (intentionally BAD)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO 8: handleSubmit với nhiều variables
  const handleSubmit = () => {
    setIsSubmitting(true);
    setError(null);

    // ❌ Look at this mess - 6 separate variables!
    console.log("Submitting:", {
      firstName,
      lastName,
      email,
      phone,
      street,
      city,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Form submitted! Check console.");
    }, 1000);
  };

  // TODO 9: Render form
  return (
    <div style={{ padding: "1rem", border: "2px solid red", margin: "1rem" }}>
      <h3>🔴 Bad Version: 8 Separate States</h3>
      <p style={{ fontSize: "0.85rem", color: "gray" }}>
        Có 8 useState calls và 6 onChange handlers riêng lẻ!
      </p>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ padding: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ padding: "0.5rem" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "0.5rem" }}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ padding: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          style={{ padding: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: "0.5rem" }}
        />
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{ padding: "0.5rem", cursor: "pointer" }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

// ============================================================
// PART B: STATE STRUCTURE - GOOD VERSION
// ============================================================

interface PersonalInfo {
  firstName: string;
  lastName: string;
}

interface ContactInfo {
  email: string;
  phone: string;
}

interface AddressInfo {
  street: string;
  city: string;
}

export function GoodContactForm() {
  // TODO 10: Grouped states
  const [personal, setPersonal] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
  });

  const [contact, setContact] = useState<ContactInfo>({
    email: "",
    phone: "",
  });

  const [address, setAddress] = useState<AddressInfo>({
    street: "",
    city: "",
  });

  // UI states separate (không liên quan form data)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO 11: Generic update handlers
  const updatePersonal = <K extends keyof PersonalInfo>(
    field: K,
    value: PersonalInfo[K]
  ) => {
    setPersonal((prev) => ({ ...prev, [field]: value }));
  };

  const updateContact = <K extends keyof ContactInfo>(
    field: K,
    value: ContactInfo[K]
  ) => {
    setContact((prev) => ({ ...prev, [field]: value }));
  };

  const updateAddress = <K extends keyof AddressInfo>(
    field: K,
    value: AddressInfo[K]
  ) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  // TODO 12: handleSubmit với grouped data
  const handleSubmit = () => {
    setIsSubmitting(true);
    setError(null);

    // ✅ Much cleaner - logical groups!
    console.log("Submitting:", { personal, contact, address });

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Form submitted! Check console.");
    }, 1000);
  };

  // TODO 13: Render form
  return (
    <div style={{ padding: "1rem", border: "2px solid green", margin: "1rem" }}>
      <h3>🟢 Good Version: Grouped States</h3>
      <p style={{ fontSize: "0.85rem", color: "gray" }}>
        Chỉ 5 useState calls (3 groups + 2 UI states) và 3 generic handlers!
      </p>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        <input
          type="text"
          placeholder="First Name"
          value={personal.firstName}
          onChange={(e) => updatePersonal("firstName", e.target.value)}
          style={{ padding: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={personal.lastName}
          onChange={(e) => updatePersonal("lastName", e.target.value)}
          style={{ padding: "0.5rem" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={contact.email}
          onChange={(e) => updateContact("email", e.target.value)}
          style={{ padding: "0.5rem" }}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={contact.phone}
          onChange={(e) => updateContact("phone", e.target.value)}
          style={{ padding: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Street"
          value={address.street}
          onChange={(e) => updateAddress("street", e.target.value)}
          style={{ padding: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="City"
          value={address.city}
          onChange={(e) => updateAddress("city", e.target.value)}
          style={{ padding: "0.5rem" }}
        />
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{ padding: "0.5rem", cursor: "pointer" }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function ObjectStateSolution() {
  return (
    <div>
      <h2>Exercise 3: Object State & State Structure - SOLUTION</h2>
      <hr />

      <ProfileEditor />

      <div style={{ margin: "2rem 0" }}>
        <h3>Part B: State Structure Comparison</h3>
      </div>

      <BadContactForm />
      <GoodContactForm />

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "#e8f5e9",
          borderLeft: "4px solid green",
        }}
      >
        <h4>Key Takeaways:</h4>

        <h5>Part A: Object Updates</h5>
        <pre
          style={{
            background: "#333",
            color: "#fff",
            padding: "1rem",
            fontSize: "0.85rem",
          }}
        >
          {`
// Top-level update
setProfile({ ...profile, name: newName });

// Nested update - MUST spread both levels!
setProfile({
  ...profile,
  address: { ...profile.address, city: newCity }
});

// Array update
setProfile(prev => ({
  ...prev,
  hobbies: [...prev.hobbies, newHobby]
}));

// Array remove
setProfile(prev => ({
  ...prev,
  hobbies: prev.hobbies.filter(h => h !== hobby)
}));
          `}
        </pre>

        <h5>Part B: State Structure</h5>
        <pre
          style={{
            background: "#333",
            color: "#fff",
            padding: "1rem",
            fontSize: "0.85rem",
          }}
        >
          {`
❌ BAD: 8 separate states
  - Hard to manage
  - Many onChange handlers
  - Verbose submit logic

✅ GOOD: 3 logical groups + 2 UI states
  - Clear organization
  - Generic handlers
  - Clean submit logic

Decision Framework:
- Same context? → Group together
- Independent updates? → Keep separate
- UI state vs Data state? → Separate
          `}
        </pre>

        <h4>Benefits of Grouped States:</h4>
        <ul>
          <li>✅ Easier to validate (validate whole group)</li>
          <li>✅ Easier to reset (reset whole group)</li>
          <li>✅ Easier to submit (pass whole group to API)</li>
          <li>✅ Scalable (add fields without new states)</li>
          <li>✅ Type-safe with TypeScript</li>
        </ul>
      </div>
    </div>
  );
}
