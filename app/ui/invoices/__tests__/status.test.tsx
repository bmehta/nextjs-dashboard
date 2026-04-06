import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import InvoiceStatus from '../status';

afterEach(() => {
  cleanup();
});

describe('InvoiceStatus', () => {
  it('renders Pending status with gray styling', () => {
    render(<InvoiceStatus status="pending" />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
    const badge = screen.getByText('Pending').closest('span');
    expect(badge).toHaveClass('bg-gray-100', 'text-gray-500');
  });

  it('renders Paid status with green styling', () => {
    render(<InvoiceStatus status="paid" />);
    expect(screen.getByText('Paid')).toBeInTheDocument();
    const badge = screen.getByText('Paid').closest('span');
    expect(badge).toHaveClass('bg-green-500', 'text-white');
  });
});
