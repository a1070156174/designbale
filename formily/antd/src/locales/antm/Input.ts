export const Input = {
  'zh-CN': {
    title: '输入框',
    settings: {
      'x-component-props': {
        clearable: '清除按钮',
        max: {
          title: '最大值',
          tooltip: '仅在 type 为 number 时生效',
        },
        min: {
          title: '最小值',
          tooltip: '仅在 type 为 number 时生效',
        },
        maxLength: {
          title: '最大长度',
          tooltip:
            '仅在 type 为 text, search, url, tel, email, password 时生效',
        },
        minLength: {
          title: '最小长度',
          tooltip:
            '仅在 type 为 text, search, url, tel, email, password 时生效',
        },
        type: {
          title: '类型',
          dataSource: [
            '文本',
            '密码',
            '多行文本',
            '网址',
            '邮箱',
            '电话',
            '数字',
          ],
        },
        placeholder: '占位文本',
        onlyShowClearWhenFocus: {
          title: '仅在聚焦时显示清除按钮',
          tooltip:
            '如果 true，那么只有输入框聚焦时才会显示清除按钮；如果为 false，那么输入框失去焦点后依旧会显示清除按钮',
        },
        prefix: '前缀',
        suffix: '后缀',
        autoSize: {
          title: '自适应高度',
          tooltip: '可设置为 true | false 或对象：{ minRows: 2, maxRows: 6 }',
        },
        showCount: '是否展示字数',
        checkStrength: '检测强度',
      },
    },
  },
  'en-US': {
    title: 'Input',
    settings: {
      'x-component-props': {
        clearable: 'Clearable',
        max: {
          title: 'Max',
          tooltip: 'Only works when type is number',
        },
        min: {
          title: 'Min',
          tooltip: 'Only works when type is number',
        },
        maxLength: {
          title: 'Max Length',
          tooltip:
            'Only works when type is text, search, url, tel, email, password',
        },
        minLength: {
          title: 'Min Length',
          tooltip:
            'Only works when type is text, search, url, tel, email, password',
        },
        type: {
          title: 'Type',
          dataSource: [
            'Text',
            'Password',
            'Textarea',
            'Url',
            'Email',
            'Tel',
            'Number',
          ],
        },
        placeholder: 'Placeholder',
        onlyShowClearWhenFocus: {
          title: 'Only show clear button when focused',
          tooltip:
            'If true, the clear button will only be displayed when the input is focused; if false, the clear button will be displayed after the input is blurred',
        },
      },
    },
  },
  'zh-Hant': {
    title: '輸入框',
    settings: {
      'x-component-props': {
        clearable: '清除按鈕',
        max: {
          title: '最大值',
          tooltip: '僅在 type 為 number 時生效',
        },
        min: {
          title: '最小值',
          tooltip: '僅在 type 為 number 時生效',
        },
        maxLength: {
          title: '最大長度',
          tooltip:
            '僅在 type 為 text, search, url, tel, email, password 時生效',
        },
        minLength: {
          title: '最小長度',
          tooltip:
            '僅在 type 為 text, search, url, tel, email, password 時生效',
        },
        type: {
          title: '類型',
          dataSource: [
            '文本',
            '密碼',
            '多行文本',
            '網址',
            '郵箱',
            '電話',
            '數字',
          ],
        },
        placeholder: '佔位文本',
        onlyShowClearWhenFocus: {
          title: '僅在聚焦時顯示清除按鈕',
          tooltip:
            '如果 true，那麼只有輸入框聚焦時才會顯示清除按鈕；如果為 false，那麼輸入框失去焦點後依舊會顯示清除按鈕',
        },
      },
    },
  },
}
