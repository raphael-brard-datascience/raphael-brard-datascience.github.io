// Assemble l'adresse e-mail dans le navigateur pour limiter le moissonnage par les robots simples.
document.querySelectorAll('[data-u]').forEach((el) => {
  const adresse = el.dataset.u + '@' + el.dataset.d;
  const lien = document.createElement('a');
  lien.href = 'mailto:' + adresse;
  lien.textContent = adresse;
  el.replaceChildren(lien);
});
