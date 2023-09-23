// From REMIX

// function FilterLink({ children, value }: { children: React.ReactNode; value: string }) {
//   const id = useId()
//   const url = useLocation().pathname

//   // The current URL
//   const [search] = useSearchParams()
//   const urlValue = search.get('brand')?.toLowerCase().split(',')
//   const on = Array.isArray(urlValue) && urlValue.includes(value.toLowerCase())

//   // The next URL
//   const nextSearch = new URLSearchParams(search.toString())
//   const valuesFiltered = Array.isArray(urlValue) ? urlValue.filter((v) => v && v !== value) : []

//   if (on) {
//     nextSearch.set('brand', valuesFiltered.join(','))
//   } else {
//     nextSearch.set('brand', valuesFiltered.concat(value).join(','))
//   }

//   const to = `${url}?${nextSearch.toString()}`

//   return (
//     <Link to={to} className="block">
//       <input id={id} type="checkbox" className="hidden" />
//       <span className="text-brandBlue mr-2">
//         {on ? <Icon name="checkboxOn" /> : <Icon name="checkboxOff" />}
//       </span>
//       <label htmlFor={id} className="cursor-pointer">
//         {children}
//       </label>
//     </Link>
//   )
// }
