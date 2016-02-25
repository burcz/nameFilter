var request = require('request');
var cheerio = require('cheerio');
//var $ = require('jquery');

var filter = {
	boy: 0,
	girl: 0,
	initial: 'A',
	contains: ['l', 'i']
};


var columns = {
	boys: [],
	girls: []
};

function button() {
	setFiter();
	getNamesFromTable();
	if (filter.boy) {
		columns.boys = filterAll(columns.boys);
	}
	if (filter.girl) {
		columns.girls = filterAll(columns.girls);
	}
	writeHtml();
}

function getNamesFromWebPage(sex) {
	var names = [];
	var url = 'http://felelosszulokiskolaja.hu/index.php/babanevek/anyakonyvezheto-' + sex + '-nevek/';
	console.log('Loading page...');
	request.get(url, function(err, resp, body){
		console.log('HTML length: ', body.length);
		var $c = cheerio.load(body);

		$c('table td').each(function(i, el){
			names.push($c(this).text());
		});
		console.log(names.join(', '));
	});
	return names;
}

function getNamesFromTable() {
	if (filter.boy) {
		columns.boys = getNamesFromWebPage('fiu');
	} else {
		columns.boys = [];
	}
	if (filter.girl) {
		columns.girls = getNamesFromWebPage('lany');
	} else {
		columns.girls = [];
	}
}

function filterAll(nameArray) {
	nameArray = filterByInitial(nameArray, filter.initial);
	nameArray = filterByContains(nameArray, filter.contains);
	return nameArray;
}

function writeHtml() {
	var nev1 = document.getElementById("nev1");
	var nev2 = document.getElementById("nev2");
	if (columns.boys) {
		nev1.textContent = columns.boys.join("\n");
	} else {
		nev1.textContent = '';
	}
	if (columns.girls) {
		nev2.textContent = columns.girls.join("\n");
	} else {
		nev2.textContent = '';
	}
}

function filterByInitial(nameArray, initial) {
	var resultArray = [];
	for (var i = 0; i < nameArray.length; i++) {
		if (nameArray[i].indexOf(initial) === 0) {
			resultArray.push(nameArray[i]);
		}
	}
	return resultArray;
}

function filterByContains(nameArray, letters) {
	var resultArray = [];
	var preRegExp = '';
	var i;
	for (i = 0; i < letters.length; i++) {
		preRegExp += '(?=.*' + encodeURI(letters[i]) + ')';
	}
	var re = new RegExp(preRegExp, 'i');
	for (i = 0; i < nameArray.length; i++) {
		var toCheck = nameArray[i].toLowerCase();
		if (re.test(encodeURI(toCheck))) {
			resultArray.push(nameArray[i]);
		}
	}
	return resultArray;
}

function setFiter() {
	filter.boy = $('input[name="boy"]').is(':checked');
	filter.girl = $('input[name="girl"]').is(':checked');
	if ($('#initialCheck').is(':checked'))	{
		filter.initial = $('#initialText').val();
	} else {
		filter.initial = "";
	}
	if ($('#containsCheck').is(':checked'))	{
		filter.contains = $('#containsText').val().split(",");
	} else {
		filter.contains = [];
	}
}