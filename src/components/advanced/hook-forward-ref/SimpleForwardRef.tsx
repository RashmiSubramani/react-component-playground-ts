import { useRef, forwardRef } from "react";

const FancyInputWithoutHandle = forwardRef<
  HTMLInputElement,
  { placeholder?: string }
>(({ placeholder = "Type here..." }, ref) => {
  return <input ref={ref} placeholder={placeholder} />;
});

// Parent usage
export function App2() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <FancyInputWithoutHandle ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
    </>
  );
}
