import React from 'react'
import {clamp} from 'lodash'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-with-gesture'
import './Pull.scss'

function Pull() {
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))
  const bind = useGesture(({ down, delta, velocity }) => {
    velocity = clamp(velocity, 1, 8)
    set({ xy: down ? delta : [0, 0], config: { mass: velocity, tension: 500 * velocity, friction: 50 } })
    console.log('x: ', xy.payload[0].value);
  });
  return <animated.div className="pulled-item" {...bind()} style={{ transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`) }} />
}

export default Pull;