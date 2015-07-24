$(function() {
    console.log( "Ready!" );

    var data = { 
    	style: "montclair",
        colors: ['Hydra', 'Indigo']
    };

    var data2 = { 
    	style: "uptown",
        colors: ['Platinum', 'Sundown', 'Vanilla', 'Wasabi']
    };

    var template = $('#template').html();
	var rendered = Mustache.render(template, data);
	$('#dif-colors').html(rendered);
	$('#colors img')[0].setAttribute("class", "thumb selected");

    var style = data.style;
    var color = data.colors[0];
    var pillow = $('#pillows .selected').attr('src').replace(/\.[^.$]+$/, '').split('/')[2];

    $('#styles img').click(function(){
      $('#styles img').removeClass('selected');
      $(this).addClass('selected');

      style = $(this).attr('src').replace(/\.[^.$]+$/, '').split('/')[2];
      console.log(style);

	  if(style == "uptown"){
	  	var rendered = Mustache.render(template, data2);
		$('#dif-colors').html(rendered);
		$('#colors img')[0].setAttribute("class", "thumb selected");
		color = data2.colors[0];
	  }

	  if(color){
      	setPreviewImage(style,color);
      }else{
      	console.log("Please Pick a color!");
      }
      
    });

    $('#colors img').click(function(){
      $('#colors img').removeClass('selected');
      $(this).addClass('selected');

      color = $(this).attr('src').replace(/\.[^.$]+$/, '').split('/')[2];
      console.log(color);

      if(style){
      	setPreviewImage(style,color);
      }else{
      	console.log("Please Pick a style!");
      }
      
    });

	function imageExist(url){
	   var img = new Image();
	   img.src = url;
	   return img.height != 0;
	}
    /**
     * Set the preview image 
     * @param style [A string for unique styles]
     * @param color [A string for unique colors]
     */
    function setPreviewImage(style, color, pillow){
    	var preview = $(".preview img");
    	var source = "images/previews/"+color+"_"+style+".jpeg";

    	if(imageExist(source)){	
    		preview.attr('src', source);
    	}
    	
    }
});