import { LessonBody, LessonCard } from '@/components/Lesson'

export default function Home() {
  return (
    <LessonBody>
      <LessonCard>
        <ul className="list-disc ml-6">
          <li>Every component "runs" on the server, even the client ones.</li>
          <li>
            Some components are server-only (RSC) and some are client components that run on the
            server and the client (SSR)
          </li>
          <li>We can create a "client boundary" by calling "use client" in a component file</li>
          <li>
            The component file marked as "use client" and all it's children are now
            client-components
          </li>
          <li>Components not in boundary are by default server-only (RSC)</li>
          <li>Components can be designated as "server-only" RSC, or "client only"</li>
          <li>By default, components are RSC unless they're in a "client-only tree"</li>
        </ul>
      </LessonCard>
    </LessonBody>
  )
}
