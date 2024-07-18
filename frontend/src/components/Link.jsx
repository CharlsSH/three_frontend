'use client'

// Next Imports
import NextLink from 'next/link'

const Link = props => {
  // Props
  const { href, onClick, ...rest } = props

  return (
    <NextLink
      {...rest}
      href={href || '/'}
      onClick={onClick ? e => onClick(e) : !href ? e => e.preventDefault() : undefined}
    />
  )
}

export default Link
