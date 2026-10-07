// Envoi du formulaire de contact à Web3Forms sans recharger la page.
// Fichier séparé (et non inline) pour respecter la politique de sécurité (CSP) : script-src 'self'.
const form = document.getElementById('contact-form');
const result = document.getElementById('form-result');

if (form && result) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const bouton = form.querySelector('button[type="submit"]');

    // Le widget hCaptcha dépose son jeton dans ce champ une fois le captcha validé.
    const jeton = form.querySelector('[name="h-captcha-response"]');
    if (!jeton || !jeton.value) {
      result.textContent = 'Merci de valider le captcha avant d’envoyer.';
      return;
    }

    result.textContent = 'Envoi en cours…';
    bouton.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
      });
      const data = await response.json();

      if (data.success) {
        result.textContent = 'Message envoyé, merci ! Je vous réponds rapidement.';
        form.reset();
        if (window.hcaptcha) window.hcaptcha.reset();
      } else {
        result.textContent = data.message || 'Une erreur est survenue, merci de réessayer.';
      }
    } catch (err) {
      result.textContent = 'Impossible d’envoyer le message. Merci de réessayer plus tard.';
    } finally {
      bouton.disabled = false;
    }
  });
}