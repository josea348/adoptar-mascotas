export const SelectRaza = ({ razas, onChange, value }) => (
  <div className='divs-content m-1'>
    <select id="raza" name="raza" onChange={onChange} value={value}>
      <option value="">Seleccione raza</option>
      {razas.map(raza => (
        <option key={raza.idRaces} value={raza.idRaces}>{raza.nameRaces}</option>
      ))}
    </select>
  </div>
);

export const SelectCategoria = ({ categorias, onChange, value }) => (
  <div className='divs-content m-1'>
    <select id="categoria" name="categoria" onChange={onChange} value={value}>
      <option value="">Seleccione categoría</option>
      {categorias.map(categoria => (
        <option key={categoria.idCategories} value={categoria.idCategories}>{categoria.nameCategories}</option>
      ))}
    </select>
  </div>
);

export const SelectGenero = ({ generos, onChange, value }) => (
  <div className='divs-content m-1'>
    <select id="genero" name="genero" onChange={onChange} value={value}>
      <option value="">Seleccione género</option>
      {generos.map(genero => (
        <option key={genero.idGender} value={genero.idGender}>{genero.nameGender}</option>
      ))}
    </select>
  </div>
);