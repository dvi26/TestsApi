describe('Pedido API', () => {
  
  // Test para obtener una lista de pedidos
  it('GET /api/Pedido - debería devolver una lista de pedidos', () => {
    cy.request('GET', '/api/Pedido') 
      .should((response) => {
        // Comprobamos que el status es 200 
        expect(response.status).to.eq(200);
        // Comprobamos que la respuesta es un array
        expect(response.body).to.be.an('array');
        // Aseguramos que la lista no esté vacía
        expect(response.body).to.have.length.greaterThan(0);
      });
  });

  // Test para obtener un pedido específico por ID
  it('GET /api/Pedido/{id} - debería devolver el pedido específico', () => {
    const id = 1; // ID del pedido que se busca
    cy.request(`GET`, `/api/Pedido/${id}`)
      .should((response) => {
        // Comprobamos que el status es 200
        expect(response.status).to.eq(200);
        // Comprobamos que el cuerpo de la respuesta contiene el ID correcto
        expect(response.body).to.have.property('idPedido', id);
        // Aseguramos que el pedido tiene las propiedades esperadas
        expect(response.body).to.have.property('fechaPedido');
        expect(response.body).to.have.property('costeTotal');
      });
  });

  // Test para manejar el caso cuando el pedido no existe (404)
  it('GET /api/Pedido/{id} - debería devolver 404 si no encuentra pedido', () => {
    const nonExistentId = 999; // ID no existente
    cy.request({
      method: 'GET',
      url: `/api/Pedido/${nonExistentId}`,
      failOnStatusCode: false, // No lanzar error por un status 404
    }).should((response) => {
      // Verificamos que el status sea 404
      expect(response.status).to.eq(404);
      // expect(response.body).to.include('No se ha encontrado ningun pedido con ese ID');
    });
  });

  // Test para obtener pedidos dentro de un rango de fechas
  it('GET /api/Pedido/fechas?fechaInicio=2024-02-19&fechaFin=2024-02-21 - debería devolver pedidos dentro de las fechas', () => {
    const fechaInicio = '2024-02-28';
    const fechaFin = '2024-04-21';
    
    cy.request('GET', `/api/Pedido/fechas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
      .should((response) => {
        // Comprobamos que la respuesta es exitosa
        expect(response.status).to.eq(200);
        // Comprobamos que todos los pedidos están dentro del rango de fechas
        response.body.forEach((pedido) => {
          const pedidoFecha = new Date(pedido.fechaPedido);
          expect(pedidoFecha).to.be.greaterThan(new Date(fechaInicio));
          expect(pedidoFecha).to.be.lessThan(new Date(fechaFin));
        });
      });
    });
  /*it('POST /api/Pedido - debería crear un nuevo pedido', async () => {
    const requestBody = [
      {
        "idProducto": 99,
        "proveedor": {
          "idProveedor": 1,
          "nombre": "TechZone",
          "correo": "contacto@techzone.com",
          "telefono": "123456789",
          "direccion": "Calle Tecnología 45",
          "pais": "España"
        },
        "nombre": "Smartphone",
        "precioUd": 500,
        "cantidad": 3,
        "precioTotal": 1500,
        "categorias": [
          {
            "idCategoria": 1,
            "nombre": "Electrónica"
          }
        ]
      }
    ];
  
    const response = await request(app)
      .post('/api/Pedido')
      .send(requestBody)
      .set('Accept', 'application/json');
  
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject([
      {
        "idProducto": expect.any(Number),
        "proveedor": {
          "idProveedor": expect.any(Number),
          "nombre": expect.any(String),
          "correo": expect.any(String),
          "telefono": expect.any(String),
          "direccion": expect.any(String),
          "pais": expect.any(String)
        },
        "nombre": expect.any(String),
        "precioUd": expect.any(Number),
        "cantidad": expect.any(Number),
        "precioTotal": expect.any(Number),
        "categorias": expect.arrayContaining([
          {
            "idCategoria": expect.any(Number),
            "nombre": expect.any(String)
          }
        ])
      }
    ]);
  });
  
    cy.request({
      method: 'POST',
      url: '/api/Pedido',  
      body: requestBody,
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  */

  // Test PUT 
  /*
  it('PUT /api/Pedido/{id} - debería devolver 200 si ha modificado correctamente el pedido y el mensaje está presente', () => {
    const id = 35;
    cy.request('PUT', `/api/Pedido/${id}`, {
      "idPedido": 1,
      "productos": [
        {
          "idProducto": 1,
          "proveedor": { "idProveedor": 1, "nombre": "TechWorld", "correo": "ventas@techworld.com" },
          "nombre": "Smartphone Samsung Galaxy",
          "precioUd": 500,
          "cantidad": 3,
          "precioTotal": 1500,
          "categorias": [{ "idCategoria": 1, "nombre": "Electrónica" }]
        },
        {
          "idProducto": 3,
          "proveedor": { "idProveedor": 1, "nombre": "TechWorld", "correo": "ventas@techworld.com" },
          "nombre": "Aspiradora Dyson V10",
          "precioUd": 20,
          "cantidad": 5,
          "precioTotal": 100,
          "categorias": [{ "idCategoria": 3, "nombre": "Deportes" }]
        }
      ],
      "costeTotal": 1600,
      "fechaPedido": "2025-03-07T14:42:09.097"
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq('Se ha actualizado el pedido correctamente');
    });
  });
  */

  // Test DELETE 
  /*
  it('DELETE /api/Pedido/{id} - debería devolver 200 si ha eliminado correctamente el pedido', () => {
    const id = 5;
    cy.request('DELETE', `/api/Pedido/${id}`)
      .should((response) => {
        expect(response.status).to.eq(200);
        // expect(response.body).to.include('Se ha eliminado el pedido correctamente');
      });
  });
  */

});
