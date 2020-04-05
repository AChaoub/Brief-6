
  var Data;
  var Datalist;
  var DataServices;

  $("#choixSer").change(function() {
    $.ajax({
      url: "/displayDes",
      type: "GET",
      dataType: "json",
      success: data => {
        console.log("data received !", data);
        Data = data[$("#choixSer option:selected").index()-1].description;
        showDes();
      }
    });
  });


  $(document).ready(() => {
    $.ajax({
      url: "/Remplir",
      type: "GET",
      dataType: "json",
      success: data => {
        console.log("data received !", data);
        Datalist = data;
        RemplirLS();
      }
    });
  });

function btnEnvoyer(){
  alert('Votre Question a été transferer au service séléctionné .');
}



  // ---------------------------------------------Remplissage Automatique de boxService en html
  $(document).ready(() => {
    $.ajax({
      url: "/AjouterService",
      type: "GET",
      dataType: "json",
      success: data => {
        console.log("data received !", data);
        DataServices = data;
        AjouterServiceInterf();
        masquerZone();
      }
    });
  });
  function BoxService(Service) {
        // let cont = CreerElem('div', 'col-md-8 text-center aos-init aos-animate ourservice');
        let cont = CreerElem('div', 'col-md-6 col-lg-4 mb-4 mb-lg-4 aos-init aos-animate ourservice');
        // cont.id = `BoxService-${Service.index}`;
        // 
        let cardTop = CreerElem('div', 'unit-4 d-flex');
        // 
        let flexDiv = CreerElem('div','unit-4-icon mr-4');
        let icon = CreerElem('span','text-primary icon-laptop2');
        flexDiv.appendChild(icon);
        // 
        let Serv = CreerElem('div', 'Service');
        // 
        let NomService = CreerElem('h4', "h");
        NomService.innerText = Service.nom;
        let DescrSrv = CreerElem('p', "descrS");
        DescrSrv.innerText = Service.description;
        let p = CreerElem('p', "p");
        let a = CreerElem('a', "a");
        a.innerText= "Learn More";
        a.setAttribute('href','#');

        // 
        p.append(a);
        Serv.appendChild(NomService);
        Serv.appendChild(DescrSrv);
        Serv.appendChild(p);
        cardTop.appendChild(Serv);
        cardTop.appendChild(flexDiv);
        cont.appendChild(cardTop);
        // ContPrinc.appendChild(cont);
    // 
    // document.getElementById('servicesCont').appendChild(cont);
    document.getElementById('servicesCont').insertBefore(cont,document.getElementById('addServiceDIV'));
    //quand on clique sur icone + on affiche la zone ajouter service. 
    $('#addServiceDIV').click(function(){
      afficherZone();
    });
    }
    // 
    function CreerElem(elem, elemClass) {
        let item = document.createElement(elem);
        item.setAttribute('class', elemClass);
        return item;
    }
    function AjouterServiceInterf(){
      DataServices.forEach(obj => {
                BoxService(obj);
      });
  }
  // ___________________________________________________________________________>




  function showDes() {
    $("#Description").html("<br><span id='spanDes'>Description :</span><br>" + Data + "<br><br>" );
    $('#Description').show();
  }

  function RemplirLS(){
    console.log(Datalist.length);
    
    for(var i = 0 ;i<Datalist.length ; i++){
      $("#choixSer").append('<option value='+Datalist[i].nom+'>'+Datalist[i].nom+'</option>');
    }
    
  }
  
    
function afficherZone() {
    $('.zone-ajout-srv').css({
        'display': "flex",'width': "90%",'margin': "auto"
    });
}

function masquerZone() {
    $('.zone-ajout-srv').css({
        'display': "none"
    });
}
 


  $("#Vider").click(function Effacer(){
    $('select[name=ConBox] option:eq(0)').prop('selected', true);
    $('.ZonTxt').val("");
    $('#Description').hide();
  });




