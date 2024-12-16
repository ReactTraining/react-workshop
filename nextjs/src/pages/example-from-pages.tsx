export default function Page({ props }) {
  console.log('where does this run')
  return <div>Example From Pages</div>
}

// // https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props
// export async function getStaticProps() {
//   return {
//     props: {}
//   }
// }

// // // https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props
// export async function getServerSideProps() {
//   // database / aws lambda
//   return {
//     props: {},
//   }
// }
