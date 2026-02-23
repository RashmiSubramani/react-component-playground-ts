/*
  OTP INPUT
  ----------
  Difficulty: Easy
  Concepts: useRef with typed array (HTMLInputElement[]), typing event handlers
            (ChangeEvent, KeyboardEvent, ClipboardEvent), isNaN guard,
            controlled inputs, programmatic .focus()

  Steps to build:
  i)    Create UI with input boxes (controlled via useState)
  ii)   handleOnChange — setState with newArr
  iii)  Check if entry is a number (isNaN guard)
  iv)   Allow only 1 digit per box — .slice(-1) keeps only the last typed digit
  v)    Move focus to next input when current is filled
  vi)   Focus first input on mount — useEffect + ref
  vii)  Skip focus-forward if value is empty (space / cleared)
  viii)  Keyboard events — Backspace (clear or move back), ArrowLeft, ArrowRight
  ix)   Paste support — extract digits from clipboard, fill boxes, focus last filled
*/

import { useState, useRef, useEffect } from "react";
import "./styles.css";

const OTP_INPUT_DIGITS = 6;

export default function OtpInput() {
  const [inputArr, setInputArr] = useState<string[]>(
    new Array(OTP_INPUT_DIGITS).fill(""),
  );

  // Typed ref array — each slot holds an HTMLInputElement or null
  const inputRefArr = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefArr.current[0]?.focus(); // focus first input box on mount
  }, []);

  function handleOnChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    if (isNaN(Number(e.target.value))) return; // reject non-numeric input

    const newValue = e.target.value.trim();
    const newArr = [...inputArr];
    newArr[index] = newValue.slice(-1); // keep only last digit typed
    setInputArr(newArr);

    // Only move to next box if current has a value (don't advance on empty/space)
    newValue && inputRefArr.current[index + 1]?.focus();
  }

  function handleOnKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    const target = e.target as HTMLInputElement;

    // BACKSPACE with a value → clear current digit, stay in same box
    if (target.value && e.key === "Backspace") {
      const newArr = [...inputArr];
      newArr[index] = "";
      setInputArr(newArr);
      return;
    }

    // BACKSPACE on empty box → jump to previous box
    if (!target.value && e.key === "Backspace") {
      inputRefArr.current[index - 1]?.focus();
    }

    // Arrow navigation
    if (e.key === "ArrowLeft") {
      inputRefArr.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight") {
      inputRefArr.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLDivElement>) {
    e.preventDefault(); // stop browser default paste

    const pastedText = e.clipboardData.getData("text"); // e.g. "1234", "A123", "OTP:1234"
    const digits = pastedText.replace(/\D/g, "").slice(0, OTP_INPUT_DIGITS); // keep only digits, cap to length

    if (!digits) return;

    const newArr = new Array(OTP_INPUT_DIGITS).fill("");

    for (let i = 0; i < digits.length; i++) {
      newArr[i] = digits[i];

      // Immediate DOM update (important for some test environments)
      const el = inputRefArr.current[i];
      if (el) {
        el.value = digits[i];
      }
    }

    setInputArr(newArr);

    // Focus last filled input (or the final box if paste fills all)
    inputRefArr.current[
      Math.min(digits.length, OTP_INPUT_DIGITS - 1)
    ]?.focus();
  }

  return (
    <div onPaste={handlePaste}>
      {inputArr.map((_arr, index) => (
        <input
          key={index}
          type="text"
          className="otp-input"
          value={inputArr[index]}
          ref={(input) => {
            inputRefArr.current[index] = input;
          }}
          onChange={(e) => handleOnChange(e, index)}
          onKeyDown={(e) => handleOnKeyDown(e, index)}
        />
      ))}
    </div>
  );
}
