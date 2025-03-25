// Makes a static HTML file at build-time
export default function Page() {
  return <form action="/api/stuff">stuff in the form</form>
}

// // https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props
export async function getServerSideProps() {
  // data
  return {
    props: {},
  }
}
