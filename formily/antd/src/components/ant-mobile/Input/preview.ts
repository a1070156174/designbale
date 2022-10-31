import React from 'react'
import { Input as FormilyInput } from '../../../../../ant-mobile/src/input'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createFieldSchema } from '../../ant/Field'
import { AllMSchemas } from '../../../schemas/antm'
import { AllLocales } from '../../../locales/antm'
import './index.less'

export const MInput: DnFC<React.ComponentProps<typeof FormilyInput>> =
  FormilyInput
MInput.Behavior = createBehavior(
  {
    name: 'MInput',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'MInput',
    designerProps: {
      propsSchema: createFieldSchema(AllMSchemas.Input),
    },
    designerLocales: AllLocales.Input,
  },
  {
    name: 'MInput.TextArea',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'MInput.TextArea',
    designerProps: {
      propsSchema: createFieldSchema(AllMSchemas.Input.TextArea),
    },
    designerLocales: AllLocales.TextArea,
  }
)

MInput.Resource = createResource(
  {
    icon: 'InputSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: 'Input',
          'x-decorator': 'MFormItem',
          'x-component': 'MInput',
        },
      },
    ],
  },
  {
    icon: 'TextAreaSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: 'TextArea',
          'x-decorator': 'MFormItem',
          'x-component': 'MInput.TextArea',
        },
      },
    ],
  }
)
