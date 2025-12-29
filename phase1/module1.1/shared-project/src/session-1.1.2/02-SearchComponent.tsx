// 📚 EXERCISE 2: Search Component với Keyboard Events
// 🎯 Đọc PART 2 trong COMPLETE_THEORY.md trước khi code!

import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";

function SearchComponent() {
  // TODO 1: Tạo state cho searchTerm và results
  // - searchTerm: string
  // - results: string[] (array of strings)
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);
  // TODO 2: Tạo performSearch function
  // - Parameter: query: string
  // - Check nếu query.trim() === '' → setResults([]) và return
  // - Console.log 'Searching for:', query
  // - Mock results (tạo array với 3 items):
  //   [`Result 1 for "${query}"`, `Result 2 for "${query}"`, ...]
  // - setResults với mock results
  const performSearch = (query: string) => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    console.log("Searching for:", query);
    const mockResults = [
      `Result 1 for "${query}"`,
      `Result 2 for "${query}"`,
      `Result 3 for "${query}"`,
    ];
    setResults(mockResults);
  };
  // TODO 3: Tạo handleChange
  // - Type: ChangeEvent<HTMLInputElement>
  // - Update searchTerm state với e.target.value
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  // TODO 4: Tạo handleKeyDown
  // - Type: KeyboardEvent<HTMLInputElement>
  // - Check e.key === 'Enter' → performSearch(searchTerm)
  // - Check e.key === 'Escape' → clear searchTerm và results
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      performSearch(searchTerm);
    }
    if (e.key === "Escape") {
      setSearchTerm("");
      setResults([]);
    }
  };
  // TODO 5: Tạo handleClear
  // - Type: MouseEvent<HTMLButtonElement>
  // - Clear searchTerm và results về ''
  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    setSearchTerm("");
    setResults([]);
  };
  // TODO 6: Tạo handleSearch
  // - Type: MouseEvent<HTMLButtonElement>
  // - Gọi performSearch(searchTerm)
  const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
    performSearch(searchTerm);
  };
  return (
    <div className="search-component">
      <h2>Search Component</h2>

      <div className="search-input-wrapper">
        {/* TODO 7: Input element
            - type="text"
            - placeholder="Search... (Press Enter or click Search)"
            - value={searchTerm}
            - onChange={handleChange}
            - onKeyDown={handleKeyDown}
        */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
        />

        {/* TODO 8: Search button
            - onClick={handleSearch}
            - text: "Search"
        */}
        <button onClick={handleSearch}>Search</button>
        {/* TODO 9: Clear button
            - onClick={handleClear}
            - text: "Clear"
        */}
        <button onClick={handleClear}>Clear</button>
      </div>

      {/* TODO 10: Render results
          - Check nếu results.length > 0
          - Render <ul> với results.map()
          - Mỗi item trong <li> với key={index}
      */}
      {results.length > 0 && (
        <ul>
          {results.map((result, index) => {
            return <li key={index}>{result}</li>;
          })}
        </ul>
      )}
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

export default SearchComponent;
