/*
  SEARCH WITH DEBOUNCE + CACHING
  --------------------------------
  Difficulty: Medium
  Concepts: useState, useEffect, debounce pattern, caching with Record<>,
            async/await, cleanup functions, typing API responses

  How it works (step by step):
  1. User types → searchText changes
  2. useEffect runs → schedules fetchData after 2 seconds via setTimeout
  3. If user types again within 2 seconds:
     - cleanup runs → clearTimeout(timer)
     - previous API call is cancelled
  4. Only when user STOPS typing for 2 seconds → fetchData() runs
  5. Before fetching, checks cache — if result exists, skips the API call

  That's classic DEBOUNCE + CACHING behavior.

  Optimisations:
  i)  Debounce — reduces API calls (waits for typing pause)
  ii) Caching  — avoids duplicate API calls (typing "Elo", erasing, retyping "Elo" → cache hit)
*/

import { useEffect, useState } from "react";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);

  // Cache: maps search term → results array
  // Why Record (object)? Lookup time is O(1) — instant access by key
  const [cache, setCache] = useState<Record<string, string[]>>({});

  // Debounce: delay API call by 2 seconds after last keystroke
  useEffect(() => {
    async function fetchData() {
      // Don't fetch for empty/whitespace input
      if (!searchText.trim()) {
        setSearchResults([]);
        return;
      }

      // CACHE HIT — return cached results without making an API call
      if (cache[searchText]) {
        setSearchResults(cache[searchText]);
        return;
      }

      // CACHE MISS — fetch from API, then store in cache for next time
      const response = await fetch(
        "https://www.google.com/complete/search?client=firefox&q=" + searchText,
      );
      // Google's autocomplete API returns [query, suggestions[]]
      const json: [string, string[]] = await response.json();
      const suggestions = json[1];

      setSearchResults(suggestions);

      // Update cache immutably using functional setState
      // (prevCache ensures we don't lose other cached entries)
      setCache((prevCache) => ({
        ...prevCache,
        [searchText]: suggestions,
      }));
    }

    // Schedule the API call — don't invoke fetchData() here, pass the reference
    const timer = setTimeout(fetchData, 2000);

    // Cleanup: if another keystroke happens within 2 seconds,
    // cancel the old timer and a new one will be created
    return () => clearTimeout(timer);
  }, [searchText, cache]);

  return (
    <div className="m-10">
      <input
        type="text"
        className="border border-black p-2 w-96 rounded-lg shadow-lg"
        value={searchText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
        onFocus={() => setIsSearchResultsVisible(true)}
        onBlur={() => setIsSearchResultsVisible(false)}
      />

      {/* Show results only when: there ARE results AND input is focused */}
      {searchResults.length > 0 && isSearchResultsVisible && (
        <ul className="p-2 border border-black w-96 rounded-lg shadow-lg">
          {searchResults.map((result) => (
            <li
              key={result}
              className="hover:bg-gray-200 cursor-pointer p-2 rounded-lg"
            >
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/*
  ── INTERVIEW TALKING POINTS ──────────────────────────────────────

  Q: Why debounce instead of calling API on every keystroke?
  A: If a user types "elon musk" (9 chars), that's 9 API calls without debounce.
     With debounce (2s delay), it becomes 1-2 calls. Multiply by millions of
     users and this saves enormous server load.

  Q: Why cache with an object (Record) instead of an array?
  A: Object lookup is O(1) by key. With an array you'd need O(n) search.
     Example: cache["elon"] instantly returns cached results.

  Q: Why functional setState for cache? setCache((prev) => ...)
  A: Because multiple rapid updates could cause stale state if you use
     cache directly (closure captures old value). Functional form always
     gets the latest state.

  Q: Why does onBlur hide results?
  A: UX pattern — clicking outside the input should dismiss the dropdown.
     onBlur fires when the input loses focus.

  Q: What's the cleanup function in useEffect?
  A: return () => clearTimeout(timer) runs BEFORE the next effect
     and on unmount. This is how we cancel the previous debounce timer
     when a new keystroke happens.
*/
