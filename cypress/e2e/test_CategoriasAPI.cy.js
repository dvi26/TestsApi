
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
  it('POST /api/categoria - deberia devolver 200 si ha creado correctamente la categoria y los valores están presentes correctamente', () => {
    cy.request('POST', '/api/categoria', {
        "IdCategoria": 1,
        "Nombre": "Rodrigo"}).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('IdCategoria', 1);
        expect(response.body).to.have.property('Nombre', "Rodrigo");
        //expect(response.body).to.include('Se ha creado el pedido correctamente');
        });
    });

    it('PUT /api/categoria/{id} - deberia devolver 200 si ha modificado correctamente la categoria y los valores están presentes correctamente', () => {
        const id = 1;
        cy.request('PUT', `/api/categoria/${id}`, {
            "Nombre": "Pedro"}).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('IdPedido', 1);
            expect(response.body).to.have.property('Nombre', "Pedro");
            //expect(response.body).to.include('Se ha modificado el pedido correctamente');
            });
        });
    it('DELETE /api/categoria/{id} - deberia devolver 200 si ha eliminado correctamente la categoria', () => {
        const id = 1;
        cy.request('DELETE', `/api/categoria/${id}`)
            .should((response) => {
            expect(response.status).to.eq(200);
            //expect(response.body).to.include('Se ha eliminado el pedido correctamente');
            });
});
});
