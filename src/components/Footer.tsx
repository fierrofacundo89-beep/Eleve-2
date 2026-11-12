import { Reveal } from './primitives'

export default function Footer() {
  return (
    <footer className="relative border-t border-ivory/10 bg-ink">
      <div className="mx-auto max-w-[1680px] px-6 pb-10 pt-20 md:px-12 md:pt-28">
        <Reveal>
          <div className="grid gap-14 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-display text-4xl tracking-luxe text-ivory md:text-5xl">ÉLÉVÉ</p>
              <p className="mt-6 max-w-sm text-sm font-light leading-[1.9] text-stone">
                A different perspective on fine dining — contemporary haute cuisine in the
                heart of Paris.
              </p>
            </div>

            <div className="md:col-span-2 md:col-start-7">
              <p className="text-[0.62rem] uppercase tracking-luxe text-champagne/80">Visit</p>
              <p className="mt-5 text-sm font-light leading-[2] text-stone">
                12 Rue de l'Éclat
                <br />
                75004 Paris
                <br />
                France
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-[0.62rem] uppercase tracking-luxe text-champagne/80">Hours</p>
              <p className="mt-5 text-sm font-light leading-[2] text-stone">
                Tue — Sat
                <br />
                19:00 — 23:30
                <br />
                Closed Sun & Mon
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-[0.62rem] uppercase tracking-luxe text-champagne/80">Contact</p>
              <ul className="mt-5 space-y-2 text-sm font-light text-stone">
                <li>
                  <a
                    href="mailto:reservations@eleve-paris.example"
                    className="gold-underline transition-colors hover:text-ivory"
                  >
                    Write to us
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+33142000000"
                    className="gold-underline transition-colors hover:text-ivory"
                  >
                    +33 1 42 00 00 00
                  </a>
                </li>
                <li>
                  <a href="#reservations" className="gold-underline transition-colors hover:text-ivory">
                    Reserve a table
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-8 text-[0.62rem] uppercase tracking-wide2 text-stone/60 md:flex-row md:items-center">
          <p>© MMXXVI ÉLÉVÉ — A fictional restaurant, crafted as a digital experience.</p>
          <a href="#top" className="gold-underline tracking-luxe text-stone transition-colors hover:text-champagne">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
