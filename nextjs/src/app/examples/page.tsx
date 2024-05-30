import { LessonBody, LessonCard } from '@/components/Lesson'
import Link from 'next/link'

export default function Home() {
  return (
    <LessonBody>
      <LessonCard>
        <ul className="list-decimal ml-6">
          <li>
            <Link href="/examples/1-basic-rsc">Basic RSC</Link>
          </li>
          <li>
            <Link href="/examples/2-client-and-server-components">Client & Server Components</Link>
          </li>
          <li>
            <Link href="/examples/3-forms-and-actions">Forms and Actions</Link>
          </li>
        </ul>
      </LessonCard>
    </LessonBody>
  )
}
