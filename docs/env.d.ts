/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Volar JSX support
import type { VNode } from 'vue'

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
