import React from 'react'

const ContentTop = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-[20px]">
      <div className="p-[15px] bg-[#2C2E3C] border-solid border-[1px] border-[#3A3D45] rounded-[5px]">
        {children}
      </div>
    </div>
  )
}

export default ContentTop
