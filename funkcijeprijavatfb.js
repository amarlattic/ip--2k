// preuzmi - ako je isto, vrati to

function preuzmi(id) {
	if(document.getElementById(id)){
		return document.getElementById(id);
	}
	else {
		alert("Nepravilan ID");
		return false;
	}
}

function validacijaIme(ime) {
    var regexp = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/; // Dozvoljava jedno ili više riječi odvojene razmakom
    if (ime.match(regexp) && ime.length < 50) { // Povećano ograničenje na 50 znakova za ime i prezime
        preuzmi("imeProvjera").innerHTML = "";
        return true;
    } else {
        preuzmi("imeProvjera").innerHTML = "Unesite ispravno ime i prezime!";
        return false;
    }
}


function validacijaEmail(email){
	if (email.indexOf("@") !== -1){
		preuzmi("emailProvjera").innerHTML="";
		return true;
	}
	else{
		preuzmi("emailProvjera").innerHTML = "Unesite ispravno email korisnika!";
		return false;
	}
}

function validacijaLozinka(lozinka, potvrda){
	if (lozinka===potvrda){
		preuzmi("lozinkaProvjera").innerHTML="";
		return true;
	}
	else{
		preuzmi("lozinkaProvjera").innerHTML="Potvrdite prethodno unesenu lozinku!";
		return false;
	}
	
}

function validacijaKorisnicko(email){
	var podstring = email.substring(0, email.indexOf("@"));
	preuzmi("korisnicko").value = podstring;
	return true;
}

function ispisi(){
	var ime = preuzmi("imeprezime").value;
	var email = preuzmi("email").value;
	var lozinka = preuzmi("lozinka").value;
	var provjera = preuzmi("potvrda").value;
	
	
	var prva = validacijaIme(ime);
	var druga = validacijaEmail(email);
	var treca = validacijaKorisnicko(email);
	var korisnicko = preuzmi("korisnicko").value;
	var cetvrta = validacijaLozinka(lozinka, provjera);
	
	if (prva && druga && treca && cetvrta){
		preuzmi("ime2").innerHTML = ime;
		preuzmi("email2").innerHTML = email;
		preuzmi("password2").innerHTML = lozinka;
		preuzmi("potvrda2").innerHTML = provjera;
		preuzmi("korisnicko2").innerHTML = korisnicko;
		if(preuzmi("uslovi").checked == true){
			preuzmi("uslovi2").innerHTML = "Prihvaćeni";
		}
	else{
		preuzmi("uslovi2").innerHTML = "Nisu prihvaćeni";
	}
	}
	
	// ponistavanje greski
	if (!prva){
		preuzmi("imeprezime").value = "Unesite ime i prezime";
	}
	if (!druga){
		preuzmi("email").value = "Unesite email";
	}
	if (!treca){
		preuzmi("korisnicko").value = "";
	}
	if (!cetvrta){
		preuzmi("lozinka").value = "";
		preuzmi("potvrda").value = "";
	}
}

function brisi(){
		preuzmi("imeprezime").value = "Unesite ime i prezime";
		preuzmi("email").value = "Unesite email";
		preuzmi("korisnicko").value = "";
		preuzmi("lozinka").value = "";
		preuzmi("potvrda").value = "";
		preuzmi("uslovi").checked = true;
}

function brisisve(){
		preuzmi("ime2").innerHTML = "";
		preuzmi("email2").innerHTML = "";
		preuzmi("korisnicko2").innerHTML = "";
		preuzmi("password2").innerHTML = "";
		preuzmi("potvrda2").innerHTML = "";
		preuzmi("uslovi2").innerHTML = "";
}
