export const shareHandlers = {
  copyLink: async () => {
    await navigator.clipboard.writeText(window.location.href)
  },

  twitter: () => {
    const text = "Confira esta vaga!"
    const url = window.location.href
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
      "_blank"
    )
  },

  linkedIn: () => {
    const url = window.location.href
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      "_blank"
    )
  },

  whatsApp: () => {
    const text = "Confira esta vaga!"
    const url = window.location.href
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
      "_blank"
    )
  },

  email: () => {
    const subject = "Confira esta vaga!"
    const body = `Olá!\n\nAchei que você poderia se interessar por esta vaga:\n${window.location.href}`
    window.open(
      `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        body
      )}`,
      "_blank"
    )
  },
}
