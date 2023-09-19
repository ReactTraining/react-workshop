import { Icon } from './Icon'

export function Logo() {
  return (
    <div className="flex items-center gap-1">
      <span className="text-purple-300">
        <Icon name="palm" />
      </span>
      <b className="text-blue-400 mt-1">VacationTime</b>
    </div>
  )
}
