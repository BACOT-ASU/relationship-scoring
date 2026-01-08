const aspects = [
  {
    name: "Regulasi Emosi",
    weight: 9,
    desc: "Kemampuan mengenali, mengelola, dan mengekspresikan emosi tanpa melukai.",
    question: "Saat emosi muncul, sejauh mana kamu mampu mengelolanya dengan sadar?",
    recommendation: [
      "Perlu belajar mengenali emosi dasar dan pemicunya",
      "Mulai latih jeda sebelum bereaksi",
      "Emosi cukup terkelola tapi belum konsisten",
      "Regulasi emosi sehat, pertahankan",
      "Sangat matang, jadikan kekuatan relasi"
    ]
  },
  {
    name: "Komunikasi",
    weight: 8,
    desc: "Kemampuan menyampaikan pikiran dan perasaan dengan jujur dan aman.",
    question: "Apakah kamu menyampaikan perasaan tanpa menyalahkan?",
    recommendation: [
      "Komunikasi cenderung reaktif atau tertutup",
      "Masih sering defensif",
      "Sudah cukup terbuka",
      "Komunikasi sehat dan jelas",
      "Komunikator relasi yang matang"
    ]
  },
  {
    name: "Boundaries",
    weight: 8,
    desc: "Kemampuan menjaga batas sehat antara memberi dan mengorbankan diri.",
    question: "Apakah kamu mampu berkata tidak tanpa rasa bersalah?",
    recommendation: [
      "Sering mengorbankan diri",
      "Mulai sadar batas tapi belum tegas",
      "Batas cukup jelas",
      "Boundaries sehat",
      "Sangat kuat dan stabil"
    ]
  },
  {
    name: "Nilai & Prinsip Hidup",
    weight: 9,
    desc: "Kejelasan nilai hidup dan konsistensi menjalankannya.",
    question: "Seberapa jelas prinsip hidupmu dalam relasi?",
    recommendation: [
      "Nilai hidup belum jelas",
      "Masih mudah goyah",
      "Nilai ada tapi belum kokoh",
      "Nilai hidup konsisten",
      "Prinsip kuat dan matang"
    ]
  },
  {
    name: "Tanggung Jawab",
    weight: 7,
    desc: "Kesediaan bertanggung jawab atas pilihan dan konsekuensi.",
    question: "Apakah kamu mengakui kesalahan tanpa defensif?",
    recommendation: [
      "Cenderung menyalahkan",
      "Mulai sadar tanggung jawab",
      "Cukup bertanggung jawab",
      "Dewasa dalam tanggung jawab",
      "Sangat dewasa dan jujur"
    ]
  },
  {
    name: "Kedewasaan Konflik",
    weight: 8,
    desc: "Cara menghadapi konflik tanpa menyerang atau menghindar.",
    question: "Saat konflik, apakah fokusmu solusi bukan menang?",
    recommendation: [
      "Menghindar atau menyerang",
      "Masih emosional",
      "Cukup netral",
      "Konflik ditangani dewasa",
      "Sangat matang dalam konflik"
    ]
  },
  {
    name: "Empati",
    weight: 9,
    desc: "Kemampuan memahami perasaan orang lain tanpa menghapus diri.",
    question: "Apakah kamu benar-benar mendengar tanpa menghakimi?",
    recommendation: [
      "Sulit memahami perspektif lain",
      "Empati masih terbatas",
      "Cukup empatik",
      "Empati sehat",
      "Empati sangat dalam"
    ]
  },
  {
    name: "Seksualitas Sehat",
    weight: 6,
    desc: "Kenyamanan dan komunikasi dalam relasi seksual.",
    question: "Apakah kamu nyaman membicarakan kebutuhan seksual?",
    recommendation: [
      "Seks jadi sumber konflik",
      "Masih canggung",
      "Cukup terbuka",
      "Komunikasi seksual sehat",
      "Sangat selaras dan sadar"
    ]
  },
  {
    name: "Spiritualitas",
    weight: 6,
    desc: "Kesadaran makna hidup dan nilai batin.",
    question: "Apakah hidupmu dipandu makna, bukan impuls?",
    recommendation: [
      "Hidup reaktif",
      "Mulai mencari makna",
      "Makna cukup jelas",
      "Spiritualitas stabil",
      "Makna hidup sangat kuat"
    ]
  },
  {
    name: "Visi Hidup & Arah",
    weight: 8,
    desc: "Kejelasan tujuan dan arah hidup.",
    question: "Apakah kamu tahu ke mana hidupmu menuju?",
    recommendation: [
      "Arah hidup belum jelas",
      "Masih bingung",
      "Arah cukup jelas",
      "Visi hidup stabil",
      "Sangat visioner"
    ]
  }
];

let index = 0;
let detailResults = [];
let totalScore = 0;

function render() {
  const a = aspects[index];
  document.getElementById("app").innerHTML = `
    <div class="card">
      <h1>${a.name}</h1>
      <p><em>${a.desc}</em></p>
      <p><strong>${a.question}</strong></p>

      <input type="range" min="1" max="5" value="3" id="slider">
      <div class="value">Nilai: <span id="val">3</span></div>
      <p id="reco">${a.recommendation[2]}</p>

      <button onclick="next()">Next</button>
    </div>
  `;

  const slider = document.getElementById("slider");
  const val = document.getElementById("val");
  const reco = document.getElementById("reco");

  slider.oninput = () => {
    val.innerText = slider.value;
    reco.innerText = a.recommendation[slider.value - 1];
  };
}

function next() {
  const value = Number(document.getElementById("slider").value);
  const aspect = aspects[index];
  const score = value * aspect.weight;

  detailResults.push({
    name: aspect.name,
    value,
    score,
    recommendation: aspect.recommendation[value - 1]
  });

  totalScore += score;
  index++;

  if (index < aspects.length) {
    render();
  } else {
    showResult();
  }
}

function showResult() {
  const maxScore = aspects.reduce((sum, a) => sum + a.weight * 5, 0);
  const percent = Math.round((totalScore / maxScore) * 100);

  let category = "";
  if (percent < 55) category = "Dangkal";
  else if (percent < 75) category = "Berkembang";
  else if (percent < 90) category = "Matang";
  else category = "Siap Jangka Panjang";

  document.getElementById("app").innerHTML = `
    <div class="card">
      <h1>Hasil Akhir</h1>
      <h2>${percent}%</h2>
      <p><strong>Kategori:</strong> ${category}</p>
      <hr>
      ${detailResults.map(r => `
        <p><strong>${r.name}</strong><br>
        Nilai: ${r.value} | Skor: ${r.score}<br>
        ${r.recommendation}</p>
      `).join("")}
    </div>
  `;
}

render();
