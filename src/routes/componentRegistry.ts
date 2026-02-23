/*
  COMPONENT REGISTRY
  -------------------
  Single source of truth for ALL components in the project.
  When you add a new component, just add an entry here — the sidebar
  navigation and routes are generated automatically from this list.

  This is the ONLY file you need to edit when adding a new component.
*/

import { lazy } from "react";

// ─── Types ───────────────────────────────────────────────────────
export type Difficulty = "easy" | "medium" | "hard" | "advanced";

export type ComponentEntry = {
  name: string;            // display name in sidebar
  path: string;            // URL slug, e.g. "accordion"
  difficulty: Difficulty;
  // lazy-loaded component — each component is only loaded when navigated to
  // React.lazy + dynamic import = code splitting (important for 50+ components)
  component: ReturnType<typeof lazy>;
  concepts: string[];      // TS/React concepts demonstrated
};

// ─── Registry ────────────────────────────────────────────────────
// Add new components here. They'll auto-appear in sidebar + routes.

export const componentRegistry: ComponentEntry[] = [
  // ─── EASY ────────────────────────────────────────────────────
  {
    name: "Accordion",
    path: "accordion",
    difficulty: "easy",
    component: lazy(() =>
      import("../components/easy/accordion/Accordion").then((m) => ({ default: m.Accordion })),
    ),
    concepts: ["useState", "lifting state up", "conditional rendering"],
  },
  {
    name: "Analogue Clock",
    path: "analogue-clock",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/analogue-clock/AnalogueClock"),
    ),
    concepts: [
      "useState<Date>",
      "setInterval + cleanup",
      "trigonometry (sin/cos)",
      "inline computed styles",
    ],
  },
  {
    name: "Auto-Save Form",
    path: "autosave-form",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/autosave-form/AutoSaveForm"),
    ),
    concepts: [
      "typed FormData object",
      "localStorage get/set + JSON",
      "loaded flag pattern",
      "ChangeEvent union (Input | Textarea)",
    ],
  },
  {
    name: "Breadcrumb",
    path: "breadcrumb",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/breadcrumb/BreadcrumbBasic"),
    ),
    concepts: ["typed array of objects", "conditional rendering", "aria-label"],
  },
  {
    name: "Cards Carousel",
    path: "cards-carousel",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/cards-carousel/CardsCarousel"),
    ),
    concepts: [
      "typed Card object",
      "index-based navigation",
      "disabled boundary guards",
    ],
  },
  {
    name: "Chips Input",
    path: "chips-input",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/chips-input/ChipsInput"),
    ),
    concepts: ["KeyboardEvent", "duplicate prevention", "slice/filter"],
  },
  {
    name: "Comments",
    path: "comments",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/comments/Comments"),
    ),
    concepts: ["recursive type", "recursive component", "optional chaining"],
  },
  {
    name: "Count-Up Timer",
    path: "countup-timer",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/countup-timer/CountUpTimer"),
    ),
    concepts: [
      "useRef<ReturnType<typeof setInterval>>",
      "conditional interval",
      "padStart",
    ],
  },
  {
    name: "Countdown Timer",
    path: "countdown-timer",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/countdown-timer/CountdownTimer"),
    ),
    concepts: ["TimeLeft | null", "setInterval + cleanup", "Date math"],
  },
  {
    name: "Feed",
    path: "feed",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/feed/Feed")),
    concepts: ["typed Post object", "FormEvent", "toggle like", "immutable map"],
  },
  {
    name: "Grid Lights",
    path: "grid-lights",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/grid-lights/GridLights"),
    ),
    concepts: [
      "useState<Set<number>>",
      "activation order tracking",
      "reverse deactivation (chained setTimeout)",
      "isDeactivating guard",
    ],
  },
  {
    name: "Grid Lights Toggle",
    path: "grid-lights-toggle",
    difficulty: "easy",
    component: lazy(
      () =>
        import(
          "../components/easy/grid-lights-toggle/GridLightsToggle"
        ),
    ),
    concepts: [
      "number[][] 2D grid state",
      "directional offsets for neighbors",
      "boundary checking",
      "toggle 0↔1",
    ],
  },
  {
    name: "Half Star Rating",
    path: "star-rating-half",
    difficulty: "easy",
    component: lazy(
      () =>
        import(
          "../components/easy/star-rating-half/StarRatingHalf"
        ),
    ),
    concepts: [
      "getBoundingClientRect half detection",
      "onMouseMove per-star hover",
      "FaStar / FaStarHalfAlt / FaRegStar",
      "e.currentTarget for reliable bounds",
    ],
  },
  {
    name: "Holy Grail Layout",
    path: "holy-grail-layout",
    difficulty: "easy",
    component: lazy(
      () =>
        import("../components/easy/holy-grail-layout/HolyGrailLayout"),
    ),
    concepts: [
      "CSS Grid shorthand",
      "grid-column spanning",
      "responsive media query",
      "pure layout (no state/props)",
    ],
  },
  {
    name: "Image Carousel",
    path: "image-carousel",
    difficulty: "easy",
    component: lazy(
      () =>
        import("../components/easy/image-carousel/ImageCarousel"),
    ),
    concepts: [
      "typed CarouselImage object",
      "circular index wrapping",
      "dot indicators",
      "direct index navigation",
    ],
  },
  {
    name: "Image Gallery",
    path: "image-gallery",
    difficulty: "easy",
    component: lazy(
      () =>
        import("../components/easy/image-gallery/ImageGallery"),
    ),
    concepts: [
      "string[] image list",
      "string | null selected image",
      "filter-by-index delete",
      "modal with stopPropagation",
    ],
  },
  {
    name: "Image Slider",
    path: "image-slider",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/image-slider/ImageSlider"),
    ),
    concepts: [
      "setInterval + cleanup",
      "circular index",
      "union literal direction",
    ],
  },
  {
    name: "Progress Bar",
    path: "progress-bar",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/progress-bar/ProgressBar"),
    ),
    concepts: ["useState", "useEffect", "inline styles", "ARIA accessibility"],
  },
  {
    name: "Slider",
    path: "slider",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/slider/Slider"),
    ),
    concepts: [
      "typed optional props with defaults",
      "ChangeEvent<HTMLInputElement>",
      "range input",
    ],
  },
  {
    name: "Social Share",
    path: "social-share",
    difficulty: "easy",
    component: lazy(
      () =>
        import("../components/easy/social-share/SocialShare"),
    ),
    concepts: [
      "typed ShareUrls record",
      "encodeURIComponent for URLs",
      "window.open share popups",
      "navigator.clipboard API",
    ],
  },
  {
    name: "Sortable List",
    path: "sortable-list",
    difficulty: "easy",
    component: lazy(
      () =>
        import("../components/easy/sortable-list/SortableList"),
    ),
    concepts: [
      "useCallback memoization",
      "localeCompare string sorting",
      "typed SortOrder union",
      "immutable sort (spread + .sort)",
    ],
  },
  {
    name: "Star Rating",
    path: "star-rating",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/star-rating/StarRating"),
    ),
    concepts: [
      "hover preview with onMouseEnter/Leave",
      "FaStar / FaRegStar icon toggle",
      "Array.from star generation",
      "aria-label accessibility",
    ],
  },
  {
    name: "Stopwatch",
    path: "stopwatch",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/stopwatch/Stopwatch"),
    ),
    concepts: [
      "conditional setInterval",
      "useEffect cleanup on isRunning",
      "disabled button guards",
      "padStart MM:SS formatting",
    ],
  },
  {
    name: "Todo List",
    path: "todo-list",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/todo-list/TodoList")),
    concepts: ["useState", "typed arrays", "immutable updates", "filter/map"],
  },
  {
    name: "Todo With Timer",
    path: "todo-with-timer",
    difficulty: "easy",
    component: lazy(
      () =>
        import("../components/easy/todo-with-timer/TodoWithTimer"),
    ),
    concepts: [
      "typed Todo object (isRunning flag)",
      "useRef for stable ID counter",
      "global setInterval tick",
      "padStart time formatting",
    ],
  },
  {
    name: "Tooltip",
    path: "tooltip",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/tooltip/Tooltip"),
    ),
    concepts: [
      "ReactNode children prop",
      "boolean visibility toggle",
      "onFocus/onBlur keyboard a11y",
    ],
  },
  {
    name: "Traffic Lights",
    path: "traffic-lights",
    difficulty: "easy",
    component: lazy(
      () =>
        import("../components/easy/traffic-lights/TrafficLights"),
    ),
    concepts: [
      "LightColor union literal",
      "useRef mounted flag",
      "recursive setTimeout chain",
      "config-driven light sequence",
    ],
  },
  {
    name: "Weather App",
    path: "weather-app",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/weather-app/WeatherApp"),
    ),
    concepts: [
      "typed API response (WeatherData)",
      "async/await + try/catch/finally",
      "catch unknown → instanceof Error",
      "loading/error state pattern",
    ],
  },
  {
    name: "Word Counter",
    path: "word-counter",
    difficulty: "easy",
    component: lazy(
      () =>
        import("../components/easy/word-counter/WordCounter"),
    ),
    concepts: [
      "Record<string, number> frequency map",
      "regex text cleaning",
      "Object.entries + sort",
      "typed [string, number] tuple",
    ],
  },

  // ─── MEDIUM ──────────────────────────────────────────────────
  {
    name: "Accessible Form",
    path: "accessible-form",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/accessible-form/AccessibleForm"),
    ),
    concepts: [
      "typed mixed-value form data",
      "ChangeEvent union (Input | Select | Textarea)",
      "aria-invalid + aria-describedby",
      "regex validation helpers",
    ],
  },
  {
    name: "API Pagination",
    path: "api-pagination",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/api-pagination/ApiPagination"),
    ),
    concepts: [
      "typed API response (Product)",
      "offset pagination (limit + skip)",
      "useEffect dependency array",
      "ProductCard sub-component",
    ],
  },
  {
    name: "Autocomplete",
    path: "autocomplete",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/autocomplete/Autocomplete"),
    ),
    concepts: [
      "debounced API search (300ms)",
      "keyboard nav (Arrow/Enter/Escape)",
      "highlight matched text (regex split)",
      "click-outside close (useRef)",
    ],
  },
  {
    name: "Breadcrumb App",
    path: "breadcrumb-app",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/breadcrumb-app/BreadcrumbApp"),
    ),
    concepts: [
      "MemoryRouter",
      "useLocation",
      "useParams<{ id: string }>",
      "dynamic breadcrumbs from URL",
      "typed API fetch",
    ],
  },
  {
    name: "Calendar",
    path: "calendar",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/calendar/Calendar"),
    ),
    concepts: [
      "useState<Date | null>",
      "Date API methods",
      "isSameDate helper",
      "ReactNode[] grid building",
    ],
  },
  {
    name: "Cinema Hall Booking",
    path: "cinema-hall-booking",
    difficulty: "medium",
    component: lazy(
      () =>
        import(
          "../components/medium/cinema-hall-booking/CinemaHallBooking"
        ),
    ),
    concepts: [
      "typed seat ID (string)",
      "Array.from grid generation",
      "includes-based toggle",
      "spread merge on book",
    ],
  },
  {
    name: "Drag & Drop",
    path: "drag-and-drop",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/drag-and-drop/DragAndDrop"),
    ),
    concepts: [
      "HTML5 drag events",
      "same-list reorder (splice)",
      "cross-list transfer",
      "useCallback with deps",
    ],
  },
  {
    name: "Dropdown",
    path: "dropdown",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/dropdown/Dropdown"),
    ),
    concepts: [
      "useRef<HTMLDivElement>",
      "click-outside detection",
      "keyboard navigation",
      "string | null",
    ],
  },
  {
    name: "Dropdown Multi-Select",
    path: "dropdown-multiselect",
    difficulty: "medium",
    component: lazy(
      () =>
        import("../components/medium/dropdown-multiselect/DropdownMultiSelect"),
    ),
    concepts: [
      "union state (string[] | string | null)",
      "Array.isArray() narrowing",
      "checkbox multi-select",
    ],
  },
  {
    name: "Dynamic Form",
    path: "dynamic-form",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/dynamic-form/DynamicForm"),
    ),
    concepts: [
      "config-driven rendering",
      "FieldType union literal",
      "Record<string, FormValue>",
      "RegExp validation",
      "switch-based renderer",
    ],
  },
  {
    name: "Image Cropper",
    path: "image-cropper",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/image-cropper/ImageCropper"),
    ),
    concepts: [
      "useRef<HTMLCanvasElement>",
      "useRef<HTMLImageElement>",
      "CropArea type",
      "FileReader result narrowing",
      "canvas drawImage + toDataURL",
    ],
  },
  {
    name: "Infinite Scroll",
    path: "infinite-scroll",
    difficulty: "medium",
    component: lazy(
      () =>
        import("../components/medium/infinite-scroll/InfiniteScroll"),
    ),
    concepts: [
      "IntersectionObserver API",
      "useRef<HTMLDivElement> sentinel",
      "paginated fetch (skip/limit)",
      "useCallback stable handler",
    ],
  },
  {
    name: "Kanban Board",
    path: "kanban-board",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/kanban-board/KanbanBoard"),
    ),
    concepts: [
      "Record<ColumnId, Task[]>",
      "HTML5 drag events",
      "inline edit (Enter/blur)",
      "useRef flag for double-fire prevention",
    ],
  },
  {
    name: "Modal / Dialog",
    path: "modal-dialog",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/modal-dialog/ModalDialog"),
    ),
    concepts: [
      "createPortal to document.body",
      "focus trap (Tab/Shift+Tab)",
      "Escape key close",
      "body scroll lock",
    ],
  },
  {
    name: "Multi-Select Input",
    path: "multi-select-input",
    difficulty: "medium",
    component: lazy(
      () =>
        import("../components/medium/multi-select-input/MultiSelectInput"),
    ),
    concepts: [
      "typed API response (User)",
      "useState<Set<string>> dedup",
      "useRef<HTMLInputElement>",
      "keyboard navigation",
      "pill sub-component",
    ],
  },
  {
    name: "Multi-Step Form",
    path: "multi-step-form",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/multi-step-form/MultiStepForm"),
    ),
    concepts: [
      "config-driven steps",
      "step index navigation",
      "per-step validation",
      "Record<string, FormValue>",
      "conditional field renderer",
    ],
  },
  {
    name: "Multiselect Dropdown",
    path: "multiselect-dropdown",
    difficulty: "medium",
    component: lazy(
      () =>
        import(
          "../components/medium/multiselect-dropdown/MultiselectDropdown"
        ),
    ),
    concepts: [
      "string[] selected state",
      "click-outside close (useRef)",
      "checkbox toggle (includes/filter)",
      "submit validation + error state",
    ],
  },
  {
    name: "Paginated Bookmark List",
    path: "paginated-bookmark-list",
    difficulty: "medium",
    component: lazy(
      () =>
        import(
          "../components/medium/paginated-bookmark-list/PaginatedBookmarkList"
        ),
    ),
    concepts: [
      "typed Article object",
      "bookmark toggle (immutable map)",
      "checkbox filter resets page",
      "client-side pagination (slice)",
    ],
  },
  {
    name: "Pagination",
    path: "pagination",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/pagination/Pagination"),
    ),
    concepts: [
      "typed API response",
      "async/await fetch",
      "offset pagination",
      "frontend pagination (alt)",
    ],
  },
  {
    name: "Search (Debounce + Cache)",
    path: "search",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/search/Search")),
    concepts: ["useEffect", "debounce", "caching", "async/await", "cleanup"],
  },
  {
    name: "Selectable Grid",
    path: "selectable-grid",
    difficulty: "medium",
    component: lazy(
      () =>
        import("../components/medium/selectable-grid/SelectableGrid"),
    ),
    concepts: [
      "useCallback with deps",
      "CSS custom properties cast",
      "rectangular selection math",
      "mouse drag event flow",
    ],
  },
  {
    name: "Stepper",
    path: "stepper",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/stepper/Stepper"),
    ),
    concepts: [
      "StepConfig with ComponentType",
      "useRef<(HTMLDivElement | null)[]>",
      "ref callback for DOM array",
      "offsetWidth margin calc",
      "progress bar percentage",
    ],
  },
  {
    name: "Tabs Form",
    path: "tabs-form",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/tabs-form/TabsForm")),
    concepts: [
      "config-driven UI",
      "centralised state",
      "per-tab validation",
      "ComponentType<Props>",
      "shared types",
    ],
  },
  {
    name: "Task Board",
    path: "task-board",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/task-board/TaskBoard"),
    ),
    concepts: [
      "Task type with ColumnId status",
      "indexOf + direction movement",
      "inline edit (blur/Enter save)",
      "filter-based column rendering",
    ],
  },
  {
    name: "Transfer List",
    path: "transfer-list",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/transfer-list/TransferList"),
    ),
    concepts: [
      "two-panel multi-select",
      "Set<number> checked tracking",
      "move selected / move all",
      "indeterminate checkbox state",
    ],
  },
  {
    name: "Undo / Redo",
    path: "undo-redo",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/undo-redo/UndoRedo"),
    ),
    concepts: [
      "history stack (past/present/future)",
      "undo: pop past → push future",
      "redo: pop future → push past",
      "new action clears future",
    ],
  },
  {
    name: "Virtual List",
    path: "virtual-list",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/virtual-list/VirtualList"),
    ),
    concepts: [
      "windowed rendering (10K rows)",
      "scrollTop → visible range calc",
      "absolute positioning per row",
      "overscan for smooth scrolling",
    ],
  },

  // ─── HARD ────────────────────────────────────────────────────
  {
    name: "Calendar Events",
    path: "calendar-events",
    difficulty: "hard",
    component: lazy(
      () =>
        import("../components/hard/calendar-events/CalendarEvents"),
    ),
    concepts: [
      "EventsMap = Record<string, CalendarEvent[]>",
      "date-keyed storage (YYYY-MM-DD)",
      "calendar grid rendering",
      "modal CRUD with validation",
      "delete with key cleanup",
    ],
  },
  {
    name: "Data Table",
    path: "data-table",
    difficulty: "hard",
    component: lazy(
      () => import("../components/hard/data-table/DataTable"),
    ),
    concepts: [
      "typed Row object",
      "dynamic headers via Object.keys()",
      "Record cast for dynamic key access",
      "client-side .slice() pagination",
    ],
  },
  {
    name: "File & Folder Explorer",
    path: "file-folder-explorer",
    difficulty: "hard",
    component: lazy(
      () =>
        import(
          "../components/hard/file-folder-explorer/FileFolderExplorer"
        ),
    ),
    concepts: [
      "recursive FileNode type",
      "Record<number, boolean> collapsed",
      "recursive tree insert/delete",
      "modal dialog pattern",
      "conditional spread for children",
    ],
  },
  {
    name: "File Explorer",
    path: "file-explorer",
    difficulty: "hard",
    component: lazy(
      () => import("../components/hard/file-explorer/FileExplorer"),
    ),
    concepts: [
      "recursive types",
      "tree mutation (add/delete)",
      "Record<string, boolean>",
      "string | number union ID",
      "form events",
    ],
  },
  {
    name: "Nested Checkboxes",
    path: "nested-checkboxes",
    difficulty: "hard",
    component: lazy(
      () =>
        import("../components/hard/nested-checkboxes/NestedCheckBoxes"),
    ),
    concepts: [
      "recursive types",
      "Record<number, boolean>",
      "recursive components",
      "parent↔child propagation",
    ],
  },
  {
    name: "Nested Comments",
    path: "nested-comments",
    difficulty: "hard",
    component: lazy(
      () =>
        import("../components/hard/nested-comments/NestedComments"),
    ),
    concepts: [
      "recursive CommentData type",
      "recursive tree insertion",
      "module-level id counter",
      "onReply callback prop",
    ],
  },
  {
    name: "OTP Input",
    path: "otp-input",
    difficulty: "hard",
    component: lazy(
      () => import("../components/hard/otp-input/OtpInput"),
    ),
    concepts: [
      "useRef<HTMLInputElement[]>",
      "KeyboardEvent",
      "ClipboardEvent",
      "programmatic focus",
    ],
  },
  {
    name: "Product Store",
    path: "product-store",
    difficulty: "hard",
    component: lazy(
      () => import("../components/hard/product-store/ProductStore"),
    ),
    concepts: [
      "MemoryRouter nested routing",
      "useParams<{ productId: string }>",
      "typed Product API response",
      "loading/error state pattern",
      "multi-page layout",
    ],
  },
  {
    name: "Sticky Notes",
    path: "sticky-notes",
    difficulty: "hard",
    component: lazy(
      () => import("../components/hard/sticky-notes/StickyNotes"),
    ),
    concepts: [
      "Note type with Point sub-type",
      "drag state machine (down/move/up)",
      "z-index reordering via array position",
      "Set<string> grid collision avoidance",
      "container clamping",
      "stopPropagation isolation",
    ],
  },
  {
    name: "Tree Navigation",
    path: "tree-navigation",
    difficulty: "hard",
    component: lazy(
      () =>
        import("../components/hard/tree-navigation/TreeNavigation"),
    ),
    concepts: [
      "recursive TreeNodeData type",
      "bidirectional checkbox propagation",
      "Set<string> for selection + expansion",
      "findParent upward traversal",
      "folder | file discriminant",
    ],
  },

  // ─── ADVANCED TOPICS (React Hooks Deep Dives) ──────────────────
  {
    name: "Hook: forwardRef",
    path: "hook-forward-ref",
    difficulty: "advanced",
    component: lazy(
      () =>
        import(
          "../components/advanced/hook-forward-ref/HookForwardRef"
        ),
    ),
    concepts: [
      "forwardRef<Handle, Props>",
      "useImperativeHandle",
      "typed handle interface",
      "parent imperative control",
    ],
  },
  {
    name: "Hook: Redux Store",
    path: "hook-redux-store",
    difficulty: "advanced",
    component: lazy(
      () =>
        import(
          "../components/advanced/hook-redux-store/HookReduxStore"
        ),
    ),
    concepts: [
      "createSlice + PayloadAction<T>",
      "configureStore + typed hooks",
      "useSelector / useDispatch",
      "Immer immutable updates",
    ],
  },
  {
    name: "Hook: useCallback",
    path: "hook-use-callback",
    difficulty: "advanced",
    component: lazy(
      () =>
        import(
          "../components/advanced/hook-use-callback/HookUseCallback"
        ),
    ),
    concepts: [
      "useCallback(fn, deps)",
      "React.memo(Component)",
      "stable vs unstable ref proof",
      "render counter comparison",
    ],
  },
  {
    name: "Hook: useContext",
    path: "hook-use-context",
    difficulty: "advanced",
    component: lazy(
      () =>
        import(
          "../components/advanced/hook-use-context/HookUseContext"
        ),
    ),
    concepts: [
      "createContext<Type | null>(null)",
      "Provider + useContext",
      "custom hook null guard",
      "context with updater function",
    ],
  },
  {
    name: "Hook: useEffect",
    path: "hook-use-effect",
    difficulty: "advanced",
    component: lazy(
      () =>
        import(
          "../components/advanced/hook-use-effect/HookUseEffect"
        ),
    ),
    concepts: [
      "API fetch + AbortController cleanup",
      "debounced search (setTimeout + clear)",
      "multiple independent effects",
      "dependency array patterns",
    ],
  },
  {
    name: "Hook: useMemo",
    path: "hook-use-memo",
    difficulty: "advanced",
    component: lazy(
      () =>
        import(
          "../components/advanced/hook-use-memo/HookUseMemo"
        ),
    ),
    concepts: [
      "memoized filter + sort (500 items)",
      "memoized derived stats",
      "unrelated counter proof",
      "dependency array correctness",
    ],
  },
  {
    name: "Hook: useReducer",
    path: "hook-use-reducer",
    difficulty: "advanced",
    component: lazy(
      () =>
        import(
          "../components/advanced/hook-use-reducer/HookUseReducer"
        ),
    ),
    concepts: [
      "discriminated union actions",
      "typed reducer + exhaustive switch",
      "lazy initializer (3rd arg)",
      "complex state transitions",
    ],
  },
  {
    name: "Hook: useRef",
    path: "hook-use-ref",
    difficulty: "advanced",
    component: lazy(
      () =>
        import(
          "../components/advanced/hook-use-ref/HookUseRef"
        ),
    ),
    concepts: [
      "useRef<HTMLInputElement>(null)",
      "useRef<number> mutable counter",
      "ref.current?.focus()",
      "auto-focus on mount",
    ],
  },
  {
    name: "Hook: useState",
    path: "hook-use-state",
    difficulty: "advanced",
    component: lazy(
      () =>
        import(
          "../components/advanced/hook-use-state/HookUseState"
        ),
    ),
    concepts: [
      "useState<object> spread-merge",
      "useState<string[]> array state",
      "functional updater (prev =>)",
      "lazy initializer (() => fn())",
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────

// Group components by difficulty for sidebar rendering
export function getComponentsByDifficulty(): Record<Difficulty, ComponentEntry[]> {
  return {
    easy: componentRegistry.filter((c) => c.difficulty === "easy"),
    medium: componentRegistry.filter((c) => c.difficulty === "medium"),
    hard: componentRegistry.filter((c) => c.difficulty === "hard"),
    advanced: componentRegistry.filter((c) => c.difficulty === "advanced"),
  };
}
