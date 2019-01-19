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
        var hifen = document.createTextNode(" - ");
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

function init() {
  hyphenate_titles();
  keep_welcome();
}

onload = init
