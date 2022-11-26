export const obtenerMesLiteral = (fecha) => {
    const f = new Date(fecha);
    const month = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    return month[f.getMonth()];
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
    return f.getDate();
}

export const obtenerGestion = (fecha) => {
    const f = new Date(fecha);
    return f.getFullYear();
}