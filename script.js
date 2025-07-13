const scriptURL = "https://script.google.com/macros/s/AKfycbyhzRGxwAruEfyYAda5TL_iXikOVnMYtpiRfrtx3pPCd6Ke6pf37NeBaGRgjk5u4ltu/exec"; // ganti ini

document.getElementById("formUcapan").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);

  const params = new URLSearchParams(data).toString();

  await fetch(scriptURL, {
    method: "POST",
    body: params,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });

  form.reset();
  alert("Ucapan terkirim!");

  loadUcapan(); // reload list ucapan
});

// Ambil data ucapan dan tampilkan
async function loadUcapan() {
  const res = await fetch(scriptURL);
  const data = await res.json();

  const list = document.getElementById("listUcapan");
  list.innerHTML = "";
  data.reverse().forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.nama}:</strong> ${item.ucapan}`;
    list.appendChild(li);
  });
}

window.addEventListener("DOMContentLoaded", loadUcapan);
