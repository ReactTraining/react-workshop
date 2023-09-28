Google Maps (JS not TS for simple useRef)

1.  Teach non-typescript version of refs
2.  Use useId() for ids
3.  Refactor to controlled with state (formFields)
4.  Load the map when the page loads (useEffect)
5.  Switch to SelectRegion
6.  Use a mutable ref to keep track of the map instance so we can do `map.setCenter` instead of re-instantiating

Purchase Tickets

1.  We can't call hooks while we map, so move attendee inputs to a separate component
2.  Now we can do useId and useRef (refs to clear the form)
3.  Demo useMemo with the slow running `computeTicketPrices`
4.  Demo the comments causing re-renders that cascade down to the attendee fields and how we can use React.memo to mitigate re-renders
5.  Demo useCallback on the onUpdate function if a fn is passed to a memoized component
6.  If there's time, demo useEffect for focusing the first attendee input on page load
