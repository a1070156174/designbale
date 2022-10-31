import React from 'react'

import { List as FormilyList } from 'antd-mobile'

import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createVoidFieldSchema } from '../../ant/Field'
import { AllSchemas } from '../../../schemas/ant'
import { AllLocales } from '../../../locales/ant'
import { Tlist } from './test'

export const MList: DnFC<React.ComponentProps<typeof FormilyList>> = (
  props
) => {
  return <FormilyList {...props}>{props.children}</FormilyList>
}

MList.Behavior = createBehavior({
  name: 'MList',
  extends: ['Field'],
  selector: (node) => {
    return node.props['x-component'] === 'MList'
  },
  designerProps: {
    droppable: true,
    propsSchema: createVoidFieldSchema(AllSchemas.Card),
  },
  designerLocales: AllLocales.Card,
})

MList.Resource = createResource({
  icon: 'CardSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        'x-component': 'MList',
        'x-component-props': {
          title: 'Title8989',
        },
      },
    },
  ],
})
