
/**
 * Manuel Francisco Haro Arroyo: 10223004
 * Edgardo Acosta Leal: 1022755
 * José Richard Tejedo Vega: 10222991
 * */

var months = [
	'Janeiro',
	'Fevereiro',
	'Março',
	'Abril',
	'Maio',
	'Junho',
	'Julho',
	'Agosto',
	'Setembro',
	'Outubro',
	'Novembro',
	'Dezembro'
];

var days = [
	'Dom',
	'Seg',
	'Ter',
	'Qua',
	'Qui',
	'Sex',
	'Sab'
];

function createCalendarOf(month = "", year = "") {
	var now = new Date(); //current date

	//if the parameters don't have values, so they get values of the current date
	month = (month != '0' && month == "") ? now.getMonth() : month;
	year = year == "" ? now.getFullYear() : year;

	var nextDate = new Date(year, (month + 1), 1);
	var prevDate = new Date(year, (month - 1), 1);

	var html = //code to replace to calendar
		'<div class="name-month">' +
			'<h1>' + months[month] + '</h1>' +
			'<h4>' + year + '</h4>' +

			'<a href="#" class="next changer" data-year="' + nextDate.getFullYear() + '" data-month="' + nextDate.getMonth() + '">' +
				'<i class="fa fa-angle-double-right fa-2x" aria-hidden="true"></i>' +
			'</a>';

	html +=
			'<a href="#" class="previous changer ' + (now.getMonth() == month && now.getFullYear() == year ? 'disabled' : '') + 
			'" data-year="' + prevDate.getFullYear() + '" data-month="' + prevDate.getMonth() + '">' +
				'<i class="fa fa-angle-double-left fa-2x" aria-hidden="true"></i>' +
			'</a>' +
		'</div>' +

		'<div class="week-days">' +
			'<div class="date-row">';

	for (let d = 0; d < days.length; d++) {
		html += '<span>' + days[d] + '</span>';
	}

	html += '</div></div>';

	var numberDaysMonth = new Date(year, (month + 1), 0).getDate(); //number of days of month

	var numberFirstDay = new Date(year, month, 1).getDay(); //value of first day of month

	var numberBoxDays = numberDaysMonth + numberFirstDay <= 35 ? 35 : 42; //number of spaces occupied by the month 

	var counter = 1;

	html += '<div class="date-days">';

	for (let box = 1; box <= numberBoxDays; box++) {
		if (box % 7 == 1) {
			html += '<div class="date-row">';
		}

		if (box >= (numberFirstDay + 1) && box <= numberDaysMonth + numberFirstDay) {
			let aux = new Date(year, month, (counter + 1));

			if (aux.getTime() >= now.getTime()) {
				html += '<a href="#" data-month="' + aux.getMonth() + '" data-year="' + aux.getFullYear() + '">' + counter + '</a>';
			} else {
				html += '<a href="#" class="disabled">' + counter + '</a>';
			}

			counter++;
		} else {
			html += '<div class="not-day"></div>';
		}

		if (box % 7 == 0) {
			html += '</div>';
		}
	}

	html += '</div>';

	$('.calendar-main').html(html);
}

function changeCalender() {
	$('.changer:not(.disabled)').click(function(event) {
		createCalendarOf($(this).data('month'), $(this).data('year'));
		selectDay();
		changeCalender();
	});
}

function selectedDay(day, month, year) {
	var element = $('#reservation');
	element.html("");

	var open = indexedDB.open("pet_shop", 1);

	open.onsuccess = function(ee) {
		var db = ee.target.result;

		var transaction = db.transaction("calendar", "readonly");
		var objectStore = transaction.objectStore("calendar");

		db.transaction("calendar").objectStore("calendar").openCursor().onsuccess = function(evt) {
			var cursor = evt.target.result;

			if (cursor) {
				var id, service, pet, date, html;

				id = cursor.key;
				service = cursor.value.Id_Service;
				pet = cursor.value.Id_Pet;
				date = new Date(cursor.value.Date);

				if (date.getFullYear() == year && date.getDate() == day && date.getMonth() == month) {
					html = '<tr><td scope="row">' + date.getHours() + 'h' + date.getMinutes() + '</td>';

					db.transaction("service").objectStore("service").get(service).onsuccess = function(event) {
						html += '<td><img src="../../' + event.target.result.Photo + '"></td>';

						if (pet !== '0') {
							db.transaction("pet").objectStore("pet").get(pet).onsuccess = function(event) {
								html += '<td><img src="../../' + event.target.result.Photo + '"></td>';

								db.transaction("user").objectStore("user").get(event.target.result.Id_User).onsuccess = function(e) {
									html += '<td> ' +
										'<p class="text-warning">Reservado por ' + e.target.result.Name + '</p>' +
										'<a href="edit_service.html?id=' + id + '" class="btn-floating btn-small orange"><i class="fa fa-pencil"></i></a>' +
										'<a class="btn-floating btn-small red" onclick="del(' + String(id) + ')"><i class="fa fa-trash"></i></a>' +
										'</td>';
									html += '</tr>';

									element.append(html);
								};
							};
						} else {
							html += '<td>Livre</td>';
							html += '<td><a href ="add_service.html?id=' + id + '" class="btn-floating btn-small orange"><i class="fa fa-plus"></i></a></td>';
							html += '</tr>'
							element.append(html);
						}
					};
				}

				cursor.continue();
			} else {
				console.log("append");
			}
		};
	};
}

function del(idService) {

	var open = indexedDB.open("pet_shop", 1);

	open.onsuccess = (e) => {
		var db = e.target.result;

		var transaction = db.transaction(["calendar"], "readwrite");
		var objectStore = transaction.objectStore("calendar");

		var request;

		if (idService < 10) request = objectStore.get("0" + idService);
		else request = objectStore.get(idService);

		request.onsuccess = (e) => {
			var data = e.target.result;

			data.Id_Pet = "0";

			var requestUpdate = objectStore.put(data);

			requestUpdate.onsuccess = (e) => {
					window.location.href="admin_services.html";
			}			
		}
	}
}

function selectDay() {
	$('.calendar-main .date-days .date-row a:not(.disabled)').click(function() {
		$('.calendar-main .date-days .date-row a.selected').css({
			'border' : 'none',
			'line-height' : '50px'
		}).removeClass('selected');

		$(this).css({
			'border' : '5px solid rgba(195, 197, 194, .7)',
			'line-height': '45px'
		}).addClass('selected');

		var day = $(this).text();
		var month = $(this).data('month');
		var year = $(this).data('year');

		d = day;
		m = month;
		y = year;

		selectedDay(day, month, year);
	});
}

$(document).ready(function() {
	createCalendarOf();
	changeCalender();
	selectDay();

	$('.calendar-main .date-days .date-row a:not(.disabled):first').click();
});
