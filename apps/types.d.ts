declare module 'react-flex-columns' {
  type WithAsProp<P = {}> = {
    as?: React.ComponentType<P> | React.ElementType
  }

  interface CommonProps extends WithAsProp {
    children?: React.ReactNode | React.ReactNode[]
    className?: string
    split?: boolean
    stack?: boolean
  }

  export interface ColumnProps extends CommonProps {
    gutterUnit?: number
    display?: boolean
    size?: number
    flex?: boolean
    align?: 'left' | 'right' | 'center'
  }
  export const Column: React.FC<ColumnProps>

  export interface ColumnsProps extends CommonProps {
    middle?: boolean
    gutterSize?: number | null
    gutters?: boolean | null
    reverse?: boolean
  }
  export const Columns: React.FC<ColumnsProps>
}
