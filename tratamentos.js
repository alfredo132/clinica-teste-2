/*
  Janela de tratamento, usada em todas as versões do teste 2.
  Qualquer elemento com data-treat="Nome do tratamento" abre a janela ao ser clicado.
  O conteúdo é um espaço reservado ("Adaptamos à sua clínica") para cada cliente preencher.
  Cores e letras vêm das variáveis da página: --ink, --accent, --bg e, se existir, --treat-title-font.
*/
(() => {
  /* Troque pelo número da clínica, com DDI e DDD, só números. */
  const WHATSAPP = "5500000000000";

  const css = `
  dialog.treat-modal { margin: auto; width: min(560px, calc(100% - 32px)); border: 0; border-radius: 14px; padding: 0; background: #fff; color: var(--ink, #16181d); box-shadow: 0 30px 80px rgb(0 0 0 / .28); overflow: hidden; }
  dialog.treat-modal[open] { animation: treat-rise .45s cubic-bezier(.16, 1, .3, 1); }
  dialog.treat-modal::backdrop { background: rgb(14 16 20 / .5); backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px); }
  @keyframes treat-rise { from { opacity: 0; transform: translateY(18px); } }
  .treat-modal .tm-head { display: flex; justify-content: space-between; align-items: start; gap: 16px; padding: 26px 26px 18px; }
  .treat-modal .tm-head small { display: block; font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: #7a7f88; margin-bottom: 6px; }
  .treat-modal h2 { font-family: var(--treat-title-font, inherit); font-weight: 700; font-size: clamp(28px, 4vw, 36px); line-height: 1.05; letter-spacing: -.02em; }
  .treat-modal .tm-x { flex: none; display: grid; place-items: center; width: 40px; height: 40px; border-radius: 999px; border: 1px solid #e2e2de; background: none; color: inherit; cursor: pointer; font-size: 20px; line-height: 1; transition: border-color .2s; }
  .treat-modal .tm-x:hover { border-color: currentColor; }
  .treat-modal .tm-slot { margin: 0 26px; aspect-ratio: 16 / 9; border-radius: 10px; display: grid; place-items: center; text-align: center; padding: 24px;
    background: repeating-linear-gradient(135deg, var(--bg, #f5f5f3) 0 14px, #ecebe7 14px 15px); border: 1px dashed #c9c8c2; }
  .treat-modal .tm-slot b { display: block; font-family: var(--treat-title-font, inherit); font-size: clamp(22px, 3vw, 28px); font-weight: 700; letter-spacing: -.01em; }
  .treat-modal .tm-slot span { display: block; margin-top: 8px; font-size: 14px; color: #6b7079; max-width: 34ch; line-height: 1.5; }
  .treat-modal .tm-foot { padding: 20px 26px 26px; }
  .treat-modal .tm-cta { display: flex; align-items: center; justify-content: center; gap: 10px; height: 54px; border-radius: 8px; background: var(--accent, #2443d0); color: #fff; font-weight: 600; font-size: 15px; text-decoration: none; transition: filter .2s; }
  .treat-modal .tm-cta:hover { filter: brightness(.9); }
  @media (max-width: 640px) {
    dialog.treat-modal { width: 100%; max-width: none; margin: auto 0 0; border-radius: 16px 16px 0 0; }
    .treat-modal .tm-head, .treat-modal .tm-foot { padding-left: 18px; padding-right: 18px; }
    .treat-modal .tm-slot { margin: 0 18px; aspect-ratio: 4 / 3; }
  }
  @media (prefers-reduced-motion: reduce) { dialog.treat-modal[open] { animation: none; } }`;
  document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);

  document.body.insertAdjacentHTML("beforeend", `
  <dialog class="treat-modal" id="treat-modal" aria-labelledby="tm-title">
    <div class="tm-head">
      <div><small>Tratamento</small><h2 id="tm-title"></h2></div>
      <button class="tm-x" type="button" aria-label="Fechar">×</button>
    </div>
    <div class="tm-slot">
      <div><b>Adaptamos à sua clínica</b><span>Aqui entram as fotos, a explicação e os casos deste tratamento, com o conteúdo da sua clínica.</span></div>
    </div>
    <div class="tm-foot"><a class="tm-cta" id="tm-cta" target="_blank" rel="noopener">Agendar avaliação</a></div>
  </dialog>`);

  const modal = document.getElementById("treat-modal");
  document.addEventListener("click", e => {
    const el = e.target.closest("[data-treat]");
    if (!el) return;
    e.preventDefault();
    const name = el.dataset.treat;
    document.getElementById("tm-title").textContent = name;
    const msg = `Olá! Vim pelo site e quero agendar uma avaliação de ${name.toLowerCase()}.`;
    document.getElementById("tm-cta").href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
    modal.showModal();
  });
  modal.querySelector(".tm-x").addEventListener("click", () => modal.close());
  modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });
})();
