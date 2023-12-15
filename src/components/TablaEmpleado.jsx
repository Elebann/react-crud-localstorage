import React from 'react'
import TrEmpleado from './TrEmpleado';

function TablaEmpleado({ emps, delEmp, setEmpleadoEditando }) {
  return (
    <>
      <h2 className='text-center mb-3'>Tabla de empleados</h2>
      <hr />
        <table className='table table-striped rounded overflow-hidden'>
          <thead className='bg-light'>
            <tr>
              <th>Rut</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Acción</th>
            </tr>
          </thead>
          {/* Ejemplo */}
          <tbody>
            {emps.length === 0 ? (
              <tr>
                <td colSpan="5">Aún no hay datos :c</td>
              </tr>
            ) : (
              emps.map(emp => (
                <TrEmpleado key={emp.id} emp={emp} delEmp={delEmp} setEmpleadoEditando={setEmpleadoEditando} />
              ))
            )}
          </tbody>
        </table>
    </>
  )
}

export default TablaEmpleado