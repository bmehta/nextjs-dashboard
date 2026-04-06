import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Search from '../search';

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(() => new URLSearchParams()),
  usePathname: vi.fn(() => '/dashboard/invoices'),
  useRouter: vi.fn(() => ({ replace: vi.fn() })),
}));

vi.mock('use-debounce', () => ({
  useDebouncedCallback: (fn: Function) => fn,
}));

afterEach(() => {
  cleanup();
});

describe('Search', () => {
  it('renders the search input with the provided placeholder', () => {
    render(<Search placeholder="Search invoices..." />);
    const input = screen.getByPlaceholderText('Search invoices...');
    expect(input).toBeInTheDocument();
  });

  it('renders the search label (sr-only)', () => {
    render(<Search placeholder="Search invoices..." />);
    const label = screen.getByText('Search');
    expect(label).toHaveClass('sr-only');
  });

  it('renders the input element', () => {
    render(<Search placeholder="Search invoices..." />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });
});
