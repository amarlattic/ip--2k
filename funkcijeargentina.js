var igraci = [];

function validacijaImePrezime(imePrezime) {
	var regexp = /^[a-zA-Z\s]+$/;
	if(imePrezime.match(regexp)) {
		preuzmi("imeProvjera").innerHTML = "";
		return true;
	}
	else {
		preuzmi("imeProvjera").innerHTML = "Niste pravilno unijeli ime i prezime!";
		return false;
	}
}

function validacijaBrojaDresa(dres, pozicija) {
	var regexp = /^[0-9]+$/;
	if(dres.match(regexp)) {
		dres = parseInt(dres);
		for(i = 0; i<igraci.length; i++) {
			if(igraci[i].pozicija == pozicija&& igraci[i].dres == dres) {
				preuzmi("dresProvjera").innerHTML = "Niste pravilno unijeli broj dresa!";
				return false;
			}
		}
		preuzmi("dresProvjera").innerHTML = "";
		return true;
	}
	else {
		preuzmi("dresProvjera").innerHTML = "Niste pravilno unijeli broj dresa!";
		return false;
	}
}

function validacijaPozicije(pozicija) {
	if(pozicija == "napad" || pozicija == "vezni" || pozicija == "odbrana" || pozicija == "golman") {
		preuzmi("pozicijaProvjera").innerHTML = "";
		return true;
	}
	else {
		preuzmi("pozicijaProvjera").innerHTML = "Niste izabrali poziciju!";
		return false;
	}
}

function preuzmi(id) {
	if(document.getElementById(id))
		return document.getElementById(id);
	else {
		//alert("Nepravilan ID objekta");
		return false;
	}
}

function prikaziSakrij(id, stanje)  {
	var obj = document.getElementById(id);
	if(id == "dodaj") {
		obj.style.visibility = stanje;
		document.getElementById("pregledaj").style.visibility = "hidden";
	}
	else {
		obj.style.visibility = stanje;
		document.getElementById("dodaj").style.visibility = "hidden";
	}
}

function dodajIgraca() {
	var ime = preuzmi("ime").value;
	var dres = preuzmi("dres").value;
	var reprezentacija = preuzmi("reprezentacija").value;
	var pozicija = preuzmi("pozicija").value;
	
	var v1 = validacijaImePrezime(ime);
	var v2 = validacijaBrojaDresa(dres, pozicija);
	var v3 = validacijaPozicije(pozicija);
	
	if(v1 && v2 && v3) {
		var igrac = {ime: ime, dres: dres, pozicija: pozicija, reprezentacija: reprezentacija, status: "nema"};
		igraci.push(igrac);
		kreirajTabelu("tabela");
	alert("Unos izvršen");
	}
}

function dodijeliKarton(id) {
    var obj = preuzmi(id).value;
    var zuti = preuzmi("status1");
    var crveni = preuzmi("status2");
    var status;
    if (zuti.checked) {
        status = "žuti";
    }
    if (crveni.checked) {
        status = "crveni";
    }

    for (i = 0; i < igraci.length; i++) {
        if ((i + 1) == obj) {
            igraci[i].status = status;
        }
    }
    kreirajTabelu("tabela");

    if (obj == "") {
        alert('Unesite ID igrača kojem želite dodijeliti karton!');
    }
}



function ukoniIzTabele(id) {
	var obj = preuzmi(id).value;
	
	for(i = 0; i<igraci.length; i++) {
		if((i+1) == obj) {
			igraci.splice(i, 1); //splice uklanja elemente
		}
	}
	if (obj == "") {
        alert('Unesite ID igraca kojeg zelite obrisati iz tabele!');
                }
	kreirajTabelu("tabela");
}

function kreirajTabelu(divId) {
    var obj = preuzmi(divId);
    var tabela = '<table border="1"><tr bgcolor="lightgray"><td align="center"><b>ID</b></td><td align="center"><b>IME I PREZIME</b></td><td align="center"><b>BROJ DRESA</b></td><td align="center"><b>REPREZENTACIJA</b></td><td align="center"><b>POZICIJA</b></td></tr>';
    for (i = 0; i < igraci.length; i++) {
        if (igraci[i].status == "crveni") {
            tabela += '<tr style="background: red;"><td align="center"><b>' + (i + 1) + '</b></td><td align="center"><b>' + igraci[i].ime + '</b></td><td align="center"><b>' + igraci[i].dres + '</b></td><td align="center"><b>' + igraci[i].reprezentacija + '</b></td><td align="center"><b>' + igraci[i].pozicija + '</b></td></tr>';
        } else if (igraci[i].status == "žuti") {
            tabela += '<tr style="background: yellow;"><td align="center"><b>' + (i + 1) + '</b></td><td align="center"><b>' + igraci[i].ime + '</b></td><td align="center"><b>' + igraci[i].dres + '</b></td><td align="center"><b>' + igraci[i].reprezentacija + '</b></td><td align="center"><b>' + igraci[i].pozicija + '</b></td></tr>';
        } else {
            tabela += '<tr"><td align="center"><b>' + (i + 1) + '</b></td><td align="center"><b>' + igraci[i].ime + '</b></td><td align="center"><b>' + igraci[i].dres + '</b></td><td align="center"><b>' + igraci[i].reprezentacija + '</b></td><td align="center"><b>' + igraci[i].pozicija + '</b></td></tr>';
        }
    }
    tabela += '</table>';
    obj.innerHTML = tabela;
}
