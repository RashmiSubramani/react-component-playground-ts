/*
  SHARED TYPES FOR TABS FORM
  ----------------------------
  Centralised types used across all tab components.
  This avoids repeating the same types in every file.
*/

import { type ComponentType } from "react";

// ─── Form data shape (centralised state) ─────────────────────────
export type FormData = {
  name: string;
  age: number;
  email: string;
  interests: string[];
  theme: "dark" | "light";   // union type — only these 2 values allowed
};

// ─── Errors: each field is optional, and its value is an error message ──
// Partial<Record<K, V>> = all keys from K are optional, each maps to V
export type FormErrors = Partial<Record<string, string>>;

// ─── Props shared by all tab content components ──────────────────
// Every tab receives the same data, setter, and errors
export type TabContentProps = {
  data: FormData;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: FormErrors;
};

// ─── Tab config shape (for the config-driven tabs array) ─────────
export type TabConfig = {
  name: string;
  component: ComponentType<TabContentProps>; // any React component that accepts TabContentProps
  validate: () => boolean;                   // returns true if tab data is valid
};
