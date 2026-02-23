/*
  ACCORDION ITEM COMPONENT
  -------------------------
  Difficulty: Easy
  Concepts: typing props, controlled component pattern, conditional rendering

  Why state lives in the PARENT (Accordion.tsx), not here:
  - If each AccordionItem managed its own isOpen state, multiple items
    could be open at the same time
  - By lifting state up, the parent controls which item is open,
    ensuring only one is open at a time

  The commented-out version below shows the "wrong" approach (independent state)
  kept for learning purposes.
*/

import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// ─── Props type for AccordionItem ────────────────────────────────
type AccordionItemProps = {
  title: string;
  body: string;
  isOpen: boolean;        // controlled by parent — is this item currently open?
  setIsOpen: () => void;  // callback to toggle — parent decides the logic
};

export function AccordionItem({ title, body, isOpen, setIsOpen }: AccordionItemProps) {
  return (
    <div className="border border-black my-2 rounded-lg p-4">
      <div
        className="font-bold p-2 bg-slate-200 flex justify-between cursor-pointer"
        onClick={setIsOpen}
      >
        <span>{title}</span>
        <span>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
      </div>
      {/* Only render body when this item is open */}
      {isOpen && <div className="p-4">{body}</div>}
    </div>
  );
}

/*
  ❌ WRONG APPROACH — Independent state per item (kept for reference)
  -------------------------------------------------------------------
  With this approach, each AccordionItem manages its own open/close state.
  Problem: When you open one item, the others DON'T close automatically.

  import { useState } from "react";

  type AccordionItemProps = {
    title: string;
    body: string;
  };

  export function AccordionItem({ title, body }: AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="border border-black my-2 rounded-lg p-4">
        <div
          className="font-bold p-2 bg-slate-200 flex justify-between cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{title}</span>
          <span>⬇️</span>
        </div>
        {isOpen && <div className="p-4">{body}</div>}
      </div>
    );
  }

  WHY THIS IS WRONG:
  - Each item has its own useState — they don't know about each other
  - Opening Item #2 won't close Item #1
  - Fix: lift the state up to the parent (Accordion.tsx) and pass isOpen + setIsOpen as props
*/
