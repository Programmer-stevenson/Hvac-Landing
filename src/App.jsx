import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Phone,
  Clock,
  Shield,
  Award,
  Wrench,
  Thermometer,
  Wind,
  Snowflake,
  Flame,
  CheckCircle,
  Star,
  ArrowRight,
  Zap,
  BadgeCheck,
  AlertCircle,
  Timer,
  PhoneCall,
} from 'lucide-react'

// Animated counter
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = parseInt(target)
      const timer = setInterval(() => {
        start += Math.ceil(end / 40)
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(start)
        }
      }, 30)
      return () => clearInterval(timer)
    }
  }, [isInView, target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// Sticky Header - Minimal, conversion focused
function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white shadow-2xl shadow-slate-900/10 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
            scrolled ? 'bg-gradient-to-br from-sky-500 to-blue-600' : 'bg-white shadow-lg'
          }`}>
            <Thermometer className={`w-6 h-6 ${scrolled ? 'text-white' : 'text-blue-600'}`} />
          </div>
          <div>
            <span className={`font-black text-xl tracking-tight ${scrolled ? 'text-slate-900' : 'text-white'}`}>
              YOUR LOGO
            </span>
          </div>
        </div>

        {/* CTA - Always visible */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+1234567890"
            className="hidden sm:flex items-center gap-2 font-bold text-lg"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                scrolled ? 'bg-orange-500' : 'bg-white'
              }`}
            >
              <PhoneCall className={`w-5 h-5 ${scrolled ? 'text-white' : 'text-orange-500'}`} />
            </motion.div>
            <span className={scrolled ? 'text-slate-900' : 'text-white'}>(123) 456-7890</span>
          </a>
          <motion.a
            href="#form"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-orange-500/40 hover:shadow-orange-500/60 transition-shadow"
          >
            FREE Quote
          </motion.a>
        </div>
      </div>
    </motion.header>
  )
}

// HERO - Clean hero with image, CTA buttons only
function Hero() {
  const [showText, setShowText] = useState(false) // Start with text hidden
  const [isMobile, setIsMobile] = useState(true) // Assume mobile first

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 640
      setIsMobile(mobile)
      if (!mobile) setShowText(true) // Show immediately on desktop
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) return
    
    const showDuration = 8000 // text visible for 8 seconds
    const hideDuration = 5000 // text hidden for 5 seconds
    
    const timeout = setTimeout(() => {
      setShowText(prev => !prev)
    }, showText ? showDuration : hideDuration)
    
    return () => clearTimeout(timeout)
  }, [isMobile, showText])

  return (
    <section className="relative min-h-screen flex items-end sm:items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/hero.png"
          alt="HVAC Professionals"
          className="w-full h-full object-cover object-[calc(100%+35px)_center] sm:object-center"
        />
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-12 pt-24 sm:py-24 w-full">
        <div className="max-w-2xl">
          {/* Text that fades on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isMobile ? (showText ? 1 : 0) : 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {/* Urgency badge */}
            <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-2 mb-5">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <AlertCircle className="w-5 h-5 text-red-400" />
              </motion.div>
              <span className="text-red-300 font-semibold text-sm">Limited Time: $50 OFF Any Service</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-5 sm:mb-6">
              AC Broken?
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                We'll Fix It Today.
              </span>
            </h1>

            <p className="text-lg sm:text-2xl text-white/80 mb-6 sm:mb-8 leading-relaxed">
              Fast, reliable HVAC repair & installation. 
              <span className="text-white font-semibold"> Same-day service available.</span>
            </p>
          </motion.div>

          {/* CTA Buttons - move down when text hides on mobile */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mb-10"
            initial={{ y: 180 }}
            animate={{ y: isMobile ? (showText ? 0 : 270) : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <motion.a
              href="#form"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-5 rounded-full font-black text-xl shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 transition-all"
            >
              Get FREE Quote
              <ArrowRight className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="tel:+1234567890"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-5 rounded-full font-bold text-xl border-2 border-white/30 hover:bg-white/20 transition-all"
            >
              <Phone className="w-6 h-6" />
              (123) 456-7890
            </motion.a>
          </motion.div>

          {/* Trust signals - also fade on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isMobile ? (showText ? 1 : 0) : 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Timer className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-bold">2 Hour</p>
                  <p className="text-white/60 text-sm">Response Time</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-bold">100%</p>
                  <p className="text-white/60 text-sm">Satisfaction</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-white font-bold">500+</p>
                  <p className="text-white/60 text-sm">5-Star Reviews</p>
                </div>
              </div>
            </div>

            {/* Social proof */}
            <div className="inline-flex items-center gap-4 p-4 bg-white/10 backdrop-blur rounded-2xl border border-white/10">
              <div className="flex -space-x-3">
                {['M', 'S', 'R', 'J'].map((letter, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center border-2 border-slate-900 text-white font-bold text-sm"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm">
                  <span className="text-white font-semibold">2,847 homeowners</span> served this year
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Form Section - Separate section with form
function FormSection() {
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', urgency: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Replace YOUR_FORM_ID with actual Formspree form ID
    try {
      await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
      })
      setSubmitted(true)
    } catch (error) {
      setSubmitted(true) // Still show success for demo
    }
  }

  return (
    <section id="form" className="py-20 bg-sky-50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.3) 1px, transparent 0)',
        backgroundSize: '24px 24px'
      }} />
      
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Why choose us */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-orange-500/10 text-orange-600 font-bold text-sm px-4 py-2 rounded-full mb-4">
              GET YOUR FREE QUOTE
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight">
              Ready to Get
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500"> Comfortable?</span>
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Fill out the form and one of our certified technicians will contact you within 30 minutes. No obligation, no pressure.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                { icon: CheckCircle, text: 'Free, no-obligation estimates' },
                { icon: Clock, text: 'Response within 30 minutes' },
                { icon: Shield, text: '100% satisfaction guaranteed' },
                { icon: BadgeCheck, text: 'Licensed & insured professionals' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-slate-700 font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Urgency note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 p-4 bg-orange-100 rounded-2xl border border-orange-200"
            >
              <p className="text-orange-800 font-semibold">
                🔥 <span className="text-orange-900">3 technicians available now</span> in your area
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-slate-900/10 relative overflow-hidden">
              {/* Form badge */}
              <div className="absolute top-0 right-0 bg-gradient-to-l from-green-500 to-emerald-500 text-white text-sm font-bold px-4 py-2 rounded-bl-2xl">
                FREE ESTIMATE
              </div>

              {!submitted ? (
                <>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    Get Your Free Quote
                  </h3>
                  <p className="text-slate-600 mb-6">No spam, ever. We respect your privacy.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-lg"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        required
                        className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-lg"
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <select
                        name="service"
                        required
                        className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-lg text-slate-600"
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      >
                        <option value="">What do you need?</option>
                        <option value="ac-repair">🔧 AC Repair</option>
                        <option value="ac-install">❄️ AC Installation</option>
                        <option value="heating">🔥 Heating Service</option>
                        <option value="maintenance">🛠️ Maintenance</option>
                        <option value="other">📋 Other</option>
                      </select>
                    </div>
                    <div>
                      <select
                        name="urgency"
                        className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-lg text-slate-600"
                        onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                      >
                        <option value="">How urgent?</option>
                        <option value="emergency">🚨 Emergency - ASAP!</option>
                        <option value="today">📅 Today if possible</option>
                        <option value="week">📆 This week</option>
                        <option value="planning">🤔 Just planning ahead</option>
                      </select>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-5 rounded-xl font-black text-xl shadow-lg shadow-orange-500/40 hover:shadow-orange-500/60 transition-all flex items-center justify-center gap-2"
                    >
                      GET MY FREE QUOTE
                      <ArrowRight className="w-6 h-6" />
                    </motion.button>
                  </form>

                  <div className="mt-6 flex items-center justify-center gap-6 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>No Spam</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BadgeCheck className="w-4 h-4 text-blue-500" />
                      <span>Licensed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span>Fast Reply</span>
                    </div>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">We Got Your Request!</h3>
                  <p className="text-slate-600 mb-6">A technician will call you within 30 minutes.</p>
                  <p className="text-sm text-slate-500">Or call us now:</p>
                  <a href="tel:+1234567890" className="text-2xl font-black text-blue-600">(123) 456-7890</a>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Services - Quick overview
function Services() {
  const services = [
    { icon: Snowflake, title: 'AC Repair', desc: 'Same-day cooling fixes', color: 'from-blue-500 to-cyan-500' },
    { icon: Flame, title: 'Heating', desc: 'Furnace & heat pumps', color: 'from-orange-500 to-red-500' },
    { icon: Wind, title: 'Air Quality', desc: 'Breathe cleaner air', color: 'from-green-500 to-emerald-500' },
    { icon: Wrench, title: 'Maintenance', desc: 'Prevent costly repairs', color: 'from-purple-500 to-pink-500' },
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            What We Fix
          </h2>
          <p className="text-xl text-slate-600">All major brands. All problems. One call.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.a
              href="#form"
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-900/5 cursor-pointer group block"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{service.title}</h3>
              <p className="text-slate-600">{service.desc}</p>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#form"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-colors"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// Social Proof - Testimonials
function Testimonials() {
  const testimonials = [
    {
      text: "They showed up in 90 minutes and fixed our AC before dinner. Absolutely incredible service!",
      name: "Mike R.",
      location: "Phoenix, AZ",
      rating: 5
    },
    {
      text: "Fair pricing, no upsells, just honest work. This is how all companies should operate.",
      name: "Sarah T.",
      location: "Scottsdale, AZ",
      rating: 5
    },
    {
      text: "Our furnace died on the coldest night of the year. They came at 11pm and saved us!",
      name: "James K.",
      location: "Mesa, AZ",
      rating: 5
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            500+ Five-Star Reviews
          </h2>
          <p className="text-xl text-slate-600">Don't take our word for it</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 rounded-2xl p-6 relative"
            >
              <div className="absolute -top-3 left-6 text-6xl text-blue-200 font-serif">"</div>
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 mb-4 relative z-10">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Trust Section - Certifications & Guarantees
function Trust() {
  const guarantees = [
    { icon: Clock, title: '2-Hour Response', desc: 'Or your service call is FREE' },
    { icon: Shield, title: '100% Satisfaction', desc: 'Money-back guarantee' },
    { icon: BadgeCheck, title: 'Licensed & Insured', desc: 'Fully certified technicians' },
    { icon: Award, title: '5-Year Warranty', desc: 'On all installations' },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Our Guarantees To You
          </h2>
          <p className="text-xl text-white/70">No risk. No hassle. Just results.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <g.icon className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{g.title}</h3>
              <p className="text-white/60">{g.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Big stats */}
        <div className="mt-16 grid grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-5xl sm:text-6xl font-black text-white mb-2">
              <Counter target="20" suffix="+" />
            </p>
            <p className="text-white/60">Years Experience</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <p className="text-5xl sm:text-6xl font-black text-white mb-2">
              <Counter target="100" suffix="+" />
            </p>
            <p className="text-white/60">Jobs Completed</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <p className="text-5xl sm:text-6xl font-black text-white mb-2">
              <Counter target="98" suffix="%" />
            </p>
            <p className="text-white/60">Would Recommend</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Final CTA Section
function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500 relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Ready to Get Comfortable?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join 15,000+ happy customers. Get your free quote in under 60 seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#form"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-10 py-5 rounded-full font-black text-xl shadow-2xl shadow-black/20"
            >
              Get FREE Quote <ArrowRight className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="tel:+1234567890"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 bg-white/20 text-white px-10 py-5 rounded-full font-black text-xl border-2 border-white/30"
            >
              <Phone className="w-6 h-6" /> Call Now
            </motion.a>
          </div>

          <p className="mt-6 text-white/70">
            ⚡ Average response time: <span className="text-white font-bold">27 minutes</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// Minimal Footer
function Footer() {
  return (
    <footer className="py-8 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
              <Thermometer className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white">YOUR LOGO</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-white/50">
            <span>Licensed & Insured</span>
            <span>•</span>
            <span>24/7 Emergency Service</span>
            <span>•</span>
            <a href="tel:+1234567890" className="text-white font-semibold">(123) 456-7890</a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-white/40">
          © {new Date().getFullYear()} Your HVAC Company. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

// Main App
function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <FormSection />
      <Services />
      <Testimonials />
      <Trust />
      <FinalCTA />
      <Footer />
    </div>
  )
}

export default App