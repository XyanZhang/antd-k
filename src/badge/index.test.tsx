import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Badge from './index';

describe('Badge', () => {
  test('renders Badge', () => {
    render(<Badge>click me</Badge>);
    const linkElement = screen.getByText(/click me/i);
    expect(linkElement).toBeInTheDocument();
  });
  
/**
  test('renders normal Badge', () => {
    const { container } = render(<Badge>click me</Badge>);
  
    expect(container.querySelector('.ant-btn-normal')).toBeInTheDocument();
  });

  test('renders small Badge', () => {
    const { container } = render(<Badge size="small">click me</Badge>);
  
    expect(container.querySelector('.ant-btn-small')).toBeInTheDocument();
  });

  test('should support click', () => {
    const onClick = jest.fn();
    render(<Badge type="primary" onClick={onClick}>click me</Badge>);

    const linkElement = screen.getByText(/click me/i);
    fireEvent.click(linkElement);

    expect(onClick).toBeCalled();
  });
  **/
});

