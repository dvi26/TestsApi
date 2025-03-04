describe('Producto API', () => {
    it('GET /api/Producto - debería devolver una lista de productos', () => {
    cy.request('GET', '/api/Pedido') 
        .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.length.greaterThan(0);
        });
    });

    it('GET /api/Producto/{id} - deberia devolver el producto especifico', () => {
    const id = 1;
    cy.request(`GET`, `/api/Producto/${id}`)
        .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('IdProducto', id);
        expect(response.body).to.have.property('Nombre');
        expect(response.body).to.have.property('Precio');
        exepect(response.body).to.have.property('IdCategoria');
        });
    });
});