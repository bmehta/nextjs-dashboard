import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Card } from '../cards';

vi.mock('@/app/ui/fonts', () => ({
  lusitana: { className: 'mocked-lusitana' },
}));

vi.mock('@/app/lib/data', () => ({
  fetchCardData: vi.fn(),
}));

afterEach(() => {
  cleanup();
});

describe('Card', () => {
  it('renders the title', () => {
    render(<Card title="Total Invoices" value={100} type="invoices" />);
    expect(screen.getByText('Total Invoices')).toBeInTheDocument();
  });

  it('renders the value (number)', () => {
    render(<Card title="Total Invoices" value={42} type="invoices" />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders the value (string)', () => {
    render(<Card title="Collected" value="$12,345" type="collected" />);
    expect(screen.getByText('$12,345')).toBeInTheDocument();
  });

  it('applies lusitana font class to value', () => {
    render(<Card title="Pending" value={7} type="pending" />);
    const valueElement = screen.getByText('7');
    expect(valueElement).toHaveClass('mocked-lusitana');
  });
});
