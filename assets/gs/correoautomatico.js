function EnviarEmail(e) {

    //este codigo va en el editor de secuencias en una hoja de excel.
    // Se ejecuta cuando el cliente termina de llenar el formulario de registro
  
    //Variables de las respuestas de la encuesta
    var marcaTemporal	= e.values[0];
    var nombre	= e.values[1];
    var correo	= e.values[6];
    var telefono	= e.values[4];
    
    // Nombre del asunto del correo
    var asuntoNombre = "Confirmacion Solicitud Colaborador TECKAPP";
    
    //Cuerpo del correo
    var htmlBody = "<p>Estimado : <strong>" +nombre+ "</strong></p>"+
  "<p>Su solicitud para formar parte del Equipo <strong>TECKAPP</strong> ha sido recibida con exito, ahora entra en el proceso de revision de su documentacion. Una vez obtenida la revision, se le hara conocer el resultado a su correo electronico : <strong>"+correo+"</strong> o ha su numero de telefono :<strong>"+telefono+"</strong></p>"+
  "<p>Gracias por querer formar parte de nuestro equipo, favor estar pendiente de los medios antes mencionados.&nbsp;</p>"+
  "<p>&nbsp;</p>"+
  "<p>TECKAPP la mejor opcion para tu negocio.</p>"
  
    // Destinatarios
    var destinatarioTo = correo;
    // Destinatarios en copia oculta
    var destinmatarioCC = correo;
    
    //Notificacion del correo electronico
    MailApp.sendEmail({
      to: destinatarioTo,
      cc: destinmatarioCC,
      subject: asuntoNombre,
      name: "TEACKPP RRHH",
      htmlBody: htmlBody
    });
  
  }