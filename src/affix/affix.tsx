import React, {
  ReactNode,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';

import './index.scss';
import { addObserveTarget, getFixedTop, getTargetRect, getFixedBottom } from './utils';
import { throttleByAnimationFrame } from '../utils';

// Affix
export interface AffixProps {
  /** 距离窗口顶部达到指定偏移量后触发 */
  offsetTop?: number;
  /** 距离窗口底部达到指定偏移量后触发 */
  offsetBottom?: number;
  style?: React.CSSProperties;
  /** 固定状态改变时触发的回调函数 */
  onChange?: (affixed?: boolean) => void;
  /** 设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 */
  target?: () => Window | HTMLElement | null;
  prefixCls?: string;
  className?: string;
  children: React.ReactNode;
}

interface InternalAffixProps extends AffixProps {
  affixPrefixCls: string;
}
enum AffixStatus {
  None,
  Prepare,
}
export interface AffixState {
  affixStyle?: React.CSSProperties;
  placeholderStyle?: React.CSSProperties;
  status: AffixStatus;
  lastAffix: boolean;

  prevTarget: Window | HTMLElement | null;
}

const AffixFC = (props: AffixProps) => {
  const [status, setStatus] = useState(AffixStatus.None);
  const [lastAffix, setLastAffix] = useState(false);
  const [prevTarget, setPrevTarget] = useState<Window | HTMLElement | null>(
    null
  );
  const [affixStyle, setAffixStyle] = useState<React.CSSProperties>();
  const [placeholderStyle, setPlaceholderStyle] =
    useState<React.CSSProperties>();
  const timeout = useRef<any>(null);
  const placeholderNode = useRef<HTMLDivElement>(null);
  const fixedNode = useRef<HTMLDivElement>(null);

  const getTargetFunc = useCallback(() => {
    const { target } = props;
    if (target) {
      return target;
    }
    return getDefaultTarget;
  }, [props.target]);

  const updatePosition = useCallback(() => {
    prepareMeasure();
  }, []);

  const lazyUpdatePosition = useCallback(() => {
    const targetFunc = getTargetFunc();
    // Check position change before measure to make Safari smooth
    if (targetFunc && affixStyle) {
      const offsetTop = getOffsetTop();
      const offsetBottom = getOffsetBottom();

      const targetNode = targetFunc();
      if (targetNode && placeholderNode) {
        const targetRect = getTargetRect(targetNode);
        const placeholderReact = getTargetRect(placeholderNode as any); // 类型报错
        const fixedTop = getFixedTop(placeholderReact, targetRect, offsetTop);
        const fixedBottom = getFixedBottom(placeholderReact, targetRect, offsetBottom);

        if (
          (fixedTop !== undefined && affixStyle.top === fixedTop) ||
          (fixedBottom !== undefined && affixStyle.bottom === fixedBottom)
        ) {
          return;
        }
      }
    }
    // Directly call prepare measure since it's already throttled.
    prepareMeasure();
  }, [])

  // @ts-ignore TS6133
  const prepareMeasure = useCallback(() => {
    setStatus(AffixStatus.Prepare);
    setAffixStyle(undefined);
    setPlaceholderStyle(undefined);

    // Test if `updatePosition` called
    if (process.env.NODE_ENV === 'test') {
      const { onTestUpdatePosition } = props as any;
      onTestUpdatePosition?.();
    }
  }, []);

  useEffect(() => {
    const targetFunc = getTargetFunc();
    addObserveTarget(targetFunc(), placeholderNode, lazyUpdatePosition);
    // if (targetFunc) {
    //   timeout.current = setTimeout(() => {
    //     // Mock Event object.
    //     throttleByAnimationFrame(updatePosition)();
    //   });
    // }
    return () => {
      // clearTimeout(timeout.current);
    };
  }, []);

  // 获取 top
  let getOffsetTop = useCallback(() => {
    const { offsetBottom, offsetTop } = props;
    return offsetBottom === undefined && offsetTop === undefined ? 0 : offsetTop;
  }, [props.offsetBottom, props.offsetTop]);

  // 获取 bottom
  let getOffsetBottom = useCallback(() => props.offsetBottom, [props]);
  
  const { children } = props;
  const className = classNames({
    // 'ant-affix': true,
    'ant-affix': affixStyle && affixStyle.top !== undefined,
  });
  return (
    <ResizeObserver onResize={updatePosition}>
      <div ref={placeholderNode}>
        {affixStyle && <div style={placeholderStyle} aria-hidden="true" />}
        <div className={className} ref={fixedNode} style={affixStyle}>
          {children}
        </div>
      </div>
    </ResizeObserver>
  );
};

export default AffixFC;

function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
}
