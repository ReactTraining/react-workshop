import { FaReact } from 'react-icons/fa'
import styles from './Logo.module.css'

export const Logo: React.FC = () => (
  <span className={styles.component}>
    <FaReact />
    <span>
      <b>
        Course<span>Platform</span>
      </b>
    </span>
  </span>
)
