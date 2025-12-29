// ✅ SOLUTION: Search Component với Keyboard Events

import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";

function SearchComponentSolution() {
  // State
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);

  // Search logic
  const performSearch = (query: string) => {
    // Clear results nếu query empty
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    console.log("Searching for:", query);

    // Mock search results
    const mockResults = [
      `Result 1 for "${query}"`,
      `Result 2 for "${query}"`,
      `Result 3 for "${query}"`,
    ];

    setResults(mockResults);
  };

  // Input change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    console.log("nhut");
  };

  // Keyboard event handler
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Enter key → Perform search
    if (e.key === "Enter") {
      performSearch(searchTerm);
    }

    // Escape key → Clear everything
    if (e.key === "Escape") {
      setSearchTerm("");
      setResults([]);
    }
  };

  // Clear button handler
  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    setSearchTerm("");
    setResults([]);
  };

  // Search button handler
  const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
    performSearch(searchTerm);
  };

  return (
    <div className="search-component">
      <h2>Search Component (Solution)</h2>

      <div className="search-input-wrapper" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search... (Press Enter or click Search)"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={{
            padding: "8px",
            marginRight: "10px",
            width: "300px",
          }}
        />

        <button
          onClick={handleSearch}
          style={{ padding: "8px 16px", marginRight: "10px" }}
        >
          Search
        </button>

        <button onClick={handleClear} style={{ padding: "8px 16px" }}>
          Clear
        </button>
      </div>

      {/* Search results */}
      <div className="search-results">
        {results.length > 0 && (
          <div>
            <h3>Results ({results.length}):</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {results.map((result, index) => (
                <li
                  key={index}
                  style={{
                    padding: "10px",
                    marginBottom: "5px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "4px",
                  }}
                >
                  {result}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
        <p>
          <strong>Keyboard Shortcuts:</strong>
        </p>
        <ul>
          <li>
            <kbd>Enter</kbd> - Perform search
          </li>
          <li>
            <kbd>Escape</kbd> - Clear search
          </li>
        </ul>
        <p>
          <strong>Try:</strong>
        </p>
        <ul>
          <li>Type "React" → Press Enter → See results</li>
          <li>Type "TypeScript" → Click Search → See results</li>
          <li>Press Escape → Clear everything</li>
          <li>Click Clear button → Clear everything</li>
        </ul>
      </div>
    </div>
  );
}

export default SearchComponentSolution;
