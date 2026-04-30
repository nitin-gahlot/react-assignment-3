import { useState } from 'react'
import Header from './components/Header'
import StudentTable from './components/StudentTable'
import AddStudentForm from './components/AddStudentForm'

const INITIAL_STUDENTS = [
  { id: 1, name: 'Aarav Sharma',  score: 78 },
  { id: 2, name: 'Priya Mehta',   score: 35 },
  { id: 3, name: 'Rohan Verma',   score: 92 },
  { id: 4, name: 'Sneha Gupta',   score: 28 },
  { id: 5, name: 'Karan Singh',   score: 55 },
  { id: 6, name: 'Ananya Joshi',  score: 44 },
  { id: 7, name: 'Dev Kapoor',    score: 67 },
]

function App() {
  const [students, setStudents] = useState(INITIAL_STUDENTS)
  const [toast, setToast] = useState('')
  const [nextId, setNextId] = useState(8)

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2200)
  }

  function handleUpdateScore(id, val, err) {
    if (err === 'invalid') { showToast('Score must be 0–100!'); return }
    if (val === null) { showToast('No change made.'); return }
    setStudents(prev => prev.map(s => s.id === id ? { ...s, score: val } : s))
    showToast('Score updated successfully.')
  }

  function handleAddStudent(data) {
    if (!data) { showToast('Enter a valid name and score (0–100).'); return }
    setStudents(prev => [...prev, { id: nextId, ...data }])
    setNextId(n => n + 1)
    showToast(`${data.name} added!`)
  }

  const total = students.length
  const passed = students.filter(s => s.score >= 40).length
  const failed = total - passed
  const avg = total ? Math.round(students.reduce((a, s) => a + s.score, 0) / total) : 0
  const passRate = total ? Math.round((passed / total) * 100) : 0
  const topStudent = total ? students.reduce((a, b) => b.score > a.score ? b : a) : null

  const topBars = [...students].sort((a, b) => b.score - a.score).slice(0, 6)

  return (
    <div>
      <Header total={total} passRate={passRate} />

      {toast && <div className="toast-bar show">{toast}</div>}

      <div className="kpi-row">
        <div className="kpi total">
          <div className="kpi-label">ENROLLED</div>
          <div className="kpi-val">{total}</div>
        </div>
        <div className="kpi pass">
          <div className="kpi-label">PASSED</div>
          <div className="kpi-val">{passed}</div>
        </div>
        <div className="kpi fail">
          <div className="kpi-label">FAILED</div>
          <div className="kpi-val">{failed}</div>
        </div>
        <div className="kpi avg">
          <div className="kpi-label">AVG SCORE</div>
          <div className="kpi-val">{avg}</div>
        </div>
      </div>

      {topStudent && (
        <div className="top-banner">
          <div>
            <div className="top-banner-info">Top performer this session</div>
            <div className="top-banner-name">{topStudent.name}</div>
          </div>
          <div className="top-banner-score">
            {topStudent.score}<span>/100</span>
          </div>
        </div>
      )}

      <div className="main-grid">
        <StudentTable students={students} onUpdateScore={handleUpdateScore} />

        <div className="right-col">
          <AddStudentForm onAdd={handleAddStudent} />

          <div className="card">
            <div className="card-head">
              <span className="card-head-title">Score overview</span>
            </div>
            <div className="chart-body">
              <div className="mini-bars">
                {topBars.map(s => {
                  const h = Math.max(4, Math.round(s.score * 0.6))
                  const color = s.score >= 40 ? '#639922' : '#E24B4A'
                  return (
                    <div className="mbar-col" key={s.id}>
                      <div className="mbar" style={{ height: `${h}px`, background: color }} />
                      <span>{s.name.split(' ')[0]}</span>
                    </div>
                  )
                })}
              </div>
              <div className="legend">
                <div className="leg-item">
                  <div className="leg-dot" style={{ background: '#639922' }} />
                  Pass (≥40)
                </div>
                <div className="leg-item">
                  <div className="leg-dot" style={{ background: '#E24B4A' }} />
                  Fail (&lt;40)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
