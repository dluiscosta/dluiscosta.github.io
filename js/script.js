function portfolio_color(name) {
  // Hardcoding the dominant colors for each portfolio item's cover, in RGB
  var dict = {
    'tcc':'91, 72, 102',
    'portfolio':'3, 66, 110',
    'pythongame':'84, 55, 64'
  };
  color = dict[name]
  if(!color) {
    color = '3, 58, 84'; //default dark blue
  }
  return color
}


function extract_dominant(img_src) {
  // Hardcoding the dominant colors with a src-to-color dict
  // using https://www.imgonline.com.ua/eng/get-dominant-colors.php
  var dict = {
    'img/wolf.jpeg':'#583e2e',
    'img/minha_foto.png':'#ddd3d9',
    'img/portfolio/tcc/cover.jpg':'#4e585e',
    'img/portfolio/portfolio/cover.jpg':'#03426e',
    'img/portfolio/pythongame/cover.jpg': '#1a0d12',
    'img/portfolio/tcc/half_cover.jpg':'#4e585e',
    'img/portfolio/portfolio/half_cover.jpg':'#69818c',
    'img/portfolio/pythongame/half_cover.jpg': '#1a0d12'
  };
  dominant_color = dict[img_src];
  if(!dominant_color) {
    dominant_color = '#033a54';
    console.log("Could not find dominant color for " + img_src);
  }
  return dominant_color;
}


function keep_potfolio_modal() {
  var els = document.getElementsByClassName("portfolio-modal");
  if (els.length != 0) {
    var i = 0;
    for (i = 0; i < els.length; i += 1) {
      el = els[i]
      name = el.getAttribute('id').split('-').slice(-1)[0];

      // Check dominant color for the item
      color_port = portfolio_color(name);
      color_bord = extract_dominant("img/portfolio/" + name + "/cover.jpg");

      // Set colors
      css_cover = "#portfolio-modal-" + name + " .portfolio-modal-image" +
                  "{border-color: " + color_bord + "}";
      /*
      css_title = "#portfolio-modal-" + name + " h2" +
                  "{color: rgb(" + color_port + ");}";
      css_icon  = "#portfolio-modal-" + name + " .icon-and-line .section-icon" +
                  "{color: rgb(" + color_port + ") !important;}";
      css_line  = "#portfolio-modal-" + name + " .icon-and-line:after," +           "#portfolio-modal-" + name + " .icon-and-line:before" +
                  "{border-top-color: rgb(" + color_port + ") !important;}";

      css = css_cover + " " + css_title + " " + css_icon + " " + css_line;
*/
      css = css_cover

      // Append css
      var style = document.createElement('style');
      if (style.styleSheet) {
          style.styleSheet.cssText = css;
      } else {
          style.appendChild(document.createTextNode(css));
      }
      document.getElementsByTagName('head')[0].appendChild(style);

    }
  }
}


function keep_portfolio_items() {
  var els = document.getElementsByClassName("portfolio-item");
  if (els.length != 0) {
    var i = 0;
    for (i = 0; i < els.length; i += 1) {
      el = els[i]
      name = el.getAttribute('href').split('-').slice(-1)[0];
      overlay = el.childNodes[1];
      description = overlay.childNodes[1];
      technologies = overlay.childNodes[3];

      // Check dominant color for the item
      color = portfolio_color(name);

      // Set background colors css for each div
      css_tech = '.portfolio-item-' + name + ' .portfolio-item-technologies {background-color: rgb(' + color + ',0.4)}';
      css_desc = '.portfolio-item-' + name + ' .portfolio-item-description {background-color: rgb(' + color + ',0.9)}';
      hover = '.portfolio-item-' + name + ':hover';
      css_hover = hover + ' .portfolio-item-space, '
                + hover + ' .portfolio-item-technologies, '
                + hover + ' .portfolio-item-description ' +
                '{background-color: rgba(' + color + ', 0.9);}';

      css = css_tech + " " + css_desc + " " + css_hover;

      // Append css
      var style = document.createElement('style');
      if (style.styleSheet) {
          style.styleSheet.cssText = css;
      } else {
          style.appendChild(document.createTextNode(css));
      }
      document.getElementsByTagName('head')[0].appendChild(style);

    }
  }
}

function keep_dominant_borders() {
  var els = document.getElementsByClassName("dominant-border");
  if (els.length != 0) {
    var i = 0;
    for (i = 0; i < els.length; i += 1) {
      el = els[i]

      // Determines the image source, checking img src then background image
      var img_src = '';
      if (el.tagName.toLowerCase() == 'img') {
        img_src = el.getAttribute("src");
      } else {
        //not implemented
      }

      // Extract the dominant color from the image (not implemented)
      dominant_color = extract_dominant(img_src);

      if(dominant_color) {
        el.style.borderColor = dominant_color;
        el.style.backgroundColor = dominant_color;
      }
    }
  }
}

function keep_welcome() {
  var els = document.getElementsByClassName("welcome");
  if (els.length != 0) {
    var welcome = els[0];
    var window_height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    welcome_position = window.pageYOffset + welcome.getBoundingClientRect().top;
    welcome_height = window_height - welcome_position;
    welcome.style.minHeight = welcome_height + "px";
    //console.log(welcome, window_height, welcome_height, welcome_position, welcome.style.height);
  } else {
    console.log("Welcome div was not found.")
  }
}

function hyphenate_titles() {
  my_titles_ul = document.getElementById("my-titles");
  if (my_titles_ul != null) {
    my_titles_lis = my_titles_ul.childNodes;
    var i = 3;
    for (i = 3; i < my_titles_lis.length; i += 2) {
      var previous_title = my_titles_lis[i-2].getBoundingClientRect();
      var current_title = my_titles_lis[i].getBoundingClientRect();
      if (current_title.top == previous_title.top) { //if on the same line
        // Inserts hyphen
        var hifen = document.createTextNode("\u00A0-\u00A0\u00A0");
        my_titles_ul.insertBefore(hifen, my_titles_lis[i]);
        i += 1;

        // Check if the inserted hyphen has created a line break
        var current_title = my_titles_lis[i].getBoundingClientRect();
        if (current_title.top != previous_title.top) {
          my_titles_ul.removeChild(my_titles_lis[i-1]); //remove hyphen

          // Inserts line break
          line_break = document.createElement("br");
          my_titles_ul.insertBefore(line_break, my_titles_lis[i-1]);
        }
      }
    }
  } else {
    console.log("My titles were not found.");
  }
}

function show_page() {
  document.getElementsByTagName("BODY")[0].style.visibility = 'visible';
}

function init() {
  hyphenate_titles();
  keep_welcome();
  keep_dominant_borders();
  keep_portfolio_items();
  keep_potfolio_modal();
  show_page();
}

onload = init
