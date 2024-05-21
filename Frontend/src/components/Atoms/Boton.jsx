import React from 'react'

const Boton = ({ children,classDiv,className,onClick}) => {
  return (
    <div className={classDiv}>
      <button type="submit" className={className} onClick={onClick}>{children}</button>
    </div>
  )
}

export default Boton
