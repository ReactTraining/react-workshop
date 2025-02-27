import { NavLink, Outlet, useLoaderData } from 'react-router'
import { Logo } from '~/components/Logo'
import { CenterContent } from '~/components/CenterContent'

export async function loader() {
  const lesson = process.env.REMIX_APP_DIR?.split('/').slice(-2).join('/') || ''
  return { lesson }
}

export default function MainLayout() {
  const { lesson } = useLoaderData<typeof loader>()

  return (
    <div>
      <header className="d bg-gradient-to-r from-sky-400 to-indigo-950">
        <CenterContent className="border-b py-3">
          <div className="flex justify-between items-center">
            <div className="">
              <Logo />
            </div>
            <div className="text-white/60">{lesson}</div>
          </div>
        </CenterContent>
      </header>
      <CenterContent className="bg-white border-b">
        <nav className="primary-nav">
          <NavLink to="/" className="inline-block py-3 px-5 -mb-[1px] border-b-2">
            Home
          </NavLink>
          <NavLink to="/page2" className="inline-block py-3 px-5 -mb-[1px] border-b-2">
            Page 2
          </NavLink>
        </nav>
      </CenterContent>
      <CenterContent className="pt-6 pb-20">
        <Outlet />
      </CenterContent>
    </div>
  )
}
