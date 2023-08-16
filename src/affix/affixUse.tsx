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
  target?: Window | HTMLElement | null;
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
    top = targetRect.top - placeholderReact.top + offsetTop;
  }
  console.log(top);
  return {
    top
  }
}


const AffixFC = (props: AffixProps) => {
  const { target, children, className, offsetTop, offsetBottom } = props;
  const [status, setStatus] = useState(AffixStatus.None);
  // const [lastAffix, setLastAffix] = useState(false);
  const fixedNode = useRef<HTMLDivElement>(null); // 用于获取 dom 节点，获取实时位置
  const prefixCls = 'ant';

  const classNameAttr = useMemo(() => {
    return classNames(className, {
      [`${prefixCls}-affix`]: status === AffixStatus.Prepare,
    });
  }, [status]);
  console.log(status)
  const handleScroll = useCallback((e:any) => {
    console.log(e)
    // 处理目标元素的位置
    // const offsetBottomValue = offsetBottom || 0;
    // const scrollTop = (targetNode as HTMLElement).scrollTop;
    const affixNode = fixedNode.current;
    const elemOffset = getTargetRect(affixNode);
    if(elemOffset.top <= 0) {
      setStatus(AffixStatus.Prepare);
    }else {
      // 为什么会闪烁
      setStatus(AffixStatus.None);
    }
  }, [fixedNode]);
  
  useEffect(() => {
    console.log(1111)
    // 滚动事件绑定
    const targetNode: any = target; // 
    if(!targetNode) { 
      return;
    }
    // console.log(targetNode)
    targetNode?.addEventListener('scroll', handleScroll);
    return () => {
      targetNode?.removeEventListener('scroll', handleScroll);
    };
  }, [fixedNode, target]);

  // console.log(classNameAttr)
  return (
      <div className={classNameAttr} ref={fixedNode}>
        {children}
      </div>
  );
};

export default AffixFC;

function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
}
