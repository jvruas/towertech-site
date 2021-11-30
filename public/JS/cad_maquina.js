let midia_atual = window.matchMedia("(min-width: 769px)");

    function abrir_grid_mobile(midia_atual) {
        console.log("ola");
        if (midia_atual.matches) {
            document.querySelector(".header_desktop").style.display = "flex";
        } else {
            document.getElementById("menu").classList.value = "fas fa-times";
            document.querySelector(".corpo_principal_maquina").style.display = "none";
        }
    }

    function mudar_icone() {
        const navbar = document.getElementById("menu");
        if (navbar.classList.value === "fas fa-bars") {
            navbar.classList.value = "fas fa-times";
            document.querySelector(".header_desktop").style.display = "flex";
            
        } else {
            navbar.classList.value = "fas fa-bars";
            document.querySelector(".corpo_principal_maquina").style.display = "flex";
            document.querySelector(".header_desktop").style.display = "none";
        }
    }

    midia_atual.addListener(abrir_grid_mobile);
    abrir_grid_mobile(midia_atual);