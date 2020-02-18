import { useState, useEffect } from 'react';

function _getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const breakPoints = {
  xs: {min: 0, max: 576},
  sm: {min: 576, max: 768},
  md: {min: 768, max: 992},
  lg: {min: 992, max: 1200},
  xl: {min: 1200, max: Number.MAX_SAFE_INTEGER},
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(_getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(_getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export function currentWindowBreakpoint(width?: number) {
  if (!width) {
    width = _getWindowDimensions().width;
  }
  for (let breakPoint of Object.keys(breakPoints)) {
    if (width >= (breakPoints as any)[breakPoint].min && 
      width < (breakPoints as any)[breakPoint].max) {
      return breakPoint;
    }
  }
  return 'xl';
}

export function useWindowBreakpoint() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState('xs');

  useEffect(() => {
    function handleResize() {
      let {width} = _getWindowDimensions();
      setCurrentBreakpoint(currentWindowBreakpoint(width));
    }
    console.log('size')
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return currentBreakpoint;
}
