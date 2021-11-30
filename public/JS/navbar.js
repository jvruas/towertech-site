/* Menu do site */
var fechado_site = true;

function abrirMenu(){
    if (fechado_site == true) {
        iconMenu.src = "../imagens/icone_menu_fechado.png";
        document.querySelector('.menu_aberto').style.display = "block";
        fechado_site = false;
    } else {
        iconMenu.src = "../imagens/icone_menu.png"; 
        document.querySelector('.menu_aberto').style.display = "none";
        fechado_site = true;
    }
}

// Menu do sistema 
var fechado_sistema = true;

function abrirMenuSistema(){
    if (fechado_sistema == true) {  
        menu.src = "../imagens/icone_menu_fechado.png";        
        document.querySelector('.header_desktop').style.display = "flex";
        document.querySelector('.header_desktop').style.position = "absolute";
        document.querySelector('section').style.display = "none";
        fechado_sistema = false;
    } else {
        menu.src = "../imagens/icone_menu.png"; 
        document.querySelector('.header_desktop').style.display = "none";
        document.querySelector('section').style.display = "flex";
        fechado_sistema = true;
    }
}