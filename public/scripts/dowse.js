$(document).ready(function(){
	$("input[type='text']").val("");
  $(".studio-option .dropdown-button").click(function() {
  	var locationEl = $(this);
    $(".studio-option .dropdown-menu").toggleClass("show-menu");
    $(".dropdown-menu > li").click(function(){
      $(".dropdown-menu").removeClass("show-menu");
    });
    $(".studio-option .dropdown-menu.dropdown-select > li").click(function() {
      locationEl.html($(this).html());
      $("input[name='studioLocation']").val($(this).html());
      $(".budget-option").addClass("show");
      $(".budget").addClass("hide");
    });
  });
  $(".budget-option .dropdown-button").click(function() {
  	var budgetEl = $(this);
    budgetEl.next().toggleClass("show-menu");
    $(".dropdown-menu > li").click(function(){
      $(".dropdown-menu").removeClass("show-menu");
    });
    $(".budget-option .dropdown-menu.dropdown-select > li").click(function() {
    	var hasBudget = $(this).html();
      budgetEl.html(hasBudget);
      console.log(hasBudget, hasBudget.indexOf("don"))
      if(hasBudget.indexOf("don") == -1){
      	$(".budget").removeClass("hide");
      }else{
      	$(".budget").addClass("hide");
      }
      $(".find-studios").addClass("show");
    });
  });
});