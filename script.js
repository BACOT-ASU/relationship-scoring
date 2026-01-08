const aspects = [
  {
    id: "character",
    name: "Karakter & Nilai Hidup",
    weight: 9,
    ranges: [
      { min: 0, max: 3, condition: "integritas rapuh", pattern: "hubungan tidak aman", advice: "benahi kejujuran & tanggung jawab dasar" },
      { min: 4, max: 5, condition: "nilai goyah", pattern: "konflik nilai berulang", advice: "buat prinsip hidup yang jelas" },
      { min: 6, max: 7, condition: "cukup kuat", pattern: "hubungan relatif aman", advice: "latih konsistensi" },
      { min: 8, max: 9, condition: "integritas kuat", pattern: "pasangan merasa aman", advice: "jangan kompromi nilai" },
      { min: 10, max: 10, condition: "sangat stabil", pattern: "relasi jangka panjang sehat", advice: "cari pasangan setara nilai" }
    ]
  },
  {
    id: "emotion",
    name: "Regulasi Emosi",
    weight: 9,
    ranges: [
      { min: 0, max: 3, condition: "emosi reaktif", pattern: "drama & ledakan", advice: "latihan pause & refleksi emosi" },
      { min: 4, max: 5, condition: "kurang stabil", pattern: "konflik berulang", advice: "kenali trigger emosi" },
      { min: 6, max: 7, condition: "cukup stabil", pattern: "konflik bisa diselesaikan", advice: "evaluasi pasca konflik" },
      { min: 8, max: 9, condition: "stabil", pattern: "pasangan merasa aman", advice: "jangan menekan emosi" },
      { min: 10, max: 10, condition: "sangat matang", pattern: "hubungan dewasa", advice: "pasangan harus setara emosional" }
    ]
  }
];

// ====== RENDER FORM ======
const form = document.getElementById("assessmentForm");

aspects.forEach(aspect => {
  const div = document.createElement("div");
  div.className = "aspect";

  div.innerHTML = `
    <label>${aspect.name}</label>
    <small>nilai 0–10</small><br/>
    <input type="number" min="0" max="10" id="${aspect.id}" />
  `;

  form.appendChild(div);
});

// ====== HELPER FUNCTIONS ======
function getRange(score, ranges) {
  return ranges.find(r => score >= r.min && score <= r.max);
}

function interpretTotal(total) {
  if (total < 650) {
    return "Belum siap hubungan serius – fokus benahi diri";
  }
  if (total < 720) {
    return "Cukup siap – perlu batas & seleksi kuat";
  }
  return "Siap membangun hubungan jangka panjang sehat";
}

// ====== MAIN LOGIC ======
document.getElementById("calculateBtn").addEventListener("click", () => {
  let totalScore = 0;
  let output = "";

  aspects.forEach(aspect => {
    const value = Number(document.getElementById(aspect.id).value);
    if (isNaN(value) || value < 0 || value > 10) {
      alert("semua aspek harus diisi dengan nilai 0–10");
      return;
    }

    const weighted = value * aspect.weight;
    totalScore += weighted;

    const range = getRange(value, aspect.ranges);

    output += `
      <div class="result-item">
        <strong>${aspect.name}</strong><br/>
        nilai: ${value} × bobot ${aspect.weight} = <b>${weighted}</b><br/>
        kondisi: ${range.condition}<br/>
        pola hubungan: ${range.pattern}<br/>
        saran: ${range.advice}
      </div>
    `;
  });

  const summary = interpretTotal(totalScore);

  document.getElementById("result").innerHTML = `
    <h2>Hasil Akhir</h2>
    <p><b>Total Skor:</b> ${totalScore}</p>
    <p><b>Kesimpulan:</b> ${summary}</p>
    <hr/>
    ${output}
  `;
});
