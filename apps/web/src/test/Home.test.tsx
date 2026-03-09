import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

describe('Home page', () => {
  it('renders the welcome text', () => {
    render(<Home />);
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });

  it('renders the Drexel YDSA text', () => {
    render(<Home />);
    expect(screen.getAllByText(/Drexel YDSA/i).length).toBeGreaterThan(0);
  });

  it('renders the Get Involved button', () => {
    render(<Home />);
    expect(screen.getByRole('button', { name: /Get Involved/i })).toBeInTheDocument();
  });

  it('renders the About section', () => {
    render(<Home />);
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
  });
});
