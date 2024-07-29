"use client"
import CalculatorComponent from "@/components/CalculatorComponent";
import Sidemenu from "@/components/Sidemenu";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { Themes } from "./assets/Themes";

export default function Home() {
  const [theme, setTheme] = useState<string>("Standard Red");
  const [history, setHistory] = useState<string[]>([]);
  const [restoredRecord, setRestoredRecord] = useState<string>("");
  const [background, setBackground] = useState<string>("#64748B");
  const [visibility, setVisibility] = useState({
    Sidebar: false,
    Themes: false,
    History: false,
  });

  const switchMenu = (menu: string): void => {
    switch (menu) {
      case "Sidebar":
        setVisibility({
          Sidebar: !visibility.Sidebar,
          Themes: false,
          History: false,
        })
        break;
      case "Themes":
        setVisibility({...visibility, Themes: !visibility.Themes});
        break;
      case "History":
        setVisibility({...visibility, History: !visibility.History});
        break;
      case "To-Sidebar":
        setVisibility({
          Sidebar: true,
          Themes: false,
          History: false,
        })
    }
  }

  const restoreRecord = (record: string): void => {
    const result = record.split("=")[1].trim();
    setRestoredRecord(result);
  }

  const addRecord = useCallback((record: string) => setHistory([...history, record]), [history])


  return (
    <main className="relative min-w-screen min-h-screen flex justify-center items-center pb-32" style={{backgroundColor: background}}>
        <input 
          type="color" 
          className={clsx("w-10 h-10 border border-white absolute bottom-6 transition-all duration-500", visibility.Sidebar ? "left-56" : "left-6")}
          defaultValue={"#64748B"}
          onChange={(e) => setBackground(e.target.value)}
        />
        <Sidemenu visibility={visibility.Themes} nestingLevel={1}>
            {Themes.map((theme, index) => 
              <button
                className="text-white text-xl text-center w-full py-1.5 hover:bg-gray-700"
                onClick={() => setTheme(theme.name)}
                key={index}
              >
                {theme.name}
              </button>
            )}
        </Sidemenu>
        <Sidemenu visibility={visibility.History} nestingLevel={1}>
          { history.length === 0 
          ? <div className="w-full py-2 text-white text-xl text-center">
              You don&apos;t calculate anything<br />History is empty
            </div> 
          : history.map((record, index) => 
            <div 
              key={index} 
              onClick={() => restoreRecord(record)} 
              className="w-full py-2 text-white text-xl text-center cursor-default hover:bg-gray-700"
            >
              {record}
            </div>
          )}
        </Sidemenu>
        <Sidemenu visibility={visibility.Sidebar}>
          <button 
            className="text-white text-xl text-center w-full py-1.5 hover:bg-gray-700"
            onClick={() => switchMenu("Themes")}
          >
            Change theme
          </button>
          <button 
            className="text-white text-xl text-center w-full py-1.5 hover:bg-gray-700"
            onClick={() => switchMenu("History")}
          >
            View history
          </button>
        </Sidemenu>
        <button 
          className={clsx("absolute top-6 transition-all duration-500", visibility.Sidebar ? "left-56" : "left-6")} 
          onClick={() => switchMenu("Sidebar")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-gear text-gray-50" viewBox="0 0 16 16">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
          </svg>
        </button>
        <button
          className={clsx(
            "absolute top-24 left-56 transition-all duration-300",
            visibility.Themes || visibility.History ? "opacity-100 visible" : "opacity-0 invisible",
          )}
          onClick={() => switchMenu("To-Sidebar")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-arrow-left text-gray-50" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
        </button>
        <CalculatorComponent 
          themeName={theme} 
          addRecord={addRecord} 
          restoredRecord={restoredRecord}
        />
    </main>
  );
}