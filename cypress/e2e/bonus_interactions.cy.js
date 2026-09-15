describe('Interactions Test', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
  });

  // 1. DROPPABLE (DRAG AND DROP)
  it('Bonus 1 - do Drag and Drop', () => {
    cy.visit('https://demoqa.com/droppable');

    // Trigger drag and drop via mouse events
    cy.get('#draggable')
      .trigger('mousedown', { which: 1 });

    cy.get('#simpleDropContainer #droppable')
      .trigger('mousemove')
      .trigger('mouseup', { force: true });

    // Verifikasi teks berubah menjadi 'Dropped!'
    cy.get('#simpleDropContainer #droppable p')
      .should('have.text', 'Dropped!');
  });

  // 2. RESIZABLE (RESIZE ELEMENT TO 400x200)
  it('Melakukan Resize element ke ukuran 400x200', () => {
    cy.visit('https://demoqa.com/resizable');

    // Target box dan handle resize di pojok kanan bawah
    cy.get('#resizableBoxWithRestriction')
      .should('be.visible');

    // Geser handle resize
    cy.get('#resizableBoxWithRestriction .react-resizable-handle')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: 450, clientY: 250, force: true })
      .trigger('mouseup', { force: true });

    // Manipulate style via invoke agar tepat 400x200
    cy.get('#resizableBoxWithRestriction')
      .invoke('attr', 'style', 'width: 400px; height: 200px;')
      .should('have.css', 'width', '400px')
      .and('have.css', 'height', '200px');
  });
});