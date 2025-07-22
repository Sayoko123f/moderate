function main() {
  const obs = new IntersectionObserver(async (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) {
        return;
      }
      const target = entry.target as HTMLElement;
      const key = target.dataset.youtube;
      if (!key) {
        return;
      }
      obs.unobserve(entry.target);

      const iframe = document.createElement("iframe");
      iframe.classList.add("w-full", "aspect-video");
      iframe.src = `https://www.youtube-nocookie.com/embed/${key}`;
      iframe.title = "Youtube Video Player";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.setAttribute("allowfullscreen", "");
      entry.target.replaceWith(iframe);
    }
  });

  for (const el of document.querySelectorAll("[data-youtube]")) {
    obs.observe(el);
  }
}

main();