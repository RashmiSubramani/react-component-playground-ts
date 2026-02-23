# Building Components — React + TypeScript

A collection of **75 self-contained React components** built with TypeScript, organized by difficulty. Each component lives in its own folder with a `.tsx` file and `styles.css`, demonstrating specific frontend patterns commonly tested in live coding interviews.

**Stack:** React 18 · TypeScript · Vite · CSS (no Tailwind) · react-icons

## Quick Start

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` with a sidebar that auto-generates from the component registry.

## Architecture

```
src/
├── routes/componentRegistry.ts   ← single source of truth (sidebar + routes)
├── layouts/RootLayout.tsx        ← sidebar + content layout
├── pages/
│   ├── HomePage.tsx              ← landing page with component grid
│   └── ComponentPage.tsx         ← renders component by URL slug
└── components/
    ├── easy/                     ← 29 components
    ├── medium/                   ← 27 components
    ├── hard/                     ← 10 components
    └── advanced/                 ← 9 components (React hooks deep dives)
```

**Adding a component:** Add one entry in `componentRegistry.ts` — sidebar nav and routes are generated automatically.

---

## Components by Difficulty

### Easy (29)

| Component          | Key Concepts                                                         |
| ------------------ | -------------------------------------------------------------------- |
| Accordion          | useState, lifting state up, conditional rendering                    |
| Todo List          | typed arrays, immutable updates, filter/map                          |
| Progress Bar       | useEffect, inline styles, ARIA accessibility                         |
| Chips Input        | KeyboardEvent, duplicate prevention, slice/filter                    |
| Image Slider       | setInterval + cleanup, circular index                                |
| Comments           | recursive type, recursive component                                  |
| Analogue Clock     | useState\<Date\>, trigonometry (sin/cos), inline computed styles     |
| Breadcrumb         | typed array of objects, conditional rendering, aria-label            |
| Countdown Timer    | TimeLeft \| null, setInterval + cleanup, Date math                   |
| Count-Up Timer     | useRef\<ReturnType\<typeof setInterval\>\>, padStart                 |
| Feed               | typed Post object, FormEvent, toggle like, immutable map             |
| Holy Grail Layout  | CSS Grid, grid-column spanning, responsive media query               |
| Slider             | typed optional props with defaults, ChangeEvent\<HTMLInputElement\>  |
| Tooltip            | ReactNode children prop, onFocus/onBlur keyboard a11y                |
| Weather App        | typed API response, async/await + try/catch/finally                  |
| Auto-Save Form     | typed FormData, localStorage get/set + JSON                          |
| Cards Carousel     | typed Card object, index-based navigation, disabled guards           |
| Grid Lights        | useState\<Set\<number\>\>, reverse deactivation (chained setTimeout) |
| Grid Lights Toggle | number[][] 2D grid, directional offsets, boundary checking           |
| Image Carousel     | circular index wrapping, dot indicators                              |
| Image Gallery      | string \| null selected, modal with stopPropagation                  |
| Social Share       | encodeURIComponent, window.open share popups, clipboard API          |
| Sortable List      | useCallback, localeCompare, typed SortOrder union                    |
| Word Counter       | Record\<string, number\> frequency map, Object.entries + sort        |
| Traffic Lights     | LightColor union, useRef mounted flag, recursive setTimeout          |
| Todo With Timer    | typed Todo (isRunning flag), useRef stable ID, global setInterval    |
| Stopwatch          | conditional setInterval, disabled button guards, padStart MM:SS      |
| Star Rating        | hover preview, FaStar/FaRegStar toggle, Array.from                   |
| Half Star Rating   | getBoundingClientRect half detection, FaStarHalfAlt                  |

### Medium (27)

| Component                 | Key Concepts                                                             |
| ------------------------- | ------------------------------------------------------------------------ |
| Search (Debounce + Cache) | useEffect, debounce, caching, async/await, cleanup                       |
| Tabs Form                 | config-driven UI, centralised state, per-tab validation, ComponentType   |
| Dropdown                  | useRef, click-outside detection, keyboard navigation                     |
| Dropdown Multi-Select     | union state, Array.isArray() narrowing, checkbox multi-select            |
| Accessible Form           | ChangeEvent union, aria-invalid + aria-describedby, regex validation     |
| API Pagination            | typed API response, offset pagination (limit + skip)                     |
| Pagination                | typed API response, frontend pagination (alt)                            |
| Breadcrumb App            | MemoryRouter, useLocation, useParams, dynamic breadcrumbs                |
| Calendar                  | useState\<Date \| null\>, Date API, isSameDate helper                    |
| Dynamic Form              | config-driven rendering, FieldType union, RegExp validation              |
| Multi-Step Form           | config-driven steps, per-step validation, conditional field renderer     |
| Image Cropper             | useRef\<HTMLCanvasElement\>, canvas drawImage + toDataURL                |
| Multi-Select Input        | typed API (User), Set\<string\> dedup, keyboard navigation, pills        |
| Selectable Grid           | useCallback with deps, rectangular selection math, mouse drag            |
| Stepper                   | StepConfig with ComponentType, ref callback, offsetWidth calc            |
| Cinema Hall Booking       | Array.from grid, includes-based toggle, spread merge on book             |
| Drag & Drop               | HTML5 drag events, same-list reorder, cross-list transfer                |
| Task Board                | Task type with ColumnId, indexOf movement, inline edit                   |
| Multiselect Dropdown      | string[] selected, click-outside close, checkbox toggle                  |
| Paginated Bookmark List   | bookmark toggle, checkbox filter resets page, client-side pagination     |
| Kanban Board              | Record\<ColumnId, Task[]\>, HTML5 drag, inline edit                      |
| Infinite Scroll           | IntersectionObserver, sentinel ref, paginated fetch (skip/limit)         |
| Undo / Redo               | history stack (past/present/future), new action clears future            |
| Modal / Dialog            | createPortal, focus trap (Tab/Shift+Tab), Escape close, scroll lock      |
| Virtual List              | windowed rendering (10K rows), scrollTop visible range, overscan         |
| Transfer List             | two-panel multi-select, Set\<number\>, indeterminate checkbox            |
| Autocomplete              | debounced API search, keyboard nav (Arrow/Enter/Escape), highlight match |

### Hard (10)

| Component              | Key Concepts                                                           |
| ---------------------- | ---------------------------------------------------------------------- |
| OTP Input              | useRef\<HTMLInputElement[]\>, KeyboardEvent, ClipboardEvent            |
| Data Table             | dynamic headers via Object.keys(), Record cast, client-side pagination |
| Nested Checkboxes      | recursive types, Record\<number, boolean\>, parent-child propagation   |
| File Explorer          | recursive types, tree mutation (add/delete), form events               |
| File & Folder Explorer | recursive FileNode, modal dialog, recursive tree insert/delete         |
| Nested Comments        | recursive CommentData, recursive tree insertion                        |
| Product Store          | MemoryRouter nested routing, useParams, multi-page layout              |
| Sticky Notes           | drag state machine, z-index reordering, Set\<string\> collision        |
| Tree Navigation        | bidirectional checkbox propagation, Set\<string\>, folder \| file      |
| Calendar Events        | EventsMap Record, date-keyed storage, modal CRUD                       |

### Advanced — React Hooks Deep Dives (9)

| Component         | Key Concepts                                                               |
| ----------------- | -------------------------------------------------------------------------- |
| Hook: useState    | object spread-merge, array state, functional updater, lazy initializer     |
| Hook: useEffect   | API fetch + AbortController, debounced search, multiple effects            |
| Hook: useReducer  | discriminated union actions, exhaustive switch, lazy initializer (3rd arg) |
| Hook: Redux Store | createSlice + PayloadAction\<T\>, configureStore, useSelector/useDispatch  |
| Hook: useMemo     | memoized filter + sort (500 items), memoized derived stats                 |
| Hook: forwardRef  | forwardRef\<Handle, Props\>, useImperativeHandle                           |
| Hook: useRef      | useRef\<HTMLInputElement\>(null), mutable counter, auto-focus              |
| Hook: useCallback | useCallback(fn, deps), React.memo, stable vs unstable ref proof            |
| Hook: useContext  | createContext, Provider + useContext, custom hook with null guard          |

---

## TypeScript Patterns Covered

- **State typing** — `useState<T>`, `useState<T | null>`, `useState<Set<T>>`, `useState<Record<K, V>>`
- **Event handlers** — `ChangeEvent`, `KeyboardEvent`, `ClipboardEvent`, `DragEvent`, `MouseEvent`, `FormEvent`
- **Refs** — `useRef<HTMLElement>`, `useRef<T>(initialValue)`, ref callbacks, `forwardRef`
- **Union types** — literal unions, discriminated unions, `string | null`, type narrowing
- **Generics** — `Record<K, V>`, `PayloadAction<T>`, `ComponentType<Props>`, `ReturnType<typeof fn>`
- **Immutable updates** — spread, filter, map, `Set` operations
- **Recursive types** — tree structures (file explorer, comments, checkboxes)
- **API patterns** — async/await, AbortController, loading/error states, pagination

## Topics Covered

| Topic                        | Components                                                         |
| ---------------------------- | ------------------------------------------------------------------ |
| State management             | useState, useReducer, Redux Toolkit, useContext                    |
| API integration              | Weather App, API Pagination, Infinite Scroll, Autocomplete         |
| Debounce                     | Search, Autocomplete, HookUseEffect                                |
| Forms                        | Accessible Form, Dynamic Form, Multi-Step Form, Tabs Form          |
| Lists (sort/filter/paginate) | Sortable List, Data Table, HookUseMemo, Paginated Bookmark List    |
| Modal / Dialog               | Modal (portal, focus trap, escape, scroll lock)                    |
| Tabs                         | Tabs Form                                                          |
| Dropdown / Select            | Dropdown, Multi-Select, Multiselect Dropdown                       |
| Drag & Drop                  | Drag & Drop, Kanban Board                                          |
| Infinite Scroll              | IntersectionObserver + sentinel                                    |
| Virtual List                 | Windowed rendering, 10K rows                                       |
| Transfer List                | Two-panel multi-select                                             |
| Undo / Redo                  | History stack pattern                                              |
| Tree structures              | File Explorer, Nested Comments, Nested Checkboxes, Tree Navigation |
| Timer / Stopwatch            | Stopwatch, Countdown, Count-Up, Todo With Timer                    |
| Autocomplete / Typeahead     | Debounced API, keyboard nav, highlight matched text                |
| Memoization                  | useMemo, useCallback, React.memo                                   |
| Accessibility                | ARIA attributes, focus trap, keyboard navigation                   |
