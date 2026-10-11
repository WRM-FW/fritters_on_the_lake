/* Opening-hours status for Fritters on the Lake.
 *
 * Source: the shop's own "Opening Hours" card on Instagram
 * (@fritters_on_the_lake) — Thursday to Sunday, 10:00 am to 5:00 pm.
 * Winter is shorter and the shop closes for a few weeks each spring,
 * which is why the copy always points at Instagram for the final word.
 *
 * Status is computed in the shop's own time zone, not the visitor's.
 */
(function () {
  'use strict';

  var TZ = 'America/Toronto';
  // 0 = Sunday … 6 = Saturday
  var OPEN = { 0: [10, 17], 4: [10, 17], 5: [10, 17], 6: [10, 17] };
  var DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function torontoNow() {
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: TZ,
      weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date());
    var get = function (t) {
      var p = parts.filter(function (x) { return x.type === t; })[0];
      return p ? p.value : '';
    };
    var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return {
      day: map[get('weekday')] ?? new Date().getDay(),
      minutes: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10)
    };
  }

  function hhmm(m) {
    var h24 = Math.floor(m / 60), mm = m % 60;
    var suffix = h24 >= 12 ? 'pm' : 'am';
    var h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    return h12 + (mm ? ':' + String(mm).padStart(2, '0') : ':00') + ' ' + suffix;
  }

  function statusFor(now) {
    var today = OPEN[now.day];
    var openMin = today ? today[0] * 60 : 0;
    var closeMin = today ? today[1] * 60 : 0;

    if (today && now.minutes >= openMin && now.minutes < closeMin) {
      var left = closeMin - now.minutes;
      if (left <= 60) return { open: true, text: 'Closing soon — last orders at ' + hhmm(closeMin) };
      return { open: true, text: 'Open now — until ' + hhmm(closeMin) + ' shop time' };
    }
    if (today && now.minutes < openMin) {
      return { open: false, text: 'Closed — opens today at ' + hhmm(openMin) };
    }
    for (var i = 1; i <= 7; i++) {
      var d = (now.day + i) % 7;
      if (OPEN[d]) {
        return {
          open: false,
          text: 'Closed — opens ' + (i === 1 ? 'tomorrow' : DAY_NAMES[d]) + ' at ' + hhmm(OPEN[d][0])
        };
      }
    }
    return { open: false, text: 'Hours vary by season' };
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var now = torontoNow();
    var s = statusFor(now);

    setText('hero-status', s.text);
    setText('status-inline', s.text + '.');

    var dot = document.querySelector('.dot');
    if (dot) dot.classList.add(s.open ? 'open' : 'closed');

    var row = document.querySelector('#hours-table tr[data-day="' + now.day + '"]');
    if (row) {
      row.classList.add('today');
      var th = row.querySelector('th');
      if (th) th.setAttribute('aria-current', 'date');
    }
    Array.prototype.forEach.call(document.querySelectorAll('#hours-table tr'), function (tr) {
      if (/closed/i.test(tr.textContent)) tr.classList.add('closed-day');
    });

    setText('year', String(new Date().getFullYear()));
  });
})();
