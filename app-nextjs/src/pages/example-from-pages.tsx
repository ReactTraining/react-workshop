// Makes a static HTML file at build-time
export default function Page() {
  console.log('where')
  return <div>Example From Pages</div>
}

export async function getServerSideProps() {
  return {
    props: {},
  }
}
