/**
 * Created by tmq on 30/06/2016.
 */
var mssv = null;

$(document).ready(function(){
    var pathname = $(location).attr('pathname');
    var pos = pathname.lastIndexOf('/') + 1;

    mssv = pathname.substr(pos, pathname.length);
    
    getInfo();

    
});

function getInfo() {
    $.getJSON('/api/sv/' + mssv, function (sv) {
        $('#mssv').val(sv[0].mssv);
        $('#mssv').keydown(function () {
            return false;
        });

        $('#hoten').val(sv[0].hoten);
        $('#ngaysinh').val(sv[0].ngaysinh);
        $('#tinchi').val(sv[0].tinchi);
    })
}