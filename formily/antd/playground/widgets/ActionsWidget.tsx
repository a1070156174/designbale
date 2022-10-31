import React, { useEffect } from 'react'
import { Space, Button, Radio, Select } from 'antd'
// import { GithubOutlined } from '@ant-design/icons'
import { useDesigner, TextWidget } from '@designable/react'
import { GlobalRegistry } from '@designable/core'
import { observer } from '@formily/react'
import { loadInitialSchema, saveSchema, pushSchema } from '../service'
interface ActionsWidget {
  theme: string
  setTheme: (props: string) => void
  pageDataId: string | number
}

export const ActionsWidget: React.FC<ActionsWidget> = observer((props) => {
  const designer = useDesigner()
  const { Option } = Select
  const { theme, setTheme, pageDataId } = props
  useEffect(() => {
    console.log('props-----------------------------------', props)
    if (pageDataId) {
      loadInitialSchema(designer, pageDataId)
    }
  }, [pageDataId, props])
  const supportLocales = ['zh-cn', 'en-us', 'ko-kr']
  useEffect(() => {
    if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
      GlobalRegistry.setDesignerLanguage('zh-cn')
    }
  }, [])

  const changeLanguage = (val) => {
    // eslint-disable-next-line no-console
    console.log(val)
  }
  return (
    <Space style={{ marginRight: 10 }}>
      <Select
        defaultValue="zh-cn"
        style={{ width: 120 }}
        onChange={changeLanguage}
      >
        <Option value="zh-cn">中文页面</Option>
        <Option value="zh-hk">繁体页面</Option>
        <Option value="en">英文页面</Option>
      </Select>
      {theme && theme === 'light' ? (
        <Button
          onClick={() => {
            setTheme('dark')
          }}
        >
          暗夜
        </Button>
      ) : (
        <Button
          onClick={() => {
            setTheme('light')
          }}
        >
          极光
        </Button>
      )}
      <Radio.Group
        value={GlobalRegistry.getDesignerLanguage()}
        optionType="button"
        options={[
          { label: 'English', value: 'en-us' },
          { label: '简体中文', value: 'zh-cn' },
          { label: '繁体', value: 'ko-kr' },
        ]}
        onChange={(e) => {
          GlobalRegistry.setDesignerLanguage(e.target.value)
        }}
      />
      <Button
        className={`+++++${pageDataId}`}
        onClick={() => {
          saveSchema(designer, pageDataId)
        }}
      >
        <TextWidget>Save</TextWidget>
      </Button>
      <Button
        type="primary"
        onClick={() => {
          pushSchema(designer, pageDataId)
        }}
      >
        <TextWidget>Publish</TextWidget>
      </Button>
    </Space>
  )
})
ActionsWidget.defaultProps = {
  theme: 'light',
  setTheme: () => {},
  pageDataId: '',
}
