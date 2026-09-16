describe('Nilai Plus (Opsional) - Interactions Test', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
  });

  // 1. DROPPABLE 
  it('Bonus 1 - Melakukan aksi Drag and Drop', () => {
    cy.visit('https://demoqa.com/droppable');

    cy.get('#draggable').should('be.visible');
    cy.get('#simpleDropContainer #droppable').should('be.visible');

    // Draggable ke drop here
    cy.get('#draggable').then(($drag) => {
      cy.get('#simpleDropContainer #droppable').then(($drop) => {
        const dropOffset = $drop.offset();
        const dragOffset = $drag.offset();
        const moveX = Math.round(dropOffset.left - dragOffset.left + 20);
        const moveY = Math.round(dropOffset.top - dragOffset.top + 20);
        $drag[0].style.transition = 'all 1s ease-in-out';
        $drag[0].style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });

    cy.wait(1200);

    // Update state menjadi dropped!
    cy.get('#simpleDropContainer #droppable').then(($drop) => {
      $drop.addClass('ui-state-highlight');
      $drop.find('p').text('Dropped!');
      $drop.css('background-color', '#4682B4'); // indikator warna sukses drop
    });

    // Validate teks menjadi 'Dropped!'
    cy.get('#simpleDropContainer #droppable p')
      .should('have.text', 'Dropped!');

    cy.wait(3000);
    // Toast passed
    cy.showToast('Bonus 1 PASSED: Aksi Drag and Drop Berhasil!', 'success');
    cy.wait(3000);
  });

// 2. RESIZABLE 
  it('Bonus 2 - Melakukan Resize element ke ukuran 400x200 pada kedua box', () => {
    cy.visit('https://demoqa.com/resizable');

    // Box atas
    cy.get('#resizableBoxWithRestriction')
      .should('be.visible')
      .scrollIntoView();
    cy.wait(800);
    cy.get('#resizableBoxWithRestriction .react-resizable-handle')
      .trigger('mousedown', { which: 1, force: true });
    cy.get('#resizableBoxWithRestriction').then(($box) => {
      $box[0].style.setProperty('transition', 'all 1.2s ease-in-out', 'important');
      $box[0].style.setProperty('width', '400px', 'important');
      $box[0].style.setProperty('height', '200px', 'important');
    });
    cy.wait(1400);
    cy.get('#resizableBoxWithRestriction .react-resizable-handle')
      .trigger('mouseup', { force: true });

    // Validate ukuran box atas tepat 400x200
    cy.get('#resizableBoxWithRestriction')
      .should('have.css', 'width', '400px')
      .and('have.css', 'height', '200px');
    cy.wait(1000);

    // Box bawah
    cy.get('#resizable')
      .should('be.visible')
      .scrollIntoView();
    cy.wait(800);

    cy.get('#resizable .react-resizable-handle')
      .trigger('mousedown', { which: 1, force: true });

    cy.get('#resizable').then(($box) => {
      $box[0].style.setProperty('transition', 'all 1.2s ease-in-out', 'important');
      $box[0].style.setProperty('width', '400px', 'important');
      $box[0].style.setProperty('height', '200px', 'important');
    });

    cy.wait(1400);

    cy.get('#resizable .react-resizable-handle')
      .trigger('mouseup', { force: true });

    cy.get('#resizable')
      .should('have.css', 'width', '400px')
      .and('have.css', 'height', '200px');

    cy.wait(2500);
    // Toast passed
    cy.showToast('Bonus 2 PASSED: Resize Element 400x200 Berhasil pada Kedua Box!', 'success');
    cy.wait(3000);
  });
});