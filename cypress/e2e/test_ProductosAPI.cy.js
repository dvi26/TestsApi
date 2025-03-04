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
    it ('GET /api/Produto/{idCategoria} - debería devolver todos los pedidos que pertenezcan a una categoria introducida', () => {
        const idCategoria=1
        cy.request(`GET`, `/api/Producto/${idCategoria}`)
            .should((response) => {
            expect(response.status).to.eq(200);
            for (var i = 0; i < response.body.length; i++) {
                expect(response.body[i].IdCategoria).to.eq(idCategoria);
            }
            });
        });
        it('POST /api/Producto - deberia devolver 200 si ha creado correctamente el producto y los valores están presentes correctamente', () => {
            cy.request('POST', '/api/Producto', {
                "IdProducto": 1,
                "Nombre": "Rodrigo",
                "Precio": 100,
                "IdCategoria": 1}).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('IdPedido', 1);
                expect(response.body).to.have.property('Nomber', "Rodrigo");
                expect(response.body).to.have.property('Coste', 100);
                expect(response.body).to.have.property('IdCategoria', 1);
                //expect(response.body).to.include('Se ha creado el pedido correctamente');
                });
            });
    
            it('PUT /api/Producto/{id} - deberia devolver 200 si ha modificado correctamente el prodcuto y los valores están presentes correctamente', () => {
                const id = 1;
                cy.request('PUT', `/api/Producto/${id}`, {
                    "Nombre": "2021-06-01",
                    "Precio": 100,
                    "IdCategoria": 1}).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property('IdProducto', 1);
                    expect(response.body).to.have.property('Nombre', 1);
                    expect(response.body).to.have.property('Precio', "100");
                    expect(response.body).to.have.property('IdCategoria', 1);
                    //expect(response.body).to.include('Se ha modificado el pedido correctamente');
                    });
                });
            it('DELETE /api/Producto/{id} - deberia devolver 200 si ha eliminado correctamente el producto', () => {
                const id = 1;
                cy.request('DELETE', `/api/Producto/${id}`)
                    .should((response) => {
                    expect(response.status).to.eq(200);
                    //expect(response.body).to.include('Se ha eliminado el pedido correctamente');
                    });
        });
});