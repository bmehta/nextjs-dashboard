import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import LoginForm from '../login-form';

vi.mock('@/app/ui/fonts', () => ({
  lusitana: { className: 'mocked-lusitana' },
}));

vi.mock('@/app/lib/actions', () => ({
  authenticate: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return { ...actual, useActionState: vi.fn(() => [undefined, vi.fn(), false]) };
});

afterEach(() => {
  cleanup();
});

describe('LoginForm', () => {
  it('renders the login form heading "Please log in to continue."', () => {
    render(<LoginForm />);
    expect(screen.getByText('Please log in to continue.')).toBeInTheDocument();
  });

  it('renders email and password input fields', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders the Log in button', () => {
    render(<LoginForm />);
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('renders email input with correct type attribute', () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText('Email');
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('renders password input with correct type and minLength attributes', () => {
    render(<LoginForm />);
    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('minLength', '6');
  });
});
