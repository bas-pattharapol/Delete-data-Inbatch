$(document).ready(function(){

  $(function () {
    //alert('xxxx')
    //Initialize DataTables
		$("#pdorder_table").DataTable();
     
  });

	$('.acqname').blur(function() {

		$(this).val($(this).val().toUpperCase());

	});

	$('.btnedit').on('click', function() {

		var controlId = $(this).attr('id');
		var actionKey = controlId.substr(controlId.indexOf('_')+1);
		var editStatus = $('#edit_status').val();
		//alert(actionKey);

		if(editStatus == '0'){

			//Insert active status
			$('#edit_status').val('1');
			$('#cur_active_key').val(actionKey);

			//Enable control
			$('#acqname_'+actionKey).css('display','');
			$('#acqdesc_'+actionKey).css('display','');
			$('#save_'+actionKey).css('display','');

			//Disable control
			$('#lbl_pdorder_'+actionKey).css('display','none');
			$('#lbl_acqdesc_'+actionKey).css('display','none');
			$('#edit_'+actionKey).css('display','none');
			$('#del_'+actionKey).css('display','none');

		}
		else{
			$('#modal_dialog').removeClass('modal-success').addClass('modal-warning');
			$('.modal-header').children('h4').html('Warning!');
			$('.modal-body').children().html('');
			$('.modal-footer').children('.btn:nth-child(1)').css('display','none');
			$('.modal-footer').children('.btn:nth-child(2)').css('display','');
			$('.modal-footer').children('.btn:nth-child(2)').html('Close');
			$('#modal_dialog').modal('show');
			return false;
		}

	});

	$('.btnInsert').on('click', function() {
     
			$('#modal_dialog').removeClass('modal-success').addClass('modal-warning');
			$('.modal-header').children('h4').html('Warning!');
			$('.modal-body').children().html('Acquirer cannot be null value. Please, enter acquirer name.'+$('#pd_order').val());
			$('.modal-footer').children('.btn:nth-child(1)').css('display','none');
			$('.modal-footer').children('.btn:nth-child(2)').attr('id','btnFocusAcqName');
			$('.modal-footer').children('.btn:nth-child(2)').css('display','');
			$('.modal-footer').children('.btn:nth-child(2)').html('OK');
			$('#modal_dialog').modal('show');
			return false;
		

		if($('#pd_order').val() != ''){

			pdorder_topw($('#pd_order').val(), $('textarea[name=acq_desc]').val());

		}
		else{
			$('#modal_dialog').removeClass('modal-success').addClass('modal-warning');
			$('.modal-header').children('h4').html('Warning!');
			$('.modal-body').children().html('Acquirer cannot be null value. Please, enter acquirer name.');
			$('.modal-footer').children('.btn:nth-child(1)').css('display','none');
			$('.modal-footer').children('.btn:nth-child(2)').attr('id','btnFocusAcqName');
			$('.modal-footer').children('.btn:nth-child(2)').css('display','');
			$('.modal-footer').children('.btn:nth-child(2)').html('OK');
			$('#modal_dialog').modal('show');
			return false;
		}

	});

	$(document).delegate('#btnFocusAcqName', 'click', function() {

		$('#modal_dialog').modal('hide');
		$('#pd_order').focus();

	});

	$(document).delegate('#btnGotoLogin', 'click', function() {

		$('#modal_dialog').modal('hide');
		window.location.href = "/management/logon.php"

	});
	
		$(document).delegate('#btnGotoListPdorder', 'click', function() {

		$('#modal_dialog').modal('hide');
		window.location.href = "/neo/pd_plan.php"

	});

/************************************* SEND TO PREWEIGHT *************************************/
	$('.btnsendpw').on('click', function() {
		var controlId = $(this).attr('id');
		var actionKey = controlId.substr(controlId.indexOf('_')+1);
		var pd_order = $('#lbl_pdorder_'+actionKey).html();
		var pd_batchno = $('#lbl_batchno_'+actionKey).html();
		var pd_version = $('#lbl_pdversion_'+actionKey).html();
		
		// var result_arr = pd_batchno.split('-');
		// console.log('xxx' + actionKey);
		 console.log('pd_order ' + pd_order);
		 console.log('batchno ' + pd_batchno);
		 console.log('pd_version ' + pd_version);
		
		$('#cur_spw_key').val(pd_order);
		$('#cur_spw_batchnokey').val(pd_batchno);
		$('#cur_versionproduct').val(pd_version);

		
		// list value of checklist display 
		 var checkboxName = "lbl_listcheckbox";
		 var checkboxes = document.querySelectorAll('input[name="' + checkboxName + '"]:checked'), values = [], display_values =[];
        Array.prototype.forEach.call(checkboxes, function(el) {
        	
        	 display_values.push(el.value.split('|')[0])
           values.push(el.value);
        });
		 console.log('list of data ' + values);
		 console.log('list of display_values ' + display_values);
		 
		 console.log('size of list ' + values.length);
		 
		 if (values.length > 0 ){
		 
		$('#cur_allchecklist').val(values);
		$('#modal_dialog').removeClass('modal-success').addClass('modal-warning');
		$('.modal-header').children('h4').html('Send Pre-Weight confirmation!');
		$('.modal-body').children().html('Are you sure you want to Send To Pre-Weight \"'+display_values+'\"?');
		$('.modal-footer').children('.btn:nth-child(1)').css('display','');
		$('.modal-footer').children('.btn:nth-child(1)').attr('id','btnCfSPW');
		$('.modal-footer').children('.btn:nth-child(1)').html('Send');
		$('.modal-footer').children('.btn:nth-child(2)').css('display','');
		$('.modal-footer').children('.btn:nth-child(2)').attr('id','btnCfDonotSPW');
		$('.modal-footer').children('.btn:nth-child(2)').html('Cancel');
		$('#modal_dialog').modal('show');
		
	 }else{
	 	
      	$('#modal_dialog').removeClass('modal-success').addClass('modal-warning');
      	$('.modal-header').children('h4').html('!!!! Some Thing Wrong !!!!');
      	$('.modal-body').children().html('Please Select List of Pick , Please, Try or Choose again.');
      	$('.modal-footer').children('.btn:nth-child(1)').attr('id','btnGotoListPdorder');
				$('.modal-footer').children('.btn:nth-child(1)').css('display','');
				$('.modal-footer').children('.btn:nth-child(1)').html('Re Choose');
				$('.modal-footer').children('.btn:nth-child(2)').css('display','none');
	  $('#modal_dialog').modal('show');
      }
	 	
	});

	$(document).delegate('.btndel', 'click', function() {
		var controlId = $(this).attr('id');
		var actionKey = controlId.substr(controlId.indexOf('_')+1);
		var pd_order = $('#lbl_pdorder_'+actionKey).html();
		var pd_batchno = $('#lbl_batchno_'+actionKey).html();
		var pd_version = $('#lbl_pdversion_'+actionKey).html();
		// list value of checklist display 
		 var checkboxName = "lbl_listcheckbox";
		 var checkboxes = document.querySelectorAll('input[name="' + checkboxName + '"]:checked'), values = [], display_values =[];
        Array.prototype.forEach.call(checkboxes, function(el) {
        	
        	 display_values.push(el.value.split('|')[0])
           values.push(el.value);
        });
		 console.log('list of data ' + values);
		 console.log('list of display_values ' + display_values);
		 
		 console.log('size of list ' + values.length);
		
		$('#cur_spw_key').val(actionKey);
		$('#cur_allchecklist').val(values);
		$('#modal_dialog').removeClass('modal-success').addClass('modal-warning');
		$('.modal-header').children('h4').html('Remove confirmation!');
		$('.modal-body').children().html('Are you sure you want to remove \"'+pd_order+'\"?');
		$('.modal-footer').children('.btn:nth-child(1)').css('display','');
		$('.modal-footer').children('.btn:nth-child(1)').attr('id','btnCfDel');
		$('.modal-footer').children('.btn:nth-child(1)').html('Remove');
		$('.modal-footer').children('.btn:nth-child(2)').css('display','');
		$('.modal-footer').children('.btn:nth-child(2)').attr('id','btnCfDonotSPW');
		$('.modal-footer').children('.btn:nth-child(2)').html('Cancel');
		$('#modal_dialog').modal('show');
	});

	$(document).delegate('#btnCfDonotSPW', 'click', function() {

		$('#modal_dialog').modal('hide');
		$('#cur_spw_key').val('');

	});

	$(document).delegate('#btnCfSPW', 'click', function() {
  
		acq_sendtopreweight($('#cur_spw_key').val(), $('#cur_spw_batchnokey').val(), $('#cur_versionproduct').val(), $('#cur_allchecklist').val());

	});


	$(document).delegate('#btnCfDel', 'click', function() {

		// acq_sendtopreweight($('#cur_spw_key').val());
		console.log('Delete ... ');
		console.log('cur_spw_key : ' + $('#cur_spw_key').val());
		console.log('cur_spw_batchnokey ' + $('#cur_spw_batchnokey').val());
		console.log('pd_version ' + $('#cur_versionproduct').val());
		console.log('cur_allchecklist ' + $('#cur_allchecklist').val());	
       acq_deletepreweight($('#cur_spw_key').val(), $('#cur_spw_batchnokey').val(), $('#cur_versionproduct').val(), $('#cur_allchecklist').val());
	});

/************************************* SEND TO MIXING *************************************/
	$('.btnsendmix').on('click', function() {
		var controlId = $(this).attr('id');
		var actionKey = controlId.substr(controlId.indexOf('_')+1);
		var pd_order = $('#lbl_pdorder_'+actionKey).html();
		var pd_batchno = $('#lbl_batchno_'+actionKey).html();
		var pd_version = $('#lbl_pdversion_'+actionKey).html();
		
		console.log('xxx' + actionKey);
		console.log('pd_order ' + "lbl_pdorder_"+actionKey);
		console.log('pd_version ' + pd_version);
		
		$('#cur_spw_key').val(actionKey);
		$('#modal_dialog').removeClass('modal-success').addClass('modal-warning');
		$('.modal-header').children('h4').html('Send Mixing confirmation!');
		$('.modal-body').children().html('Are you sure you want to Send To Mixing with PD_ORDER \"'+pd_order+'\"?');
		$('.modal-footer').children('.btn:nth-child(1)').css('display','');
		$('.modal-footer').children('.btn:nth-child(1)').attr('id','btnCfSMX');
		$('.modal-footer').children('.btn:nth-child(1)').html('Send');
		$('.modal-footer').children('.btn:nth-child(2)').css('display','');
		$('.modal-footer').children('.btn:nth-child(2)').attr('id','btnCfDonotSMX');
		$('.modal-footer').children('.btn:nth-child(2)').html('Cancel');
		$('#modal_dialog').modal('show');
	});

	$(document).delegate('#btnCfDonotSMX', 'click', function() {

		$('#modal_dialog').modal('hide');
		$('#cur_spw_key').val('');

	});

	$(document).delegate('#btnCfSMX', 'click', function() {
  
		acq_sendtomix($('#cur_spw_key').val());

	});


});

function acq_sendtomix(pd_order) {
	

	// alert('postname = '+pd_order);

// async:false = Code paused. (Other code waiting for this to finish.)
// async:true = Code continued. (Nothing gets paused. Other code is not waiting.)

	$.ajax({
	  type: "POST",
	  url: "ajax_pdorder_sendtomix.php",
	  async:false,  
	  data: {
	  	"pd_order": pd_order
//	  	"acq_desc": acq_desc
		},
	  cache: false,
	  beforeSend: function() {
	  	$('#modal_dialog').removeClass('modal-warning').addClass('modal-success');
	  	$('.modal-header').children('h4').html('On process');
			$('.modal-body').children().html('<div class="overlay" style="background: rgba(238, 238, 238, 0);"><i class="fa fa-spinner fa-pulse fa-3x fa-fw" style="margin-left: 15%;"></i><h4 style="margin-top: -5%; text-align:center;">Do not close this box. Please wait...</h4></div>');
			$('.modal-footer').children('.btn:nth-child(1)').css('display','none');
			$('.modal-footer').children('.btn:nth-child(2)').css('display','none');
			$('#modal_dialog').modal('show');
	  },
	  success: function(result) {
	  	// alert(result);

	  	if(result.match(/logonrequest/)){
      	//Case not logon : go to logon page
      	$('#modal_dialog').removeClass('modal-success').addClass('modal-warning');
      	$('.modal-header').children('h4').html('An error occurred!');
      	$('.modal-body').children().html('You\'re not login or your session has expired! Please, login again.');
      	$('.modal-footer').children('.btn:nth-child(1)').attr('id','btnGotoLogin');
				$('.modal-footer').children('.btn:nth-child(1)').css('display','');
				$('.modal-footer').children('.btn:nth-child(1)').html('Goto Login');
				$('.modal-footer').children('.btn:nth-child(2)').css('display','none');
      }
			else if(result.match(/denied/)){
      	//Case access denied : show error
      	$('#modal_dialog').modal('hide');
      	$('#mainbox_body').html(result+'<br/><br/><br/><br/><br/><br/>');
			}
      else{
      	//Normal case : show search result
      	//Normal case : show search result
      	var result_arr = result.split('|');
         // alert(result_arr[0]);
      	if(result_arr[0] == '1'){
      		//Inform success to user
					$('#modal_dialog').removeClass('modal-warning').addClass('modal-success');
	      	$('.modal-header').children('h4').html(result_arr[1]);
	      	$('.modal-body').children().html(result_arr[2]);
					$('.modal-footer').children('.btn:nth-child(1)').css('display','none');
					$('.modal-footer').children('.btn:nth-child(2)').attr('id','btnClose');
					$('.modal-footer').children('.btn:nth-child(2)').html('Close');
					$('.modal-footer').children('.btn:nth-child(2)').css('display','');
					$('#cur_del_key').val('');
					
					// Remove from pd_order table
				  $('#row_'+pd_order).remove();

      	}
      	else{
      		//Inform error to user
					$('#modal_dialog').removeClass('modal-success').addClass('modal-warning');
	      	$('.modal-header').children('h4').html(result_arr[1]);
	      	$('.modal-body').children().html(result_arr[2]);
					$('.modal-footer').children('.btn:nth-child(1)').css('display','none');
					$('.modal-footer').children('.btn:nth-child(2)').attr('id','btnClose');
					$('.modal-footer').children('.btn:nth-child(2)').html('Close');
					$('.modal-footer').children('.btn:nth-child(2)').css('display','');
					$('#cur_del_key').val('');
      	}
      	
      	// alert(result);
				//$('#mainbox').parent().replaceWith(result);
      	// $('#mainbox').parent().parent().replaceWith(result);
      }
	  },
		error: function(jqXHR, exception) {
	  	var errorStr = '';
	  	//alert(jqXHR.status);

			if(jqXHR.status === 0){
				errorStr = 'Can not connect. Please verify network</p></div>';
			}
			else if(jqXHR.status == 404){
				errorStr = 'Requested page not found [404]</p></div>';
			}
			else if(jqXHR.status == 500){
				errorStr = 'Internal server error [500]</p></div>';
			}
			else if(exception === 'parsererror'){
				errorStr = 'Requested JSON parse failed</p></div>';
			}
			else if(exception === 'timeout'){
				errorStr = 'Time out error</p></div>';
			}
			else if(exception === 'abort'){
				errorStr = 'Ajax request aborted</p></div>';
			}
			else{
				errorStr = 'Uncaught Error : ' + jqXHR.responseText + '</p></div>';
			}

    	$('#modal_dialog').removeClass('modal-success').addClass('modal-warning');
    	$('.modal-header').children('h4').html('Some problems have occured!');
    	$('.modal-body').children().html(errorStr);
			$('.modal-footer').children('.btn:nth-child(1)').css('display','none');
			$('.modal-footer').children('.btn:nth-child(2)').css('display','');
			$('.modal-footer').children('.btn:nth-child(2)').html('Close');

	  }
	});

	
}

function acq_sendtopreweight(pd_order, batch_no, pdversion, pd_list){

	// alert('pd_order = '+pd_order+' batch_no '+batch_no);

	$.ajax({
	  type: "POST",
	  url: "ajax_pdorder_sendpreweight.php",
	  data: {
	  	"pd_order": pd_order,
	  	"batch_no": batch_no,
	  	"pdversion": pdversion,
	  	"pd_list": pd_list
//	  	"acq_desc": acq_desc
		},
	  cache: false,
	  beforeSend: function() {
	  	$('#modal_dialog').removeClass('modal-warning').addClass('modal-success');
	  	$('.modal-header').children('h4').html('On process');
			$('.modal-body').children().html('<div class="overlay" style="background: rgba(238, 238, 238, 0);"><i class="fa fa-spinner fa-pulse fa-3x fa-fw" style="margin-left: 15%;"></i><h4 style="margin-top: -5%; text-align:center;">Do not close this box. Please wait...</h4></div>');
			$('.modal-footer').children('.btn:nth-child(1)').css('display','none');
			$('.modal-footer').children('.btn:nth-child(2)').css('display','none');
			$('#modal_dialog').modal('show');
	  },
	  success: function(result) {
	  	// alert(result);

	  	if(result.match(/logonrequest/)){
      	//Case not logon : go to logon page
      	$('#modal_dialog').removeClass('modal-success').addClass('modal-warning');
      	$('.modal-header').children('h4').html('An error occurred!');
      	$('.modal-body').children().html('You\'re not login or your session has expired! Please, login again.');
      	$('.modal-footer').children('.btn:nth-child(1)').attr('id','btnGotoLogin');
				$('.modal-footer').children('.btn:nth-child(1)').css('display','');
				$('.modal-footer').children('.btn:nth-child(1)').html('Goto Login');
				$('.modal-footer').children('.btn:nth-child(2)').css('display','none');
      }
			else if(result.match(/denied/)){
      	//Case access denied : show error
      	$('#modal_dialog').modal('hide');
      	$('#mainbox_body').html(result+'<br/><br/><br/><br/><br/><br/>');
			}
      else{
      	//Normal case : show search result
      	//Normal case : show search result
      	var result_arr = result.split('|');
         // alert(result_arr[0]);
      	if(result_arr[0] == '1'){
      		//Inform success to user
					$('#modal_dialog').removeClass('modal-warning').addClass('modal-success');
	      	$('.modal-header').children('h4').html(result_arr[1]);
	      	$('.modal-body').children().html(result_arr[2]);
					$('.modal-footer').children('.btn:nth-child(1)').css('display','none');
					$('.modal-footer').children('.btn:nth-child(2)').attr('id','btnClose');
					$('.modal-footer').children('.btn:nth-child(2)').html('Close');
					$('.modal-footer').children('.btn:nth-child(2)').css('display','');
					$('#cur_del_key').val('');
					
					// Remove from pd_order table
				  $('#row_'+pd_order).remove();

      	}
      	else{
      		//Inform error to user
					$('#modal_dialog').removeClass('modal-success').addClass('modal-warning');
	      	$('.modal-header').children('h4').html(result_arr[1]);
	      	$('.modal-body').children().html(result_arr[2]);
					$('.modal-footer').children('.btn:nth-child(1)').css('display','none');
					$('.modal-footer').children('.btn:nth-child(2)').attr('id','btnClose');
					$('.modal-footer').children('.btn:nth-child(2)').html('Close');
					$('.modal-footer').children('.btn:nth-child(2)').css('display','');
					$('#cur_del_key').val('');
      	}
      	
      	// alert(result);
				//$('#mainbox').parent().replaceWith(result);
      	// $('#mainbox').parent().parent().replaceWith(result);
      }
	  },
		error: function(jqXHR, exception) {
	  	var errorStr = '';
	  	//alert(jqXHR.status);

			if(jqXHR.status === 0){
				errorStr = 'Can not connect. Please verify network</p></div>';
			}
			else if(jqXHR.status == 404){
				errorStr = 'Requested page not found [404]</p></div>';
			}
			else if(jqXHR.status == 500){
				errorStr = 'Internal server error [500]</p></div>';
			}
			else if(exception === 'parsererror'){
				errorStr = 'Requested JSON parse failed</p></div>';
			}
			else if(exception === 'timeout'){
				errorStr = 'Time out error</p></div>';
			}
			else if(exception === 'abort'){
				errorStr = 'Ajax request aborted</p></div>';
			}
			else{
				errorStr = 'Uncaught Error : ' + jqXHR.responseText + '</p></div>';
			}

    	$('#modal_dialog').removeClass('modal-success').addClass('modal-warning');
    	$('.modal-header').children('h4').html('Some problems have occured!');
    	$('.modal-body').children().html(errorStr);
			$('.modal-footer').children('.btn:nth-child(1)').css('display','none');
			$('.modal-footer').children('.btn:nth-child(2)').css('display','');
			$('.modal-footer').children('.btn:nth-child(2)').html('Close');

	  }
	});

}

// detele
function acq_deletepreweight(pd_order, batch_no, pdversion, pd_list){

	// alert('pd_order = '+pd_order+' batch_no '+batch_no);

	$.ajax({
	  type: "POST",
	  url: "ajax_deletepreweight.php",
	  data: {
	  	"pd_order": pd_order,
	  	"batch_no": batch_no,
	  	"pdversion": pdversion,
	  	"pd_list": pd_list
//	  	"acq_desc": acq_desc
		},
	  cache: false,
	  beforeSend: function() {
	  	$('#modal_dialog').removeClass('modal-warning').addClass('modal-success');
	  	$('.modal-header').children('h4').html('On process');
			$('.modal-body').children().html('<div class="overlay" style="background: rgba(238, 238, 238, 0);"><i class="fa fa-spinner fa-pulse fa-3x fa-fw" style="margin-left: 15%;"></i><h4 style="margin-top: -5%; text-align:center;">Do not close this box. Please wait...</h4></div>');
			$('.modal-footer').children('.btn:nth-child(1)').css('display','none');
			$('.modal-footer').children('.btn:nth-child(2)').css('display','none');
			$('#modal_dialog').modal('show');
	  },
	  success: function(result) {
	  	// alert(result);

	  	if(result.match(/logonrequest/)){
      	//Case not logon : go to logon page
      	$('#modal_dialog').removeClass('modal-success').addClass('modal-warning');
      	$('.modal-header').children('h4').html('An error occurred!');
      	$('.modal-body').children().html('You\'re not login or your session has expired! Please, login again.');
      	$('.modal-footer').children('.btn:nth-child(1)').attr('id','btnGotoLogin');
				$('.modal-footer').children('.btn:nth-child(1)').css('display','');
				$('.modal-footer').children('.btn:nth-child(1)').html('Goto Login');
				$('.modal-footer').children('.btn:nth-child(2)').css('display','none');
      }
			else if(result.match(/denied/)){
      	//Case access denied : show error
      	$('#modal_dialog').modal('hide');
      	$('#mainbox_body').html(result+'<br/><br/><br/><br/><br/><br/>');
			}
      else{
      	//Normal case : show search result
      	//Normal case : show search result
      	var result_arr = result.split('|');
         // alert(result_arr[0]);
      	if(result_arr[0] == '1'){
      		//Inform success to user
					$('#modal_dialog').removeClass('modal-warning').addClass('modal-success');
	      	$('.modal-header').children('h4').html(result_arr[1]);
	      	$('.modal-body').children().html(result_arr[2]);
					$('.modal-footer').children('.btn:nth-child(1)').css('display','none');
					$('.modal-footer').children('.btn:nth-child(2)').attr('id','btnClose');
					$('.modal-footer').children('.btn:nth-child(2)').html('Close');
					$('.modal-footer').children('.btn:nth-child(2)').css('display','');
					$('#cur_del_key').val('');
					
					// Remove from pd_order table
				  $('#row_'+pd_order).remove();

      	}
      	else{
      		//Inform error to user
					$('#modal_dialog').removeClass('modal-success').addClass('modal-warning');
	      	   $('.modal-header').children('h4').html(result_arr[1]);
	      	   $('.modal-body').children().html(result_arr[2]);
					$('.modal-footer').children('.btn:nth-child(1)').css('display','none');
					$('.modal-footer').children('.btn:nth-child(2)').attr('id','btnClose');
					$('.modal-footer').children('.btn:nth-child(2)').html('Close');
					$('.modal-footer').children('.btn:nth-child(2)').css('display','');
					$('#cur_del_key').val('');
      	}
      	
      	// alert(result);
				//$('#mainbox').parent().replaceWith(result);
      	// $('#mainbox').parent().parent().replaceWith(result);
      }
	  },
		error: function(jqXHR, exception) {
	  	var errorStr = '';
	  	//alert(jqXHR.status);

			if(jqXHR.status === 0){
				errorStr = 'Can not connect. Please verify network</p></div>';
			}
			else if(jqXHR.status == 404){
				errorStr = 'Requested page not found [404]</p></div>';
			}
			else if(jqXHR.status == 500){
				errorStr = 'Internal server error [500]</p></div>';
			}
			else if(exception === 'parsererror'){
				errorStr = 'Requested JSON parse failed</p></div>';
			}
			else if(exception === 'timeout'){
				errorStr = 'Time out error</p></div>';
			}
			else if(exception === 'abort'){
				errorStr = 'Ajax request aborted</p></div>';
			}
			else{
				errorStr = 'Uncaught Error : ' + jqXHR.responseText + '</p></div>';
			}

    	$('#modal_dialog').removeClass('modal-success').addClass('modal-warning');
    	$('.modal-header').children('h4').html('Some problems have occured!');
    	$('.modal-body').children().html(errorStr);
			$('.modal-footer').children('.btn:nth-child(1)').css('display','none');
			$('.modal-footer').children('.btn:nth-child(2)').css('display','');
			$('.modal-footer').children('.btn:nth-child(2)').html('Close');

	  }
	});

}
