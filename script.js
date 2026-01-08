const aspects = [
  {
    id: "character",
    name: "Karakter & Nilai Hidup",
    weight: 9
  },
  {
    id: "emotion",
    name: "Regulasi Emosi",
    weight: 9
  },
  {
    id: "communication",
    name: "Komunikasi",
    weight: 8
  },
  {
    id: "sexual",
    name: "Kecocokan Seksual",
    weight: 6
  },
  {
    id: "spiritual",
    name: "Spiritualitas & Makna",
    weight: 6
  }
];

// =======================
// REKOMENDASI OTOMATIS
// =======================
function getFeedback(score, weight) {
  if (score <= 3) {
    return {
      condition: "sangat lemah",
      pattern: "rawan konflik & ketergantungan",
      advice: "fokus perbaiki diri sebelum hubungan serius"
    };
  }
  if (score <= 5) {
    return {
      condition: "kurang stabil",
      pattern: "hubungan naik turun",
      advice: "perlu latihan konsistensi & refleksi"
    };
  }
  if (score <= 7) {
    return {
      condition: "cukup sehat",
      pattern: "hubungan bisa berjalan",
      advice: "pilih pasangan yang mendukung pertumbuhan"
    };
  }
  if (score <= 9) {
    return {
      condition: "kuat",
      pattern: "hubungan relatif aman",
      advice: "jaga standar & batas pribadi"
    };
  }
  return {
    condition: "sangat matang",
    pattern: "siap hubungan jangka panjang",
    advice: "cari pasangan setara, jangan menurunkan level"
  };
}

// =======================
// RENDER UI
// =======================
const form = document.getElementById("assessmentForm");

aspects.forEach(aspect => {
  const div = document.createElement("div");
  div.className = "aspect";

  div.innerHTML = `
    <div class="aspect-header">
      <span>${aspect.name}</span>
      <span id="${aspect.id}-value">5</span>
    </div>

    <input 
      type="range" 
      min="0" 
      max="10" 
      value="5"
      id="${aspect.id}"
    />

    <div class="feedback" id="${aspect.id}-feedback"></div>
  `;

  form.appendChild(div);
});

// =======================
// LIVE FEEDBACK LOGIC
// =======================
function updateFeedback(aspect) {
  const slider = document.getElementById(aspect.id);
  const valueDisplay = document.getElementById(`${aspect.id}-value`);
  const feedbackBox = document.getElementById(`${aspect.id}-feedback`);

  const score = Number(slider.value);
  const feedback = getFeedback(score, aspect.weight);

  valueDisplay.textContent = score;

  feedbackBox.innerHTML = `
    kondisi: <strong>${feedback.condition}</strong>
    pola hubungan: ${feedback.pattern}<br/>
    saran: ${feedback.advice}
  `;
}

// attach listener
aspects.forEach(aspect => {
  const slider = document.getElementById(aspect.id);
  slider.addEventListener("input", () => updateFeedback(aspect));
  updateFeedback(aspect); // initial render
});

// =======================
// HITUNG TOTAL SKOR
// =======================
document.getElementById("calculateBtn").addEventListener("click", () => {
  let total = 0;

  aspects.forEach(aspect => {
    const score = Number(document.getElementById(aspect.id).value);
    total += score * aspect.weight;
  });

  let conclusion = "";
  if (total < 600) {
    conclusion = "belum siap hubungan serius";
  } else if (total < 720) {
    conclusion = "cukup siap, perlu seleksi pasangan ketat";
  } else {
    conclusion = "siap membangun hubungan jangka panjang sehat";
  }

  document.getElementById("result").innerHTML = `
    <h2>Hasil Akhir</h2>
    <p><b>Total Skor:</b> ${total}</p>
    <p><b>Kesimpulan:</b> ${conclusion}</p>
  `;
});
