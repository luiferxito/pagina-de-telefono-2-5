import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateFinalPrice,
  calculateSavings,
  calculateFinancingMonthly,
  getDeliveryEstimate,
  analyzePostalCode,
  getTotalInspectionPoints,
} from './pricing';

test('calculateFinalPrice computes correct base refurbished price', () => {
  const price = calculateFinalPrice(879, 'refurbished_excellent', '128GB');
  assert.equal(price, 879);
});

test('calculateFinalPrice adds storage upgrade surcharge', () => {
  const price256 = calculateFinalPrice(699, 'refurbished_excellent', '256GB');
  assert.equal(price256, 789); // 699 + 90

  const price512 = calculateFinalPrice(549, 'refurbished_excellent', '512GB');
  assert.equal(price512, 759); // 549 + 210
});

test('calculateFinalPrice handles brand new condition multiplier', () => {
  const priceNew = calculateFinalPrice(879, 'new', '128GB');
  assert.equal(priceNew, Math.round(879 * 1.15)); // 1011
});

test('calculateSavings computes positive savings vs official RRP', () => {
  const savings = calculateSavings(959, 879);
  assert.equal(savings.amount, 80);
  assert.equal(savings.percentage, 8); // Math.round((80 / 959) * 100)
});

test('calculateFinancingMonthly divides exactly across 12 months with 0% TAE', () => {
  const finance = calculateFinancingMonthly(1200, 12);
  assert.equal(finance.monthlyAmount, 100);
  assert.equal(finance.tae, 0);
  assert.equal(finance.formatted, '100.00 €/mes');
});

test('calculateFinancingMonthly handles 6 and 10 months', () => {
  const finance6 = calculateFinancingMonthly(600, 6);
  assert.equal(finance6.monthlyAmount, 100);

  const finance10 = calculateFinancingMonthly(699, 10);
  assert.equal(finance10.monthlyAmount, 69.9);
});

test('getDeliveryEstimate distinguishes store pickup vs courier', () => {
  const pickup = getDeliveryEstimate(true, 14, false);
  assert.match(pickup.title, /Recogida en tienda/);
  assert.match(pickup.subtitle, /60 minutos/);

  const courierBeforeCutoff = getDeliveryEstimate(false, 14, false);
  assert.match(courierBeforeCutoff.title, /24 h/);
  assert.match(courierBeforeCutoff.badge, /Entrega mañana/);
});

test('analyzePostalCode correctly identifies Seville zip codes', () => {
  const seville = analyzePostalCode('41018');
  assert.equal(seville.isValid, true);
  assert.equal(seville.isSeville, true);

  const madrid = analyzePostalCode('28001');
  assert.equal(madrid.isValid, true);
  assert.equal(madrid.isSeville, false);

  const invalid = analyzePostalCode('123');
  assert.equal(invalid.isValid, false);
});

test('getTotalInspectionPoints totals 50 points of testing', () => {
  const total = getTotalInspectionPoints();
  assert.equal(total, 50);
});
