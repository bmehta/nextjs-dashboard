import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Button } from '../button';

afterEach(() => {
  cleanup();
});

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies default styling', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button', { name: 'Test' });
    expect(button).toHaveClass('bg-blue-500');
  });

  it('merges custom className', () => {
    render(<Button className="w-full">Wide</Button>);
    const button = screen.getByRole('button', { name: 'Wide' });
    expect(button).toHaveClass('w-full');
    expect(button).toHaveClass('bg-blue-500');
  });

  it('passes through HTML button attributes', () => {
    render(<Button type="submit" disabled>Submit</Button>);
    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toBeDisabled();
  });
});
