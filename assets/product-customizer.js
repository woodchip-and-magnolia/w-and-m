console.log('testtt123');
var pageURL = window.location.href;
var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
var product_id ='';
var cart_item = '';
 var product_image_last_src = '';
 var note_desc="For additional design manipulation requirements please email details to hello@woodchipandmagnolia.co.uk Thanks!";
//console.log(lastURLSegment);
if(lastURLSegment == 'thank_you'){
    console.log('welcome to thank you page !!');
    console.log(Shopify.checkout);
   
    console.log(Shopify.checkout.line_items);
    console.log('array length : '+Shopify.checkout.line_items.length);
   
    for (var i = 0; i < Shopify.checkout.line_items.length; i++) {
      product_id += Shopify.checkout.line_items[i].product_id + ",";
    }
    
    console.log('Product id in thank you page : '+product_id);m
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "https://woodchip.herokuapp.com/api/products/" + product_id + ".json", true); 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
         // Response
         var response = this.responseText;
         console.log('response from unpublish products api endpoint: ', response);
       }
    };

    var data = {shopify_domain: Shopify.shop};
    
    xhttp.send(JSON.stringify(data));
    
}

var money_format = theme.moneyFormat;
//console.log(money_format);
var currency = money_format.split("{{");
//console.log(currency[0]);

jQuery(document).ready(function () {
jQuery('head').append('<link rel="stylesheet" rel="nofollow" href="https://mswebapps.com/product-customizer/assets/css/product-customizer.css" type="text/css" />');
jQuery('head').append('<link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet">');
jQuery('head').append('<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap" rel="stylesheet">');

});

//console.log(Shopify.checkout.line_items);
//console.log(count(Shopify.checkout.line_items));
var href = location.href;
console.log(href.match(/([^\/]*)\/*$/)[1]);

if(typeof Checkout === 'object'){
  if(typeof Checkout.$ === 'function'){
    /* your super duper code in here, such as: */
    alert('nnnnnn');
  }
}
    

(function(){
/****************/
$(document).find('.price__regular dd').append('<b>/m2</b>');  

var manage_product_customizer = function($){
 var api_path ='https://mswebapps.com/product-customizer/ApiController';
 const shop_domain = Shopify.shop;
 const cur_path = window.location.pathname;
 const cur_page = cur_path.substring(cur_path.lastIndexOf("/") + 1); 
 var product_page = cur_path.indexOf('/products/');
 var mural_page = cur_path.indexOf('wall-murals');
 
 var product_id =  meta.product.id;
 var add_product_data;
 var product_price_meter ='';
 var product_price_feet ='';
 
 

 if(product_page !== -1){product_page = true;}else {product_page = false;}
 //if(mural_page !== -1){mural_page = true;}else {mural_page = false;}
 var shop_data = {shop_domain: shop_domain, product_id: product_id };
//  if(mural_page !== -1)
 console.log('mural_page : '+mural_page);
 var product_image = '';
 var product_title;
 var product_image_id;
 var product_image_last = '';

 var backgroundSize ='cover';
  
/*$.getJSON('/admin/api/2020-07/products/'+meta.product.id+'.json',shop_data, function(data_resp2) {
   
   console.log(data_resp2);
   console.log(data_resp2.product.image.src);
   product_image = data_resp2.product.image.src;
    
});*/

  $.ajax({
      type: "GET",
      url: window.location.href+'.json',
      dataType: "json",
      data: shop_data,
      async: false,
      success: function(data_resp23) { 
        console.log('*** data_resp23 **');
        console.log(data_resp23);
        product_image = data_resp23.product.image.src;
        product_image_id = data_resp23.product.image.id;
        console.log(product_image);
        console.log(product_image_id);
        console.log(data_resp23.product.title);
        product_title = data_resp23.product.title;
        
        product_price_meter = data_resp23.product.variants[0].price;
        product_price_feet = (product_price_meter*10.764).toFixed(2);
        
        console.log('Product price : '+product_price_meter);
        console.log('Product price feet : '+product_price_feet);
        console.log('image array last : '+data_resp23.product.images.length);
        product_image_last = (data_resp23.product.images.length) - 1;
        console.log('image array last index : '+product_image_last);
        console.log('last image src : '+data_resp23.product.images[product_image_last].src);
        product_image_last_src = data_resp23.product.images[product_image_last].src; 
      }
  });



    $.getJSON("https://woodchip.herokuapp.com/api/shops/settings",{shopify_domain: shop_domain}, function(data_resp) {
         console.log('data_resp: ', data_resp);
         
         //var cust_data = data_resp.customizer;
         
         var app_terms_popup = '';
         var custBtn_bgcolor  = '#4F5E44';
         var custBtn_color = '#fff';
         var custBtn_text = 'CUSTOMISE & BUY';
         var pop_title = '';
         var pop_description = '';
         var cm_width = '';
         var cm_height = '';
         var feet_width = '';
         var inch_width = '';
         var feet_height = '';
         var inch_height = '';

       
            product_price_meter = data_resp.price_per_meter_squared;
            console.log('product_price_meter: ', product_price_meter);
            product_price_feet = (product_price_meter/10.7636).toFixed(2);
            console.log('product_price_feet: ', product_price_feet);
            
           
            var popup_context = '';
            var mural_btn_enable='';
            var domai = pageURL.split('/');
            var mural_url=domai[domai.length - 3];
            var is_mural=pageURL.indexOf("mural");
            console.log('is_mural: ', is_mural);
            if(is_mural != - 1) 
            {
                $("#AddToCart-product-template").text('BUY SAMPLE');
                $(".shopify-payment-button").replaceWith("<button type='button' class='customize customize_buy_btn shopify-payment-button__button--unbranded'>"+custBtn_text+"</button>");
            }
           
            var k_hight="100";
            var k_width="200";
            console.log('product_image '+product_image);
            console.log('product_image_last_src '+product_image_last_src);

            var figure_html='<figure id="fig_pro" style="height:'+k_hight +'px;width:'+k_width +'px" >'+
                            '<img id="main-imag"  style="max-width:100%;max-height:100%" src="'+ product_image_last_src+'" />'+
                            '</figure>';

            app_terms_popup +='<div id="product_customizer" class="MS_ajax_modal"> <div class="MS_ajax_wrap"> <span class="MS_ajax_close">×</span> <div class="MS_ajax_head"> <div class="head-heading">'+pop_title+'</div><div class="head-descrb">'+pop_description+'</div></div><div class="MS_ajax_body"> <div class="ajax_body_content"> <div id="temp" style="display:none">'+figure_html+'</div><div class="grid_row"> <div class="grid_col span_2_of_3 ajax_column product_image" style="text-align:center;"><div id="divSquare" style="display:none"><canvas id="file-preview" ></canvas></div><div  id="divchartContainer" style="background-repeat: repeat-x;max-width:100%;max-height:400px;display: inline-block; background-image: url('+product_image_last_src+'); "></div> <img id="chartContainer" src='+ product_image_last_src+' style="max-width:100%;display: inline-block; width: 604px; height: 604px; object-fit:fill !important;"/ ><legend id="leg_value"></legend> <br/><div id="screen_note" style="font-size:12px;color:#767676">*MAXIMISE WINDOW OR ROTATE DEVICE TO LANDSCAPE FOR BEST PREVIEW</div> </div><div class="grid_col span_1_of_3 ajax_column border_full"> <h3 class="content_title">Your Wall Dimensions</h3> <div class="content_divider"></div><div class="cm_cal_area">'+
                                '<div class="grid_row calfield_cm">'+
                                    '<div class="grid_col span_1_of_2">'+
                                        '<label><strong>Width</strong> (cm)</label>'+
                                        '<input type="number" id="width_in_cm" value="'+cm_width+'" class="cm_on_change" style="width:100%">'+
                                    '</div>'+
                                    '<div class="grid_col span_1_of_2">'+
                                        '<label><strong>Height</strong> (cm)</label>'+
                                        '<input type="number" id="height_in_cm" value="'+cm_height+'" class="cm_on_change" style="width:100%">'+
                                    '</div>'+
                                '</div></div><div class="inch_cal_area"> <div class="grid_row calfield_inch"> <div class="grid_col span_1_of_2"> <label><strong>Width</strong> (inch)</label>'+
                                '<div class="grid_row">'+
                                    '<div class="grid_col span_1_of_2" style="float:left;width:30% !important; display:none;">'+
                                        '<input type="number" id="width_in_feet" value="'+feet_width+'" class="inch_on_change" style="width:120%">'+
                                    '</div>'+
                                    '<div class="grid_col span_1_of_2" style="float:left;width:70% !important">'+
                                        '<input type="number" id="width_in_inch" value="'+inch_width+'" class="inch_on_change" style="width: 100%;" min="1" >'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="grid_col span_1_of_2">'+
                                '<label><strong>Height</strong> (inch)</label>'+
                                '<div class="grid_row">'+
                                    '<div class="grid_col span_1_of_2" style="float:left;width:30% !important;display:none;">'+
                                        '<input type="number" id="height_in_feet" value="'+feet_height+'" class="inch_on_change" style="width:120%">'+
                                    '</div>'+
                                    '<div class="grid_col span_1_of_2" style="float:left;width:70% !important">'+
                                        '<input type="number" id="height_in_inch" value="'+inch_height+'" class="inch_on_change" style="width: 100%;" min="1" >'+
                                    '</div>'+
                                '</div>'+
                            '</div></div></div><div class="grid_row"> <div class="switch_properties"> <a href="#" id="inch">inch</a> <span>|</span> <a href="#" id="cm">cm</a> </div></div><div class="content_divider_secondary"></div><div class="grid_row"> <div class="calculated_estimate"> <div class="product_pricing">$0</div><div class="product_properties" name="priceper">('+currency[0].trim()+''+product_price_meter+' / m2)</div><h5 id="validation_line"><span style="color:red">Minimum order:  Â£155</span></h5> </div></div><div class="grid_row" style="text-align: center;"> <button type="button" id="addto_cart" name="addto_cart" class="cart-checkout-btn checkout-btn btn btn-primary btn-lg" >ADD TO BAG</button> <p class="instruction" style="font-size:15px;">'+note_desc+'</p></div><div class="content_divider_secondary"></div><div class="grid_row"><label class="order_comment_label">Add a comment (optional):</label><textarea class="order_comment ful_width"></textarea></div></div></div></div><div class="MS_ajax_footer"></div></div></div><canvas id="myCanvas" height=1024 width=360></canvas>';

             $('body').append(app_terms_popup);
             //var modal = document.getElementById("ms_terms_ajx_popup_modal");
             var modal_popup = document.getElementById("product_customizer");
            
              var span_close = document.getElementsByClassName("MS_ajax_close")[0];
              span_close.onclick = function() { 
                modal_popup.style.display = "none";
              }
             $(".customize").click(function(){
               
                   modal_popup.style.display = "block";
                     $('.cm_on_change').trigger("change");
                });
            //global var for cm
            $('#width_in_cm').val(400);
            $('#height_in_cm').val(400);
            var default_in_cm_width = cm_width;
            var default_in_cm_height = cm_height;
            var rate_in_m = 59.20;
            $('#cm').css('text-decoration-line', 'none')
            $('#cm').css('background', '#4F5E44')
            $('#cm').css('color', 'white')
            $('#cm').css('padding', '4px')
            $('#cm').css('border-radius', '2px')
            var default_price_for_m = ((default_in_cm_width * default_in_cm_height) * 0.0001 )* rate_in_m;
            console.log(default_in_cm_width +'  '+ default_in_cm_height);
            console.log(default_in_cm_width * default_in_cm_height+'sq cm');
            console.log((default_in_cm_width * default_in_cm_height)*0.0001+'sq m');
            
            //global var for ft and inch
            var default_in_ft_width = feet_width; 
            var default_in_inch_width = inch_width;
            var default_in_ft_height = feet_height;
            var default_in_inch_height = inch_height;
            var rate_in_ft = 5.1;
            /*hide the inch area on loading*/
    
            $('#validation_line').hide();
            $('.inch_cal_area').hide();
            $('#leg_value').html("W "+default_in_cm_width + " * H " + default_in_cm_height + " cm")
            if (default_price_for_m<155)
            {
                default_price_for_m=155;
            }
            if(default_price_for_m.toFixed(2) > 0 || default_price_for_m.toFixed(2) != '')
                $('.product_pricing').html(currency[0].trim()+''+ default_price_for_m.toFixed(2).trim());
            else
                $('.product_pricing').html('$ 0.00');
            console.log('product pricing :'+default_price_for_m);
            $('#chartContainer').width(default_in_cm_width);
            $('#chartContainer').height(default_in_cm_height);
            $('#inch').css('text-decoration-line', 'underline')
            
            
            //$('#chartContainer').css("width", 400);
            //$('#chartContainer').css("height", 400);
             $('#chartContainer').width(345).height(230);
            //prepare_image_sizes(400,400,1);
            //inch click 
              
    
            $('#inch').click(function() {
                 var color = $( this ).css( "text-decoration-line" );
                 if(color == 'none')
                 {
                     return false;
                 }
                
                $('.inch_cal_area').show()
                $('.cm_cal_area').hide()
                $('.product_properties').html('('+currency[0].trim()+''+product_price_feet+' / sq ft)')
                $('#cm').css('text-decoration-line', 'underline')
                $(this).css('text-decoration-line', 'none')
                $(this).css('background', '#4F5E44')
                $(this).css('color', 'white')
                $(this).css('padding', '4px')
                $(this).css('border-radius', '2px')
                $('#cm').css('background', 'white')
                $('#cm').css('color', '#4F5E44')
    
                //leg val change on cal
    
                var width_in_cm = parseInt($('#width_in_cm').val())
                var height_in_cm = parseInt($('#height_in_cm').val())
                var cm_to_inch_width = width_in_cm * 0.393701;
                var cm_to_inch_height = height_in_cm * 0.393701;
                var sqr_feet = (cm_to_inch_width * cm_to_inch_height) / 144
                var cal2 = sqr_feet * 5.50
    
                //breaking the value into ft and inch
    
                var inch_to_feet_wd = cm_to_inch_width / 12;
                var inch_to_feet_ht = cm_to_inch_height / 12;
                var ft_in_val_width = Math.floor(inch_to_feet_wd);
                var inch_in_val_width = (inch_to_feet_wd - ft_in_val_width) * 12
                var ft_in_val_height = Math.floor(inch_to_feet_ht);
                var inch_in_val_height = (inch_to_feet_ht - ft_in_val_height) * 12;
    
                //$('.product_pricing').html('$' + cal2.toFixed(2))

                
                var width_in_cm = parseInt($('#width_in_cm').val());
                var height_in_cm = parseInt($('#height_in_cm').val());
                
                var width_cm_feet = Math.round(width_in_cm/2.54);
                var width_cmtofeet = Math.floor(width_cm_feet/12);
                var width_cmtoinch = Math.round(width_cm_feet - 12* width_cmtofeet );

                
                var height_cm_feet = Math.round(height_in_cm/2.54);
                var height_cmtofeet = Math.floor(height_cm_feet/12);
                var height_cmtoinch = Math.round(height_cm_feet - 12 * height_cmtofeet) ;

                console.log('width_in_cm/2.54 '+width_cm_feet);
                console.log('width_cm_feet/12 '+width_cmtofeet);
                console.log('inch subtract 12 '+width_cmtoinch);
                console.log('inch subtract 12 * width_cmtofeet '+width_cmtoinch);
                
                console.log('height_in_cm/2.54 '+height_cm_feet);
                console.log('height_cm_feet/12 '+height_cmtofeet);
                console.log('inch subtract 12 '+height_cmtoinch);
                console.log('inch subtract 12 * width_cmtofeet '+height_cmtoinch);
    
                //setting up the value in the input field
                $('#width_in_feet').val( Math.trunc(width_cmtofeet));
                $('#width_in_inch').val( Math.trunc(width_cmtoinch));
                $('#height_in_feet').val(Math.trunc(height_cmtofeet));
                $('#height_in_inch').val(Math.trunc(height_cmtoinch));
                
                 //$('#width_in_feet').val(0);
                 //$('#height_in_feet').val(0);
                
                var feet_width =  $('#width_in_feet').val();
                var inch_width =  $('#width_in_inch').val();
                var feet_height = $('#height_in_feet').val();
                var inch_height = $('#height_in_inch').val();
                
                //console.log(feet_width+' feet_width '+inch_width+' inch_width '+feet_height+' feet_height '+inch_height);
                
                var widthInchtoFeet = (inch_width / 12).toFixed(2);
                var heightInchtoFeet = (inch_height / 12).toFixed(2);
                
                //console.log(widthInchtoFeet+' w_inch_to_feet '+heightInchtoFeet+' h_inch_to_feet ');
                
                feet_width = parseInt(feet_width) + parseFloat(widthInchtoFeet);
                feet_height = parseInt(feet_height) + parseFloat(heightInchtoFeet);
                
                //console.log(feet_width+' new feet width '+feet_height+' new inch width ');
                
                var squareFeet = feet_width*feet_height;
                
                console.log('testing price '+product_price_feet);
                var final_cost=(squareFeet*product_price_feet);
                if (final_cost<155)
                {
                 final_cost=155;   
                }
                 if((feet_width > 0 && inch_width > 0 && feet_height > 0 && inch_height > 0) && (feet_width != '' && inch_width != '' && feet_height != '' && inch_height != '')){
                    $('.product_pricing').html(currency[0].trim()+''+final_cost.toFixed(2).trim());
                        }else{
                    $('.product_pricing').html('$ 0.00');
                }
                
                var convert_inch_w=parseFloat($('#width_in_feet').val())*12+parseFloat($('#width_in_inch').val());
                var convert_inch_h=parseFloat($('#height_in_feet').val())*12+parseFloat($('#height_in_inch').val());
                $('#width_in_inch').val(convert_inch_w);
                $('#height_in_inch').val(convert_inch_h);
                $('#width_in_feet').val(0);
                $('#height_in_feet').val(0);
                $('#leg_value').html('W '+convert_inch_w + ' inch' + ' * H ' + convert_inch_h+ ' inch')
                
                cart_item = 'W '+convert_inch_w + ' inch' + ' * H ' + convert_inch_h+ ' inch';
                 $('inch_on_change').trigger('change');
            });
            //centimeter click
            $('#cm').click(function() {
                
                 var color = $( this ).css( "text-decoration-line" );
                 if(color == 'none')
                 {
                     
                     return false;
                 }
                $('.cm_cal_area').show()
                $('.inch_cal_area').hide()
                $('.product_properties').html('('+data_resp.price_per_meter_squared+'/ m2)')
                $('.product_properties').html('('+currency[0].trim()+''+product_price_meter+' / m2)')
                $('#inch').css('text-decoration-line', 'underline')
                $(this).css('text-decoration-line', 'none')
                $(this).css('background', '#4F5E44')
                $(this).css('color', 'white')
                $(this).css('padding', '4px')
                $(this).css('border-radius', '2px')
            
                
                $('#inch').css('background', 'white')
                $('#inch').css('color', '#4F5E44')
                //leg val change on cal
    
                var width_in_feet = parseInt($('#width_in_feet').val());
                var width_feet_to_inch = width_in_feet * 12;
                var width_in_inch = parseInt($('#width_in_inch').val());
                var width_in_general = parseInt(width_feet_to_inch + width_in_inch);
                var height_in_feet = parseInt($('#height_in_feet').val());
                var height_feet_to_inch = height_in_feet * 12;
                var height_in_inch = parseInt($('#height_in_inch').val());
                var height_in_general = parseFloat(height_feet_to_inch + height_in_inch);
                var width_inch_to_cm = width_in_general / 0.393701;
                var height_inch_to_cm = height_in_general / 0.393701;
                var sqr_mtr = (width_inch_to_cm * height_inch_to_cm) / 10000;
                var new_cal = sqr_mtr * rate_in_m;
                
                $('#width_in_feet').val(0);
                $('#height_in_feet').val(0);
                var width_in_feet = parseInt($('#width_in_feet').val());
                var width_in_inch = parseInt($('#width_in_inch').val());
                var height_in_feet = parseInt($('#height_in_feet').val());
                var height_in_inch = parseInt($('#height_in_inch').val());
                
                var width_in_cm =  Math.trunc(parseFloat(width_in_feet*30.48) +  parseFloat(width_in_inch*2.54));
                var height_in_cm = Math.trunc(parseFloat(height_in_feet*30.48) +  parseFloat(height_in_inch*2.54));
                 
                console.log('feet to width in cm : '+width_in_cm);
                $('#width_in_cm').val(width_in_cm);
                $('#height_in_cm').val(height_in_cm);
                
                var rate_in_m = 59.20; 
                var default_price_for_m = (($('#width_in_cm').val() * $('#height_in_cm').val()) * 0.0001 )* product_price_meter;
                if (default_price_for_m<155)
                {
                    default_price_for_m=155;
                }
                if(default_price_for_m.toFixed(2) > 0 || default_price_for_m.toFixed(2) != '')
                    $('.product_pricing').html(currency[0].trim()+''+default_price_for_m.toFixed(2).trim());
                else
                    $('.product_pricing').html('$ 0.00');
                
                //$('.product_pricing').html('$' + default_price_for_m.toFixed(2))
                $('#leg_value').html('W '+$('#width_in_cm').val() + ' cm * H ' + $('#height_in_cm').val() + ' cm');
                
                cart_item = 'W '+$('#width_in_cm').val()+' cm x H '+$('#height_in_cm').val()+' cm';
                
                //setting up the value in the input field
                
                /*$('#width_in_cm').val(cust_data.cm_width);
                $('#height_in_cm').val(cust_data.cm_height);*/
                
                
            });
    
         /*code of calculation*/
    
    var controlFrom='width';
         //calculating in cm and meter
          $('.cm_on_change').change(function() {
             
              controlFrom= $(this).attr("id");
             if ($(this).attr("id")=="height_in_cm")
             {
                 
                 controlFrom="height";
             }
                var width_in_cm = parseInt($('#width_in_cm').val())
                var height_in_cm = parseInt($('#height_in_cm').val())
                var sqr_meter = (width_in_cm * height_in_cm) / 10000
                //min validation code and button disabled
               
                //var cal = sqr_meter * rate_in_m
                var cal = sqr_meter * product_price_meter;
                minimum_validation(cal);
                if (cal<155)
                {
                    cal=155;
                }
                console.log('testing cm pric '+product_price_meter);
                if((width_in_cm > 0 && height_in_cm > 0) && (width_in_cm != '' && height_in_cm != '')){
                    $('.product_pricing').html(currency[0].trim()+'' + cal.toFixed(2).trim());
                        }else{
                    $('.product_pricing').html('$ 0.00');
                }
                      prepare_image_sizes(width_in_cm,height_in_cm,0);
                //$('.product_pricing').html('$' + cal.toFixed(2))
                //resize-image
                $('#chartContainer').width(width_in_cm);
                $('#chartContainer').height(height_in_cm);
                //leg_value
                $('#leg_value').html('W ' + width_in_cm + ' * H ' + height_in_cm + ' cm');
                cart_item = 'W '+$('#width_in_cm').val()+' cm x H '+$('#height_in_cm').val()+' cm';
                if(height_in_cm < 230)
                    $('#chartContainer').css("background-size","cover");
                //alert('original backgroundSize : '+backgroundSize);
                //backgroundSize = height_in_cm;
                //console.log('backgroundSize : '+backgroundSize);
               
            })
    
    function minimum_validation(price_value)
    {
        price_value=parseFloat(price_value);
         if (price_value < 155) {
             var con_html="<span class='money'>Â£ 155.00</span>";
             $('.product_pricing').html(con_html);
                   // $('#validation_line').show();
                   // $('#addto_cart').prop('disabled', true);
                   // $('#addto_cart').html('button disabled');
                } else {
                    $('#validation_line').hide();
                    $('#addto_cart').prop('disabled', false);
                    $('#addto_cart').html('ADD TO BAG');
                }
    }
            //calculating in feet and inch
            $('.inch_on_change').change(function() {
               
                var width_in_feet = parseInt($('#width_in_feet').val())
                var width_feet_to_inch = width_in_feet * 12
                var width_in_inch = parseInt($('#width_in_inch').val())
                var width_in_general = parseInt(width_feet_to_inch + width_in_inch)
                var height_in_feet = parseInt($('#height_in_feet').val())
                var height_feet_to_inch = height_in_feet * 12
                var height_in_inch = parseInt($('#height_in_inch').val())
                var height_in_general = parseFloat(height_feet_to_inch + height_in_inch)
                var sql_feet = (width_in_general * height_in_general) / 144
               
    
                console.log(sql_feet)
                var cal1 = sql_feet * rate_in_ft
                //$('.product_pricing').html('$' + cal1.toFixed(2))
                var feet_width =  $('#width_in_feet').val();
                var inch_width =  $('#width_in_inch').val();
                var feet_height = $('#height_in_feet').val();
                var inch_height = $('#height_in_inch').val();
                console.log(feet_width+' feet_width '+inch_width+' inch_width '+feet_height+' feet_height '+inch_height);
                var widthInchtoFeet = (inch_width / 12).toFixed(2);
                var heightInchtoFeet = (inch_height / 12).toFixed(2);
                console.log(widthInchtoFeet+' w_inch_to_feet '+heightInchtoFeet+' h_inch_to_feet ');
                
                feet_width = parseInt(feet_width) + parseFloat(widthInchtoFeet);
                feet_height = parseInt(feet_height) + parseFloat(heightInchtoFeet);
                console.log(feet_width+' new feet width '+feet_height+' new inch width ');
                var squareFeet = feet_width*feet_height;
                console.log('squarefeet '+squareFeet);
                var final_cost=squareFeet*product_price_feet;
                if (final_cost<155)
                {
                    final_cost=155;
                }
                minimum_validation(squareFeet*product_price_feet);
                if((feet_width > 0 && inch_width > 0 && feet_height > 0 && inch_height > 0) && (feet_width != '' && inch_width != '' && feet_height != '' && inch_height != '')){
                    $('.product_pricing').html(currency[0].trim()+''+ final_cost.toFixed(2).trim());
                        }else{
                    $('.product_pricing').html('$ 0.00');
                }
                
                //$('.product_pricing').html('$ '+(squareFeet*5.50).toFixed(2));
                //resize-image
                //$('#chartContainer').width(width_in_general);
                //$('#chartContainer').height(height_in_general);
                //leg_value
                
                var width_in_feet = parseInt($('#width_in_feet').val());
                var width_in_inch = parseInt($('#width_in_inch').val());
                var height_in_feet = parseInt($('#height_in_feet').val());
                var height_in_inch = parseInt($('#height_in_inch').val());
                
                var width_in_cm =  Math.trunc(parseFloat(width_in_feet*30.48) +  parseFloat(width_in_inch*2.54));
                var height_in_cm = Math.trunc(parseFloat(height_in_feet*30.48) +  parseFloat(height_in_inch*2.54));
                
                $('#chartContainer').width(width_in_cm);
                $('#chartContainer').height(height_in_cm);
                 prepare_image_sizes(width_in_cm,height_in_cm,1);
                $('#width_in_feet').val(0);
                $('#height_in_feet').val(0);
                //$('#leg_value').html(' ' + width_in_cm + ' * ' + height_in_cm + ' cm');
                var convert_inch_w=parseFloat($('#width_in_feet').val())*12+parseFloat($('#width_in_inch').val());
                var convert_inch_h=parseFloat($('#height_in_feet').val())*12+parseFloat($('#height_in_inch').val());
                
                $('#leg_value').html('W '+convert_inch_w + ' inch' + ' * H ' + convert_inch_h+ ' inch')
                
                cart_item = 'W '+convert_inch_w + ' inch' + ' * H ' + convert_inch_h+ ' inch';
            })
            
            /*cart_item = $('#width_in_cm').val()+' cm x '+$('#height_in_cm').val()+' cm';*/
              function canva_scaleToFill(img,cwidth,cheight){
           
              var canvas= document.getElementById('file-preview');
              canvas.width=cwidth;
              canvas.height=cheight;
            var ctx=canvas.getContext("2d");
    // get the scale
    var ratio = cwidth/cheight;
            var scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            // get the top left position of the image
            var x = (canvas.width / 2) - (img.width / 2) * scale;
            var y = (canvas.height / 2) - (img.height / 2) * scale;
           // ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            ctx.drawImage(img, 0, 0, img.width*scale, img.height *scale);
          
            }
            
              function maximizeSize(width, height, maxWidth, maxHeight) {
                if (width / height > maxWidth / maxHeight) var ratio = maxWidth / width;
                else ratio = maxHeight / height;
                return {
                    width: width *= ratio,
                    height: height *= ratio
                }
            }

            function prepare_image_sizes(k_width,k_hight,isPixels)
            {
               $('#chartContainer').remove();
                $('#divchartContainer').show();
              
                var screen_max_width=1000;
                 var screen_max_height=400;
                if ($(window).width()<400){
                    screen_max_width=$(window).width()-40;
                    screen_max_height=screen_max_width-60;
                }
                else if ($(window).width()<=1000){
                    screen_max_width=$(window).width()-40;
                    screen_max_height=250;
                }
                  console.log(screen_max_width+" wisssssssssss");
                var sizes=maximizeSize(k_width,k_hight,screen_max_width,screen_max_height);
                var img = new Image;
                img.src =product_image_last_src;

                 img.onload = function(){
                    var actual_width=sizes.width;
                    var actual_height=sizes.height;
                    var image_original_width=img.width;
                    var image_original_height=img.height;
                    var aspectRatio = 0;
                    var max_height=400;
                    image_original_width=img.width;
                    image_original_height=img.height;
                    aspectRatio = image_original_width/image_original_height;
                    k_hight= sizes.height;
                    k_width = sizes.width;
                    k_width = Math.round(k_hight*aspectRatio);
                    
                  
                    $('#divchartContainer').show();
                    $('#fig_pro').width(k_width);
                    $('#fig_pro').height(k_hight);
                    $('#temp').show();
                    
                    var w=$('#temp').find('#main-imag').width() ;
                    var h=$('#temp').find('#main-imag').height() ;
                    
                    $('#chartContainer').remove();
                    $('#divchartContainer').width(actual_width);
                    $('#divchartContainer').height(actual_height);
                    $("#divchartContainer").html(' ');
                   if ((w==0)&&(h==0))
                   {
                       w=k_width;
                       h=k_hight;
                   }
                    $("#divchartContainer").css("background-size", w+"px " + h + "px");
                    $('#temp').hide();
                    
                };
                 
            }// prepare image function end
            $('#addto_cart').on('click',function(event) {
                //alert('measurement : '+cart_item);
                var new_product_id;
                var new_product_price;
                        
                        var thestring = $('.product_pricing').text();
                        var theprice = thestring.replace( /^\D+/g, '');
                        
                        $.ajax({
                            type: "POST",
                            url: "https://woodchip.herokuapp.com/api/products.json",
                            dataType: "json",
                           /* data: add_product_data,*/
                            data: {shopify_domain: shop_domain, product_image: product_image, product_price:theprice, product_title: product_title},
                            async: false,
                            success: function(data_repository) { /* other stuff */
                                console.log('data_repository: ', data_repository);
                                
                                var add_appi_cart_data= {items: [
                                    {
                                      quantity: 1,
                                      id: data_repository.variant_id,
                                      price: data_repository.variant_price,
                                      properties: {
                                        'Size': cart_item,
                                        'Price':$('.product_pricing').text(),
                                        'Comment':$('.order_comment').val()
                                      }
                                    }
                                  ]};
                              
                               add_cart_dynamically(cart_item,add_appi_cart_data);
                            }
                        });
                        
                        
                      
                  
                   /* jQuery.post('/cart/add.js', {
                      items: [
                        {
                          quantity: 1,
                          id: meta.product.variants[0].id,
                          price: 129,
                          properties: {
                            'Size ': cart_item,
                            '<br>Price ':$('.product_pricing').text()
                          }
                        }
                      ]
                    });
                    
                    jQuery.getJSON('/cart.js', function(cart) {
                  		$('#cartCount').html(cart.item_count);
                  		location.reload(true);
                	});*/
                	
                	
      
            });
    
            //onclick image chane
           /* $("#img_change_to_black").click(function() {
               // $('#chartContainer').css("background-image", "url('https://dummyimage.com/400x400/000/fff.png')");
              
              var filterVal = 'grayscale(100%)';
              
              $('#chartContainer').css('filter',filterVal);
              
            });
    
            $("#img_change_to_white").click(function() {
              
    			
               var filterVal = 'grayscale(0%)';
               $('#chartContainer').css('filter',filterVal);          
               $('#chartContainer').css("background-image", "url('https://dummyimage.com/400x400/eaebf2/07080f.png')");
            });  */  
  
         // write code here 
    }) // $.getJSON("https://woodchip.herokuapp.com/api/shops/settings",{shopify_domain: shop_domain}, function(data_resp) {
 
 
 function add_cart_dynamically(cart_item,add_appi_cart_data)
 {
     console.log('inside');
                        $.ajax({
                            
                            url: "/cart/add.js",
                            data:add_appi_cart_data,
                            method:'post',
                            dataType: "json",
                           /* data: add_product_data,*/
                            
                            async: false,
                            success: function(data_repository) { /* other stuff */
                               update_cart_count();
                            },
                             error: function (request, status, error) {
                                 alert(request.responseText);
                            }
                        });
 }
}; // var manage_product_customizer = function($){
function update_cart_count()
{
    $.getJSON('/cart.js', function(cart) {
                                       console.log(cart);
           location.reload();
            
                              	
        });
}

/******************/
var loadScript = function(url, callback){
  var script = document.createElement("script");
  script.type = "text/javascript";
  if (script.readyState){ 
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" || script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = function(){
      callback();
    };
  }
script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};
if ((typeof jQuery === 'undefined') || (parseInt(jQuery.fn.jquery) === 1 && parseFloat(jQuery.fn.jquery.replace(/^1\./,'')) < 7.1)) {
  loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function(){
    jQuery191 = jQuery.noConflict(true);
    manage_product_customizer(jQuery191);
  });
} else {
    manage_product_customizer(jQuery);
}



})(); //(function(){