import React from 'react'

function TrEmpleado({ emp, delEmp, setEmpleadoEditando }) {
  return (
    <tr>
      <td>{emp.rut}</td>
      <td>{emp.nom}</td>
      <td>{emp.ape}</td>
      <td>{emp.mail}</td>
      <td className='d-flex gap-2 flex-wrap'>
        <button
          className='btn btn-primary'
          onClick={() => setEmpleadoEditando(emp)}
        >
          Editar
        </button>

        <button
          className='btn btn-danger'
          onClick={() => delEmp(emp.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default TrEmpleado