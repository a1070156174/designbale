import { define } from '@formily/reactive'
import { Engine } from '@designable/core'
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer'
import { message } from 'antd'

async function editData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'put', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  return response.json() // parses JSON response into native JavaScript objects
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'get', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached/ body data type must match "Content-Type" header
  })
  return response.json() // parses JSON response into native JavaScript objects
}

export const saveSchema = (designer: Engine, id: string | number) => {
  localStorage.setItem(
    `formily-schema-${id}`,
    JSON.stringify(transformToSchema(designer.getCurrentTree()))
  )
}

export const pushSchema = (designer: Engine, id: string | number) => {
  editData(`api/schema/${id}`, transformToSchema(designer.getCurrentTree()))
  message.success('Save Success')
  try {
    if (localStorage.getItem(`formily-schema-${id}`)) {
      localStorage.deleteItem(`formily-schema-${id}`)
    }
  } catch (e) {}
}

export const loadInitialSchema = (designer: Engine, id: string | number) => {
  if (localStorage.getItem(`formily-schema-${id}`)) {
    designer.setCurrentTree(
      transformToTreeNode(
        JSON.parse(localStorage.getItem(`formily-schema-${id}`) || '')
      )
    )
  } else {
    try {
      getData(`api/schema/${id}`).then((res) => {
        try {
          designer.setCurrentTree(transformToTreeNode(res))
        } catch {}
      })
    } catch {}
  }
}

export const getPageInfoById = (id: string | number) => {
  return getData(`api/page/${id}`)
}

export const setPage = (id: string | number, data) => {
  editData(`api/page/${id}`, { ...data })
}
