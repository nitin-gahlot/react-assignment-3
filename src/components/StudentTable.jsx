import { useState } from 'react'
import StudentRow from './StudentRow'

function StudentTable({ students, onUpdateScore }) {
  const [search, setSearch] = useState('')
  const [temps, setTemps] = useState({})

  const sorted = [...students].sort((a, b) => b.score - a.score)
  const rankMap = {}
  sorted.forEach((s, i) => { rankMap[s.id] = i + 1 })

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  function handleTempChange(id, val) {
    setTemps(prev => ({ ...prev, [id]: val }))
  }

  function handleUpdate(id) {
    const val = temps[id]
    if (val === undefined) { onUpdateScore(id, null); return }
    if (val < 0 || val > 100) { onUpdateScore(id, null, 'invalid'); return }
    onUpdateScore(id, val)
    setTemps(prev => { const n = { ...prev }; delete n[id]; return n })
  }

  return (
    <div className="card">
      <div className="card-head">
        <span className="card-head-title">Student records</span>
        <input
          className="search"
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Student</th>
            <th>Score</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Save</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan="6" className="no-results">No students found.</td></tr>
          ) : (
            filtered.map((s, i) => (
              <StudentRow
                key={s.id}
                student={s}
                colorIndex={students.indexOf(s)}
                rank={rankMap[s.id]}
                tempScore={temps[s.id] !== undefined ? temps[s.id] : s.score}
                onTempChange={handleTempChange}
                onUpdate={handleUpdate}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default StudentTable
