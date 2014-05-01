/*
var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  console.log('file' + req.params.file);
  res.send('respond with a resource');
});

module.exports = router;
*/

var upload = require('jquery-file-upload-middleware');
// configure upload middleware
upload.configure({
    uploadDir: __dirname + '/public/uploads',
    uploadUrl: '/uploads',
    
    imageVersions: {
        thumbnail: {
            width: 80,
            height: 80
        }
    }
    
});

// events
upload.on('begin', function (fileInfo) { 
    // fileInfo structure is the same as returned to browser
    // { 
    //     name: '3 (3).jpg',
    //     originalName: '3.jpg',
    //     size: 79262,
    //     type: 'image/jpeg',
    //     delete_type: 'DELETE',
    //     delete_url: 'http://yourhost/upload/3%20(3).jpg',
    //     url: 'http://yourhost/uploads/3%20(3).jpg',
    //     thumbnail_url: 'http://youhost/uploads/thumbnail/3%20(3).jpg' 
    // }
    console.log(fileInfo.originalName);
    console.log(fileInfo.delete_url);
});
upload.on('abort', function (fileInfo) {});
upload.on('end', function (fileInfo) {});
upload.on('delete', function (fileInfo) {});
upload.on('error', function (e) {
    console.log(e.message);
});


module.exports = upload;