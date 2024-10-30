const darkId = "dark-mode-icon";
const lightId = "light-mode-icon";
const storageKey = "theme";
const storageDarkValue = "dark";
init();

function init() {
  const systemMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  const mode = localStorage.getItem(storageKey) || systemMode;
  useMode(mode);

  const darkIcon = document.getElementById(darkId);
  const lightIcon = document.getElementById(lightId);
  darkIcon?.addEventListener("click", () => useMode("light"));
  lightIcon?.addEventListener("click", () => useMode("dark"));
}

function useMode(mode: string) {
  const darkIcon = document.getElementById(darkId);
  const lightIcon = document.getElementById(lightId);
  lightIcon?.classList.toggle("hidden", mode === storageDarkValue);
  darkIcon?.classList.toggle("hidden", mode !== storageDarkValue);
  document.documentElement.classList.toggle("dark", mode === storageDarkValue);
  localStorage.setItem(storageKey, mode);
}
