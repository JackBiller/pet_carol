/** Arquivo de Funções genericas para ajudar na parametrização da aplicação */

function resolvGrade(data, option){
	/*
		option = {
			inputs: [
				{ head: '', param: '', align: '', alignHead: '' }
			],
			ck_edit: (0|1)
			ck_delete: (0|1)
			div: '#id'
			descForm: ''
		}
	*/
	if (typeof(data) == 'string') {
		try {
			data = JSON.parse(data);
		} catch(e){
			return false;
		}
	}
	var grade = '<br>' + data[0].debug;
	if (data[0].debug == "OK"){
		grade = ""
			+ 	"<br>"
			+ 	"<table class='table' border='1'>"
			+ 		"<thead>"
			+ 			"<tr>"
			+ (function(array){
				var html = '';
				for (var i = 0; i < array.length; i++) 
					html += "<td align='" + (array[i].alignHead || (array[i].align || 'center')) + "' class='padraoLinha'>"
						+ 		"<b>" + array[i].head + "</b>"
						+ 	"</td>"
				return html;
			}(option.inputs))
			+ (!(option.ck_edit 	|| false) ? "" : "<td align='center' class='padraoLinha'><b></b></td>")
			+ (!(option.ck_delete 	|| false) ? "" : "<td align='center' class='padraoLinha'><b></b></td>")
			+ 			"</tr>"
			+ 		"</thead>"
			+ 		"<tbody>"

		for (var i = 0; i < data.length; i++) {
			grade += ""
				+ 		"<tr>"
				+ (function(dataI, array){
					var html = '';
					for (var i = 0; i < array.length; i++) 
						html += "<td align='" + (array[i].align || 'left') + "' class='padraoLinha'>" + dataI[array[i].param] + "</td>"
					return html;
				}(data[i], option.inputs))
				+ (!(option.ck_edit || false) ? "" : ""
					+ 		"<td align='center' class='padraoLinha'>"
					+ 			"<a href='#' style='color:orange' onclick='editar" + capitalize(option.descForm || '') + "(" + i + ");'>"
					+ 				"<i class='fa fa-pencil'></i>"
					+ 			"</a>"
					+ 		"</td>"
				)
				+ (!(option.ck_delete || false) ? "" : ""
					+ 		"<td align='center' class='padraoLinha'>"
					+ 			"<a href='#' style='color:red' onclick='apagar" + capitalize(option.descForm || '') + "(" + i + ");'>"
					+ 				"<i class='fa fa-times'></i>"
					+ 			"</a>"
					+ 		"</td>"
				)
				+ 		"</tr>"
		}
		grade += ""
			+ 		"</tbody>"
			+ 	"</table>"
	}
	$((option.div || '')).html(grade);
	return true;
}


function resolvAbaMenu(array){
	var html = '';
	for (var i = 0; i < array.length; i++) {
		html += ""
			+ 	"<div class='col-md-3 col-sm-6 col-xs-12' data-file='" + array[i].file + "'"
			+ 		"onclick='abrirConteudo(this, \"" + array[i].desc + "\"" 
			+ 			(arguments.length > 1 ? "," + arguments[1] : '') + ");'"
			+ 	">"
			+ 		"<div class='box box-solid box-default' data-widget='box-widget'>"
			+ 			"<div class='box-header'>"
			+ 				"<h3 class='box-title'>"+array[i].desc+"</h3>"
			+ 			"</div>"
			+ 			"<div class='box-body'>"
			+ 				"<center>"
			+ 					((array[i].icon || '') == '' ? "" : "<img src='img/icones/" + array[i].icon + "' width='40%'><br>")
			+ 				"</center>"
			+ 			"</div>"
			+ 		"</div>"
			+ 	"</div>"
	}
	$("#conteudoAbaMenu").html(html);
}


function ajax(option){
	$.ajax({
		  url: 		'controller/controller.php'
		, type: 	'POST'
		, dataType: 'text'
		, data: 	$.extend({}, usuario_Global, (option.param || {}))
		, error: 	(option.erro || function(){ alert('Falha ao fazer a requisição!'); })
	}).done((option.done || function () {}));
}

function mudarPagina(el, divId, name, nameDiv) {
	var elementoMenu = document.getElementsByName(name);
	var elementoContMenu = document.getElementsByName(nameDiv);
	for (var i = 0; i < elementoMenu.length; i++) {
		elementoMenu[i].className = "";
		elementoContMenu[i].style.display = "none";
	}
	$(el)[0].className = "active";
	$("#" + divId)[0].style.display = "block";
}

function capitalize(s){
	if (typeof s !== 'string') return ''
	return s.charAt(0).toUpperCase() + s.slice(1)
}





function paramCapitalize(descricao){
	descricao = tirarAcentuacao((descricao || '')).toLowerCase().replace(/ /g , "_").replace(/-/g, "");
	descricao = descricao.split('');
	descricao[0] = descricao[0].toUpperCase();
	descricao = descricao.join('');
	return descricao;
}

function tirarAcentuacao(texto){
	texto = texto.replace(/á/g, "a");
	texto = texto.replace(/à/g, "a");
	texto = texto.replace(/ã/g, "a");
	texto = texto.replace(/ä/g, "a");
	texto = texto.replace(/â/g, "a");
	texto = texto.replace(/Ã/g, "A");
	texto = texto.replace(/Â/g, "A");
	texto = texto.replace(/Á/g, "A");
	texto = texto.replace(/À/g, "A");
	texto = texto.replace(/Ä/g, "A");
	texto = texto.replace(/é/g, "e");
	texto = texto.replace(/è/g, "e");
	texto = texto.replace(/ë/g, "e");
	texto = texto.replace(/ê/g, "e");
	texto = texto.replace(/É/g, "E");
	texto = texto.replace(/È/g, "E");
	texto = texto.replace(/Ë/g, "E");
	texto = texto.replace(/Ê/g, "E");
	texto = texto.replace(/í/g, "i");
	texto = texto.replace(/ì/g, "i");
	texto = texto.replace(/ï/g, "i");
	texto = texto.replace(/î/g, "i");
	texto = texto.replace(/Í/g, "I");
	texto = texto.replace(/Ì/g, "I");
	texto = texto.replace(/Ï/g, "I");
	texto = texto.replace(/Î/g, "I");
	texto = texto.replace(/ó/g, "o");
	texto = texto.replace(/ò/g, "o");
	texto = texto.replace(/ô/g, "o");
	texto = texto.replace(/õ/g, "o");
	texto = texto.replace(/ö/g, "o");
	texto = texto.replace(/Õ/g, "O");
	texto = texto.replace(/Ô/g, "O");
	texto = texto.replace(/Ó/g, "O");
	texto = texto.replace(/Ò/g, "O");
	texto = texto.replace(/Ö/g, "O");
	texto = texto.replace(/ú/g, "u");
	texto = texto.replace(/ù/g, "u");
	texto = texto.replace(/ü/g, "u");
	texto = texto.replace(/û/g, "u");
	texto = texto.replace(/Ú/g, "u");
	texto = texto.replace(/Ù/g, "u");
	texto = texto.replace(/Ü/g, "u");
	texto = texto.replace(/Û/g, "u");
	texto = texto.replace(/ý/g, "y");
	texto = texto.replace(/ÿ/g, "y");
	texto = texto.replace(/Ý/g, "Y");
	texto = texto.replace(/ñ/g, "n");
	texto = texto.replace(/Ñ/g, "N");
	texto = texto.replace(/ç/g, "c");
	texto = texto.replace(/Ç/g, "C");


	texto = texto.replace(/§/g, "");
	texto = texto.replace(/´/g, "");
	texto = texto.replace(/ª/g, "");
	texto = texto.replace(/£/g, "");
	texto = texto.replace(/¢/g, "");
	texto = texto.replace(/¬/g, "");
	texto = texto.replace(/¤/g, "");

	
	texto = texto.replace(/°/g, "o");
	texto = texto.replace(/º/g, "o");
	texto = texto.replace(/¹/g, "1");
	texto = texto.replace(/²/g, "2");
	texto = texto.replace(/³/g, "3");


	texto = texto.replace(/Å/g, "A");
	texto = texto.replace(/Â/g, "A");
	texto = texto.replace(/ž/g, "z");
	texto = texto.replace(/¡/g, "i");
	texto = texto.replace(/Ë/g, "E");
	texto = texto.replace(/œ/g, "AE");
	texto = texto.replace(/Ø/g, "O");
	texto = texto.replace(/æ/g, "AE");
	texto = texto.replace(/™/g, "TM");
	texto = texto.replace(/Ž/g, "Z");
	texto = texto.replace(/ƒ/g, "F");
	texto = texto.replace(/Æ/g, "AE");
	texto = texto.replace(/‰/g, "%");
	texto = texto.replace(/Š/g, "S");
	texto = texto.replace(/…/g, "...");
	texto = texto.replace(/Ð/g, "D");
	texto = texto.replace(/×/g, "X");
	texto = texto.replace(/—/g, "-");
	texto = texto.replace(/ß/g, "B");

	texto = texto.replace(/®/g, "");
	texto = texto.replace(/¶/g, "");
	texto = texto.replace(/¢/g, "");
	texto = texto.replace(/¼/g, "");
	texto = texto.replace(/©/g, "");
	texto = texto.replace(//g, "");
	texto = texto.replace(/€/g, "");
	texto = texto.replace(//g, "");
	texto = texto.replace(/¬/g, "");
	texto = texto.replace(/©/g, "");
	texto = texto.replace(/¨/g, "");
	texto = texto.replace(/«/g, "");
	texto = texto.replace(/°/g, "");
	texto = texto.replace(/†/g, "");
	texto = texto.replace(/¹/g, "");

	texto = texto.replace(/®/g, "");
	texto = texto.replace(//g, "");
	texto = texto.replace(/’/g, "");
	texto = texto.replace(//g, "");
	texto = texto.replace(/½/g, "");
	texto = texto.replace(/µ/g, "");
	texto = texto.replace(/¶/g, "");
	texto = texto.replace(/¢/g, "");
	texto = texto.replace(//g, "");
	texto = texto.replace(/™/g, "");
	texto = texto.replace(/“/g, "");
	texto = texto.replace(/¼/g, "");
	texto = texto.replace(/„/g, "");
	texto = texto.replace(/¢/g, "");
	texto = texto.replace(/“/g, "");
	texto = texto.replace(/¿/g, "");
	texto = texto.replace(//g, "");
	texto = texto.replace(/±/g, "");
	texto = texto.replace(/˜/g, "");
	texto = texto.replace(/÷/g, "/");
	texto = texto.replace(/þ/g, "");
	texto = texto.replace(/¾/g, "");
	texto = texto.replace(/¯/g, "");
	texto = texto.replace(/•/g, "");
	texto = texto.replace(/‡/g, "");
	texto = texto.replace(/„/g, "");
	texto = texto.replace(/«/g, "");

	texto = texto.replace(/”/g, "\"");


	/*  Notepad++ */

	texto = texto.replace(/Ã¡/g, "a");
	texto = texto.replace(/Ã /g, "a");
	texto = texto.replace(/Ã£/g, "a");
	texto = texto.replace(/Ã¤/g, "a");
	texto = texto.replace(/Ã¢/g, "a");
	texto = texto.replace(/Ã/g, "A");
	texto = texto.replace(/Ã/g, "A");
	texto = texto.replace(/Ã/g, "A");
	texto = texto.replace(/Ã/g, "A");
	texto = texto.replace(/Ã/g, "A");
	texto = texto.replace(/Ã©/g, "e");
	texto = texto.replace(/Ã¨/g, "e");
	texto = texto.replace(/Ã«/g, "e");
	texto = texto.replace(/Ãª/g, "e");
	texto = texto.replace(/Ã/g, "E");
	texto = texto.replace(/Ã/g, "E");
	texto = texto.replace(/Ã/g, "E");
	texto = texto.replace(/Ã/g, "E");
	texto = texto.replace(/Ã­/g, "i");
	texto = texto.replace(/Ã¬/g, "i");
	texto = texto.replace(/Ã¯/g, "i");
	texto = texto.replace(/Ã®/g, "i");
	texto = texto.replace(/Ã/g, "I");
	texto = texto.replace(/Ã/g, "I");
	texto = texto.replace(/Ã/g, "I");
	texto = texto.replace(/Ã/g, "I");
	texto = texto.replace(/Ã³/g, "o");
	texto = texto.replace(/Ã²/g, "o");
	texto = texto.replace(/Ã´/g, "o");
	texto = texto.replace(/Ãµ/g, "o");
	texto = texto.replace(/Ã¶/g, "o");
	texto = texto.replace(/Ã/g, "O");
	texto = texto.replace(/Ã/g, "O");
	texto = texto.replace(/Ã/g, "O");
	texto = texto.replace(/Ã/g, "O");
	texto = texto.replace(/Ã/g, "O");
	texto = texto.replace(/Ãº/g, "u");
	texto = texto.replace(/Ã¹/g, "u");
	texto = texto.replace(/Ã¼/g, "u");
	texto = texto.replace(/Ã»/g, "u");
	texto = texto.replace(/Ã/g, "u");
	texto = texto.replace(/Ã/g, "u");
	texto = texto.replace(/Ã/g, "u");
	texto = texto.replace(/Ã/g, "u");
	texto = texto.replace(/Ã½/g, "y");
	texto = texto.replace(/Ã¿/g, "y");
	texto = texto.replace(/Ã/g, "Y");
	texto = texto.replace(/Ã±/g, "n");
	texto = texto.replace(/Ã/g, "N");
	texto = texto.replace(/Ã§/g, "c");
	texto = texto.replace(/Ã/g, "C");

	texto = texto.replace(/Â§/g, "");
	texto = texto.replace(/Â´/g, "");
	texto = texto.replace(/Âª/g, "");
	texto = texto.replace(/Â£/g, "");
	texto = texto.replace(/Â¢/g, "");
	texto = texto.replace(/Â¬/g, "");
	texto = texto.replace(/Â¤/g, "");

	texto = texto.replace(/Âº/g, "^0");
	texto = texto.replace(/Â°/g, "^0");
	texto = texto.replace(/Â¹/g, "^1");
	texto = texto.replace(/Â²/g, "^2");
	texto = texto.replace(/Â³/g, "^3");

	return texto;
}