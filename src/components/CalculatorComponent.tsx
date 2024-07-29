"use client"
import Calculator from '@/app/assets/Calculator';
import { Themes } from '@/app/assets/Themes';
import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ButtonGrid from './ButtonGrid';

export type Operations = "input" | "clear" | "calculate" | "change-sign" | "to-percent" | "restore-history";
export type Keys = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "+" | "-" | "*" | "/" | "." | "Backspace" | "Enter" | "Delete";
interface Props {
  themeName: string;
  addRecord: Function;
  restoredRecord: string;
}

export default function CalculatorComponent({themeName, addRecord, restoredRecord}: Props) {
  const [calculator] = useState<Calculator>(new Calculator());
  const [currentInput, setCurrentInput] = useState(calculator.currentInput);
  const [oldInput, setOldInput] = useState(calculator.oldInput);
  const [pressedKey, setPressedKey] = useState<Keys | null>(null);
  const theme = useMemo(() => Themes.find(item => item.name === themeName), [themeName]) 

  const performOperation = useCallback((operation: Operations, value: string = "") => {
    switch (operation) {
      case "input":
        calculator.input(value);
        break;
      case "clear":
        calculator.clear();
        break;
      case "calculate":
        calculator.calculate();
        if (calculator.lastRecord !== '')
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
  }, [addRecord, calculator])

  const calculateFontSize = (input: string): string => {
    const maxFontSize = 44;
    const minFontSize = 12;
    const maxLength = 4; // max length for max font size
     
    const fontSize = Math.max(minFontSize, maxFontSize - (input.length - maxLength));
    return `${fontSize}px`;
  }

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    const validKeys: Keys[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", ".", "Backspace", "Enter", "Delete"];
    if (validKeys.includes(key as Keys)) {
      setPressedKey(key as Keys);
      if (key === "Backspace" || key === "Delete") performOperation("clear");
      else if (key === "Enter") performOperation("calculate");
      else performOperation("input", key);
    }
  }, [performOperation]);


  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown])

  useEffect(() => {
    if (pressedKey !== null) {
      const timeoutID = setTimeout(() => {
        setPressedKey(null);  
      }, 200)
      
      return () => clearTimeout(timeoutID);
    }
  }, [pressedKey]);

  const performOperationRef = useRef(performOperation);
  useEffect(() => performOperationRef.current("restore-history", restoredRecord), [restoredRecord]);


  return (
    <div className={clsx(theme?.calculator.class)}>
        <div className={clsx(theme?.display.class)}>
          <h2 className={clsx(theme?.['old-input'].class)}>{oldInput}</h2>
          <h1 className={clsx(theme?.['current-input'].class)} style={{fontSize: calculateFontSize(currentInput)}}>{currentInput}</h1>
        </div>
        <ButtonGrid 
          theme={theme} 
          pressedKey={pressedKey} 
          performOperation={performOperation} 
        />
    </div>
  )
}
