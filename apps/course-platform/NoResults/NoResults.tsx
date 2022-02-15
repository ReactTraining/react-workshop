import styles from './NoResults.module.scss'
type Props = React.HTMLAttributes<HTMLDivElement>

export const NoResults: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div {...props} className={styles.component}>
      {children || <span>No Results</span>}
    </div>
  )
}
