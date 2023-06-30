export function TodoItemListing({ id, name, onRemove }) {
  return (
    <div>
      {name}
      <button className="button" onClick={(e) => onRemove(id)}>
        remove
      </button>
    </div>
  )
}
