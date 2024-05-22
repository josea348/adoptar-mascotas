import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Inputs from './Atoms/Inputs'
import Boton from './Atoms/Boton'
import { useNavigate } from 'react-router-dom'
import Forms from './Molecules/Forms'

const RegisterUser = () => {
  const [formUsers, setFormUsers] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigator = useNavigate();

  const handleInputChange = (e) => {
    setFormUsers({
      ...formUsers,
      [e.target.name]: e.target.value
    });
  }

  const registroUsers = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/crear', formUsers);
      console.log(response.data);
      setFormUsers({
        name: '',
        email: '',
        password: ''
      });
      navigator('/');
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

  return (
    <div>
      <h1>Registrar Usuario</h1>
      <form onSubmit={registroUsers} className='flex flex-col'>
        <div className="divs-input-select    grid grid-cols-2 gap-4">{/* grid md:grid-cols-2 sm:flex sm:flex-col sm:gap-4 */}
          <div className='divs-content m-1'>
            <Inputs type="text" name="name" placeholder="Nombre" onChange={handleInputChange} value={formUsers.nombre} className='input inputText    bg-white bg-opacity-30 border border-gray-300 rounded-full px-4 py-2 outline-none shadow-md text-black' />
          </div>
          <div className='divs-content m-1'>
            <Inputs type="email" name="email" placeholder="Email" onChange={handleInputChange} value={formUsers.email} className='input inputText    bg-white bg-opacity-30 border border-gray-300 rounded-full px-4 py-2 outline-none shadow-md text-black' />
          </div>
          <div className='divs-content m-1'>
            <Inputs type="password" name="password" placeholder="Contraseña" onChange={handleInputChange} value={formUsers.password} className='input inputText    bg-white bg-opacity-30 border border-gray-300 rounded-full px-4 py-2 outline-none shadow-md text-black' />
          </div>
        </div>
        <div className='divs-content m-1'>
          <Boton className={'button    bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-white font-bold py-2 px-4 rounded-full mx-auto'}>Guardar</Boton>
        </div>
      </form>
      {/* <Forms
        registraUser={formUsers}
        onChange={handleInputChange}
        onSubmit={registroUsers}
      /> */}
    </div>
  )
}

export default RegisterUser
