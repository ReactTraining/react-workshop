import { Icon } from './Icon'

export function Logo() {
  return (
    <div className="flex items-center gap-1">
      <span className="text-brandPink">
        <Icon name="palm" />
      </span>
      <b className="text-brandBlue mt-1">VacationTime</b>
    </div>
  )
}
