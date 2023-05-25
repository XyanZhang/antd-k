import React, { ReactNode } from 'react';
import classNames from 'classnames';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import './index.scss';

export type ButtonType = 'normal' | 'primary' | 'dashed' | 'link' | 'text' | 'ghost';
interface buttonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  type?: ButtonType;
  size?: 'sm' | 'lg' | 'md';
  shape?: 'default' | 'circle' | 'round';
  block?: boolean;
  disabled?: any;
  href?: string;
  loading?: boolean | { delay?: number };
  target?: string;
  children?: ReactNode | string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  htmlType?: "button" | "submit" | "reset";
  danger?: boolean;
}

export const ButtonTypes = ['normal', 'primary', 'dashed', 'link', 'text', 'ghost'];

const Button = React.forwardRef<HTMLButtonElement, buttonProps>((props: buttonProps, ref) => {
  const { className, type = 'normal', size = 'md', children, style, onClick, onBlur,
    htmlType = 'button',
    shape = 'default',
    danger = false,
    block,
    loading = false,
    ...others } = props;

  let childrenNode = children;

  const cls = classNames({
    'ant-btn': true,
    [`ant-btn-${size}`]: size,
    [`ant-btn-${type}`]: type,
    [`ant-btn-${shape}`]: shape,
    [`ant-btn-block`]: block,
    [`ant-btn-dangerous`]: danger,
    [`ant-btn-loading`]: loading,
    [className as string]: !!className,
  })
  if(loading) {
    childrenNode = <><LoadingOutlined /> {children}</>
  }
  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    const { onClick } = props;
    if (loading || others.disabled) { // loading时 禁止点击
      e.preventDefault();
      return;
    }
    (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
  }
  return <button {...others}
    type={htmlType}
    disabled={others.disabled}
    ref={ref} className={cls} style={style} onClick={handleClick} onBlur={onBlur}>{childrenNode}</button>;
})

export default Button;