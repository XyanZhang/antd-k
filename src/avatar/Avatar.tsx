import React, { ReactNode, CSSProperties, useRef, useState } from 'react';
import classNames from 'classnames';

import './index.scss';

export interface avatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number | 'small' | 'medium' | 'large';
  shape?: 'circle' | 'square';
  src?: string | ReactNode;
  className?: string;
  icon?: React.ReactNode;
  gap?: number;
  children?: ReactNode;
  style?: CSSProperties;
  alt?: string;
  others?: any;
}

const Avatar = (props: avatarProps) => {
  const {
    size = 'medium',
    shape = 'circle',
    src,
    icon,
    gap = 0,
    children,
    className,
    ...others
  } = props;

  const [scale, setScale] = useState(1);
  const wraperRef = useRef<HTMLElement>(null)

  // 文字自适应调整
  const textRefCallback = React.useCallback( (node: HTMLElement) => {
    if(!node) return;
    const reRender = () => {
      const wraperNode = wraperRef.current;
      if (!node || !wraperNode) {
        return;
      }
      const wraperWidth = wraperNode.offsetWidth;
      const textWidth = node.offsetWidth;

      const scale = wraperWidth - gap * 2 < textWidth ?
        (wraperWidth - gap * 2) / textWidth : 1; //
      setScale(scale);
    }

    const ob = new ResizeObserver(reRender);
    ob.observe(node);

  }, [gap, size]); // 根据gap 和size 的变化重新计算

  const cls = classNames({
    'ant-avatar': true,
    'ant-avatar-lg': size === 'large',
    'ant-avatar-sm': size === 'small',
    'ant-avatar-icon': icon,
    'ant-avatar-image': src,
    [`ant-avatar-${shape}`]: shape,
    [className as string]: className,
  });

  let style = {
    width: size,
    height: size,
    lineHeight: `${size}px`,
    fontSize: +size / 2,
    ...props.style,
  };

  // 通过scale 和gap 来调整文字的位置
  const textStyle = {
    lineHeight: `${size}px`,
    transform: `scale(${scale}) translateX(-50%)`
  }

  return (
    <span
      className={cls}
      {...others}
      style={style}
      ref={wraperRef}
    >
      {icon ? icon : null}
      {src ? (typeof src === 'string' ? <img src={src} /> : src) : null}
      {children ? (typeof children === 'string' ? <span
        style={textStyle}
        ref={textRefCallback}
        className="ant-avatar-string">{children}</span> : children) : null}
    </span>
  );
}

export default Avatar;