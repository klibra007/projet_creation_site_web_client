//Déclaration de variables 
var listeProduits;
var panier = [];
var listesNouveauxInscrits = [];
var listeClients = [];
var dernierConnecte = "";
const TAUX_TPS = 0.05;
const TAUX_TVQ = 0.09975; 
var compteur;

/* Appel AJAX et recuperation JSON*/ 
function chargerJson(){

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "data.json", false);
    xhr.send();

    if(xhr.readyState == 4){
        var reponse = xhr.responseText;
        var objJson = JSON.parse(reponse);
        listeProduits = objJson.tousLesProduits;
    }  
}

// fonction $
function $(id){
    return document.getElementById(id);
}

// Page login 
function forgotPassword() {
   $("email2").value = "";
   document.getElementsByClassName("welcomeMessage")[0].style.display = "none";
   $("formLogin").style.display = "none";
   $("forgotPassword").style.display = "flex";
   $("forgotPassword").style.flexWrap = "wrap";
   $("forgotPassword").style.justifyContent = "center";
   $("idInfoBulle").style.display = "none";
}

// Mot de passe oublié
function afficherBulle(){
    if($("email2").value == ""){
        alert("Veuillez remplir votre adresse email.");
        return;
    }
    $("idInfoBulle").style.display = "block";
}

// Page formulaire d'inscription

function afficherFormulaire(){
    $("idAnnuler").click();
    document.getElementsByClassName("welcomeMessage")[0].style.display = "none";
    $("formLogin").style.display = "none";
    $("inscription").style.display = "block";
}

function afficherPageLogin(){
    $("forgotPassword").style.display = "none";
    $("inscription").style.display = "none";
    document.getElementsByClassName("welcomeMessage")[0].style.display = "block";
    $("formLogin").style.display = "block";
}

// validation du formulaire d'inscription

function enregistrerFormulaire(){
    var nom = $("idNom").value;
    var prenom = $("idPrenom").value;
    var appart = $("idApp").value;
    var numero = $("idNumero").value;
    var rue = $("idRue").value; 
    var ville = $("idVille").value;
    var indexProvince = $("idProvince").selectedIndex;
    var province = $("idProvince").options[indexProvince].text;
    var adresse = "";
    var codePostal = $("idCodePostal").value;
    var listeSexe = document.getElementsByClassName("idSexe");
    var sexe = "";
    var langueFrancaise = $("idFrancais");
    var langueAnglaise = $("idAnglais");
    var autreLangue = $("idAutres");
    var languesParlees = "";
    var nomUtilisateur = $("idNomUtilisateur").value;
    var photo = $("idPhoto").files;
    var motDePasse = $("idPassword").value;
    var confirmationMotDePasse = $("idConfirmationPassword").value;
    var message = "Tous les champs sont obligatoires.";
    var userInfos;

    // Nom et prénom
    if(nom == ""){
        alert(message + " Veuillez remplir votre nom.");
        $("idNom").focus();
        return;
    }

    if(prenom == ""){
        alert(message + " Veuillez remplir votre prenom.");
        $("idPrenom").focus();
        return;
    }

    // Sexe
    var unchecked = 0;
    for(var i = 0; i<listeSexe.length; i++){
        if(listeSexe[i].checked){
            sexe = listeSexe[i].value;
            break;
        }
        else{
            unchecked += 1;
            if(unchecked == listeSexe.length){
                alert(message + " Veuillez choisir un sexe."); 
                document.getElementsByClassName("idSexe")[0].focus();
                return
            }
        }
    }

    // Langues parlées
    if(langueFrancaise.checked){
        languesParlees += `${langueFrancaise.value}`;
    }

    if(langueAnglaise.checked){
        if(languesParlees!=""){
            languesParlees +=", ";
        }
        languesParlees += `${langueAnglaise.value}`
    }

    if(autreLangue.checked){
        if(languesParlees!=""){
            languesParlees +=", ";
        }
        languesParlees += `${$("idValeurAutres").value}`
    }

    if(languesParlees == ""){
        alert(message + " Veuillez choisir une langue."); 
        $("idValeurAutres").focus();
        return
    }

    // Adresse

        //Appartement
        if(appart == ""){
            alert(message + " Veuillez remplir ce champs."); 
            $("idApp").focus();
            return
        }
        else{
            if(isNaN(appart)){
                alert("Ce champs doit être un nombre.");
                $("idApp").value = "";
                $("idApp").focus();
                return;
            }
            adresse += `Appartement ${appart}, `;
        }
    
        //Numero
        if(isNaN(numero) || numero == ""){
            alert(message + " Ce champs doit être un nombre");
            $("idNumero").value = "";
            $("idNumero").focus();
            return;
        }

        // Rue, Ville, Code postal
        if(rue == ""){
            alert(message + " Veuillez remplir votre rue.");
            $("idRue").focus();
            return;
        }

        if(ville == ""){
            alert(message + " Veuillez remplir votre ville.");
            $("idVille").focus();
            return;
        }

        if(codePostal == ""){
            alert(message + " Veuillez remplir votre code postal.");
            $("idCodePostal").focus();
            return;
        }

        // Construction de l'adresse
        adresse += `${numero} rue ${rue}, ${ville}, ${province}, ${codePostal}`;

        // Province
        if(indexProvince == 0 || adresse == ""){
            alert(message + " Veuillez sélectionner votre province.");
            $("idProvince").focus();
            return;
        }

    // Photo

    if(photo.length == 0){
        photo = "";
        alert("Veuillez ajouter votre photo.")
        $("idPhoto").focus();
        return;
    }
    else{
        photo = photo[0].name;
    }

    // Nom d'utilisateur
    if(nomUtilisateur == ""){
        alert(message + " Veuillez remplir votre nom d'utilisateur.");
        $("idNomUtilisateur").focus();
        return;
    }


    // Confirmation mot de passe sinon pas d'affichage
    if(motDePasse == ""){
        alert(message + " Veuillez remplir votre mot de passe.");
        $("idPassword").focus();
        return;
    }

    if(motDePasse != confirmationMotDePasse){
    alert("Confirmation mot de passe incorrect. Réessayer.");
    $("idPassword").value = "";
    $("idConfirmationPassword").value = "";
    $("idPassword").focus();
    return;
    }

    // Affichage des informations dans la zone prévue
    $("idAffichageNomPrenom").innerHTML = `${nom}, ${prenom}`;
    $("idAffichageAdresse").innerHTML = adresse;
    $("idAffichageSexe").innerHTML = sexe;
    $("idAffichageLangues").innerHTML = languesParlees;
    $("idAffichageUsername").innerHTML = nomUtilisateur;
    $("idAffichagePhoto").src = photo;
    $("idInscriptionValide").style.visibility = "visible";

    //locale storage

    //stock infos
    if(localStorage.getItem("compteClient") != null){
        listesNouveauxInscrits = JSON.parse(localStorage.getItem("compteClient"));
    }
    
    userInfos = {"nom": nom,"prenom": prenom,"appart": appart,"numero": numero,"rue": rue,
    "ville": ville,"province": province,"adresse": adresse,"sexe":sexe,"langue":languesParlees,"photo":photo,
    "codePostal": codePostal,"email": nomUtilisateur, "password": motDePasse};

    listesNouveauxInscrits.push(userInfos);

    //alert("liste au niveau de la fonction enregistrer" + listesNouveauxInscrits.length);

    localStorage.setItem("compteClient", JSON.stringify(listesNouveauxInscrits));
}

function activerAutreLangue(){
    var autreLangue = $("idAutres");

    if(autreLangue.checked){
        $("idValeurAutres").disabled = false;
    }
    else{
        $("idValeurAutres").disabled = true;
        $("idValeurAutres").value = "";
    }
}

// Authentification user

function connect(){
    
    //verif infos

    if(JSON.parse(localStorage.getItem("compteClient")) == null){
        alert("Le compte n'existe pas. Veuillez faire une demande d'adhésion");
        $("email").value = "";
        $("password").value = "";
        return;
    }

    if($("email").value == ""){
        alert("Veuillez saisir votre identifiant");
        $("email").focus();
        return;
    }

    if($("password").value == ""){
        alert("Veuillez saisir votre mot de passe");
        $("password").focus();
        return;
    }

     // donnees saisies
     var emailSaisi = $("email").value;
     var motDePasseSaisi = $("password").value;

    // donnees enregistrees 
    
    listeClients = JSON.parse(localStorage.getItem("compteClient"));
    var mailJson = "";
    var motDePasseJson = "";
    var clientExiste = false;

    listeClients.forEach(function(client){
        if(client.email == emailSaisi){
            clientExiste = true;
            mailJson = client.email;
            motDePasseJson = client.password;
        }
    })

    // Confirmation mot de passe sinon pas d'affichage

    if(clientExiste){
        if(emailSaisi != mailJson || motDePasseSaisi != motDePasseJson) {
            alert("Votre mot de passe / email est incorrect. Veuillez réessayer svp.");
            password.value = "";
            $("password").focus();
        }

        else {
            dernierConnecte = emailSaisi;
            localStorage.setItem("dernierConnecte", JSON.stringify(dernierConnecte));
            window.location.href="main.html";
         }
    }

    else{
        alert("Le compte n'existe pas. Veuillez faire une demande d'adhésion");
        $("email").value = "";
        $("password").value = "";
        return;
    }
}

// --------------------------Page main ------------------------------------------------

function afficherAccueil(){
    $("navigation").style.display = "inline-block";
    $("imgMain").style.display = "block";
    $("carrousel").style.display = "block";
    $("populaires").style.visibility = "visible";
    $("idMonCompte").style.display = "none";
    document.getElementsByClassName("affichageProduits")[0].style.display = "none";
    document.getElementsByClassName("affichageProduits")[1].style.display = "none";
    document.getElementsByClassName("pageProduits")[0].style.display = "none";
    document.getElementsByClassName("classCategoriePanier")[0].style.display = "none";
    document.getElementsByClassName("classFilAriane")[0].style.visibility = "hidden";
    document.getElementsByClassName("classContact")[0].style.display = "none";
    document.getElementsByClassName("classContact")[0].style.display = "none";
}

//Affichage bulle mon compte 
function afficherBulleMain(id){
        if(id == "monCompte"){
            $("idBulleCompte").style.display = "block";
        }

        if(id=="panier"){
            $("idBulleQte").innerHTML = $("idCompteurPanier").innerHTML;
            $("idBullePanier").style.display = "block";
            calculerPanier();  
        }    
}

function enleverBulleMain(id){
    if(id == "monCompte"){
        $("idBulleCompte").style.display = "none";
    }

    if(id=="panier"){
        $("idBullePanier").style.display = "none";
    }
}
    
// Affichage informations Compte membre
function afficherMesInformations(){
    dernierConnecte = JSON.parse(localStorage.getItem("dernierConnecte"));
    listeClients = JSON.parse(localStorage.getItem("compteClient"));
    var image;
    var nom;
    var prenom;
    var sexe;
    var langues;
    var adresse;
    var username;

    listeClients.forEach(function(client){
        if(dernierConnecte == client.email){
            image = client.photo;
            $("imgUtilisateur").src = image;
            nom = client.nom;
            $("idJsonNom").innerHTML = nom;
            prenom = client.prenom;
            $("idJsonPrenom").innerHTML = prenom;
            sexe = client.sexe;
            $("idJsonSexe").innerHTML = sexe;
            langues = client.langue;
            $("idJsonLangues").innerHTML = langues;
            adresse = client.adresse;
            $("idJsonAdresse").innerHTML = adresse;
            username = client.email;
            $("idJsonUsername").innerHTML = username;
        }
    })

    $("idMonCompte").style.display = "flex";
    $("navigation").style.display = "inline-block";
    $("imgMain").style.display = "none";
    $("carrousel").style.display = "none";
    $("populaires").style.visibility = "hidden";
    document.getElementsByClassName("affichageProduits")[0].style.display = "none";
    document.getElementsByClassName("affichageProduits")[1].style.display = "none";
    document.getElementsByClassName("pageProduits")[0].style.display = "none";
    document.getElementsByClassName("classCategoriePanier")[0].style.display = "none";
    document.getElementsByClassName("classFilAriane")[0].style.visibility = "visible";
    document.getElementsByClassName("classContact")[0].style.display = "none";
    document.getElementsByClassName("classContact")[0].style.display = "none";
}

//Fil d'ariane
function suivreFilAriane(id){
    var pageActuelle = $("idPageActu");

    if(id == "panier"){
        pageActuelle.innerHTML = "Panier";
        document.getElementsByClassName("classFilAriane")[0].style.visibility = "visible";
        return;
    }

    var page = $(id).innerHTML;
    pageActuelle.innerHTML = page;
    document.getElementsByClassName("classFilAriane")[0].style.visibility = "visible";
}

//Menu Navigation

function menuNav(id){
        if(id == "cat1"){
            $("idLivres").style.display = "block";
            $("cat1").style.background = "white";
            $("cat1").id = "cat4";
        }

        if(id == "cat2"){
            $("idFilms").style.display = "block";
            $("cat2").style.background = "white";
            $("cat2").id = "cat5";
        }

        if(id == "cat3"){
            $("idJeuxVideos").style.display = "block";
            $("cat3").style.background = "white";
            $("cat3").id = "cat6";
        }

        if(id == "cat4"){
            $("idLivres").style.display = "none";
            $("cat4").id = "cat1";
            $("cat1").style.background = "lightgrey";
        }
        
        if(id == "cat5"){
            $("idFilms").style.display = "none";
            $("cat5").id = "cat2";
            $("cat2").style.background = "lightgrey";
        }

        if(id == "cat6"){
            $("idJeuxVideos").style.display = "none";
            $("cat6").id = "cat3";
            $("cat3").style.background = "lightgrey";
        }
}

// Page main -- Carroussel

function afficherImages(){
    var tabImages = ["Carrousel/halloween.jpg", "Carrousel/007.jpg","Carrousel/aPlagueTale.jpg", "Carrousel/smashBros.jpg", "Carrousel/sifu.jpg", "Carrousel/horizon.jpg", "Carrousel/gardner.jpg", "Carrousel/recettes.jpg", "Carrousel/gucci2.jpg", "Carrousel/morbius.jpg"];
    var i = 0;
    var imageAffichee = tabImages[i];

    $("carrouselImg").src = imageAffichee;
    
    setInterval(function(){
        i++;
        if(i==tabImages.length){
            i = 0;
        }
        imageAffichee = tabImages[i];
        $("carrouselImg").src = imageAffichee;
    }, 5000);
}

// Affichage Map 

function afficherMap(){ 
    var icons = {
        start: new google.maps.MarkerImage(
            'http://maps.google.com/mapfiles/ms/icons/orange-dot.png'
        )};

    $("carrousel").style.display = "none";
    $("imgMain").style.display = "none";
    document.getElementsByClassName("classContact")[0].style.display = "flex";
    document.getElementsByClassName("classContact")[0].style.flexWrap = "wrap";
    document.getElementsByClassName("classContact")[0].style.justifyContent = "center"; 
    $("idPanel").style.display = "none";
    $("floatingPanel").style.display = "none";
    $("idMap").style.flexBasis = "88%";
    $("idLocaliser").innerHTML = "Géolocaliser";

    var adresseBrook = "<h2>Brook & Co</h2>";
    adresseBrook += "1 Pl Ville Marie<br>";
    adresseBrook += "Montreal, Quebec H3B 3Y1<br>";
    adresseBrook += "Téléphone +1 514 8742643";
    $("idSiege").innerHTML = adresseBrook;

    var lieux = [
        ['Brook&Co', 45.501689, -73.567256, 1],
        ['SuccursaleLongueuil', 45.536944, -73.510713, 2],
        ['SuccursaleDorval',45.450321, -73.750049, 3],
        ['SuccursaleBrossard', 45.451436, -73.461910, 4]
    ];

    var optionsMap= {
    center: new google.maps.LatLng(45.501689, -73.567256),
    zoom:10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map($('idMap'), optionsMap);
    
    var infowindow = new google.maps.InfoWindow();

    var marker, i;
    
    for (i = 0; i < lieux.length; i++) {  
    
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(lieux[i][1], lieux[i][2]),
        map: map
    });
        
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
        infowindow.setContent(lieux[i][0]);
        infowindow.open(map, marker);
        }
    })(marker, i));
    }
}

function geolocaliser(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(maPosition);
    } 
    else { 
        return false;
    }
}

function maPosition(position) {
    $("idPanel").style.display="flex";
    $("idMap").style.flexBasis = "57%";
    
    if($("idLocaliser").innerHTML ==="Liste Succursales"){
        var from ="Liste Succursales";
        $("idPanel").style.display="flex";
        $("floatingPanel").style.display="none";
        $("idLocaliser").innerHTML = "Rejoindre";
    }

    var lieux = [
        ['Ma position', position.coords.latitude, position.coords.longitude, 1],
        ['Brook&Co', 45.501689, -73.567256, 2],
        ['SuccursaleBrossard', 45.451436, -73.461910, 3],
        ['SuccursaleLongueuil', 45.536944, -73.510713, 4],
        ['SuccursaleDorval',45.450321, -73.750049, 5]
    ];
      
    var adresseBrook = "<h2>Brook & Co</h2>";
    adresseBrook += "1 Pl Ville Marie<br>";
    adresseBrook += "Montreal, Quebec H3B 3Y1<br>";
    adresseBrook += "Téléphone +1 514 8742643";

    $("idSiege").innerHTML = adresseBrook;

    var AdressesSuccursale1 = "<div>";
    AdressesSuccursale1 += "<h2>Succursale B&C Brossard</h2>";
    AdressesSuccursale1 += "1 Pl Ville Marie<br>";
    AdressesSuccursale1 += "Montreal, Quebec H3B 3Y1<br>";
    AdressesSuccursale1 += "Téléphone +1 514 8742643";
    AdressesSuccursale1 +="</div>";
    AdressesSuccursale1 +="<hr>";

    var AdressesSuccursale2 = "<div>";
    AdressesSuccursale2 += "<h2>Succursale B&C Longueuil</h2>";
    AdressesSuccursale2 += "1 Pl Ville Marie<br>";
    AdressesSuccursale2 += "Montreal, Quebec H3B 3Y1<br>";
    AdressesSuccursale2 += "Téléphone +1 514 8742643";
    AdressesSuccursale2 +="</div>";
    AdressesSuccursale2 +="<hr>";

    var AdressesSuccursale3 = "<div>";
    AdressesSuccursale3 += "<h2>Succursale B&C Dorval</h2>";
    AdressesSuccursale3 += "1 Pl Ville Marie<br>";
    AdressesSuccursale3 += "Montreal, Quebec H3B 3Y1<br>";
    AdressesSuccursale3 += "Téléphone +1 514 8742643";
    AdressesSuccursale3 +="</div>";
    
    $("idPanel").innerHTML=AdressesSuccursale1+AdressesSuccursale2+AdressesSuccursale3;

    var optionsMap= {
    center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
    zoom:7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map($('idMap'), optionsMap);
    
    var infowindow = new google.maps.InfoWindow();

    var marker,markerSuccursale, i,mindistance=0,distance=0,succursale,latSuccursale=0,lngSuccursale=0;
    var depart = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
    for (i = 0; i < lieux.length; i++) {  
        distance = Math.acos(Math.sin(position.coords.latitude)*Math.sin(lieux[i][1])+Math.cos(position.coords.latitude)*Math.cos(lieux[i][1])*Math.cos(lieux[i][2]-position.coords.longitude))*6371;
        
        if(distance !== 0 && mindistance == 0){
        mindistance = distance;
        succursale = lieux[i][0];
        latSuccursale =lieux[i][1];
        lngSuccursale = lieux[i][2];
        }

        if(distance !== 0 && distance < mindistance){
            mindistance = distance;
            succursale = lieux[i][0];
            latSuccursale =lieux[i][1];
            lngSuccursale = lieux[i][2];
        }
       
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(lieux[i][1], lieux[i][2]),
            map: map 
        });
                
        if(lieux[i][3]==1){
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/orange-dot.png')
        } 

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                var commentaires = "<div>";
                commentaires+="<h1>"+lieux[i][0]+"</h1>";
                commentaires+="</div>";
                infowindow.setContent(commentaires);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
      
    var arrivee = new google.maps.LatLng(latSuccursale, lngSuccursale);
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);
    
    directionsDisplay.setPanel($("floatingPanel"));
      
    if($("idLocaliser").innerHTML ==="Rejoindre" && from !=="Liste Succursales"){
        $("idPanel").style.display="none";
        $("floatingPanel").style.display = "block";
        $("idLocaliser").innerHTML = "Liste Succursales";
        calculateAndDisplayRoute(directionsService, directionsDisplay, depart, arrivee,map,position);
    }
  
    if($("idLocaliser").innerHTML =="Géolocaliser"){ 
        $("idLocaliser").innerHTML = "Rejoindre";
    }
}


function calculateAndDisplayRoute(directionsService, directionsDisplay, depart, arrivee,map,position) {
    directionsService.route({
        origin: depart,
        destination: arrivee,
        travelMode:"DRIVING"
    }, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        makeMarker(position, icons.start,map, "Votre position");
        } 
        else {
            alert('Directions request failed due to ' + status);
        }
    });
  }

  function makeMarker(position, icon,map, title) {
    new google.maps.Marker({
        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        map: map,
        icon: icon,
        title: title
    });
}


/*Affichage des produits*/

var idPrecedent = "";
function afficherSousCategories(id){

    if(idPrecedent == "" || idPrecedent == id){
        idPrecedent = id;
        $(id).style.color = "#fca311";
    }

    else {
        $(idPrecedent).style.color = "black"; 
        $(id).style.color = "#fca311";
        idPrecedent = id;
    }

    afficherListeProduits(id);

    $("populaires").style.display = "flex";
    $("populaires").style.visibility = "visible";
    $("idMonCompte").style.display = "none";
    $("construction").style.display = "none";
    $("carrousel").style.display = "none";
    $("imgMain").style.display = "none";
    document.getElementsByClassName("affichageProduits")[0].style.display = "flex";
    document.getElementsByClassName("affichageProduits")[0].style.flexWrap="wrap"; 
    document.getElementsByClassName("affichageProduits")[1].style.display = "none";
    document.getElementsByClassName("classCategoriePanier")[0].style.display = "none";
    document.getElementsByClassName("classContact")[0].style.display = "none";
}

function afficherListeProduits(id){
    var navCategorie = $(id).parentElement.previousElementSibling.innerText;
    var navSousCategorie = $(id).innerText;
    
    document.querySelector(".affichageProduits").innerHTML = "";

    var noeudH1TitreCategorie = document.createElement("h1");
    noeudH1TitreCategorie.setAttribute("id", "idTitreCategorie");
    noeudH1TitreCategorie.appendChild(document.createTextNode(`${navCategorie} - ${navSousCategorie}`));
    document.getElementsByClassName("affichageProduits")[0].appendChild(noeudH1TitreCategorie);

    listeProduits.forEach(function(produit){
        if(navSousCategorie == produit.categorie){
            var image = produit.image;
            var titre = produit.titre;
            var auteur = produit.auteur;
            var format = produit.format;
            var prix = (produit.prix).toFixed(2);

            var noeudDivProduit = document.createElement("div");
            noeudDivProduit.setAttribute("class", "produits");
            document.getElementsByClassName("affichageProduits")[0].appendChild(noeudDivProduit);
    
            var noeudDiv = document.createElement("div");
            noeudDiv.setAttribute("id", "idProduit");
            noeudDivProduit.appendChild(noeudDiv);
    
            var noeudDivImg = document.createElement("div");
            noeudDivImg.setAttribute("class", "imgProduits");
            noeudDiv.appendChild(noeudDivImg);
            noeudDivImg.addEventListener("click", function(){
                afficherPageProduit(produit)
            });
    
            var noeudImg = document.createElement("img");
            noeudImg.setAttribute("src", image);
            noeudDivImg.appendChild(noeudImg);
    
            var noeudTitre = document.createElement("h3");
            noeudTitre.appendChild(document.createTextNode(titre));
            noeudDiv.appendChild(noeudTitre);
    
            var noeudAuteur = document.createElement("p");
            noeudAuteur.appendChild(document.createTextNode(auteur));
            noeudDiv.appendChild(noeudAuteur);
    
            var noeudFormat = document.createElement("p");
            noeudFormat.appendChild(document.createTextNode(format));
            noeudDiv.appendChild(noeudFormat);
    
            var noeudPrix = document.createElement("p");
            noeudPrix.appendChild(document.createTextNode(`${prix} $`));
            noeudDiv.appendChild(noeudPrix);
    
            var noeudButton = document.createElement("button");
            noeudButton.setAttribute("type", "button");
            noeudButton.appendChild(document.createTextNode("Ajouter"));
            noeudDivProduit.appendChild(noeudButton);
            
            noeudButton.addEventListener("click", function(){
                var ligneCommande = {Produit: produit, quantite: "1"};
                ajouterProduits(ligneCommande);
            })
        }
    });
}

function afficherPageConstruction(id){
    if(idPrecedent == "" || idPrecedent == id){
        idPrecedent = id;
        $(id).style.color = "#fca311";
    }

    else {
        $(idPrecedent).style.color = "black"; 
        $(id).style.color = "#fca311";
        idPrecedent = id;
    }

    $("construction").style.display = "block";
    $("carrousel").style.display = "none";
    $("imgMain").style.display = "none";
    $("idMonCompte").style.display = "none";
    document.getElementsByClassName("affichageProduits")[1].style.display = "block";
    document.getElementsByClassName("affichageProduits")[0].style.display = "none";
    document.getElementsByClassName("classCategoriePanier")[0].style.display = "none";
}

function afficherPageProduit(produit){ 
    document.querySelector(".pageProduits").innerHTML = "";

    construireDetailProduit(produit);

    document.getElementsByClassName("pageProduits")[0].style.display = "flex";
    $("navigation").style.display = "none";
    $("populaires").style.display = "none";
    $("idMonCompte").style.display = "none";
    document.getElementsByClassName("affichageProduits")[0].style.display = "none";
    document.getElementsByClassName("classPanier")[0].style.display = "none";
}

function construireDetailProduit(produit){
    var image = produit.imageDetails;
    var titre = produit.titre;
    var auteur = produit.auteur;
    var prix = produit.prix;
    var format = produit.format;
    var editeur = produit.editeur;
    var numISBN = produit.ISBN;
    var genre = produit.genre;
    var resume = produit.resume;
    var titreExact = produit.titreExact;
    var categorie = produit.categorie;
    var dateParution = produit.dateParution;
    var dimensions = produit.dimensions;
    var nombrePages = produit.nbPages;

    var noeudDivImgProduit = document.createElement("div");
    noeudDivImgProduit.setAttribute("class", "imgDetailProduit");
    document.getElementsByClassName("pageProduits")[0].appendChild(noeudDivImgProduit);

    var imgDetailProduit = document.createElement("img");
    imgDetailProduit.setAttribute("id", "idImgDetail");
    imgDetailProduit.setAttribute("src", `${image}`);
    noeudDivImgProduit.appendChild(imgDetailProduit);

    var noeudDetailProduit1 = document.createElement("div");
    noeudDetailProduit1.setAttribute("class", "detailProduit1");
    document.getElementsByClassName("pageProduits")[0].appendChild(noeudDetailProduit1);

    var noeudH1 = document.createElement("h1");
    noeudH1.setAttribute("id", "idTitre");
    noeudH1.appendChild(document.createTextNode(titre));
    noeudDetailProduit1.appendChild(noeudH1);
    
    var noeudD1H2 = document.createElement("h2");
    noeudD1H2.appendChild(document.createTextNode(auteur));
    noeudDetailProduit1.appendChild(noeudD1H2);
    
    var noeudP1 = document.createElement("p");
    noeudP1.appendChild(document.createTextNode(`${prix.toFixed(2)} $`));
    noeudDetailProduit1.appendChild(noeudP1);

    var noeudDiv = document.createElement("div");
    noeudDiv.appendChild(document.createTextNode("Quantité "));
    noeudDetailProduit1.appendChild(noeudDiv);

    var noeudInput = document.createElement("input");
    noeudInput.setAttribute("id", "idInputQte")
    noeudInput.setAttribute("type", "number");
    noeudInput.setAttribute("min", "1");
    noeudInput.setAttribute("max", "100");
    noeudInput.setAttribute("value", "1");
    noeudDiv.appendChild(noeudInput);

    noeudDiv.appendChild(document.createTextNode(" "));
    
    var noeudButton = document.createElement("button");
    noeudButton.setAttribute("type", "button");
    noeudButton.setAttribute("id", "idBtnDetail");
    noeudButton.appendChild(document.createTextNode("Ajouter"));
    noeudDiv.appendChild(noeudButton);
    noeudButton.addEventListener("click", function(){
        var ligneCommande = {Produit: produit, quantite: "1"};
        ajouterProduits(ligneCommande);
    })

    var noeudP2 = document.createElement("p");
    var texteP2 = `Editeur: <span>${editeur}</span><br/>ISBN: ${numISBN} <br/>Genre: <span>${genre}</span><br/>`;
    noeudP2.innerHTML = texteP2;
    noeudDetailProduit1.appendChild(noeudP2);

    var noeudP3 = document.createElement("p");
    var noeudU = document.createElement("u");
    noeudU.appendChild(document.createTextNode("Résumé du livre:"));
    noeudP3.appendChild(noeudU);
    noeudP3.innerHTML += "<br/>";
    
    noeudP3.appendChild(document.createTextNode(resume));
    noeudDetailProduit1.appendChild(noeudP3);

    var noeudDetailProduit2 = document.createElement("div");
    noeudDetailProduit2.setAttribute("class", "detailProduit2");
    document.getElementsByClassName("pageProduits")[0].appendChild(noeudDetailProduit2);
    
    var noeudD2H2 = document.createElement("h2");
    noeudD2H2.appendChild(document.createTextNode("Détails"));
    noeudDetailProduit2.appendChild(noeudD2H2);

    var noeudDivDetail1 = document.createElement("div");
    noeudDivDetail1.setAttribute("class", "details1");
    noeudDetailProduit2.appendChild(noeudDivDetail1);

    var noeudP4 = document.createElement("p");
    noeudP4.appendChild(document.createTextNode("Titre exact:"));
    noeudDivDetail1.appendChild(noeudP4);

    var noeudDivLigneProduits1 = document.createElement("div");
    noeudDivLigneProduits1.setAttribute("class", "ligneProduits");
    noeudDivDetail1.appendChild(noeudDivLigneProduits1);

    var noeudP5 = document.createElement("p");
    noeudP5.appendChild(document.createTextNode("Catégorie:"));
    noeudDivDetail1.appendChild(noeudP5);

    var noeudDivLigneProduits2 = document.createElement("div");
    noeudDivLigneProduits2.setAttribute("class", "ligneProduits");
    noeudDivDetail1.appendChild(noeudDivLigneProduits2);

    var noeudP6 = document.createElement("p");
    noeudP6.appendChild(document.createTextNode("Date Parution:"));
    noeudDivDetail1.appendChild(noeudP6);
    
    var noeudDivLigneProduits3 = document.createElement("div");
    noeudDivLigneProduits3.setAttribute("class", "ligneProduits");
    noeudDivDetail1.appendChild(noeudDivLigneProduits3);

    var noeudP7 = document.createElement("p");
    noeudP7.appendChild(document.createTextNode("Éditeur:"));
    noeudDivDetail1.appendChild(noeudP7);
    
    var noeudDivLigneProduits4 = document.createElement("div");
    noeudDivLigneProduits4.setAttribute("class", "ligneProduits");
    noeudDivDetail1.appendChild(noeudDivLigneProduits4);

    var noeudP8 = document.createElement("p");
    noeudP8.appendChild(document.createTextNode("ISBN:"));
    noeudDivDetail1.appendChild(noeudP8);
    
    var noeudDivLigneProduits5 = document.createElement("div");
    noeudDivLigneProduits5.setAttribute("class", "ligneProduits");
    noeudDivDetail1.appendChild(noeudDivLigneProduits5);

    var noeudP9 = document.createElement("p");
    noeudP9.appendChild(document.createTextNode("Auteur:"));
    noeudDivDetail1.appendChild(noeudP9);
    
    var noeudDivLigneProduits6 = document.createElement("div");
    noeudDivLigneProduits6.setAttribute("class", "ligneProduits");
    noeudDivDetail1.appendChild(noeudDivLigneProduits6);

    var noeudP10 = document.createElement("p");
    noeudP10.appendChild(document.createTextNode("Format:"));
    noeudDivDetail1.appendChild(noeudP10);
    
    var noeudDivLigneProduits7 = document.createElement("div");
    noeudDivLigneProduits7.setAttribute("class", "ligneProduits");
    noeudDivDetail1.appendChild(noeudDivLigneProduits7);

    var noeudP11 = document.createElement("p");
    noeudP11.appendChild(document.createTextNode("Dimensions:"));
    noeudDivDetail1.appendChild(noeudP11);
    
    var noeudDivLigneProduits8 = document.createElement("div");
    noeudDivLigneProduits8.setAttribute("class", "ligneProduits");
    noeudDivDetail1.appendChild(noeudDivLigneProduits8);

    var noeudP12 = document.createElement("p");
    noeudP12.appendChild(document.createTextNode("Nombres de pages:"));
    noeudDivDetail1.appendChild(noeudP12);
    
    var noeudDivLigneProduits9 = document.createElement("div");
    noeudDivLigneProduits9.setAttribute("class", "ligneProduits");
    noeudDivDetail1.appendChild(noeudDivLigneProduits9);

    var noeudDivDetail2 = document.createElement("div");
    noeudDivDetail2.setAttribute("class", "details2");
    noeudDetailProduit2.appendChild(noeudDivDetail2);

    var noeudP13 = document.createElement("p");
    noeudP13.appendChild(document.createTextNode(titreExact));
    noeudDivDetail2.appendChild(noeudP13);

    var noeudP14 = document.createElement("p");
    noeudP14.appendChild(document.createTextNode(categorie));
    noeudDivDetail2.appendChild(noeudP14);

    var noeudP15 = document.createElement("p");
    noeudP15.appendChild(document.createTextNode(dateParution));
    noeudDivDetail2.appendChild(noeudP15);

    var noeudP16 = document.createElement("p");
    noeudP16.appendChild(document.createTextNode(editeur));
    noeudDivDetail2.appendChild(noeudP16);

    var noeudP17 = document.createElement("p");
    noeudP17.appendChild(document.createTextNode(numISBN));
    noeudDivDetail2.appendChild(noeudP17);

    var noeudP18 = document.createElement("p");
    noeudP18.appendChild(document.createTextNode(auteur));
    noeudDivDetail2.appendChild(noeudP18);

    var noeudP19 = document.createElement("p");
    noeudP19.appendChild(document.createTextNode(format));
    noeudDivDetail2.appendChild(noeudP19);

    var noeudP20 = document.createElement("p");
    noeudP20.appendChild(document.createTextNode(dimensions));
    noeudDivDetail2.appendChild(noeudP20);

    var noeudP21 = document.createElement("p");
    noeudP21.appendChild(document.createTextNode(nombrePages));
    noeudDivDetail2.appendChild(noeudP21);
}

// Cart page

var tabProduits = new Array();

function ajouterProduits(ligneCommande){
    var nombreItemPanier;
    var quantite = ligneCommande.quantite;
    var produit = ligneCommande.Produit;

    if(document.getElementsByClassName("pageProduits")[0].style.display == "flex"){
        quantite = $("idInputQte").value;
        ligneCommande.quantite = quantite;
    }
    
    if(tabProduits.includes(produit)){
        var index = tabProduits.indexOf(produit);
        console.log("l'index produit est " + index);
        var flag = parseInt(panier[index].quantite);

        if(document.getElementsByClassName("pageProduits")[0].style.display == "block"){
            flag = flag + parseInt($("idInputQte").value);
        }

        else{
            flag++;
        }
        
        panier[index].quantite = `${flag}`;
    }

    else{
        panier.push(ligneCommande);
        tabProduits.push(ligneCommande.Produit);
    }

    nombreItemPanier = parseInt($("idCompteurPanier").innerHTML);

    enregistrerPanier();

    nombreItemPanier += parseInt(quantite);

    $("idCompteurPanier").innerHTML = nombreItemPanier;
}

function enregistrerPanier(){
    if(typeof(localStorage) == "undefined"){
        alert("Votre navigateur ne supporte pas les cookies");
        return;
    }
    localStorage.setItem("panier", JSON.stringify(panier));
}

// Construction Panier et compteur

function construirePanier(){
    nombreItemPanier = parseInt($("idCompteurPanier").innerHTML);
    
    document.getElementsByClassName("classCategoriePanier")[0].innerHTML = "";

    var noeudDivPanier = document.createElement("div");
    noeudDivPanier.setAttribute("class", "classPanier");
    document.getElementsByClassName("classCategoriePanier")[0].appendChild(noeudDivPanier);

    var noeudEntetePanier = document.createElement("div");
    noeudEntetePanier.setAttribute("class", "classEntetePanier");
    noeudDivPanier.appendChild(noeudEntetePanier);

    var noeudP1 = document.createElement("p");
    noeudP1.innerHTML = `Mon panier (<span id="idCompteurPanier">${nombreItemPanier}</span>)`;
    console.log("Dans fonction construire panier" + nombreItemPanier);
    noeudEntetePanier.appendChild(noeudP1);

    var noeudDivSousTotal = document.createElement("div");
    noeudDivSousTotal.setAttribute("class", "classSousTotal");
    noeudDivSousTotal.setAttribute("id", "idSousTotal1");
    noeudEntetePanier.appendChild(noeudDivSousTotal);

    var noeudP2 = document.createElement("p");
    noeudP2.innerHTML = `Total<span id="idTotalEntete">0,00 $</span>`; // Voir si rajout du sous total en dynamique
    noeudDivSousTotal.appendChild(noeudP2);

    var noeudDivButton = document.createElement("div");
    noeudEntetePanier.appendChild(noeudDivButton);
    
    var noeudLinkA = document.createElement("a");
    noeudLinkA.appendChild(document.createTextNode("Poursuivre mes achats"));
    noeudLinkA.addEventListener("click", function(){
        afficherAccueil();
    })
    noeudDivButton.appendChild(noeudLinkA);

    var noeudButton1 = document.createElement("button");
    noeudButton1.setAttribute("class", "classBtnPanier");
    noeudButton1.setAttribute("type", "button");
    if(nombreItemPanier == 0){
        noeudButton1.setAttribute("disabled", "disabled"); // voir comment le rendre dynamique si commandes
    }
    noeudButton1.appendChild(document.createTextNode("Passer Commande"));
    noeudButton1.addEventListener("click", function(){
        supprimerLigne(0,0);
        document.getElementsByClassName("affichageProduits")[1].style.display = "block";
        $("construction").innerHTML = "Votre commande a bien été pris en compte et vous serez livré prochainement.";
        $("construction").style.display = "block";
        document.getElementsByClassName("classCategoriePanier")[0].style.display = "none";
    })
    noeudDivButton.appendChild(noeudButton1);

    if(nombreItemPanier == 0){
        var noeudContenuPanier = document.createElement("div");
        noeudContenuPanier.setAttribute("class", "classContenuPanier");
        noeudDivPanier.appendChild(noeudContenuPanier);

        var noeudSpan = document.createElement("span");
        noeudSpan.appendChild(document.createTextNode("Votre panier est vide."));
        noeudContenuPanier.appendChild(noeudSpan);
    }

    else{

        var noeudLignesPanier = document.createElement("div");
        noeudLignesPanier.setAttribute("class", "classLignesPanier");
        noeudDivPanier.appendChild(noeudLignesPanier);

        var noeudTab = document.createElement("table");
        noeudTab.setAttribute("border", "0");
        noeudTab.setAttribute("width", "90%");
        noeudLignesPanier.appendChild(noeudTab);

        var noeudThead = document.createElement("thead");
        noeudTab.appendChild(noeudThead);

        var noeudTh1 = document.createElement("th");
        noeudTh1.appendChild(document.createTextNode("Image Livre"));
        noeudThead.appendChild(noeudTh1);

        var noeudTh2 = document.createElement("th");
        noeudTh2.appendChild(document.createTextNode("Description"));
        noeudThead.appendChild(noeudTh2);

        var noeudTh3 = document.createElement("th");
        noeudTh3.appendChild(document.createTextNode("Quantité"));
        noeudThead.appendChild(noeudTh3);

        var noeudTh4 = document.createElement("th");
        noeudTh4.appendChild(document.createTextNode("Prix par article"));
        noeudThead.appendChild(noeudTh4);

        var noeudTBody = document.createElement("tbody");
        noeudTBody.setAttribute("id", "idLignePanier");
        noeudTab.appendChild(noeudTBody);

        console.log("Juste avant le foreach"+panier);


        panier.forEach(function(ligneCommande, index){
            
            var image = ligneCommande.Produit.image;
            var titre = ligneCommande.Produit.titre;
            var auteur = ligneCommande.Produit.auteur;
            var prix = (ligneCommande.Produit.prix).toFixed(2);
            var quantite = ligneCommande.quantite;
            var prixTotal = (prix * quantite).toFixed(2);
            
            var noeudTr = document.createElement("tr");
            noeudTBody.appendChild(noeudTr);

            var noeudTd1 = document.createElement("td");
            noeudTr.appendChild(noeudTd1);

            var noeudImgPanier = document.createElement("img");
            noeudImgPanier.setAttribute("src", `${image}`);  ///venir dynamiser l'image
            noeudTd1.appendChild(noeudImgPanier);
            noeudImgPanier.addEventListener("click", function(){
                afficherPageProduit(ligneCommande.Produit);
            })

            var noeudTd2 = document.createElement("td");
            noeudTd2.innerHTML = `<span class="classTitre">${titre}</span> <br> <span class="classAuteur">${auteur}</span> <br> <span class="classPrix">${prix} $</span>`;
            noeudTr.appendChild(noeudTd2);

            var noeudTd3 = document.createElement("td");
            noeudTd3.innerHTML = "&nbsp;Quantité <br/>";

            var noeudInputTd3 = document.createElement("input");
            noeudInputTd3.setAttribute("class", "idInputTd3");
            noeudInputTd3.setAttribute("type", "number");
            noeudInputTd3.setAttribute("min", "1");
            noeudInputTd3.setAttribute("max", "100");
            noeudInputTd3.setAttribute("value", `${quantite}`);
            noeudTd3.appendChild(noeudInputTd3);

            var spanTd3 = document.createElement("span");
            spanTd3.setAttribute("class", "classSupprimer");
            spanTd3.appendChild(document.createTextNode("Supprimer"));
            noeudTd3.appendChild(spanTd3);
            noeudTr.appendChild(noeudTd3);

            spanTd3.addEventListener("click", function(){
                supprimerLigne(nombreItemPanier, quantite, index);
            })
            
            var nouvelleQte = 0;
            noeudInputTd3.addEventListener("change", function(){
                
                nouvelleQte = parseInt(this.value);
                panier[index].quantite = nouvelleQte;
                })

            var noeudTd4 = document.createElement("td");
            noeudTd4.innerHTML = `<span>${prixTotal} $</span><br/>`;
            noeudTr.appendChild(noeudTd4);

            var noeudButton = document.createElement("button");
            noeudButton.setAttribute("class", "btnActualiser");
            noeudButton.setAttribute("type", "button");
            noeudButton.appendChild(document.createTextNode("Actualiser"));
            noeudButton.addEventListener("click", function(){
                var tabBtnActualiser = document.getElementsByClassName("btnActualiser");
                for (button of tabBtnActualiser) {
                    if(noeudButton == button){
                        nouvelleQte = 0;

                        panier.forEach(function(ligneCommande){
                            nouvelleQte += parseInt(ligneCommande.quantite);
                        })
            
                        $("idCompteurPanier").innerHTML = nouvelleQte;
                        afficherFacture();
                        calculerPanier();
                    }
                }
            })

            noeudTd4.appendChild(noeudButton);

            var noeudSeparateur = document.createElement("div");
            noeudSeparateur.setAttribute("class", "SeparateurProduit");
            noeudTBody.appendChild(noeudSeparateur);
        })
    }
    
    var noeudPiedPanier = document.createElement("div");
    noeudPiedPanier.setAttribute("class", "classPiedPanier");
    noeudDivPanier.appendChild(noeudPiedPanier);

    var noeudLignePanier = document.createElement("div");
    noeudLignePanier.setAttribute("class", "classLignePanier");
    noeudPiedPanier.appendChild(noeudLignePanier);

    var noeudSousTotal = document.createElement("div");
    noeudSousTotal.setAttribute("class", "classSousTotal");
    noeudSousTotal.setAttribute("id", "idSousTotal2");
    noeudPiedPanier.appendChild(noeudSousTotal);

    var noeudP3 = document.createElement("p");
    noeudP3.innerHTML = `Sous-total
    <span class="classPrixPied" id="idSousTotalPrix">0,00 $</span>`; 
    noeudSousTotal.appendChild(noeudP3);

    var noeudP4 = document.createElement("p");
    noeudP4.innerHTML = `TPS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span class="classPrixPied" id="idTps">0,00 $</span>`;
    noeudSousTotal.appendChild(noeudP4);

    var noeudP5 = document.createElement("p");
    noeudP5.innerHTML = `TVQ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span class="classPrixPied" id="idTvq">0,00 $</span>`;
    noeudSousTotal.appendChild(noeudP5);

    var noeudP6 = document.createElement("p");
    noeudP6.innerHTML = `Total TTC
    <span class="classPrixPied" id="idTotalPrix">0,00 $</span>`;
    noeudSousTotal.appendChild(noeudP6);

    var noeudButton2 = document.createElement("button");
    noeudButton2.setAttribute("class", "classBtnPanier");
    noeudButton2.setAttribute("type", "button");
    if(nombreItemPanier == 0){
        noeudButton2.setAttribute("disabled", "disabled");
    }
    
    noeudButton2.appendChild(document.createTextNode("Passer Commande"));
    noeudButton2.addEventListener("click", function(){
            supprimerLigne(0,0);
            document.getElementsByClassName("affichageProduits")[1].style.display = "block";
            $("construction").innerHTML = "Votre commande a bien été pris en compte et vous serez livré prochainement.";
            $("construction").style.display = "block";
            document.getElementsByClassName("classCategoriePanier")[0].style.display = "none";
        
    });
    noeudSousTotal.appendChild(noeudButton2);
}

    
// Affichage panier

function afficherFacture(){


    construirePanier();
    calculerPanier();

    
    $("populaires").style.display = "flex";
    $("populaires").style.visibility = "hidden";
    $("navigation").style.display = "flex";
    $("navigation").style.flexDirection = "column";
    $("carrousel").style.display = "none";
    $("imgMain").style.display = "none";
    $("idMonCompte").style.display = "none";
    document.getElementsByClassName("affichageProduits")[1].style.display = "none";
    document.getElementsByClassName("affichageProduits")[0].style.display = "none";
    $("construction").style.display = "none";
    document.getElementsByClassName("pageProduits")[0].style.display = "none";
    $("navigation").style.display = "inline-block";
    document.getElementsByClassName("classCategoriePanier")[0].style.display = "inline-block";
    document.getElementsByClassName("classContact")[0].style.display = "none";
    document.getElementsByClassName("classPanier")[0].style.display = "flex";
    document.getElementsByClassName("classPanier")[0].style.flexDirection = "column";

    var tabLI = document.querySelectorAll(".classLi");
    for (li of tabLI) {
        li.style.color = "black";
    }
}

//Suppresion Panier

function supprimerLigne(nombreItemPanier, quantite, index){

    if(index == undefined){
        panier = [];
        tabProduits = [];
    }

    else{
        nombreItemPanier -= quantite;
        panier.splice(index, 1);
        tabProduits.splice(index, 1);
    }
    
    $("idCompteurPanier").innerHTML = nombreItemPanier;

    afficherFacture();
}

    // Calcul Panier 
    function calculerPanier(){
        var sousTotal = 0;
        var total = 0;

        panier.forEach(function(ligneCommande){
            sousTotal += parseInt(ligneCommande.quantite) * parseFloat(ligneCommande.Produit.prix);
        })

        var tps = parseFloat((sousTotal * TAUX_TPS));
        var tvq = parseFloat((sousTotal * TAUX_TVQ));
        total = parseFloat((sousTotal + tps + tvq));

        $("idBulleTotal").innerHTML = `${total.toFixed(2)} $`;
        $("idTotalEntete").innerHTML = total.toFixed(2) + " $";
        $("idSousTotalPrix").innerHTML = sousTotal.toFixed(2) + " $";
        $("idTps").innerHTML = tps.toFixed(2) + " $";
        $("idTvq").innerHTML = tvq.toFixed(2) + " $";
        $("idTotalPrix").innerHTML = total.toFixed(2) + " $";
    }

// 7) Gestionnaire d'évènement window.onload
window.onload = function () {
    if(window.document.title == "Brooke&Co/loginPlus"){
        $("idEnregistrer").addEventListener("click", function(){
            enregistrerFormulaire();
        })
    }
    
    else{
        afficherImages();
        chargerJson();
        $("idMesInformations").addEventListener("click", function(){
            afficherMesInformations();
        });
    }
};