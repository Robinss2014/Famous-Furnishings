$(function() {
    console.log( "Ready!" );

    var style1 = { 
    	style: "montclair",
      colors: ['Hydra', 'Indigo','Vanilla', 'Wasabi'],
      pillows: ['Missy_Multi', 'Basque_Turquoise', 'Calliope_Carnival']
    };

    var style2 = { 
    	style: "uptown",
      colors: ['Platinum', 'Sundown'],
      pillows: ['Gypsy_Beet', 'Basque_Turquoise', 'Vibes_Pink']
    };

    var data=style1;
    var ncolor = 0;
    var npillow = 0;

    changeStyle(data);

    $('#styles img').click(function(){
      $('#styles img').removeClass('selected');
      $(this).addClass('selected');

      style = $(this).attr('src').replace(/\.[^.$]+$/, '').split('/')[2];
      console.log(style);

      if(style=="uptown"){
        data = style2;
      }else{
        data = style1;
      }

      changeStyle(data);

    });



    function changeStyle(data){
      var colorTemplate = $('#color-template').html();
      var colorRendered = Mustache.render(colorTemplate, data);
      $('#dif-colors').html(colorRendered);
      $('#colors img')[0].setAttribute("class", "thumb selected");

      var pillowTemplate = $('#pillow-template').html();
      var pillowRendered = Mustache.render(pillowTemplate, data);
      $('#dif-pillows').html(pillowRendered);
      $('#pillows img')[0].setAttribute("class", "thumb selected");

      ncolor = 0;
      npillow = 0;
      setPreviewImage(data, ncolor, npillow);

      $('#colors img').click(function(){
        $('#colors img').removeClass('selected');
        $(this).addClass('selected');

        var color = $(this).attr('src').replace(/\.[^.$]+$/, '').split('/')[2];
        console.log(color);

        ncolor=data.colors.indexOf(color);
        console.log("ncolor = "+ncolor);
        setPreviewImage(data, ncolor, npillow);
      });

      $('#pillows img').click(function(){
        $('#pillows img').removeClass('selected');
        $(this).addClass('selected');

        var pillow = $(this).attr('src').replace(/\.[^.$]+$/, '').split('/')[2];
        console.log(pillow);

      });

    }

    function changeColor(ncolor){
      setPreviewImage(data, ncolor, npillow);
    }
    /**
     * Set the preview image 
     * @param style [A string for unique styles]
     * @param color [A string for unique colors]
     */
    function setPreviewImage(data, ncolor, npillow){
    	var preview = $(".preview img");

    	var source = "images/previews/"+data.colors[ncolor]+"_"+data.style+".jpeg";
    	preview.attr('src', source); 	
    }
});