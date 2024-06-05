function iniciarApp() {
  const contenedorResultado = document.querySelector("#contenedor-vehiculos");
  const selectVehiculo = document.querySelector("#tipo");
  const favoritosDiv = document.querySelector(".favoritos");
  let autoMarca;

  verificaciones();

  if (selectVehiculo) {
    selectVehiculo.addEventListener("change", seleccionarTipo);
  }
  if (favoritosDiv) {
    getFavoritos();
  }

  function getFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) ?? [];
    if (favoritos.length) {
      imprimirAutosFavoritos(favoritos);
      return;
    }
    const noFavoritos = document.createElement("h3");
    noFavoritos.classList.add("text-center", "text-white", "text-2xl");
    noFavoritos.textContent = "No hay favoritos aun";
    favoritosDiv.appendChild(noFavoritos);
  }

  function imprimirAutosFavoritos(autos) {
    limpiarHTML(contenedorResultado);
    const resultado = document.createElement("div");
    resultado.id = "vehiculos";
    resultado.classList.add(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-4",
      "gap-5",
      "mt-5"
    );
    contenedorResultado.appendChild(resultado);
    autos.forEach((auto) => {
      console.log(auto);
      const {
        id,
        modelo,
        img,
        price,
        marca,
        puertas,
        motor,
        year,
        transmicion,
        AirBag,
        HP_Potencia,
        descripcion,
      } = auto;

      const divAuto = document.createElement("div");
      divAuto.classList.add(
        "bg-gray-700",
        "rounded-lg",
        "p-2",
        "max-w-sm",
        "flex",
        "flex-col",
        "justify-between",
        "gap-2"
      );

      //Imagen auto
      imgAuto = document.createElement("img");
      imgAuto.src = img;
      imgAuto.alt = `Imagen de un auto de la marca ${modelo}`;
      imgAuto.classList.add(
        "rounded-lg",
        "h-[250px]",
        "object-cover",
        "w-full"
      );

      //Info auto
      const infoAuto = document.createElement("div");
      infoAuto.classList.add("p-2");
      const modeloAuto = document.createElement("p");
      modeloAuto.classList.add("font-normal", "text-3xl", "text-white");
      modeloAuto.textContent = modelo;
      const marcaAuto = document.createElement("p");
      marcaAuto.classList.add(
        "mb-1",
        "font-normal",
        "text-xl",
        "text-gray-300"
      );
      marcaAuto.textContent = marca;
      const precioAuto = document.createElement("p");
      precioAuto.classList.add(
        "mb-3",
        "font-normal",
        "text-xl",
        "text-gray-400"
      );
      precioAuto.textContent = `$${price}`;

      const divDetalles = document.createElement("div");

      //Puertas
      const puertasAuto = document.createElement("p");
      puertasAuto.classList.add("text-sm", "font-semibold", "text-white");
      puertasAuto.textContent = "Puertas: ";
      const puertasAutoSpan = document.createElement("span");
      puertasAutoSpan.classList.add("text-gray-300", "font-normal");
      puertasAutoSpan.textContent = puertas;
      puertasAuto.appendChild(puertasAutoSpan);

      //YearModelo
      const yearAuto = document.createElement("p");
      yearAuto.classList.add("text-sm", "text-white", "font-semibold");
      yearAuto.textContent = "Year Modelo: ";
      const yearAutoSpan = document.createElement("span");
      yearAutoSpan.classList.add("text-gray-300", "font-normal");
      yearAutoSpan.textContent = year;
      yearAuto.appendChild(yearAutoSpan);

      //transmicion
      const transmicionAuto = document.createElement("p");
      transmicionAuto.classList.add("text-sm", "font-semibold", "text-white");
      transmicionAuto.textContent = "Transmicion: ";
      const transmicionAutoSpan = document.createElement("span");
      transmicionAutoSpan.classList.add("text-gray-300", "font-normal");
      transmicionAutoSpan.textContent = transmicion;
      transmicionAuto.appendChild(transmicionAutoSpan);

      //transmicion
      const AirBagAuto = document.createElement("p");
      AirBagAuto.classList.add("text-sm", "font-semibold", "text-white");
      AirBagAuto.textContent = "Bolsas de Aire: ";
      const AirBagAutoSpan = document.createElement("span");
      AirBagAutoSpan.classList.add("text-gray-300", "font-normal");
      AirBagAutoSpan.textContent = AirBag;
      AirBagAuto.appendChild(AirBagAutoSpan);

      //FH
      const FHAuto = document.createElement("p");
      FHAuto.classList.add("text-sm", "font-semibold", "text-white");
      FHAuto.textContent = "Caballos de Fuerza: ";
      const FHAutoSpan = document.createElement("span");
      FHAutoSpan.classList.add("text-gray-300", "font-normal");
      FHAutoSpan.textContent = HP_Potencia;
      FHAuto.appendChild(FHAutoSpan);

      //Motor
      const MotorAuto = document.createElement("p");
      MotorAuto.classList.add("text-sm", "font-semibold", "text-white");
      MotorAuto.textContent = "Motor: ";
      const MotorAutoSpan = document.createElement("span");
      MotorAutoSpan.classList.add("text-gray-300", "font-normal");
      MotorAutoSpan.textContent = motor;
      MotorAuto.appendChild(MotorAutoSpan);

      //Motor
      const descripcionAutoSpan = document.createElement("p");
      descripcionAutoSpan.classList.add(
        "text-gray-300",
        "text-sm",
        "my-2",
        "text-justify"
      );
      descripcionAutoSpan.textContent = descripcion;
      

      divDetalles.appendChild(puertasAuto);
      divDetalles.appendChild(MotorAuto);
      divDetalles.appendChild(yearAuto);
      divDetalles.appendChild(transmicionAuto);
      divDetalles.appendChild(AirBagAuto);
      divDetalles.appendChild(FHAuto);
      divDetalles.appendChild(descripcionAutoSpan);

      infoAuto.appendChild(modeloAuto);
      infoAuto.appendChild(marcaAuto);
      infoAuto.appendChild(precioAuto);
      infoAuto.appendChild(divDetalles);

      //Botones
      const divBotones = document.createElement("div");
      divBotones.classList.add("flex", "gap-5");
      const botonFavorito = document.createElement("button");
      botonFavorito.id = `agregar-${id}`;
      existeStorage(id)
        ? botonFavorito.classList.add("bg-orange-600", "hover:bg-orange-700")
        : botonFavorito.classList.add("bg-blue-600", "hover:bg-blue-700");

      botonFavorito.classList.add(
        "rounded",
        "text-white",
        "text-center",
        "p-2",
        "block",
        "w-full",
        "hover:cursor-pointer",
        "w-1/2"
      );
      existeStorage(id)
        ? (botonFavorito.textContent = "Eliminar de Favoritos")
        : (botonFavorito.textContent = "Marcar como Favorito");

      botonFavorito.onclick = () => {
        if (!existeStorage(id)) {
          agregarFavoritos({
            id: id,
            modelo: modelo,
            img: imagen,
            price: price,
            marca: window.localStorage.getItem("marcaAuto"),
          });
          botonFavorito.textContent = "Eliminar de Favoritos";
          botonFavorito.classList.remove("bg-blue-600", "hover:bg-blue-700");
          botonFavorito.classList.add("bg-orange-600", "hover:bg-orange-700");
          mostrarAlerta("Se agrego a Tus Favoritos", "success");
          return;
        }
        eliminarFavoritos(id);
        botonFavorito.textContent = "Marcar como Favorito";
        botonFavorito.classList.remove("bg-orange-600", "hover:bg-orange-700");
        botonFavorito.classList.add("bg-blue-600", "hover:bg-blue-700");
        mostrarAlerta("Se Elimino de Tus Favoritos", "success");
        getFavoritos();
      };

      divBotones.appendChild(botonFavorito);

      divAuto.appendChild(imgAuto);
      divAuto.appendChild(infoAuto);
      divAuto.appendChild(divBotones);
      resultado.appendChild(divAuto);
    });
  }

  function imprimirAutosMarca(autos, limite) {
    limpiarHTML(contenedorResultado);

    const resultado = document.createElement("div");
    resultado.id = "vehiculos";
    resultado.classList.add(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-4",
      "gap-5",
      "mt-5"
    );
    contenedorResultado.appendChild(resultado);

    autos.Results.forEach((auto, index) => {
      if (index < limite) {
        let { Make_Name, Model_Name, Model_ID } = auto;
        const informacionAuto = informacionModelos.find(
          (modelo) =>
            modelo.modelo.toLocaleLowerCase() === Model_Name.toLocaleLowerCase()
        );
        const {
          imagen,
          precio,
          caracteristicas: {
            puertas,
            AirBag,
            year,
            motor,
            transmicion,
            descripcion,
            HP_Potencia
          },
        } = informacionAuto;

        const divAuto = document.createElement("div");
        divAuto.classList.add(
          "bg-gray-700",
          "rounded-lg",
          "p-2",
          "max-w-sm",
          "flex",
          "flex-col",
          "justify-between",
          "gap-2"
        );

        //Imagen auto
        imgAuto = document.createElement("img");
        imgAuto.src = imagen;
        imgAuto.alt = `Imagen de un auto de la marca ${Model_Name}`;
        imgAuto.classList.add(
          "rounded-lg",
          "h-[250px]",
          "object-cover",
          "w-full"
        );

        //Info auto
        const infoAuto = document.createElement("div");
        infoAuto.classList.add("p-2");
        const marcaAuto = document.createElement("p");
        marcaAuto.classList.add("font-normal", "text-3xl", "text-white");
        marcaAuto.textContent = Make_Name;
        const modeloAuto = document.createElement("p");
        modeloAuto.classList.add(
          "mb-1",
          "font-normal",
          "text-xl",
          "text-gray-300"
        );
        modeloAuto.textContent = Model_Name;
        const precioAuto = document.createElement("p");
        precioAuto.classList.add(
          "mb-3",
          "font-normal",
          "text-xl",
          "text-gray-400"
        );
        precioAuto.textContent = `$${precio}`;

        const divDetalles = document.createElement("div");

        //YearModelo
        const yearAuto = document.createElement("p");
        yearAuto.classList.add("text-md", "text-white", "font-semibold");
        yearAuto.textContent = "Year Modelo: ";
        const yearAutoSpan = document.createElement("span");
        yearAutoSpan.classList.add("text-gray-300", "font-normal");
        yearAutoSpan.textContent = year;
        yearAuto.appendChild(yearAutoSpan);

        //transmicion
        const transmicionAuto = document.createElement("p");
        transmicionAuto.classList.add("text-md", "font-semibold", "text-white");
        transmicionAuto.textContent = "Transmicion: ";
        const transmicionAutoSpan = document.createElement("span");
        transmicionAutoSpan.classList.add("text-gray-300", "font-normal");
        transmicionAutoSpan.textContent = transmicion;
        transmicionAuto.appendChild(transmicionAutoSpan);

        

     

        
        divDetalles.appendChild(yearAuto);
        divDetalles.appendChild(transmicionAuto);
       
       

        infoAuto.appendChild(marcaAuto);
        infoAuto.appendChild(modeloAuto);
        infoAuto.appendChild(precioAuto);
        infoAuto.appendChild(divDetalles);

        //Botones
        const divBotones = document.createElement("div");
        divBotones.classList.add("flex", "gap-5");
        const botonFavorito = document.createElement("button");
        botonFavorito.id = `agregar-${Model_ID}`;
        existeStorage(Model_ID)
          ? botonFavorito.classList.add("bg-orange-600", "hover:bg-orange-700")
          : botonFavorito.classList.add("bg-blue-600", "hover:bg-blue-700");

        botonFavorito.classList.add(
          "rounded",
          "text-white",
          "text-center",
          "p-2",
          "block",
          "w-full",
          "hover:cursor-pointer",
          "w-1/2"
        );
        existeStorage(Model_ID)
          ? (botonFavorito.textContent = "Eliminar de Favoritos")
          : (botonFavorito.textContent = "Marcar como Favorito");

        botonFavorito.onclick = () => {
          if (!existeStorage(Model_ID)) {
            agregarFavoritos({
              id: Model_ID,
              modelo: Model_Name,
              img: imagen,
              price: precio,
              marca: window.localStorage.getItem("marcaAuto"),
              puertas,
              AirBag,
              year,
              motor,
              transmicion,
              HP_Potencia,
              descripcion,
            });
            botonFavorito.textContent = "Eliminar de Favoritos";
            botonFavorito.classList.remove("bg-blue-600", "hover:bg-blue-700");
            botonFavorito.classList.add("bg-orange-600", "hover:bg-orange-700");
            mostrarAlerta("Se agrego a Tus Favoritos", "success");
            return;
          }
          eliminarFavoritos(Model_ID);
          botonFavorito.textContent = "Marcar como Favorito";
          botonFavorito.classList.remove(
            "bg-orange-600",
            "hover:bg-orange-700"
          );
          botonFavorito.classList.add("bg-blue-600", "hover:bg-blue-700");
          mostrarAlerta("Se Elimino de Tus Favoritos", "success");
        };

        divBotones.appendChild(botonFavorito);

        divAuto.appendChild(imgAuto);
        divAuto.appendChild(infoAuto);
        divAuto.appendChild(divBotones);
        resultado.appendChild(divAuto);
      }
    });
  }

  function seleccionarTipo(e) {
    const tipo = e.target.value;
    getAutos(tipo);
  }
  function verificaciones() {
    
    if (window.location.pathname === "/autos.html") {
      autoMarca = window.localStorage.getItem("marcaAuto");
      const heading = document.querySelector("#marca");
      heading.textContent = autoMarca;
      getAutosMarca(autoMarca);
      document.title = `CarShop - ${autoMarca}`;
    }
    if (window.location.pathname !== "/autos.html") {
      window.localStorage.removeItem("marcaAuto");
    }
  }
  function getAutos(tipo = "car") {
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/${tipo}?format=json`;

    spinner();
    fetch(url)
      .then((response) => response.json())
      .then((result) => imprimirAutos(result.Results, 10));
  }

  function getAutosMarca(marca) {
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${marca}?format=json`;
    spinner();
    fetch(url)
      .then((response) => response.json())
      .then((result) => imprimirAutosMarca(result, 8));
  }

  function mostrarAlerta(msj, tipo) {
    Swal.fire({
      text: msj,
      icon: tipo,
      timer: 3000,
      showConfirmButton: false,
    });
  }

  function agregarFavoritos(auto) {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) ?? [];
    localStorage.setItem("favoritos", JSON.stringify([...favoritos, auto]));
  }

  function eliminarFavoritos(id) {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) ?? [];
    const newfavoritos = favoritos.filter((favorito) => favorito.id !== id);
    localStorage.setItem("favoritos", JSON.stringify(newfavoritos));
  }

  function existeStorage(id) {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) ?? [];
    return favoritos.some((favorito) => favorito.id === id);
  }

  function imprimirAutos(autos, limite) {
    limpiarHTML(contenedorResultado);

    const resultado = document.createElement("div");
    resultado.id = "vehiculos";
    resultado.classList.add(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-4",
      "gap-5",
      "mt-5"
    );
    contenedorResultado.appendChild(resultado);
    autos.forEach((auto, index) => {
      let imagen;
      if (index < limite) {
        const { MakeName } = auto;

        imagen = imagenMarca.find(
          (imagen) => imagen.marca.toLowerCase() === MakeName.toLowerCase()
        ).img;

        const divAuto = document.createElement("div");
        divAuto.classList.add(
          "bg-gray-700",
          "rounded-lg",
          "p-2",
          "max-w-sm",
          "flex",
          "flex-col",
          "justify-between",
          "gap-5"
        );

        const divImgMarca = document.createElement("div");
        //Imagen auto
        imgAuto = document.createElement("img");
        imgAuto.src = imagen;
        imgAuto.alt = `Imagen de un auto de la marca ${MakeName}`;
        imgAuto.classList.add(
          "rounded-lg",
          "h-[250px]",
          "object-cover",
          "w-full"
        );

        //Info auto
        const marcaAuto = document.createElement("p");
        marcaAuto.classList.add("font-normal", "text-xl", "text-white", "mt-2");
        marcaAuto.textContent = MakeName;
        divImgMarca.appendChild(imgAuto);
        divImgMarca.appendChild(marcaAuto);

        //Botones
        const divBotones = document.createElement("div");
        const botonAuto = document.createElement("a");
        botonAuto.classList.add(
          "rounded",
          "text-white",
          "bg-blue-600",
          "hover:bg-blue-700",
          "text-center",
          "p-2",
          "block",
          "w-full",
          "hover:cursor-pointer"
        );
        botonAuto.onclick = () => {
          window.localStorage.setItem("marcaAuto", MakeName);
          window.location.href = "autos.html";
        };

        botonAuto.textContent = "Ver Autos";

        divBotones.appendChild(botonAuto);

        divAuto.appendChild(divImgMarca);
        divAuto.appendChild(divBotones);
        resultado.appendChild(divAuto);
      }
    });
  }

  function limpiarHTML(elemento) {
    while (elemento.firstChild) {
      elemento.removeChild(elemento.firstChild);
    }
  }

  function spinner() {
    limpiarHTML(contenedorResultado);
    const spinner = document.createElement("div");
    spinner.classList.add("sk-chase");
    spinner.innerHTML = `
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    `;

    contenedorResultado.appendChild(spinner);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();
});
