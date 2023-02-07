import React from 'react';
import { NavLink } from 'react-router-dom';

import './Button.css';

const Button = ({
  href,
  size,
  danger,
  inverse,
  children,
  to,
  type,
  disabled,
  onClick
}) => {
  if (href) {
    return (
      <a
        className={`button button--${size || 'default'} ${
          inverse && 'button--inverse'
        } ${danger && 'button--danger'}`}
        href={href}
      >
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <NavLink
        to={to}
        className={`button button--${size || 'default'} ${
          inverse && 'button--inverse'
        } ${danger && 'button--danger'}`}
      >
        {children}
      </NavLink>
    );
  }
  return (
    <button
      className={`button button--${size || 'default'} ${
        inverse && 'button--inverse'
      } ${danger && 'button--danger'}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
