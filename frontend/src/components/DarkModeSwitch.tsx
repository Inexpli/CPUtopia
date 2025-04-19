import { useEffect, useState } from "react";

export const DarkModeSwitch = () => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        if (enabled) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [enabled]);

    return (
        <label className="inline-flex items-center cursor-pointer ml-4">
            <span className="mr-2 text-sm text-gray-900 dark:text-gray-300">Dark Mode</span>
            <div className="relative">
                <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => setEnabled(!enabled)}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 transition-all" />
                <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-all peer-checked:translate-x-full" />
            </div>
        </label>
    );
};
