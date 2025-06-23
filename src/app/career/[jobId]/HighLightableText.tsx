import type React from "react"

interface HighlightableTextProps {
  text: string
  highlights: { text: string; link: string }[]
}

const HighlightableText: React.FC<HighlightableTextProps> = ({ text, highlights }) => {
  const parts = []
  let lastIndex = 0

  highlights.forEach((highlight) => {
    const index = text.indexOf(highlight.text, lastIndex)
    if (index !== -1) {
      parts.push(text.substring(lastIndex, index))
      parts.push(
        <a
          key={index}
          href={highlight.link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold font-sans hover:text-blue-500"
        >
          {highlight.text}
        </a>,
      )
      lastIndex = index + highlight.text.length
    }
  })

  parts.push(text.substring(lastIndex))

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return <>{parts.map((part, index) => (typeof part === "string" ? part : part))} </>
}

export default HighlightableText
