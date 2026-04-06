import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatDateToLocal,
  generatePagination,
  generateYAxis,
} from '../utils';

describe('formatCurrency', () => {
  it('formats cents to USD currency string', () => {
    expect(formatCurrency(10000)).toBe('$100.00');
  });

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('formats small amounts', () => {
    expect(formatCurrency(99)).toBe('$0.99');
  });

  it('formats large amounts with commas', () => {
    expect(formatCurrency(1234567)).toBe('$12,345.67');
  });
});

describe('formatDateToLocal', () => {
  it('formats a date string to a human-readable format', () => {
    const result = formatDateToLocal('2023-11-14');
    expect(result).toContain('Nov');
    expect(result).toContain('2023');
  });

  it('formats another date string', () => {
    const result = formatDateToLocal('2022-06-15');
    expect(result).toContain('Jun');
    expect(result).toContain('2022');
  });

  it('returns a string', () => {
    expect(typeof formatDateToLocal('2023-01-01')).toBe('string');
  });
});

describe('generateYAxis', () => {
  it('generates correct y-axis labels from revenue data', () => {
    const revenue = [
      { month: 'Jan', revenue: 2000 },
      { month: 'Feb', revenue: 1800 },
      { month: 'Mar', revenue: 2200 },
    ];
    const { yAxisLabels, topLabel } = generateYAxis(revenue);

    expect(topLabel).toBe(3000);
    expect(yAxisLabels).toEqual(['$3K', '$2K', '$1K', '$0K']);
  });

  it('handles large revenue values', () => {
    const revenue = [{ month: 'Jan', revenue: 9500 }];
    const { yAxisLabels, topLabel } = generateYAxis(revenue);

    expect(topLabel).toBe(10000);
    expect(yAxisLabels).toHaveLength(11);
    expect(yAxisLabels[0]).toBe('$10K');
    expect(yAxisLabels[yAxisLabels.length - 1]).toBe('$0K');
  });

  it('handles revenue at exact thousand boundaries', () => {
    const revenue = [{ month: 'Jan', revenue: 5000 }];
    const { topLabel } = generateYAxis(revenue);
    expect(topLabel).toBe(5000);
  });
});

describe('generatePagination', () => {
  it('shows all pages when total is 7 or less', () => {
    expect(generatePagination(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(generatePagination(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('shows first pages with ellipsis when current page is near start', () => {
    expect(generatePagination(1, 10)).toEqual([1, 2, 3, '...', 9, 10]);
    expect(generatePagination(2, 10)).toEqual([1, 2, 3, '...', 9, 10]);
    expect(generatePagination(3, 10)).toEqual([1, 2, 3, '...', 9, 10]);
  });

  it('shows last pages with ellipsis when current page is near end', () => {
    expect(generatePagination(10, 10)).toEqual([1, 2, '...', 8, 9, 10]);
    expect(generatePagination(9, 10)).toEqual([1, 2, '...', 8, 9, 10]);
  });

  it('shows middle pages with ellipses on both sides', () => {
    expect(generatePagination(5, 10)).toEqual([1, '...', 4, 5, 6, '...', 10]);
    expect(generatePagination(6, 10)).toEqual([1, '...', 5, 6, 7, '...', 10]);
  });

  it('returns single page', () => {
    expect(generatePagination(1, 1)).toEqual([1]);
  });
});
