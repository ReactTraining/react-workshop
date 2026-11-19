// Node
export default function Page({ data }) {
  console.log('where does this run')
  return <div>Example From Pages</div>
}

// Node
export async function getServerSideProps() {
  // data
  return {
    props: { data: [] },
  }
}
