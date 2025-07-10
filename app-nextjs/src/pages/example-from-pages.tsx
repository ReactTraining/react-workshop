// Makes a static HTML file at build-time
export default function Page() {
  console.log('where does this run: Node + Client')
  return <div>Example From Pages</div>
}

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props
export async function getServerSideProps() {
  return {
    props: {},
  }
}
