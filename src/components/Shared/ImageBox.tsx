import React from 'react'
import Image from 'next/image'
import classNames from 'classnames'

interface ImageProps {
  src: string
  alt?: string
  className?: string
  position?: string
}

const ImageBox = ({
  src,
  alt,
  className = '',
  position = 'relative',
}: ImageProps) => {
  return (
    <div className={classNames(`img-container ${className} ${position} `)}>
      <Image src={src} fill alt={alt || ''} />
    </div>
  )
}

export default ImageBox
