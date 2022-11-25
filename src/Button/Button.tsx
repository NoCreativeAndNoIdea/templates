import type {FC} from 'react'
import React, {useEffect} from 'react'

import './style/button.scss'

const Button: FC = () => {
  useEffect(() => {
    new Promise(res => {
      setTimeout(() => {
        res(1)
      })
    }).then(r => {
      return r
    })
  })

  return <button className={'button'}></button>
}

export default Button
