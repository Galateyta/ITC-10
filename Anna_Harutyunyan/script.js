/* Functions for choosing skills */
function range(index) {
	var val = $('.range' + index).val();
	$('.range' + index).css({'background':'-webkit-linear-gradient(left ,#fff 0%,#fff '+val+'%,#000 '+val+'%, #000 100%)'});
 }

 /* Function for choosing languages */
 function range_v(index) {
	var val = $('.vertical-range' + index).val();
	$('.vertical-range'+ index).css({'background':'-webkit-linear-gradient(left ,#fff 0%,#fff '+val+'%,#000 '+val+'%, #000 100%)'});
 }