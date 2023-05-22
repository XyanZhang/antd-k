import React, { ReactNode } from 'react';
import classNames from 'classnames';

import './index.scss';

export type ButtonType = 'normal' | 'primary' | 'dashed' | 'link' | 'text';
interface buttonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  type?: ButtonType;
  size?: 'sm' | 'lg' | 'md';
  shape?: 'default' | 'circle' | 'round';
  children?: ReactNode | string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  htmlType?: "button" | "submit" | "reset";
  danger?: boolean;
}

export const ButtonTypes = ['normal', 'primary', 'dashed', 'link', 'text'];

const Button = React.forwardRef<HTMLButtonElement, buttonProps>((props: buttonProps, ref) => {
  const { className, type = 'normal', size = 'md', children, style, onClick, onBlur,
    htmlType = 'button',
    shape = 'default',
    danger = false,
    ...others } = props;

  const cls = classNames({
    'ant-btn': true,
    [`ant-btn-${size}`]: size,
    [`ant-btn-${type}`]: type,
    [`ant-btn-${shape}`]: shape,
    [`ant-btn-dangerous`]: danger,
    [className as string]: !!className,
  })
  return <button {...others}
    type={htmlType}
    ref={ref} className={cls} style={style} onClick={onClick} onBlur={onBlur}>{children}</button>;
})

export default Button;