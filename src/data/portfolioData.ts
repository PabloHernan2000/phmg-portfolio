import { ProjectSystem, WarStory, ExperienceItem, AudioTrack } from '../types';

export const SYSTEM_METRICS = [
  { label: 'Usuarios en Plataforma Estatal', value: '70,000+', delta: 'Transporte Público Activo', badge: 'Alta Concurrencia' },
  { label: 'Latencia P99 con Redis', value: '< 35ms', delta: '-85% Carga a DB', badge: 'Caché en Capas' },
  { label: 'Seguridad y Enrolamiento', value: 'Zero-Trust', delta: 'Biometría + Hashes', badge: 'Ciberseguridad' },
  { label: 'Disponibilidad en Linux', value: '99.98%', delta: 'Nginx + PM2 + Rocky', badge: 'Misión Crítica' },
];

export const CORE_PROJECTS: ProjectSystem[] = [
  {
    id: 'transit-api',
    name: 'Urban Transit Core API',
    repoUrl: 'https://github.com/PabloHernan2000/portfolio-demo-urban-transit-api',
    role: 'Backend Distributed Architecture',
    tagline: 'API REST modular de alto rendimiento con Inyección de Dependencias y Caché Redis.',
    architecture: 'Modular Layered Architecture (Domain, Application, Infrastructure)',
    layer: 'Core API',
    stack: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'],
    metrics: [
      { label: 'RPS Sostenido', value: '1,450 req/s' },
      { label: 'Cache Hit Ratio', value: '94.2%' },
      { label: 'Tiempo Respuesta Caché', value: '4ms' },
    ],
    securityHighlights: [
      'Inyección de dependencias estricta para aislamiento de pruebas unitarias',
      'Rate-limiting distribuido por IP y token de pasajero',
      'Sanitización de parámetros y mitigación de OWASP Top 10',
      'Transacciones ACID seguras en PostgreSQL',
    ],
    description: 'Servicio neurálgico que procesa las rutas, paradas, itinerarios y frecuencias del sistema de transporte urbano metropolitano. Implementa estrategias de invalidación de caché inteligentes con Redis para soportar picos masivos de consulta en horas pico sin degradar la base de datos relacional.',
    codeSnippet: {
      filename: 'src/services/TransitRouteService.ts',
      language: 'typescript',
      code: `export class TransitRouteService implements IRouteService {
  constructor(
    private readonly routeRepo: IRouteRepository,
    private readonly cache: ICacheManager,
    private readonly logger: ITelemetryLogger
  ) {}

  async getOptimizedRoute(routeId: string): Promise<TransitRoute> {
    const cacheKey = \`transit:route:\${routeId}:telemetry\`;
    const cached = await this.cache.get<TransitRoute>(cacheKey);
    if (cached) {
      this.logger.hit('cache', { routeId, latencyMs: 3.8 });
      return cached;
    }

    const route = await this.routeRepo.findByIdWithFrequencies(routeId);
    if (!route) throw new RouteNotFoundError(routeId);

    await this.cache.set(cacheKey, route, { ttlSeconds: 300 });
    return route;
  }
}`
    }
  },
  {
    id: 'transit-ops-portal',
    name: 'Transit Operations Portal',
    repoUrl: 'https://github.com/PabloHernan2000/demo-transit-ops-portal',
    role: 'Central Dispatch & Realtime Dashboard',
    tagline: 'Centro de control operativo con monitoreo en tiempo real, WebSockets y matrices de riesgo.',
    architecture: 'Feature-Sliced Frontend con WebSockets y State Machine',
    layer: 'Central Ops',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'WebSockets', 'Chart.js'],
    metrics: [
      { label: 'Frecuencia Telemetría', value: '500ms' },
      { label: 'Rutas Monitoreadas', value: '42 Líneas' },
      { label: 'Exportación de Reportes', value: 'PDF & Excel' },
    ],
    securityHighlights: [
      'Control de Acceso Basado en Roles (RBAC) con tokens seguros',
      'Trazabilidad auditable de despachos y cambios de frecuencias',
      'Protección contra Clickjacking y sanitización estricta de DOM',
    ],
    description: 'Consola web operativa para despachadores y supervisores de transporte. Permite visualizar la posición de los autobuses, gestionar incidentes en tiempo real, asignar matrices de riesgo y generar reportes ejecutivos en PDF y Excel para la toma de decisiones cívicas.',
    codeSnippet: {
      filename: 'src/features/dispatch/useLiveFleetTelemetry.ts',
      language: 'typescript',
      code: `export function useLiveFleetTelemetry(lineId: string) {
  const [fleetState, setFleetState] = useState<FleetSnapshot>({ buses: [], alertLevel: 'NOMINAL' });

  useEffect(() => {
    const socket = new WebSocketGateway(\`/ws/lines/\${lineId}/telemetry\`);
    socket.on('FLEET_SYNC', (update: FleetTelemetryPacket) => {
      setFleetState(prev => ({
        ...prev,
        buses: reconcileFleetPosition(prev.buses, update),
        lastHeartbeat: Date.now()
      }));
    });
    return () => socket.disconnect();
  }, [lineId]);

  return fleetState;
}`
    }
  },
  {
    id: 'metrotransit-mobile',
    name: 'Metrotransit Mobile App',
    repoUrl: 'https://github.com/PabloHernan2000/demo-metrotransit-mobile',
    role: 'Edge Passenger Experience',
    tagline: 'Aplicación móvil para ciudadanos con geolocalización, itinerarios y tarjeta digital.',
    architecture: 'Offline-First React Native con sincronización adaptativa',
    layer: 'Mobile Edge',
    stack: ['React Native', 'TypeScript', 'AsyncStorage', 'Google Maps API', 'Push Notifications'],
    metrics: [
      { label: 'Usuarios Objetivo', value: '70,000+' },
      { label: 'Soporte Offline', value: '100% Rutas' },
      { label: 'Consumo de Batería', value: '< 2.5%/hora' },
    ],
    securityHighlights: [
      'Almacenamiento seguro cifrado en dispositivo (Secure Storage)',
      'Códigos QR dinámicos con marcas de tiempo efímeras (anti-clonación)',
      'Comunicaciones protegidas mediante Certificate Pinning',
    ],
    description: 'Aplicación nativa para los pasajeros del transporte público del estado. Permite consultar llegadas de autobuses con geolocalización satelital, planificar trasbordos, recibir alertas de contingencias y gestionar su saldo de transporte con seguridad bancaria.',
    codeSnippet: {
      filename: 'src/services/DynamicPassGenerator.ts',
      language: 'typescript',
      code: `export class DynamicPassGenerator {
  static generateEphemeralToken(userId: string, secretKey: string): string {
    const epochStep = Math.floor(Date.now() / 30000); // 30s TOTP Window
    const payload = \`\${userId}:\${epochStep}\`;
    const signature = crypto.createHmac('sha256', secretKey).update(payload).digest('hex');
    return \`METRO_\${payload}:\${signature.slice(0, 16)}\`;
  }
}`
    }
  },
  {
    id: 'biometric-enrollment',
    name: 'Biometric Enrollment & Identity Shield',
    repoUrl: 'https://github.com/PabloHernan2000/portfolio-demo-biometric-enrollment-service',
    role: 'Cybersecurity & Cryptographic Verification',
    tagline: 'Microservicio de enrolamiento biométrico con hash unidireccional y preservación de privacidad.',
    architecture: 'Zero-Knowledge Biometric Vault & Audit Ledger',
    layer: 'Security Shield',
    stack: ['TypeScript', 'Node.js', 'Web Crypto API', 'PostgreSQL', 'Argon2id', 'Redis'],
    metrics: [
      { label: 'Tiempo de Verificación', value: '< 85ms' },
      { label: 'Falsos Positivos', value: '0.0001%' },
      { label: 'Cifrado en Reposo', value: 'AES-256-GCM' },
    ],
    securityHighlights: [
      'Plantillas biométricas procesadas exclusivamente como vectores no reversibles',
      'Cifrado de campos sensibles con claves rotativas en HSM simulado',
      'Registro inmutable de auditoría contra accesos no autorizados',
    ],
    description: 'Servicio diseñado para la acreditación segura de conductores y usuarios prioritarios. Convierte características biométricas en representaciones matemáticas seguras, impidiendo la reconstrucción de la huella o rostro y asegurando cumplimiento riguroso con estándares de protección de datos personales.',
    codeSnippet: {
      filename: 'src/crypto/BiometricTemplateProtector.ts',
      language: 'typescript',
      code: `export class BiometricTemplateProtector {
  static async secureVaultTemplate(rawVector: Float32Array, salt: Buffer): Promise<EncryptedVaultRecord> {
    // Zero-knowledge irreversible projection
    const hashedVector = await argon2.hash(Buffer.from(rawVector.buffer), {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
      salt
    });

    return {
      templateHash: hashedVector,
      checksum: crypto.createHash('sha3-512').update(hashedVector).digest('hex'),
      enrolledAt: new Date().toISOString()
    };
  }
}`
    }
  }
];

export const WAR_STORIES: WarStory[] = [
  {
    id: 'dotnet-reverse-engineering',
    title: 'Rescate de Sistema de Avalúos (.NET a PHP 8 sin código fuente)',
    category: 'Reverse Engineering',
    period: 'Presidencia Municipal de Pachuca (2023 - 2024)',
    challenge: 'El sistema municipal de avalúos y recaudación inmobiliaria operaba sobre un binario compilado de .NET del cual la administración anterior perdió por completo el código fuente. La aplicación presentaba bloqueos y no permitía modificaciones fiscales.',
    solution: 'Realicé ingeniería inversa sobre los ejecutables y esquemas de base de datos SQL Server, analizando los flujos de cálculo tributario, tablas de depreciación y generación de documentos. Reconstruí desde cero toda la suite en PHP 8 moderno con Bootstrap y arquitectura por capas.',
    impact: 'Restauración del 100% de la continuidad operativa, eliminación de la dependencia de licencias propietarias y aumento de un 35% en la velocidad de emisión de avalúos.',
    before: '// Binario .NET sin código fuente (Caja Negra)\n// Riesgo crítico de interrupción en recaudación municipal\n// Procedimientos de cálculo inaccesibles\nError: Could not decompile assembly. Source missing.',
    after: '<?php declare(strict_types=1);\n// Arquitectura limpia en PHP 8 con Tipado Fuerte\nclass CadastralAppraisalEngine {\n    public function calculate(PropertyDetails $prop): AppraisalReceipt {\n        return $this->taxRuleMatrix->applyRate($prop->zone, $prop->sqMeters);\n    }\n}'
  },
  {
    id: 'php3-legacy-modernization',
    title: 'Modernización Arqueológica: Sistema de Multas de PHP 3 a PHP 8',
    category: 'Legacy Modernization',
    period: 'Presidencia Municipal de Pachuca (2023 - 2024)',
    challenge: 'Módulo municipal de multas y sanciones programado originalmente a finales de los años 90 en PHP 3 / PHP 4, plagado de variables globales (`register_globals`), sintaxis obsoleta y múltiples vulnerabilidades severas de inyección SQL.',
    solution: 'Refactorización total hacia PHP 8.2: implementación de sentencias preparadas PDO con SQL Server, validación estricta de esquemas de datos, saneamiento de entradas y estructuración de modelos de dominio.',
    impact: 'Cierre total de brechas de inyección SQL, compatibilidad con servidores Linux modernos y reducción a cero de incidencias en registros de pagos.',
    before: '<?php\n// PHP 3/4 Legacy con Inyección SQL directa\n$query = "SELECT * FROM multas WHERE folio = \'" . $HTTP_GET_VARS["folio"] . "\'";\n$result = mssql_query($query);\n// Inseguro, obsoleto y vulnerable',
    after: '<?php declare(strict_types=1);\n// PHP 8.2 Blindado con PDO y Sentencias Preparadas\n$stmt = $pdo->prepare("SELECT * FROM multas WHERE folio = :folio");\n$stmt->execute([":folio" => sanitizeFolio($request->query("folio"))]);\n$fine = $stmt->fetch(PDO::FETCH_ASSOC);'
  }
];

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    id: 'hidalgo-gov',
    company: 'Gobierno del Estado de Hidalgo',
    location: 'Pachuca de Soto, México',
    role: 'Desarrollador Full-Stack & Sistemas',
    period: 'Mar. 2024 – Actualidad',
    badge: 'Misión Crítica',
    achievements: [
      'Desarrollo y mantenimiento de plataforma estatal de transporte urbano dirigida a aproximadamente 70,000 usuarios registrados.',
      'Diseño e implementación de APIs REST con Node.js, Express y TypeScript mediante arquitectura modular con inyección de dependencias.',
      'Estrategias de caché con Redis para optimizar consultas de frecuencia intensiva y reducir solicitudes innecesarias hacia bases de datos.',
      'Integración de servicios de geolocalización, Google Maps, autenticación biométrica y notificaciones push para apps móviles.',
      'Desarrollo de módulos administrativos en React con Vite para control interno, matrices de riesgo y generación automatizada de reportes PDF y Excel.',
      'Despliegue y administración de servicios en producción sobre Linux (Rocky Linux) con Nginx y PM2.'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'React Native', 'Linux', 'Nginx', 'PM2']
  },
  {
    id: 'pachuca-gov',
    company: 'Presidencia Municipal de Pachuca de Soto',
    location: 'Pachuca de Soto, México',
    role: 'Desarrollador Web y Soporte de Sistemas',
    period: 'May. 2023 – Mar. 2024',
    badge: 'Rescate de Sistemas',
    achievements: [
      'Diseño y desarrollo de un sistema web Full-Stack de gestión de inventarios con React, Node.js, Express y SQL Server para bienes municipales.',
      'Modernización del sistema legacy de multas mediante migración de PHP 3 a PHP 8, elevando compatibilidad y seguridad.',
      'Reconstrucción mediante ingeniería inversa de un sistema de avalúos originalmente en .NET hacia PHP moderno y Bootstrap ante la ausencia de código fuente original.',
      'Restauración de módulos administrativos con SQL Server, procesamiento de datos y generación de reportes PDF de alta fidelidad.'
    ],
    technologies: ['React', 'Node.js', 'Express', 'SQL Server', 'PHP 8', 'Reverse Engineering', 'Bootstrap']
  },
  {
    id: 'uaeh-academic',
    company: 'Universidad Autónoma del Estado de Hidalgo (UAEH)',
    location: 'Mineral de la Reforma, Hidalgo',
    role: 'Desarrollador Full-Stack (Prácticas Profesionales)',
    period: 'Jul. 2022 – Dic. 2022',
    achievements: [
      'Extensión y mantenimiento del sistema web institucional con PHP, JavaScript, jQuery, Bootstrap y SQL Server.',
      'Desarrollo de módulos de consulta, filtrado, procesamiento y administración de información académica.',
      'Automatización de procesos administrativos con generación de reportes en Excel y PDF.'
    ],
    technologies: ['PHP', 'JavaScript', 'SQL Server', 'jQuery', 'Bootstrap']
  }
];

export const EDUCATION = [
  {
    degree: 'Maestría en Ciberseguridad',
    institution: 'UNIR México',
    period: 'Feb. 2026 – Actualidad',
    focus: 'Seguridad en Redes, Criptografía Aplicada, Gestión de Incidentes, Auditoría y Hardening.'
  },
  {
    degree: 'Licenciatura en Ciencias Computacionales',
    institution: 'Universidad Autónoma del Estado de Hidalgo (UAEH)',
    period: 'Dic. 2022',
    focus: 'Estructuras de Datos, Sistemas Distribuidos, Redes, Bases de Datos y Algorítmica.'
  }
];

export const AUDIO_PLAYLIST: AudioTrack[] = [
  { id: 'track-1', title: 'Suave (Lo-Fi Dev Cut)', artist: 'Inspirado en Luis Miguel', genre: 'Latin Lo-Fi Fusion', duration: '3:45', bpm: 92 },
  { id: 'track-2', title: 'La Incondicional (Synth Atmosphere)', artist: 'Inspirado en Luis Miguel', genre: 'Cyber Ambient', duration: '4:10', bpm: 84 },
  { id: 'track-3', title: 'Sol, Arena y Código', artist: 'Inspirado en Luis Miguel', genre: 'Acoustic Groove', duration: '3:20', bpm: 98 },
];

/**
 * CONFIGURACIÓN DE TU PLAYLIST DE SPOTIFY
 * 
 * Cuando crees tu playlist en Spotify:
 * 1. Dale a Compartir -> "Copiar enlace a la playlist"
 * 2. Pega ese enlace aquí en `playlistUrlOrId`:
 */
export const SPOTIFY_PLAYLIST_CONFIG = {
  title: 'Pablo Muñoz — Sound of Coding & Luis Miguel',
  description: 'Playlist curada especialmente para explorar este portafolio y programar con enfoque total.',
  playlistUrlOrId: 'https://open.spotify.com/playlist/6GV7FJfNjmasyEqyU7HzzX?si=Hld7XZXlScWVWfCswXeRAA&utm_source=copy-link&pi=QCv_JQr3S5CSI&pt_success=1&nd=1&dlsi=c87c7818fa1749ea', // Muestra: 'This Is Luis Miguel' oficial
};
