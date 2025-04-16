declare module "react-quill" {
    import React from "react"
  
    export interface ReactQuillProps {
      id?: string
      className?: string
      theme?: string
      value?: string
      defaultValue?: string
      placeholder?: string
      readOnly?: boolean
      modules?: any
      formats?: string[]
      style?: React.CSSProperties
      onChange?: (content: string) => void
      onChangeSelection?: (range: any, source: string, editor: any) => void
      onFocus?: (range: any, source: string, editor: any) => void
      onBlur?: (previousRange: any, source: string, editor: any) => void
      onKeyPress?: React.EventHandler<any>
      onKeyDown?: React.EventHandler<any>
      onKeyUp?: React.EventHandler<any>
      preserveWhitespace?: boolean
    }
  
    class ReactQuill extends React.Component<ReactQuillProps> {
      focus(): void
      blur(): void
      getEditor(): any
    }
  
    export default ReactQuill
  }
  