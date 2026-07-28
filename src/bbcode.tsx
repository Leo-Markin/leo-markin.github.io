import { Fragment, type CSSProperties, type ReactNode } from 'react'

type BBNode = { tag: string; attr: string; children: Array<BBNode | string> }

const supported = new Set(['B','I','U','COLOR','FONT','SIZE','CENTER','RIGHT','IMG','URL','TABLE','TR','TH','TD','SPOILER','COLLAPSE','LIST','*','INDENT','HR','YOUTUBE','RUTUBE','USER'])

const safeUrl = (value: string) => {
  try {
    const normalized = value.trim().replace(/^['"]|['"]$/g, '')
    const url = new URL(normalized, window.location.origin)
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '#'
  } catch { return '#' }
}

const textContent = (node: BBNode): string => node.children.map(child => typeof child === 'string' ? child : textContent(child)).join('').trim()

function parse(value: string): BBNode {
  const root: BBNode = { tag: 'ROOT', attr: '', children: [] }
  const stack: BBNode[] = [root]
  const tokens = value.replace(/\r/g, '').split(/(\[\/?[A-Za-z*]+(?:=[^\]]*)?(?:\s+[^\]]*)?\])/g)
  for (const token of tokens) {
    if (!token) continue
    const close = token.match(/^\[\/([A-Za-z*]+)\]$/)
    const open = token.match(/^\[([A-Za-z*]+)(?:=([^\]]*))?(?:\s+([^\]]*))?\]$/)
    if (close) {
      const tag = close[1].toUpperCase()
      if (tag === 'LIST' && stack[stack.length - 1]?.tag === '*') stack.pop()
      const index = stack.map(node => node.tag).lastIndexOf(tag)
      if (index > 0) stack.splice(index)
      continue
    }
    if (open && supported.has(open[1].toUpperCase())) {
      const tag = open[1].toUpperCase()
      if (tag === '*' && stack[stack.length - 1]?.tag === '*') stack.pop()
      const node: BBNode = { tag, attr: (open[2] || open[3] || '').trim(), children: [] }
      stack[stack.length - 1].children.push(node)
      if (!['HR'].includes(tag)) stack.push(node)
      continue
    }
    stack[stack.length - 1].children.push(token)
  }
  return root
}

const colorValue = (value: string) => /^(#[0-9a-f]{3,8}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|[a-z]+)$/i.test(value.trim()) ? value.trim() : 'inherit'
const fontValue = (value: string) => /^[\w\s,-]{1,60}$/.test(value) ? value : 'inherit'
const sizeValue = (value: string) => {
  const size = Number(value.replace(/[^0-9.]/g, ''))
  return `${Math.min(2, Math.max(.75, size ? .65 + size * .15 : 1))}rem`
}

function renderChildren(node: BBNode, key: string): ReactNode[] {
  return node.children.map((child, index) => typeof child === 'string'
    ? child.split('\n').map((part, line) => <Fragment key={`${key}-${index}-${line}`}>{part}{line < child.split('\n').length - 1 && <br/>}</Fragment>)
    : renderNode(child, `${key}-${index}`))
}

function renderNode(node: BBNode, key: string): ReactNode {
  const children = renderChildren(node, key)
  const attr = node.attr.replace(/^['"]|['"]$/g, '')
  switch (node.tag) {
    case 'ROOT': return <Fragment key={key}>{children}</Fragment>
    case 'B': return <strong key={key}>{children}</strong>
    case 'I': return <em key={key}>{children}</em>
    case 'U': return <u key={key}>{children}</u>
    case 'COLOR': return <span key={key} style={{ color: colorValue(attr) }}>{children}</span>
    case 'FONT': return <span key={key} style={{ fontFamily: fontValue(attr) }}>{children}</span>
    case 'SIZE': return <span key={key} style={{ fontSize: sizeValue(attr) }}>{children}</span>
    case 'CENTER': return <div className="bb-center" key={key}>{children}</div>
    case 'RIGHT': return <div className="bb-right" key={key}>{children}</div>
    case 'URL': return <a key={key} href={safeUrl(attr || textContent(node))} target="_blank" rel="noreferrer">{children}</a>
    case 'IMG': {
      const style: CSSProperties = {}
      const width = attr.match(/width=['"]?([0-9]+)(?:px)?/i)?.[1]
      if (width) style.maxWidth = `${Math.min(1200, Number(width))}px`
      return <img className="bb-image" key={key} src={safeUrl(textContent(node))} alt="Вложение" loading="lazy" style={style}/>
    }
    case 'TABLE': return <div className="bb-table-wrap" key={key}><table className="bb-table"><tbody>{children}</tbody></table></div>
    case 'TR': return <tr key={key}>{children}</tr>
    case 'TH': return <th key={key}>{children}</th>
    case 'TD': return <td key={key}>{children}</td>
    case 'SPOILER':
    case 'COLLAPSE': return <details className="bb-spoiler" key={key}><summary>{attr || 'Показать материалы'}</summary><div>{children}</div></details>
    case 'LIST': return <ul key={key}>{children}</ul>
    case '*': return <li key={key}>{children}</li>
    case 'INDENT': return <div className="bb-indent" key={key} style={{ marginLeft: `${Math.min(6, Number(attr) || 1)}rem` }}>{children}</div>
    case 'HR': return <hr key={key}/>
    case 'YOUTUBE': {
      const raw = textContent(node)
      const id = raw.replace(/^.*(?:youtu\.be\/|v=|embed\/)/, '').split(/[?&/]/)[0]
      return <iframe className="bb-video" key={key} src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`} title="YouTube" allowFullScreen/>
    }
    case 'RUTUBE': {
      const id = textContent(node).split('/').filter(Boolean).pop() || ''
      return <iframe className="bb-video" key={key} src={`https://rutube.ru/play/embed/${encodeURIComponent(id)}`} title="Rutube" allowFullScreen/>
    }
    case 'USER': return <span className="bb-user" key={key}>@{children}</span>
    default: return <Fragment key={key}>{children}</Fragment>
  }
}

export function BBCode({ value }: { value: string }) {
  return <div className="bbcode">{renderNode(parse(value), 'root')}</div>
}

export function BBEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const wrap = (open: string, close = open.split('=')[0]) => {
    const element = document.activeElement as HTMLTextAreaElement
    if (!element || element.tagName !== 'TEXTAREA') return
    const start = element.selectionStart
    const end = element.selectionEnd
    onChange(`${value.slice(0, start)}[${open}]${value.slice(start, end)}[/${close}]${value.slice(end)}`)
  }
  return <div className="editor">
    <div className="editor-tools">
      <button onClick={() => wrap('B')}>B</button><button onClick={() => wrap('I')}>I</button><button onClick={() => wrap('U')}>U</button>
      <button onClick={() => wrap('COLOR=#fba026', 'COLOR')}>Цвет</button><button onClick={() => wrap('CENTER')}>По центру</button>
      <button onClick={() => wrap('SPOILER=Материалы', 'SPOILER')}>Спойлер</button><button onClick={() => wrap('IMG')}>IMG</button>
      <button onClick={() => wrap("URL='https://'", 'URL')}>URL</button><button onClick={() => wrap('YOUTUBE')}>YouTube</button><button onClick={() => wrap('RUTUBE')}>Rutube</button>
    </div>
    <textarea value={value} onChange={event => onChange(event.target.value)} rows={20}/>
    <div className="editor-preview"><span className="eyebrow">Предпросмотр</span><BBCode value={value}/></div>
  </div>
}
