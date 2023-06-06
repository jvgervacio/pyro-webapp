import { useRef, useEffect, createRef, useState } from 'react';
import Two from 'two.js';
import { ZUI, Surface } from 'two.js/extras/jsm/zui';
import { Vector } from 'two.js/src/vector';
import mysvg from '@assets/dxf/test.svg';
interface Props {
  className: string;
}

function TwoWrapper(props: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [two, setTwo] = useState<Two>();
  const [points, setPoints] = useState<Vector[]>([{ x: 0, y: 0 }] as Vector[]);
  useEffect(() => {
    if (!containerRef.current) return;
    // rotating square
    const container = containerRef.current;

    if (!two) return setTwo(new Two({ width: container.scrollWidth, height: container.scrollHeight }));
    
    const zui = initZUI(two);
    renderSketch(two, zui);
    two.play();
    two.appendTo(containerRef.current);
    return () => {
      two.clear();
      two.unbind('update');
      two.pause();
    }

  }, [two]);
  return <div ref={containerRef} {...props} />
}


function renderSketch(two: Two, zui: ZUI) {
  // draw
  // const rect = two.makeRectangle(two.width / 2, two.height / 2, 100, 100);

  two.load(mysvg, (svg: any) => {
    two.add(svg);
    svg.stroke = "white";
    svg.linewidth = 0.1;
  });

  // // update
  // two.bind("update", (frameCounter: number) => {
  //   rect.rotation += 0.1;
  // });
}


function initZUI(two: Two): ZUI {
  const zui = new ZUI(two.scene);
  var mouse = new Two.Vector();
  var pointer = new Two.Vector();


  // mouse functions
  const mousemove = (e: any) => {
    var dx = e.clientX - mouse.x;
    var dy = e.clientY - mouse.y;

    zui.translateSurface(dx, dy);
    mouse.set(e.clientX, e.clientY);
  }
  const mousewheel = (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    var dy = (e.wheelDeltaY || -e.deltaY) / 1000;

    zui.zoomBy(dy, e.clientX, e.clientY);

  }
  const mousedown = (e: MouseEvent) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    pointer = zui.clientToSurface(mouse.x, mouse.y);
    console.log(pointer);
    window.addEventListener('mousemove', mousemove, false);
    window.addEventListener('mouseup', mouseup, false);

  }
  const mouseup = (e: MouseEvent) => {

    window.removeEventListener('mousemove', mousemove, false);
    window.removeEventListener('mouseup', mouseup, false);
  }

  zui.addLimits(1, 5);
  two.renderer.domElement.addEventListener("mousewheel", mousewheel, false);
  two.renderer.domElement.addEventListener("mousedown", mousedown, false);

  return zui;
}

export default TwoWrapper; 