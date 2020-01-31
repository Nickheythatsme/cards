import { useState, useEffect } from 'react';

function _getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
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

export function useWindowBreakpoint() {
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

interface ClassNameOptions {
  classNames?: [string] | [],
  prefix?: string,
  base?: string
}

export function makeClassName(opts: ClassNameOptions) {
  let className = opts.base || '';
  if (opts.classNames) {
    let prefix = opts.prefix || '';
    opts.classNames.forEach(item => {
      className += ' ' + prefix + item 
    });
  }
  return className.trim();
}
