import { useRef, useState } from 'react';

export const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.myspace.mealplanner';
// Keep prerendered and hydrated URLs identical at both / and /aajkya-web/.
const media = (file: string) => `./media/${file}`;

const chapters = [
  { name: 'Plan your week', icon: 'calendar', time: 4, description: 'Breakfast, lunch, and dinner, planned around your household’s preferences.' },
  { name: 'Make a swap', icon: 'swap', time: 10, description: 'Not in the mood for a dish? Pick another suggestion and make the meal yours.' },
  { name: 'See your portions', icon: 'people', time: 16, description: 'A shared meal, with serving sizes personalized for each family member.' },
  { name: 'Get your groceries', icon: 'list', time: 22, description: 'Turn your weekly plan into a shopping list and check your pantry staples.' },
  { name: 'Share with the cook', icon: 'chat', time: 28, description: 'Send the dishes and total cooking quantities through WhatsApp.' },
];
const faqs = [
  ['What does AajKya help me with?', 'AajKya brings everyday meal decisions together: planning your meals, choosing individual portions, making a grocery list, sharing cooking instructions, and logging what you eat.'],
  ['Is it made for Indian food?', 'Yes. AajKya is built around Indian dishes, ingredients, and household cooking habits. You can choose from the diet and cuisine preferences available in the app.'],
  ['Can my family use the same meal plan?', 'Yes. Create a household and invite your family to join. You share the meal plan, while individual portions are based on each person’s profile and nutrition goals.'],
  ['Can I change a meal or add my own recipes?', 'You can swap suggested dishes and regenerate meals when you want something different. You can also add your own family recipes, including their ingredients.'],
  ['How does sharing with my cook work?', 'AajKya brings together the dishes and quantities to prepare. Share the cooking instructions through WhatsApp, with an optional Hindi voice note on supported devices.'],
  ['Where can I get AajKya?', 'AajKya is available on Google Play for Android. Use any Google Play button on this page, or scan the QR code below with your phone.'],
];

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    play: <path d="m9 5 11 7-11 7Z" />,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-12 4h2m4 0h2"/></>,
    people: <><circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m1-17a3 3 0 0 1 0 6m3 11v-3a6 6 0 0 0-3-5"/></>,
    bowl: <><path d="M3 12h18a9 9 0 0 1-18 0Zm4 9h10M8 3v4m4-5v5m4-4v4"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    list: <><path d="m3 6 1 1 2-3m-3 9 1 1 2-3m-3 9 1 1 2-3M10 6h11M10 13h11M10 20h11"/></>,
    swap: <><path d="M4 7h15l-3-3m3 3-3 3M20 17H5l3 3m-3-3 3-3"/></>,
    chat: <path d="M21 11a9 9 0 0 1-9 9H4l-2 2v-11a9 9 0 1 1 19 0Z"/>,
    heart: <path d="M12 21 3.5 12.5A5.5 5.5 0 0 1 12 5a5.5 5.5 0 0 1 8.5 7.5Z"/>,
    menu: <path d="M4 6h16M4 12h16M4 18h16"/>,
    close: <path d="m6 6 12 12M6 18 18 6"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.check}</svg>;
}

function Brand() {
  return <a href="#top" className="brand" aria-label="AajKya home"><img src={media('logo.png')} alt="" width="42" height="42"/><span>Aaj<span>Kya</span></span></a>;
}
function StoreButton({ compact = false }: { compact?: boolean }) {
  return <a className={`button store-button ${compact ? 'compact' : ''}`} href={PLAY_STORE} target="_blank" rel="noreferrer">
    <svg width="23" height="25" viewBox="0 0 24 26" fill="currentColor" aria-hidden="true"><path d="M2 1 15 13 2 25V1Zm15 13 5 3-5 3-4-4 4-2ZM4 0l15 8-4 4L4 0Zm0 26 11-12 4 4L4 26Z"/></svg>
    {compact ? 'Get the app' : <span><small>GET IT ON</small>Google Play</span>}
  </a>;
}

export default function App() {
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chapter, setChapter] = useState(0);
  function playChapter(index: number) {
    setChapter(index);
    if (video.current) {
      const player = video.current;
      const play = () => { player.currentTime = chapters[index].time; player.play().catch(() => {}); };
      if (player.readyState >= 1) play();
      else { player.addEventListener('loadedmetadata', play, { once: true }); player.load(); }
    }
    setStarted(true);
  }
  function watchDemo() {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    setStarted(true);
    video.current?.play().catch(() => { /* Native controls remain available if autoplay is blocked. */ });
  }
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header" id="top"><div className="container nav-bar">
      <Brand />
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'}/></button>
      <nav id="navigation" aria-label="Main navigation" className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <a href="#why-aajkya" onClick={() => setMenuOpen(false)}>Why AajKya</a>
        <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
        <a href="#questions" onClick={() => setMenuOpen(false)}>Questions</a>
        <StoreButton compact />
      </nav>
    </div></header>
    <main id="main">
      <section className="hero container" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line"/> YOUR INDIAN MEAL PLANNER</p>
          <h1 id="hero-heading">Aaj kya<br/><em>banaye?</em></h1>
          <p className="hero-lead">Good food. Less figuring it out.</p>
          <p className="hero-description">Plan your week, personalize portions, and get your grocery list.</p>
          <div className="hero-actions"><StoreButton /><button className="watch-button" onClick={watchDemo}><span className="play-circle"><Icon name="play" size={18}/></span><span>Watch demo<small>40 seconds</small></span></button></div>
          <p className="hero-footnote">Made for the food you already love.</p>
        </div>
        <div className="hero-visual">
          <div className="food-image"><img src={media('food.webp')} alt="An Indian meal with roti, rice, curry, and fresh vegetables" width="1024" height="1024" fetchPriority="high"/><span className="image-label">FAMILIAR FOOD.<br/>ONE LESS DAILY DECISION.</span></div>
          <figure className="hero-phone"><img src={media('planner.webp')} alt="AajKya weekly meal planner showing breakfast, lunch, and dinner" width="1350" height="2274"/><figcaption>Your week, sorted.</figcaption></figure>
          <div className="small-note"><Icon name="check" size={20}/><span>One plan.<br/><strong>Everyone’s portions.</strong></span></div>
        </div>
      </section>
      <div className="benefits-bar container">
        <div><Icon name="bowl"/><span>Meals that feel like home</span></div>
        <div><Icon name="people"/><span>Portions made personal</span></div>
        <div><Icon name="list"/><span>From planning to cooking</span></div>
      </div>
      <section className="demo-section container section" id="how-it-works" aria-labelledby="demo-heading">
        <div className="section-heading"><div><p className="eyebrow">A LITTLE LESS EVERYDAY EFFORT</p><h2 id="demo-heading">From “what’s for lunch?”<br/>to <em>“it’s all planned.”</em></h2></div><p>Take a quick look at how AajKya brings your meals, groceries, and family portions together.</p></div>
        <div className="video-shell">
          <video ref={video} controls playsInline preload="none" poster={media('demo-poster.webp')} onPlay={() => setStarted(true)} onTimeUpdate={() => { const time = video.current?.currentTime || 0; setChapter(Math.max(0, chapters.findLastIndex(c => time >= c.time))); }} onError={() => setVideoError(true)} aria-label="AajKya illustrated product walkthrough">
            <source src={media('aajkya-demo.mp4')} type="video/mp4"/><track kind="captions" src={media('captions.vtt')} srcLang="en" label="English"/>
            Your browser does not support this video. <a href={media('aajkya-demo.mp4')}>Download the walkthrough.</a>
          </video>
          {!started && <button className="video-play" onClick={watchDemo}><span><Icon name="play" size={28}/></span>Watch the walkthrough <small>00:40</small></button>}
        </div>
        <div className="video-meta"><span>Plan. Swap. Portion. Shop. Share.</span><span>Illustrated walkthrough · App screens may vary</span></div>
        {videoError && <p role="alert">The video couldn’t load. <a href={media('aajkya-demo.mp4')}>Download the walkthrough</a> or try again.</p>}
        <div className="chapters" aria-label="Jump to a video chapter">{chapters.map((item, index) => <button key={item.name} className={chapter === index ? 'chapter active' : 'chapter'} aria-pressed={chapter === index} aria-label={`Play chapter ${index + 1}: ${item.name}`} onClick={() => playChapter(index)}><span className="chapter-top"><span>0{index + 1}</span><Icon name={item.icon} size={20}/></span><strong>{item.name}</strong><span className="chapter-description">{item.description}</span></button>)}</div>
        <details className="transcript"><summary>Read the video transcript</summary><ol><li>What’s cooking this week?</li><li>Start with a weekly meal plan for your household.</li><li>Want something different? Choose a replacement dish.</li><li>Review individual portions for each family member.</li><li>Check your groceries and mark what you already have.</li><li>Share the cook’s brief as text or a Hindi voice note.</li><li>Aaj Kya. Your week, planned.</li></ol></details>
      </section>
      <section className="features-section" id="why-aajkya" aria-labelledby="features-heading"><div className="container section">
        <div className="section-heading"><div><p className="eyebrow">BUILT AROUND YOUR ROUTINE</p><h2 id="features-heading">Shared meals.<br/><em>Individual needs.</em></h2></div><p>Different appetites and goals. One kitchen. AajKya helps you bring them together.</p></div>
        <div className="feature-grid">
          <article className="feature-card portions-card"><div className="feature-icon"><Icon name="people" size={26}/></div><p className="feature-kicker">FOR EVERYONE AT THE TABLE</p><h3>One family meal.<br/>Your own portion.</h3><p>A shared menu with personalized servings, in familiar units like katoris, bowls, and rotis.</p><div className="portion-screenshot"><img src={media('portions.webp')} alt="AajKya meal detail showing individual servings and total cooking quantities" width="1350" height="2274" loading="lazy"/></div><span className="screenshot-caption">AajKya app · Meal details</span></article>
          <article className="feature-card grocery-card"><div className="grocery-copy"><div className="feature-icon"><Icon name="list" size={26}/></div><p className="feature-kicker">READY FOR THE WEEK</p><h3>Your meals.<br/>Your shopping list.</h3><p>Groceries from your meal plan, with pantry staples kept separate. Check what you have before you shop.</p></div><img src={media('vegetables.webp')} alt="Fresh vegetables for everyday Indian cooking" width="300" height="300" loading="lazy"/></article>
          <article className="feature-card cook-card"><div className="feature-icon"><Icon name="chat" size={26}/></div><p className="feature-kicker">FROM THE PLAN TO THE PAN</p><h3>Keep your cook<br/>in the loop.</h3><p>Share what to make and how much through WhatsApp. Add a Hindi voice note when that’s easier.</p><div className="cook-tags"><span><Icon name="check" size={16}/> Dishes & quantities</span><span><Icon name="check" size={16}/> Hindi voice notes</span></div></article>
        </div>
      </div></section>
      <section className="nutrition-section container section" aria-labelledby="nutrition-heading">
        <div className="diary-visual"><div className="diary-label"><Icon name="heart" size={20}/><span>A little awareness, every day.</span></div><div className="diary-screen"><img src={media('diary.webp')} alt="AajKya food diary with daily nutrition progress and logged meals" width="1350" height="2274" loading="lazy"/></div></div>
        <div className="nutrition-copy"><p className="eyebrow">PLAN IT. EAT IT. LOG IT.</p><h2>A clearer picture<br/>of <em>your everyday meals.</em></h2><p>Keep track of what you actually eat, alongside the meals you planned. See your calories and macros, and build a routine that works for you.</p><ul className="check-list"><li><Icon name="check"/> Log a planned meal in one tap</li><li><Icon name="check"/> Add food when your day changes</li><li><Icon name="check"/> See progress against your personal targets</li></ul><a className="text-link" href={PLAY_STORE} target="_blank" rel="noreferrer">Explore AajKya on Google Play</a></div>
      </section>
      <section className="faq-section container section" id="questions" aria-labelledby="faq-heading"><div className="faq-intro"><p className="eyebrow">A FEW THINGS YOU MIGHT ASK</p><h2 id="faq-heading">Before you<br/><em>set the table.</em></h2><p>Something else on your mind?<br/><a href="mailto:support@aajkya.co.in">Get in touch with us.</a></p></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span className="faq-symbol" aria-hidden="true"/></summary><p>{answer}</p></details>)}</div></section>
      <section className="download-section container" id="download" aria-labelledby="download-heading"><div><p className="eyebrow">LET’S TAKE ONE THING OFF YOUR PLATE</p><h2 id="download-heading">Good food.<br/><em>Less figuring it out.</em></h2><p>Your next meal plan is waiting.</p><StoreButton/></div><a className="qr-card" href={PLAY_STORE} target="_blank" rel="noreferrer" aria-label="Get AajKya on Google Play"><img src={media('play-store-qr.svg')} width="150" height="150" alt="QR code linking to AajKya on Google Play" loading="lazy"/><span>Scan. Download. Plan.</span><small>Available on Android</small></a></section>
    </main>
    <footer className="container footer"><Brand/><p>Everyday meals, made simpler.</p><div><a href="./privacy.html">Privacy</a><a href="./terms.html">Terms</a><a href="./support.html">Support</a><a href="mailto:support@aajkya.co.in">Contact</a></div><small className="copyright">© {new Date().getFullYear()} AajKya. All rights reserved.</small></footer>
  </>;
}
