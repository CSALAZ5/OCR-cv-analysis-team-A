import { Component, ElementRef, ViewChild } from '@angular/core';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { CommonModule } from '@angular/common';
import { IColumnAttributes } from '@npm-bbta/bbog-dig-dt-webcomponents-lib/dist/types/components/sherpa-ml/bdb-ml-dynamic-table/ITablesAtributes';
import { ScanTalentServiceService } from '../../services/scan-talent-service.service'; // Import the detalleArchivoService
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent {
  @ViewChild("atToastElement1") atToastElement1!: ElementRef<HTMLBdbAtToastElement>;
  @ViewChild("fileInput") fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild("normalModal") normalModal!: ElementRef<HTMLBdbMlModalNormalElement>;


  accessKeyId = environment.accessKeyId;
  secretAccessKey = environment.secretAccessKey;


  data: any[] = [];

  selectedFile: File | null = null;
  private S3Client: S3Client;

  currentType = "";
  currentToastMessage = "";
  currentToastTitle = "";
  router: any;
  modalAbierto: boolean = false;
  detalleArchivo: any;


  constructor(private scanTalentService: ScanTalentServiceService) {
    this.S3Client = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey
      }
    });

  }



  columnasTablaArchivos: IColumnAttributes[] = [
    { "colName": "", "control": "id" },
    { "colName": "Nombre", "control": "text" },
    { "colName": "Fecha", "control": "text" },
    { "colName": "", "control": "ico-action" }
  ];

  onFileSelected(event: Event): void {
    console.log('Evento:', event);
    const target = event.target as HTMLInputElement;
    console.log('Elemento:', target);
    console.log('Archivos:', target.files ? target.files[0] : null);
    this.selectedFile = target.files ? target.files[0] : null;
    console.log('Archivo seleccionado:', this.selectedFile);

    // Solo llama a upload() si hay un archivo seleccionado
    if (this.selectedFile) {
      this.upload();
    } else {
      console.log('No hay archivo seleccionado.');
    }
  }

  async upload(): Promise<void> {
    if (this.selectedFile) {
      const params = {
        Bucket: 's3ocrteama',
        Key: this.selectedFile.name,
        Body: this.selectedFile,
      };

      try {
        const command = new PutObjectCommand(params);
        const response = await this.S3Client.send(command);
        console.log('Archivo subido con éxito:', response);
        this.showToast('success', 'Archivo subido con éxito', 'Subir archivo');
        this.insertaEnTabla(this.selectedFile);
        this.resetFileInput();
      } catch (err) {
        this.showToast('error', 'Error al subir el archivo', 'Subir archivo');
        this.resetFileInput();
        console.error('Error al subir el archivo:', err);
      }
    } else {
      console.log('No se ha seleccionado ningún archivo.');
    }
  }


  public showToast(type: string, message: string, title: string) {
    this.currentToastTitle = title;
    this.currentType = type;
    this.currentToastMessage = message;
    this.atToastElement1.nativeElement.show();
  }

  insertaEnTabla(file: File) {
    console.log('Insertando en tabla:', this.data.length + 1, file.name, new Date().toLocaleDateString());
    const nuevoElemento = {
      id: this.data.length + 1,
      nombre: file.name,
      fecha: new Date().toLocaleDateString('es', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      action: 'ico-open-view'
    };

    // Tratando los cambios de manera inmutable
    this.data = [...this.data, nuevoElemento];
    console.log('Tabla actualizada:', this.data);
  }

  resetFileInput() {
    this.selectedFile = null;
    this.fileInput.nativeElement.value = "";
  }

  //Función que abre la pantalla de Detalle Renovacion
  abrirDetalleArchivo(event: any) {
    const registroEncontrado = this.data.find(registro => registro.id === event.detail.data.id);
    console.log('Registro encontrado:', registroEncontrado);
    if (registroEncontrado) {
      const idArchivo = registroEncontrado.id;
      if (!idArchivo) {
        this.showToast("INFO", "El sistema aún no ha generado análisis", "Análisis en proceso.");
      } else {
        this.getDetalleArchivo(registroEncontrado.name);
        this.normalModal.nativeElement.openModal();
      }
    }
  }


  getDetalleArchivo(name: any) {
    this.scanTalentService.getDetalleArchivo().subscribe((data: any) => {
      console.log('Data:', data);
      this.detalleArchivo = data.find((registro: any) => registro.name === name);
    });
  }

  cerrarModal() {
    this.modalAbierto = false;
  }
}
