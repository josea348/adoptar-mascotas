import React from 'react'
import { SelectCategoria, SelectGenero, SelectRaza } from '../Atoms/Selects'
import Inputs from '../Atoms/Inputs';
import Boton from '../Atoms/Boton';

const Forms = ({registraUser, onChange, onSubmit}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className='divs-input-select'>
        <Inputs type="text" name="name" placeholder="Nombre" onChange={onChange} value={registraUser.name} className='input inputFile' />
        <Inputs type="email" name="email" placeholder="Email" onChange={onChange} value={registraUser.Email} className='input inputFile' />
        <Inputs type="password" name="password" placeholder="Contraseña" onChange={onChange} value={registraUser.Contraseña} className='input inputFile' />
      </div>
      <div className='divs-content'>
        <Boton className={'button'}>Guardar</Boton>
      </div>
    </form>
  )
}

export default Forms;
