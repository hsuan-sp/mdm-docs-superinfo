/**
 * 智能 HTML 文字高亮工具
 * @param html 原始 HTML 字串
 * @param query 搜尋關鍵字
 * @returns 高亮後的 HTML 字串
 */
export function highlightHtml(html: string, query: string): string {
  if (!query || !query.trim() || !html) return html;

  // 1. 移除 Regex 特殊字元並建立匹配模式 (不區分大小寫)
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi");

  /**
   * 2. 使用高度安全的替換策略：
   * 透過兩步走，確保不會匹配到 HTML 標籤內部的屬性 (如 <img src="...query...")
   */

  // 分割 HTML 標籤與文字內容
  const parts = html.split(/(<[^>]+>)/g);

  return parts
    .map((part) => {
      // 如果是 HTML 標籤本身，不處理
      if (part.startsWith("<") && part.endsWith(">")) {
        return part;
      }
      // 如果是文字內容，執行高亮替換
      return part.replace(
        regex,
        '<mark class="bg-apple-blue/20 text-apple-blue dark:bg-apple-blue/30 dark:text-blue-400 font-bold rounded-sm px-0.5">$1</mark>'
      );
    })
    .join("");
}
