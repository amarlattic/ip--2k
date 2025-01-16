var studenti = [];

function validacijaImePrezime(imePrezime) {
	var regexp=/^[a-zA-Z\s]+$/;
	if(imePrezime.match(regexp)) {
		preuzmi("imeProvjera").innerHTML = "";
		return true;
	}
	else {
		preuzmi("imeProvjera").innerHTML = "Niste pravilno unijeli ime i prezime!";
		return false;
	}
}

function validacijaBrojajmbg(jmbg, fakultet) {
	var regexp=/^[0-9]+$/;
	if(jmbg.match(regexp)) {
		jmbg = parseInt(jmbg);
		for(i=0; i<studenti.length; i++) {
			if(studenti[i].fakultet == fakultet && studenti[i].jmbg == jmbg) {
				preuzmi("jmbgProvjera").innerHTML = "Niste pravilno unijeli broj JMBG!";
				return false;
			}
		}
	    preuzmi("jmbgProvjera").innerHTML = "";
	    return true;
	}
	else {
		preuzmi("jmbgProvjera").innerHTML = "Niste pravilno unijeli broj JMBG!";
		return false;
	}
}

function validacijaSpolaStudenta(spol) {
	if(spol == "M" || spol =="Z") {
		preuzmi("spolProvjera").innerHTML = "";
		return true;
	}
	else {
		preuzmi("spolProvjera").innerHTML = "Niste izabrali spol!";
		return false;
	}
}

function preuzmi(id) {
	if(document.getElementById(id))
		return document.getElementById(id);
	else {
		alert('Nepravilan ID objekta');
		return false;
	}
}

function prikaziSakrij(id, stanje) {
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

function dodajStudenta() {
	var ime = preuzmi("ime").value;
	var jmbg = preuzmi("jmbg").value;
	var spol = preuzmi("spol").value;
	var fakultet = preuzmi("fakultet").value;
	
	var v1 = validacijaImePrezime(ime);
	var v2 = validacijaBrojajmbg(jmbg, fakultet);
	var v3 = validacijaSpolaStudenta(spol);
	
	if(v1 && v2 && v3) {
		var student = {ime: ime, jmbg: jmbg, fakultet: fakultet, spol: spol, status: "nema"};
		studenti.push(student);
		kreirajTabelu("tabela");
		alert("Unos izvršen");
	}
}

function dodijeliStatus(id) {
	var obj = preuzmi(id).value;
	var zeleni = preuzmi("status1");
	var crveni = preuzmi("status2");
	var status;
	if(zeleni.checked) {
		status = "zeleni";
	}
	if(crveni.checked) {
	    status = "crveni";
	}
	
	for(i=0; i<studenti.length; i++) {
		if((i+1) == obj) {
			studenti[i].status = status;
		}
	}
	kreirajTabelu("tabela");
	
	if(obj == "") {
		alert('Unesite ID studenta kojem zelite dodijeliti status!');
	}
}

function ukloniIzTabele(id) {
	var obj = preuzmi(id).value;
	
	for(i=0; i<studenti.length; i++) {
		if((i+1) == obj) {
			studenti.splice(i, 1); //splice uklanja elemente
		}
	}
	if(obj == "") {
		alert('Unesite ID studenta kojeg zelite obrisati iz tabele!');
	}
	kreirajTabelu("tabela");
}

function kreirajTabelu(divId) {
	var obj = preuzmi(divId);
	var tabela = '<table border="1"><tr bgcolor="lightgray"><td align="center"><b>ID</b></td><td align="center"><b>IME I PREZIME</b></td><td align="center"><b>JMBG</b></td><td align="center"><b>SPOL</b></td><td align="center"><b>FAKULTET</b></td></tr>';
	
	for(i=0; i<studenti.length; i++) {
		if(studenti[i].status == "crveni") {
			tabela += '<tr style="background: red;"><td align="center"><b>' + (i+1) + 
			'</b></td><td align="center"><b>' + studenti[i].ime + 
			'</b></td><td align="center"><b>' + studenti[i].jmbg + 
			'</b></td><td align="center"><b>' + studenti[i].spol +
			'</b></td><td align="center"><b>' + studenti[i].fakultet + 
			'</b></td></tr>';
		}
		else if(studenti[i].status == "zeleni") {
			tabela += '<tr style="background: green;"><td align="center"><b>' + (i+1) + 
			'</b></td><td align="center"><b>' + studenti[i].ime + 
			'</b></td><td align="center"><b>' + studenti[i].jmbg + 
			'</b></td><td align="center"><b>' + studenti[i].spol +
			'</b></td><td align="center"><b>' + studenti[i].fakultet + 
			'</b></td></tr>';
		}
		else {
			tabela += '<tr><td align="center"><b>' + (i+1) + 
			'</b></td><td align="center"><b>' + studenti[i].ime + 
			'</b></td><td align="center"><b>' + studenti[i].jmbg + 
			'</b></td><td align="center"><b>' + studenti[i].spol +
			'</b></td><td align="center"><b>' + studenti[i].fakultet + 
			'</b></td></tr>';
		}
	}
	tabela+= '</table>';
	obj.innerHTML = tabela;
}