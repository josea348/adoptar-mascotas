import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import {FaEdit, FaSearch, FaTrashAlt} from 'react-icons/fa';
import './css/administrarMascota.css'
import Boton from './Atoms/Boton';
import Swal from 'sweetalert2';
import Inputs from './Atoms/Inputs';

const AdministrarMascotas = () => {
  const navigator = useNavigate();
  const [pets, setPets] = useState([]);
  const [user, setUser] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedPets, setSelectedPets] = useState(null);
  const [generos, setGeneros] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [razas, setRazas] = useState([]);
  const [modalActualizar, setModalActualizar] = useState(false);
  const [selectPets, setSelectPets] = useState(null);
  const [updatedPetsData, setUpdatedPetsData] = useState({
    nombre: '',
    raza: '',
    categoria: '',
    imagen: '',
    genero: ''
  });
  const auth = localStorage.getItem("tokens");
  const users = JSON.parse(localStorage.getItem("userId"));
  
  const openModal = (pet) => {
    setModal(true);
    setSelectedPets(pet);
  }

  const closeModal = () => {
    setModal(false);
  }

  const listarPets = async () => {
    try {
      const response = await axios.get('http://localhost:3000/pets/listarNombre');
      setPets(response.data);
      console.log(response.data);
    } catch (e) {
      console.log('Error: ' + e);
    }
  }

  /* const buscar = async () => {
    try {
      let userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:3000/user/buscar/${userId}`);
      setUser(response.data)
    } catch (error) {
      console.log('Error: '+error);
    }
  } */

  useEffect(() => {
    listarPets();
    listarRaza();
    listarCategoria();
    listarGenero();
    /* buscar(); */
  }, []);
  
  const adiconarBoton = () => {
    navigator("/adicionar")
  }

  const openModalUpdate = (pet) => {
    setSelectPets(pet);
    setUpdatedPetsData({
      nombre: pets.nombre,
      raza: pets.raza,
      categoria: pets.categoria,
      imagen: pets.imagen,
      genero: pets.genero
    });
    setModalActualizar(true);
  };
  const closeModalUpdate = () => {
      setModalActualizar(false)
  }

  const handleInputChange = (e) => {
    setUpdatedPetsData({...updatedPetsData, [e.target.name]: e.target.value})
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`http://localhost:3000/pets/actualizar/${selectPets.idPets}`,updatedPetsData)
        closeModalUpdate();
        const updatedPets = users.map(user =>
            user.identificacion === selectPets.identificacion ? { ...user, ...updatedPetsData } : user
        );
        setPets(updatedPets);
    } catch (e) {
        console.log('Error: '+e);
        alert('Error: '+e);
    }
    console.log(selectPets.idPets);
};

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

  const actualizar = (pet) => {
    setSelectedPets(pet)
    setUpdatedPetsData({
      nombre: pets.nombre,
      raza: pets.raza,
      categoria: pets.categoria,
      imagen: pets.imagen,
      genero: pets.genero
    })
    navigator('/actualizar')
  }

  const eliminar = async (petsId) => {
    try {
      await axios.delete(`http://localhost:3000/pets/borrar/${petsId}`)
        .then(response => {
          const updatedPets = pets.filter(pet => pet.idPets !== petsId);
          setPets(updatedPets);
          Swal.fire({
            title: "Eliminado!",
            text: response.data.message,
            icon: "success"
          });
      })
    } catch (error) {
      console.log('Error: '+error);
    }
  }

  const cerrarSesion = () => {
    navigator("/");
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
  
  if (!auth || !users) {
    Swal.fire({
      text: "Tienes que iniciar sesión primero para poder ingresar a la plataforma",
      icon: "error"
    });
    return <Navigate to="/" />;
  }

  return (
    <div className='container'>
      <div className='content-pets'>
        {/* <h4>Bienvenido {user.fulname}</h4> */}
        <h1  className='title'>Administrar Mascotas</h1>
        <Boton className={'button'} onClick={adiconarBoton}>+   Adicionar</Boton>
        {pets.map((pet) => (
          <div key={pet.idPets} className='content-divs-pets'>
            <div className='content-pets-info'>
              <div className='imgs'>
                <img src={`http://localhost:3000/img/${pet.photo}`} alt="" />
              </div>
              <div className="content-info">
                <p>{pet.namePets}</p>
                <p>{pet.nameRaces}</p>
              </div>
            </div>
            <div className='content-buttons'>
              <Boton className={'btn-icon btn-icon-1-2'} onClick={() => openModal(pet)}><FaSearch /></Boton>
              <Boton className={'btn-icon btn-icon-1-2'} onClick={() => openModalUpdate(pet)}><FaEdit /></Boton>
              <Boton className={'btn-icon btn-icon-3'} onClick={() => eliminar(pet.idPets)}><FaTrashAlt /></Boton>
            </div>
          </div>
        ))}
        {modal && (
          <div className='modalPrincipal'>
            <div className="modalSecundario">
              <div className='div-title-btn'>
                <div className="Former">
                  <img src="./src/assets/btn-back.svg" alt="" className='formerImg' />
                </div>
                <div className="div-title">
                  <h1 className='title-modal'>Consultar Mascota</h1>
                </div>
                <Boton onClick={() => closeModal()} className={'btn-close'} classDiv={'classDiv'}><img src="./src/assets/btn-close.svg" alt="" /></Boton>
              </div>
              <div className="div-dos-img">
                <img src={`http://localhost:3000/img/${selectedPets.photo}`} alt="" className='img-modal' />
              </div>
              <div className="info-pets">
                <div className="divs-content-date">
                  <div className="divs-uno">
                    <h3>Nombre</h3>
                  </div>
                  <div className="divs-dos">
                    <p>{selectedPets.namePets}</p>
                  </div>
                </div>
                <div className="divs-content-date">
                  <div className="divs-uno">
                    <h3>Raza</h3>
                  </div>
                  <div className="divs-dos">
                    <p>{selectedPets.nameRaces}</p>
                  </div>
                </div>
                <div className="divs-content-date">
                  <div className="divs-uno">
                    <h3>Categoria</h3>
                  </div>
                  <div className="divs-dos">
                    <p>{selectedPets.nameCategories}</p>
                  </div>
                </div>
                <div className="divs-content-date">
                  <div className="divs-uno">
                    <h3>Genero</h3>
                  </div>
                  <div className="divs-dos">
                    <p>{selectedPets.nameGender}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {modalActualizar && (
          <div className='modalPrincipal'>
            <div className="modalSecundario">
              <div className='div-title-btn'>
                <div className="Former">
                  <img src="./src/assets/btn-back.svg" alt="" className='formerImg' />
                </div>
                <div className="div-title">
                  <h1 className='title   text-white text-lg m-4 text-center'>Actulizar Mascotas</h1>
                </div>
                <Boton onClick={() => closeModalUpdate()} className={'btn-close'} classDiv={'classDiv'}><img src="./src/assets/btn-close.svg" alt="" /></Boton>
              </div>
              <div className="img-primary    flex justify-center">
                <img src={`http://localhost:3000/img/${selectedPets.photo}`} alt="" className='img' />
              </div>
              <form onSubmit={handleUpdate} className='flex flex-col'>
                  <div className="divs-input-select    grid grid-cols-2 gap-4">{/* grid md:grid-cols-2 sm:flex sm:flex-col sm:gap-4 */}
                    <div className='divs-content m-1'>
                      <Inputs type="text" name="nombre" placeholder="Nombre" onChange={handleInputChange} value={updatedPetsData.nombre} className='input inputText    bg-white bg-opacity-30 border border-gray-300 rounded-full px-4 py-2 outline-none shadow-md text-black' />
                    </div>
                    <div className='divs-content m-1'>
                      <select name="raza" onChange={handleInputChange} value={updatedPetsData.raza} className="select     bg-white bg-opacity-30 border border-gray-300 rounded-full px-4 py-2 outline-none shadow-md" >
                        <option value="">Seleccione raza</option>
                        {razas.map(raza => (
                          <option key={raza.idRaces} value={raza.idRaces}>{raza.nameRaces}</option>
                        ))}
                      </select>
                    </div>
                    <div className='divs-content m-1'>
                      <select name="categoria" onChange={handleInputChange} value={updatedPetsData.categoria} className="select     bg-white bg-opacity-30 border border-gray-300 rounded-full px-4 py-2 outline-none shadow-md" >
                        <option value="">Seleccione categoria</option>
                        {categorias.map(categoria => (
                          <option key={categoria.idCategories} value={categoria.idCategories}>{categoria.nameCategories}</option>
                        ))}
                      </select>
                    </div>
                    <div className='divs-content m-1'>
                      <Inputs type="file" name="imagen" placeholder="Subir foto" onChange={handleInputChange} value={updatedPetsData.imagen} className='input inputFile     appearance-none border border-gray-300 rounded-full py-2 px-4' />
                    </div>
                    <div className='divs-content m-1'>
                      <select name="genero" onChange={handleInputChange} value={updatedPetsData.genero} className="select    bg-white bg-opacity-30 border border-gray-300 rounded-full px-4 py-2 outline-none shadow-md" >
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
            </div>
          </div>
        )}

        <div>
          <Boton onClick={cerrarSesion}>Cerrar sesción</Boton>
        </div>
      </div>
    </div>
  )
}

export default AdministrarMascotas
