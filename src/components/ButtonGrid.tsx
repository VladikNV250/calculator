"use client"
import clsx from 'clsx';
import React, { useRef } from 'react'
import { Keys, Operations } from './CalculatorComponent';
import { Theme, ThemeClass } from '@/app/assets/Themes';

interface PropsButton {
  onClick: () => void;
  children?: React.ReactNode,
  themeClass?: ThemeClass,
  validKey?: Keys,
  pressedKey?: Keys | null,
}

interface PropsButtonGrid {
  theme?: Theme,
  pressedKey: Keys | null,
  performOperation: (operation: Operations, input?: string) => void,
}

export default function ButtonGrid({theme, pressedKey, performOperation}: PropsButtonGrid) {
  return (
    <div className={theme?.['grid-buttons'].class}>
      <Button themeClass={theme?.AC}      onClick={() => performOperation("clear")}     validKey={'Backspace' || "Delete"}  pressedKey={pressedKey}> {/* AC */}
        <p>AC</p>
      </Button>
      <Button themeClass={theme?.["+/-"]} onClick={() => performOperation("change-sign")}> {/* +/- */}
        <p>&#43;/&minus;</p>
      </Button>
      <Button themeClass={theme?.["%"]}   onClick={() => performOperation("to-percent")}> {/* % */}
        <p>&#37;</p>
      </Button>
      <Button themeClass={theme?.['/']}   onClick={() => performOperation("input", "/")} validKey="/" pressedKey={pressedKey}> {/* / */}
        <p>&divide;</p>
      </Button>
      <Button themeClass={theme?.[7]}     onClick={() => performOperation("input", "7")} validKey="7" pressedKey={pressedKey}> {/* 7 */}
        <p>7</p>
      </Button>
      <Button themeClass={theme?.[8]}     onClick={() => performOperation("input", "8")} validKey="8" pressedKey={pressedKey}> {/* 8 */}
        <p>8</p>
      </Button>
      <Button themeClass={theme?.[9]}     onClick={() => performOperation("input", "9")} validKey="9" pressedKey={pressedKey}> {/* 9 */}
        <p>9</p>
      </Button>
      <Button themeClass={theme?.['*']}   onClick={() => performOperation("input", "*")} validKey="*" pressedKey={pressedKey}> {/* * */}
        <p>&times;</p>
      </Button>
      <Button themeClass={theme?.[4]}     onClick={() => performOperation("input", "4")} validKey="4" pressedKey={pressedKey}> {/* 4 */}
        <p>4</p>
      </Button>
      <Button themeClass={theme?.[5]}     onClick={() => performOperation("input", "5")} validKey="5" pressedKey={pressedKey}> {/* 5 */}
        <p>5</p>
      </Button>
      <Button themeClass={theme?.[6]}     onClick={() => performOperation("input", "6")} validKey="6" pressedKey={pressedKey}> {/* 6 */}
        <p>6</p>
      </Button>
      <Button themeClass={theme?.['-']}   onClick={() => performOperation("input", "-")} validKey="-" pressedKey={pressedKey}> {/* - */}
        <p>&minus;</p>
      </Button>
      <Button themeClass={theme?.[1]}     onClick={() => performOperation("input", "1")} validKey="1" pressedKey={pressedKey}> {/* 1 */}
        <p>1</p>
      </Button>
      <Button themeClass={theme?.[2]}     onClick={() => performOperation("input", "2")} validKey="2" pressedKey={pressedKey}> {/* 2 */}
        <p>2</p>
      </Button>
      <Button themeClass={theme?.[3]}     onClick={() => performOperation("input", "3")} validKey="3" pressedKey={pressedKey}> {/* 3 */}
        <p>3</p>
      </Button>
      <Button themeClass={theme?.['+']}   onClick={() => performOperation("input", "+")} validKey="+" pressedKey={pressedKey}> {/* + */}
        <p>&#43;</p>
      </Button>
      <Button themeClass={theme?.[0]}     onClick={() => performOperation("input", "0")} validKey="0" pressedKey={pressedKey}> {/* 0 */}
        <p>0</p>
      </Button>
      <Button themeClass={theme?.["."]}   onClick={() => performOperation("input", ".")} validKey="." pressedKey={pressedKey}> {/* . */}
        <p>.</p>
      </Button>
      <Button themeClass={theme?.['=']}   onClick={() => performOperation("calculate")}  validKey="Enter" pressedKey={pressedKey}> {/* = */}
        <p>=</p>
      </Button>
    </div>
  )
}

function Button({onClick, children, themeClass = {class: "", pressed: ""}, validKey, pressedKey}: PropsButton) {
  const buttonRef = useRef(null);

  function handleClick(): void {
    if (buttonRef.current) (buttonRef.current as HTMLElement).blur();
    onClick();
  }

  return (
    <button
      ref={buttonRef}
      className={clsx(themeClass.class, pressedKey === validKey && themeClass.pressed)}
      onClick={handleClick}
    >
        {children}
    </button>
  )
}
