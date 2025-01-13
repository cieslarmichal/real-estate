import { useEffect, useRef, useState } from 'react';
import styles from './autocompleteInput.module.css';

function AutocompleteInput({ suggestions, value, onChange, onSelect, placeholder }) {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (value) {
      const filtered = suggestions.filter((suggestion) => suggestion.toLowerCase().startsWith(value.toLowerCase()));

      if (value === filtered[0]) {
        setShowSuggestions(false);
        return;
      }

      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
      setActiveSuggestionIndex(-1);
    } else {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }
  }, [value, suggestions]);

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleClick = (suggestion) => {
    onSelect(suggestion);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (activeSuggestionIndex >= 0) {
        onSelect(filteredSuggestions[activeSuggestionIndex]);
      } else if (filteredSuggestions.length === 1) {
        onSelect(filteredSuggestions[0]);
      }

      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    } else if (event.key === 'ArrowUp') {
      if (activeSuggestionIndex > 0) {
        setActiveSuggestionIndex((prev) => prev - 1);
      } else {
        setActiveSuggestionIndex(filteredSuggestions.length - 1);
      }
    } else if (event.key === 'ArrowDown') {
      if (activeSuggestionIndex < filteredSuggestions.length - 1) {
        setActiveSuggestionIndex((prev) => prev + 1);
      } else {
        setActiveSuggestionIndex(0);
      }
    } else if (event.key === 'Escape') {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }
  };

  const handleMouseOver = (index) => {
    setActiveSuggestionIndex(index);
  };

  const handleMouseOut = () => {
    setActiveSuggestionIndex(-1);
  };

  const renderSuggestions = () => {
    if (showSuggestions && value) {
      if (filteredSuggestions.length) {
        return (
          <ul className={styles.suggestions}>
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={suggestion}
                className={index === activeSuggestionIndex ? styles.suggestionActive : ''}
                onClick={() => handleClick(suggestion)}
                onMouseOver={() => handleMouseOver(index)}
                onMouseOut={handleMouseOut}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        );
      }
    }

    return null;
  };

  return (
    <div className={styles.autocomplete}>
      <input
        type="text"
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={styles.input}
      />
      {renderSuggestions()}
    </div>
  );
}

export default AutocompleteInput;
