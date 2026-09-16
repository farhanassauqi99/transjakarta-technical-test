// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('showToast', (message, type = 'success') => {
  const bgColors = {
    success: '#28a745',
    error: '#dc3545',
    info: '#17a2b8'
  };

  cy.window().then((win) => {
    const doc = win.document;
    
    // Hapus toast lama jika masih ada
    const oldToast = doc.getElementById('cypress-toast');
    if (oldToast) oldToast.remove();

    // Buat elemen banner toast
    const toast = doc.createElement('div');
    toast.id = 'cypress-toast';
    toast.innerText = message;
    Object.assign(toast.style, {
      position: 'fixed',
      top: '25px',
      right: '25px',
      backgroundColor: bgColors[type] || '#28a745',
      color: '#ffffff',
      padding: '14px 24px',
      borderRadius: '8px',
      boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
      fontSize: '15px',
      fontWeight: '600',
      zIndex: '999999',
      transition: 'opacity 0.4s ease-in-out',
      opacity: '0'
    });

    doc.body.appendChild(toast);

    // Animasi fade in
    setTimeout(() => {
      toast.style.opacity = '1';
    }, 50);

    // Otomatis fade out setelah 2.5 detik
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  });
});