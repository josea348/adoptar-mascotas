import { useEffect, useState } from 'react';
import axios from 'axios';
import Boton from './Atoms/Boton';
import Inputs from './Atoms/Inputs';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AdicionarMascotas = () => {
  const [generos, setGeneros] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [razas, setRazas] = useState([]);
  const users = JSON.parse(localStorage.getItem("userId")) || '';
  const [registraPets, setRegistraPets] = useState({
    nombre: '',
    raza: '',
    categoria: '',
    imagen: null,
    genero: '',
    iduser: users
  });
  const navigator = useNavigate();

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    setRegistraPets({
      ...registraPets,
      [name]: name === "imagen" ? files[0] : value
    });
  }

  const registroPets = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in registraPets) {
      formData.append(key, registraPets[key]);
    }

    try {
      const response = await axios.post('http://localhost:3000/pets/crear', formData);
      console.log(response.data);
      setRegistraPets({
        nombre: '',
        raza: '',
        categoria: '',
        imagen: null,
        genero: '',
        iduser: users
      });
      Swal.fire({
        title: "Registrado!",
        text: response.data.message,
        icon: "success"
      });
      navigator('/dashboard');
    } catch (e) {
      console.log('Error: ' + e);
      Swal.fire({
        title: "Error!",
        text: 'Error: ' + e,
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
      console.log('Error: ' + e);
    }
  }

  useEffect(() => {
    listarRaza();
    listarCategoria();
    listarGenero();
  }, []);

  const closeForm = () => {
    navigator('/dashboard');
  }

  return (
    <div className='w-full h-full bg-[#2c4674] h-screen'>
      <div className=' max-w-3xl mx-auto p-4'>
        <div className='grid grid-cols-10 gap-4 '>
          <div className="col-span-1 flex items-center justify-center">
            <img src="./src/assets/btn-back.svg" alt="" className='cursor-pointer' />
          </div>
          <div className="col-span-6 flex items-center justify-center">
            <h1 className='text-white text-lg m-4 text-center'>Adicionar Mascotas</h1>
          </div>
          <Boton onClick={() => closeForm()} className={'btn-close w-12 h-12 rounded-full flex justify-center items-center cursor-pointer'} classDiv={'col-span-1 flex justify-center items-center'}>
            <img src="./src/assets/btn-close.svg" alt="" />
          </Boton>
        </div>
        <div className="flex justify-center">
          <img src="./src/assets/photo-lg-0.svg" alt="" className='img m-12' />
        </div>
        <form onSubmit={registroPets} className='flex flex-col my-4'>
          <div className="grid grid-cols-2 gap-4 divs-input-select">
            <div className='m-1'>
              <Inputs type="text" name="nombre" placeholder="Nombre" onChange={handleInputChange} value={registraPets.nombre} className='bg-white bg-opacity-30 border border-gray-300 rounded-full px-4 py-2 outline-none shadow-md text-black' />
            </div>
            <div className=' m-1'>
              <select name="raza" onChange={handleInputChange} value={registraPets.raza} className="bg-white bg-opacity-30 border border-gray-300 rounded-full px-4 py-2 outline-none shadow-md" >
                <option value="">Seleccione raza</option>
                {razas.map(raza => (
                  <option key={raza.idRaces} value={raza.idRaces}>{raza.nameRaces}</option>
                ))}
              </select>
            </div>
            <div className='divs-content m-1'>
              <select name="categoria" onChange={handleInputChange} value={registraPets.categoria} className="bg-white bg-opacity-30 border border-gray-300 rounded-full px-4 py-2 outline-none shadow-md" >
                <option value="">Seleccione categoria</option>
                {categorias.map(categoria => (
                  <option key={categoria.idCategories} value={categoria.idCategories}>{categoria.nameCategories}</option>
                ))}
              </select>
            </div>
            <div className='divs-content m-1'>
              <Inputs type="file" name="imagen" placeholder="Subir foto" onChange={handleInputChange} className='appearance-none border border-gray-300 rounded-full py-2 px-4' />
            </div>
            <div className='divs-content m-1'>
              <select name="genero" onChange={handleInputChange} value={registraPets.genero} className="bg-white bg-opacity-30 border border-gray-300 rounded-full px-4 py-2 outline-none shadow-md" >
                <option value="">Seleccione Genero</option>
                {generos.map(genero => (
                  <option key={genero.idGender} value={genero.idGender}>{genero.nameGender}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='m-1'>
            <Boton className={'w-full bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-white font-bold py-2 px-4 rounded-full mx-auto'}>
              Guardar
            </Boton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdicionarMascotas;
