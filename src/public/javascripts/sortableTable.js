const MAX_PER_PAGE = 10;

let tbodyEl, table, keys, index = 0, filteredTable;

jQuery.fn.addChild = function (html) {
    var target = $(this[0]);
    var child = $(html);
    child.appendTo(target);
    return child;
};

jQuery.fn.sortableT = function () {
    let o = $(this[0]);
    let head = [], ths = o.children('thead').children('tr').children('th');
    for (let i = 0; i < ths.length; i++) head.push(ths[i].innerHTML);
    let table = [], trs = o.children('tbody').children('tr');
    for (let i = 0; i < trs.length; i++) {
        let tds = $(trs[i]).children('td'), row = {};
        for (let j = 0; j < tds.length; j++) {
            row[head[j]] = tds[j].innerHTML;
        }
        table.push(row);
    }
    o.parent().append('<div id="sortable"></div>');
    o.remove();
    $('#sortable').sortable(table);
};

jQuery.fn.sortable = function (t) {
    table = t;
    search("");
    let o = $(this[0]);
    keys = [];
    for (let i = 0; i < table.length; i++) {
        for (let key in table[i]) {
            if (!contains(keys, key)) keys.push(key);
        }
    }
    let tools = o.addChild('<div id="tools"></div>');
    tools.addChild('<button id="page2">◄</button>').click(() => changePage(-1));
    tools.addChild('<span id="pageIndex"></span>');
    tools.addChild('<button id="page1">►</button>').click(() => changePage(1));
    tools.addChild('<input type="text" id="search" placeholder="Search...">').change(function () {
        search($(this).val());
        changePage(0);
    });
    $('#pageIndex').empty().append("Page " + (index + 1) + "/" + (Math.ceil(filteredTable.length/MAX_PER_PAGE)));
    let tableEl = o.addChild('<table class="sortable"></table>');
    let theadEl = tableEl.addChild('<thead></thead>');
    let theadTrEl = theadEl.addChild('<tr></tr>');
    for (let i = 0; i < keys.length; i++) {
        theadTrEl.append('<th>' + keys[i] + '</th>');
    }
    tbodyEl = tableEl.addChild('<tbody></tbody>');
    appendBody();
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

function appendBody() {
    for (let i = index * MAX_PER_PAGE; i < Math.min(filteredTable.length, MAX_PER_PAGE * (index + 1)); i++) {
        let tr = tbodyEl.addChild('<tr></tr>');
        for (let j = 0; j < keys.length; j++) {
            tr.append('<td>' + (filteredTable[i][keys[j]] ? filteredTable[i][keys[j]] : "") + '</td>');
        }
    }
}

function changePage(d) {
    // d = 1 or d = -1
    index += d;
    if (index * MAX_PER_PAGE >= filteredTable.length || index < 0) index -= d;
    else {
        tbodyEl.empty();
        appendBody();
        $('#pageIndex').empty().append("Page " + (index + 1) + "/" + (Math.ceil(filteredTable.length/MAX_PER_PAGE)));
    }
}

function search(filter) {
    filteredTable = [];
    for (let i = 0; i < table.length; i++) {
        // console.log(table[i]);
        for (let e in table[i]) {
            if (table[i][e].includes(filter)) {
                filteredTable.push(table[i]);
                break;
            }
        }
    }
}