// Envoi du formulaire de contact à Web3Forms sans recharger la page.
// Fichier séparé (et non inline) pour respecter la politique de sécurité (CSP) : script-src 'self'.
const form = document.getElementById('contact-form');
const result = document.getElementById('form-result');

if (form && result) {
  // Messages affichés à l'utilisateur : la page peut les traduire avec des attributs data-msg-*
  // sur le formulaire (version anglaise) ; sinon on utilise le texte français par défaut.
  const messages = {
    captcha: form.dataset.msgCaptcha || 'Merci de valider le captcha avant d’envoyer.',
    sending: form.dataset.msgSending || 'Envoi en cours…',
    success: form.dataset.msgSuccess || 'Message envoyé, merci ! Je vous réponds rapidement.',
    error: form.dataset.msgError || 'Une erreur est survenue, merci de réessayer.',
    network: form.dataset.msgNetwork || 'Impossible d’envoyer le message. Merci de réessayer plus tard.',
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const bouton = form.querySelector('button[type="submit"]');

    // Le widget hCaptcha dépose son jeton dans ce champ une fois le captcha validé.
    const jeton = form.querySelector('[name="h-captcha-response"]');
    if (!jeton || !jeton.value) {
      result.textContent = messages.captcha;
      return;
    }

    result.textContent = messages.sending;
    bouton.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
      });
      const data = await response.json();

      if (data.success) {
        result.textContent = messages.success;
        form.reset();
        if (window.hcaptcha) window.hcaptcha.reset();
      } else {
        result.textContent = data.message || messages.error;
      }
    } catch (err) {
      result.textContent = messages.network;
    } finally {
      bouton.disabled = false;
    }
  });
}
