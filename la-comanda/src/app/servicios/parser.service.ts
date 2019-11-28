import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  constructor() { }

  public parseDateTimeToStringDateTime(date: Date) {
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const anio = date.getFullYear();
    const hora = date.getHours();
    const minutos = date.getMinutes();
    const stringFecha: string = dia + '/' + mes + '/' + anio + ' ' + hora + ':' + minutos;
    return stringFecha;
  }

  public parseDateTimeToStringHora(date: Date) {
    const hora = date.getHours();
    const minutos = date.getMinutes();
    const stringHora: string = hora + ':' + minutos;
    return stringHora;
  }

  public parseStringDateToDateTime(stringDate: string) {
    const fecha = stringDate.split('/', stringDate.length);
    const dia = parseInt(fecha[0], 10);
    const mes = parseInt(fecha[1], 10);
    const aniooHora = fecha[2].split(' ', fecha[2].length);
    const anio = parseInt(aniooHora[0], 10);
    const horario = aniooHora[1].split(':', aniooHora[1].length);
    const hora = parseInt(horario[0], 10);
    const minutos = parseInt(horario[1], 10);
    const date = new Date();
    date.setDate(dia);
    date.setMonth(mes - 1);
    date.setFullYear(anio);
    date.setHours(hora, minutos);
    return date;
  }

  public compararFechaHoraMayorAHoy(fecha: string) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0);
    const parserReserva = this.parseStringDateToDateTime(fecha);
    return parserReserva > hoy;
  }

  public compararFechaHoraMenorUnAnio(fecha: string) {
    const unAnio = new Date();
    unAnio.setHours(0, 0, 0);
    unAnio.setUTCFullYear(unAnio.getUTCFullYear() + 1);
    const parserReserva = this.parseStringDateToDateTime(fecha);
    return parserReserva < unAnio;
  }
}
