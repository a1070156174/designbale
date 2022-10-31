import React, { useRef, useState } from 'react'
import cls from 'classnames'
import { Modal, Tag } from 'antd'
import { usePrefix } from '@designable/react'
import {
  PlusOutlined,
  ImportOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { MonacoInput } from '@designable/react-settings-form'
import { globalThisPolyfill } from '@designable/shared'
import { helpCodeText } from './helpCodeText'
import { getPageInfoById, setPage } from './../../service'
import * as dotenv from 'dotenv'
import './index.less'

interface PageItemProps {
  title?: string
  icon?: string
  description?: string
  content?: React.ReactNode
  prefix?: string
  active?: boolean
  item?: any
  selected?: boolean
  onClick?: (item?: any) => void
  editClick?: (item: any, e: Event) => void
  deleteClick?: (item?: any) => void
  onMouseEnter?: (item?: any) => void
  onMouseLeave?: (item?: any) => void
}

const PageItem: React.FC<PageItemProps> = (props) => {
  return (
    <div
      className={cls(props.prefix, {
        active: props.selected || props.active,
        selId: `${props.prefix}-${props.item.id}`,
      })}
      {...props}
    >
      <span>
        {props.item.type === 'form' ? (
          <Tag color="success">表单</Tag>
        ) : (
          <Tag color="warning">页面</Tag>
        )}
        {props.item.title}---id:{props.item.id}
      </span>
      <div className={`${props.prefix}-action`}>
        <div
          className={`${props.prefix}-action-edit`}
          onClick={(e: any) => {
            props.editClick && props.editClick(props.item, e)
          }}
        >
          <EditOutlined />
        </div>
        <div
          className={`${props.prefix}-action-delete`}
          onClick={() => {
            props.deleteClick && props.deleteClick(props.item.id)
          }}
        >
          <DeleteOutlined />
        </div>
      </div>
    </div>
  )
}

interface PageSettingCompProps {
  setPageData?: (props: any) => void
}

export const PageSettingComp: React.FC<PageSettingCompProps> = (props) => {
  const prefix = usePrefix('page-set-comp')
  const [showModal, setModal] = useState<boolean>(false)
  const [funStr, setFunStr] = useState<string>('')
  const [activeKey, setActive] = useState<number>(-9999)
  const [selectId, setSelectId] = useState<number | string>(1)
  const [pageArr, setPageArr] = useState<any>(
    process.env.NODE_ENV === 'demo1'
      ? [
          {
            id: 111,
            title: '页面1',
            type: 'page',
            content: '',
            fun: '',
            jsonSchemaId: 111,
            nextId: '',
          },
          {
            id: 222,
            title: '页面2',
            type: 'page',
            content: '',
            fun: '',
            jsonSchemaId: 222,
            nextId: '',
          },
          {
            id: 333,
            title: '页面3',
            type: 'page',
            content: '',
            fun: '',
            jsonSchemaId: 333,
            nextId: '',
          },
        ]
      : []
  )
  const currentItem = useRef<any>({})
  // 设置当前item
  const setCurrentItem = (item: any) => {
    currentItem.current = item
  }
  // 点击编辑回显
  const getEditInfo = async (id: string | number) => {
    let josn = await getPageInfoById(id)
    console.log(josn)
    setFunStr(josn?.fun || '')
  }
  const editPush = () => {
    setPage(currentItem.current.id, {
      ...currentItem.current,
      fun: funStr,
    })
  }
  return (
    <div className={cls(prefix)}>
      <div className={cls(`${prefix}-header`)}>
        <div className={cls(`${prefix}-header-title`)}>中国大陆地区开户</div>
        <div className={cls(`${prefix}-header-action`)}>
          <div className={cls(`${prefix}-header-action-add`)}>
            <PlusOutlined />
          </div>
          <div className={cls(`${prefix}-header-action-export`)}>
            <ImportOutlined />
          </div>
        </div>
      </div>
      <div className={cls(`${prefix}-content`)}>
        {pageArr.map((item, index) => {
          return (
            <PageItem
              prefix={`${prefix}-content-item`}
              item={item}
              active={activeKey === item.id}
              selected={selectId === item.id}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                setCurrentItem(item)
                setSelectId(item.id)
                props.setPageData && props.setPageData(item)
              }}
              editClick={(item, e) => {
                e.stopPropagation()
                e.preventDefault()
                setCurrentItem(item)
                getEditInfo(item.id)
                setModal(true)
              }}
              deleteClick={(item) => {
                console.log(item)
              }}
              onMouseEnter={() => {
                setActive(item.id)
              }}
              onMouseLeave={() => {
                setActive(-99999)
              }}
            />
          )
        })}
      </div>
      {
        <Modal
          title="Next Function"
          visible={showModal}
          onOk={(e) => {
            e.preventDefault()
            e.stopPropagation()
            editPush()
            setModal(false)
          }}
          onCancel={() => {
            setModal(false)
          }}
          width={1100}
        >
          <div className={`${prefix}-monaco`}>
            <div className={`${prefix}-code-start`}>
              {'Function($context,$next)  {'}
            </div>
            <MonacoInput
              value={funStr}
              language="typescript"
              width="100%"
              height={400}
              helpCodeViewWidth={300}
              helpCode={helpCodeText}
              onChange={(value) => {
                setFunStr(value)
              }}
              options={{
                minimap: {
                  enabled: false,
                },
              }}
            />
            <div className={`${prefix}-code-end`}>{'}'}</div>
          </div>
        </Modal>
      }
    </div>
  )
}
