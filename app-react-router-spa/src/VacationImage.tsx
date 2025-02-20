type Props = {
  vacationId: number
  alt: string
} & React.HTMLAttributes<HTMLImageElement>

export function VacationImage({ vacationId, alt, ...props }: Props) {
  return <img {...props} alt={alt} src={`/images/vacations/${vacationId}.jpg`} />
}
