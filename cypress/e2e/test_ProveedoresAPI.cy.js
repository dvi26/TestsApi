describe('Proveedor API', () => {
    it('GET /api/Proveedor - debería devolver una lista de proveedores', () => {
    cy.request('GET', '/api/Proveedor') 
        .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.length.greaterThan(0);
        });
    });

    it('GET /api/Proveedor/{id} - deberia devolver el proveedor especifico', () => {
    const id = 1;
    cy.request(`GET`, `/api/Proveedor/${id}`)
        .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('IdProveedor', id);
        expect(response.body).to.have.property('Nombre');
        expect(response.body).to.have.property('Correo');
        exepect(response.body).to.have.property('Telefono');
        exepect(response.body).to.have.property('Direccion');
        exepect(response.body).to.have.property('Pais');
        });
    });
    it ('GET /api/Proveedor/{pais} - debería devolver todos los pedidos que pertenezcan a una categoria introducida', () => {
        const pais="Argentina"
        cy.request(`GET`, `/api/Proveedor/${pais}`)
            .should((response) => {
            expect(response.status).to.eq(200);
            for (var i = 0; i < response.body.length; i++) {
                expect(response.body[i].Pais).to.eq(pais);
            }
            });
        });
        it('POST /api/Proveedor - deberia devolver 200 si ha creado correctamente el proveedor y los valores están presentes correctamente', () => {
            cy.request('POST', '/api/Proveedor', {
                "IdProveedor": 1,
                "Nombre": "Rodrigo",
                "Correo": "rodrigo@gmail.com",
                "Telefono": 123456789,
            "Direccion": "Calle Rodrigo",
            "Pais": "Argentina"}).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('IdProveedor', 1);
                expect(response.body).to.have.property('Nombre', "Rodrigo");
                expect(response.body).to.have.property('Correo', "rodrigo@gmail.com");
                expect(response.body).to.have.property('Telefono', 123456789);
                expect(response.body).to.have.property('Direccion', "Calle Rodrigo");
                expect(response.body).to.have.property('Pais', "Argentina");
                //expect(response.body).to.include('Se ha creado el pedido correctamente');
                });
            });
    
            it('PUT /api/Proveedor/{id} - deberia devolver 200 si ha modificado correctamente el proveedor y los valores están presentes correctamente', () => {
                const id = 1;
                cy.request('PUT', `/api/Proveedor/${id}`, {
                "Nombre": "Rodrigo",
                "Correo": "rodrigo@gmail.com",
                "Telefono": 123456789,
            "Direccion": "Calle Rodrigo",
            "Pais": "Argentina"
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property('IdProveedor', id);
                    expect(response.body).to.have.property('Nombre', "Rodrigo");
                    expect(response.body).to.have.property('Correo', "rodrigo@gmail.com");
                    expect(response.body).to.have.property('Telefono', 123456789);
                    expect(response.body).to.have.property('Direccion', "Calle Rodrigo");
                    expect(response.body).to.have.property('Direccion', "Argentina");
                    //expect(response.body).to.include('Se ha modificado el pedido correctamente');
                    });
                });
            it('DELETE /api/Proveedor/{id} - deberia devolver 200 si ha eliminado correctamente el proveedor', () => {
                const id = 1;
                cy.request('DELETE', `/api/Proveedor/${id}`)
                    .should((response) => {
                    expect(response.status).to.eq(200);
                    //expect(response.body).to.include('Se ha eliminado el pedido correctamente');
                    });
        });
});