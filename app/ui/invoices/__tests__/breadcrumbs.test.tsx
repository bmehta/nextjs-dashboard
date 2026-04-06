import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Breadcrumbs from '../breadcrumbs';

vi.mock('@/app/ui/fonts', () => ({
  lusitana: { className: 'mocked-lusitana' },
}));

afterEach(() => {
  cleanup();
});

describe('Breadcrumbs', () => {
  const breadcrumbs = [
    { label: 'Invoices', href: '/dashboard/invoices' },
    { label: 'Create Invoice', href: '/dashboard/invoices/create', active: true },
  ];

  it('renders all breadcrumb labels', () => {
    render(<Breadcrumbs breadcrumbs={breadcrumbs} />);
    expect(screen.getByText('Invoices')).toBeInTheDocument();
    expect(screen.getByText('Create Invoice')).toBeInTheDocument();
  });

  it('renders links with correct hrefs', () => {
    render(<Breadcrumbs breadcrumbs={breadcrumbs} />);
    const invoicesLink = screen.getByText('Invoices').closest('a');
    expect(invoicesLink).toHaveAttribute('href', '/dashboard/invoices');
    const createLink = screen.getByText('Create Invoice').closest('a');
    expect(createLink).toHaveAttribute('href', '/dashboard/invoices/create');
  });

  it('applies active styling to active breadcrumb', () => {
    render(<Breadcrumbs breadcrumbs={breadcrumbs} />);
    const activeLi = screen.getByText('Create Invoice').closest('li');
    expect(activeLi).toHaveClass('text-gray-900');
  });

  it('applies inactive styling to non-active breadcrumb', () => {
    render(<Breadcrumbs breadcrumbs={breadcrumbs} />);
    const inactiveLi = screen.getByText('Invoices').closest('li');
    expect(inactiveLi).toHaveClass('text-gray-500');
  });

  it('renders separators between breadcrumbs but not after the last one', () => {
    render(<Breadcrumbs breadcrumbs={breadcrumbs} />);
    const separators = screen.getAllByText('/');
    expect(separators).toHaveLength(1);
    const firstLi = screen.getByText('Invoices').closest('li');
    expect(firstLi).toContainElement(separators[0]);
  });

  it('renders with lusitana font class', () => {
    render(<Breadcrumbs breadcrumbs={breadcrumbs} />);
    const ol = screen.getByRole('list');
    expect(ol).toHaveClass('mocked-lusitana');
  });

  it('has correct aria-label on nav', () => {
    render(<Breadcrumbs breadcrumbs={breadcrumbs} />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
  });
});
