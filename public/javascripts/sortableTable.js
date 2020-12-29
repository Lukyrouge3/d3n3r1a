jQuery.fn.addChild = function (html) {
    var target = $(this[0]);
    var child = $(html);
    child.appendTo(target);
    return child;
};

jQuery.fn.sortable = function (table) {
    let o = $(this[0]);
    let keys = [];
    for (let i = 0; i < table.length; i++) {
        for (let key in table[i]) {
            if (!contains(keys, key)) keys.push(key);
        }
    }
    let tableEl = o.addChild('<table class="sortable"></table>');
    let theadEl = tableEl.addChild('<thead></thead>');
    let theadTrEl = theadEl.addChild('<tr></tr>');
    for (let i = 0; i < keys.length; i++) {
        theadTrEl.append('<th>' + keys[i] + '</th>');
    }
    let tbodyEl = tableEl.addChild('<tbody></tbody>');
    for (let i = 0; i < table.length; i++) {
        let tr = tbodyEl.addChild('<tr></tr>');
        for (let j = 0; j < keys.length; j++) {
            tr.append('<td>' + (table[i][keys[j]] ? table[i][keys[j]] : "") + '</td>');
        }
    }

    o.find('th').click(function () {
        let index = $(this).index();
        let col = $(`table tr td:nth-child(${index + 1})`);
        let arr = [];
        col.each((c) => {
            arr.push(col[c]);
        });
        arr.sort(compare);
        if ($(this).hasClass('s')) {
            arr.reverse();
            $('.s').removeClass('s');
            $('.r').removeClass('r');
            $(this).addClass('r');
        } else if ($(this).hasClass('r')) {
            $('.s').removeClass('s');
            $('.r').removeClass('r');
            $(this).addClass('s');
        } else {
            $('.s').removeClass('s');
            $('.r').removeClass('r');
            $(this).addClass('s');
        }
        for (let i = 0; i < arr.length; i++) {
            tbodyEl.children()[i].before(arr[i].parentElement);
        }
    });
    return this;
};

function compare(a, b) {
    if (!isNumeric(a.innerHTML) && !isNumeric(b.innerHTML)) return a.innerHTML > b.innerHTML ? 1 : -1;
        else return a.innerHTML - b.innerHTML;
}

function contains(table, o) {
    for (let i = 0; i < table.length; i++) if (table[i] === o) return true;
    return false;
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}