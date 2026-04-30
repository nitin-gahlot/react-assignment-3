import { useState } from 'react'

function AddStudentForm({ onAdd }) {
  const [name, setName] = useState('')
  const [score, setScore] = useState('')

  function handleSubmit() {
    const nm = name.trim()
    const sc = parseInt(score)
    if (!nm || isNaN(sc) || sc < 0 || sc > 100) {
      onAdd(null)
      return
    }
    onAdd({ name: nm, score: sc })
    setName('')
    setScore('')
  }

  return (
    <div className="card">
      <div className="card-head">
        <span className="card-head-title">Add new student</span>
      </div>
      <div className="form-body">
        <div className="f-group">
          <label className="f-label">FULL NAME</label>
          <input
            className="f-input"
            type="text"
            placeholder="e.g. Rahul Kumar"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="f-group">
          <label className="f-label">SCORE (0–100)</label>
          <input
            className="f-input"
            type="number"
            min="0"
            max="100"
            placeholder="e.g. 72"
            value={score}
            onChange={e => setScore(e.target.value)}
          />
        </div>
        <button className="add-btn" onClick={handleSubmit}>
          + Add student
        </button>
      </div>
    </div>
  )
}

export default AddStudentForm
