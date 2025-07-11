import { searchKeywordId, docSearchResultId } from "@/constant";

let debounceTimer: number | undefined;

document
  .querySelector(`#${searchKeywordId}`)
  ?.addEventListener("input", (event) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = window.setTimeout(() => {
      onsearch(event);
    }, 180); // 180ms debounce
  });

async function onsearch(event: Event) {
  const target = event.target as HTMLInputElement;
  const keyword = target.value;

  if (!keyword) {
    clearResults();
    return;
  }

  if (keyword && window.pagefind) {
    const result = await window.pagefind.search(target.value);
    const results = await Promise.all(result.results.map((e) => e.data()));

    const rows: HTMLAnchorElement[] = [];
    for (const r of results) {
      const params: Partial<MakeResultRowParams> = {
        content: r.content,
        excerpt: r.excerpt,
        title: r.meta.title,
        url: r.url,
      };

      if (params.content && params.excerpt && params.title && params.url) {
        // 移除不需要的尾部斜線
        if (params.url.length > 1 && params.url.at(-1) === "/") {
          params.url = params.url.slice(0, -1);
        }
        rows.push(makeResultRow(params as MakeResultRowParams));
      }
    }

    if (rows.length === 0) {
      clearResults();
      return;
    }

    renderResults(rows);
  }
}

interface MakeResultRowParams {
  url: string;
  content: string;
  excerpt: string;
  title: string;
}

function makeResultRow(params: MakeResultRowParams): HTMLAnchorElement {
  const link = document.createElement("a");
  link.href = params.url;
  link.className = "group block rounded-lg p-4 hover:bg-sky-600";

  const titleDiv = document.createElement("div");
  titleDiv.textContent = params.title;
  titleDiv.className = "text-xl text-gray-400 group-hover:text-primary";

  // 安全渲染 excerpt，僅允許 <mark>
  const excerptDiv = document.createElement("div");
  excerptDiv.className = "text-gray-400 group-hover:text-primary";
  const parser = new DOMParser();
  const doc = parser.parseFromString(params.excerpt, "text/html");
  // 只保留 <mark> 標籤
  excerptDiv.append(
    ...[...doc.body.childNodes].map((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === "MARK") {
        const mark = document.createElement("mark");
        mark.textContent = node.textContent;
        mark.style.backgroundColor = "#FFD700"; // 你想要的醒目顏色
        mark.style.color = "#222";
        return mark;
      } else if (node.nodeType === Node.TEXT_NODE) {
        return document.createTextNode(node.textContent || "");
      }
      // 其他標籤全部忽略
      return document.createTextNode("");
    }),
  );

  link.appendChild(titleDiv);
  link.appendChild(excerptDiv);

  return link;
}

function renderResults(rows: HTMLAnchorElement[]) {
  const container = document.querySelector(`#${docSearchResultId}`)!;
  container.replaceChildren(...rows);
}

function clearResults() {
  const container = document.querySelector(`#${docSearchResultId}`)!;
  container.replaceChildren();
}
