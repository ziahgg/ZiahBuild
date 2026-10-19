import { Container } from '../components/Container'
import { Placeholder } from '../components/Placeholder'
import { SectionHeading } from '../components/SectionHeading'
import { publicUrl } from '../data/site'
import { videos } from '../data/showcase'
import type { VideoItem } from '../types'

const resolve = (src: string) => (/^https?:\/\//.test(src) ? src : publicUrl(src))

const horizontal = videos.filter((v) => v.orientation === 'horizontal')
const vertical = videos.filter((v) => v.orientation === 'vertical')

export function VideoShowcase() {
  return (
    <section aria-labelledby="video-title" className="bg-black py-24 text-white sm:py-32">
      <Container>
        <SectionHeading
          id="video-title"
          inverted
          eyebrow="Video editing"
          lead="Stories Told"
          muted="Through Motion."
          description="Short-form content, promotional videos and product showcases — edited for pace, clarity and the platform they live on."
        />
        <div className="mt-14 grid grid-cols-2 gap-x-3 gap-y-8 lg:grid-cols-4">
          <ul className="col-span-2 grid gap-y-8">
            {horizontal.map((video) => (
              <VideoCard key={video.title} video={video} />
            ))}
          </ul>
          {vertical.map((video) => (
            <ul key={video.title} className="col-span-1">
              <VideoCard video={video} />
            </ul>
          ))}
        </div>
      </Container>
    </section>
  )
}

function VideoCard({ video }: { video: VideoItem }) {
  const vertical = video.orientation === 'vertical'
  return (
    <li>
      <div className={`overflow-hidden rounded-[18px] bg-white/5 ${vertical ? 'aspect-[9/16]' : 'aspect-[16/9]'}`}>
        {video.src ? (
          <video
            controls
            preload="none"
            playsInline
            poster={video.poster ? resolve(video.poster) : undefined}
            className="h-full w-full object-cover"
          >
            <source src={resolve(video.src)} />
          </video>
        ) : (
          <Placeholder variant="video" tone="ghost" />
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-medium">{video.title}</h3>
        <p className="text-[11px] uppercase tracking-[0.08em] text-white/45">
          {video.category} · {vertical ? '9:16' : '16:9'}
        </p>
      </div>
    </li>
  )
}
