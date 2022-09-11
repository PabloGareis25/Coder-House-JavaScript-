 class Carrito {
     constructor(productos)
     {
         this.productos=productos;
     }

     addProduct(product)
     {
        this.productos.push(product)
        console.log(product);
     }

     calcularTotal()
     {
         
     }
 }