export const stripHtml = (html: string) => {
  if (!html) return ""

  try {
    const doc = new DOMParser().parseFromString(html, "text/html")
    const text = doc.body.textContent || doc.body.innerText || ""
    return cleanText(text)
  } catch {
    return cleanText(html)
  }
}

// Função para limpar o texto removendo tags HTML e outros caracteres especiais
const cleanText = (text: string) => {
  return text
    .replace(/<[^>]+>/g, "")
    .replace(/&[^;]+;/g, "")
    .replace(/\b[hb][0-9]?\b/g, "")
    .replace(/style="[^"]*"/g, "")
    .replace(/[<>]/g, "")
    .replace(/\/+/g, " ")
    .replace(/Position:+/g, "")
    .replace(/Description:+/g, "")
    .replace(/Job\s+Description:+/g, "")
    .replace(/\s*:\s*/g, ": ")
    .replace(/\s*\|\s*/g, " | ")
    .replace(/\s+/g, " ")
    .replace(/^[^a-zA-Z0-9]+/, "")
    .replace(/[^a-zA-Z0-9\s:,.|()-]+/g, "")
    .trim()
}

// Função para truncar o texto em uma palavra específica
export const truncateAtWord = (text: string, limit: number) => {
  if (!text) return ""

  let cleanText = text.trim()
  if (cleanText.length <= limit) return cleanText

  let truncated = cleanText.slice(0, limit)

  const specialChars = /[\s,.!?;:]/
  while (
    truncated.length > 0 &&
    specialChars.test(truncated[truncated.length - 1])
  ) {
    truncated = truncated.slice(0, -1)
  }

  if (truncated.length > 0) {
    const lastSpace = truncated.lastIndexOf(" ")
    if (lastSpace > limit - 30) {
      truncated = truncated.slice(0, lastSpace)
    }
  }

  return `${truncated}...`
}
