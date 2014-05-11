$( function (){
  
  initFileUpload();
});

//var tmpFileList = new Array();

function initFileUpload() {
  /*jslint unparam: true, regexp: true */
  /*global window, $ */
  'use strict';
  var uploadButton = $('<button/>').addClass('btn btn-primary').prop('disabled', true).text('Processing...')
    .on('click', function() {
      var $this = $(this),
        data = $this.data();
      $this.off('click').text('Abort').on('click', function() {
        $this.remove();
        data.abort();
      });
      data.submit().always(function() {
        $this.remove();
      });
    });

  $('#fileupload').fileupload({
    url: '/upload',
    dataType: 'json',
    autoUpload: false,
    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
    maxFileSize: 5000000, // 5 MB
    // Enable image resizing, except for Android and Opera,
    // which actually support image resizing, but fail to
    // send Blob objects via XHR requests:
    disableImageResize: /Android(?!.*Chrome)|Opera/.test(window.navigator.userAgent),
    previewMaxWidth: 100,
    previewMaxHeight: 100,
    previewCrop: false
  }).on('fileuploadadd', function(e, data) {
    data.context = $('<div/>').appendTo('#files');
    $.each(data.files, function(index, file) {
      var node = $('<p/>').append($('<span/>').text(file.name));
      if (!index) {
        node.append('<br>').append(uploadButton.clone(true).data(data));
      }
      node.appendTo(data.context);
    });
  }).on('fileuploadprocessalways', function(e, data) {
    var index = data.index,
      file = data.files[index],
      node = $(data.context.children()[index]);
    if (file.preview) {
      node.prepend('<br>').prepend(file.preview);
    }
    if (file.error) {
      node.append('<br>').append($('<span class="text-danger"/>').text(file.error));
    }
    if (index + 1 === data.files.length) {
      data.context.find('button').text('Upload').prop('disabled', !! data.files.error);
    }
  }).on('fileuploadprogressall', function(e, data) {
    var progress = parseInt(data.loaded / data.total * 100, 10);
    $('#progress .progress-bar').css('width', progress + '%');
  }).on('fileuploaddone', function(e, data) {
    $.each(data.result.files, function(index, file) {
      if (file.url) {
        var link = $('<a>').attr('target', '_blank').prop('href', file.url);
        $(data.context.children()[index]).wrap(link);
      } else if (file.error) {
        var error = $('<span class="text-danger"/>').text(file.error);
        $(data.context.children()[index]).append('<br>').append(error);
      }
    });
  }).on('fileuploadfail', function(e, data) {
    $.each(data.files, function(index, file) {
      var error = $('<span class="text-danger"/>').text('File upload failed.');
      $(data.context.children()[index]).append('<br>').append(error);
    });
  }).prop('disabled', !$.support.fileInput)
    .parent().addClass($.support.fileInput ? undefined : 'disabled');
}


function initDataTable(){
  $('#product-list').dataTable({
    "ajax":"product/listAll",
    "columns": [
      { "data": "itemName", "defaultContent": ""},
      { "data": "itemAlias", "defaultContent": ""},
      { "data": "mfgName", "defaultContent": ""},
      { "data": "mfgItemName", "defaultContent": ""},
      { "data": "inventory", "defaultContent": ""},
     //{ "data": "_id"},
    ],
    
    "columnDefs": [
      {
        "targets": [ -1 ],
        //"visible": false,
        //"searchable": false,
        "data": "_id",
        "defaultContent": "<button>Click!</button>"
      }
    ]

  });

  // Add event listener for opening and closing details
  $('#product-list tbody').on('click', 'td.details-control', function () {
    console.log('click');
  });
}