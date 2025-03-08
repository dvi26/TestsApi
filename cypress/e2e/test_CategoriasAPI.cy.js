
describe('Categoria API', () => {
  it('GET /api/categoria - debería devolver una lista de categorias', () => {
    cy.request('GET', '/api/categoria') 
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.length.greaterThan(0);
      });
  });

  it('GET /api/categoria/{id} - deberia devolver la categoria especifica', () => {
    const id = 1;
    cy.request(`GET`, `/api/categoria/${id}`)
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('idCategoria', id);
        expect(response.body).to.have.property('nombre');
      });
  });

  it('GET /api/categoria/{id} - deberia devolver 404 si no encuentra categoria', () => {
    const nonExistentId = 999;
    cy.request({
      method: 'GET',
      url: `/api/categoria/${nonExistentId}`,
      failOnStatusCode: false, 
    }).should((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.include('No se ha encontrado ninguna categoría con ese ID');
    });
  });
  
});
