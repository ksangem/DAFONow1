import Sidebar from './Sidebar'
import Header from './Header'
import AwarenessStrip from './AwarenessStrip'
import GlobalSearch from './GlobalSearch'

export default function Layout({ children, searchOpen, setSearchOpen }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main-area">
        <AwarenessStrip />
        <Header onSearchOpen={() => setSearchOpen(true)} />
        <main className="app-content">
          {children}
        </main>
      </div>
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
