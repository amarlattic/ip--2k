var bihIgraci = [];
var estonijaIgraci = [];

function preuzmi(id){
	if(document.getElementById(id)){
		return document.getElementById(id);
	}
	else{
		alert("Nepravilan ID");
		return false;
	}
}

function validacija_forme(){
    var imeprezime = preuzmi("ime").value;
    var broj = preuzmi("broj").value;
    var tim = preuzmi("tim").value;

    var prva = validacija_ime_prezime(imeprezime);
    var druga = false;
    if(tim == "bos"){
        druga = validacija_broja_dresa(broj, bihIgraci);
    }
    if(tim == "esto"){
        druga = validacija_broja_dresa(broj, estonijaIgraci);
    }

    if(prva && druga){
        return true;
    }
    else{
        return false;
    }
}

function validacija_ime_prezime(tekst){
    if(tekst.length > 0){
        preuzmi("imeProvjera").innerHTML = "";
        return true;
    }
    else{
        preuzmi("imeProvjera").innerHTML = "Unesite ime i prezime";
        return false;
    }
}

function validacija_broja_dresa(broj, nizIgraca){
    if(broj === "") {
        preuzmi("brojProvjera").innerHTML = "Unesite broj dresa";
        return false;
    }

    if(broj < 10 || broj > 99) {
        preuzmi("brojProvjera").innerHTML = "Broj mora biti dvocifren";
        return false;
    }
    
    if(isNaN(broj)) {
        preuzmi("brojProvjera").innerHTML = "Morate unijeti broj";
        return false;
    }

    for(i = 0; i < nizIgraca.length; i++) {
        if(broj == nizIgraca[i].broj) {
            preuzmi("brojProvjera").innerHTML = "Postoji igrač sa istim brojem";
            return false;
        }
    }

    preuzmi("brojProvjera").innerHTML = "";
    return true;
}

function prikaziNizIgraca(nizIgraca, elem, naslov) {
    var objekat = preuzmi(elem);

    var tabela = '<h3 align="center">' + naslov + '</h3>';
    tabela += '<table border="1" align="center" style="width: 90%;"><tr style="background: #DDDDDD;"><td align="center"><b>R. Br.</b></td><td align="center"><b>Ime i prezime</b></td><td align="center"><b>Broj dresa</b></td></tr>';
    for (var i = 0; i < nizIgraca.length; i++) {
        tabela += '<tr><td align="center">' + (i + 1) + '</td><td align="center">' + nizIgraca[i].ime + '</td><td align="center">' + nizIgraca[i].broj + '</td></tr>';
    }
    tabela += '</table>';
    objekat.innerHTML = tabela;
}

function noviUnos() {
    var imeprezime = preuzmi("ime").value;
    var broj = preuzmi("broj").value;
    var tim = preuzmi("tim").value;

    if (validacija_forme()) {
        var igrac = { ime: imeprezime, broj: broj };
        if (tim === "bos") {
            bihIgraci.push(igrac);
        }
        if (tim === "esto") {
            estonijaIgraci.push(igrac);
        }
    }

    prikaziNizIgraca(bihIgraci, "bosanski", "IGRAČI: Bosna i Hercegovina");
    prikaziNizIgraca(estonijaIgraci, "estonski", "IGRAČI: Estonija");
}


function ponistiUnos(){
	var ime = preuzmi("ime").value;
	var broj = preuzmi("broj").value;
	var tim = preuzmi("tim").value;
	
	if(ime.length==0){
		var objekat = preuzmi("bosanski");
		objekat.innerHTML="";
		var objekat2 = preuzmi("estonski");
		objekat2.innerHTML="";
	}
	else{
		preuzmi("ime").value="";
		preuzmi("broj").value = "";
		preuzmi("tim").value = "bos";
	}
}