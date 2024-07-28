import clsx from 'clsx'
import React from 'react'

interface Props {
    visibility: boolean;
    nestingLevel?: number;
    children?: React.ReactNode;
}

export default function Sidemenu({visibility, nestingLevel = 0, children}: Props) {
    const getZLevel = () => {
        switch (nestingLevel) {
            case 0: return "z-0";
            case 1: return "z-10";
            case 2: return "z-20";
            case 3: return "z-30";
            case 4: return "z-40";
            case 5: return "z-50";
            case 6: return "z-60";
            case 7: return "z-70";
            case 8: return "z-80";
            case 9: return "z-90";
            case 10: return "z-100";
            default: return "z-0";
        }
    }

  return (
    <div className={clsx(
        "absolute top-0 h-full w-48 bg-slate-800 pt-6 space-y-1",
        "transition-all duration-500", getZLevel(),
        visibility ? "left-0" : "-left-48",
      )}>
        {children}
    </div>
  )
}
