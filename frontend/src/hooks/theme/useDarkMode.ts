import {useEffect, useState} from "react"

export function useDarkMode() {
    const [enabled, setEnabled] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem("theme")
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

        if (saved === "dark" || (!saved && prefersDark)) {
            setEnabled(true)
            document.documentElement.classList.add("dark")
        }

        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (!isMounted) return

        if (enabled) {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }, [enabled, isMounted])

    return {enabled, setEnabled, isMounted}
}
