const aspects = [
  {
    name: "Karakter & Nilai Hidup",
    desc: "konsistensi prinsip hidup saat diuji",
    weight: 9,
    questions: [
      q("janji yang merepotkan", [3,2,4,7,9]),
      q("godaan melanggar prinsip", [2,3,4,7,9]),
      q("berbeda nilai dengan pasangan", [3,4,5,7,9])
    ]
  },
  {
    name: "Regulasi Emosi",
    desc: "cara mengelola emosi saat konflik",
    weight: 9,
    questions: [
      q("dikritik di depan umum", [3,2,4,7,9]),
      q("stres tapi dituntut perhatian", [3,2,4,7,9]),
      q("konflik lama diungkit", [2,3,4,7,9])
    ]
  },
  {
    name: "Komunikasi & Konflik",
    desc: "cara menyampaikan & menyelesaikan masalah",
    weight: 8,
    questions: [
      q("beda pendapat serius", [2,3,4,7,9]),
      q("disalahpahami", [3,2,4,7,9]),
      q("diskusi buntu", [3,4,5,7,9])
    ]
  },
  {
    name: "Tanggung Jawab & Konsistensi",
    desc: "apakah tindakan bisa diandalkan",
    weight: 8,
    questions: [
      q("janji pribadi", [2,3,5,7,9]),
      q("tanggung jawab berat", [3,4,5,7,9]),
      q("bosan rutinitas", [2,3,4,7,9])
    ]
  },
  {
    name: "Tujuan Hidup & Arah",
    desc: "kejelasan visi hidup",
    weight: 8,
    questions: [
      q("rencana 5 tahun", [2,4,5,7,9]),
      q("tujuan tidak sejalan", [3,4,5,7,9]),
      q("fase sulit hidup", [3,4,5,7,9])
    ]
  },
  {
    name: "Finansial Mindset",
    desc: "cara berpikir soal uang & usaha",
    weight: 7,
    questions: [
      q("keuangan sulit", [2,3,5,7,9]),
      q("perbedaan gaya hidup", [3,4,5,7,9]),
      q("utang", [2,3,4,7,9])
    ]
  },
  {
    name: "Spiritualitas & Makna",
    desc: "hubungan dengan makna hidup",
    weight: 6,
    questions: [
      q("krisis hidup", [3,4,5,7,9]),
      q("beda keyakinan", [2,4,5,7,9]),
      q("makna penderitaan", [3,4,5,7,9])
    ]
  },
  {
    name: "Empati & Kepedulian",
    desc: "kemampuan memahami perasaan orang lain",
    weight: 7,
    questions: [
      q("pasangan sedih", [2,3,5,7,9]),
      q("emosi orang lain", [3,4,5,7,9]),
      q("beda sudut pandang", [3,4,5,7,9])
    ]
  },
  {
    name: "Batas Diri & Respek",
    desc: "menghargai ruang pribadi",
    weight: 8,
    questions: [
      q("privasi", [2,4,5,7,9]),
      q("cemburu", [2,3,4,7,9]),
      q("permintaan berlebihan", [2,4,5,7,9])
    ]
  },
  {
    name: "Kecocokan Seksual",
    desc: "kenyamanan & komunikasi seksual",
    weight: 6,
    questions: [
      q("beda kebutuhan", [2,3,5,7,9]),
      q("komunikasi seks", [3,4,5,7,9]),
      q("fase bosan", [3,4,5,7,9])
    ]
  },
  {
    name: "Ketertarikan Fisik",
    desc: "daya tarik realistis & sehat",
    weight: 4,
    questions: [
      q("fisik berubah", [2,4,5,7,9]),
      q("ketertarikan menurun", [2,4,5,7,9]),
      q("standar fisik", [2,3,4,7,9])
    ]
  },
  {
    name: "Growth Mindset",
    desc: "kesediaan bertumbuh",
    weight: 8,
    questions: [
      q("dikritik", [2,3,4,7,9]),
      q("gagal", [3,4,5,7,9]),
      q("belajar dari konflik", [3,4,5,7,9])
    ]
  }
];

// ===== helper =====
function q(label, scores) {
  return {
    label,
    options: ["A","B","C","D","E"],
    scores
  };
}

let index = 0;
const answers = aspects.map(a => a.questions.map(() => null));

const titleEl = document.getElementById("aspectTitle");
const descEl = document.getElementById("aspectDesc");
const qEl = document.getElementById("questions");

function render() {
  const a = aspects[index];
  titleEl.textContent = `${index+1}. ${a.name}`;
  descEl.textContent = a.desc;
  qEl.innerHTML = "";

  a.questions.forEach((q, qi) => {
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `<p>${q.label}</p>`;
    q.options.forEach((opt, oi) => {
      div.innerHTML += `
        <label class="option">
          <input type="radio" name="q${qi}" 
          ${answers[index][qi]===oi?"checked":""}
          onclick="answers[${index}][${qi}]=${oi}">
          ${opt}
        </label>`;
    });
    qEl.appendChild(div);
  });
}

function finish() {
  let total = 0;
  aspects.forEach((a, ai) => {
    const avg = answers[ai].reduce((s,i)=>s+a.questions[0].scores[i],0)/answers[ai].length;
    total += avg * a.weight;
  });

  document.getElementById("app").innerHTML = `
    <h2>Hasil Akhir</h2>
    <p>Total Skor: <b>${Math.round(total)}</b></p>
    <p>
      ${total < 700 ? "belum siap hubungan serius"
      : total < 850 ? "cukup siap dengan seleksi ketat"
      : "siap hubungan jangka panjang sehat"}
    </p>
  `;
}

document.getElementById("nextBtn").onclick = () =>
  index < aspects.length-1 ? (index++,render()) : finish();

document.getElementById("prevBtn").onclick = () =>
  index>0 && (index--,render());

render();
