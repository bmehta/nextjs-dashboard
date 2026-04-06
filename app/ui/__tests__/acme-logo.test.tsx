import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import AcmeLogo from '../acme-logo';

vi.mock('@/app/ui/fonts', () => ({
  lusitana: { className: 'mocked-lusitana' },
}));

afterEach(() => {
  cleanup();
});

describe('AcmeLogo', () => {
  it('renders the Acme text', () => {
    render(<AcmeLogo />);
    expect(screen.getByText('Acme')).toBeInTheDocument();
  });

  it('applies lusitana font class', () => {
    render(<AcmeLogo />);
    const container = screen.getByText('Acme').closest('div');
    expect(container).toHaveClass('mocked-lusitana');
  });
});
