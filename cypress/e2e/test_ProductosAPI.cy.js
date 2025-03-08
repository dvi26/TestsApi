describe('Producto API', () => {
    it('GET /api/Producto - debería devolver una lista de productos', () => {
    cy.request('GET', '/api/Pedido') 
        .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.length.greaterThan(0);
        });
    });

    it('GET /api/Producto/{id} - debería devolver el producto específico', () => {
        const id = 4; 
        cy.request('GET', `/api/Producto/${id}`)
          .should((response) => {
            expect(response.status).to.eq(200);
            const producto = response.body[0];
            expect(producto).to.have.property('idProducto', id);
            expect(producto).to.have.property('nombre');
            expect(producto).to.have.property('precioUd');
            expect(producto).to.have.property('cantidad');
            expect(producto).to.have.property('proveedor');
            expect(producto.proveedor).to.have.property('idProveedor');
            expect(producto.proveedor).to.have.property('nombre');
            expect(producto.proveedor).to.have.property('correo');
            expect(producto.proveedor).to.have.property('telefono');
            expect(producto.proveedor).to.have.property('direccion');
            expect(producto.proveedor).to.have.property('pais');
            expect(producto).to.have.property('categorias').that.is.an('array');

            if (producto.categorias.length > 0) {
              expect(producto.categorias[0]).to.have.property('idCategoria');
              expect(producto.categorias[0]).to.have.property('nombre');
            }
          });
      });
      
    
      it('GET /api/Producto/categoria/{idCategoria} - debería devolver todos los productos que pertenezcan a la categoría introducida', () => {
        const idCategoria = 1; 
        cy.request(`GET`, `/api/Producto/categoria/${idCategoria}`)
            .should((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array').that.is.not.empty;
    
                response.body.forEach((producto) => {
                    const perteneceACategoria = producto.categorias.some(cat => cat.idCategoria === idCategoria);
                    expect(perteneceACategoria).to.be.true;
                });
            });
    });
    
       
});