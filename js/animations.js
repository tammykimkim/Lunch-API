$(document).ready(function(){

animationHover('#logo', 'swing');
animationClick('#logo', 'tada');

// animate on click function:
  function animationClick(trigger, element, animation){
    element = $(element);
  trigger = $(trigger);
    trigger.click(
        function() {
            element.addClass('animated ' + animation);          
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 2000);           
 
        });
}
  // animate on hover function:
  function animationHover(trigger, element, animation){
    element = $(element);
    trigger = $(trigger);
    trigger.hover(
        function() {
            element.addClass('animated ' + animation);          
        },
        function(){
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 2000);           
        });
}

});
