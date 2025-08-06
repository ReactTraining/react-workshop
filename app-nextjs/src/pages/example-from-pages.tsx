// Makes a static HTML file at build-time
export default function Page() {
  console.log('where does this run')
  return <div>Example From Pages</div>
}

// ONLY for the pages API
export async function getServerSideProps() {
  // data
  return {
    props: {},
  }
}
