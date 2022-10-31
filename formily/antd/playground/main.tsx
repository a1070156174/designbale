import 'antd/dist/antd.less'
import React, { useMemo, useState, Fragment, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import {
  Designer, //设计器根组件，用于下发上下文
  DesignerToolsWidget, //画板工具挂件
  ViewToolsWidget, //视图切换工具挂件
  Workspace, //用于创建 Workspace 组件，工作区组件，核心组件，用于管理工作区内的拖拽行为，树节点数据等等..
  OutlineTreeWidget, //大纲树组件，它会自动识别当前工作区，展示出工作区内树节点
  ResourceWidget, // 资源组件，可拖拽组件展示区
  HistoryWidget, // 历史记录组件
  StudioPanel, // Designer 子组件
  CompositePanel, //左侧组合布局面板
  WorkspacePanel, //工作区布局面板
  ToolbarPanel, //工具栏布局面板
  ViewportPanel, //视口布局面板
  ViewPanel, //视图布局面板
  SettingsPanel, //右侧配置表单布局面板
  ComponentTreeWidget, //组件树渲染器
  TextWidget, //文本渲染器
} from '@designable/react'

import {
  SettingsForm,
  setNpmCDNRegistry,
} from '@designable/react-settings-form'
import {
  createDesigner,
  GlobalRegistry,
  Shortcut,
  KeyCode,
  ScreenType,
} from '@designable/core'
import {
  LogoWidget,
  ActionsWidget,
  PreviewWidget,
  SchemaEditorWidget,
  MarkupSchemaWidget,
} from './widgets'
import { PageSettingComp } from './CompositePanels/index'
import { Select as ANTSelect } from 'antd'
import { saveSchema } from './service'
// mobile端组件

// pc端组件
import {
  Form,
  Field,
  Input,
  Select,
  TreeSelect,
  // Cascader,
  Radio,
  Checkbox,
  Slider,
  Rate,
  NumberPicker,
  Transfer,
  Password,
  DatePicker,
  TimePicker,
  Upload,
  Switch,
  Text,
  Card,
  ArrayCards,
  ObjectContainer,
  ArrayTable,
  Space,
  FormTab,
  FormCollapse,
  FormLayout,
  FormGrid,
} from '../src'
import { MInput, MRadio, Mcascader } from '../src'

const { Option } = ANTSelect

//设置npm源

setNpmCDNRegistry('//unpkg.com')

GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    sources: {
      Inputs: '输入控件',
      Layouts: '布局组件',
      Arrays: '自增组件',
      Displays: '展示组件',
    },
    device: {
      pc: 'PC端组件',
      mobile: '移动端组件',
    },
  },
  'en-US': {
    sources: {
      Inputs: 'Inputs',
      Layouts: 'Layouts',
      Arrays: 'Arrays',
      Displays: 'Displays',
    },
    device: {
      pc: 'PC Components',
      mobile: 'Mobile Components',
    },
  },
  'ko-KR': {
    sources: {
      Inputs: '입력',
      Layouts: '레이아웃',
      Arrays: '배열',
      Displays: '디스플레이',
    },
    device: {
      pc: 'PC 컴포넌트',
      mobile: '모바일 컴포넌트',
    },
  },
})

const App = () => {
  const engine = useMemo(
    () =>
      createDesigner({
        shortcuts: [
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.S],
              [KeyCode.Control, KeyCode.S],
            ],
            handler(ctx) {
              saveSchema(ctx.engine)
            },
          }),
        ],
        rootComponentName: 'Form',
      }),
    []
  )
  const [theme, setTheme] = useState('light')
  const [deviceComponent, setDeviceComponent] = useState('mobile')
  // 切换组件库
  const handleChangeDevice = (value: string): void => {
    setDeviceComponent(value)
  }
  const screen = engine.screen

  const [pageInfo, setPageInfo] = useState({ id: '' })
  // 切换表单页面
  const setPageData = (data: any): void => {
    setPageInfo({ id: data.jsonSchemaId || '' })
  }
  // 切换设备显示
  useEffect(() => {
    if (deviceComponent === 'mobile') {
      screen.setType(ScreenType.Mobile)
    } else {
      screen.setType(ScreenType.PC)
    }
  }, [deviceComponent])

  return (
    <Designer engine={engine} theme={theme}>
      <StudioPanel
        logo={<LogoWidget />}
        actions={
          <ActionsWidget
            theme={theme}
            setTheme={setTheme}
            pageDataId={pageInfo.id}
          />
        }
      >
        <CompositePanel>
          <CompositePanel.Item title="panels.PageSettings" icon="PageSet">
            <PageSettingComp setPageData={setPageData} />
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.Component" icon="Component">
            <ANTSelect
              defaultValue={deviceComponent}
              style={{ width: '100% ', height: '30px' }}
              onChange={handleChangeDevice}
            >
              <Option value="mobile">
                <TextWidget>{'device.mobile'}</TextWidget>
              </Option>
              <Option value="pc">
                <TextWidget>{'device.pc'}</TextWidget>
              </Option>
            </ANTSelect>
            {deviceComponent === 'mobile' ? (
              <Fragment>
                <ResourceWidget
                  title="sources.Inputs"
                  sources={[MInput, MRadio, Mcascader]}
                />
                {/* <ResourceWidget
                  title="sources.Layouts"
                  sources={[
                    MList
                  ]}
                /> */}
              </Fragment>
            ) : (
              <Fragment>
                <ResourceWidget
                  title="sources.Inputs"
                  sources={[
                    Input,
                    Password,
                    NumberPicker,
                    Rate,
                    Slider,
                    Select,
                    TreeSelect,
                    // Cascader,
                    Transfer,
                    Checkbox,
                    Radio,
                    DatePicker,
                    TimePicker,
                    Upload,
                    Switch,
                    ObjectContainer,
                  ]}
                />
                <ResourceWidget
                  title="sources.Layouts"
                  sources={[
                    Card,
                    FormGrid,
                    FormTab,
                    FormLayout,
                    FormCollapse,
                    Space,
                  ]}
                />
                <ResourceWidget
                  title="sources.Arrays"
                  sources={[ArrayCards, ArrayTable]}
                />
                <ResourceWidget title="sources.Displays" sources={[Text]} />
              </Fragment>
            )}
            <CompositePanel.Item title="panels.PageSettings" icon="PageSet">
              <PageSettingComp />
            </CompositePanel.Item>
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
            <OutlineTreeWidget />
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.History" icon="History">
            <HistoryWidget />
          </CompositePanel.Item>
        </CompositePanel>
        <Workspace id="form">
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
              <ViewToolsWidget
                use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW']}
              />
            </ToolbarPanel>
            <ViewportPanel style={{ height: '100%' }}>
              <ViewPanel type="DESIGNABLE">
                {() => (
                  <ComponentTreeWidget
                    components={{
                      // pc端组件
                      Form,
                      Field,
                      Input,
                      Select,
                      TreeSelect,
                      // Cascader,
                      Radio,
                      Checkbox,
                      Slider,
                      Rate,
                      NumberPicker,
                      Transfer,
                      Password,
                      DatePicker,
                      TimePicker,
                      Upload,
                      Switch,
                      Text,
                      Card,
                      ArrayCards,
                      ArrayTable,
                      Space,
                      FormTab,
                      FormCollapse,
                      FormGrid,
                      FormLayout,
                      ObjectContainer,
                      // 移动端组件
                      MInput,
                      MRadio,
                      Mcascader,
                      // MList,
                    }}
                  />
                )}
              </ViewPanel>
              <ViewPanel type="JSONTREE" scrollable={false}>
                {(tree, onChange) => (
                  <SchemaEditorWidget tree={tree} onChange={onChange} />
                )}
              </ViewPanel>
              <ViewPanel type="MARKUP" scrollable={false}>
                {(tree) => <MarkupSchemaWidget tree={tree} />}
              </ViewPanel>
              <ViewPanel type="PREVIEW">
                {(tree) => <PreviewWidget tree={tree} />}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>

        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
        </SettingsPanel>
      </StudioPanel>
    </Designer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
