// Makes a static HTML file at build-time
export default function Page({ here }) {
  return <div>Example From Pages</div>
}

export async function getServerSideProps() {
  // database
  return {
    props: {},
  }
}
