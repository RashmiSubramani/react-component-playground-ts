/*
  TABS FORM (Multi-step Form with Validation)
  ---------------------------------------------
  Difficulty: Medium
  Concepts: config-driven UI, centralised state, per-tab validation,
            ComponentType<Props>, typing validate functions, shared types

  How it works:
  - Tabs are defined in a CONFIG ARRAY — each tab has a name, component, and validate fn
  - ONE centralised state (data) is shared across all tabs via props
  - Navigation (prev/next) only works if current tab's validation passes
  - Clicking a tab header also validates before switching

  Architecture:
  TabsForm (parent) ─── owns: data, errors, activeTab
    ├── Profile     ─── reads/writes: name, age, email
    ├── Interest    ─── reads/writes: interests[]
    └── Settings    ─── reads/writes: theme
*/

import { useState } from "react";
import Interest from "./Interest";
import Profile from "./Profile";
import Settings from "./Settings";
import { type FormData, type FormErrors, type TabConfig } from "./types";
import "./TabsForm.css";

export default function TabsForm() {
  const [activeTab, setActiveTab] = useState(0);

  // Centralised state — all tabs read from and write to this single object
  const [data, setData] = useState<FormData>({
    name: "Rashmi",
    age: 29,
    email: "rashmi@gmail.com",
    interests: ["dance", "music"],
    theme: "dark",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // ─── Config-driven tabs ──────────────────────────────────────
  // Each tab defines its own validation logic.
  // The validate function returns true (valid) or false (has errors).
  const tabs: TabConfig[] = [
    {
      name: "Profile",
      component: Profile,
      validate: () => {
        const err: FormErrors = {};
        if (!data.name || data.name.length < 2) {
          err.name = "Name is not valid";
        }
        if (!data.age || data.age < 2) {
          err.age = "Age is not valid";
        }
        if (!data.email || data.email.length < 2) {
          err.email = "Email is not valid";
        }
        setErrors(err);
        // Valid only if no error keys were set
        return Object.keys(err).length === 0;
      },
    },
    {
      name: "Interests",
      component: Interest,
      validate: () => {
        const err: FormErrors = {};
        if (!data.interests || data.interests.length < 1) {
          err.interests = "Select at least 1 interest";
        }
        setErrors(err);
        return Object.keys(err).length === 0;
      },
    },
    {
      name: "Settings",
      component: Settings,
      validate: () => true, // no validation needed
    },
  ];

  // Resolve the active tab's component — this is a React component type
  const ActiveTabComponent = tabs[activeTab].component;

  function handlePrevClick() {
    if (tabs[activeTab].validate()) {
      setActiveTab((prev) => prev - 1);
    }
  }

  function handleNextClick() {
    if (tabs[activeTab].validate()) {
      setActiveTab((prev) => prev + 1);
    }
  }

  function handleSubmitClick() {
    // Make API call with the full form data
    console.log("Submitting:", data);
  }

  return (
    <div className="overallContainer">
      {/* Tab Headers */}
      <div className="headingContainer">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className="heading"
            // Validate current tab before allowing switch
            onClick={() => tabs[activeTab].validate() && setActiveTab(index)}
          >
            {tab.name}
          </div>
        ))}
      </div>

      {/* Tab Body — renders the active tab's component */}
      <div className="tabBody">
        <ActiveTabComponent data={data} setData={setData} errors={errors} />
      </div>

      {/* Navigation Buttons */}
      <div className="actions">
        <div>
          {activeTab > 0 && (
            <button onClick={handlePrevClick}>Previous</button>
          )}
        </div>
        <div>
          {activeTab === tabs.length - 1 && (
            <button onClick={handleSubmitClick}>Submit</button>
          )}
        </div>
        <div>
          {activeTab !== tabs.length - 1 && (
            <button onClick={handleNextClick}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
}

/*
  ── ALTERNATIVE: Simple Tabs (text-only body) ──────────────────────

  For a simpler version where tabs just show text content:

  type Tab = {
    title: string;
    content: string;
  };

  type TabsProps = {
    tabs: Tab[];
  };

  function Tabs({ tabs }: TabsProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (tabs.length <= 0) return <div>No tabs available</div>;

    return (
      <div className="tabContainer">
        <div>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab ${index === activeIndex ? "activeTab" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              {tab.title || `Tab ${index + 1}`}
            </div>
          ))}
        </div>
        {tabs[activeIndex].content || "No content available"}
      </div>
    );
  }

  // Usage:
  const tabsData: Tab[] = [
    { title: "Tab 1", content: "Content of Tab 1" },
    { title: "Tab 2", content: "Content of Tab 2" },
    { title: "Tab 3", content: "Content of Tab 3" },
  ];
  <Tabs tabs={tabsData} />
*/
