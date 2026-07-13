import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Obtiene y cachea un token de servicio (login admin en ms-usuarios) para
 * autenticar las llamadas salientes de ms-tickets hacia los demas microservicios.
 */
@Injectable()
export class ServiceAuthService {
  private readonly logger = new Logger(ServiceAuthService.name);
  private token: string | null = null;
  private expiresAt = 0;

  private readonly loginUrl: string;
  private readonly user: string;
  private readonly pass: string;

  constructor(private readonly config: ConfigService) {
    this.loginUrl =
      this.config.get<string>('MS_AUTH_LOGIN') ||
      'http://ms-usuarios:8080/api/auth/login';
    this.user = this.config.get<string>('SERVICE_USER') || 'admin';
    this.pass = this.config.get<string>('SERVICE_PASSWORD') || 'admin123';
  }

  async getToken(forceRefresh = false): Promise<string | null> {
    const now = Date.now();
    if (!forceRefresh && this.token && now < this.expiresAt) {
      return this.token;
    }

    try {
      const res = await fetch(this.loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.user, password: this.pass }),
      });

      if (!res.ok) {
        this.logger.error(`Login de servicio fallo: HTTP ${res.status}`);
        return null;
      }

      const data: any = await res.json();
      this.token = data.token;
      const ttl =
        typeof data.expiresIn === 'number' ? data.expiresIn : 3_600_000;
      // Renovar 1 minuto antes de que expire
      this.expiresAt = now + Math.max(ttl - 60_000, 60_000);
      this.logger.log('Token de servicio obtenido correctamente');
      return this.token;
    } catch (e) {
      this.logger.error(`Error obteniendo token de servicio: ${e}`);
      return null;
    }
  }
}
