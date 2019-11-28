<h1>
2019 - 2 cuatrimestre - Laboratorio IV -- La Comanda -- Gastón Pesoa
</h1>

<h2><a target="_blank" href="https://pesoagaston.github.io/">Link al sitio</a>
</h2>

<b>Descripción:</b>

<p>
   Sistema de servicio de pedidos para restaurante, con dos sectores bien diferenciados: 
</p>   
<ul>
   <li>la barra de tragos y vinos</li>
   <li>cocina, donde se preparan todos los platos de comida</li>
</ul>
</hr>
<p>
Dentro del de trabajadores tenemos empleados diferenciados por
</p>
<ul>
   <li>bartender​</li>
   <li>cocineros​</li>
   <li>mozos​</li>
   <li>socios​</li>
</ul>

<h3>Gestión de Comandas</h3>
<p>Cada comanda tiene toda la información necesaria, incluso el nombre del cliente, y es vista por el empleado correspondiente</p>
<p><b>Operatoria principal:</b></p>
<ul>
   <li>El cliente ingresa al local y se pone en la lista de espera.</li>
   <li>El mozo rechaza o acepta al cliente y le asigna una mesa.</li>
   <li>El cliente puede ver su mesa asignada y generar un pedido.</li>
   <li>El cliente puede realizar la encuesta de satisfacción.</li>
   <li>El mozo acepta o rechaza el pedido.</li>
   <li>El barman y el cocinero visualizan en su lista de pendientes los menus del pedido que le correspondan.</li>
   <li>El barman y el cocinero toman el pedido.</li>
   <li>El cliente puede visualizar la hora de entrega.</li>
   <li>El barman y el cocinero terminan el pedido.</li>
   <li>El mozo entrega el pedido.</li>
   <li>El cliente confirma la recepción del pedido y puede pagar.</li>
   <li>El cliente paga.</li>
   <li>El mozo confirma el pago, cierra el pedido y libera la mesa.</li>
</ul>
</hr>
<p><b>La encuesta de satisfacción califica como Malo, Regular o Bueno:</b></p>
<ul>
   <li>El servicio</li>
   <li>La comida</li>
   <li>La mesa</li>
</ul>
<p>Y un breve texto con comentarios.</p>
</hr>

<h3>Descripción técnica:</h3>
</hr>
<p>El sistema consta de una página web hosteada con Github pages, desarrollada con Angular 8. Como motor de base de datos se utilizó firebase, para persistir la información. El estilo se logró con Angular Material UI</p>
</hr>
<h3>Modelo de datos:</h3>
</hr>
<ul>
   <li>
      <p><b>Usuarios</b></p>
      <img src="./screensLaComanda/firebase/usuarios.png" style="width:50%"/>
   </li>
   <li>
      <p><b>Mesas</b></p>
      <img src="./screensLaComanda/firebase/mesas.png" style="width:50%"/>
   </li>
   <li>
      <p><b>Menus</b></p>
      <img src="./screensLaComanda/firebase/menus.png" style="width:50%"/>
   </li>
   <li>
      <p><b>Pedidos</b></p>
      <img src="./screensLaComanda/firebase/pedidos.png" style="width:50%"/>
   </li>
   <li>
      <p><b>Encuestas</b></p>
      <img src="./screensLaComanda/firebase/encuestas.png" style="width:50%"/>
   </li>
</ul>
</hr>

<h3>Registro de tareas:</h3>
</hr>
<h4>Sprint 1: 17-10 / 24-10</h4>
<p>Registro, Login con perfiles y pantallas</p>
<img src="./screensLaComanda/login.png" style="width:70%"/>
</br>
<img src="./screensLaComanda/registro.png" style="width:70%"/>
</br>
</hr>

<h4>Sprint 2: 24-10 / 31-10</h4>
<p>Configuración de Servicios</p>
<ul>
   <li>Auth</li>
   <li>Firebase</li>
   <li>Parsers</li>
   <li>SnackBar</li>
   <li>Spinner</li>
</ul>
</hr>

<h4>Sprint 3: 31-10 / 7-11</h4>
<p>Layout</p>
<p>Guards</p>
<p>Toolbar</p>
</br>
</hr>

<h4>Sprint 4: 7-11 / 14-11</h4>
<p>Home</p>
<img src="./screensLaComanda/home.png" style="width:70%"/>
</br>
<p>Sidenav</p>
<img src="./screensLaComanda/sidenav.png" style="width:70%"/>
</br>
</hr>

<h4>Sprint 5: 14-11 / 21-11</h4>
<p>Home (cliente)</p>
<img src="./screensLaComanda/home-cliente.png" style="width:70%"/>
</br>
<p>Alta pedido (cliente)</p>
<img src="./screensLaComanda/alta-pedido.png" style="width:70%"/>
</br>
<p>Lista de espera (mozo)</p>
<img src="./screensLaComanda/lista-espera.png" style="width:70%"/>
</br>
<p>Lista de pedidos (mozo)</p>
<img src="./screensLaComanda/lista-pedidos.png" style="width:70%"/>
</br>
</hr>

<h4>Sprint 6: 21-11 / 28-11</h4>
<p>Lista pedidos barra</p>
<img src="./screensLaComanda/lista-pedidos-barra.png" style="width:70%"/>
</br>
<p>Lista pedidos cocina</p>
<img src="./screensLaComanda/lista-pedidos-cocina.png" style="width:70%"/>
</br>
<p>Encuesta</p>
<img src="./screensLaComanda/encuesta.png" style="width:70%"/>
</br>
</hr>


