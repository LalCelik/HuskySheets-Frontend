import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyButton from './MyButton';

describe('MyButton', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <MemoryRouter>
        <MyButton to="/test" text="Tester click" />
      </MemoryRouter>
    );

    expect(screen.getByText('Tester click')).toBeInTheDocument();
  });

  it('renders the correct link destination', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <MyButton to="/test" text="Tester click" />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/test');
  });

  it('renders the button with the correct text', () => {
    const { getByText } = render(
      <MemoryRouter>
        <MyButton to="/test" text="Tester click" />
      </MemoryRouter>
    );

    const buttonElement = screen.getByText('Tester click');
    expect(buttonElement.tagName).toBe('BUTTON');
  });
});
