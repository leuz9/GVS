jQuery(document).ready(function($)
{
    
    //Masonary Grid
    $('.qc-grid').packery({
      itemSelector: '.qc-grid-item',
      gutter: 10
    });

    //Filter Directory Lists
    $(".filter-area > a"). on("click", function(event){

        event.preventDefault();

        var filterName = $(this).attr("data-filter");

        $(".filter-area > a").removeClass("filter-active");
        $(this).addClass("filter-active");

        if( filterName == "all" )
        {
            $("#opd-list-holder .qc-grid-item").css("display", "block");
        }
        else
        {
            $("#opd-list-holder .qc-grid-item").css("display", "none");
            $("#opd-list-holder .qc-grid-item."+filterName+"").css("display", "block");
        }

        $('.qc-grid').packery({
          itemSelector: '.qc-grid-item',
          gutter: 10
        });

    });

    //UpvoteCount
    $(".upvote-btn").on("click", function(event){

        event.preventDefault();

        var data_id = $(this).attr("data-post-id");
        var data_title = $(this).attr("data-item-title");
        var data_link = $(this).attr("data-item-link");

        var parentLI = $(this).closest('li').attr("id");

        $.post(ajaxurl, {            
            action: 'qcopd_upvote_action', 
            post_id: data_id,
            meta_title: data_title,
            meta_link: data_link,
            li_id: parentLI
                
        }, function(data) {
            var json = $.parseJSON(data);
            //console.log(json.cookies);
            //console.log(json.exists);
            if( json.vote_status == 'success' )
            {
                $('#'+parentLI+' .upvote-section .upvote-count').html(json.votes);
                $('#'+parentLI+' .upvote-section .upvote-btn').css("color", "green");
                $('#'+parentLI+' .upvote-section .upvote-count').css("color", "green");
            }
        });
       
    });

});


jQuery(document).ready(function($)
{
	
    $("#filter").keyup(function(){
 
        // Retrieve the input field text and reset the count to zero
        var filter = $(this).val(), count = 0;
 
        // Loop through the comment list
        $("#opd-list-holder ul li").each(function(){
 
            // If the list item does not contain the text phrase fade it out
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut();
 
            // Show the list item if the phrase matches and increase the count by 1
            } else {
                $(this).show();
                count++;
            }
        });
		
		$('.qc-grid').packery({
          itemSelector: '.qc-grid-item',
          gutter: 10
        });
 
    });

});