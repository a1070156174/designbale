import { ISchema } from '@formily/react'

export const MCascader: ISchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    cancelText: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    confirmText: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    bodyHeight: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput',
      'x-component-props': {
        defaultValue: 300,
      },
    },
    placeholder: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        defaultValue: 'Cascader',
      },
    },
  },
}
