import React from 'react'
import { Cascader as FormilyCascader } from '../../../../../ant-mobile/src'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createMFieldSchema } from '../../ant/Field'
import { AllMSchemas } from '../../../schemas/antm'
import { AllLocales } from '../../../locales/antm'
import './index.less'

export const Mcascader: DnFC<React.ComponentProps<typeof FormilyCascader>> =
  FormilyCascader
Mcascader.Behavior = createBehavior({
  name: 'Mcascader',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Mcascader',
  designerProps: {
    propsSchema: createMFieldSchema(AllMSchemas.MCascader),
  },
  designerLocales: AllLocales.Cascader,
})

Mcascader.Resource = createResource({
  icon: 'CascaderSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        title: 'Cascader',
        'x-decorator': 'MFormItem',
        'x-component': 'Mcascader',
        'x-component-props': {
          visible: false,
          title: 'Cascader',
        },
      },
    },
  ],
})
