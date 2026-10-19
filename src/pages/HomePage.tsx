import { About } from '../sections/About'
import { Hero } from '../sections/Hero'
import { Introduction } from '../sections/Introduction'
import { Marquee } from '../sections/Marquee'
import { Projects } from '../sections/Projects'
import { Services } from '../sections/Services'
import { ShopifyShowcase } from '../sections/ShopifyShowcase'
import { SocialShowcase } from '../sections/SocialShowcase'
import { UiUxShowcase } from '../sections/UiUxShowcase'
import { VideoShowcase } from '../sections/VideoShowcase'
import { WebShowcase } from '../sections/WebShowcase'

export function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Introduction />
      <Services />
      <Projects />
      <UiUxShowcase />
      <WebShowcase />
      <SocialShowcase />
      <ShopifyShowcase />
      <VideoShowcase />
      <About />
    </>
  )
}
