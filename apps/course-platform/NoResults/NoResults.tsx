import styles from './NoResults.module.scss'

type Props = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export function NoResults({ children, ...props }: Props) {
  return (
    <div {...props} className={styles.component}>
      {children || <span>No Results</span>}
    </div>
  )
}
