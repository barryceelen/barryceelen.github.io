window.onload = function() {

	if ( 'undefined' == typeof document.getElementsByClassName ) {
		return;
	}

	var loadMoreButton = document.getElementsByClassName( 'js-load-more' ),
	    moreContainers = document.getElementsByClassName( 'load-more-container' );

	if ( loadMoreButton.length > 0 && moreContainers.length > 0 ) {
		loadMoreButton[0].addEventListener( 'click', function( event ) {
			moreContainers[0].outerHTML = moreContainers[0].innerHTML;
			var curLoadMore = event.currentTarget.parentNode;
			curLoadMore.parentNode.removeChild( curLoadMore );
		});
	}
};