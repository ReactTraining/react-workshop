// Makes a static HTML file at build-time

export default function Page() {
  console.log('here')
  return <div>Example From Pages</div>
}

// // // https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props
// export async function getStaticProps() {
//   // CMS
//   return {
//     props: {},
//   }
// }

// // // https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props
export async function getServerSideProps() {
  // const data = await getUsers() // node
  return {
    props: { users },
  }
}
