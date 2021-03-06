/* @flow */

import * as React from 'react'
import classnames from 'classnames'
import Button from '../button/Button.es6'

type ButtonType = React.Element<typeof Button>

type Props = {
  className?: string | Object,
  vertical?: boolean,
  children: React.ChildrenArray<ButtonType> | ButtonType
}

function ButtonGroup ({ vertical, className, children }: Props) {
  return (
    <div className={classnames({
      'ds-button-group': true,
      'ds-button-group--vertical': vertical,
    }, className)}>
      {children}
    </div>
  )
}

export default ButtonGroup
