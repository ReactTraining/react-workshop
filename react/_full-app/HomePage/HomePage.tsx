import { Heading } from '~/Heading'
import { Icon } from '~/Icon'
import styles from './HomePage.module.scss'

export function HomePage() {
  return (
    <div className={`${styles.component} spacing-large pb-8`}>
      <section>
        <Heading>Welcome to ReactTraining</Heading>
        <p className="text-large">
          If you're seeing this page then you're all set for the workshop and you don't need to do
          anything else. 🎉
        </p>
      </section>

      <hr />

      <section className="spacing">
        <Heading as="h2" size={2}>
          Not good at JavaScript? Do I need to be good at JavaScript?
        </Heading>
        <p>
          That's totally okay if you don't know JS very well as long as you know how to program in
          any other language you'll do fine in the workshop. However, JavaScript has changed a lot
          since 2015 and if you're not used to its modern syntax, you might struggle a bit with
          React and our material so please read this primer article that will get you ready. People
          often tell us the primer article was the thing that made the workshop successful for them.
        </p>
        <a
          className="button block"
          href="https://reacttraining.com/blog/javascript-the-react-parts"
        >
          <span>Read this JS Primer Article</span>
          <Icon size={1.5} name="circleArrowRight" />
        </a>
      </section>

      <hr />

      <section className="spacing">
        <Heading as="h2" size={2}>
          Not a programmer?
        </Heading>
        <p>
          This workshop assumes you know how to program (even if just a little, in any programming
          language). Sometimes we'll get attendees who just want to know high-level details about
          React so they can better communicate with their React developer co-workers. In that case,
          you're certainly welcome to attend, but the material is designed for programmers so just
          go in with the expectation that on average, our attendees usually have at least a year
          (sometimes decades) of programming experience so the pace is going to be more appropriate
          for them. Going into the workshop, we presume you know:
        </p>
        <ul>
          <li>How to write HTML</li>
          <li>How to do some basic Command Line (CLI)</li>
          <li>What an API is (in a general sense)</li>
          <li>HTTP concepts like REST/GET/POST etc, and the general idea of AJAX requests</li>
        </ul>
        <p>(Basically, general web developer and programmer concepts)</p>
      </section>
    </div>
  )
}
