$(document).ready(() => {
  var userInput;
  var liInnerHTML;
  var theme = "themeOFF";

  //getting item list from Storage
  if (localStorage.getItem("themeChekerVar")) {
    theme = localStorage.getItem("themeChekerVar");
  }

  $("ul").prepend(localStorage.getItem("toDoList"));
  $(":root").css("--background-color", localStorage.getItem("backgroundColor"));
  $(":root").css("--list-background", localStorage.getItem("listBackground"));
  $(":root").css("--text-color", localStorage.getItem("textColor"));
  $(":root").css("--line-color", localStorage.getItem("lineColor"));
  $(":root").css("--bg-desktop-image", localStorage.getItem("bgDesktopImage"));
  $(":root").css("--bg-mobile-image", localStorage.getItem("bgMobileImage"));

  if (localStorage.getItem("lastThemeIcon")) {
    $(".theme-icon img").attr("src", localStorage.getItem("lastThemeIcon"));
  }

  // getting number ofleft item
  $(".num-items").text($(".active-item").length);

  //Inserting List
  $(document).on("click", function(e) {
    if (e.target.id !== "test") {
      listTheItem();
    }
  });

  //Inserting List with enter
  $("input").keydown(function(e) {
    if (e.key === "Enter") {
      listTheItem();
    }
  });

  //Removing Item
  $("ul").on("click", ".cross-icon", function() {
    $(this).parent().remove();
    localStorage.setItem("toDoList", $("ul").html());
    $(".num-items").text($(".active-item").length);
  });

  //Completing ToDo List
  $("ul").on("click", ".unchecked", function() {
    if ($(this).css("opacity") === "1") {
      $(this).css("opacity", 0);
      $(this).closest('li').children('.item').addClass("checked-item");
      $(this).closest("li").addClass("completed-item");
      $(this).closest("li").removeClass("active-item");
      $(".num-items").text($(".active-item").length);
    } else {
      $(this).css("opacity", "");
      $(this).closest("li").children(".item").removeClass("checked-item");
      $(this).closest("li").removeClass("completed-item");
      $(this).closest("li").addClass("active-item");
      $(".num-items").text($(".active-item").length);
    }
    localStorage.setItem("toDoList", $("ul").html());
  });

  //All button function
  $(".all").click(() => {
    $(".completed-item, .active-item").fadeIn();
    $(".btn").css("color", "hsl(234, 11%, 52%)");
    $(".all").css("color", "#1969e0");
  });

  //Active button function
  $(".active").click(() => {
    $(".completed-item, .active-item").show();
    $(".completed-item").hide();
    $(".btn").css("color", "hsl(234, 11%, 52%)");
    $(".active").css("color", "#1969e0");
  });

  //Completed button function
  $(".completed").click(() => {
    $(".completed-item, .active-item").show();
    $(".active-item").hide();
    $(".btn").css("color", "hsl(234, 11%, 52%)");
    $(".completed").css("color", "#1969e0");
  });

  //removing all Completed items with clear completed button
  $(".clear").click(function() {
    $(".completed-item").remove();
    localStorage.setItem("toDoList", $("ul").html());
  });

  //theme
  $(".theme-icon img").click(function() {
    if (theme === "themeOFF") {
      $(".theme-icon img").attr("src", "images/icon-moon.svg");
      $(":root").css({
        "--background-color": "hsl(0, 0%, 98%)",
        "--list-background": "hsl(0, 0%, 98%)",
        "--text-color": "hsl(235, 19%, 35%)",
        "--line-color": "hsl(233, 11%, 84%)",
        "--bg-desktop-image": "url(images/bg-desktop-light.jpg)",
        "--bg-mobile-image": "url(images/bg-mobile-light.jpg)"
      });
      theme = "themeON";
      themeStore();
    } else {
      $(".theme-icon img").attr("src", "images/icon-sun.svg");
      $(":root").css({
        "--background-color": "",
        "--list-background": "",
        "--text-color": "",
        "--line-color": "",
        "--bg-desktop-image": "",
        "--bg-mobile-image": ""
      });
      theme = "themeOFF";
      themeStore();
    }
  });

  //listing function
  function listTheItem() {
    if ($("input").val() !== '') {
      userInput = $("input").val();
      liInnerHTML = '<li class = "active-item"><div class="check"><img class="checked-img" src="images/icon-check.svg" alt="check-icon"><div class="unchecked"></div></div><span class="item">' + userInput + '</span><img class="cross-icon" src="images/icon-cross.svg" alt="cross-icon"></li>'
      $("ul").prepend(liInnerHTML);
      userInput = $("input").val('');
      localStorage.setItem("toDoList", $("ul").html());
      $(".num-items").text($(".active-item").length);
    }
  }

  //theme function
  function themeStore() {
    localStorage.setItem("themeChekerVar", theme);
    localStorage.setItem("lastThemeIcon", $(".theme-icon img").attr("src"));
    localStorage.setItem("backgroundColor", $(":root").css("--background-color"));
    localStorage.setItem("listBackground", $(":root").css("--list-background"));
    localStorage.setItem("textColor", $(":root").css("--text-color"));
    localStorage.setItem("lineColor", $(":root").css("--line-color"));
    localStorage.setItem("bgDesktopImage", $(":root").css("--bg-desktop-image"));
    localStorage.setItem("bgMobileImage", $(":root").css("--bg-mobile-image"));
  }

  //Dragging Function
  new Sortable(foo, {
      animation: 150,
      ghostClass: 'ghostClass'
  });

//Saving after dragged
  $(window).on("dragend", function(){
    localStorage.setItem("toDoList", $("ul").html());
  });

});
