/**
 * Pure calculation logic for Celucosta iPhone store:
 * - Pricing by model, condition and storage tier
 * - Savings comparison against official retail price (PVP original)
 * - 0% TAE Financing installments calculator
 * - Shipping and pickup delivery time estimation
 * - 50-point inspection validation
 */

export type DeviceCondition = 'new' | 'refurbished_excellent' | 'refurbished_very_good';
export type StorageTier = '128GB' | '256GB' | '512GB';

export interface PhoneModelConfig {
  id: string;
  name: string;
  tagline: string;
  basePrice: number; // 128GB Refurbished
  officialRrpNew: number; // Apple Official PVP for comparison
  releaseYear: number;
  chip: string;
  screen: string;
  camera: string;
  batteryHealthText: string;
  availableColors: { name: string; hex: string; bgClass: string }[];
}

export const PHONE_CATALOG: PhoneModelConfig[] = [
  {
    id: 'iphone-16',
    name: 'iPhone 16',
    tagline: 'Chip A18 Bionic, Control de Cámara y pantalla Super Retina XDR',
    basePrice: 879,
    officialRrpNew: 959,
    releaseYear: 2024,
    chip: 'A18 Bionic con Neural Engine de 16 núcleos',
    screen: 'OLED Super Retina XDR de 6,1" con Dynamic Island',
    camera: 'Sistema de doble cámara Fusion 48 Mpx con teleobjetivo 2x',
    batteryHealthText: '100% de capacidad máxima garantizada',
    availableColors: [
      { name: 'Negro', hex: '#1f2022', bgClass: 'bg-neutral-900' },
      { name: 'Blanco', hex: '#f0ece7', bgClass: 'bg-stone-200' },
      { name: 'Azul Ultramar', hex: '#375b8a', bgClass: 'bg-blue-800' },
      { name: 'Verde Azulado', hex: '#729896', bgClass: 'bg-teal-700' },
      { name: 'Rosa', hex: '#de99a9', bgClass: 'bg-pink-300' },
    ],
  },
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    tagline: 'Dynamic Island, cámara principal de 48 Mpx y puerto USB-C',
    basePrice: 699,
    officialRrpNew: 859,
    releaseYear: 2023,
    chip: 'A16 Bionic con GPU de 5 núcleos',
    screen: 'OLED Super Retina XDR de 6,1" con Dynamic Island',
    camera: 'Cámara principal de 48 Mpx + Gran angular de 12 Mpx',
    batteryHealthText: 'Batería original testada al 92% - 100%',
    availableColors: [
      { name: 'Negro', hex: '#26292b', bgClass: 'bg-neutral-800' },
      { name: 'Azul', hex: '#cfdae2', bgClass: 'bg-sky-200' },
      { name: 'Verde', hex: '#d1dbd0', bgClass: 'bg-emerald-200' },
      { name: 'Amarillo', hex: '#f4e8c1', bgClass: 'bg-amber-100' },
      { name: 'Rosa', hex: '#ecd1d1', bgClass: 'bg-rose-200' },
    ],
  },
  {
    id: 'iphone-14',
    name: 'iPhone 14',
    tagline: 'Rendimiento contrastado, doble cámara avanzada y gran autonomía',
    basePrice: 549,
    officialRrpNew: 739,
    releaseYear: 2022,
    chip: 'A15 Bionic con GPU de 5 núcleos',
    screen: 'OLED Super Retina XDR de 6,1"',
    camera: 'Doble cámara de 12 Mpx con modo Cine y Acción',
    batteryHealthText: 'Batería original testada al 88% - 98%',
    availableColors: [
      { name: 'Medianoche', hex: '#1b2229', bgClass: 'bg-slate-900' },
      { name: 'Blanco Estrella', hex: '#faf7f2', bgClass: 'bg-amber-50' },
      { name: 'Azul', hex: '#a0b4c7', bgClass: 'bg-blue-300' },
      { name: 'Púrpura', hex: '#e3d7e5', bgClass: 'bg-purple-200' },
      { name: '(PRODUCT)RED', hex: '#b51d29', bgClass: 'bg-red-600' },
    ],
  },
];

export const STORAGE_SURCHARGES: Record<StorageTier, number> = {
  '128GB': 0,
  '256GB': 90,
  '512GB': 210,
};

export const CONDITION_MULTIPLIERS: Record<DeviceCondition, { priceModifier: number; label: string; badge: string }> = {
  new: {
    priceModifier: 1.15,
    label: 'Nuevo a estrenar',
    badge: 'Precintado con 3 años de garantía oficial',
  },
  refurbished_excellent: {
    priceModifier: 1.0,
    label: 'Reacondicionado Excelente (Grado A+)',
    badge: 'Sin marcas visibles, pantalla impoluta, 12 meses garantía',
  },
  refurbished_very_good: {
    priceModifier: 0.92,
    label: 'Reacondicionado Muy Bueno (Grado A)',
    badge: 'Micro-marcas imperceptibles a 20cm, 12 meses garantía',
  },
};

/**
 * Calculates total final price rounded to nearest Euro integer.
 */
export function calculateFinalPrice(
  basePrice: number,
  condition: DeviceCondition,
  storage: StorageTier
): number {
  const conditionInfo = CONDITION_MULTIPLIERS[condition] || CONDITION_MULTIPLIERS.refurbished_excellent;
  const storageExtra = STORAGE_SURCHARGES[storage] ?? 0;
  const calculated = Math.round((basePrice * conditionInfo.priceModifier) + storageExtra);
  return calculated;
}

/**
 * Calculates estimated savings against official original retail price.
 */
export function calculateSavings(officialRrpNew: number, finalPrice: number): { amount: number; percentage: number } {
  const savingsAmount = Math.max(0, officialRrpNew - finalPrice);
  const percentage = Math.round((savingsAmount / officialRrpNew) * 100);
  return { amount: savingsAmount, percentage };
}

/**
 * Calculates monthly payments for 0% TAE financing in 3, 6, 10 or 12 months.
 */
export function calculateFinancingMonthly(totalAmount: number, months: number): {
  monthlyAmount: number;
  totalCost: number;
  tae: number;
  formatted: string;
} {
  const validMonths = [3, 6, 10, 12].includes(months) ? months : 12;
  const rawMonthly = totalAmount / validMonths;
  const monthlyAmount = Math.round(rawMonthly * 100) / 100;
  return {
    monthlyAmount,
    totalCost: totalAmount,
    tae: 0.0,
    formatted: `${monthlyAmount.toFixed(2)} €/mes`,
  };
}

/**
 * Determines estimated delivery text based on order hour and mode.
 * Sevilla store pickup is ready in 60 minutes.
 * 24h Courier shipping to mainland Spain if placed before 17:00h.
 */
export function getDeliveryEstimate(
  isPickupInStore: boolean,
  currentHour: number = 11,
  isWeekend: boolean = false
): { title: string; subtitle: string; badge: string } {
  if (isPickupInStore) {
    return {
      title: 'Recogida en tienda Sevilla-Nervión',
      subtitle: 'Listo en 60 minutos en Calle Luis de Morales. Te avisamos por SMS/WhatsApp.',
      badge: 'Recogida gratis hoy',
    };
  }

  if (isWeekend) {
    return {
      title: 'Envío urgente 24 h a domicilio',
      subtitle: 'Se prepara en almacén el lunes a primera hora y te llega el martes antes de las 14:00.',
      badge: 'Envío gratis asegurado',
    };
  }

  if (currentHour < 17) {
    return {
      title: 'Envío urgente en 24 h',
      subtitle: 'Si pides hoy antes de las 17:00, te llega mañana antes de las 14:00 por mensajería asegurada.',
      badge: 'Entrega mañana garantizada',
    };
  }

  return {
    title: 'Envío urgente en 24-48 h',
    subtitle: 'Sale de nuestra tienda de Nervión mañana a primera hora y se entrega al día siguiente.',
    badge: 'Envío gratuito asegurado',
  };
}

/**
 * Validates Spanish postal code format (5 digits).
 * Checks if code belongs to Seville (prefix 41).
 */
export function analyzePostalCode(zip: string): {
  isValid: boolean;
  isSeville: boolean;
  message: string;
} {
  const clean = zip.trim();
  if (!/^\d{5}$/.test(clean)) {
    return {
      isValid: false,
      isSeville: false,
      message: 'Introduce un código postal válido de 5 dígitos.',
    };
  }

  const isSeville = clean.startsWith('41');
  return {
    isValid: true,
    isSeville,
    message: isSeville
      ? '¡Enhorabuena! Estás en Sevilla: entrega exprés 24h o recogida en tienda Nervión en 60 minutos.'
      : 'Envío gratis asegurado en 24 h a toda la península.',
  };
}

export interface InspectionCategory {
  title: string;
  pointsCount: number;
  items: string[];
}

export const INSPECTION_CATEGORIES: InspectionCategory[] = [
  {
    title: 'Pantalla y Respuesta Táctil',
    pointsCount: 8,
    items: ['Brillo y contraste OLED original', 'Táctil multipunto sin zonas muertas', 'True Tone operativo', 'Protección oleofóbica'],
  },
  {
    title: 'Batería y Gestión Energética',
    pointsCount: 6,
    items: ['Salud superior al 85% o 100% en nuevos', 'Ciclos de carga certificados', 'Carga rápida por cable y MagSafe'],
  },
  {
    title: 'Cámaras y Sensores Ópticos',
    pointsCount: 10,
    items: ['Enfoque automático y estabilización OIS', 'Cámara Ultra Gran Angular', 'Grabación 4K a 60 fps', 'Sensor LiDAR y flash True Tone'],
  },
  {
    title: 'Seguridad y Conectividad',
    pointsCount: 12,
    items: ['Face ID biométrico instantáneo', 'Módem 5G y Wi-Fi 6', 'Bluetooth 5.3', 'Chip UWB banda ultraancha', 'NFC y Apple Pay'],
  },
  {
    title: 'Audio, Micrófonos y Chasis',
    pointsCount: 14,
    items: ['Altavoces estéreo sin distorsión', 'Cancelación de ruido en llamadas', 'Botón de acción / conmutador', 'Sellado antipolvo', 'Puerto USB-C / Lightning limpio'],
  },
];

export function getTotalInspectionPoints(): number {
  return INSPECTION_CATEGORIES.reduce((acc, cat) => acc + cat.pointsCount, 0);
}
