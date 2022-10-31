import React from 'react'
import { Button, Popconfirm } from 'antd'
import { observer } from '@formily/reactive-react'
import { WorkbenchTypes, GlobalRegistry } from '@designable/core'
import { IconWidget } from '../IconWidget'
import { usePrefix, useWorkbench, useTree } from '../../hooks'
import cls from 'classnames'
import { TextWidget } from '../TextWidget'

export interface IViewToolsWidget {
  use?: WorkbenchTypes[]
  style?: React.CSSProperties
  className?: string
}

const clearTreeText = () => {
  return <TextWidget>{'cls'}</TextWidget>
}

export const ViewToolsWidget: React.FC<IViewToolsWidget> = observer(
  ({ use, style, className }) => {
    const workbench = useWorkbench()
    const prefix = usePrefix('view-tools')
    const tree = useTree()
    GlobalRegistry.registerDesignerLocales({
      'zh-CN': {
        cls: '是否清空屏幕?',
      },
      'en-US': {
        cls: 'Clear the screen?',
      },
      'ja-JP': {
        cls: '画面をクリアする',
      },
    })
    return (
      <Button.Group style={style} className={cls(prefix, className)}>
        {use.includes('DESIGNABLE') && (
          <Button
            disabled={workbench.type === 'DESIGNABLE'}
            onClick={() => {
              workbench.type = 'DESIGNABLE'
            }}
            size="small"
          >
            <IconWidget infer="Design" />
          </Button>
        )}
        {use.includes('JSONTREE') && (
          <Button
            disabled={workbench.type === 'JSONTREE'}
            onClick={() => {
              workbench.type = 'JSONTREE'
            }}
            size="small"
          >
            <IconWidget infer="JSON" />
          </Button>
        )}
        {use.includes('MARKUP') && (
          <Button
            disabled={workbench.type === 'MARKUP'}
            onClick={() => {
              workbench.type = 'MARKUP'
            }}
            size="small"
          >
            <IconWidget infer="Code" />
          </Button>
        )}
        {use.includes('PREVIEW') && (
          <Button
            disabled={workbench.type === 'PREVIEW'}
            onClick={() => {
              workbench.type = 'PREVIEW'
            }}
            size="small"
          >
            <IconWidget infer="Play" />
          </Button>
        )}
        {tree.children && tree.children.length > 0 && (
          <Popconfirm
            placement="bottomRight"
            title={clearTreeText}
            onConfirm={() => {
              tree.setChildren()
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button size="small">
              <IconWidget infer="Remove" />
            </Button>
          </Popconfirm>
        )}
      </Button.Group>
    )
  }
)

ViewToolsWidget.defaultProps = {
  use: ['DESIGNABLE', 'JSONTREE', 'PREVIEW'],
}
