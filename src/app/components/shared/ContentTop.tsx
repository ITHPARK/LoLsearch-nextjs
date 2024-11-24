import React from 'react'
import classNames from 'classnames'

const ContentTop = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={classNames(className, 'mx-auto')}>
      <div>{children}</div>
    </div>
  )
}

export default ContentTop
