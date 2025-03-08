describe('Proveedor API', () => {
    it('GET /api/Proveedor - debería devolver una lista de proveedores', () => {
    cy.request('GET', '/api/Proveedor') 
        .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.length.greaterThan(0);
        });
    });

    it('GET /api/Proveedor/{id} - debería devolver el proveedor específico', () => {
        const id = 1;
        cy.request(`GET`, `/api/Proveedor/${id}`)
            .should((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('idProveedor', id);
                expect(response.body).to.have.property('nombre');
                expect(response.body).to.have.property('correo');
                expect(response.body).to.have.property('telefono');
                expect(response.body).to.have.property('direccion');
                expect(response.body).to.have.property('pais');
            });
    });
    
    it('GET /api/Proveedor/pais/{pais} - debería devolver todos los proveedores de un país introducido', () => {
        const pais = "Argentina";
        cy.request(`GET`, `/api/Proveedor/pais/${pais}`)
            .should((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array').that.is.not.empty; 
    
                response.body.forEach((proveedor) => {
                    expect(proveedor.pais).to.eq(pais);
                });
            });
    });
    
     
});