import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Boton from './Atoms/Boton';
import Inputs from './Atoms/Inputs';
import './css/adicionarMascotas.css'
import Swal from 'sweetalert2';
import Forms from './Molecules/Forms';

const AdicionarMascotas = () => {
  const [generos, setGeneros] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [razas, setRazas] = useState([]);
  const [registraPets, setRegistraPets] = useState({
    nombre: '',
    raza: '',
    categoria: '',
    photo: '',
    genero: ''
  });

  const handleInputChange = (event) => {
    setRegistraPets({
      ...registraPets,
      [event.target.name]: event.target.value
    })

    console.log(registraPets);
  }

  const registroPets = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/pets/crear', registraPets);
      console.log(response.data);
      setRegistraPets({
        nombre: '',
        raza: '',
        categoria: '',
        photo: '',
        genero: ''
      });
      Swal.fire({
        title: "Registrado!",
        text: response.data.message,
        icon: "success"
      });
    } catch (e) {
      console.log('Error: '+e);
      Swal.fire({
        title: "Error!",
        text: 'Error: '+e,
        icon: "error"
      });
    }
  }
  
  const listarRaza = async () => {
    try {
      const response = await axios.get('http://localhost:3000/races/listar');
      setRazas(response.data);
      console.log(response.data);
    } catch (e) {
      console.log('Error: ' + e);
    }
  }

  const listarCategoria = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories/listar');
      setCategorias(response.data);
      console.log(response.data);
    } catch (e) {
      console.log('Error: ' + e);
    }
  }

  const listarGenero = async () => {
    try {
      const response = await axios.get('http://localhost:3000/genders/listar');
      setGeneros(response.data);
      console.log(response.data);
    } catch (e) {
      console.log('Error: '+e);
    }
  }

  useEffect(() => {
    listarRaza();
    listarCategoria();
    listarGenero();
  }, []);

  return (
    <div className='container     w-full h-full bg-blue-800'>
      <div className='content     max-w-2xl mx-auto'>
        <h1 className='title   text-white text-lg m-4 text-center'>Adicionar Mascotas</h1>
        <div className="img-primary    flex justify-center">
          <img src="./src/assets/photo-lg-0.svg" alt="" />
        </div>
        <form onSubmit={registroPets} className='flex flex-col'>
            <div className="divs-input-select    grid grid-cols-2 gap-4">{/* grid md:grid-cols-2 sm:flex sm:flex-col sm:gap-4 */}
              <div className='divs-content m-1'>
                <Inputs type="text" name="nombre" placeholder="Nombre" onChange={handleInputChange} value={registraPets.nombre} className='input inputText    bg-white bg-opacity-30 border border-gray-300 rounded-full px-4 py-2 outline-none shadow-md text-black' />
              </div>
              <div className='divs-content m-1'>
                <select name="raza" onChange={handleInputChange} value={registraPets.raza} className="select     bg-white bg-opacity-30 border border-gray-300 rounded-full px-4 py-2 outline-none shadow-md" >
                  <option value="">Seleccione raza</option>
                  {razas.map(raza => (
                    <option key={raza.idRaces} value={raza.idRaces}>{raza.nameRaces}</option>
                  ))}
                </select>
              </div>
              <div className='divs-content m-1'>
                <select name="categoria" onChange={handleInputChange} value={registraPets.categoria} className="select     bg-white bg-opacity-30 border border-gray-300 rounded-full px-4 py-2 outline-none shadow-md" >
                  <option value="">Seleccione categoria</option>
                  {categorias.map(categoria => (
                    <option key={categoria.idCategories} value={categoria.idCategories}>{categoria.nameCategories}</option>
                  ))}
                </select>
              </div>
              <div className='divs-content m-1'>
                <Inputs type="file" name="photo" placeholder="Subir foto" onChange={handleInputChange} value={registraPets.photo} className='input inputFile     appearance-none border border-gray-300 rounded-full py-2 px-4' />
              </div>
              <div className='divs-content m-1'>
                <select name="genero" onChange={handleInputChange} value={registraPets.genero} className="select    bg-white bg-opacity-30 border border-gray-300 rounded-full px-4 py-2 outline-none shadow-md" >
                  <option value="">Seleccione Genero</option>
                  {generos.map(genero => (
                    <option key={genero.idGender} value={genero.idGender}>{genero.nameGender}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className='divs-content m-1'>
              <Boton className={'button    bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-white font-bold py-2 px-4 rounded-full mx-auto'}>Guardar</Boton>
            </div>
        </form>
        {/* <Forms
          razas={razas}
          categorias={categorias}
          generos={generos}
          registraPets={registraPets}
          onChange={handleInputChange}
          onSubmit={registroPets}
        /> */}
      </div>
    </div>
  )
}

export default AdicionarMascotas
