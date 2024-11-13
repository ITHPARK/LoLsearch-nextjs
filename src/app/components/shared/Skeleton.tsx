import React from 'react'

const Skeleton = ({
  width = '100%',
  height,
}: {
  width?: number | string
  height: number
}) => {
  return (
    <div style={{ width: width, height: height, background: '#2C2E3C' }}></div>
  )
}

export default Skeleton
