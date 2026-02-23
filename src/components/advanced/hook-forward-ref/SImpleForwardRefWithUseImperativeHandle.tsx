import { useRef, forwardRef, useImperativeHandle } from "react";

const FancyInputWithHandle = forwardRef<
  { focus: () => void },
  { placeholder?: string }
>(({ placeholder = "Type here..." }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Only expose what we want to the parent
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }));

  return <input ref={inputRef} placeholder={placeholder} />;
});

// Parent usage
export function App1() {
  const ref = useRef<{ focus: () => void }>(null);

  return (
    <>
      <FancyInputWithHandle ref={ref} />
      <button onClick={() => ref.current?.focus()}>Focus</button>
    </>
  );
}
