import { useEffect, useState } from "react";

export const DarkModeSwitch = () => {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [enabled]);

  return (
    <div className="flex items-center space-x-4 ml-4">
      <span className="text-gray-900 dark:text-gray-300">
        {enabled ? "Dark Mode" : "Light Mode"}
      </span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-600 peer-checked:bg-blue-600 transition-colors duration-300" />
        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-full" />
      </label>
    </div>
  );
};
