import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Radio as AntdRadio } from 'antd-mobile'
import { RadioProps, RadioGroupProps } from 'antd-mobile/es/components/radio'
import { PreviewText } from '../preview-text'

type ComposedInput = React.FC<RadioProps> & {
  Group?: React.FC<RadioGroupProps>
}

export const MRadio: ComposedInput = connect(
  AntdRadio,
  mapProps({ value: 'checked', onInput: 'onChange' })
)

MRadio.Group = connect(AntdRadio.Group, mapReadPretty(PreviewText.Selector))

export default MRadio
