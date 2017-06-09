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

var idService, d, m, y;

function updateService(element) {
	idService = $(element).data('id');
}

function removeService(element) {
	var idReservation = $(element).data('id');

	console.log("remove " + idReservation);

	var open = indexedDB.open("pet_shop", 1);

	open.onsuccess = function(event) {
		var db = event.target.result;

		var os = db.transaction("calendar", "readwrite").objectStore("calendar");

		os.get(idReservation).onsuccess = function(evt) {
			var data = evt.target.result;

			data.Id_Pet = '0';

			os.put(data).onsuccess = function (e) {
				console.log("delete")

				selectedDay(d, m, y);
			};
		};
	};
}

function updateReservation(element) {
	var idPet = $(element).data('id');

	console.log(idPet + " added in " + idService);

	var open = indexedDB.open("pet_shop", 1);

	open.onsuccess = function(event) {
		var db = event.target.result;

		var os = db.transaction("calendar", "readwrite").objectStore("calendar");

		os.get(idService).onsuccess = function(evt) {
			var data = evt.target.result;

			data.Id_Pet = String(idPet);

			os.put(data).onsuccess = function (e) {
				console.log("update")

				selectedDay(d, m, y);
			};
		};
	};
}

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
	var element = $('#reservation-table');
	element.html("");

	var open = indexedDB.open("pet_shop", 1);

	open.onsuccess = function(ee) {
		var db = ee.target.result;

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
						html += '<td><img src="../' + event.target.result.Photo + '"></td>';

						if (pet !== '0') {
							db.transaction("pet").objectStore("pet").get(pet).onsuccess = function(event) {
								html += '<td><img src="../' + event.target.result.Photo + '"></td>';

								db.transaction("user").objectStore("user").get(event.target.result.Id_User).onsuccess = function(e) {
									html += '<td>Reservado por ' + e.target.result.Name + '</td>';

									if (e.target.result.Id === '1') {
										html += 
											'<td>' +
												'<a href="#" class="btn btn-floating waves-effect wave-light blue accent-3" data-id="' + id +'"' +
												'onclick="updateService(this)" data-toggle="modal" data-target="#pet-modal">' +
													'<i class="fa fa-pencil"></i>' +
												'</a>' +

												'<a href="#" class="btn btn-floating waves-effect wave-light red accent-2" data-id="' + id + '"' +
												'onclick="removeService(this)">' +
													'<i class="fa fa-times"></i>' +
												'</a>' +
											'</td>';
									} else {
										html += '<td></td>';
									}

									html += '</tr>';

									element.append(html);
								};
							};
						} else {
							html += '<td>---</td>';
							html += '<td colspan="2">' +
									'<a href="#" class="btn btn-floating waves-effect wave-light blue accent-3" data-id="' + id +'"' +
									'onclick="updateService(this)" data-toggle="modal" data-target="#pet-modal">' +
										'<i class="fa fa-plus fa-2x"></i>' +
									'</a>' +
								'</td></tr>';
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
