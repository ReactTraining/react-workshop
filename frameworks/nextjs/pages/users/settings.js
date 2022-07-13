export default function BrowseUsers({ users }) {
  return (
    <div>
      <div></div>
      <div></div>
    </div>
  )
}

export async function getServerSideProps() {
  // connect to a database
  // postgres.query('SELECT').then()

  return {
    props: {
      users: [{}, {}],
    },
  }
}
