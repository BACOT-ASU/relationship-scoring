const aspects = [
  {
    name: "Regulasi Emosi",
    weight: 9,
    desc: "Kemampuan mengenali, mengelola, dan mengekspresikan emosi tanpa melukai diri sendiri atau orang lain.",
    question: "Saat emosi muncul (marah, sedih, cemburu), sejauh mana kamu mampu mengelolanya dengan sadar?"
  },
  {
    name: "Komunikasi",
    weight: 8,
    desc: "Kemampuan menyampaikan pikiran dan perasaan secara jujur, jelas, dan tidak menyerang.",
    question: "Apakah kamu mampu menyampaikan perasaan tanpa menyalahkan atau memanipulasi?"
  },
  {
    name: "Boundaries",
    weight: 8,
    desc: "Kemampuan menjaga batas sehat antara memberi dan mengorbankan diri.",
    question: "Apakah kamu mampu berkata tidak tanpa rasa bersalah berlebihan?"
  },
  {
    name: "Nilai & Prinsip Hidup",
    weight: 9,
    desc: "Kejelasan nilai hidup dan konsistensi menjalankannya.",
    question: "Seberapa jelas dan konsisten prinsip hidupmu dalam relasi?"
  },
  {
    name: "Tanggung Jawab",
    weight: 7,
    desc: "Kesediaan bertanggung jawab atas pilihan dan konsekuensi.",
    question: "Apakah kamu mengakui kesalahan tanpa defensif?"
  },
  {
    name: "Kedewasaan Konflik",
    weight: 8,
    desc: "Cara menghadapi konflik tanpa menghindar atau menyerang.",
    question: "Saat konflik, apakah kamu fokus pada solusi, bukan menang?"
  },
  {
    name: "Empati",
    weight: 9,
    desc: "Kemampuan memahami perasaan pasangan tanpa menghapus diri sendiri.",
    question: "Seberapa sering kamu benar-benar mendengar tanpa menyela?"
  },
  {
    name: "Seksualitas Sehat",
    weight: 6,
    desc: "Kenyamanan, komunikasi, dan kesadaran dalam relasi seksual.",
    question: "Apakah kamu mampu membicarakan kebutuhan seksual dengan aman?"
  },
  {
    name: "Spiritualitas",
    weight: 6,
    desc: "Kesadaran makna hidup dan keterhubungan dengan sesuatu yang lebih besar.",
    question: "Apakah hidupmu dipandu oleh nilai makna, bukan impuls?"
  },
  {
    name: "Visi Hidup & Arah",
    weight: 8,
    desc: "Kejelasan arah hidup dan tujuan jangka panjang.",
    question: "Apakah kamu tahu ke mana hidupmu menuju?"
  }
];

let index = 0;
let scores = [];

function render() {
  const a = aspects[index];
  document.getElementById("app").innerHTML = `
    <div class="card">
      <h1>${a.name}</h1>
      <p><em>${a.desc}</em></p>
      <p><strong>${a.question}</strong></p>

      <input type="range" min="1" max="5" value="3" id="slider">
      <div class="value">Nilai: <span id="val">3</span></div>

      <button onclick="next()">Next</button>
    </div>
  `;

  const slider = document.getElementById("slider");
  const val = document.getElementById("val");
  slider.oninput = () => val.innerText = slider.value;
}

function next() {
  const value = document.getElementById("slider").value;
  scores[index] = value * aspects[index].weight;
  index++;

  if (index < aspects.length) {
    render();
  } else {
    showResult();
  }
}

function showResult() {
  const total = scores.reduce((a,b) => a+b, 0);
  document.getElementById("app").innerHTML = `
    <div class="card">
      <h1>Hasil Akhir</h1>
      <p>Total Skor Kamu:</p>
      <h2>${total}</h2>
      <p>Skor ini menunjukkan kesiapan relasimu secara keseluruhan.</p>
    </div>
  `;
}

render();
