function FilterLink({ children, value }: { children: React.ReactNode; value: string }) {
  const id = useId()
  const url = useLocation().pathname

  // The current URL
  const [search] = useSearchParams()
  const brands = search.get('brand')?.toLowerCase().split(',') || []
  const on = brands.includes(value.toLowerCase())

  // The next URL
  const nextSearch = new URLSearchParams(search.toString())

  if (on) {
    // If currently on, built a link that would remove it
    const valuesFiltered = brands.filter((v) => v && v !== value)
    nextSearch.set('brand', valuesFiltered.join(','))
  } else {
    // If currently off, build a link that would add it
    nextSearch.set('brand', brands.concat(value).join(','))
  }

  const to = `${url}?${nextSearch.toString()}`

  return (
    <Link to={to} className="block">
      <input id={id} type="checkbox" className="hidden" />
      <span className="text-brandColor mr-2">
        {on ? <Icon name="checkboxOn" /> : <Icon name="checkboxOff" />}
      </span>
      <label htmlFor={id} className="cursor-pointer">
        {children}
      </label>
    </Link>
  )
}
