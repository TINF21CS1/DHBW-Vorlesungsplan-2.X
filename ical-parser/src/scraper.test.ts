import { fetch_courses } from "./scraper.js";

test("fetches course IDs from HTML correctly", async () => {
  const course_ids_expected = {
    "WIB18 A": 7401001,
    "WIB18 B": 7402001,
    "WIB18 BI": 7403001,
    "WSTL18 A": 7416001,
    "WSTL18 B": 7417001,
    "WSTL18 C": 7418001,
    "WSTL18 D": 7419001,
    "WIMBIT18 A": 7456001,
    "WIMBIT18 B": 7457001,
    "WIMBIT19 A": 7738001,
    "WIMBIT19 B": 7739001,
    "WIB19 A": 7794001,
    "WIB19 B": 7795001,
    "WSTL19 A": 7801001,
    "WSTL19 B": 7802001,
    "WSTL19 C": 7803001,
    "WSTL19 D": 7804001,
    "WIB19 BI": 7841001,
    "WIMBIT20 A": 8032001,
    "WIMBIT20 B": 8033001,
    "WIB20 A": 8101001,
    "WIB20 Bi": 8102001,
    "WSTL20 A": 8110001,
    "WSTL20 B": 8111001,
    "WSTL20 C": 8112001,
    "WSTL20 D": 8113001,
    "WIB21 A": 8359001,
    "WIB21 BI": 8360001,
    "WSTL21 A": 8368001,
    "WSTL21 B": 8369001,
    "WSTL21 C": 8370001,
    "WSTL21 D": 8371001,
    "WIMBIT21 A": 8385001,
    "WIMBIT21 B": 8386001,
    "WGW18 A": 7395001,
    "WIW18 A": 7410001,
    "WIW18 B": 7411001,
    "WOW18 A": 7414001,
    "WRSW18 AC1": 7452001,
    "WRSW18 AC2": 7453001,
    "WRSW18 ST1": 7454001,
    "WRSW18 ST2": 7455001,
    "WGW19 A": 7782001,
    "WIW19 A": 7787001,
    "WIW19 B": 7788001,
    "WOW19 A": 7799001,
    "WOW19 B": 7800001,
    "WRSW19 AC1": 7821001,
    "WRSW19 AC2": 7822001,
    "WRSW19 ST1": 7823001,
    "WRSW19 ST2": 7824001,
    "WGW20 A": 8090001,
    "WIW20 A": 8094001,
    "WIW20 B": 8095001,
    "WOW20 A": 8108001,
    "WOW20 B": 8109001,
    "WRSW20 AC1": 8129001,
    "WRSW20 AC2": 8130001,
    "WRSW20 ST1": 8131001,
    "WRSW20 ST2": 8132001,
    "GWAG20 .": 8206001,
    "WGW21 A": 8348001,
    "WIW21 A": 8352001,
    "WIW21 B": 8353001,
    "WOW21 A": 8366001,
    "WOW21 B": 8367001,
    "WRSW21 AC1": 8389001,
    "WRSW21 AC2": 8390001,
    "WRSW21 ST1": 8391001,
    "WRSW21 ST2": 8392001,
    "TINF18 AI1": 7430001,
    "TINF18 AI2": 7431001,
    "TINF18 IT1": 7432001,
    "TINF18 IT2": 7433001,
    "TINF19 AI1": 7757001,
    "TINF19 AI2": 7758001,
    "TINF19 CS1": 7759001,
    "TINF19 IT1": 7760001,
    "TINF19 IT2": 7761001,
    "TINF20 AI1": 8062001,
    "TINF20 AI2": 8063001,
    "TINF20 CS1": 8064001,
    "TINF20 IT1": 8065001,
    "TINF20 IT2": 8066001,
    "TINF21 AI1": 8319001,
    "TINF21 AI2": 8320001,
    "TINF21 CS1": 8321001,
    "TINF21 CS2": 8322001,
    "TINF21 IT1": 8323001,
    "TWIW17 TV Pur": 7183001,
    "TWIW17 PL": 7184001,
    "TWIW17 TV/CV": 7185001,
    "TWIW17 EL": 7186001,
    "TWIW18 PL Pur": 7468001,
    "TWIW18 TV": 7469001,
    "TWIW18 CV/PL": 7470001,
    "TWIW18 EL": 7471001,
    "TWIW19 PL": 7774001,
    "TWIW19 TV": 7775001,
    "TWIW19 TV/CV": 7776001,
    "TWIW19 EL": 7777001,
    "TWIW20 A": 8079001,
    "TWIW20 B": 8080001,
    "TWIW20 C": 8081001,
    "TWIW20 D": 8082001,
    "TWIW21 A": 8336001,
    "TWIW21 B": 8337001,
    "TWIW21 C": 8338001,
    "TWIW21 D": 8339001,
    "WVS18 A": 7420001,
    "WVS18 B": 7421001,
    "WVS18 C": 7422001,
    "WVS18 D": 7423001,
    "WVS19 A": 7805001,
    "WVS19 B": 7806001,
    "WVS19 C": 7807001,
    "WVS20 A": 8114001,
    "WVS20 B": 8115001,
    "WVS20 C": 8116001,
    "WVS21 A": 8372001,
    "WVS21 B": 8373001,
    "WVS21 C": 8374001,
    "WMM18 A": 7390001,
    "WMM18B B": 7391001,
    "WMM18 C": 7392001,
    "WHD18 A": 7396001,
    "WHD18 B": 7397001,
    "WHD18 C": 7398001,
    "WHD18 D": 7400001,
    "WHD19 A": 7783001,
    "WHD19 B": 7784001,
    "WHD19 C": 7785001,
    "WHD19 D": 7786001,
    "WMM19 A": 7796001,
    "WMM19 B": 7797001,
    "WMM19 C": 7798001,
    "WDCM20 .": 8088001,
    "WHD20 A": 8091001,
    "WHD20 B": 8092001,
    "WHD20 C": 8093001,
    "WMM20 A": 8103001,
    "WMM20 B": 8104001,
    "WMM20 C": 8105001,
    "WHD21 A": 8349001,
    "WHD21 B": 8350001,
    "WHD21 C": 8351001,
    "WMM21 A": 8361001,
    "WMM21 B": 8362001,
    "WMM21 C": 8363001,
    "WIN18 A": 7404001,
    "WIN18 B": 7405001,
    "WIN18 C": 7406001,
    "WIN18 D": 7407001,
    "WIN18 E": 7408001,
    "WIN18 F": 7409001,
    "WIN19 A": 7789001,
    "WIN19 B": 7790001,
    "WIN19 C": 7791001,
    "WIN19 D": 7792001,
    "WIN19 E": 7793001,
    "WIN20 A": 8096001,
    "WIN20 B": 8097001,
    "WIN20 C": 8098001,
    "WIN20 D": 8099001,
    "WIN20 E": 8100001,
    "WIN21 A": 8354001,
    "WIN21 B": 8355001,
    "WIN21 C": 8356001,
    "WIN21 D": 8357001,
    "WIN21 E": 8358001,
    "WMKE18 A": 7412001,
    "WMKE18 B": 7413001,
    "WMMK18 .": 7450001,
    "WMPG18 .": 7451001,
    "WMKE19 A": 7722001,
    "WMKE19 B": 7723001,
    "WME19 MPG": 7819001,
    "WME19 MMK": 7820001,
    "WMKE20 A": 8106001,
    "WMKE20 B": 8107001,
    "WME20 MPG": 8127001,
    "WME20 MMK": 8128001,
    "WMKE21 A": 8364001,
    "WMKE21 B": 8365001,
    "WME21 MPG": 8387001,
    "WME21 MMK": 8388001,
    "GWAG18 .": 7449001,
    "GWAG19 .": 7778001,
    "WAG20 .": 8083001,
    "GWAG21 .": 8340001,
    "TMT18 AM1": 7443001,
    "TMT18 AM2": 7444001,
    "TMT18 EN1": 7445001,
    "TMT18 EN2": 7446001,
    "TMT18 EW1": 7447001,
    "TMT18 SI1": 7448001,
    "TIE19 PE": 7762001,
    "TIE19 SE": 7763001,
    "TMT19 AM1": 7771001,
    "TMT19 AM2": 7772001,
    "TMT19 EW1": 7773001,
    "TIE19 EN1": 7906001,
    "TIE19 EN2": 7907001,
    "TIE20 EN": 8067001,
    "TIE20 SE": 8068001,
    "TMT20 AM1": 8076001,
    "TMT20 AM2": 8077001,
    "TMT20 EW1": 8078001,
    "TIE21 EN": 8324001,
    "TIE21 SE": 8325001,
    "TMT21 AM1": 8333001,
    "TMT21 AM2": 8334001,
    "TMT21 EW1": 8335001,
    "TCT 18": 7424001,
    "TMB18 A": 7434001,
    "TMB18 B": 7435001,
    "TMB18 C": 7436001,
    "TMB18 D": 7437001,
    "TMB18 F": 7439001,
    "TMB18 G": 7440001,
    "TMB18 HVT": 7441001,
    "TMB18 KVEM": 7442001,
    "TCT 19": 7751001,
    "TMB19 A": 7764001,
    "TMB19 B": 7765001,
    "TMB19 C": 7766001,
    "TMB19 F": 7767001,
    "TMB19 G": 7768001,
    "TMB19 HVT": 7769001,
    "TMB19 KVEM": 7770001,
    "TMB18 BV": 8039001,
    "TMB18 AM1": 8040001,
    "TMB18 AM2": 8041001,
    "TMB18 KT": 8042001,
    "TMB18 PM": 8043001,
    "TMB18 PT": 8044001,
    "TCT 20": 8056001,
    "TMB20 A": 8069001,
    "TMB20 B": 8070001,
    "TMB20 C": 8071001,
    "TMB20 F": 8072001,
    "TMB20 G": 8073001,
    "TMB20 HVT": 8074001,
    "TMB20 KVEM": 8075001,
    "TCT 21": 8312001,
    "TMB21 A": 8326001,
    "TMB21 B": 8327001,
    "TMB21 C": 8328001,
    "TMB21 F": 8329001,
    "TMB21 G": 8330001,
    "TMB21 HVT": 8331001,
    "TMB21 KVEM": 8332001,
    "TMB19 AM1": 8394001,
    "TMB19 AM2": 8395001,
    "TMB19 BV": 8396001,
    "TMB19 PM": 8397001,
    "TMB19 PT": 8398001,
    "TMB19 KT": 8399001,
    "TEL18 AAT": 7425001,
    "TEL18 BAT": 7426001,
    "TEL18 AET": 7427001,
    "TEL18 AEU": 7428001,
    "TEL18 AMD": 7429001,
    "TEL20 A": 8057001,
    "TEL20 B": 8058001,
    "TEL20 C": 8059001,
    "TEL20 D": 8060001,
    "TEL20 E": 8061001,
    "TEL19 AT1": 8210001,
    "TEL19 AT2": 8211001,
    "TEL19 AT3": 8212001,
    "TEL19 EE": 8213001,
    "TEL19 EO": 8214001,
    "TEL19 MED": 8215001,
    "TEL19 EU": 8216001,
    "TEL21 A": 8313001,
    "TEL21 B": 8314001,
    "TEL21 C": 8315001,
    "TEL21 D": 8316001,
    "TEL21 E": 8317001,
    "TEL21 F": 8318001,
    "TEL20 AT1": 8403001,
    "TEL20 AT2": 8404001,
    "TEL20 AT3": 8405001,
    "TEL20 EE": 8406001,
    "TEL20 EU": 8407001,
    "TEL20 MED": 8408001,
    "WFD17 A": 7179001,
    "WFD17 B": 7180001,
    "WBK18 A": 7388001,
    "WBK18 B": 7389001,
    "WFD18 A": 7393001,
    "WFD18 B": 7394001,
    "WBK19 A": 7779001,
    "WBK19 B": 7780001,
    "WFD19 A": 7781001,
    "WBK20 A": 8084001,
    "WBK20 B": 8085001,
    "WFD20 A": 8089001,
    "WBK21 A": 8341001,
    "WBK21 B": 8342001,
    "WFD21 A": 8347001,
    "Pre- WI2018": 7368001,
    "WWI18 AMA": 7458001,
    "WWI18 AMB": 7459001,
    "WWI18 AMC": 7460001,
    "WWI18 DSA": 7461001,
    "WWI18 DSB": 7462001,
    "WWI18 SCA": 7463001,
    "WWI18 SCB": 7464001,
    "WWI18 SEA": 7465001,
    "WWI18 SEB": 7466001,
    "WWI18 SEC": 7467001,
    "Pre- WI2019": 7660001,
    "WWI19 AMA": 7808001,
    "WWI19 AMB": 7809001,
    "WWI19 AMC": 7810001,
    "WWI19 DSA": 7811001,
    "WWI19 DSB": 7812001,
    "WWI19 DSC": 7813001,
    "WWI19 EG/EH": 7814001,
    "WWI19 SCA": 7815001,
    "WWI19 SCB": 7816001,
    "WWI19 SEA": 7817001,
    "WWI19 SEB": 7818001,
    "WWI20 AMA": 8117001,
    "WWI20 AMB": 8118001,
    "WWI20 AMC": 8119001,
    "WWI20 DSA": 8120001,
    "WWI20 DSB": 8121001,
    "WWI20 EG/EH": 8122001,
    "WWI20 SCA": 8123001,
    "WWI20 SCB": 8124001,
    "WWI20 SEA": 8125001,
    "WWI20 SEB": 8126001,
    "WWI21 AMA": 8375001,
    "WWI21 AMB": 8376001,
    "WWI21 AMC": 8377001,
    "WWI21 DSA": 8378001,
    "WWI21 DSB": 8379001,
    "WWI21 EG/EH": 8380001,
    "WWI21 SCA": 8381001,
    "WWI21 SCB": 8382001,
    "WWI21 SEA": 8383001,
    "WWI21 SEB": 8384001,
    "IP (International Program)": 6126001,
    "CAS Masterkurse": 6053001,
  };
  const example_html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n<html lang="de" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n	<title>DHBW - Kurskalender - ICal</title>\n	<meta name="robots" content="noindex, nofollow" />\n	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n	<meta name="viewport" content="width=device-width, initial-scale=1">\n	<link rel="stylesheet" href="cjs/dhwb.css" />\n	<link rel="stylesheet" href="cjs/jquery.mobile.structure-1.0rc2.min.css" />	\n	<script src="cjs/jquery-1.6.4.min.js"></script>\n	<script type="text/javascript" src="cjs/lmcbutton.js"></script>\n	<script src="cjs/jquery.mobile-1.0rc2.min.js"></script>\n	\n	<script>\n	\n	function printUrl(url) {\n	    $('#printFrame').attr('src', url);\n	}\n	</script>\n	\n	\n	<script type="text/javascript">\n		\n		//Redirect to correct download direction\n		function call_ics()\n		{\n			var e = document.getElementById("class_select").selectedIndex;\n			var url = document.getElementById("class_select").options[e].value;\n			window.location.assign("ical.php?uid="+url);\n		}\n		\n		function call_faq()\n		{\n			window.location.assign("faq.php");\n		}\n		\n		//Used to display the URL of the downloadable ICAL file after selecting a course\n		function displayURL()\n		{\n			id = document.getElementById("class_select").value;\n			url_string="http://vorlesungsplan.dhbw-mannheim.de/ical.php?uid="+id;\n			document.getElementById("input_id").value = url_string;	\n		}\n		\n	</script>\n	\n	\n	<style>\n		.ui-li-static.ui-li {\n			/*padding:0.5em 5px;\n			font-size:13px;*/\n		}\n\n	</style>\n	\n	\n</head>\n<body>\n<div data-role="page" data-theme="a">\n\n		<center>\n		<div data-role="header" data-theme="a" alignment="center">\n				<div style="text-align:center;">\n				<div class="header-txt-c">\n					<h1>ICal Export</h1>\n					<span class="ui-btn-inline"><span class="header-txt-r">27.05.2022</span></span>\n				</div>\n				<a class="logo" href="index.php"><img src="cjs/images/logo.png" /></a>\n				<div data-role="fieldcontain" class="ui-hide-label" style="position:absolute;right:15px;top:10px;width:300px;">\n				<span class="ui-btn-inline"><span class="header-txt-r">Für Rückfragen:</br>dhbw.beta.kalender@outlook.com</span></span>\n				</div>\n			</div>\n		</div>\n\n        <div class="message-box-middle ui-corner-all">\n            Diese Schnittstelle erlaubt es Ihnen, den Inhalt Ihres Kalenders als ICS Datei zu exportieren, um weiterhin das Kalenderprogramm Ihrer Wahl zu nutzen.\n            Bitte wählen Sie dazu zunächst Ihren Kurs aus. Wenn das gewünschte Zielprogramm dies ermöglicht, kopieren Sie bitte einfach die angezeigte URL und\n            fügen diese als Fremdquelle Ihrem Kalendersystem hinzu. Viele Programme laden beim Start automatisch die aktuelle ICS Datei herunter und überprüfen diese\n            auf Änderungen.<br><br>\n            Sollte Ihr Kalender dies nicht unterstützen, so können Sie außerdem über einen Klick auf den Button 'Download' eine ICAL Datei auf dem herkömmlichen Wege\n            herunterladen und Ihrem Kalender hinzufügen. Bitte beachten Sie, dass in diesem Fall keine Änderungsbenachrichtungen erfolgen.<br><br>\n            Genauere Informationen zu den gängigsten Kalender Programmen entnehmen Sie bitte der Anleitung.\n        </div>\n		<br><br>\n		<div data-role="content" style="text-align:center; width:40%">\n		<table style="width:100%">\n			\n			<tr align="center">\n				\n				<td align="center">\n		\n		\n		<form id="class_form" ><select  onChange="displayURL()" id="class_select" name="Kurse" size="1" ><option  label="Kurs auswählen" value="Kurs auswählen">Kurs auswählen</option><optgroup label="Kurse WIB, WSTL, WIMBIT"><option label="WIB18 A" value="7401001">WIB18 A</option><option label="WIB18 B" value="7402001">WIB18 B</option><option label="WIB18 BI" value="7403001">WIB18 BI</option><option label="WSTL18 A" value="7416001">WSTL18 A</option><option label="WSTL18 B" value="7417001">WSTL18 B</option><option label="WSTL18 C" value="7418001">WSTL18 C</option><option label="WSTL18 D" value="7419001">WSTL18 D</option><option label="WIMBIT18 A" value="7456001">WIMBIT18 A</option><option label="WIMBIT18 B" value="7457001">WIMBIT18 B</option><option label="WIMBIT19 A" value="7738001">WIMBIT19 A</option><option label="WIMBIT19 B" value="7739001">WIMBIT19 B</option><option label="WIB19 A" value="7794001">WIB19 A</option><option label="WIB19 B" value="7795001">WIB19 B</option><option label="WSTL19 A" value="7801001">WSTL19 A</option><option label="WSTL19 B" value="7802001">WSTL19 B</option><option label="WSTL19 C" value="7803001">WSTL19 C</option><option label="WSTL19 D" value="7804001">WSTL19 D</option><option label="WIB19 BI" value="7841001">WIB19 BI</option><option label="WIMBIT20 A" value="8032001">WIMBIT20 A</option><option label="WIMBIT20 B" value="8033001">WIMBIT20 B</option><option label="WIB20 A" value="8101001">WIB20 A</option><option label="WIB20 Bi" value="8102001">WIB20 Bi</option><option label="WSTL20 A" value="8110001">WSTL20 A</option><option label="WSTL20 B" value="8111001">WSTL20 B</option><option label="WSTL20 C" value="8112001">WSTL20 C</option><option label="WSTL20 D" value="8113001">WSTL20 D</option><option label="WIB21 A" value="8359001">WIB21 A</option><option label="WIB21 BI" value="8360001">WIB21 BI</option><option label="WSTL21 A" value="8368001">WSTL21 A</option><option label="WSTL21 B" value="8369001">WSTL21 B</option><option label="WSTL21 C" value="8370001">WSTL21 C</option><option label="WSTL21 D" value="8371001">WSTL21 D</option><option label="WIMBIT21 A" value="8385001">WIMBIT21 A</option><option label="WIMBIT21 B" value="8386001">WIMBIT21 B</option><optgroup label="Kurse WOW, WWF, WGW, WST, WIW, WRSW"><option label="WGW18 A" value="7395001">WGW18 A</option><option label="WIW18 A" value="7410001">WIW18 A</option><option label="WIW18 B" value="7411001">WIW18 B</option><option label="WOW18 A" value="7414001">WOW18 A</option><option label="WRSW18 AC1" value="7452001">WRSW18 AC1</option><option label="WRSW18 AC2" value="7453001">WRSW18 AC2</option><option label="WRSW18 ST1" value="7454001">WRSW18 ST1</option><option label="WRSW18 ST2" value="7455001">WRSW18 ST2</option><option label="WGW19 A" value="7782001">WGW19 A</option><option label="WIW19 A" value="7787001">WIW19 A</option><option label="WIW19 B" value="7788001">WIW19 B</option><option label="WOW19 A" value="7799001">WOW19 A</option><option label="WOW19 B" value="7800001">WOW19 B</option><option label="WRSW19 AC1" value="7821001">WRSW19 AC1</option><option label="WRSW19 AC2" value="7822001">WRSW19 AC2</option><option label="WRSW19 ST1" value="7823001">WRSW19 ST1</option><option label="WRSW19 ST2" value="7824001">WRSW19 ST2</option><option label="WGW20 A" value="8090001">WGW20 A</option><option label="WIW20 A" value="8094001">WIW20 A</option><option label="WIW20 B" value="8095001">WIW20 B</option><option label="WOW20 A" value="8108001">WOW20 A</option><option label="WOW20 B" value="8109001">WOW20 B</option><option label="WRSW20 AC1" value="8129001">WRSW20 AC1</option><option label="WRSW20 AC2" value="8130001">WRSW20 AC2</option><option label="WRSW20 ST1" value="8131001">WRSW20 ST1</option><option label="WRSW20 ST2" value="8132001">WRSW20 ST2</option><option label="GWAG20 ." value="8206001">GWAG20 .</option><option label="WGW21 A" value="8348001">WGW21 A</option><option label="WIW21 A" value="8352001">WIW21 A</option><option label="WIW21 B" value="8353001">WIW21 B</option><option label="WOW21 A" value="8366001">WOW21 A</option><option label="WOW21 B" value="8367001">WOW21 B</option><option label="WRSW21 AC1" value="8389001">WRSW21 AC1</option><option label="WRSW21 AC2" value="8390001">WRSW21 AC2</option><option label="WRSW21 ST1" value="8391001">WRSW21 ST1</option><option label="WRSW21 ST2" value="8392001">WRSW21 ST2</option><optgroup label="Kurse TINF,TAI,TIT"><option label="TINF18 AI1" value="7430001">TINF18 AI1</option><option label="TINF18 AI2" value="7431001">TINF18 AI2</option><option label="TINF18 IT1" value="7432001">TINF18 IT1</option><option label="TINF18 IT2" value="7433001">TINF18 IT2</option><option label="TINF19 AI1" value="7757001">TINF19 AI1</option><option label="TINF19 AI2" value="7758001">TINF19 AI2</option><option label="TINF19 CS1" value="7759001">TINF19 CS1</option><option label="TINF19 IT1" value="7760001">TINF19 IT1</option><option label="TINF19 IT2" value="7761001">TINF19 IT2</option><option label="TINF20 AI1" value="8062001">TINF20 AI1</option><option label="TINF20 AI2" value="8063001">TINF20 AI2</option><option label="TINF20 CS1" value="8064001">TINF20 CS1</option><option label="TINF20 IT1" value="8065001">TINF20 IT1</option><option label="TINF20 IT2" value="8066001">TINF20 IT2</option><option label="TINF21 AI1" value="8319001">TINF21 AI1</option><option label="TINF21 AI2" value="8320001">TINF21 AI2</option><option label="TINF21 CS1" value="8321001">TINF21 CS1</option><option label="TINF21 CS2" value="8322001">TINF21 CS2</option><option label="TINF21 IT1" value="8323001">TINF21 IT1</option><optgroup label="Kurse TWIW"><option label="TWIW17 TV Pur" value="7183001">TWIW17 TV Pur</option><option label="TWIW17 PL" value="7184001">TWIW17 PL</option><option label="TWIW17 TV/CV" value="7185001">TWIW17 TV/CV</option><option label="TWIW17 EL" value="7186001">TWIW17 EL</option><option label="TWIW18 PL Pur" value="7468001">TWIW18 PL Pur</option><option label="TWIW18 TV" value="7469001">TWIW18 TV</option><option label="TWIW18 CV/PL" value="7470001">TWIW18 CV/PL</option><option label="TWIW18 EL" value="7471001">TWIW18 EL</option><option label="TWIW19 PL" value="7774001">TWIW19 PL</option><option label="TWIW19 TV" value="7775001">TWIW19 TV</option><option label="TWIW19 TV/CV" value="7776001">TWIW19 TV/CV</option><option label="TWIW19 EL" value="7777001">TWIW19 EL</option><option label="TWIW20 A" value="8079001">TWIW20 A</option><option label="TWIW20 B" value="8080001">TWIW20 B</option><option label="TWIW20 C" value="8081001">TWIW20 C</option><option label="TWIW20 D" value="8082001">TWIW20 D</option><option label="TWIW21 A" value="8336001">TWIW21 A</option><option label="TWIW21 B" value="8337001">TWIW21 B</option><option label="TWIW21 C" value="8338001">TWIW21 C</option><option label="TWIW21 D" value="8339001">TWIW21 D</option><optgroup label="Kurse WVS "><option label="WVS18 A" value="7420001">WVS18 A</option><option label="WVS18 B" value="7421001">WVS18 B</option><option label="WVS18 C" value="7422001">WVS18 C</option><option label="WVS18 D" value="7423001">WVS18 D</option><option label="WVS19 A" value="7805001">WVS19 A</option><option label="WVS19 B" value="7806001">WVS19 B</option><option label="WVS19 C" value="7807001">WVS19 C</option><option label="WVS20 A" value="8114001">WVS20 A</option><option label="WVS20 B" value="8115001">WVS20 B</option><option label="WVS20 C" value="8116001">WVS20 C</option><option label="WVS21 A" value="8372001">WVS21 A</option><option label="WVS21 B" value="8373001">WVS21 B</option><option label="WVS21 C" value="8374001">WVS21 C</option><optgroup label="Kurse WHD, WMM"><option label="WMM18 A" value="7390001">WMM18 A</option><option label="WMM18B B" value="7391001">WMM18B B</option><option label="WMM18 C" value="7392001">WMM18 C</option><option label="WHD18 A" value="7396001">WHD18 A</option><option label="WHD18 B" value="7397001">WHD18 B</option><option label="WHD18 C" value="7398001">WHD18 C</option><option label="WHD18 D" value="7400001">WHD18 D</option><option label="WHD19 A" value="7783001">WHD19 A</option><option label="WHD19 B" value="7784001">WHD19 B</option><option label="WHD19 C" value="7785001">WHD19 C</option><option label="WHD19 D" value="7786001">WHD19 D</option><option label="WMM19 A" value="7796001">WMM19 A</option><option label="WMM19 B" value="7797001">WMM19 B</option><option label="WMM19 C" value="7798001">WMM19 C</option><option label="WDCM20 ." value="8088001">WDCM20 .</option><option label="WHD20 A" value="8091001">WHD20 A</option><option label="WHD20 B" value="8092001">WHD20 B</option><option label="WHD20 C" value="8093001">WHD20 C</option><option label="WMM20 A" value="8103001">WMM20 A</option><option label="WMM20 B" value="8104001">WMM20 B</option><option label="WMM20 C" value="8105001">WMM20 C</option><option label="WHD21 A" value="8349001">WHD21 A</option><option label="WHD21 B" value="8350001">WHD21 B</option><option label="WHD21 C" value="8351001">WHD21 C</option><option label="WMM21 A" value="8361001">WMM21 A</option><option label="WMM21 B" value="8362001">WMM21 B</option><option label="WMM21 C" value="8363001">WMM21 C</option><optgroup label="Kurse WIN"><option label="WIN18 A" value="7404001">WIN18 A</option><option label="WIN18 B" value="7405001">WIN18 B</option><option label="WIN18 C" value="7406001">WIN18 C</option><option label="WIN18 D" value="7407001">WIN18 D</option><option label="WIN18 E" value="7408001">WIN18 E</option><option label="WIN18 F" value="7409001">WIN18 F</option><option label="WIN19 A" value="7789001">WIN19 A</option><option label="WIN19 B" value="7790001">WIN19 B</option><option label="WIN19 C" value="7791001">WIN19 C</option><option label="WIN19 D" value="7792001">WIN19 D</option><option label="WIN19 E" value="7793001">WIN19 E</option><option label="WIN20 A" value="8096001">WIN20 A</option><option label="WIN20 B" value="8097001">WIN20 B</option><option label="WIN20 C" value="8098001">WIN20 C</option><option label="WIN20 D" value="8099001">WIN20 D</option><option label="WIN20 E" value="8100001">WIN20 E</option><option label="WIN21 A" value="8354001">WIN21 A</option><option label="WIN21 B" value="8355001">WIN21 B</option><option label="WIN21 C" value="8356001">WIN21 C</option><option label="WIN21 D" value="8357001">WIN21 D</option><option label="WIN21 E" value="8358001">WIN21 E</option><optgroup label="Kurse WMKE, WMMK, WMPG"><option label="WMKE18 A" value="7412001">WMKE18 A</option><option label="WMKE18 B" value="7413001">WMKE18 B</option><option label="WMMK18 ." value="7450001">WMMK18 .</option><option label="WMPG18 ." value="7451001">WMPG18 .</option><option label="WMKE19 A" value="7722001">WMKE19 A</option><option label="WMKE19 B" value="7723001">WMKE19 B</option><option label="WME19 MPG" value="7819001">WME19 MPG</option><option label="WME19 MMK" value="7820001">WME19 MMK</option><option label="WMKE20 A" value="8106001">WMKE20 A</option><option label="WMKE20 B" value="8107001">WMKE20 B</option><option label="WME20 MPG" value="8127001">WME20 MPG</option><option label="WME20 MMK" value="8128001">WME20 MMK</option><option label="WMKE21 A" value="8364001">WMKE21 A</option><option label="WMKE21 B" value="8365001">WMKE21 B</option><option label="WME21 MPG" value="8387001">WME21 MPG</option><option label="WME21 MMK" value="8388001">WME21 MMK</option><optgroup label="Kurse GWAG"><option label="GWAG18 ." value="7449001">GWAG18 .</option><option label="GWAG19 ." value="7778001">GWAG19 .</option><option label="WAG20 ." value="8083001">WAG20 .</option><option label="GWAG20 ." value="8206001">GWAG20 .</option><option label="GWAG21 ." value="8340001">GWAG21 .</option><optgroup label="Kurse TMT,TEN"><option label="TMT18 AM1" value="7443001">TMT18 AM1</option><option label="TMT18 AM2" value="7444001">TMT18 AM2</option><option label="TMT18 EN1" value="7445001">TMT18 EN1</option><option label="TMT18 EN2" value="7446001">TMT18 EN2</option><option label="TMT18 EW1" value="7447001">TMT18 EW1</option><option label="TMT18 SI1" value="7448001">TMT18 SI1</option><option label="TIE19 PE" value="7762001">TIE19 PE</option><option label="TIE19 SE" value="7763001">TIE19 SE</option><option label="TMT19 AM1" value="7771001">TMT19 AM1</option><option label="TMT19 AM2" value="7772001">TMT19 AM2</option><option label="TMT19 EW1" value="7773001">TMT19 EW1</option><option label="TIE19 EN1" value="7906001">TIE19 EN1</option><option label="TIE19 EN2" value="7907001">TIE19 EN2</option><option label="TIE20 EN" value="8067001">TIE20 EN</option><option label="TIE20 SE" value="8068001">TIE20 SE</option><option label="TMT20 AM1" value="8076001">TMT20 AM1</option><option label="TMT20 AM2" value="8077001">TMT20 AM2</option><option label="TMT20 EW1" value="8078001">TMT20 EW1</option><option label="TIE21 EN" value="8324001">TIE21 EN</option><option label="TIE21 SE" value="8325001">TIE21 SE</option><option label="TMT21 AM1" value="8333001">TMT21 AM1</option><option label="TMT21 AM2" value="8334001">TMT21 AM2</option><option label="TMT21 EW1" value="8335001">TMT21 EW1</option><optgroup label="Kurse TMB, TCT"><option label="TCT 18" value="7424001">TCT 18</option><option label="TMB18 A" value="7434001">TMB18 A</option><option label="TMB18 B" value="7435001">TMB18 B</option><option label="TMB18 C" value="7436001">TMB18 C</option><option label="TMB18 D" value="7437001">TMB18 D</option><option label="TMB18 F" value="7439001">TMB18 F</option><option label="TMB18 G" value="7440001">TMB18 G</option><option label="TMB18 HVT" value="7441001">TMB18 HVT</option><option label="TMB18 KVEM" value="7442001">TMB18 KVEM</option><option label="TCT 19" value="7751001">TCT 19</option><option label="TMB19 A" value="7764001">TMB19 A</option><option label="TMB19 B" value="7765001">TMB19 B</option><option label="TMB19 C" value="7766001">TMB19 C</option><option label="TMB19 F" value="7767001">TMB19 F</option><option label="TMB19 G" value="7768001">TMB19 G</option><option label="TMB19 HVT" value="7769001">TMB19 HVT</option><option label="TMB19 KVEM" value="7770001">TMB19 KVEM</option><option label="TMB18 BV" value="8039001">TMB18 BV</option><option label="TMB18 AM1" value="8040001">TMB18 AM1</option><option label="TMB18 AM2" value="8041001">TMB18 AM2</option><option label="TMB18 KT" value="8042001">TMB18 KT</option><option label="TMB18 PM" value="8043001">TMB18 PM</option><option label="TMB18 PT" value="8044001">TMB18 PT</option><option label="TCT 20" value="8056001">TCT 20</option><option label="TMB20 A" value="8069001">TMB20 A</option><option label="TMB20 B" value="8070001">TMB20 B</option><option label="TMB20 C" value="8071001">TMB20 C</option><option label="TMB20 F" value="8072001">TMB20 F</option><option label="TMB20 G" value="8073001">TMB20 G</option><option label="TMB20 HVT" value="8074001">TMB20 HVT</option><option label="TMB20 KVEM" value="8075001">TMB20 KVEM</option><option label="TCT 21" value="8312001">TCT 21</option><option label="TMB21 A" value="8326001">TMB21 A</option><option label="TMB21 B" value="8327001">TMB21 B</option><option label="TMB21 C" value="8328001">TMB21 C</option><option label="TMB21 F" value="8329001">TMB21 F</option><option label="TMB21 G" value="8330001">TMB21 G</option><option label="TMB21 HVT" value="8331001">TMB21 HVT</option><option label="TMB21 KVEM" value="8332001">TMB21 KVEM</option><option label="TMB19 AM1" value="8394001">TMB19 AM1</option><option label="TMB19 AM2" value="8395001">TMB19 AM2</option><option label="TMB19 BV" value="8396001">TMB19 BV</option><option label="TMB19 PM" value="8397001">TMB19 PM</option><option label="TMB19 PT" value="8398001">TMB19 PT</option><option label="TMB19 KT" value="8399001">TMB19 KT</option><optgroup label="Kurse TEL"><option label="TEL18 AAT" value="7425001">TEL18 AAT</option><option label="TEL18 BAT" value="7426001">TEL18 BAT</option><option label="TEL18 AET" value="7427001">TEL18 AET</option><option label="TEL18 AEU" value="7428001">TEL18 AEU</option><option label="TEL18 AMD" value="7429001">TEL18 AMD</option><option label="TEL20 A" value="8057001">TEL20 A</option><option label="TEL20 B" value="8058001">TEL20 B</option><option label="TEL20 C" value="8059001">TEL20 C</option><option label="TEL20 D" value="8060001">TEL20 D</option><option label="TEL20 E" value="8061001">TEL20 E</option><option label="TEL19 AT1" value="8210001">TEL19 AT1</option><option label="TEL19 AT2" value="8211001">TEL19 AT2</option><option label="TEL19 AT3" value="8212001">TEL19 AT3</option><option label="TEL19 EE" value="8213001">TEL19 EE</option><option label="TEL19 EO" value="8214001">TEL19 EO</option><option label="TEL19 MED" value="8215001">TEL19 MED</option><option label="TEL19 EU" value="8216001">TEL19 EU</option><option label="TEL21 A" value="8313001">TEL21 A</option><option label="TEL21 B" value="8314001">TEL21 B</option><option label="TEL21 C" value="8315001">TEL21 C</option><option label="TEL21 D" value="8316001">TEL21 D</option><option label="TEL21 E" value="8317001">TEL21 E</option><option label="TEL21 F" value="8318001">TEL21 F</option><option label="TEL20 AT1" value="8403001">TEL20 AT1</option><option label="TEL20 AT2" value="8404001">TEL20 AT2</option><option label="TEL20 AT3" value="8405001">TEL20 AT3</option><option label="TEL20 EE" value="8406001">TEL20 EE</option><option label="TEL20 EU" value="8407001">TEL20 EU</option><option label="TEL20 MED" value="8408001">TEL20 MED</option><optgroup label="Kurse WBK, WFDL"><option label="WFD17 A" value="7179001">WFD17 A</option><option label="WFD17 B" value="7180001">WFD17 B</option><option label="WBK18 A" value="7388001">WBK18 A</option><option label="WBK18 B" value="7389001">WBK18 B</option><option label="WFD18 A" value="7393001">WFD18 A</option><option label="WFD18 B" value="7394001">WFD18 B</option><option label="WBK19 A" value="7779001">WBK19 A</option><option label="WBK19 B" value="7780001">WBK19 B</option><option label="WFD19 A" value="7781001">WFD19 A</option><option label="WBK20 A" value="8084001">WBK20 A</option><option label="WBK20 B" value="8085001">WBK20 B</option><option label="WFD20 A" value="8089001">WFD20 A</option><option label="WBK21 A" value="8341001">WBK21 A</option><option label="WBK21 B" value="8342001">WBK21 B</option><option label="WFD21 A" value="8347001">WFD21 A</option><optgroup label="Kurse WWI"><option label="Pre- WI2018" value="7368001">Pre- WI2018</option><option label="WWI18 AMA" value="7458001">WWI18 AMA</option><option label="WWI18 AMB" value="7459001">WWI18 AMB</option><option label="WWI18 AMC" value="7460001">WWI18 AMC</option><option label="WWI18 DSA" value="7461001">WWI18 DSA</option><option label="WWI18 DSB" value="7462001">WWI18 DSB</option><option label="WWI18 SCA" value="7463001">WWI18 SCA</option><option label="WWI18 SCB" value="7464001">WWI18 SCB</option><option label="WWI18 SEA" value="7465001">WWI18 SEA</option><option label="WWI18 SEB" value="7466001">WWI18 SEB</option><option label="WWI18 SEC" value="7467001">WWI18 SEC</option><option label="Pre- WI2019" value="7660001">Pre- WI2019</option><option label="WWI19 AMA" value="7808001">WWI19 AMA</option><option label="WWI19 AMB" value="7809001">WWI19 AMB</option><option label="WWI19 AMC" value="7810001">WWI19 AMC</option><option label="WWI19 DSA" value="7811001">WWI19 DSA</option><option label="WWI19 DSB" value="7812001">WWI19 DSB</option><option label="WWI19 DSC" value="7813001">WWI19 DSC</option><option label="WWI19 EG/EH" value="7814001">WWI19 EG/EH</option><option label="WWI19 SCA" value="7815001">WWI19 SCA</option><option label="WWI19 SCB" value="7816001">WWI19 SCB</option><option label="WWI19 SEA" value="7817001">WWI19 SEA</option><option label="WWI19 SEB" value="7818001">WWI19 SEB</option><option label="WWI20 AMA" value="8117001">WWI20 AMA</option><option label="WWI20 AMB" value="8118001">WWI20 AMB</option><option label="WWI20 AMC" value="8119001">WWI20 AMC</option><option label="WWI20 DSA" value="8120001">WWI20 DSA</option><option label="WWI20 DSB" value="8121001">WWI20 DSB</option><option label="WWI20 EG/EH" value="8122001">WWI20 EG/EH</option><option label="WWI20 SCA" value="8123001">WWI20 SCA</option><option label="WWI20 SCB" value="8124001">WWI20 SCB</option><option label="WWI20 SEA" value="8125001">WWI20 SEA</option><option label="WWI20 SEB" value="8126001">WWI20 SEB</option><option label="WWI21 AMA" value="8375001">WWI21 AMA</option><option label="WWI21 AMB" value="8376001">WWI21 AMB</option><option label="WWI21 AMC" value="8377001">WWI21 AMC</option><option label="WWI21 DSA" value="8378001">WWI21 DSA</option><option label="WWI21 DSB" value="8379001">WWI21 DSB</option><option label="WWI21 EG/EH" value="8380001">WWI21 EG/EH</option><option label="WWI21 SCA" value="8381001">WWI21 SCA</option><option label="WWI21 SCB" value="8382001">WWI21 SCB</option><option label="WWI21 SEA" value="8383001">WWI21 SEA</option><option label="WWI21 SEB" value="8384001">WWI21 SEB</option><optgroup label="IP ( International Program)"><option label="IP (International Program)" value="6126001">IP (International Program)</option><optgroup label="Kurse CAS Master"><option label="CAS Masterkurse" value="6053001">CAS Masterkurse</option><optgroup label="Kurse TIE"><option label="TIE19 SE" value="7763001">TIE19 SE</option><option label="TIE19 EN1" value="7906001">TIE19 EN1</option><option label="TIE19 EN2" value="7907001">TIE19 EN2</option><option label="TIE20 EN" value="8067001">TIE20 EN</option><option label="TIE20 SE" value="8068001">TIE20 SE</option><option label="TIE21 EN" value="8324001">TIE21 EN</option><option label="TIE21 SE" value="8325001">TIE21 SE</option></select></td></tr><tr align="center"><td align="center"><input style="text-align:center;" align="center" type="text" id="input_id" name="urlbox"></td></tr><tr align="center"><td align="center"><br><button class="cal-group ui-btn ui-btn-corner-all ui-shadow ui-btn-up-b" data-role="button" data-inline="true" data-theme="b" onclick="call_ics()" id="download_ics">Download ICS File</button>		<button class="cal-group ui-btn ui-btn-corner-all ui-shadow ui-btn-up-b" data-role="button" data-inline="true" data-theme="b" onclick="call_faq()" id="download_faq">Anleitung</button>\n		 </td></tr></form></table></div></center>\n\n</div>\n<div class="footer-txt-r">\n<span>Entwickelt im Rahmen einer Studienarbeit in der Angewandten Informatik von Lucas Hildebrandt und Christian Lohr.</span>\n</div>\n</body>\n</html>`;
  // overwrite fetch() with example_html:
  let real_fetch = fetch;
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      text: () => Promise.resolve(example_html),
    })
  );
  let courses = await fetch_courses();
  global.fetch = real_fetch;
  expect(courses).toEqual(course_ids_expected);
});
