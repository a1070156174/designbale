export const Cascader = {
  'zh-CN': {
    title: '联级选择',
    settings: {
      'x-component-props': {
        title: {
          title: '标题',
          tooltip: '底部弹出框标题',
        },
        cancelText: '取消按钮文字',
        confirmText: '确认按钮文字',
        bodyHeight: '弹出框高度',
        displayRender: {
          title: '渲染函数',
          tooltip: '选择后展示的渲染函数，默认为label => label.join("/")	',
        },
        fieldNames: {
          title: '自定义字段名',
          tooltip:
            '默认值：{ label: "label", value: "value", children: "children" }',
        },
      },
    },
  },
  'en-US': {
    title: 'Cascader',
    settings: {
      'x-component-props': {
        title: {
          title: 'Title',
          tooltip: 'Dialog title',
        },
        cancelText: 'Cancel Text',
        confirmText: 'confirm Text',
        bodyHeight: 'Dialog Height',
        displayRender: {
          title: 'Display Render',
          tooltip:
            'The rendering function displayed after selection, the default is label => label.join("/")	',
        },
        fieldNames: {
          title: 'Field Names',
          tooltip:
            'Defaults：{ label: "label", value: "value", children: "children" }',
        },
      },
    },
  },
  'ko-KR': {
    title: 'Cascader',
    settings: {
      'x-component-props': {
        title: {
          title: '제목',
          tooltip: '바닥팝업 제목',
        },
        cancelText: '취소버튼 텍스트',
        confirmText: '확인버튼 텍스트',
        bodyHeight: '팝업 높이',
        displayRender: {
          title: '디스플레이 렌더링',
          tooltip:
            '선택 후 실행되는 렌더링 함수로 기본 값은 label => label.join("/")	',
        },
        fieldNames: {
          title: '필드 이름',
          tooltip:
            '기본 값：{ label: "label", value: "value", children: "children" }',
        },
      },
    },
  },
}
