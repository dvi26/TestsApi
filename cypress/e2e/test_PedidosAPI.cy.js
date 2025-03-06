describe('Pedido API', () => {
    it('GET /api/Pedido - debería devolver una lista de pedidos', () => {
    cy.request('GET', '/api/Pedido') 
        .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.length.greaterThan(0);
        });
    });

    it('GET /api/Pedido/{id} - deberia devolver el pedido especifico', () => {
    const id = 4;
    cy.request(`GET`, `/api/Pedido/${id}`)
        .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('idPedido', id);
        expect(response.body).to.have.property('fechaPedido');
        expect(response.body).to.have.property('costeTotal');
        });
    });

    it('GET /api/Pedido/{id} - deberia devolver 404 si no encuentra pedido', () => {
    const nonExistentId = 999;
    cy.request({
        method: 'GET',
        url: `/api/Pedido/${nonExistentId}`,
        failOnStatusCode: false, 
    }).should((response) => {
        expect(response.status).to.eq(404);
        //expect(response.body).to.include('No se ha encontrado ningun pedido con ese ID');
    });
    });

    it('GET /api/Pedido/fechaInicio={fechaInicio}&fechaFin={fechaFin} - deberia devolver el pedido especifico, además comprueba que todos los pedidos de la lista están entre las fechas introducidad', () => {
        const fechaInicio='2024-02-19';
        const fechaFin='2024-02-21';
        cy.request(`GET`, `/api/Pedido/$fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
            .should((response) => {
            expect(response.status).to.eq(200);
            for (var i = 0; i < response.body.length; i++) {
                expect(response.body[i].FechaPedido).to.be.greaterThan(fechaInicio);
                expect(response.body[i].FechaPedido).to.be.lessThan(fechaFin);
            }
            });
        });

    it ('GET /api/Pedido/producto/{idProd} - debería devolver todos los pedidos que contengan el produto introducido', () => {
    const idProd=18
    cy.request(`GET`, `/api/Pedido/prdocuto/${idProd}`)
        .should((response) => {
        expect(response.status).to.eq(200);
        for (var i = 0; i < response.body.length; i++) {
            expect(response.body[i].IdProducto).to.eq(idProd);
        }
        });
    });
/*
    it('POST /api/Pedido - deberia devolver 200 si ha creado correctamente el pedido y los valores están presentes correctamente', () => {
        cy.request('POST', '/api/Pedido', {
            "IdPedido": 1,
            "FechaPedido": "2021-06-01",
            "Coste": 100,
            "IdProveedor": 1}).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('IdPedido', 1);
            expect(response.body).to.have.property('FechaPedido', "2021-06-01");
            expect(response.body).to.have.property('Coste', 100);
            expect(response.body).to.have.property('IdProveedor', 1);
            //expect(response.body).to.include('Se ha creado el pedido correctamente');
            });
        });

        it('PUT /api/Pedido/{id} - deberia devolver 200 si ha modificado correctamente el pedido y los valores están presentes correctamente', () => {
            const id = 1;
            cy.request('PUT', `/api/Pedido/${id}`, {
                "FechaPedido": "2021-06-01",
                "Coste": 100,
                "IdProveedor": 1}).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('IdPedido', 1);
                expect(response.body).to.have.property('FechaPedido', "2021-06-01");
                expect(response.body).to.have.property('Coste', 100);
                expect(response.body).to.have.property('IdProveedor', 1);
                //expect(response.body).to.include('Se ha modificado el pedido correctamente');
                });
            });
        it('DELETE /api/Pedido/{id} - deberia devolver 200 si ha eliminado correctamente el pedido', () => {
            const id = 1;
            cy.request('DELETE', `/api/Pedido/${id}`)
                .should((response) => {
                expect(response.status).to.eq(200);
                //expect(response.body).to.include('Se ha eliminado el pedido correctamente');
                });
    });
    */
});


