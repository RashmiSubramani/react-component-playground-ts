# Building Components — React + TypeScript

A collection of **148 self-contained React components** built with TypeScript, organized by difficulty. Each component lives in its own folder demonstrating specific frontend patterns commonly tested in live coding interviews.

**Stack:** React 18 · TypeScript · Vite · CSS (no Tailwind) · react-icons · lucide-react

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The sidebar has search, filter by difficulty, and A-Z/Z-A sort.

## Architecture

```
src/
├── routes/componentRegistry.ts   ← single source of truth (sidebar + routes)
├── layouts/RootLayout.tsx        ← sidebar with search/filter/sort + content layout
├── pages/
│   ├── HomePage.tsx              ← card grid grouped by difficulty
│   └── ComponentPage.tsx         ← renders component by URL slug
└── components/
    ├── easy/                     ← 65 components
    ├── medium/                   ← 55 components
    ├── hard/                     ← 10 components
    ├── advanced/                 ← 9 components (React hooks deep dives)
    └── games/                    ← 8 components
```

**Adding a component:** Add one entry in `componentRegistry.ts` — sidebar nav and routes are generated automatically.

---

## Components

### Easy (65)

| # | Component | Key Concepts |
|---|-----------|-------------|
| 1 | Accordion | useState, lifting state up, conditional rendering |
| 2 | Analogue Clock | useState\<Date\>, trigonometry, inline computed styles |
| 3 | Array to Zig Zag | useState, array manipulation, zig-zag pattern |
| 4 | Asterisk Field Validation | useState, form validation, required fields |
| 5 | Authentication | useContext, UserProvider, login/logout |
| 6 | Autosave Input (LocalStorage) | useState, useEffect, localStorage |
| 7 | Back to Top | useState, useEffect, scroll event, window.scrollTo |
| 8 | Blog Posts | props, component composition, card layout |
| 9 | Breadcrumb - Basic | typed array of objects, conditional rendering, aria-label |
| 10 | Calculate Age | useState, Date API, age calculation |
| 11 | Cards Carousel | typed Card object, index-based navigation |
| 12 | Character Count | useState, string length, controlled input |
| 13 | Chat - Normal | useState, onKeyDown, chat UI |
| 14 | Chips Input | KeyboardEvent, duplicate prevention, slice/filter |
| 15 | Color Explorer | useState, filter, color data, search |
| 16 | Comments - Basic | recursive type, recursive component |
| 17 | Confirmation Modal | useState, modal, confirm/cancel |
| 18 | Contact Form | useState, form handling, validation |
| 19 | Copy to Clipboard | navigator.clipboard, useState, async/await |
| 20 | Count-Up Timer | useRef, conditional interval, padStart |
| 21 | Countdown Timer | setInterval + cleanup, Date math |
| 22 | Counter | useState, increment/decrement/reset |
| 23 | Dark Mode Toggle | useState, CSS variables, theme toggle |
| 24 | Dynamic Greeting | useState, Date API, time-based rendering |
| 25 | Even or Odd | useState, modulo operator, conditional rendering |
| 26 | Feed | typed Post object, FormEvent, toggle like |
| 27 | Focus Input | useRef, focus, programmatic DOM access |
| 28 | Form - Auto-Save | typed FormData, localStorage get/set + JSON |
| 29 | Frequently Asked Questions | useState, toggle, accordion pattern |
| 30 | Get Weekday | useState, Date API, getDay |
| 31 | Grid - Lights | useState\<Set\>, activation order, reverse deactivation |
| 32 | Grid - Lights Toggle | 2D grid state, directional offsets, boundary checking |
| 33 | Guess the Number | useState, Math.random, comparison logic |
| 34 | Holy Grail Layout | CSS Grid, grid-column spanning, responsive media query |
| 35 | Image - Carousel | circular index wrapping, dot indicators |
| 36 | Image - Gallery | string \| null selected, modal with stopPropagation |
| 37 | Image - Slider | setInterval + cleanup, circular index |
| 38 | Image Slider - Transition | useEffect, CSS keyframes, direction state |
| 39 | Leap Year | useState, leap year logic, conditional rendering |
| 40 | Mortgage Calculator | useState, math formula, controlled inputs |
| 41 | Navbar | MemoryRouter, NavLink, Routes, active styling |
| 42 | Pagination - FE | useState, client-side pagination, slice |
| 43 | Password Strength | useState, regex validation, strength meter |
| 44 | Progress Bar | useEffect, inline styles, ARIA accessibility |
| 45 | Push Notification | useEffect, Notification API, toast, auto-dismiss |
| 46 | Rating - Half Star | getBoundingClientRect, half detection |
| 47 | Rating - Star | hover preview, FaStar/FaRegStar toggle |
| 48 | Read More | useState, string slice, toggle |
| 49 | Recipe Filter App | useState, filter, search, category filter |
| 50 | Sidebar | useState, toggle, CSS transition |
| 51 | Slider | typed optional props, ChangeEvent, range input |
| 52 | Social Share | encodeURIComponent, window.open, clipboard API |
| 53 | Sortable List | useCallback, localeCompare, typed SortOrder |
| 54 | Tab Switcher | useState, tab navigation, conditional rendering |
| 55 | Timer - Stopwatch | conditional setInterval, disabled button guards |
| 56 | Todo - List | typed arrays, immutable updates, filter/map |
| 57 | Todo - With Timer | typed Todo (isRunning flag), global setInterval |
| 58 | Toggle Button (Custom Hook) | custom hook, useState, reusable logic |
| 59 | Toggle Password | useState, input type toggle, visibility |
| 60 | Tooltip | ReactNode children prop, onFocus/onBlur a11y |
| 61 | Traffic Lights | LightColor union, recursive setTimeout chain |
| 62 | UsePrevious Hook Counter | useRef, custom hook, previous value tracking |
| 63 | User Profile | useState, useEffect, fetch API, profile card |
| 64 | Weather App | typed API response, async/await + try/catch/finally |
| 65 | Word Counter | Record frequency map, Object.entries + sort |

### Medium (55)

| # | Component | Key Concepts |
|---|-----------|-------------|
| 1 | Accessible Form | aria-invalid, aria-describedby, regex validation |
| 2 | API Pagination | typed API response, offset pagination (limit + skip) |
| 3 | Autocomplete | debounced API search, keyboard nav, highlight match |
| 4 | Billing Counter | useState, queue, counter logic |
| 5 | Bishop Moves | chess board, diagonal movement |
| 6 | BMI Calculator | math formula, conditional rendering |
| 7 | Breadcrumb App | MemoryRouter, useLocation, useParams |
| 8 | Calculator | eval, button grid, display |
| 9 | Calendar | Date API, grid layout, isSameDate helper |
| 10 | Captcha Generator | random string, canvas, validation |
| 11 | Chat - Socket | Socket.IO, useRef, useEffect, real-time |
| 12 | Cinema Hall Booking | Array.from grid, includes-based toggle |
| 13 | Color Code Game | random colors, score tracking |
| 14 | Dice Roller | Math.random, animation |
| 15 | Drag & Drop | HTML5 drag events, same-list reorder, cross-list |
| 16 | Drag & Drop 2 | reorder, cross-list transfer |
| 17 | Draw Circles | onClick coordinates, undo/redo |
| 18 | Dropdown | useRef, click-outside, keyboard navigation |
| 19 | Dropdown Multi-Select | union state, Array.isArray() narrowing |
| 20 | Dynamic Form | config-driven rendering, FieldType union |
| 21 | Emoji Replacer | string replace, emoji mapping |
| 22 | Expense Tracker | CRUD, income/expense, balance |
| 23 | Image Cropper | canvas drawImage + toDataURL, FileReader |
| 24 | Infinite Scroll | IntersectionObserver, sentinel ref |
| 25 | JSON Formatter & Validator | JSON.parse, JSON.stringify, error handling |
| 26 | Kanban Board | Record\<ColumnId, Task[]\>, HTML5 drag |
| 27 | King Moves | chess board, adjacent cells |
| 28 | Knight Moves | chess board, L-shape movement |
| 29 | List Sorter | sort, localeCompare |
| 30 | Markdown Editor | dangerouslySetInnerHTML, markdown parsing |
| 31 | Modal / Dialog | createPortal, focus trap, Escape close |
| 32 | Multi-Select Dropdown | checkbox, click outside |
| 33 | Multi-Select Input | Set dedup, keyboard navigation, pills |
| 34 | Multi-Step Form | config-driven steps, per-step validation |
| 35 | Multiselect Dropdown | string[] selected, checkbox toggle |
| 36 | Paginated Bookmark List | bookmark toggle, client-side pagination |
| 37 | Pagination | typed API response, frontend pagination |
| 38 | Password Generator | Math.random, character sets, clipboard |
| 39 | Pawn Moves | chess board, forward movement |
| 40 | Pin Items | pin/unpin, sort pinned first |
| 41 | Queen Moves | chess board, all directions |
| 42 | Quiz App | score tracking, question navigation |
| 43 | Rock Paper Scissor | Math.random, game logic |
| 44 | Rook Moves | chess board, horizontal/vertical |
| 45 | Search (Debounce + Cache) | debounce, caching, async/await |
| 46 | Selectable Grid | useCallback, rectangular selection math |
| 47 | Stepper | StepConfig, ref callback, offsetWidth calc |
| 48 | Tabs Form | config-driven UI, centralised state |
| 49 | Task Board | ColumnId status, indexOf movement |
| 50 | Temperature Converter | conversion formula, bidirectional input |
| 51 | Tic Tac Toe (2P) | win detection, two-player, draw |
| 52 | Toast | auto-dismiss, notification types |
| 53 | Transfer List | two-panel multi-select, indeterminate checkbox |
| 54 | Typewriter Effect | setInterval, character-by-character |
| 55 | Undo / Redo | history stack, past/present/future |
| 56 | Virtual List | windowed rendering (10K rows), overscan |

### Hard (10)

| # | Component | Key Concepts |
|---|-----------|-------------|
| 1 | Calendar Events | EventsMap Record, date-keyed storage, modal CRUD |
| 2 | Data Table | dynamic headers, Record cast, client-side pagination |
| 3 | File Explorer | recursive types, tree mutation (add/delete) |
| 4 | File & Folder Explorer | recursive FileNode, modal dialog, tree insert/delete |
| 5 | Nested Checkboxes | recursive types, parent-child propagation |
| 6 | Nested Comments | recursive CommentData, recursive tree insertion |
| 7 | OTP Input | useRef array, KeyboardEvent, ClipboardEvent |
| 8 | Product Store | MemoryRouter nested routing, useParams |
| 9 | Sticky Notes | drag state machine, z-index reordering |
| 10 | Tree Navigation | bidirectional checkbox propagation, Set |

### Advanced — React Hooks Deep Dives (9)

| # | Component | Key Concepts |
|---|-----------|-------------|
| 1 | Hook: useState | object spread-merge, array state, functional updater |
| 2 | Hook: useEffect | API fetch + AbortController, debounced search |
| 3 | Hook: useReducer | discriminated union actions, exhaustive switch |
| 4 | Hook: Redux Store | createSlice, configureStore, useSelector/useDispatch |
| 5 | Hook: useMemo | memoized filter + sort (500 items), derived stats |
| 6 | Hook: forwardRef | forwardRef, useImperativeHandle |
| 7 | Hook: useRef | useRef\<HTMLInputElement\>, mutable counter |
| 8 | Hook: useCallback | useCallback(fn, deps), React.memo |
| 9 | Hook: useContext | createContext, Provider, custom hook null guard |

### Games (8)

| # | Component | Key Concepts |
|---|-----------|-------------|
| 1 | 2048 | keyboard events, 2D array, tile merging |
| 2 | Connect Four | 2D array, win detection in 4 directions |
| 3 | Match Pair Game | card matching, shuffle, move counter |
| 4 | Memory Game | card flip, pair matching, CSS 3D transforms |
| 5 | Minesweeper | DFS reveal, adjacency count, win detection |
| 6 | Sudoku | validation, 2D grid, row/column/box check |
| 7 | Tic Tac Toe | AI opponent (random), win detection, setTimeout |
| 8 | Wordle | keyboard events, color feedback, virtual keyboard |

---

## Tech Stack

- React 18+
- TypeScript
- Vite
- React Router DOM
- react-icons / lucide-react
- CSS (no UI library)
