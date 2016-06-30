/**
 * Created by tmq on 30/06/2016.
 */
var mssv = null;

$(document).ready(function(){
    var pathname = $(location).attr('pathname');
    var pos = pathname.lastIndexOf('/') + 1;

    mssv = pathname.substr(pos, pathname.length);
    console.log('mssv = ' + mssv);

    showDetails();

    $('#btn_delete').on('click', function () {
        var v = confirm('Xóa sinh viên?');
        if (v) {
            window.location = '/api/delete/' + mssv;
        }
    });

    $('#btn_edit').on('click', function () {
        window.location = '/sv/edit/' + mssv;
    });
});
function showDetails() {
    $.getJSON('/api/sv/' + mssv, function (sv) {
        var content = '';

        content += '<b>' + sv[0].hoten + '</b><br>';
        content += '<a>' + sv[0].mssv + '</a><br>';
        content += '<a>' + sv[0].ngaysinh + '</a><br>';
        content += '<a>' + sv[0].tinchi + '</a><br>';

        $('#content_details').html(content);
    })
}