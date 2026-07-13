import { Injectable, Logger } from '@nestjs/common';
import { ServiceAuthService } from './service-auth.service';

@Injectable()
export class HttpClientService {
    private readonly logger = new Logger(HttpClientService.name);

    constructor(private readonly auth: ServiceAuthService) {}

    private async authHeader(forceRefresh = false): Promise<Record<string, string>> {
        const token = await this.auth.getToken(forceRefresh);
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    async get<T>(url: string): Promise<T> {
        let response = await fetch(url, { headers: await this.authHeader() });
        if (response.status === 401 || response.status === 403) {
            response = await fetch(url, { headers: await this.authHeader(true) });
        }
        if (!response.ok) {
            this.logger.error(`GET ${url} failed: ${response.status} ${response.statusText}`);
            throw new Error(`Error fetching ${url}: ${response.statusText}`);
        }
        return response.json() as Promise<T>;
    }

    async post<T>(url: string, body: any): Promise<T> {
        const doPost = (headers: Record<string, string>) =>
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...headers },
                body: JSON.stringify(body),
            });
        let response = await doPost(await this.authHeader());
        if (response.status === 401 || response.status === 403) {
            response = await doPost(await this.authHeader(true));
        }
        if (!response.ok) {
            throw new Error(`POST ${url} failed: ${response.statusText}`);
        }
        return response.json() as Promise<T>;
    }

    async patch<T>(url: string, body?: any): Promise<T> {
        const doPatch = (headers: Record<string, string>) =>
            fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', ...headers },
                body: body ? JSON.stringify(body) : undefined,
            });
        let response = await doPatch(await this.authHeader());
        if (response.status === 401 || response.status === 403) {
            response = await doPatch(await this.authHeader(true));
        }
        if (!response.ok) {
            this.logger.error(`PATCH ${url} failed: ${response.status} ${response.statusText}`);
            throw new Error(`PATCH ${url} failed: ${response.statusText}`);
        }
        const text = await response.text();
        try {
            return JSON.parse(text) as T;
        } catch {
            return text as any as T;
        }
    }
}
