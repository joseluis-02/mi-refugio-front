export const obtenerMesLiteral = (fechaISO) => {
     // Crear un objeto Date a partir de la cadena ISO 8601
  const fecha = new Date(fechaISO);

  // Definir los nombres de los meses en español
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio", 
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  const mes = meses[fecha.getUTCMonth()]; // getMonth() retorna un valor de 0 a 11
  return mes;
}
export const obtenerSemanaLiteral = (fecha) => {
    const f = new Date(fecha);
    const weekday = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
    return weekday[f.getUTCDay()];
}
export const obtenerHoraLocal = (fecha) => {
    const f = new Date(fecha);
    return f.toLocaleTimeString('en-US');
}

export const obtenerDia = (fecha) => {
    const f = new Date(fecha);
    // Obtener el día, mes y año
    return f.getUTCDate();
}

export const obtenerGestion = (fecha) => {
    const f = new Date(fecha);
    return f.getUTCFullYear();
}