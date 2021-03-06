// @flow
import React from 'react'

import Info from '../../../components/layout/info/Info.es6.js'
import { InfoCircle } from '../../../components/Icons.es6.js'

type Props = {
  help?: string
}

export default function Tooltip ({ help }: Props) {
  if (!help) {
    return null
  }

  return (
    <div className="ds-form-input-dimension__tooltip">
      <Info
        icon={InfoCircle}
        text={help}
      />
    </div>
  )
}
