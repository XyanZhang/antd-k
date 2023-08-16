import React, {
  ReactNode,
  useState,
  useRef,
  useCallback,
  useEffect,
  Ref,
  useMemo
} from 'react';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';

import './index.scss';
import { getFixedTop, getTargetRect, getFixedBottom } from './utils';
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

export function addObserveTarget<T>(target: HTMLElement | Window | null, affix?: any, offsetTop:number = 0): any {
  if (!target) {
    return;
  }

  let dom = affix && affix.current;
  let top = 0
  
  if (dom) {
    // 获取 target 和 dom 的位置
    const targetNode = target as HTMLElement;
    const targetRect:any = getTargetRect(targetNode);
    const placeholderReact:any = getTargetRect(dom);
    console.log(placeholderReact)
    top = targetRect.top - placeholderReact.top + offsetTop;
  }
  console.log(top);
  return {
    top
  }

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

  const eventBind = useCallback(() => {
    const { target } = props;
    const targetNode = (target ? target() : getDefaultTarget()) as HTMLElement;
    if (targetNode) {
      targetNode.addEventListener('scroll', updatePosition);
      targetNode.addEventListener('resize', updatePosition);
    }
  }, [props.target]);

  useEffect(() => {
    eventBind();
    return () => {
      // 取消监听
      const { target } = props;
      const targetNode = (target ? target() : getDefaultTarget()) as HTMLElement;
      if (targetNode) {
        targetNode.removeEventListener('scroll', updatePosition);
        targetNode.removeEventListener('resize', updatePosition);
      }
    };
  }, []);

  let updatePosition = useCallback((e: any) => {
    // prepareMeasure();
    const { target } = props;
    const targetNode = (target ? target() : getDefaultTarget()) as HTMLElement;
    if (targetNode) {
      let { top } = addObserveTarget(targetNode, fixedNode, props.offsetTop);
      setAffixStyle({
        top: top,
      });
    }
  }, [fixedNode,  props.offsetTop, props.target]);

  const { children } = props;
  const className = useMemo(() => {
    return classNames({
      'ant-affix': affixStyle && affixStyle.top && affixStyle.top > 0,
    });
  }, [affixStyle]);

  return (
    // <ResizeObserver onResize={updatePosition}>
      <div ref={placeholderNode}>
        {/* {affixStyle && <div style={placeholderStyle} aria-hidden="true" />} */}
        <div className={className} ref={fixedNode}>
          {children}
        </div>
      </div>
    // </ResizeObserver>
  );
};

export default AffixFC;

function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
}
