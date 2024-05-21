import React from 'react'
import { SelectCategoria, SelectGenero, SelectRaza } from '../Atoms/Selects'
import Inputs from './../Atoms/Inputs';
import Boton from './../Atoms/Boton';

const Forms = ({razas, categorias, generos,registraPets, onChange, onSubmit}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className='divs-input-select'>
        <Inputs type="text" name="nombre" placeholder="Nombre" onChange={onChange} value={registraPets.nombre} className='input inputText' />
        <SelectRaza razas={razas} onChange={onChange} value={registraPets.raza} />
        <SelectCategoria categorias={categorias} onChange={onChange} value={registraPets.categoria} />
        <Inputs type="file" name="photo" placeholder="Subir foto" onChange={onChange} value={registraPets.photo} className='input inputFile' />
        <SelectGenero generos={generos} onChange={onChange} value={registraPets.genero} />
      </div>
      <div className='divs-content'>
        <Boton className={'button'}>Guardar</Boton>
      </div>
    </form>
  )
}

export default Forms
