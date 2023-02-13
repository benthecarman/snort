import "./Tabs.css";
import { useMemo } from "react";
import useHorizontalScroll from "Hooks/useHorizontalScroll";
import { CSSProperties } from "react";

export interface Tab {
  text: string;
  value: number;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  tab: Tab;
  setTab: (t: Tab) => void;
}

interface TabElementProps extends Omit<TabsProps, "tabs"> {
  t: Tab;
}

function clamp(n: number, min: number, max: number) {
  if (n < min) {
    return min;
  }
  if (n > max) {
    return max;
  }
  return n;
}

export const TabElement = ({ t, tab, setTab }: TabElementProps) => {
  const style = useMemo(() => {
    return { minWidth: `${clamp(t.text.length, 2, 7)}em` } as CSSProperties;
  }, [t.text]);
  return (
    <div
      className={`tab ${tab.value === t.value ? "active" : ""} ${t.disabled ? "disabled" : ""}`}
      style={style}
      onClick={() => !t.disabled && setTab(t)}>
      {t.text}
    </div>
  );
};

const Tabs = ({ tabs, tab, setTab }: TabsProps) => {
  const horizontalScroll = useHorizontalScroll();
  return (
    <div className="tabs" ref={horizontalScroll}>
      {tabs.map(t => (
        <TabElement tab={tab} setTab={setTab} t={t} />
      ))}
    </div>
  );
};

export default Tabs;
