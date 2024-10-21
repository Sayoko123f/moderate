import { throttle } from "@/utils/utils";

let prevScrollY = 0;
const throttleOnScroll = throttle(onScroll, 40);

window.addEventListener(
  "scroll",
  (event) => {
    throttleOnScroll();
  },
  { passive: true },
);

function onScroll() {
  const currentScrollY = window.scrollY;
  const diffScrollY = currentScrollY - prevScrollY;
  diffScrollY > 0 ? hiddenAppbar() : showAppbar();
  prevScrollY = currentScrollY;
}

function hiddenAppbar() {
  document.documentElement.style.setProperty(
    "--appbar-transform-y",
    "calc(var(--appbar-height) * -1)",
  );
}

function showAppbar() {
  document.documentElement.style.setProperty("--appbar-transform-y", "0");
}
