$(document).ready(function() {
	$('#product-list').dataTable({
		//"bProcessing": true,
		"bServerSide": true,
		"sAjaxSource": "product/query_all"
	});
	
	
	
	var options = { dataType:  'json'};
    $('#add-product-form').ajaxForm(options);
	
});

function addProduct(){
	console.log($('#add-product-form').serializeArray());
	
	$.ajax({
	    url: 'product/create',
	    type: 'POST',
	    data : $('#add-product-form').serialize(),
	    dataType: 'json',
	    contentType: "application/x-www-form-urlencoded",
	    success: function(json) {
	        alert('all done');
	    }
	});
}


$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};



