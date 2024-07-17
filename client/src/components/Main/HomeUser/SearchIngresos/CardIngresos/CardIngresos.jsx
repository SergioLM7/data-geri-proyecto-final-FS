import React from "react";

const CardIngresos = ({
  ingreso_id,
  medico,
  historia,
  nombre,
  apellido,
  sexo,
  edad,
  fecha_ingreso,
  fecha_alta,
  duracion_ingreso,
  diagnostico,
  barthel
}) => {
  return  <tr>
  <td>{ingreso_id}</td>
  <td>{medico}</td>
  <td>{historia}</td>
  <td>{nombre}</td>
  <td>{apellido}</td>
  <td>{sexo}</td>
  <td>{edad}</td>
  <td>{fecha_ingreso}</td>
  <td>{fecha_alta}</td>
  <td>{duracion_ingreso}</td>
  <td>{diagnostico}</td>
  <td>{barthel}</td>
</tr>
};

export default CardIngresos;