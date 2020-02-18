import React from 'react'
import { useSpring, animated } from 'react-spring'
import {clamp} from 'lodash';
import { useGesture } from 'react-with-gesture'
import './Pull.scss'

function formatStyle(xy: any) {
  return {
    transform: xy.interpolate((x: any, y: any) => `translate3d(${x}px,${y}px,0)`)
  }
}

function Pull() {
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))

  const bind = useGesture(({ down, delta, velocity }) => {
    velocity = clamp(velocity, 1, 8)
    set({ xy: down ? delta : [0, 0], config: { mass: velocity, tension: 500 * velocity, friction: 50 } })
  });

  return <animated.div
    {...bind()} 
    className="pulled-item" 
    style={formatStyle(xy)}
  />

}

export default Pull;