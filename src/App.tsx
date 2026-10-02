import { useState, useEffect } from 'react'

type Screen = 'onboarding' | 'home' | 'profile'

interface UserData {
  firstName: string
  lastName: string
  email: string
}

const STORAGE_KEY = 'little_lemon_user'

const CATEGORIES = ['All', 'Starters', 'Mains', 'Pasta', 'Salads', 'Desserts', 'Drinks']

const MENU_ITEMS = [
  {
    id: 1, category: 'Starters', name: 'Greek Salad',
    desc: 'Cucumber, tomato, olives, red onion, barrel-aged feta, oregano, extra-virgin olive oil',
    price: 12, rating: 4.9, time: '8 min',
    img: 'https://images.unsplash.com/photo-1471253794676-0f039a6aae9d?w=400&h=300&fit=crop&auto=format',
  },
  {
    id: 2, category: 'Starters', name: 'Bruschetta',
    desc: 'Grilled sourdough, roasted cherry tomatoes, basil, garlic, aged balsamic',
    price: 10, rating: 4.8, time: '10 min',
    img: 'https://images.unsplash.com/photo-1564759224907-65b945ff0e84?w=400&h=300&fit=crop&auto=format',
  },
  {
    id: 3, category: 'Starters', name: 'Hummus & Warm Pita',
    desc: 'House-made hummus, smoked paprika, pine nuts, olive oil, fresh herbs',
    price: 9, rating: 4.7, time: '7 min',
    img: 'https://images.unsplash.com/photo-1533606117812-0783e8e690f1?w=400&h=300&fit=crop&auto=format',
  },
  {
    id: 4, category: 'Mains', name: 'Grilled Branzino',
    desc: 'Whole Mediterranean sea bass, lemon-herb butter, caperberries, roasted fennel',
    price: 32, rating: 4.9, time: '22 min',
    img: 'https://images.unsplash.com/photo-1557499305-0af888c3d8ec?w=400&h=300&fit=crop&auto=format',
  },
  {
    id: 5, category: 'Mains', name: 'Lamb Chops',
    desc: 'Frenched rack, rosemary-garlic marinade, tzatziki, grilled flatbread',
    price: 38, rating: 5.0, time: '25 min',
    img: 'https://images.unsplash.com/photo-1484325881845-65073528922e?w=400&h=300&fit=crop&auto=format',
  },
  {
    id: 6, category: 'Mains', name: 'Chicken Shawarma Plate',
    desc: 'Marinated thigh, saffron rice, pickled turnips, garlic toum, sumac onions',
    price: 22, rating: 4.8, time: '18 min',
    img: 'https://images.unsplash.com/photo-1471253794676-0f039a6aae9d?w=400&h=300&fit=crop&auto=format',
  },
  {
    id: 7, category: 'Pasta', name: 'Pasta al Limone',
    desc: 'Bronze-cut spaghetti, preserved lemon, Pecorino, toasted breadcrumbs, fresh mint',
    price: 19, rating: 4.8, time: '16 min',
    img: 'https://images.unsplash.com/photo-1458644267420-66bc8a5f21e4?w=400&h=300&fit=crop&auto=format',
  },
  {
    id: 8, category: 'Pasta', name: 'Shrimp Orzo',
    desc: 'Jumbo shrimp, orzo, ouzo cream, cherry tomatoes, dill, feta crumble',
    price: 24, rating: 4.7, time: '18 min',
    img: 'https://images.unsplash.com/photo-1484325881845-65073528922e?w=400&h=300&fit=crop&auto=format',
  },
  {
    id: 9, category: 'Salads', name: 'Fattoush',
    desc: 'Romaine, radish, mint, sumac, pomegranate molasses, crispy pita chips',
    price: 13, rating: 4.6, time: '8 min',
    img: 'https://images.unsplash.com/photo-1471253794676-0f039a6aae9d?w=400&h=300&fit=crop&auto=format',
  },
  {
    id: 10, category: 'Desserts', name: 'Baklava',
    desc: 'Walnut & pistachio, honey-rose syrup, crisp phyllo, orange blossom cream',
    price: 11, rating: 4.9, time: '5 min',
    img: 'https://images.unsplash.com/photo-1533606117812-0783e8e690f1?w=400&h=300&fit=crop&auto=format',
  },
  {
    id: 11, category: 'Desserts', name: 'Lemon Posset',
    desc: 'Silky lemon curd, fresh berries, tuile, candied lemon zest',
    price: 9, rating: 4.8, time: '5 min',
    img: 'https://images.unsplash.com/photo-1564759224907-65b945ff0e84?w=400&h=300&fit=crop&auto=format',
  },
  {
    id: 12, category: 'Drinks', name: 'Negroni Bianco',
    desc: 'Gin, Cocchi Americano, Suze, grapefruit zest',
    price: 16, rating: 4.8, time: '4 min',
    img: 'https://images.unsplash.com/photo-1500217052183-bc01eee1a74e?w=400&h=300&fit=crop&auto=format',
  },
  {
    id: 13, category: 'Drinks', name: 'Aperol Spritz Rosa',
    desc: 'Aperol, Rosé Prosecco, blood orange bitters, dried hibiscus',
    price: 14, rating: 4.7, time: '3 min',
    img: 'https://images.unsplash.com/photo-1605270012917-bf157c5a9541?w=400&h=300&fit=crop&auto=format',
  },
  {
    id: 14, category: 'Drinks', name: 'Amalfi Lemon Margarita',
    desc: 'Blanco tequila, limoncello, Amalfi lemon juice, sea salt rim',
    price: 17, rating: 4.9, time: '4 min',
    img: 'https://images.unsplash.com/photo-1556855810-ac404aa91e85?w=400&h=300&fit=crop&auto=format',
  },
  {
    id: 15, category: 'Drinks', name: 'Fino Martini',
    desc: 'Tanqueray 10, Tio Pepe Fino, Castelvetrano olive, lemon oil',
    price: 18, rating: 4.9, time: '4 min',
    img: 'https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?w=400&h=300&fit=crop&auto=format',
  },
  {
    id: 16, category: 'Drinks', name: 'Sparkling Elderflower Spritz',
    desc: 'St-Germain, Champagne, cucumber water, fresh mint — non-alcoholic option available',
    price: 13, rating: 4.6, time: '3 min',
    img: 'https://images.unsplash.com/photo-1607622750671-6cd9a99eabd1?w=400&h=300&fit=crop&auto=format',
  },
]

function timeGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

// ─── Shared input component ───────────────────────────────────────────────────
function Field({
  label, type = 'text', value, onChange, placeholder, error, darkBg = false,
}: {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  error?: string
  darkBg?: boolean
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5 tracking-widest" style={{ color: '#8a7d72' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-colors duration-150"
        style={{
          background: darkBg ? '#0f0d0b' : '#1c1916',
          color: '#faf5ef',
          border: error
            ? '1.5px solid #ef4444'
            : focused
              ? '1.5px solid #f59e0b'
              : '1.5px solid #2a2420',
          fontFamily: 'Outfit, sans-serif',
        }}
      />
      {error && <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>{error}</p>}
    </div>
  )
}

// ─── Onboarding ───────────────────────────────────────────────────────────────
function OnboardingScreen({ onComplete }: { onComplete: (user: UserData) => void }) {
  const [step, setStep] = useState<'splash' | 'form'>('splash')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Partial<Record<keyof UserData, string>>>({})

  const allFilled = firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== ''

  const handleNext = () => {
    const e: Partial<Record<keyof UserData, string>> = {}
    if (!firstName.trim()) e.firstName = 'First name is required'
    if (!lastName.trim()) e.lastName = 'Last name is required'
    if (!email.trim()) e.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) e.email = 'Enter a valid email address'
    if (Object.keys(e).length) { setErrors(e); return }
    const user: UserData = { firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    onComplete(user)
  }

  // ── Splash ──
  if (step === 'splash') {
    return (
      <div
        className="min-h-dvh flex flex-col items-center justify-center px-6 relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 60% 30%, #1c1410 0%, #0f0d0b 70%)' }}
      >
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/3 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #ea580c 0%, transparent 70%)' }} />

        <div className="relative z-10 text-center w-full max-w-sm">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 border"
            style={{ borderColor: '#f59e0b33', background: '#f59e0b11' }}
          >
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#f59e0b' }}>
              Mediterranean · Chicago
            </span>
          </div>

          <h1
            className="mb-2 leading-none"
            style={{ fontFamily: 'Fraunces, serif', fontSize: '3.5rem', fontWeight: 700, color: '#faf5ef' }}
          >
            Little Lemon
          </h1>
          <p
            className="mb-2"
            style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: '1.1rem', color: '#d4c9be' }}
          >
            Restaurant & Delivery
          </p>
          <p className="mb-10 text-sm leading-relaxed" style={{ color: '#8a7d72' }}>
            Authentic Mediterranean flavours crafted by brothers Adrian and Mario — brought to your door within the hour.
          </p>

          <div
            className="w-full h-48 rounded-2xl mb-10 overflow-hidden relative"
            style={{ background: '#1c1916' }}
          >
            <img
              src="https://images.unsplash.com/photo-1484325881845-65073528922e?w=600&h=400&fit=crop&auto=format"
              alt="Little Lemon signature dish"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0f0d0b88, transparent)' }} />
          </div>

          <button
            onClick={() => setStep('form')}
            className="w-full py-4 rounded-2xl font-semibold text-base transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{ background: '#f59e0b', color: '#0f0d0b', fontFamily: 'Outfit, sans-serif' }}
          >
            Get Started
          </button>
        </div>
      </div>
    )
  }

  // ── Onboarding form ──
  return (
    <div
      className="min-h-dvh flex flex-col px-6 py-10 relative overflow-hidden"
      style={{ background: '#0f0d0b' }}
    >
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col flex-1">
        {/* Back to splash */}
        <button
          onClick={() => setStep('splash')}
          className="flex items-center gap-2 mb-8 text-sm transition-opacity hover:opacity-70 self-start"
          style={{ color: '#8a7d72' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        {/* Heading */}
        <div className="mb-1">
          <p className="text-xs font-medium tracking-widest uppercase mb-1" style={{ color: '#f59e0b' }}>
            Little Lemon
          </p>
          <h2
            className="leading-tight"
            style={{ fontFamily: 'Fraunces, serif', fontSize: '2rem', fontWeight: 700, color: '#faf5ef' }}
          >
            Create your account
          </h2>
          <p className="mt-1 mb-8 text-sm" style={{ color: '#8a7d72' }}>
            Tell us a little about yourself to get started
          </p>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-4 mb-8">
          <Field
            label="FIRST NAME"
            value={firstName}
            onChange={v => { setFirstName(v); setErrors(p => ({ ...p, firstName: undefined })) }}
            placeholder="Adrian"
            error={errors.firstName}
          />
          <Field
            label="LAST NAME"
            value={lastName}
            onChange={v => { setLastName(v); setErrors(p => ({ ...p, lastName: undefined })) }}
            placeholder="Lemon"
            error={errors.lastName}
          />
          <Field
            label="EMAIL"
            type="email"
            value={email}
            onChange={v => { setEmail(v); setErrors(p => ({ ...p, email: undefined })) }}
            placeholder="you@example.com"
            error={errors.email}
          />
        </div>

        {/* Next button — disabled until all fields are non-empty (trimmed) */}
        <button
          onClick={handleNext}
          disabled={!allFilled}
          className="w-full py-4 rounded-2xl font-semibold text-base transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-35 disabled:cursor-not-allowed"
          style={{ background: '#f59e0b', color: '#0f0d0b', fontFamily: 'Outfit, sans-serif' }}
        >
          Next
        </button>

        <p className="mt-5 text-xs text-center" style={{ color: '#3d3530' }}>
          Your data is stored locally on this device only
        </p>
      </div>
    </div>
  )
}

// ─── Home Screen ──────────────────────────────────────────────────────────────
function HomeScreen({ user, onGoProfile }: { user: UserData; onGoProfile: () => void }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = MENU_ITEMS.filter(item => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory
    const matchesSearch =
      !search.trim() ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="min-h-dvh" style={{ background: '#0f0d0b' }}>
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-20 px-5 py-4 flex items-center justify-between"
        style={{ background: '#0f0d0bdd', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1c1916' }}
      >
        <div>
          <p className="text-xs font-medium tracking-widest uppercase" style={{ color: '#f59e0b' }}>
            {timeGreeting()}
          </p>
          <h2
            className="text-lg font-semibold leading-tight"
            style={{ color: '#faf5ef', fontFamily: 'Fraunces, serif' }}
          >
            {user.firstName} {user.lastName}
          </h2>
        </div>
        <button
          onClick={onGoProfile}
          aria-label="Go to profile"
          className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all hover:opacity-80 active:scale-95"
          style={{ background: '#f59e0b', color: '#0f0d0b', fontFamily: 'Outfit, sans-serif' }}
        >
          {user.firstName[0]?.toUpperCase()}{user.lastName[0]?.toUpperCase()}
        </button>
      </header>

      <div className="px-5 pb-16">
        {/* ── Hero ── */}
        <div
          className="mt-6 mb-6 rounded-3xl overflow-hidden relative"
          style={{ background: '#1c1916', height: '13rem' }}
        >
          <img
            src="https://images.unsplash.com/photo-1484325881845-65073528922e?w=800&h=420&fit=crop&auto=format"
            alt="Little Lemon signature lamb chops"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 flex flex-col justify-end p-5"
            style={{ background: 'linear-gradient(to top, #0f0d0bdd 0%, #0f0d0b44 60%, transparent 100%)' }}
          >
            <div
              className="inline-flex items-center gap-1.5 mb-2 px-2.5 py-1 rounded-full"
              style={{ background: '#f59e0b', width: 'fit-content' }}
            >
              <span className="text-xs font-semibold" style={{ color: '#0f0d0b' }}>TODAY'S SPECIAL</span>
            </div>
            <h3
              className="text-xl font-semibold leading-tight"
              style={{ fontFamily: 'Fraunces, serif', color: '#faf5ef' }}
            >
              Lamb Chops
            </h3>
            <p className="text-xs mt-0.5" style={{ color: '#d4c9be' }}>
              Rosemary-garlic marinade, tzatziki & grilled flatbread
            </p>
          </div>
        </div>

        {/* ── Restaurant Description ── */}
        <div
          className="mb-6 p-4 rounded-2xl"
          style={{ background: '#1c1916', border: '1px solid #2a2420' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              style={{ fontFamily: 'Fraunces, serif', fontSize: '1rem', fontWeight: 600, color: '#faf5ef' }}
            >
              Little Lemon
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: '#f59e0b22', color: '#f59e0b' }}
            >
              Open Now
            </span>
          </div>
          <p className="text-xs leading-relaxed mb-3" style={{ color: '#8a7d72' }}>
            Founded by brothers Adrian and Mario in Chicago, Little Lemon is a neighbourhood Mediterranean restaurant with a modern twist. We source seasonal produce from local Illinois farms and import staple ingredients directly from Greece and Lebanon.
          </p>
          <div className="flex gap-4">
            <div className="text-center">
              <p
                className="text-base font-semibold"
                style={{ color: '#f59e0b', fontFamily: 'Fraunces, serif' }}
              >
                4.9
              </p>
              <p className="text-xs" style={{ color: '#8a7d72' }}>Rating</p>
            </div>
            <div className="w-px self-stretch" style={{ background: '#2a2420' }} />
            <div className="text-center">
              <p
                className="text-base font-semibold"
                style={{ color: '#f59e0b', fontFamily: 'Fraunces, serif' }}
              >
                3,200+
              </p>
              <p className="text-xs" style={{ color: '#8a7d72' }}>Reviews</p>
            </div>
            <div className="w-px self-stretch" style={{ background: '#2a2420' }} />
            <div className="text-center">
              <p
                className="text-base font-semibold"
                style={{ color: '#f59e0b', fontFamily: 'Fraunces, serif' }}
              >
                25 min
              </p>
              <p className="text-xs" style={{ color: '#8a7d72' }}>Avg delivery</p>
            </div>
          </div>
        </div>

        {/* ── Search Bar ── */}
        <div className="relative mb-5">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: '#8a7d72' }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search dishes…"
            className="w-full pl-10 pr-4 py-3.5 rounded-2xl text-sm outline-none"
            style={{
              background: '#1c1916',
              color: '#faf5ef',
              border: '1.5px solid #2a2420',
              fontFamily: 'Outfit, sans-serif',
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
              style={{ background: '#3d3530', color: '#8a7d72' }}
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* ── Menu Categories ── */}
        <div
          className="flex gap-2 mb-5 overflow-x-auto pb-1"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex-none px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 whitespace-nowrap"
              style={{
                background: activeCategory === cat ? '#f59e0b' : '#1c1916',
                color: activeCategory === cat ? '#0f0d0b' : '#8a7d72',
                border: activeCategory === cat ? '1.5px solid #f59e0b' : '1.5px solid #2a2420',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Food Menu List ── */}
        <div>
          <h3
            className="mb-3 text-base font-semibold"
            style={{ color: '#faf5ef', fontFamily: 'Fraunces, serif' }}
          >
            {activeCategory === 'All' ? 'Our Menu' : activeCategory}
            <span className="ml-2 text-sm font-normal" style={{ color: '#8a7d72' }}>
              ({filtered.length})
            </span>
          </h3>

          {filtered.length === 0 ? (
            <div className="text-center py-14">
              <p className="text-2xl mb-2">🍋</p>
              <p className="text-sm" style={{ color: '#8a7d72' }}>No dishes match your search</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map(item => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FoodCard({ item }: { item: (typeof MENU_ITEMS)[0] }) {
  const [added, setAdded] = useState(false)

  return (
    <div
      className="flex gap-3 p-3 rounded-2xl transition-opacity duration-150 hover:opacity-90"
      style={{ background: '#1c1916', border: '1px solid #2a2420' }}
    >
      <div
        className="w-20 h-20 rounded-xl overflow-hidden flex-none"
        style={{ background: '#2a2420' }}
      >
        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-semibold leading-tight"
          style={{ color: '#faf5ef', fontFamily: 'Fraunces, serif' }}
        >
          {item.name}
        </p>
        <p
          className="text-xs mt-0.5 leading-relaxed"
          style={{
            color: '#8a7d72',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          } as React.CSSProperties}
        >
          {item.desc}
        </p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold" style={{ color: '#faf5ef' }}>${item.price}</span>
            <span className="flex items-center gap-1 text-xs" style={{ color: '#8a7d72' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {item.rating}
            </span>
            <span className="text-xs" style={{ color: '#8a7d72' }}>{item.time}</span>
          </div>
          <button
            onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1800) }}
            aria-label={added ? 'Added to order' : `Add ${item.name}`}
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90"
            style={{ background: added ? '#16a34a' : '#f59e0b', color: '#0f0d0b' }}
          >
            {added ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Profile Screen ───────────────────────────────────────────────────────────
function ProfileScreen({
  user,
  onBack,
  onSave,
  onLogout,
}: {
  user: UserData
  onBack: () => void
  onSave: (u: UserData) => void
  onLogout: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [errors, setErrors] = useState<Partial<Record<keyof UserData, string>>>({})
  const [savedBanner, setSavedBanner] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  // Sync local edit state if parent user changes (e.g. after a save cycle)
  useEffect(() => {
    if (!editing) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setEmail(user.email)
    }
  }, [user, editing])

  const handleSave = () => {
    const e: Partial<Record<keyof UserData, string>> = {}
    if (!firstName.trim()) e.firstName = 'First name is required'
    if (!lastName.trim()) e.lastName = 'Last name is required'
    if (!email.trim()) e.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) e.email = 'Enter a valid email address'
    if (Object.keys(e).length) { setErrors(e); return }
    const updated: UserData = { firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    onSave(updated)
    setEditing(false)
    setErrors({})
    setSavedBanner(true)
    setTimeout(() => setSavedBanner(false), 2500)
  }

  const handleCancel = () => {
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setEmail(user.email)
    setErrors({})
    setEditing(false)
  }

  return (
    <div className="min-h-dvh" style={{ background: '#0f0d0b' }}>
      {/* ── Header with Back button ── */}
      <header
        className="sticky top-0 z-20 px-5 py-4 flex items-center gap-3"
        style={{ background: '#0f0d0bdd', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1c1916' }}
      >
        <button
          onClick={onBack}
          aria-label="Back to Home"
          className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-70 active:scale-95"
          style={{ background: '#1c1916', color: '#faf5ef', border: '1px solid #2a2420' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold" style={{ fontFamily: 'Fraunces, serif', color: '#faf5ef' }}>
          My Profile
        </h2>
        <div className="flex-1" />
        {savedBanner && (
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: '#16a34a22', color: '#4ade80' }}
          >
            Changes saved ✓
          </span>
        )}
      </header>

      <div className="px-5 pb-16">
        {/* ── Avatar ── */}
        <div className="flex flex-col items-center py-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-semibold mb-3"
            style={{ background: '#f59e0b', color: '#0f0d0b', fontFamily: 'Fraunces, serif' }}
          >
            {user.firstName[0]?.toUpperCase()}{user.lastName[0]?.toUpperCase()}
          </div>
          <h3
            className="text-xl font-semibold"
            style={{ fontFamily: 'Fraunces, serif', color: '#faf5ef' }}
          >
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-sm mt-0.5" style={{ color: '#8a7d72' }}>{user.email}</p>
        </div>

        {/* ── Personal Details Card ── */}
        <div
          className="rounded-2xl overflow-hidden mb-4"
          style={{ background: '#1c1916', border: '1px solid #2a2420' }}
        >
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: '1px solid #2a2420' }}
          >
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: '#8a7d72' }}
            >
              Personal Information
            </span>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="text-xs font-semibold transition-opacity hover:opacity-70"
                style={{ color: '#f59e0b' }}
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleCancel}
                className="text-xs font-medium transition-opacity hover:opacity-70"
                style={{ color: '#8a7d72' }}
              >
                Cancel
              </button>
            )}
          </div>

          <div className="p-4 flex flex-col gap-4">
            {editing ? (
              <>
                <Field
                  label="FIRST NAME"
                  value={firstName}
                  onChange={v => { setFirstName(v); setErrors(p => ({ ...p, firstName: undefined })) }}
                  error={errors.firstName}
                  darkBg
                />
                <Field
                  label="LAST NAME"
                  value={lastName}
                  onChange={v => { setLastName(v); setErrors(p => ({ ...p, lastName: undefined })) }}
                  error={errors.lastName}
                  darkBg
                />
                <Field
                  label="EMAIL"
                  type="email"
                  value={email}
                  onChange={v => { setEmail(v); setErrors(p => ({ ...p, email: undefined })) }}
                  error={errors.email}
                  darkBg
                />
                <button
                  onClick={handleSave}
                  className="w-full mt-1 py-3.5 rounded-xl font-semibold text-sm transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
                  style={{ background: '#f59e0b', color: '#0f0d0b', fontFamily: 'Outfit, sans-serif' }}
                >
                  Save Changes
                </button>
              </>
            ) : (
              <>
                {[
                  { label: 'FIRST NAME', value: user.firstName },
                  { label: 'LAST NAME', value: user.lastName },
                  { label: 'EMAIL', value: user.email },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p
                      className="text-xs font-medium mb-1 tracking-widest"
                      style={{ color: '#8a7d72' }}
                    >
                      {label}
                    </p>
                    <p className="text-sm" style={{ color: '#faf5ef' }}>{value}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[['12', 'Orders'], ['4.8', 'Rating'], ['$340', 'Spent']].map(([val, label]) => (
            <div
              key={label}
              className="rounded-2xl p-3 text-center"
              style={{ background: '#1c1916', border: '1px solid #2a2420' }}
            >
              <p
                className="text-lg font-semibold"
                style={{ fontFamily: 'Fraunces, serif', color: '#f59e0b' }}
              >
                {val}
              </p>
              <p className="text-xs" style={{ color: '#8a7d72' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* ── Log Out ── */}
        {!showLogoutConfirm ? (
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-150 hover:opacity-80 active:scale-[0.98]"
            style={{
              background: '#1c1916',
              color: '#ef4444',
              border: '1px solid #ef444422',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            Log Out
          </button>
        ) : (
          <div
            className="p-4 rounded-2xl"
            style={{ background: '#1c1916', border: '1px solid #ef444433' }}
          >
            <p className="text-sm text-center mb-4" style={{ color: '#faf5ef' }}>
              This will clear all saved data and return you to the onboarding screen.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-70"
                style={{ background: '#2a2420', color: '#8a7d72', fontFamily: 'Outfit, sans-serif' }}
              >
                Cancel
              </button>
              <button
                onClick={onLogout}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80 active:scale-[0.98]"
                style={{ background: '#ef4444', color: '#fff', fontFamily: 'Outfit, sans-serif' }}
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen | null>(null)
  const [user, setUser] = useState<UserData | null>(null)

  // On mount: check localStorage — skip onboarding if user already exists
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as UserData
        if (parsed.firstName && parsed.lastName && parsed.email) {
          setUser(parsed)
          setScreen('home')
          return
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
    setScreen('onboarding')
  }, [])

  const handleOnboardingComplete = (u: UserData) => {
    setUser(u)
    setScreen('home')
  }

  const handleSaveProfile = (u: UserData) => {
    setUser(u)
  }

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
    setScreen('onboarding')
  }

  // Loading state while reading localStorage
  if (!screen) {
    return (
      <div
        className="min-h-dvh flex items-center justify-center"
        style={{ background: '#0f0d0b' }}
      >
        <div
          className="w-6 h-6 rounded-full border-2 animate-spin"
          style={{ borderColor: '#f59e0b', borderTopColor: 'transparent' }}
        />
      </div>
    )
  }

  return (
    <div
      className="max-w-md mx-auto relative"
      style={{ minHeight: '100dvh', background: '#0f0d0b' }}
    >
      {screen === 'onboarding' && (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}
      {screen === 'home' && user && (
        <HomeScreen user={user} onGoProfile={() => setScreen('profile')} />
      )}
      {screen === 'profile' && user && (
        <ProfileScreen
          user={user}
          onBack={() => setScreen('home')}
          onSave={handleSaveProfile}
          onLogout={handleLogout}
        />
      )}
    </div>
  )
}
