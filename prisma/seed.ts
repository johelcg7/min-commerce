import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const productos = [
  {
    name: 'Guitarra Acústica Fender FA-125 Dreadnought Sunburst - Con Funda',
    description: 'La FA-125 es una guitarra visualmente impresionante con un precio económico. La construcción laminada de calidad con un cabezal Fender 3 + 3 moderno y el puente Viking crean un instrumento fácil de tocar que suena genial. Los principiantes y los músicos en desarrollo apreciarán esta guitarra, que cuenta con un mástil nato que le da a la guitarra un tono animado y una sensación de ejecución suave. Forma del cuerpo: Dreadnought Delantera: Abeto laminado Fondo y Lados: Caoba laminada Lados del cuerpo: caoba laminada Longitud de escala: 25.3" (643 mm) Diapasón: Walnut 20 trastes Clavijeros Cromados Color Sunburst',
    price: 325.00,
    stock: 10,
    imageUrl: 'https://musicmarket.com.pe/cdn/shop/products/620913023_670x670.jpg?v=1600116907',
  },
  {
    name: 'Guitarra Eléctrica Squier Classic Vibe 60s Custom Telecaster® con mástil de Laurel - 3 Color Sunburst',
    description: 'Un guiño a los modelos Tele® de doble puente de la década de 1960, la Classic Vibe 60s Custom Telecaster crea un sonido increíble gracias a las pastillas de bobina simple de alnico diseñadas por Fender. Las características que facilitan el uso incluyen un perfil de mástil delgado y cómodo en forma de C con un diapasón de radio de 9,5" fácil de tocar y trastes estrechos y altos, así como un puente Telecaster de estilo vintage con selletas de barril y diseño de cuerdas a través del cuerpo. Este modelo Squier retro también presenta marcas en el clavijero inspiradas en la década de 1960, herrajes niquelados de aspecto sofisticado y un acabado de mástil brillante con tinte vintage elegante para un estilo de la vieja escuela.',
    price: 600.00,
    stock: 15,
    imageUrl: 'https://musicmarket.com.pe/cdn/shop/products/374040500web3_670x670.png?v=1599491597',
  },
  {
    name: 'Piano Digital Yamaha YDP-145R Dark Rosewood',
    description: 'El YDP-145 incorpora un teclado GHS de 88 teclas contrapesadas y las nuevas muestras del piano de cola CFX de Yamaha. Disfruta de su sonido realista gracias al modelado de resonancia virtual (VRM Lite), de las nuevas funciones que cuidan de tus oídos, y de la compatibilidad con la aplicación Yamaha Smart Pianist.',
    price: 1200.99,
    stock: 20,
    imageUrl: 'https://musicmarket.com.pe/cdn/shop/products/YDP-145R_f_0001_712765a74286b6624168d93a33342102_670x670.jpg?v=1674843836',
  },
  {
    name: 'Micrófono Condensador Cardioide USB Audio Technica ATR2500x-USB',
    description: 'Este micrófono de gran diafragma y captación lateral es ideal para músicos, streamers, podcasters y otros creadores de contenidos.',
    price: 150.99,
    stock: 25,
    imageUrl: 'https://musicmarket.com.pe/cdn/shop/products/090130009_670x670.png?v=1644863790',
  },

    {
    name: 'Interface M-Audio Air 192x4 Vocal Studio Pro',
    description: 'Ingresa al mundo de la grabación basada en estudio con AIR 192|4 Vocal Studio Pro, la solución todo en uno definitiva para proyectos de grabación por computadora. La combinación de la interfaz AIR 192|4 aclamada por la crítica, los auriculares HDH40, un micrófono de condensador Nova Black, un cable XLR y el paquete de software premium de la serie AIR, crear pistas vocales, grabar instrumentos eléctricos y acústicos y añadir voces en off a proyectos multimedia nunca se ha hecho más fácil. Con AIR 192|4 Vocal Studio Pro, la combinación de hardware de alto rendimiento y software fácil de usar da como resultado una captura de audio de calidad profesional para cada escenario de grabación.',
    price: 248.00,
    stock: 15,
    imageUrl: 'https://musicmarket.com.pe/cdn/shop/products/106041005_1_670x670.png?v=1634754651',
  },

     {
    name: 'Guitarra Acústica Gretsch G9500 Jim Dandy 2 Tone Sunburst',
    description: 'Fiel a las guitarras de salón Gretsch Rex de los años 30, 40 y 50, el modelo G9500 Jim Dandy Flat Top estilo salón encarna todo lo bueno de la primera guitarra de todos.',
    price: 220.00,
    stock: 7,
    imageUrl: 'https://musicmarket.com.pe/cdn/shop/products/27040005033_670x670.jpg?v=1599669056',
  },
     {
    name: 'Monitor de Estudio Yamaha HS3, Blanco (Par)',
    description: 'Los altavoces de la serie HS se volvieron la norma de los monitores estudios, confiados por muchos años por los más destacados ingenieros, productores y artistas de audio. Ahora Yamaha redefinió su esencia en un recinto compacto. Los HS3 son herramientas potentes para crear una amplia variedad de contenido de audio—desde producciones musicales hasta edición de video—que satisfacen las expectativas de los creadores con espacio limitado que deben trabajar con volumen bajo pero no quieren comprometer la calidad del monitoreo.',
    price: 370.00,
    stock: 3,
    imageUrl: 'https://musicmarket.com.pe/cdn/shop/files/HS3White-01_670x670.jpg?v=1744654060',
  },
  
       {
    name: 'Guitarra Resonator Gretsch G9200 Boxcar Round-Neck Resonator Guitar - Natural',
    description: 'Con su diseño de "cuerpo largo" de caoba y su cómodo mástil en forma de "V suave", esta reedición fiel del clásico de la década de 1930 suena y toca como un millón de dólares. La característica fundamental de todas las guitarras con resonador Gretsch es el diafragma Gretsch Ampli-Sonic (cono resonador), que se fabrica a mano en Europa del Este con casi un 99% de aluminio puro, lo que produce una calidad y un volumen de sonido impresionantes.',
    price: 580.00,
    stock: 3,
    imageUrl: 'https://musicmarket.com.pe/cdn/shop/products/62004152_1_670x670.jpg?v=1682011289',
  },

       {
    name: 'Mezclador Yamaha MG16',
    description: 'Mesa de mezclas de 16 canales: máximo 10 entradas de micro/16 de línea (8 mono + 4 estéreo); 4 buses de grupo + 1 bus estéreo; 4 envíos AUX.',
    price: 496.00,
    stock:8,
    imageUrl: 'https://musicmarket.com.pe/cdn/shop/products/088168076-MG16-220V_76827167-85e9-47d3-b79c-ecf0e72702da_670x670.png?v=1593217677',
  },

       {
    name: 'Parlante Fender Passport Event 375 Watts',
    description: 'Passport EVENT es ideal para una amplia gama de aplicaciones, incluidas escuelas, eventos deportivos y religiosos, reuniones, seminarios, presentaciones y conciertos en fiestas, clubes pequeños y cafeterías. Cuando necesites un sistema de audio portátil, elije Fender Passport, elije lo original. Fender Passport: El sonido que viaja.',
    price: 720.00,
    stock: 2,
    imageUrl: 'https://musicmarket.com.pe/cdn/shop/products/1050910031_670x670.jpg?v=1600104475',
  },

       {
    name: 'Batería Acústica Mapex Armory - Night Sky Burst, Shell Pack de 5 piezas AR529SVL (NO INCLUYE HARDWARE NI PLATILLOS)',
    description: 'La serie Armory es la última realización del concepto de caparazón híbrido Mapex. Una fusión de abedul y arce ofrece la máxima expresión tonal, y el borde de cojinete SONIClear permite que el parche se asiente plano, brindando la mejor respuesta al optimizar la relación entre el parche y el casco.',
    price: 1200.00,
    stock: 5,
    imageUrl: 'https://musicmarket.com.pe/cdn/shop/files/15421033_1_670x670.jpg?v=1711225949',
  },
]

async function main() {
  console.log('Eliminando órdenes y items existentes...');
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});

  console.log('Eliminando productos existentes...');
  await prisma.product.deleteMany({});

  console.log('Agregando productos...');
  for (const producto of productos) {
    await prisma.product.create({
      data: producto,
    });
  }

  console.log('Seed completado exitosamente.');
}

main()
  .catch((e) => {
    console.error('Error durante el seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
