/*
  COMPONENT REGISTRY
  -------------------
  Single source of truth for ALL components in the project.
  When you add a new component, just add an entry here — the sidebar
  navigation and routes are generated automatically from this list.

  This is the ONLY file you need to edit when adding a new component.

  NAMING CONVENTION:
  Related components are prefixed with a group name for easy discovery.
  Format: "Group - Component"  (e.g. "Form - Dynamic", "Dropdown - Basic")
  Standalone components keep their plain name (e.g. "Accordion", "Feed").
*/

import { lazy } from "react";

// ─── Types ───────────────────────────────────────────────────────
export type Difficulty = "easy" | "medium" | "hard" | "advanced" | "games";

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
    name: "Breadcrumb - Basic",
    path: "breadcrumb",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/breadcrumb-basic/BreadcrumbBasic"),
    ),
    concepts: ["typed array of objects", "conditional rendering", "aria-label"],
  },
  {
    name: "Carousel - Cards",
    path: "cards-carousel",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/carousel-cards/CardsCarousel"),
    ),
    concepts: [
      "typed Card object",
      "index-based navigation",
      "disabled boundary guards",
    ],
  },
  {
    name: "Carousel - Image",
    path: "image-carousel",
    difficulty: "easy",
    component: lazy(
      () =>
        import("../components/easy/carousel-image/ImageCarousel"),
    ),
    concepts: [
      "typed CarouselImage object",
      "circular index wrapping",
      "dot indicators",
      "direct index navigation",
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
    name: "Comments - Basic",
    path: "comments",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/comments-basic/Comments"),
    ),
    concepts: ["recursive type", "recursive component", "optional chaining"],
  },
  {
    name: "Feed",
    path: "feed",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/feed/Feed")),
    concepts: ["typed Post object", "FormEvent", "toggle like", "immutable map"],
  },
  {
    name: "Form - Auto-Save",
    path: "autosave-form",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/form-auto-save/AutoSaveForm"),
    ),
    concepts: [
      "typed FormData object",
      "localStorage get/set + JSON",
      "loaded flag pattern",
      "ChangeEvent union (Input | Textarea)",
    ],
  },
  {
    name: "Grid - Lights",
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
    name: "Grid - Lights Toggle",
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
    name: "Image - Gallery",
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
    name: "Image - Slider",
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
    name: "Rating - Half Star",
    path: "star-rating-half",
    difficulty: "easy",
    component: lazy(
      () =>
        import(
          "../components/easy/rating-half-star/StarRatingHalf"
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
    name: "Rating - Star",
    path: "star-rating",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/rating-star/StarRating"),
    ),
    concepts: [
      "hover preview with onMouseEnter/Leave",
      "FaStar / FaRegStar icon toggle",
      "Array.from star generation",
      "aria-label accessibility",
    ],
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
    name: "Timer - Count-Up",
    path: "countup-timer",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/timer-count-up/CountUpTimer"),
    ),
    concepts: [
      "useRef<ReturnType<typeof setInterval>>",
      "conditional interval",
      "padStart",
    ],
  },
  {
    name: "Timer - Countdown",
    path: "countdown-timer",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/timer-countdown/CountdownTimer"),
    ),
    concepts: ["TimeLeft | null", "setInterval + cleanup", "Date math"],
  },
  {
    name: "Timer - Stopwatch",
    path: "stopwatch",
    difficulty: "easy",
    component: lazy(
      () => import("../components/easy/timer-stopwatch/Stopwatch"),
    ),
    concepts: [
      "conditional setInterval",
      "useEffect cleanup on isRunning",
      "disabled button guards",
      "padStart MM:SS formatting",
    ],
  },
  {
    name: "Todo - List",
    path: "todo-list",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/todo-list/TodoList")),
    concepts: ["useState", "typed arrays", "immutable updates", "filter/map"],
  },
  {
    name: "Todo - With Timer",
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

  // ─── EASY (from memes) ──────────────────────────────────────
  {
    name: "Array to Zig Zag",
    path: "array-to-zig-zag",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/array-to-zig-zag/ArrayToZigZag.jsx")),
    concepts: ["useState", "array manipulation", "zig-zag pattern"],
  },
  {
    name: "Asterisk Field Validation",
    path: "asterisk-field-validation",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/asterisk-field-validation/AsteriskFieldValidation.jsx")),
    concepts: ["useState", "form validation", "required fields"],
  },
  {
    name: "Authentication",
    path: "authentication",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/authentication/index.jsx")),
    concepts: ["useContext", "UserProvider", "login/logout"],
  },
  {
    name: "Autosave Input (LocalStorage)",
    path: "autosave-input-localstorage",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/autosave-input-localstorage/index.jsx")),
    concepts: ["useState", "useEffect", "localStorage"],
  },
  {
    name: "Back to Top",
    path: "back-to-top",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/back-to-top/index.jsx")),
    concepts: ["useState", "useEffect", "scroll event", "window.scrollTo"],
  },
  {
    name: "Blog Posts",
    path: "blog-posts",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/blog-posts/BlogPosts.jsx")),
    concepts: ["useState", "useEffect", "fetch API", "card layout"],
  },
  {
    name: "Calculate Age",
    path: "calculate-age",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/calculate-age/CalculateAge.jsx")),
    concepts: ["useState", "Date API", "age calculation"],
  },
  {
    name: "Character Count",
    path: "character-count",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/character-count/index.jsx")),
    concepts: ["useState", "string length", "controlled input"],
  },
  {
    name: "Chat - Normal",
    path: "chat-normal",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/chat-normal/index.jsx")),
    concepts: ["useState", "onKeyDown", "chat UI"],
  },
  {
    name: "Color Explorer",
    path: "color-explorer",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/color-explorer/ColorExplorer.jsx")),
    concepts: ["useState", "filter", "color data", "search"],
  },
  {
    name: "Confirmation Modal",
    path: "confirmation-modal",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/confirmation-modal/ConfirmationModal.jsx")),
    concepts: ["useState", "modal", "confirm/cancel"],
  },
  {
    name: "Contact Form",
    path: "contact-form",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/contact-form/ContactForm.jsx")),
    concepts: ["useState", "form handling", "validation"],
  },
  {
    name: "Copy to Clipboard",
    path: "copy-to-clipboard",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/copy-to-clipboard/CopyToClipboard.jsx")),
    concepts: ["navigator.clipboard", "useState", "async/await"],
  },
  {
    name: "Counter",
    path: "counter",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/counter/Counter.jsx")),
    concepts: ["useState", "increment/decrement/reset"],
  },
  {
    name: "Dark Mode Toggle",
    path: "dark-mode-toggle",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/dark-mode-toggle/DarkMode.jsx")),
    concepts: ["useState", "CSS variables", "theme toggle"],
  },
  {
    name: "Dynamic Greeting",
    path: "dynamic-greeting",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/dynamic-greeting/DynamicGreeting.jsx")),
    concepts: ["useState", "Date API", "time-based rendering"],
  },
  {
    name: "Even or Odd",
    path: "even-or-odd",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/even-or-odd/EvenOrOdd.jsx")),
    concepts: ["useState", "modulo operator", "conditional rendering"],
  },
  {
    name: "Focus Input",
    path: "focus-input",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/focus-input/FocusInput.jsx")),
    concepts: ["useRef", "focus", "programmatic DOM access"],
  },
  {
    name: "Frequently Asked Questions",
    path: "frequently-asked-questions",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/frequently-asked-questions/FrequentlyAskedQuestions.jsx")),
    concepts: ["useState", "toggle", "accordion pattern"],
  },
  {
    name: "Get Weekday",
    path: "get-weekday",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/get-weekday/GetWeekday.jsx")),
    concepts: ["useState", "Date API", "getDay"],
  },
  {
    name: "Guess the Number",
    path: "guess-the-number",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/guess-the-number/GuessTheNumber.jsx")),
    concepts: ["useState", "Math.random", "comparison logic"],
  },
  {
    name: "Image Slider - Transition",
    path: "image-slider-transition",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/image-slider-transition/ImageSliderWithTransition.jsx")),
    concepts: ["useEffect", "useState", "CSS keyframes", "direction state"],
  },
  {
    name: "Leap Year",
    path: "leap-year",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/leap-year/LeapYear.jsx")),
    concepts: ["useState", "leap year logic", "conditional rendering"],
  },
  {
    name: "Mortgage Calculator",
    path: "mortgage-calculator",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/mortgage-calculator/MortgageCalculator.jsx")),
    concepts: ["useState", "math formula", "controlled inputs"],
  },
  {
    name: "Navbar",
    path: "navbar",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/navbar/index.jsx")),
    concepts: ["MemoryRouter", "NavLink", "Routes", "active styling"],
  },
  {
    name: "Pagination - FE",
    path: "pagination-fe",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/pagination-fe/FEPagination.jsx")),
    concepts: ["useState", "client-side pagination", "slice"],
  },
  {
    name: "Password Strength",
    path: "password-strength",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/password-strength/PasswordStrength.jsx")),
    concepts: ["useState", "regex validation", "strength meter"],
  },
  {
    name: "Push Notification",
    path: "push-notification",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/push-notification/index.jsx")),
    concepts: ["useEffect", "Notification API", "toast", "auto-dismiss"],
  },
  {
    name: "Read More",
    path: "read-more",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/read-more/ReadMore.jsx")),
    concepts: ["useState", "string slice", "toggle"],
  },
  {
    name: "Recipe Filter App",
    path: "recipe-filter-app",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/recipe-filter-app/RecipeFilterApp.jsx")),
    concepts: ["useState", "filter", "search", "category filter"],
  },
  {
    name: "Sidebar",
    path: "sidebar",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/sidebar/Sidebar.jsx")),
    concepts: ["useState", "toggle", "CSS transition"],
  },
  {
    name: "Tab Switcher",
    path: "tab-switcher",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/tab-switcher/TabSwitcher.jsx")),
    concepts: ["useState", "tab navigation", "conditional rendering"],
  },
  {
    name: "Toggle Button (Custom Hook)",
    path: "toggle-button-custom-hook",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/toggle-button-with-custom-hook/ToggleButtonWithCustomHook.jsx")),
    concepts: ["custom hook", "useState", "reusable logic"],
  },
  {
    name: "Toggle Password",
    path: "toggle-password",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/toggle-password/TogglePassword.jsx")),
    concepts: ["useState", "input type toggle", "visibility"],
  },
  {
    name: "UsePrevious Hook Counter",
    path: "useprevious-hook-counter",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/useprevioushook-counter/UsePreviousHookCounter.jsx")),
    concepts: ["useRef", "custom hook", "previous value tracking"],
  },
  {
    name: "User Profile",
    path: "user-profile",
    difficulty: "easy",
    component: lazy(() => import("../components/easy/user-profile/UserProfile.jsx")),
    concepts: ["useState", "useEffect", "fetch API", "profile card"],
  },

  // ─── MEDIUM ──────────────────────────────────────────────────
  {
    name: "Board - Kanban",
    path: "kanban-board",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/board-kanban/KanbanBoard"),
    ),
    concepts: [
      "Record<ColumnId, Task[]>",
      "HTML5 drag events",
      "inline edit (Enter/blur)",
      "useRef flag for double-fire prevention",
    ],
  },
  {
    name: "Board - Task",
    path: "task-board",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/board-task/TaskBoard"),
    ),
    concepts: [
      "Task type with ColumnId status",
      "indexOf + direction movement",
      "inline edit (blur/Enter save)",
      "filter-based column rendering",
    ],
  },
  {
    name: "Breadcrumb - App",
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
    name: "Calendar - Basic",
    path: "calendar",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/calendar-basic/Calendar"),
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
    name: "Dropdown - Basic",
    path: "dropdown",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/dropdown-basic/Dropdown"),
    ),
    concepts: [
      "useRef<HTMLDivElement>",
      "click-outside detection",
      "keyboard navigation",
      "string | null",
    ],
  },
  {
    name: "Dropdown - Multi-Select",
    path: "dropdown-multiselect",
    difficulty: "medium",
    component: lazy(
      () =>
        import("../components/medium/dropdown-multi-select/DropdownMultiSelect"),
    ),
    concepts: [
      "union state (string[] | string | null)",
      "Array.isArray() narrowing",
      "checkbox multi-select",
    ],
  },
  {
    name: "Dropdown - Multiselect",
    path: "multiselect-dropdown",
    difficulty: "medium",
    component: lazy(
      () =>
        import(
          "../components/medium/dropdown-multiselect/MultiselectDropdown"
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
    name: "Form - Accessible",
    path: "accessible-form",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/form-accessible/AccessibleForm"),
    ),
    concepts: [
      "typed mixed-value form data",
      "ChangeEvent union (Input | Select | Textarea)",
      "aria-invalid + aria-describedby",
      "regex validation helpers",
    ],
  },
  {
    name: "Form - Dynamic",
    path: "dynamic-form",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/form-dynamic/DynamicForm"),
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
    name: "Form - Multi-Step",
    path: "multi-step-form",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/form-multi-step/MultiStepForm"),
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
    name: "Form - Tabs",
    path: "tabs-form",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/form-tabs/TabsForm")),
    concepts: [
      "config-driven UI",
      "centralised state",
      "per-tab validation",
      "ComponentType<Props>",
      "shared types",
    ],
  },
  {
    name: "Grid - Selectable",
    path: "selectable-grid",
    difficulty: "medium",
    component: lazy(
      () =>
        import("../components/medium/grid-selectable/SelectableGrid"),
    ),
    concepts: [
      "useCallback with deps",
      "CSS custom properties cast",
      "rectangular selection math",
      "mouse drag event flow",
    ],
  },
  {
    name: "Image - Cropper",
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
    name: "Pagination - API",
    path: "api-pagination",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/pagination-api/ApiPagination"),
    ),
    concepts: [
      "typed API response (Product)",
      "offset pagination (limit + skip)",
      "useEffect dependency array",
      "ProductCard sub-component",
    ],
  },
  {
    name: "Pagination - Basic",
    path: "pagination",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/pagination-basic/Pagination"),
    ),
    concepts: [
      "typed API response",
      "async/await fetch",
      "offset pagination",
      "frontend pagination (alt)",
    ],
  },
  {
    name: "Pagination - Bookmark List",
    path: "paginated-bookmark-list",
    difficulty: "medium",
    component: lazy(
      () =>
        import(
          "../components/medium/pagination-bookmark-list/PaginatedBookmarkList"
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
    name: "Pagination - Infinite Scroll",
    path: "infinite-scroll",
    difficulty: "medium",
    component: lazy(
      () =>
        import("../components/medium/pagination-infinite-scroll/InfiniteScroll"),
    ),
    concepts: [
      "IntersectionObserver API",
      "useRef<HTMLDivElement> sentinel",
      "paginated fetch (skip/limit)",
      "useCallback stable handler",
    ],
  },
  {
    name: "Search - Autocomplete",
    path: "autocomplete",
    difficulty: "medium",
    component: lazy(
      () => import("../components/medium/search-autocomplete/Autocomplete"),
    ),
    concepts: [
      "debounced API search (300ms)",
      "keyboard nav (Arrow/Enter/Escape)",
      "highlight matched text (regex split)",
      "click-outside close (useRef)",
    ],
  },
  {
    name: "Search - Debounce + Cache",
    path: "search",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/search-debounce-cache/Search")),
    concepts: ["useEffect", "debounce", "caching", "async/await", "cleanup"],
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

  // ─── MEDIUM (from memes) ─────────────────────────────────────
  {
    name: "Billing Counter",
    path: "billing-counter",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/billing-counter/index.jsx")),
    concepts: ["useState", "queue", "counter logic"],
  },
  {
    name: "Bishop Moves",
    path: "bishop-moves",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/bishop-moves/BishopMoves.jsx")),
    concepts: ["useState", "chess board", "diagonal movement"],
  },
  {
    name: "BMI Calculator",
    path: "bmi-calculator",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/bmi-calculator/BMICalculator.jsx")),
    concepts: ["useState", "math formula", "conditional rendering"],
  },
  {
    name: "Calculator",
    path: "calculator",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/calculator/Calculator.jsx")),
    concepts: ["useState", "eval", "button grid", "display"],
  },
  {
    name: "Captcha Generator",
    path: "captcha-generator",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/captcha-generator/CaptchaGenerator.jsx")),
    concepts: ["useState", "random string", "canvas", "validation"],
  },
  {
    name: "Chat - Socket",
    path: "chat-socket",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/chat-socket/index.jsx")),
    concepts: ["Socket.IO", "useRef", "useEffect", "real-time"],
  },
  {
    name: "Color Code Game",
    path: "color-code-game",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/color-code-game/ColorCodeGame.jsx")),
    concepts: ["useState", "random colors", "score tracking"],
  },
  {
    name: "Dice Roller",
    path: "dice-roller",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/dice-roller/DiceRoller.jsx")),
    concepts: ["useState", "Math.random", "animation"],
  },
  {
    name: "Drag & Drop 2",
    path: "drag-and-drop-2",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/drag-and-drop-2/DragAndDrop2.jsx")),
    concepts: ["HTML5 drag API", "reorder", "cross-list transfer"],
  },
  {
    name: "Draw Circles",
    path: "draw-circles",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/draw-circles/DrawCircles.jsx")),
    concepts: ["useState", "onClick coordinates", "undo/redo"],
  },
  {
    name: "Emoji Replacer",
    path: "emoji-replacer",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/emoji-replacer/EmojiReplacer.jsx")),
    concepts: ["useState", "string replace", "emoji mapping"],
  },
  {
    name: "Expense Tracker",
    path: "expense-tracker",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/expense-tracker/ExpenseTracker.jsx")),
    concepts: ["useState", "CRUD", "income/expense", "balance"],
  },
  {
    name: "JSON Formatter & Validator",
    path: "json-formatter",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/json-formatter-and-validator/JSONFormatterAndValidator.jsx")),
    concepts: ["useState", "JSON.parse", "JSON.stringify", "error handling"],
  },
  {
    name: "King Moves",
    path: "king-moves",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/king-moves/KingMoves.jsx")),
    concepts: ["useState", "chess board", "adjacent cells"],
  },
  {
    name: "Knight Moves",
    path: "knight-moves",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/knight-moves/KnightMoves.jsx")),
    concepts: ["useState", "chess board", "L-shape movement"],
  },
  {
    name: "List Sorter",
    path: "list-sorter",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/list-sorter/ListSorter.jsx")),
    concepts: ["useState", "sort", "localeCompare"],
  },
  {
    name: "Markdown Editor",
    path: "markdown-editor",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/markdown-editor/MarkDownEditor.jsx")),
    concepts: ["useState", "dangerouslySetInnerHTML", "markdown parsing"],
  },
  {
    name: "Password Generator",
    path: "password-generator",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/password-generator/PasswordGenerator.jsx")),
    concepts: ["useState", "Math.random", "character sets", "clipboard"],
  },
  {
    name: "Pawn Moves",
    path: "pawn-moves",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/pawn-moves/PawnMoves.jsx")),
    concepts: ["useState", "chess board", "forward movement"],
  },
  {
    name: "Pin Items",
    path: "pin-items",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/pin-items/PinItems.jsx")),
    concepts: ["useState", "pin/unpin", "sort pinned first"],
  },
  {
    name: "Queen Moves",
    path: "queen-moves",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/queen-moves/QueenMoves.jsx")),
    concepts: ["useState", "chess board", "all directions"],
  },
  {
    name: "Quiz App",
    path: "quiz-app",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/quiz-app/QuizApp.jsx")),
    concepts: ["useState", "score tracking", "question navigation"],
  },
  {
    name: "Rock Paper Scissor",
    path: "rock-paper-scissor",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/rock-paper-scissor/RockPaperScissor.jsx")),
    concepts: ["useState", "Math.random", "game logic"],
  },
  {
    name: "Rook Moves",
    path: "rook-moves",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/rook-moves/RookMoves.jsx")),
    concepts: ["useState", "chess board", "horizontal/vertical"],
  },
  {
    name: "Temperature Converter",
    path: "temperature-converter",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/temperature-converter/TemperatureConverter.jsx")),
    concepts: ["useState", "conversion formula", "bidirectional input"],
  },
  {
    name: "Tic Tac Toe (2P)",
    path: "tic-tac-toe-2p",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/tic-tac-toe-2p/TicTacToe.jsx")),
    concepts: ["useState", "win detection", "two-player"],
  },
  {
    name: "Toast",
    path: "toast",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/toast/Toast.jsx")),
    concepts: ["useState", "auto-dismiss", "notification types"],
  },
  {
    name: "Typewriter Effect",
    path: "typewriter-effect",
    difficulty: "medium",
    component: lazy(() => import("../components/medium/typewriter-effect/TypeWrterEffect.jsx")),
    concepts: ["useState", "useEffect", "setInterval", "character-by-character"],
  },

  // ─── HARD ────────────────────────────────────────────────────
  {
    name: "Calendar - Events",
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
    name: "Comments - Nested",
    path: "nested-comments",
    difficulty: "hard",
    component: lazy(
      () =>
        import("../components/hard/comments-nested/NestedComments"),
    ),
    concepts: [
      "recursive CommentData type",
      "recursive tree insertion",
      "module-level id counter",
      "onReply callback prop",
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
    name: "File - Explorer",
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
    name: "File - Folder Explorer",
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

  // ─── GAMES ──────────────────────────────────────────────────
  {
    name: "Game: 2048",
    path: "game-2048",
    difficulty: "games",
    component: lazy(
      () => import("../components/games/game-2048/Game2048"),
    ),
    concepts: ["useState", "useEffect", "keyboard events", "2D array", "game logic"],
  },
  {
    name: "Game: Connect Four",
    path: "connect-four",
    difficulty: "games",
    component: lazy(
      () => import("../components/games/connect-four/ConnectFour"),
    ),
    concepts: ["useState", "2D array", "win detection", "column-drop"],
  },
  {
    name: "Game: Memory",
    path: "memory-game",
    difficulty: "games",
    component: lazy(
      () => import("../components/games/memory-game/MemoryGame"),
    ),
    concepts: ["useState", "useEffect", "card flip", "pair matching", "CSS 3D transforms"],
  },
  {
    name: "Game: Minesweeper",
    path: "minesweeper",
    difficulty: "games",
    component: lazy(
      () => import("../components/games/minesweeper/Minesweeper"),
    ),
    concepts: ["useState", "DFS reveal", "adjacency count", "grid", "win detection"],
  },
  {
    name: "Game: Sudoku",
    path: "sudoku",
    difficulty: "games",
    component: lazy(
      () => import("../components/games/sudoku/Sudoku"),
    ),
    concepts: ["useState", "validation", "2D grid", "row/column/box check"],
  },
  {
    name: "Game: Tic Tac Toe",
    path: "tic-tac-toe",
    difficulty: "games",
    component: lazy(
      () => import("../components/games/tic-tac-toe/TicTacToe"),
    ),
    concepts: ["useState", "useEffect", "AI opponent", "win detection", "setTimeout"],
  },
  {
    name: "Game: Wordle",
    path: "wordle",
    difficulty: "games",
    component: lazy(
      () => import("../components/games/wordle/Wordle"),
    ),
    concepts: ["useState", "useEffect", "keyboard events", "color feedback", "virtual keyboard"],
  },
  {
    name: "Game: Match Pair",
    path: "match-pair-game",
    difficulty: "games",
    component: lazy(
      () => import("../components/games/match-pair-game/MatchPairGame"),
    ),
    concepts: ["useState", "useEffect", "card matching", "shuffle", "move counter"],
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
    games: componentRegistry.filter((c) => c.difficulty === "games"),
  };
}
