import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { CreateInvoice, UpdateInvoice, DeleteInvoice } from '../buttons';

vi.mock('@/app/lib/actions', () => ({
  deleteInvoice: { bind: vi.fn(() => vi.fn()) },
}));

afterEach(() => {
  cleanup();
});

describe('CreateInvoice', () => {
  it('renders link to /dashboard/invoices/create', () => {
    render(<CreateInvoice />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/dashboard/invoices/create');
  });

  it('renders "Create Invoice" text', () => {
    render(<CreateInvoice />);
    expect(screen.getByText('Create Invoice')).toBeInTheDocument();
  });
});

describe('UpdateInvoice', () => {
  it('renders link with correct edit href for given id', () => {
    render(<UpdateInvoice id="test-id-123" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/dashboard/invoices/test-id-123/edit');
  });
});

describe('DeleteInvoice', () => {
  it('renders a delete button with sr-only text', () => {
    render(<DeleteInvoice id="test-id-456" />);
    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Delete')).toHaveClass('sr-only');
  });
});
