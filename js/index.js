$(function() {
    console.log( "Ready!" );
    var canvas = window._canvas = new fabric.StaticCanvas('canvas');
    canvas.setBackgroundImage('images/previews/Platinum_uptown.jpeg', canvas.renderAll.bind(canvas));

    var style1 = { 
    	style: "montclair",
      colors: ['Hydra', 'Indigo','Vanilla', 'Wasabi'],
      pillows: ['Missy_Multi', 'Basque_Turquoise', 'Calliope_Carnival'],
      scale:1.66,
      left:[74,485],
      top:[150,135],
      angle:[-7.5,7]
    };

    var style2 = { 
    	style: "uptown",
      colors: ['Platinum', 'Sundown'],
      pillows: ['Gypsy_Beet', 'Basque_Turquoise', 'Maharam_BK'],
      scale:1.55,
      left:[100,470],
      top:[151,135],
      angle:[-7.5,8.2]
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
      setPreviewImage(data, ncolor);

      $('#colors img').click(function(){
        $('#colors img').removeClass('selected');
        $(this).addClass('selected');

        var color = $(this).attr('src').replace(/\.[^.$]+$/, '').split('/')[2];
        console.log(color);

        ncolor=data.colors.indexOf(color);
        console.log("ncolor = "+ncolor);
        // setPreviewImage(data, ncolor);
        createPreviewImage(data, ncolor, npillow);
      });

      $('#pillows img').click(function(){
        $('#pillows img').removeClass('selected');
        $(this).addClass('selected');

        var pillow = $(this).attr('src').replace(/\.[^.$]+$/, '').split('/')[2];
        console.log(pillow);

        npillow = data.pillows.indexOf(pillow);
        console.log("npillow = "+npillow);

        createPreviewImage(data, ncolor, npillow);

      });

    }

    /**
     * Set the preview image 
     * @param data    [An object containing all the information]
     * @param ncolor  [The position for color in the array colors]
     */
    function setPreviewImage(data, ncolor){
      var preview = $(".preview img");

      var source = "images/previews/"+data.colors[ncolor]+"_"+data.style+".jpeg";
      // preview.attr('src', source); 
      loadImagefromURL(source); 

    }

    /**
     * Create the preview image by combining the base image and the pillow image
     * @param data    [An object containing all the information]
     * @param ncolor  [The position for color in the array colors]
     * @param npillow [The position for the pillow in the array pillows]
     */
    function createPreviewImage(data, ncolor, npillow){
      var preview = $(".preview img");

      var baseImage = "images/previews/"+data.colors[ncolor]+"_"+data.style+".jpeg";
      var pillow = "images/pillows/"+data.pillows[npillow]+".png";

      console.log(baseImage);
      console.log(pillow);

      canvas.clear();
      // Combine the baseImage and pillow Image here
      fabric.Image.fromURL(baseImage, function(img) {
        var base = img.set({ 
                      width: 700,
                      height: 488 
                    });

        fabric.Image.fromURL(pillow, function(img) {
          var pillow1 = img.set({ scaleX: data.scale , scaleY:data.scale, angle: data.angle[0], left: data.left[0], top: data.top[0] });
          var pillow2 = fabric.util.object.clone(img).set({ angle: data.angle[1], left: data.left[1], top: data.top[1] });
          canvas.add(new fabric.Group([ base, pillow1, pillow2], { left: 0, top: 0 }));
          canvas.renderAll();
        });
      });
      

    }

    function loadImagefromURL(url){
      canvas.clear();
      fabric.Image.fromURL(url, function(oImg) {
        oImg.set({
            width: 700,
            height: 488
        });
        canvas.add(oImg);
        canvas.centerObject(oImg);
        canvas.renderAll();
      });
    }
});