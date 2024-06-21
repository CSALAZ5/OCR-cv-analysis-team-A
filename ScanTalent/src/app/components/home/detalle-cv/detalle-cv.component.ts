import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-cv',
  templateUrl: './detalle-cv.component.html',
  styleUrls: ['./detalle-cv.component.scss']
})
export class DetalleCvComponent implements OnInit{

  @Input() detalleArchivosinFormato: any;

  ngOnInit(): void {
    this.detalleArchivo = traducirJSONaDetalleArchivo(this.detalleArchivosinFormato);
  }

  detalleArchivo = {
    nombreCandidato: '',
    contacto: {
      telefono: '',
      correoElectronico: ''
    },
    perfilProfesional: '',
    experienciaLaboral: [
      {
        empresa: '',
        cargo: '',
        periodoTrabajo: '',
        descripcionResponsabilidades: ''
      }
    ],
    educacion: [
      {
        gradoAcademico: '',
        institucion: '',
        periodoEstudio: ''
      }
    ],
    habilidades: [''],
  };

}

interface ExperienciaLaboral {
  empresa?: string;
  cargo?: string;
  periodoTrabajo?: string;
  descripcionResponsabilidades?: string[];
}

interface Educacion {
  gradoAcademico?: string;
  institucion?: string;
  periodoEstudio?: string;
}

interface DetalleArchivo {
  nombreCandidato: string;
  contacto: {
    telefono: string;
    correoElectronico: string;
  };
  perfilProfesional: string;
  experienciaLaboral: {
    empresa: string;
    cargo: string;
    periodoTrabajo: string;
    descripcionResponsabilidades: string;
  }[];
  educacion: {
    gradoAcademico: string;
    institucion: string;
    periodoEstudio: string;
  }[];
  habilidades: string[];
  certificaciones: string[];
  nombre: string; // Add the 'nombre' property
}

function traducirJSONaDetalleArchivo(jsonEntrada: any): DetalleArchivo {
  const detalleArchivo: DetalleArchivo = {
    nombreCandidato: jsonEntrada.info.M.data.M.nombre_del_candidato.S,
    experienciaLaboral: jsonEntrada.info.M.data.M.experiencia_laboral.L.map((exp: any) => ({
      empresa: exp.M.empresa.S,
      cargo: exp.M.cargo.S,
      periodoTrabajo: exp.M.periodo_trabajo.S,
      descripcionResponsabilidades: exp.M.responsabilidades.L.map((resp: any) => resp.S),
    })),
    educacion: jsonEntrada.info.M.data.M.educacion.L.map((edu: any) => ({
      gradoAcademico: edu.M.grado_academico.S,
      institucion: edu.M.institucion.S,
      periodoEstudio: edu.M.periodo_estudio.S,
    })),
    habilidades: jsonEntrada.info.M.data.M.habilidades.L.map((hab: any) => hab.S),
    certificaciones: jsonEntrada.info.M.data.M.certificaciones.L.map((cert: any) => cert.S),
    contacto: {
      telefono: '',
      correoElectronico: ''
    },
    perfilProfesional: '',
    nombre: ''
  };

  return detalleArchivo;
}
