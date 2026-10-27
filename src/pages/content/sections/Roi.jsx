import { useState } from 'react'
import Spacer from '../../../components/Spacer.jsx'
import Img from '../../../components/Img.jsx'
import { StatCard } from '../../../components/RoiCard.jsx'
import { placeholderText } from '../../../sections/index.js'
import { useLenis, scrollToTarget } from '../../../motion/index.js'
import StaticForm from './StaticForm.jsx'

// Placeholder word counts below are measured so each block wraps to the live line count at 1440 and 390.
// Inline SVGs from the original roiReport.js (fills via currentColor; colour set by the parent class).
function ArrowIcon({ className = '' }) {
  return (
    <svg width="37" height="16" viewBox="0 0 37 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M36.7071 8.70711C37.0976 8.31658 37.0976 7.68342 36.7071 7.29289L30.3431 0.928932C29.9526 0.538408 29.3195 0.538408 28.9289 0.928932C28.5384 1.31946 28.5384 1.95262 28.9289 2.34315L34.5858 8L28.9289 13.6569C28.5384 14.0474 28.5384 14.6805 28.9289 15.0711C29.3195 15.4616 29.9526 15.4616 30.3431 15.0711L36.7071 8.70711ZM0 9H36V7H0V9Z"
        fill="currentColor"
      />
    </svg>
  )
}
function RetentionIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 0.5C3.41 0.5 0.5 3.41 0.5 7C0.5 10.59 3.41 13.5 7 13.5C10.59 13.5 13.5 10.59 13.5 7C13.5 3.41 10.59 0.5 7 0.5ZM7 12C4.24 12 2 9.76 2 7C2 4.24 4.24 2 7 2C9.76 2 12 4.24 12 7C12 9.76 9.76 12 7 12ZM9.18 4.12L5.5 7.8L4.32 6.63L3.25 7.7L5.5 9.95L10.25 5.2L9.18 4.12Z"
        fill="currentColor"
      />
    </svg>
  )
}
function RevenueIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5ZM9 15C5.69 15 3 12.31 3 9C3 5.69 5.69 3 9 3C12.31 3 15 5.69 15 9C15 12.31 12.31 15 9 15ZM9.38 8.62C7.93 8.22 7.46 7.79 7.46 7.14C7.46 6.39 8.16 5.86 9.3 5.86C10.5 5.86 10.95 6.45 10.98 7.31H12.24C12.2 6.12 11.48 5.04 10.08 4.68V3.46H8.54V4.66C7.24 4.94 6.2 5.78 6.2 7.15C6.2 8.78 7.56 9.6 9.56 10.06C11.36 10.46 11.74 11.06 11.74 11.7C11.74 12.17 11.42 12.92 10.1 12.92C8.88 12.92 8.32 12.27 8.26 11.47H7C7.06 13 8.26 13.8 8.54 14.04V15.26H10.08V14.08C11.38 13.84 12.42 13.08 12.42 11.68C12.42 9.67 10.84 9.02 9.38 8.62Z"
        fill="currentColor"
      />
    </svg>
  )
}

const GLASS = 'rounded-glass border-[1.656px] border-solid border-glass-border bg-glass p-[16px] shadow-glass-lg backdrop-blur-[2px]'
const H2 = 'font-serif text-[40px] leading-[46px] tracking-[-0.015em]'

function useScrollToForm() {
  const lenis = useLenis()
  return (e) => {
    e?.preventDefault()
    scrollToTarget(lenis, '#roi-form')
  }
}

/** N13a RoiHero */
export function RoiHero() {
  const toForm = useScrollToForm()
  return (
    <div className="roi-hero relative flex min-h-[100svh] flex-col bg-navy p-[40px] pt-[90px] text-blue t:min-h-[calc(20px+100svh)] m:p-[20px]">
      <div className="roi-hero__inner relative z-2 m-auto flex w-full max-w-[1600px] items-center gap-[70px] lgm:gap-[20px] m:mt-[95px] m:flex-wrap">
        <div className="w-1/2 m:w-full">
          <div className="mx-auto flex max-w-[600px] flex-col gap-[40px]">
            <h1 className="font-serif text-[48px] leading-[52px] tracking-[-0.02em]">Cadmus Return on Investment Report</h1>
            <p className="text-[16px] uppercase leading-[1.3] tracking-[0.025em]">independent analysis by Nous Group</p>
            <div className="f-18 m-fs-16 mb-[20px] max-w-[550px] m:m-0">
              <p>What is the return on investment of modern assessment?</p>
              <p>{placeholderText(29, 3)}</p>
            </div>
            <a href="#roi-form" onClick={toForm} className="roi-button roi-button--light self-start">
              Get the ROI report
              <ArrowIcon />
            </a>
          </div>
        </div>
        <div className="roi-hero__image-col relative w-1/2 m:flex m:w-full m:flex-col m:pb-[40px]">
          <Img
            src="/assets/1771385426-screenshot-2026-02-18-at-1-30-17-pm.png"
            width={1558}
            height={1080}
            alt=""
            className="roi-hero__image w-full rounded-img shadow-roi-image"
          />
          <StatCard
            number="7.1"
            label="average return on investment"
            tone="blue"
            position="roi-hero__stat-pos absolute right-[-20px] top-[80px] z-3"
            mobile="m:relative m:right-[20px] m:top-auto m:order-[-1] m:-mb-[30px] m:self-end"
          />
        </div>
      </div>
    </div>
  )
}

function Badge({ icon, text, className }) {
  return (
    <div className={`absolute ${GLASS} ${className}`}>
      <div className="roi-why__badge-inner inline-flex items-center gap-[14px] rounded-badge bg-roi-pale p-[10px] text-navy shadow-badge">
        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-icon border-[0.76px] border-solid border-roi-badge-border bg-blue">
          {icon}
        </span>
        <span className="whitespace-nowrap text-[16px] uppercase leading-[1.3] tracking-[0.05em]">{text}</span>
      </div>
    </div>
  )
}

/** N13b RoiWhySection */
export function RoiWhy() {
  return (
    <section className="roi-why-section relative z-2 -mt-[40px] rounded-t-sheet bg-cream p-[40px] m:p-[20px]">
      <div className="mx-auto mt-[40px] max-w-[1400px]">
        <div className="roi-why__inner flex items-center gap-[100px] lgm:gap-[20px] m:flex-wrap">
          <div className="w-1/2 m:w-full">
            <div className="flex max-w-[550px] flex-col gap-[40px]">
              <h2 className={H2}>Why ROI in Assessment Matters Now</h2>
              <div className="f-18 m-fs-16 with-bold flex flex-col gap-[20px]">
                <p>{placeholderText(22, 1)}</p>
                <ul className="ml-[20px] gap-[12px]">
                  {[10, 15, 18, 15].map((w, i) => (
                    <li key={i}>
                      <p>{placeholderText(w, 10 + i)}</p>
                    </li>
                  ))}
                </ul>
                <p>
                  <strong>{placeholderText(40, 20)}</strong>
                </p>
                <p>
                  <strong>{placeholderText(34, 21)}</strong>
                </p>
                <p>{placeholderText(16, 22)}</p>
              </div>
            </div>
          </div>
          <div className="roi-why__image-wrapper relative w-1/2 lgm:mb-[60px] m:w-full">
            <div className={`roi-glass-card roi-why__image-card ${GLASS}`}>
              <Img
                src="/assets/1771204444-roi-why-section-photo.jpeg"
                width={2704}
                height={3862}
                alt=""
                loading="lazy"
                className="w-full rounded-photo"
              />
            </div>
            <div className="roi-why__badges pointer-events-none absolute inset-0 z-3">
              <Badge icon={<RetentionIcon />} text="impacts retention" className="left-[-70px] top-[55%] lgm:left-0 lgm:top-[48%]" />
              <Badge icon={<RevenueIcon />} text="impacts revenue" className="right-[-70px] top-[20%] lgm:right-0 lgm:top-[16%]" />
              <StatCard
                number="7.1x"
                label="average return on investment"
                tone="blue"
                position="absolute bottom-[-60px] left-[30%] z-3"
                mobile="lgm:bottom-[-50px] lgm:left-1/2 lgm:-translate-x-1/2"
              />
            </div>
          </div>
        </div>
      </div>
      <Spacer />
    </section>
  )
}

const VIMEO = 'https://player.vimeo.com/video/1165567465'

/** N13c RoiVideoSection (click-to-play pattern from FeaturedVideo). */
export function RoiVideo() {
  const [playing, setPlaying] = useState(false)
  const toForm = useScrollToForm()
  return (
    <section className="roi-video-section relative z-2 bg-cream p-[40px] m:p-[20px]">
      <div className="mx-auto my-[40px] max-w-[1400px]">
        <div className="roi-video__inner flex items-center gap-[100px] lgm:gap-[40px] m:flex-wrap">
          <div className="w-1/2 m:w-full">
            {playing ? (
              <iframe
                src={`${VIMEO}?autoplay=1`}
                title="Watch the ROI briefing with Nous Group"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="aspect-video w-full"
              />
            ) : (
              <div
                role="button"
                tabIndex={0}
                aria-label="Play video"
                onClick={() => setPlaying(true)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setPlaying(true)}
                className="roi-video__thumbnail relative cursor-pointer overflow-hidden rounded-img"
              >
                <Img
                  src="/assets/1771385356-vimeo-cover-image-3.png"
                  width={1728}
                  height={972}
                  alt=""
                  loading="lazy"
                  className="w-full"
                />
                <span className="roi-video__play" />
              </div>
            )}
          </div>
          <div className="w-1/2 m:w-full">
            <div className="flex flex-col gap-[40px]">
              <h2 className={H2}>Watch the ROI briefing with Nous Group</h2>
              <div className="f-18 m-fs-16 flex flex-col gap-[20px]">
                <p>{placeholderText(12, 30)}</p>
                <ul>
                  {[9, 9, 9, 12].map((w, i) => (
                    <li key={i}>{placeholderText(w, 31 + i)}</li>
                  ))}
                </ul>
                <p>{placeholderText(23, 36)}</p>
              </div>
              <div className="flex gap-[20px] m:flex-wrap">
                <button type="button" className="roi-button roi-button--dark" onClick={() => setPlaying(true)}>
                  Watch the webinar
                </button>
                <a href="#roi-form" onClick={toForm} className="roi-button roi-button--outline">
                  Download the report
                  <ArrowIcon className="text-ink" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Spacer />
    </section>
  )
}

/** N13d RoiFormSection #roi-form (static stand-in: no request is sent). */
export function RoiForm() {
  return (
    <section id="roi-form" className="roi-form-section relative z-2 -mt-[40px] rounded-t-sheet bg-blue p-[40px] m:p-[20px]">
      <div className="mx-auto my-[40px] max-w-[1200px]">
        <div className="roi-form__inner flex items-start gap-[100px] lgm:gap-[40px] m:flex-wrap">
          <div className="w-[40%] m:w-full">
            <div className="flex flex-col gap-[40px]">
              <h2 className="font-serif text-[48px] leading-[52px] tracking-[-0.02em] [text-wrap:balance]">
                Get your copy of the independent ROI report
              </h2>
              <p className="f-18 m-fs-16">{placeholderText(37, 40)}</p>
            </div>
          </div>
          <div className="relative w-[60%] shrink-0 grow m:w-full">
            <StaticForm
              name="roi-report-download"
              fields={[
                { name: 'name', label: 'Name*' },
                { name: 'university', label: 'University*' },
                { name: 'email', label: 'Email*', type: 'email' },
              ]}
              consent="I agree to receive communication from Cadmus. You can unsubscribe at any time.*"
              submit="Download report"
              thanks="Your download will begin shortly."
              inputClass="border-vellum"
              overlayBg="bg-blue"
            />
          </div>
        </div>
      </div>
      <Spacer />
    </section>
  )
}
