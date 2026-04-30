const AVA_COLORS = [
  { bg: '#EEEDFE', fg: '#3C3489' },
  { bg: '#E1F5EE', fg: '#085041' },
  { bg: '#FAECE7', fg: '#712B13' },
  { bg: '#FBEAF0', fg: '#72243E' },
  { bg: '#E6F1FB', fg: '#0C447C' },
  { bg: '#FAEEDA', fg: '#633806' },
  { bg: '#EAF3DE', fg: '#27500A' },
]

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function StudentRow({ student, colorIndex, rank, tempScore, onTempChange, onUpdate }) {
  const ac = AVA_COLORS[colorIndex % AVA_COLORS.length]
  const isPass = student.score >= 40
  const barColor = isPass ? '#639922' : '#E24B4A'
  const rankCls = rank === 1 ? 'g' : rank === 2 ? 's' : rank === 3 ? 'b' : ''
  const rankLabel = `#${rank}`
  const barWidth = Math.min(100, Math.max(0, student.score))

  return (
    <tr>
      <td style={{ width: '36px' }}>
        <span className={`rank-lbl ${rankCls}`}>{rankLabel}</span>
      </td>
      <td style={{ width: '160px' }}>
        <div className="name-wrap">
          <div className="ava" style={{ background: ac.bg, color: ac.fg }}>
            {initials(student.name)}
          </div>
          <span>{student.name}</span>
        </div>
      </td>
      <td style={{ width: '90px' }}>
        <div>
          {student.score}
          <span style={{ fontSize: '10px', color: '#888' }}>/100</span>
        </div>
        <div className="bar-wrap">
          <div className="bar-fill" style={{ width: `${barWidth}%`, background: barColor }} />
        </div>
      </td>
      <td style={{ width: '80px' }}>
        <span className={`badge ${isPass ? 'p' : 'f'}`}>
          <span className="dot" />
          {isPass ? 'Pass' : 'Fail'}
        </span>
      </td>
      <td style={{ width: '70px' }}>
        <input
          className="sc-input"
          type="number"
          min="0"
          max="100"
          value={tempScore}
          onChange={e => onTempChange(student.id, Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
        />
      </td>
      <td style={{ width: '70px' }}>
        <button className="upd-btn" onClick={() => onUpdate(student.id)}>
          Update
        </button>
      </td>
    </tr>
  )
}

export default StudentRow
