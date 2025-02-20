import { Link, Outlet } from 'react-router'
import { LessonBody } from '~/Lesson'

export function MainLayout() {
  return (
    <LessonBody>
      <div className="space-y-6 m-auto max-w-[1200px]">
        <div className="space-x-3 text-right">
          <Link to="/" className="button inline-block">
            Home
          </Link>
          <Link to="/checkout" className="button">
            Checkout
          </Link>
        </div>
        <Outlet />
      </div>
    </LessonBody>
  )
}
