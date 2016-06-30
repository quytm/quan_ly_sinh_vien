/**
 * Created by tmq on 30/06/2016.
 */
$(document).ready(function(){
   // Show list SV
    showListSV();
});

// Show list SV
function showListSV() {
    $.getJSON('/api/listsv',function (list) {
        var content = '';

        listSV = list;

        $.each(list, function(){
            content += '<tr>';
            content += '<td>' + this.mssv + '</td>';
            content += '<td><a href="/sv/' + this.mssv + '" class="link_show_detail" title="Show Details">' + this.hoten + '</a></td>';
            content += '<td>' + this.ngaysinh + '</td>';
            content += '<td>' + this.tinchi + '</td>';
            content += '</tr>';
        });

        $("#content_list").html(content);
    });
}
