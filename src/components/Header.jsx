function Header({ total, passRate }) {
  return (
    <div className="sb-hero">
      <div>
        <div className="sb-hero-title">Student Scoreboard</div>
        <div className="sb-hero-sub">{total} students · Pass rate {passRate}%</div>
      </div>
    </div>
  )
}

export default Header
