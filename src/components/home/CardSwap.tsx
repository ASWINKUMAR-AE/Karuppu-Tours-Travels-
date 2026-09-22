import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";

export const Card = forwardRef(
  ({ customClass, title, description, children, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 rounded-[20px] border border-primary-700 bg-primary-900 overflow-hidden [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
    >
      {children}
      {/* Title in top-left */}
      {title && (
        <div className="absolute top-4 left-4 p-3 bg-primary-600 hover:bg-primary-700 bg-opacity-80 rounded-tl-[50px] rounded-tr-[0.5rem] rounded-bl-[0.5rem] rounded-br-[50px] border border-primary-500">
          <h3 className="text-white text-primary-100 font-bold text-lg">{title}</h3>
        </div>
      )}
      {/* Description in bottom-right */}
      {description && (
        <div className="absolute bottom-4 right-4 p-3 bg-gray-900 bg-opacity-80 rounded-lg border border-primary-500 max-w-[60%]">
          <p className="text-primary-100 text-sm">{description}</p>
        </div>
      )}
    </div>
  )
);
Card.displayName = "Card";

const makeSlot = (
  i,
  distX,
  distY,
  total
) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
}) => {
  const [dimensions, setDimensions] = useState({
    width: Math.min(500, window.innerWidth - 40),
    height: Math.min(400, (window.innerWidth - 40) * 0.8)
  });

  useEffect(() => {
    const handleResize = () => {
      const newWidth = Math.min(500, window.innerWidth - 40);
      setDimensions({
        width: newWidth,
        height: newWidth * 0.8
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const config =
    easing === "elastic"
      ? {
        ease: "elastic.out(0.6,0.9)",
        durDrop: 2,
        durMove: 2,
        durReturn: 2,
        promoteOverlap: 0.9,
        returnDelay: 0.05,
      }
      : {
        ease: "power1.inOut",
        durDrop: 0.8,
        durMove: 0.8,
        durReturn: 0.8,
        promoteOverlap: 0.45,
        returnDelay: 0.2,
      };

  const childArr = useMemo(
    () => Children.toArray(children),
    [children]
  );
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    [childArr.length]
  );

  const order = useRef(
    Array.from({ length: childArr.length }, (_, i) => i)
  );

  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) =>
      placeNow(
        r.current,
        makeSlot(i, cardDistance, verticalDistance, total),
        skewAmount
      )
    );

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(
        refs.length - 1,
        cardDistance,
        verticalDistance,
        refs.length
      );
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return"
      );
      tl.set(elFront, { x: backSlot.x, z: backSlot.z }, "return");
      tl.to(
        elFront,
        {
          y: backSlot.y,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return"
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, refs]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
        key: i,
        ref: refs[i],
        style: { 
          width: dimensions.width, 
          height: dimensions.height, 
          ...(child.props.style ?? {}) 
        },
        onClick: (e) => {
          child.props.onClick?.(e);
          onCardClick?.(i);
        },
      }) : child
  );

  return (
    
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-primary-900">
    
      <div
        ref={container}
        className="relative perspective-[900px]"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          marginTop:'50px'
        }}
      >
        {rendered}
      </div>
    </div>
  );
};

export default CardSwap;
