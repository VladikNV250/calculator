"use client"
import Calculator from '@/app/assets/Calculator';
import { Themes } from '@/app/assets/Themes';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react'

type Operations = "input" | "clear" | "calculate" | "change-sign" | "to-percent" | "restore-history";
type Keys = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "+" | "-" | "*" | "/" | "." | "Backspace" | "Enter" | "Delete";
interface Props {
  themeName: string;
  addRecord: Function;
  restoredRecord: string;
}

export default function CalculatorComponent({themeName, addRecord, restoredRecord}: Props) {
  const [theme, setTheme] = useState(Themes.find(item => item.name === themeName)) 
  const [calculator] = useState<Calculator>(new Calculator());
  const [currentInput, setCurrentInput] = useState(calculator.currentInput);
  const [oldInput, setOldInput] = useState(calculator.oldInput);
  const [pressedKey, setPressedKey] = useState<Keys | null>(null);

  const performOperation = (operation: Operations, value: string = "") => {
    switch (operation) {
      case "input":
        calculator.input(value);
        break;
      case "clear":
        calculator.clear();
        break;
      case "calculate":
        calculator.calculate();
        addRecord(calculator.lastRecord);
        break;
      case "change-sign":
        calculator.changeSign();
        break;
      case "to-percent":
        calculator.toPercent();
        break;
      case "restore-history":
        calculator.restoreHistory(value);
        break;
    }
    setCurrentInput(calculator.currentInput);
    setOldInput(calculator.oldInput);
  }

  const calculateFontSize = (input: string): string => {
    const maxFontSize = 44;
    const minFontSize = 12;
    const maxLength = 4; // max length for max font size
     
    const fontSize = Math.max(minFontSize, maxFontSize - (input.length - maxLength));
    return `${fontSize}px`;
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    // remove focus from buttons
    const focusedElement = document.activeElement as HTMLElement;
    if (focusedElement && typeof focusedElement.blur === "function") 
      focusedElement.blur();

    
    const { key } = event;
    const validKeys: Keys[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", ".", "Backspace", "Enter", "Delete"];
    if (validKeys.includes(key as Keys)) {
      setPressedKey(key as Keys);
      if (key === "Backspace" || key === "Delete") performOperation("clear");
      else if (key === "Enter") performOperation("calculate");
      else performOperation("input", key);
    }
  } 


  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  })

  useEffect(() => {
    if (pressedKey !== null) {
      const timeoutID = setTimeout(() => {
        setPressedKey(null);
      }, 200)
      
      return () => clearTimeout(timeoutID);
    }
  }, [pressedKey]);

  useEffect(() => setTheme(Themes.find(item => item.name === themeName)), [themeName]);
  useEffect(() => performOperation("restore-history", restoredRecord), [restoredRecord])


  return (
    <div className={clsx(theme?.calculator.class)}>
        <div className={clsx(theme?.display.class)}>
          <h2 className={clsx(theme?.['old-input'].class)}>{oldInput}</h2>
          <h1 className={clsx(theme?.['current-input'].class)} style={{fontSize: calculateFontSize(currentInput)}}>{currentInput}</h1>
        </div>
        <div className={clsx(theme?.['grid-buttons'].class)}>
          <button className={clsx(theme?.AC.class, pressedKey === "Backspace" && theme?.AC.pressed)} onClick={() => performOperation("clear")}> {/* AC */}
            <p>AC</p>
          </button> 
          <button className={clsx(theme?.["+/-"].class)} onClick={() => performOperation("change-sign")}> {/* +/- */}
            <p>&#43;/&minus;</p>
          </button>
          <button className={clsx(theme?.["%"].class)} onClick={() => performOperation("to-percent")}> {/* % */}
            <p>&#37;</p>
          </button>
          <button className={clsx(theme?.['/'].class, pressedKey === "/" && theme?.["/"].pressed)} onClick={() => performOperation("input", "/")}> {/* / */}
            <p>&divide;</p>
          </button>
          <button className={clsx(theme?.[7].class, pressedKey === "7" && theme?.[7].pressed)} onClick={() => performOperation("input", "7")}> {/* 7 */}
            <p>7</p>
          </button>
          <button className={clsx(theme?.[8].class, pressedKey === "8" && theme?.[8].pressed)} onClick={() => performOperation("input", "8")}> {/* 8 */}
            <p>8</p>
          </button>
          <button className={clsx(theme?.[9].class, pressedKey === "9" && theme?.[9].pressed)} onClick={() => performOperation("input", "9")}> {/* 9 */}
            <p>9</p>
          </button>
          <button className={clsx(theme?.['*'].class, pressedKey === "*" && theme?.["*"].pressed)} onClick={() => performOperation("input", "*")}> {/* * */}
            <p>&times;</p>
          </button>
          <button className={clsx(theme?.[4].class, pressedKey === "4" && theme?.[4].pressed)} onClick={() => performOperation("input", "4")}> {/* 4 */}
            <p>4</p>
          </button>
          <button className={clsx(theme?.[5].class, pressedKey === "5" && theme?.[5].pressed)} onClick={() => performOperation("input", "5")}> {/* 5 */}
            <p>5</p>
          </button>
          <button className={clsx(theme?.[6].class, pressedKey === "6" && theme?.[6].pressed)} onClick={() => performOperation("input", "6")}> {/* 6 */}
            <p>6</p>
          </button>
          <button className={clsx(theme?.['-'].class, pressedKey === "-" && theme?.["-"].pressed)} onClick={() => performOperation("input", "-")}> {/* - */}
            <p>&minus;</p>
          </button>
          <button className={clsx(theme?.[1].class, pressedKey === "1" && theme?.[1].pressed)} onClick={() => performOperation("input", "1")}> {/* 1 */}
            <p>1</p>
          </button>
          <button className={clsx(theme?.[2].class, pressedKey === "2" && theme?.[2].pressed)} onClick={() => performOperation("input", "2")}> {/* 2 */}
            <p>2</p>
          </button>
          <button className={clsx(theme?.[3].class, pressedKey === "3" && theme?.[3].pressed)} onClick={() => performOperation("input", "3")}> {/* 3 */}
            <p>3</p>
          </button>
          <button className={clsx(theme?.['+'].class, pressedKey === "+" && theme?.["+"].pressed)} onClick={() => performOperation("input", "+")}> {/* + */}
            <p>&#43;</p>
          </button>
          <button className={clsx(theme?.[0].class, pressedKey === "0" && theme?.[0].pressed)} onClick={() => performOperation("input", "0")}> {/* 0 */}
            <p>0</p>
          </button>
          <button className={clsx(theme?.["."].class, pressedKey === "." && theme?.["."].pressed)} onClick={() => performOperation("input", ".")}> {/* . */}
            <p>.</p>
          </button>
          <button className={clsx(theme?.['='].class, pressedKey === "Enter" && theme?.["="].pressed)} onClick={() => performOperation("calculate")}> {/* = */}
            <p>=</p>
          </button>
        </div>
    </div>
  )
}
