export default function Page({ name }) {
  return <div>Example From Pages: {name}</div>
}

// // https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props
// export async function getStaticProps() {
//   return {
//     props: {}
//   }
// }

// // https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props
export async function getServerSideProps() {
  return {
    props: { name: 'brad' },
  }
}
