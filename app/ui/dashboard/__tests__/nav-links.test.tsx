import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import NavLinks from '../nav-links';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

import { usePathname } from 'next/navigation';

afterEach(() => {
  cleanup();
});

describe('NavLinks', () => {
  it('renders all three navigation links', () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard');
    render(<NavLinks />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Invoices')).toBeInTheDocument();
    expect(screen.getByText('Customers')).toBeInTheDocument();
  });

  it('highlights the active link based on pathname', () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard/invoices');
    render(<NavLinks />);
    const invoicesLink = screen.getByText('Invoices').closest('a');
    expect(invoicesLink).toHaveClass('bg-sky-100', 'text-blue-600');
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).not.toHaveClass('bg-sky-100 text-blue-600');
  });

  it('renders correct hrefs', () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard');
    render(<NavLinks />);
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('href', '/dashboard');
    const invoicesLink = screen.getByText('Invoices').closest('a');
    expect(invoicesLink).toHaveAttribute('href', '/dashboard/invoices');
    const customersLink = screen.getByText('Customers').closest('a');
    expect(customersLink).toHaveAttribute('href', '/dashboard/customers');
  });
});
