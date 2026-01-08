// =========================
// DATA ASPEK
// =========================
const aspects = [
  aspect(
    "Karakter & Nilai Hidup",
    "konsistensi prinsip hidup saat diuji",
    9,
    [
      question("janji yang merepotkan", [2,3,5,7,9]),
      question("godaan melanggar prinsip", [2,3,5,7,9]),
      question("beda nilai dengan pasangan", [3,4,5,7,9])
    ]
  ),
  aspect(
    "Regulasi Emosi",
    "cara mengelola emosi saat konflik",
    9,
    [
      question("dikritik di depan umum", [2,3,4,7,9]),
      question("stres tapi dituntut perhatian", [2,3,4,7,9]),
      question("konflik lama diungkit", [2,3,4,7,9])
    ]
  ),
  aspect(
    "Komunikasi & Konflik",
    "cara menyampaikan dan menyelesaikan masalah",
    8,
    [
      question("beda pendapat serius", [2,3,4,7,9]),
      question("disalahpahami", [2,3,4,7,9]),
      question("diskusi buntu", [3,4,5,7,9])
    ]
  ),
  aspect(
    "Tanggung Jawab & Konsistensi",
    "apakah tindakan bisa diandalkan",
    8,
    [
      question("menepati komitmen", [2,3,5,7,9]),
      question("tanggung jawab berat", [3,4,5,7,9]),
      question("bosan rutinitas", [2,3,4,7,9])
    ]
  ),
  aspect(
    "Tujuan Hidup & Arah",
    "kejelasan visi hidup",
    8,
    [
      question("rencana jangka panjang", [2,4,5,7,9]),
      question("tujuan tidak sejalan", [3,4,5,7,9]),
      question("fase hidup sulit", [3,4,5,7,9])
    ]
  ),
  aspect(
    "Finansial Mindset",
    "cara berpikir soal uang dan usaha",
    7,
    [
      question("kondisi keuangan sulit", [2,3,5,7,9]),
      question("beda gaya hidup", [3,4,5,7,9]),
      question("utang", [2,3,4,7,9])
    ]
  ),
  aspect(
    "Spiritualitas & Makna",
    "hubungan dengan makna hidup",
    6,
    [
      question("krisis hidup", [3,4,5,7,9]),
      question("beda keyakinan", [2,4,5,7,9]),
      question("makna penderitaan", [3,4,5,7,9])
    ]
  ),
  aspect(
    "Empati & Kepedulian",
    "memahami perasaan orang lain",
    7,
    [
      question("pasangan sedih", [2,3,5,7,9]),
      question("emosi orang lain", [3,4,5,7,9]),
      question("beda sudut pandang", [3,4,5,7,9])
    ]
  ),
  aspect(
    "Batas Diri & Respek",
    "menghargai ruang pribadi",
    8,
    [
      question("privasi", [2,4,5,7,9]),
      question("cemburu", [2,3,4,7,9]),
      question("permintaan berlebihan", [2,4,5,7,9])
    ]
  ),
  aspect(
    "Kecocokan Seksual",
    "kenyamanan dan komunikasi seksual",
    6,
    [
      question("beda kebutuhan", [2,3,5,7,9]),
      question("komunikasi seks", [3,4,5,7,9]),
      question("fase bosan", [3,4,5,7,9])
    ]
  ),
  aspect(
    "Ketertarikan Fisik",
    "daya tarik realistis dan sehat",
    4,
    [
      question("fisik berubah", [2,4,5,7,9]),
      question("ketertarikan menurun", [2,4,5,7,9]),
      question("standar fisik", [2,3,4,7,9])
    ]
  ),
  aspect(
    "Growth Mindset",
    "kesediaan belajar dan bertumbuh",
    8,
    [
      question("dikritik", [2,3,4,7,9]),
      question("gagal", [3,4,5,7,9]),
      question("belajar dari konflik", [3,4,5,7,9])
    ]
  )
];

// =========================
// HELPER
// =========================
function aspect(name, desc, weight, questions) {
  return { name, desc, weight, questions };
}

function question(label, scores) {
  return {
    label,
    options: ["A","B","C","D","E"],
    scores
  };
}

// =========================
// STATE
// =========================
let index = 0;
const answers = aspects.map(a => a.questions.map(() => null));

const titleEl = document.getElementById("aspectTitle");
const descEl = document.getElementById("aspectDesc");
const qEl = document.getElementById("questions");
const progressEl = document.getElementById("progress");

// =========================
// RENDER
// =========================
function render() {
  const a = aspects[index];
  progressEl.textContent = `aspek ${index+1} dari ${aspects.length}`;
  titleEl.textContent = a.name;
  descEl.textContent = a.desc;
  qEl.innerHTML = "";

  a.questions.forEach((q, qi) => {
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `<p>${q.label}</p>`;

    q.options.forEach((opt, oi) => {
      const checked = answers[index][qi] === oi ? "checked" : "";
      div.innerHTML += `
        <label class="option">
          <input type="radio" name="q${qi}" ${checked}
            onclick="answers[${index}][${qi}] = ${oi}">
          ${opt}
        </label>
      `;
    });

    qEl.appendChild(div);
  });
}

// =========================
// NAVIGATION
// =========================
document.getElementById("nextBtn").onclick = () => {
  if (index < aspects.length - 1) {
    index++;
    render();
  } else {
    showResult();
  }
};

document.getElementById("prevBtn").onclick = () => {
  if (index > 0) {
    index--;
    render();
  }
};

// =========================
// RESULT (HITUNGAN BENAR)
// =========================
function showResult() {
  let total = 0;

  aspects.forEach((a, ai) => {
    const scores = a.questions.map((q, qi) => {
      const ans = answers[ai][qi];
      return q.scores[ans];
    });

    const avg = scores.reduce((s,v)=>s+v,0) / scores.length;
    total += avg * a.weight;
  });

  document.getElementById("app").innerHTML = `
    <h2>hasil akhir</h2>
    <p>total skor: <b>${Math.round(total)}</b></p>
    <p>
      ${total < 700
        ? "belum siap hubungan serius"
        : total < 850
        ? "cukup siap dengan seleksi ketat"
        : "siap hubungan jangka panjang sehat"}
    </p>
  `;
}

render();
