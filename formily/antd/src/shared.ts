import { TreeNode, Engine } from '@designable/core'

export type ComponentNameMatcher =
  | string
  | string[]
  | ((name: string, node: TreeNode, context?: any) => boolean)

// 是否匹配组件
export const matchComponent = (
  node: TreeNode,
  name: ComponentNameMatcher,
  context?: any
) => {
  if (name === '*') return true
  const componentName = node?.props?.['x-component']
  if (typeof name === 'function')
    return name(componentName || '', node, context)
  if (Array.isArray(name)) return name.includes(componentName)
  return componentName === name
}

// 是否匹配子组件组件
export const matchChildComponent = (
  node: TreeNode,
  name: ComponentNameMatcher,
  context?: any
) => {
  if (name === '*') return true
  const componentName = node?.props?.['x-component']
  if (!componentName) return false
  if (typeof name === 'function')
    return name(componentName || '', node, context)
  if (Array.isArray(name)) return name.includes(componentName)
  return componentName.indexOf(`${name}.`) > -1
}

// 是否包含组件
export const includesComponent = (
  node: TreeNode,
  names: ComponentNameMatcher[],
  target?: TreeNode
) => {
  return names.some((name) => matchComponent(node, name, target))
}

// 通过路径查找节点
export const queryNodesByComponentPath = (
  node: TreeNode,
  path: ComponentNameMatcher[]
): TreeNode[] => {
  if (path?.length === 0) return []
  if (path?.length === 1) {
    if (matchComponent(node, path[0])) {
      return [node]
    }
  }
  return matchComponent(node, path[0])
    ? node.children.reduce((buf, child) => {
        return buf.concat(queryNodesByComponentPath(child, path.slice(1)))
      }, [])
    : []
}

// 通过路径查找第一个匹配的节点
export const findNodeByComponentPath = (
  node: TreeNode,
  path: ComponentNameMatcher[]
): TreeNode => {
  if (path?.length === 0) return
  if (path?.length === 1) {
    if (matchComponent(node, path[0])) {
      return node
    }
  }
  if (matchComponent(node, path[0])) {
    for (let i = 0; i < node.children.length; i++) {
      const next = findNodeByComponentPath(node.children[i], path.slice(1))
      if (next) {
        return next
      }
    }
  }
}

// 通过路径查找是否有匹配的节点
export const hasNodeByComponentPath = (
  node: TreeNode,
  path: ComponentNameMatcher[]
) => !!findNodeByComponentPath(node, path)

export const matchArrayItemsNode = (node: TreeNode) => {
  return (
    node?.parent?.props?.type === 'array' &&
    node?.parent?.children?.[0] === node
  )
}

// 创建节点
export const createNodeId = (designer: Engine, id: string) => {
  return {
    [designer.props.nodeIdAttrName]: id,
  }
}

// 通过类型创建节点
export const createEnsureTypeItemsNode = (type: string) => (node: TreeNode) => {
  const objectNode = node.children.find((child) => child.props['type'] === type)
  if (objectNode) {
    return objectNode
  } else {
    const newObjectNode = new TreeNode({
      componentName: 'Field',
      props: {
        type,
      },
    })
    node.prepend(newObjectNode)
    return newObjectNode
  }
}
