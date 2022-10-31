import React from 'react'
import { Radio as FormilyRadio } from '@formily/antd'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createMFieldSchema } from '../../ant/Field'
import { AllSchemas } from '../../../schemas/ant'
import { AllLocales } from '../../../locales/ant'

const newFormilyRadio: any = React.cloneElement(FormilyRadio as any)
for (let key in FormilyRadio) {
  if (newFormilyRadio[key] === undefined) {
    newFormilyRadio[key] = FormilyRadio[key]
  }
}
export const MRadio: DnFC<React.ComponentProps<typeof FormilyRadio>> =
  newFormilyRadio

MRadio.Behavior = createBehavior({
  name: 'MRadio.Group',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'MRadio.Group',
  designerProps: {
    propsSchema: createMFieldSchema(AllSchemas.Radio.Group),
  },
  designerLocales: AllLocales.RadioGroup,
})

MRadio.Resource = createResource({
  icon: 'RadioGroupSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string | number',
        title: 'MRadio Group',
        'x-decorator': 'MFormItem',
        'x-component': 'MRadio.Group',
        enum: [
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
          { label: '选项3', value: 3 },
        ],
      },
    },
  ],
})
