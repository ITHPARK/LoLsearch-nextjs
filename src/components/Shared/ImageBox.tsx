import React from 'react'
import Image from 'next/image'
import classNames from 'classnames'

interface ImageProps {
  src: string
  alt?: string
  className?: string
}

const ImageBox = ({ src, alt, className }: ImageProps) => {
  return (
    <div className={classNames(className)}>
      <Image src={src} fill alt={alt || ''} />
    </div>
  )
}

export default ImageBox
