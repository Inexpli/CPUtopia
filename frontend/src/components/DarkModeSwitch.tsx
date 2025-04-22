"use client"
import {useDarkMode} from "@/hooks/useDarkMode"
import {Moon, Sun} from "lucide-react"

export function DarkModeSwitch() {
    const {enabled, setEnabled, isMounted} = useDarkMode()

    if (!isMounted) return null

    return (
        <button
            onClick={() => setEnabled(!enabled)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-300
        ${enabled ? "bg-black text-white border-neutral-700 hover:bg-neutral-800"
                : "bg-white text-yellow-500 border-neutral-300 hover:bg-neutral-100"}
      `}
            title={enabled ? "Tryb jasny" : "Tryb ciemny"}
        >
            {enabled ? <Moon size={18}/> : <Sun size={20}/>}
        </button>
    )
}
