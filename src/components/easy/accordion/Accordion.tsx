/*
  ACCORDION COMPONENT
  --------------------
  Difficulty: Easy
  Concepts: useState, conditional rendering, lifting state up, typing arrays & props

  How it works:
  - Only ONE item can be open at a time (controlled by openIndex in parent)
  - Clicking an already-open item closes it (sets openIndex to null)
  - State lives here (parent), NOT in AccordionItem — this is "lifting state up"
*/

import { useState } from "react";
import { AccordionItem } from "./AccordionItem";

// Type for each accordion data item
type AccordionData = {
  title: string;
  body: string;
};

const data: AccordionData[] = [
  {
    title: "Accordion Item #1",
    body: "This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow.",
  },
  {
    title: "Accordion Item #2",
    body: "This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow.",
  },
  {
    title: "Accordion Item #3",
    body: "This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow.",
  },
];

export function Accordion() {
  // number = an item is open, null = all items are closed
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Ask interviewer:
  // Where will I get data from? - API or dummy data?
  return (
    <div className="w-[600px] mx-auto my-10">
      {data.map((item, index) => {
        return (
          <AccordionItem
            title={item.title}
            body={item.body}
            key={index}
            isOpen={index === openIndex}
            setIsOpen={() => {
              if (index === openIndex) {
                // If we click on the already-open accordion, close it
                setOpenIndex(null);
              } else {
                setOpenIndex(index);
              }
            }}
          />
        );
      })}
    </div>
  );
}
