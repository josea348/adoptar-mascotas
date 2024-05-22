import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import {FaEdit, FaSearch, FaTrashAlt} from 'react-icons/fa';
import './css/administrarMascota.css'
import Boton from './Atoms/Boton';
import Swal from 'sweetalert2';

const AdministrarMascotas = () => {
  const navigator = useNavigate();
  const [pets, setPets] = useState([]);
  const [user, setUser] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedPets, setSelectedPets] = useState(null);
  const auth = localStorage.getItem("token");
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
    /* buscar(); */
  }, []);
  
  const adiconarBoton = () => {
    navigator("/adicionar")
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
              <Boton className={'btn-icon btn-icon-1-2'}><FaEdit /></Boton>
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

        <div>
          <Boton onClick={cerrarSesion}>Cerrar sesción</Boton>
        </div>
      </div>
    </div>
  )
}

export default AdministrarMascotas
