import React from 'react'
import Image from 'next/image'
import classNames from 'classnames'

interface ImageProps {
  src: string
  alt?: string
  className?: string
  sizes: string
  position?: string
}

const ImageBox = ({
  src,
  alt,
  className,
  sizes,
  position = 'relative',
}: ImageProps) => {
  return (
    <div className={classNames(`${className} ${position}`)}>
      <Image src={src} fill alt={alt || ''} sizes={sizes} />
    </div>
  )
}

export default ImageBox
