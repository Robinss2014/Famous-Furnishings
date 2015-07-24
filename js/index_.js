$(function() {
    console.log( "Ready!" );

    var style1 = { 
    	  style: "montclair",
        colors: ['Hydra', 'Indigo']
    };

    var style2 = { 
    	  style: "uptown",
        colors: ['Platinum', 'Sundown', 'Vanilla', 'Wasabi']
    };

    var data=style1;
    var ncolor=0;
    var pillow = $('#pillows .selected').attr('src').replace(/\.[^.$]+$/, '').split('/')[2];

    changeStyle(data);

    $('#styles img').click(function(){
      $('#styles img').removeClass('selected');
      $(this).addClass('selected');

      var style = $(this).attr('src').replace(/\.[^.$]+$/, '').split('/')[2];
      console.log(style);

      if(style=="uptown"){
        data = style2;
      }else if(style == "montclair"){
        data = style1;
      }

      changeStyle(data);
      changeColor(ncolor);

    });

    $('#colors img').click(function(){
      $('#colors img').removeClass('selected');
      $(this).addClass('selected');

      color = $(this).attr('src').replace(/\.[^.$]+$/, '').split('/')[2];
      console.log(color);

      ncolor = data.colors.indexOf(color);
      changeColor(ncolor);
    });

    function changeStyle(data){
      var template = $('#template').html();
      var rendered = Mustache.render(template, data);
      $('#dif-colors').html(rendered);
      $('#colors img')[0].setAttribute("class", "thumb selected");
      ncolor=0;
      setPreviewImage(data, ncolor, pillow);
    }

    function changeColor(ncolor){
      setPreviewImage(data, ncolor, pillow);
    }
    /**
     * Set the preview image 
     * @param style [A string for unique styles]
     * @param color [A string for unique colors]
     */
    function setPreviewImage(data, ncolor, pillow){
    	var preview = $(".preview img");
    	var source = "images/previews/"+data.colors[0]+"_"+data.style+".jpeg";
    	preview.attr('src', source); 	
    }
});