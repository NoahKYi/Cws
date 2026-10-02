import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import {
  createBrowserRouter,
  Link,
  RouterProvider,
  ScrollRestoration,
  useLocation,
} from "react-router"
import interviewHero from "./assets/interview-hero.jpg"

type Platform = "YouTube" | "TikTok" | "Instagram"
type Video = {
  id: number
  title: string
  category: string
  platform: Platform
  image: string
  duration: string
  date: string
  description: string
}
const photos = {
  coast:
    "https://images.unsplash.com/photo-1701511114993-64289ca7f621?auto=format&fit=crop&w=1600&q=85",
  tokyo:
    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=900&q=85",
  coffee:
    "https://images.unsplash.com/photo-1609506905005-81ca4ed0a4f1?auto=format&fit=crop&w=900&q=85",
  mountains:
    "https://images.unsplash.com/photo-1551291420-91160f3d4961?auto=format&fit=crop&w=900&q=85",
  camera:
    "https://images.unsplash.com/photo-1544486961-bf701528b823?auto=format&fit=crop&w=900&q=85",
}
const videos: Video[] = [
  {
    id: 1,
    title: "Islam",
    category: "TRAVEL DIARY",
    platform: "YouTube",
    image: photos.coast,
    duration: "12:48",
    date: "2025-06-18",
    description:
      "Slow mornings, salt in the air, and no particular place to be. A little film about taking the scenic route along the Italian coast.",
  },
  {
    id: 2,
    title: "Tokyo, after the sun goes down",
    category: "LITTLE MOMENTS",
    platform: "TikTok",
    image: photos.tokyo,
    duration: "0:58",
    date: "2025-06-14",
    description:
      "Neon-lit streets, late-night ramen, and a city that never quite goes to sleep. A few favorite moments from a night in Tokyo.",
  },
  {
    id: 3,
    title: "The art of a slow morning",
    category: "EVERYDAY LIFE",
    platform: "Instagram",
    image: photos.coffee,
    duration: "1:24",
    date: "2025-06-10",
    description:
      "Coffee before notifications. A camera on the table. Finding a little room to breathe in the everyday.",
  },
  {
    id: 4,
    title: "Somewhere in the Dolomites",
    category: "OUTSIDE & OFFLINE",
    platform: "YouTube",
    image: photos.mountains,
    duration: "8:16",
    date: "2025-06-06",
    description:
      "Trading screen time for mountain time. A few days of hiking, cold-water swims, and remembering how good it feels to be outside.",
  },
  {
    id: 5,
    title: "Small moments, big memories",
    category: "BEHIND THE SCENES",
    platform: "Instagram",
    image: photos.camera,
    duration: "0:46",
    date: "2025-06-02",
    description:
      "A peek behind the lens, and a reminder that the best moments rarely happen according to plan.",
  },
  {
    id: 6,
    title: "A postcard from the coast",
    category: "TRAVEL DIARY",
    platform: "TikTok",
    image: photos.coast,
    duration: "0:32",
    date: "2025-05-28",
    description:
      "Sun-warmed streets and that impossible shade of blue. Consider this your invitation to take the long way home.",
  },
]
type Interview = Video & {
  guest: string
  role: string
  episode: string
  topic: string
}
const interviews: Interview[] = [
  {
    id: 103,
    title: "Buddhism",
    category: "THE INTERVIEW SERIES",
    platform: "YouTube",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=85",
    duration: "49:56",
    date: "2026-01-12",
    guest: "Temple Abbot Thich Tinh Nghiem and Mr. Paul Cao",
    role: "Buddhist Practitioners",
    episode: "01",
    topic: "Buddhism",
    description:
      "Interview with a Buddhist practitioner to understand Enlightenment and the Eightfold Path.  Special thanks to the Temple Abbot Thich Tinh Nghiem for your wisdom and to Paul Cao for the thoughtful translation.",
  },
  {
    id: 102,
    title: "Islam",
    category: "THE INTERVIEW SERIES",
    platform: "YouTube",
    image:
      "https://images.unsplash.com/photo-1576110598658-096ae24cdb97?auto=format&fit=crop&w=500&q=85",
    duration: "50:23",
    date: "2026-07-11",
    guest: "Mr. Ahmed Basheer",
    role: "Associate Imam ",
    episode: "02",
    topic: "Exploring Islam",
    description:
      "In this interview, we explore Islam through historical, cultural, and contemporary perspectives. Associate Imam Mr. Ahmed Basheer discusses the foundations of Islam, its cultural significance, and how Islamic teachings can help us better understand suffering, purpose, and the human experience.",
  },
  {
    id: 101,
    title: "Christianity",
    category: "THE INTERVIEW SERIES",
    platform: "YouTube",
    image:
      "https://images.unsplash.com/photo-1563064097-bf024f348d31?auto=format&fit=crop&w=500&q=85",
    duration: "",
    date: "2026-10-12",
    guest: "Michael Chaffin",
    role: "Minister",
    episode: "03",
    topic: "Exploring Addiction, Salvation, Sin, and more",
    description: "Understanding Christianity and using it to better our lives.",
  },
]
const posts = [
  {
    title: "Why I’m choosing the slower road",
    category: "PERSONAL NOTES",
    image: photos.mountains,
    date: "June 16, 2025",
    time: "5 min read",
    intro:
      "A few thoughts on doing less, noticing more, and making room for what matters.",
    body: [
      "Somewhere along the way, I started measuring a good day by how much I could fit into it. Another place visited, another video made, another thing crossed off a list. But the moments I kept coming back to were the ones in between.",
      "A quiet morning beside a mountain lake. An unplanned conversation. The long way back to the hotel, with the camera still in my bag. These little pauses were never in the itinerary, and yet they became the things I remembered most.",
      "So lately, I’m choosing the slower road. Not because there’s any less to discover, but because I want to be there when it happens. This is a small reminder, for you and for me: we don’t have to turn every moment into something. Sometimes being in it is enough.",
    ],
  },
  {
    title: "What’s in my camera bag?",
    category: "BEHIND THE LENS",
    image: photos.camera,
    date: "June 8, 2025",
    time: "4 min read",
    intro:
      "My everyday essentials for capturing life, without carrying my whole life.",
    body: [
      "The best camera bag is the one you actually want to carry. Over the years, mine has gotten smaller as I’ve learned what I really reach for when I’m out in the world.",
      "A small camera, one versatile lens, spare batteries, and a notebook. That’s the core of it. My phone fills in the gaps, especially for short clips and spontaneous little moments.",
      "My advice is simple: get comfortable with what you have before adding something new. Learn to see the light. Get closer. Wait a little longer. The equipment is there to help you tell a story, not get between you and it.",
    ],
  },
  {
    title: "A little guide to getting lost",
    category: "TRAVEL & PLACES",
    image: photos.coast,
    date: "May 29, 2025",
    time: "6 min read",
    intro:
      "Leave a little space in your itinerary. That’s where the good stuff happens.",
    body: [
      "I love a good map. I just don’t always love following it. Some of my favorite travel memories started with a wrong turn or a recommendation scribbled on the back of a receipt.",
      "Pick one thing you want to do each day and leave room around it. Find a café that feels welcoming. Ask someone where they go on their day off. Walk until a street makes you curious, and then follow it.",
      "Getting lost isn’t about being careless. Download an offline map, keep your essentials with you, and know how to get home. Then give yourself permission to find something you weren’t looking for.",
    ],
  },
]

function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: string
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {name === "arrow" ? (
        <>
          <path d="M4 12h15M13 6l6 6-6 6" />
        </>
      ) : name === "diagonal" ? (
        <path d="M6 18 18 6M6 6h12v12" />
      ) : name === "play" ? (
        <path d="m9 5 11 7-11 7Z" fill="currentColor" stroke="none" />
      ) : name === "search" ? (
        <>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m16 16 4 4" />
        </>
      ) : name === "close" ? (
        <path d="m6 6 12 12M6 18 18 6" />
      ) : name === "YouTube" ? (
        <>
          <rect x="2" y="5" width="20" height="14" rx="4" />
          <path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none" />
        </>
      ) : name === "Instagram" ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
        </>
      ) : name === "TikTok" ? (
        <>
          <path d="M14 3v12a4 4 0 1 1-4-4M14 3c0 4 3 5 6 5" />
        </>
      ) : name === "mail" ? (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 6 9 7 9-7" />
        </>
      ) : name === "menu" ? (
        <path d="M4 6h16M4 12h16M4 18h16" />
      ) : (
        <path d="m6 9 6 6 6-6" />
      )}
    </svg>
  )
}
function Modal({
  children,
  title,
  onClose,
}: {
  children: ReactNode
  title: string
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    dialog?.showModal()
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      dialog?.close()
      document.body.style.overflow = overflow
    }
  }, [])
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-label={title}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button
        className="modal-close icon-button"
        aria-label="Close dialog"
        onClick={onClose}
      >
        <Icon name="close" />
      </button>
      {children}
    </dialog>
  )
}
function Site() {
  const { pathname } = useLocation()
  const isAbout = pathname === "/about"
  useEffect(() => {
    document.title = isAbout
      ? "About Us · Coping with Suffering"
      : "Coping with Suffering"
  }, [isAbout])
  const [platform, setPlatform] = useState("All videos")
  const [sort, setSort] = useState("newest")
  const [query, setQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [activeVideo, setActiveVideo] = useState<Video | null>(null)
  const [activePost, setActivePost] = useState<typeof posts[number] | null>(
    null,
  )
  const [subscribeOpen, setSubscribeOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const filtered = videos
    .filter(
      (v) =>
        (platform === "All videos" || v.platform === platform) &&
        `${v.title} ${v.category}`.toLowerCase().includes(query.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "newest"
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date),
    )
  const visible =
    showAll || platform !== "All videos" || query
      ? filtered
      : filtered.slice(0, 4)
  const subscribe = (event: React.FormEvent) => {
    event.preventDefault()
    try {
      localStorage.setItem("elsewhere-newsletter-interest", email)
    } catch {
      /* Signup remains usable when storage is unavailable. */
    }
    setSubscribed(true)
  }
  return (
    <>
      <ScrollRestoration />
      <header
        className={isAbout ? "site-header" : "site-header header-overlay"}
      >
        <div className="header-inner">
          <Link
            to="/"
            className="wordmark brand-long"
            aria-label="Coping with Suffering home"
          >
            coping with
            <br />
            suffering<span>.</span>
          </Link>
          <nav
            className={mobileMenu ? "main-nav is-open" : "main-nav"}
            aria-label="Main navigation"
          >
            <Link
              className={!isAbout ? "nav-active" : undefined}
              to="/#videos"
              onClick={() => setMobileMenu(false)}
            >
              Videos
            </Link>
            <Link to="/#interviews" onClick={() => setMobileMenu(false)}>
              Interviews
            </Link>
            <Link to="/#journal" onClick={() => setMobileMenu(false)}>
              Journal
            </Link>
            <Link
              to="/about"
              className={isAbout ? "nav-active" : undefined}
              aria-current={isAbout ? "page" : undefined}
              onClick={() => setMobileMenu(false)}
            >
              About Us
            </Link>
          </nav>
          <div className="header-actions">
            <button
              className="subscribe-button"
              onClick={() => setSubscribeOpen(true)}
            >
              Stay in the loop <Icon name="diagonal" size={15} />
            </button>
            <button
              className="mobile-toggle icon-button"
              aria-label="Toggle navigation"
              aria-expanded={mobileMenu}
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              <Icon name={mobileMenu ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>
      <main className="page-container">
        {isAbout ? (
          <AboutPage />
        ) : (
          <>
            <section className="hero hero-landing" aria-labelledby="hero-title">
              <img
                className="landing-image"
                src={interviewHero}
                alt="Two people seated facing each other during an interview"
                fetchPriority="high"
              />
              <div className="landing-shade" aria-hidden="true" />
              <div className="hero-copy">
                <div className="eyebrow">
                  <span className="" /> NOAH YI · INTERVIEWER
                </div>
                <h1 id="hero-title">
                  Exploring
                  <br />
                  <em>Religion</em>
                </h1>
                <p>
                  Understanding faith and making accesible to everyone
                  <br className="desktop-break" /> A home for my interviews,
                  shorts, and in-depth
                  <br className="desktop-break" /> analyses.
                </p>
                <a className="primary-button" href="#videos">
                  Explore the videos <Icon name="arrow" size={18} />
                </a>
                <div className="hero-social">
                  <span>FIND US ELSEWHERE</span>
                  <a
                    href="https://www.youtube.com/@copingwithsuffering "
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                  >
                    <Icon name="YouTube" size={19} />
                  </a>
                  <a
                    href="https://www.tiktok.com/@copingwithsuffering "
                    target="_blank"
                    rel="noreferrer"
                    aria-label="TikTok"
                  >
                    <Icon name="TikTok" size={18} />
                  </a>
                  <a
                    href="https://www.instagram.com/copingwithsuffering/?hl=it "
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                  >
                    <Icon name="Instagram" size={18} />
                  </a>
                </div>
              </div>
              <button
                className="landing-feature"
                onClick={() => setActiveVideo(videos[0])}
                aria-label="Watch A week of getting lost in Italy"
              >
                <span className="landing-feature-play">
                  <Icon name="play" size={22} />
                </span>
                <span className="landing-feature-copy">
                  <span className="landing-feature-label">
                    LATEST INTERVIEW · 50:23
                  </span>
                  <span className="landing-feature-title">What is Islam?</span>
                </span>
                <Icon name="diagonal" size={18} />
              </button>
            </section>
            <div className="section-rule">
              <span>Interviews & Videos</span>
              <span className="rule-line" />
              <span className="tiny-star">✳</span>
            </div>
            <section className="videos-section" id="videos">
              <div className="section-heading">
                <div>
                  <div className="eyebrow muted">THE VIDEO COLLECTION</div>
                  <h2>
                    Our Interviews<span>.</span>
                  </h2>
                </div>
                <span className="section-aside">
                  Across different platforms
                </span>
              </div>
              <div className="collection-controls">
                <div
                  className="filter-tabs"
                  role="group"
                  aria-label="Filter videos by platform"
                >
                  {["All videos", "YouTube", "TikTok", "Instagram"].map((p) => (
                    <button
                      key={p}
                      className={
                        platform === p ? "filter-tab selected" : "filter-tab"
                      }
                      onClick={() => setPlatform(p)}
                      aria-pressed={platform === p}
                    >
                      {p !== "All videos" && <Icon name={p} size={16} />}
                      {p}
                      {p === "All videos" && (
                        <span className="count">{videos.length}</span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="sort-controls">
                  {searchOpen && (
                    <input
                      className="search-input"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Find a video…"
                      aria-label="Search videos"
                      autoFocus
                    />
                  )}
                  <button
                    className="icon-button search-button"
                    aria-label={searchOpen ? "Close search" : "Search videos"}
                    onClick={() => {
                      setSearchOpen(!searchOpen)
                      setQuery("")
                    }}
                  >
                    <Icon name={searchOpen ? "close" : "search"} size={18} />
                  </button>
                  <span className="sort-divider" />
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    aria-label="Sort videos"
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                  </select>
                </div>
              </div>
              <div className="video-grid">
                {visible.map((v) => (
                  <button
                    className="video-card"
                    key={v.id}
                    onClick={() => setActiveVideo(v)}
                  >
                    <div className="video-image">
                      <img src={v.image} alt={v.title} loading="lazy" />
                      <span
                        className={`platform-badge platform-${v.platform.toLowerCase()}`}
                      >
                        <Icon name={v.platform} size={15} />
                        {v.platform}
                      </span>
                      <span className="card-play">
                        <Icon name="play" size={20} />
                      </span>
                      <span className="duration">{v.duration}</span>
                    </div>
                    <div className="video-category">
                      {v.category}
                      <Icon name="diagonal" size={14} />
                    </div>
                    <h3>{v.title}</h3>
                    <p>
                      {new Date(`${v.date}T12:00:00`).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </button>
                ))}
              </div>
              {visible.length === 0 && (
                <div className="empty-state">
                  No videos found. Try another search or platform.
                </div>
              )}
              {platform === "All videos" && !query && (
                <div className="view-all">
                  <button
                    className="outline-button"
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? "Show less" : "A little more to explore"}
                    <Icon name={showAll ? "close" : "arrow"} size={16} />
                  </button>
                </div>
              )}
            </section>
            <section className="journal-section" id="journal">
              <div className="section-heading">
                <div>
                  <div className="eyebrow muted">WORDS BETWEEN THE FRAMES</div>
                  <h2>
                    From the journal<span>.</span>
                  </h2>
                </div>
                <span className="section-aside">
                  A few things worth putting into words.
                </span>
              </div>
              <div className="journal-grid">
                {posts.map((post) => (
                  <button
                    className="journal-card"
                    onClick={() => setActivePost(post)}
                    key={post.title}
                  >
                    <div className="journal-image">
                      <img src={post.image} alt={post.title} loading="lazy" />
                    </div>
                    <div className="journal-details">
                      <span className="video-category">{post.category}</span>
                      <h3>{post.title}</h3>
                      <p>{post.intro}</p>
                      <span className="post-meta">
                        {post.date}
                        <span>·</span>
                        {post.time}
                        <Icon name="arrow" size={17} />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
            <section
              className="interviews-section"
              id="interviews"
              aria-labelledby="interviews-title"
            >
              <div className="section-heading">
                <div>
                  <div className="eyebrow muted">
                    REAL QUESTIONS. HUMAN CONVERSATIONS.
                  </div>
                  <h2 id="interviews-title">
                    Current Interviews<span>.</span>
                  </h2>
                </div>
                <span className="section-aside">
                  One conversation at a time.
                </span>
              </div>
              <p className="timeline-intro">
                Exploring addiction, faith, trauma, meaning, and suffering.
                Start anywhere
              </p>
              <ol className="interview-timeline">
                {interviews.map((interview) => (
                  <li className="timeline-entry" key={interview.id}>
                    <div className="timeline-date">
                      <time dateTime={interview.date}>
                        {new Date(
                          `${interview.date}T12:00:00`,
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      <span>{interview.date.slice(0, 4)}</span>
                    </div>
                    <span className="timeline-marker" aria-hidden="true" />
                    <button
                      className="interview-card"
                      onClick={() => setActiveVideo(interview)}
                      aria-label={`Watch sample interview: ${interview.title}, with ${interview.guest}`}
                    >
                      <div className="interview-portrait">
                        <img
                          src={interview.image}
                          alt="Illustrative portrait for this sample interview"
                          loading="lazy"
                        />
                        <span className="interview-play">
                          <Icon name="play" size={18} />
                        </span>
                      </div>
                      <div className="interview-details">
                        <div className="interview-kicker">
                          <span>EPISODE {interview.episode}</span>
                          <span className="interview-topic">
                            {interview.topic}
                          </span>
                        </div>
                        <h3>{interview.title}</h3>
                        <p>
                          With {interview.guest} <span>·</span> {interview.role}
                        </p>
                        <div className="interview-watch">
                          <span>
                            Watch conversation <Icon name="arrow" size={15} />
                          </span>
                          <span>
                            {interview.duration}{" "}
                            <span className="interview-platform">
                              · YouTube
                            </span>
                          </span>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ol>
            </section>
            <section className="newsletter">
              <div className="newsletter-symbol">
                <Icon name="mail" size={33} />
              </div>
              <div className="newsletter-copy">
                <div className="eyebrow muted">
                  A LETTER, EVERY NOW AND THEN
                </div>
                <h2>Let’s keep in touch.</h2>
                <p>
                  New videos, fresh stories, and things I think you’ll love. No
                  noise.
                </p>
              </div>
              <button
                className="primary-button"
                onClick={() => setSubscribeOpen(true)}
              >
                Count me in <Icon name="arrow" size={18} />
              </button>
            </section>
          </>
        )}
      </main>
      <footer className="site-footer">
        <Link
          to="/"
          className="wordmark brand-long"
          aria-label="Coping with Suffering home"
        >
          coping with
          <br />
          suffering<span>.</span>
        </Link>
        <span>Made with curiosity. © {new Date().getFullYear()} Noah Yi.</span>
        <div>
          <a
            href="https://www.youtube.com/@copingwithsuffering"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
          >
            <Icon name="YouTube" size={18} />
          </a>
          <a
            href="https://www.tiktok.com/@copingwithsuffering "
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
          >
            <Icon name="TikTok" size={18} />
          </a>
          <a
            href="https://www.instagram.com/copingwithsuffering/?hl=it "
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <Icon name="Instagram" size={18} />
          </a>
          <a href="yinoah8@gmail.com" aria-label="Email Noah">
            <Icon name="mail" size={18} />
          </a>
        </div>
      </footer>
      {activeVideo && (
        <Modal title={activeVideo.title} onClose={() => setActiveVideo(null)}>
          <video
            className="modal-video"
            controls
            autoPlay
            playsInline
            poster={activeVideo.image}
            src="https://www.youtube.com/watch?v=xvKO6Wwra34"
          />
          <div className="modal-content">
            <div className="eyebrow muted">
              {activeVideo.category} · {activeVideo.platform}
            </div>
            <h2>{activeVideo.title}</h2>
            <p>{activeVideo.description}</p>
            <p className="demo-note">
              This is a sample video preview. Replace it with your own video or
              platform embed.
            </p>
            <a
              className="primary-button"
              href={
                activeVideo.platform === "YouTube"
                  ? `https://www.youtube.com/watch?v=xvKO6Wwra34`
                  : activeVideo.platform === "TikTok"
                    ? `https://www.tiktok.com/search?q=${encodeURIComponent(activeVideo.title)}`
                    : "https://www.instagram.com/"
              }
              target="_blank"
              rel="noreferrer"
            >
              Explore on {activeVideo.platform}
              <Icon name="diagonal" size={17} />
            </a>
          </div>
        </Modal>
      )}
      {activePost && (
        <Modal title={activePost.title} onClose={() => setActivePost(null)}>
          <img
            className="article-cover"
            src={activePost.image}
            alt={activePost.title}
          />
          <article className="modal-content article-content">
            <div className="eyebrow muted">
              {activePost.category} · {activePost.time}
            </div>
            <h2>{activePost.title}</h2>
            <span className="article-date">Noah Yi · {activePost.date}</span>
            <p className="article-intro">{activePost.intro}</p>
            {activePost.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </article>
        </Modal>
      )}
      {subscribeOpen && (
        <Modal title="Stay in the loop" onClose={() => setSubscribeOpen(false)}>
          <div className="modal-content subscribe-content">
            <Icon name="mail" size={32} />
            <div className="eyebrow muted">
              LETTERS FROM COPING WITH SUFFERING
            </div>
            <h2>
              {subscribed ? "You’re on the list." : "A little more connection."}
            </h2>
            {subscribed ? (
              <>
                <p>
                  Thanks for being here. Your email has been saved on this
                  device.
                </p>
                <p className="demo-note">Currently in the works</p>
                <button
                  className="primary-button"
                  onClick={() => setSubscribeOpen(false)}
                >
                  Keep looking <Icon name="arrow" size={17} />
                </button>
              </>
            ) : (
              <>
                <p>New interviews, blogs, and more</p>
                <form onSubmit={subscribe}>
                  <label htmlFor="email">Your email address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                  <button className="primary-button" type="submit">
                    Count me in <Icon name="arrow" size={17} />
                  </button>
                </form>
                <p className="demo-note">
                  Demo signup — saved locally, no emails sent.
                </p>
              </>
            )}
          </div>
        </Modal>
      )}
    </>
  )
}

function AboutPage() {
  return (
    <section className="about-page" aria-labelledby="about-title">
      <Link to="/#videos" className="about-back">
        <Icon name="arrow" size={16} />
        Back to the videos
      </Link>
      <div className="about-page-grid">
        <div className="about-page-copy">
          <div className="eyebrow muted"></div>
          <h1 id="about-title">
            About Coping With Suffering<span className="accent">.</span>
          </h1>
          <p className="about-lead">
            A creator, a collector of little moments, and a firm believer that
            there’s a story hiding just about everywhere.
          </p>
          <p>
            Coping with Suffering is my little corner of the internet — a home
            for the places I go, the things I make, and the thoughts that don’t
            quite fit into a video.
          </p>
          <p>
            Thanks for stopping by. Stay a while, find something that makes you
            curious, and let’s see where it takes us.
          </p>
          <a className="primary-button" href="mailto:hello@example.com">
            Let’s make something <Icon name="arrow" size={17} />
          </a>
          <p className="about-demo-note">
            Sample creator bio and contact details, ready to make your own.
          </p>
        </div>
        <figure className="about-page-image">
          <img src={photos.camera} alt="Camera and notebook on a café table" />
          <figcaption>Stories start with paying attention.</figcaption>
        </figure>
      </div>
      <div className="about-explore">
        <div>
          <div className="eyebrow muted">THERE’S MORE TO EXPLORE</div>
          <h2>
            A few places to start<span className="accent">.</span>
          </h2>
        </div>
        <div className="about-explore-links">
          <Link to="/#videos">
            The videos <Icon name="diagonal" size={17} />
          </Link>
          <Link to="/#journal">
            The journal <Icon name="diagonal" size={17} />
          </Link>
          <Link to="/#interviews">
            The interviews <Icon name="diagonal" size={17} />
          </Link>
        </div>
      </div>
    </section>
  )
}

const router = createBrowserRouter([
  { path: "/", Component: Site },
  { path: "/about", Component: Site },
])

export default function App() {
  return <RouterProvider router={router} />
}
