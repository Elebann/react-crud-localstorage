import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import TablaEmpleado from './TablaEmpleado';

/* Local Storage key name */
const LS = "employees";

function FormEmpleado() {
  /* State for employees */
  const [emps, setEmps] = useState(() => {
    const storedEmps = localStorage.getItem(LS);
    return storedEmps ? JSON.parse(storedEmps) : [];
  });

  /* State for editing */
  const [empleadoEditando, setEmpleadoEditando] = useState(null);

  /* Set values to inputs when editing */
  React.useEffect(() => {
    if (empleadoEditando) {
      rutRef.current.value = empleadoEditando.rut;
      nomRef.current.value = empleadoEditando.nom;
      apeRef.current.value = empleadoEditando.ape;
      mailRef.current.value = empleadoEditando.mail;
    }
  }, [empleadoEditando]);

  /* tag inputs */
  const rutRef = useRef();
  const nomRef = useRef();
  const apeRef = useRef();
  const mailRef = useRef();

  /* Submit to LS */
  useEffect(() => {
    localStorage.setItem(LS, JSON.stringify(emps))
  }, [emps])

  const agregarEmp = (event) => {
    /* Prevent reload before save data */
    event.preventDefault();

    /* Get values from tagged inputs */
    const rutEmp = rutRef.current.value || (empleadoEditando ? empleadoEditando.rut : "");
    const nomEmp = nomRef.current.value || (empleadoEditando ? empleadoEditando.nom : "");
    const apeEmp = apeRef.current.value || (empleadoEditando ? empleadoEditando.ape : "");
    const mailEmp = mailRef.current.value || (empleadoEditando ? empleadoEditando.mail : "");

    /* Check if the fields are empty and throw an alert if so */
    if (!rutEmp || !nomEmp || !apeEmp || !mailEmp) {
      alert('Por favor, rellena todos los campos');
      return;
    }

    /* Set a fn wich receive the previous list to push the new employee */
    setEmps((prevEmps) => {
      /* Set emp dictionary */
      const empleado = { id: empleadoEditando ? empleadoEditando.id : uuid(), rut: rutEmp, nom: nomEmp, ape: apeEmp, mail: mailEmp }

      /* Check if isnt editing */
      if (empleadoEditando) {
        return prevEmps.map(emp => emp.id === empleado.id ? empleado : emp);
      }
      /* if not, add emp */
      else {
        return [...prevEmps, empleado]
      }
    })

    /* Reset the form */
    rutRef.current.value = null;
    nomRef.current.value = null;
    apeRef.current.value = null;
    mailRef.current.value = null;
    setEmpleadoEditando(null);
  }

  /* Function to delete emps */
  const delEmp = (id) => {
    setEmps(prevEmps => prevEmps.filter(emp => emp.id !== id));
  }

  return (
    <div className='row'>
      {/* Add Emp Form */}
      <div className="col-lg-6 col-sm-12">

        <h2 className='text-body text-center mb-3'>Agregar Empleado</h2>

        <hr />
        
        <form className='p-2 bg-body-secondary rounded container mb-3'>
          <label htmlFor="rut" className={empleadoEditando ? 'form-label text-danger' : 'form-label'}>
            {empleadoEditando ? 'Rut no se puede modificar' : 'Ingresar Rut'}
          </label>
          <input
            type="text"
            ref={rutRef}
            name="rut"
            id="rut"
            placeholder='Ingresar Rut'
            className='form-control mb-3'
            required
            disabled={empleadoEditando ? true : false}
            defaultValue={empleadoEditando ? empleadoEditando.rut : ''}
          />
          
          <label htmlFor="nom" className='form-label'>Nombre</label>
          <input
            type="text"
            ref={nomRef}
            name="nom"
            id="nom"
            placeholder='Ingresar Nombre'
            className='form-control mb-3'
            required
            defaultValue={empleadoEditando ? empleadoEditando.nom : ''}
          />

          <label htmlFor="ape" className='form-label'>Apellido</label>
          <input
            type="text"
            ref={apeRef}
            name="ape"
            id="ape"
            className='form-control mb-3'
            placeholder='Ingresar Apellido'
            required
            defaultValue={empleadoEditando ? empleadoEditando.ape : ''}
          />
          
          <label htmlFor="mail" className='form-label'>Correo Electrónico</label>
          <input
            type="email"
            ref={mailRef}
            name="mail"
            id="mail"
            placeholder='Ingresar Correo Electrónico'
            className='form-control mb-3'
            required
            defaultValue={empleadoEditando ? empleadoEditando.mail : ''}
          />

          <button
            className={empleadoEditando ? 'btn btn-primary' : 'btn btn-success'}
            onClick={agregarEmp}
          >
            {empleadoEditando ? 'Actualizar Empleado' : 'Agregar Empleado'}
          </button>
        </form>
      </div>

      {/* Show Emps Table and sending params */}
      <div className="col-lg-6 col-sm-12">
        <TablaEmpleado
          emps={emps}
          delEmp={delEmp}
          setEmpleadoEditando={setEmpleadoEditando}
        />
      </div>
    </div>
  )
}

export default FormEmpleado