import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import DashboardSkeleton, {
  CardSkeleton,
  CardsSkeleton,
  InvoicesTableSkeleton,
  TableRowSkeleton,
} from '../skeletons';

afterEach(() => {
  cleanup();
});

describe('CardSkeleton', () => {
  it('renders without error', () => {
    const { container } = render(<CardSkeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

describe('CardsSkeleton', () => {
  it('renders four card skeletons', () => {
    const { container } = render(<CardsSkeleton />);
    const cards = container.querySelectorAll('.rounded-xl.bg-gray-100');
    expect(cards).toHaveLength(4);
  });
});

describe('DashboardSkeleton', () => {
  it('renders without error', () => {
    const { container } = render(<DashboardSkeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

describe('InvoicesTableSkeleton', () => {
  it('renders a table with header columns', () => {
    render(<InvoicesTableSkeleton />);
    expect(screen.getByText('Customer')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });
});

describe('TableRowSkeleton', () => {
  it('renders a table row', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRowSkeleton />
        </tbody>
      </table>,
    );
    const row = container.querySelector('tr');
    expect(row).toBeInTheDocument();
  });
});
