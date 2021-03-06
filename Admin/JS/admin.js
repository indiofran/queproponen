function CargarLogin()
{
	$('#paneles').load('Templates/login.html', function(a, b, c)
	{
		
	});
}

function VerifyLogin()
{
	$('#loading').fadeIn('fast');
	$.ajax({
	  method: "GET",
	  url: location.origin + location.pathname + "PHP/VerifyLogin.php",
	  data: { hash: leerCookie('login') }
	})
	.done(function( msg ) {
		if(msg == 'No')
		{
			CargarLogin();
			$('#paneles').fadeIn('fast');
			$('#loading').fadeOut('slow');
		}
		else
		{
			CargarCategorias();
			CargarPartidos(-1);
			CargaInicial(false);
			CargarUsuario($.parseJSON(msg));
			$('#paneles').fadeOut('fast');
			$('#paneles').html('');
			$('#loading').fadeOut('slow');
		}
  	});
}

function lg_submit()
{
	$('#loading').fadeIn('fast');
	$.ajax({
	  method: "GET",
	  url: location.origin + location.pathname + "PHP/Login.php",
	  data: { user: document.getElementById('lg-user-input').value, pass: document.getElementById('lg-pass-input').value }
	})
	.done(function( msg ) {
		if(msg == 'No')
			$('.contentContainer').append($(document.createElement('div')).addClass('NoUser'));
		else
		{
			crearCookie('login', $.parseJSON(msg).hash, 1);
			$('.contentContainer').html('');
			CargarPartidos(-1);
			CargarCategorias();
			CargaInicial(false);
			CargarUsuario($.parseJSON(msg));
			$('#paneles').fadeOut('fast');
			$('#paneles').html('');
			$('#loading').fadeOut('slow');
		}
  	});
}

function CerrarPanel()
{
	$('#paneles').stop().fadeOut('slow').html('');
}

function CargarUsuario(usr)
{
	var container = document.createElement('div');
	$(container).addClass('usuarioContainer');
	$('.menu').append(container);
	
	var nombre = document.createElement('div');
	$(nombre).addClass('nombreUsuario');
	$(nombre).html(usr.name);
	$(container).append(nombre);
	
	var botonLogount = document.createElement('div');
	$(botonLogount).addClass('botonLogout');
	$(botonLogount).html('Cerrar Sesión');
	$(botonLogount).click(function(){
		CerrarSesion(usr);
	});
	$(container).append(botonLogount);
}

function CerrarSesion(usr)
{
	borrarCookie('login');
	$('#loading').fadeIn('fast');
	$.ajax({
	  method: "GET",
	  url: location.origin + location.pathname + "PHP/Logout.php",
	  data: { codigo: usr.codigo }
	})
	.done(function( msg ) {
		CargarLogin();
		$('#paneles').fadeIn('fast');
		$('.contentContainer').html('');
		$('.menu').html('');
		$('#loading').fadeOut('slow');
  	});
}