$(function(){
    /* array of my favorite cartoons */
    var topics = ["curb your enthusiasm", "the simpsons", "bob's burgers", "futurama", "dexter's laboratory", "rugrats", "gumball", "adventure time", "robot chicken", "samurai jack"];
    var $grid = $('#gif-grid');
    var $input = $('input');
    var ul = document.querySelector('#list');

    /* initializes all buttons based on current array */ 
    function createAGrid(topic){
      var list = document.createElement('li');
      var button = document.createElement('button');
      var name = document.createTextNode(topic);
      button.setAttribute('class','gifgrabber');
      button.appendChild(name);
      list.appendChild(button);
      ul.appendChild(list);
    }
    function errorMessage(){
      $grid.append("<p>Can't retreive your gifs</p>")
    }
    /* e represents found data from api*/
    function foundImgs(e){
      e.data.forEach(function(each, i){
        var wrapper = document.createElement('div');
        var h = document.createElement('h2');
        var img = document.createElement('img');
        var rating = document.createTextNode(each.rating.toUpperCase());
        var stillDataURL = each.images.fixed_height_still.url;
        img.setAttribute('src', stillDataURL);
        wrapper.setAttribute('class', 'gifPost');
        wrapper.appendChild(img);
        h.appendChild(rating);
        wrapper.appendChild(h);
        $grid.append(wrapper);
      });
      /* when image is clicked we start and stop*/
      function boom(){
          if(this.src.search('_s') !== -1){
            var changedSrc = this.src.replace('_s','');
            console.log(changedSrc);
            this.setAttribute('src', changedSrc);
              
          } else{
            var pattern = /[0-9]{3}(?=\.gif)/;
            var found = this.src.match(pattern);
            var changedSrc = this.src.replace(found[0], found[0].concat('_s'));
            this.setAttribute('src', changedSrc);
          }
      };
        $('img').on('click', boom);
    }
   $('.gifgrabber').on('click', grabGifs);
    function grabGifs(){
      /* clears grid */
        $grid.empty();
         /* calls the data from api */
        var searchTerm = this.innerText.split(" ").join("+");
      /* enter your api key below */
        var APIkey = 'f1197fe12c78422db8080fcfa68e6d7c';
        var limit = 10;
        var link = "https://api.giphy.com/v1/gifs/search?q="+searchTerm+"&api_key="+APIkey+"&limit="+limit;
        var xhr = $.get(link);
        xhr.done(foundImgs);
        xhr.fail(errorMessage);
    }
  function gridCreator(topics){
    topics.forEach(function (topic, i){
        createAGrid(topic);
      });
  }
    function addToTopics(){
      topics.push(this.value);
      $('#list').empty();
      gridCreator(topics);
      $('.gifgrabber').on('click', grabGifs);
    }
    gridCreator(topics);
      $('input').on('change', addToTopics);
      $('.gifgrabber').on('click', grabGifs);
    }  
)