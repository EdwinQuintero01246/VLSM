const inputIp = document.getElementById("ipTextInput")
const errorIpMessage = document.getElementById("errorIpMessage")
const prefixIpInput = document.getElementById("prefIpInput")
const numberNetworksInput =  document.getElementById("numberNetworks")
const SubNetTable = document.getElementById("SubNetTable")


inputIp.addEventListener('change', (e) => {
  ipValor = e.target.value
  var eprR = /^[^0]*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$/;
  var exprReg = new RegExp(eprR,"")

  var isValidIp = exprReg.test(ipValor)
  if(!isValidIp){
    errorIpMessage.style.display = 'block'
  }

  if(isValidIp){
    errorIpMessage.style.display = 'none'
    inputIp.style.border = '1.5px solid green'
    prefixIpInput.disabled = false;
    numberNetworksInput.disabled = false;
  }

})

numberNetworksInput.addEventListener('change', (e) => {
  var rowsCant = parseInt(e.target.value)
  var tableContent = '';
  for (let index = 0; index < rowsCant; index++) {
    tableContent += `<tr>
                            <th scope="row">Subred</th>
                            <td>
                              <input type="text" id="subredNo${index+1}" placeholder="Introduzca la cantidad de hosts para la subred ${index+1}">
                              </td>
                          </tr>`
    
  }
  SubNetTable.innerHTML = tableContent;
})
 function CalcularVlsm(){
   var SizeNet = document.getElementById('numberNetworks').value;
   var Ips = document.getElementById('ipTextInput').value;
   Ips = Ips.split('.');
   ////console.log(Ips);
   SizeNet = parseFloat(SizeNet);
   var indice = 0;
   var valorText = 0;
   var hostUsed =0;
   var hostUsed22 = 0, hostUsed33=0;
   var datas = [];
   var IpAddress = "hola",HostInicial ="Dsa",HostFinal="sda",Mascara="dasd";
   var primerip = Ips[0];
   var Segundoip = Ips[1];
   var Tercerip = Ips[2];
   var Tercerip2=0, Tercerip3=0;
   primerip = parseFloat(primerip);
   Segundoip = parseFloat(Segundoip);
   Tercerip = parseFloat(Tercerip);
   var cuartoIp;
   var interador = 1;
   var prefijo = 0;
   for(var i=0;i<SizeNet;i++){
     indice = i + 1;
      valorText = document.getElementById('subredNo'+indice).value;
      //console.log(valorText);
      //IpAddress = Ips[0];
        if(cuartoIp==0){
          Tercerip+=1;
          interador+=1;
        };
      bool = true;
      for(var j = 2; j<=32;j++){
        //console.log("iteracion",i);
        Tercerip2 = Tercerip;
        var LongIp = 0;
        var NumMascara = 0;
        if(valorText<=((2**j)-2)){
          if(i==0){
          cuartoIp= '0';
          HostUI2= '1';
          };
          //obtener el prefijo
          prefijo = 32-j;
          // fin obtener el prefijo
          /////console.log('Prefijo',32-j,"2:n",j);
          // algoritmos para la mascara inicio
          if(j>1 &&  j<=8){
            NumMascara = 256 - (2**j);
            /////console.log("entro: 255.255.255.x", NumMascara);
            Mascara = '255.255.255.'+ NumMascara.toString();
          };
          if(j>8 &&  j<=16){
            if(j==9){Mascara = '255.255.254.0'};
            if(j==10){Mascara = '255.255.252.0'};
            if(j==11){Mascara = '255.255.248.0'};
            if(j==12){Mascara = '255.255.240.0'};
            if(j==13){Mascara = '255.255.224.0'};
            if(j==14){Mascara = '255.255.192.0'};
            if(j==15){Mascara = '255.255.128.0'};
            if(j==16){Mascara = '255.255.0.0'};

          };
          if(j>16 &&  j<=24){
            if(j==17){Mascara = '255.254.0.0'};
            if(j==18){Mascara = '255.252.0.0'};
            if(j==19){Mascara = '255.248.0.0'};
            if(j==20){Mascara = '255.240.0.0'};
            if(j==21){Mascara = '255.224.0.0'};
            if(j==22){Mascara = '255.192.0.0'};
            if(j==23){Mascara = '255.128.0.0'};
            if(j==24){Mascara = '255.0.0.0'};
          };
          if(j>24 &&  j<=32){
            if(j==25){Mascara = '254.0.0.0'};
            if(j==26){Mascara = '252.0.0.0'};
            if(j==27){Mascara = '248.0.0.0'};
            if(j==28){Mascara = '240.0.0.0'};
            if(j==29){Mascara = '224.0.0.0'};
            if(j==30){Mascara = '192.0.0.0'};
            if(j==31){Mascara = '128.0.0.0'};
            if(j==32){Mascara = '0.0.0.0'};
          };
          // algoritmos para la mascara fin
          
          // algoritmos para la Broadcard, ip address y hots útiles inicio
          if((2**j)>=256){
            if(hostUsed>0 && hostUsed<256){
              LongIp=(2**j)/256;
              //console.log(LongIp);
              Tercerip2 =  Tercerip2 + LongIp ;
              cuartoIp= '0';
              HostUI2= '1';
              ///console.log('entro',Tercerip2);
              Tercerip=Tercerip+1;
              hostUsed=0;
            }else{
              LongIp=(2**j)/256;
              ///console.log("tamaño de red",LongIp);
              Tercerip2 =  Tercerip2 + LongIp-1;
              Tercerip3 = Tercerip2;
              cuartoIp= '0';
              HostUI2= '1';
              ///console.log('entro--->256',Tercerip2);
              hostUsed33 = 256;
            };
          }else{
          hostUsed33 += (2**j);
          Tercerip3=Tercerip2;
          };
          // algoritmos para la Broadcard, ip address y hots útiles inicio
          /////console.log("HostFinal",hostUsed33);
          /////console.log(Tercerip);
          /////console.log(valorText, (2**j)-2,'mascara', (256-(2**j)));
          hostUsed = hostUsed + (2**j);
          hostUsed22=hostUsed;
          if(hostUsed22>=256){
            //cuartoIp = (2**j);
            hostUsed=0;
            //hostUsed33=0;
          };
          var hostfinalstring = hostUsed33-2;
          /////console.log("Hostutilies",hostfinalstring,hostUsed33);
          hostfinalstring = hostfinalstring.toString();
          var hostbroadcaststring = hostUsed33-1;
          hostbroadcaststring = hostbroadcaststring.toString();
          //llenado de la data para enviar al array Json
          IpAddress = primerip.toString()+'.'+Segundoip.toString()+'.'+Tercerip.toString()+'.'+cuartoIp;
          HostInicial = primerip.toString()+'.'+Segundoip.toString()+'.'+Tercerip.toString()+'.'+HostUI2;
          HostFinal = primerip.toString()+'.'+Segundoip.toString()+ '.'+Tercerip3.toString()+'.'+ hostfinalstring;
          BroadCast = primerip.toString()+'.'+Segundoip.toString()+ '.'+Tercerip3.toString()+'.' + hostbroadcaststring;
          Mascara;
          // fin de llenado de la data para enviar al array Json
          cuartoIp=hostUsed;
          HostUI2= parseFloat(cuartoIp) + 1;
          HostUI2=HostUI2.toString();
          /////console.log(hostUsed,cuartoIp);
          prefijo = prefijo.toString(); 
          //llenado de la data en un array Json
          datas[i] = {"IdRed":i,"Host":(2**j),"IpAddress": IpAddress ,"Mascara":Mascara,"HostInicial":HostInicial,"HostFinal":HostFinal,"BroadCast":BroadCast,"Prefijo":prefijo};
          // fin de llenadollenado de la data en un array Json 
          Tercerip=Tercerip2;
          if(hostUsed>0 && hostUsed<256 && valorText<256){
          }else{
            hostUsed33 = 0;
          };
          break;
        };
      };
   };
   //console.log(hostUsed);
   console.log(datas);
   document.getElementById('PanelSubNet').innerHTML = `
    <ul>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Red</th>
            <th scope="col">Hosts</th>
            <th scope="col">Ip Address</th>
            <th scope="col">Mascara</th>
            <th scope="col">Hosts Inicio</th>
            <th scope="col">Hosts Final</th>
            <th scope="col">BroadCast</th>
            <th scope="col">Prefijo</th>
          </tr>
        </thead>
        <tbody id="MapsSubsNet">
          
        </tbody>
      </table>
    </ul>
   `;
  for(var i=0;i<datas.length;i++){
      document.getElementById('MapsSubsNet').innerHTML += `
      <tr>
        <td>${datas[i].IdRed}</td>
        <td>${datas[i].Host}</td>
        <td>${datas[i].IpAddress}</td>
        <td>${datas[i].Mascara}</td>
        <td>${datas[i].HostInicial}</td>
        <td>${datas[i].HostFinal}</td>
        <td>${datas[i].BroadCast}</td>
        <td>/ ${datas[i].Prefijo}</td>
      </tr>
    `;
  };
   
 }

function ValidarIP(e){
  console.log("e.value", e)
  key=e.KeyCode || e.which;
  keyboard= String.fromCharCode(key);
  //Reguex="(?:[0-9]{1,3}\.){3}[0-9]{1,3}$";
  ipRegEx='/^[^0]*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$/';
  SpecialChars=[8,13];
  SpecialKeyboard=false;
  
  for (var i in SpecialChars){
    console.log(`i`, i)
    if(key==SpecialChars[i]){
      console.log(`SpecialChars[i]`, SpecialChars[i])
      SpecialKeyboard=true;
      alert("Direccion IP valida");
      break;
    }
  }  

  if(ipRegEx.indexOf(keyboard)==-1 && !SpecialKeyboard){
    alert("Direccion IP no valida");
    return false;
  }
}  



(function() {
  "use strict";

   /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate  glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})()