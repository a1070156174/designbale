import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Cascader as AntCascader, Button } from 'antd-mobile'
import PreviewText from '../preview-text'
import React, { useState, useEffect } from 'react'
import './style.ts'
import { usePrefix } from '@designable/react'

const CascaderComponent = (props) => {
  const options = [
    {
      label: '浙江',
      value: '浙江',
      children: [
        {
          label: '杭州',
          value: '杭州',
          children: [
            {
              label: '西湖区',
              value: '西湖区',
            },
            {
              label: '上城区',
              value: '上城区',
            },
            {
              label: '余杭区',
              value: '余杭区',
              disabled: true,
            },
          ],
        },
        {
          label: '温州',
          value: '温州',
          children: [
            {
              label: '鹿城区',
              value: '鹿城区',
            },
            {
              label: '龙湾区',
              value: '215464685',
              disabled: true,
            },
            {
              label: '瓯海区',
              value: '瓯海区',
            },
          ],
        },
        {
          label: '宁波',
          value: '宁波',
          children: [
            {
              label: '海曙区',
              value: '海曙区',
            },
            {
              label: '江北区',
              value: '江北区',
            },
            {
              label: '镇海区',
              value: '镇海区',
            },
          ],
        },
      ],
    },
    {
      label: '安徽',
      value: '安徽',
      children: [
        {
          label: '合肥',
          value: '合肥',
          children: [
            {
              label: '包河区',
              value: '包河区',
            },
            {
              label: '蜀山区',
              value: '蜀山区',
            },
            {
              label: '瑶海区',
              value: '瑶海区',
            },
          ],
        },
        {
          label: '芜湖',
          value: '芜湖',
          children: [
            {
              label: '镜湖区',
              value: '镜湖区',
            },
            {
              label: '弋江区',
              value: '弋江区',
            },
            {
              label: '湾沚区',
              value: '湾沚区',
            },
          ],
        },
      ],
    },
    {
      label: '江苏',
      value: '江苏',
      children: [
        {
          label: '南京',
          value: '南京',
          children: [
            {
              label: '玄武区',
              value: '玄武区',
            },
            {
              label: '秦淮区',
              value: '秦淮区',
            },
            {
              label: '建邺区',
              value: '建邺区',
            },
          ],
        },
        {
          label: '苏州',
          value: '苏州',
          children: [
            {
              label: '虎丘区',
              value: '虎丘区',
            },
            {
              label: '吴中区',
              value: '吴中区',
            },
            {
              label: '相城区',
              value: '相城区',
            },
          ],
        },
      ],
    },
  ]
  const [visible, setVisible] = useState(false)
  const [btnText, setBtnText] = useState<string>('')
  // eslint-disable-next-line no-console
  console.log('props', props)

  const prefix = usePrefix()
  // 父元素
  const parentEl =
    document.querySelector(`.${prefix}viewport`) ||
    document.querySelector(`.${prefix}mobile-simulator-body-content`) ||
    document.body
  useEffect(() => {
    setBtnText((text: string) => {
      return text
    })
  }, [options, visible])

  // 递归遍历options，删除空数组节点
  const deleteEmptyNode = (options) => {
    if (!options || !Array.isArray(options) || options.length === 0)
      return options
    options.forEach((item) => {
      if (item.children && item.children.length === 0) {
        delete item.children
      } else if (item.children && item.children.length > 0) {
        deleteEmptyNode(item.children)
      }
    })
    return options
  }

  return (
    <div>
      {
        <Button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setVisible(true)
          }}
          fill={props.fill || 'none'}
        >
          {btnText || props.placeholder || 'Cascade'}
        </Button>
      }
      <AntCascader
        {...props}
        style={{
          '--height': `${props.bodyHeight}`,
        }}
        getContainer={parentEl as any}
        forceRender={true}
        visible={visible}
        options={
          deleteEmptyNode(JSON.parse(JSON.stringify(props.options || []))) || []
        }
        onClose={() => {
          setVisible(false)
        }}
        onConfirm={(val) => {
          props.onChange(val)
        }}
        defaultValue={props.value}
      >
        {(items): any => {
          if (!items.every((item: any) => item === null)) {
            setBtnText(items.map((item) => item?.label ?? '').join('-'))
          }
        }}
      </AntCascader>
    </div>
  )
}

export const Cascader = connect(
  CascaderComponent,
  mapProps({
    dataSource: 'options',
  }),
  mapReadPretty(PreviewText.Cascader)
)

export default Cascader
