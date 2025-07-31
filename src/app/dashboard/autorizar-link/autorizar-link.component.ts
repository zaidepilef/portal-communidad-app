import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-autorizar-link',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './autorizar-link.component.html',
  styleUrl: './autorizar-link.component.scss'
})
export class AutorizarLinkComponent {
  tokenGenerado = 'rtwert4353wrtw34wefras34';
  urlBase = window.location.origin;
  linkCompleto = '';

  constructor() {
    this.generarLink();
  }

  generarLink() {
    this.linkCompleto = `${this.urlBase}/auth/autorizar/${this.tokenGenerado}`;
  }

  copiarLink() {
    navigator.clipboard.writeText(this.linkCompleto).then(() => {
      alert('Enlace copiado al portapapeles');
    }).catch(err => {
      console.error('Error al copiar:', err);
    });
  }

  generarNuevoToken() {
    // Generar un token aleatorio
    this.tokenGenerado = this.generarTokenAleatorio();
    this.generarLink();
  }

  private generarTokenAleatorio(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let resultado = '';
    for (let i = 0; i < 32; i++) {
      resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return resultado;
  }
}
