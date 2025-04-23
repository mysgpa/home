const gradePoints = {
    "A+": 10, "A": 9, "B+": 8, "B": 7,
    "C+": 6, "C": 5, "D": 4, "E": 0, "F": 0, "I": 0, "X": 0
  };
  
  let subjectCount = 0;
  
  document.getElementById('addSubject').addEventListener('click', () => {
    subjectCount++;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${subjectCount}</td>
      <td>
        <select>
          ${[1,2,3,4,5,6].map(c => `<option value="${c}">${c}</option>`).join('')}
        </select>
      </td>
      <td>
        <select>
          ${Object.keys(gradePoints).map(g => `<option value="${g}">${g}</option>`).join('')}
        </select>
      </td>
      <td><button onclick="removeRow(this)">❌</button></td>
    `;
    document.getElementById('subjectRows').appendChild(row);
  });
  
  function removeRow(button) {
    const row = button.closest('tr');
    row.remove();
  }
  
  document.getElementById('calculateBtn').addEventListener('click', () => {
    const rows = document.querySelectorAll('#subjectRows tr');
    let totalCredits = 0, totalPoints = 0;
  
    rows.forEach(row => {
      const credit = parseInt(row.cells[1].querySelector('select').value);
      const grade = row.cells[2].querySelector('select').value;
      totalCredits += credit;
      totalPoints += credit * gradePoints[grade];
    });
  
    const cgpa = (totalPoints / totalCredits).toFixed(2);
    document.getElementById('result').innerText = isNaN(cgpa) ? "Please add subjects!" : `Your SGPA is: ${cgpa}`;
    if (!isNaN(cgpa)) alert(`Your CGPA is: ${cgpa}`);
  });
  