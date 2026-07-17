import { useEffect, useRef, useState } from "react";
import Frame from "../imports/Frame1/index";
import MobileFrame from "./mobile/MobileFrame";
import LenisProvider from "./components/LenisProvider";

const DESIGN_WIDTH = 1440;
const HIDE_SPEAKERS = true;
const DESIGN_HEIGHT = HIDE_SPEAKERS ? 5411 - 542 : 5411;

// Below this width we render a purpose-built mobile layout (MobileFrame)
// instead of scaling down the fixed 1440px desktop canvas. This keeps text,
// tap targets, and spacing legible and usable on phones rather than shrinking
// a desktop page to fit.
const MOBILE_BREAKPOINT = 768;

export default function App() {
  // MARKER-MAKE-KIT-INVOKED
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [vw, setVw] = useState(
    typeof window !== "undefined" ? (document.documentElement.clientWidth || window.innerWidth) : 1440
  );
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false,
  );

  useEffect(() => {
    const update = () => {
      const width = document.documentElement.clientWidth || window.innerWidth;
      setVw(width);
      setIsMobile(width < MOBILE_BREAKPOINT);
      setScale(width < DESIGN_WIDTH ? width / DESIGN_WIDTH : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);



  if (isMobile) {
    return (
      <LenisProvider>
        <MobileFrame />
      </LenisProvider>
    );
  }

  const marginLeft = Math.max(0, (vw - DESIGN_WIDTH * scale) / 2);

  return (
    <LenisProvider>
      <div
        ref={containerRef}
        style={{
          background: "#000000",
          width: "100%",
          height: `${DESIGN_HEIGHT * scale}px`,
          overflow: "hidden",
          overscrollBehaviorX: "none",
        }}
      >
        <div
          style={{
            width: `${DESIGN_WIDTH}px`,
            height: `${DESIGN_HEIGHT}px`,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
            marginLeft: `${marginLeft}px`,
            flexShrink: 0,
          }}
        >
          <Frame />
        </div>
      </div>
    </LenisProvider>
  );
}
