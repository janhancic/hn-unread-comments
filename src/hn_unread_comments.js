//localStorage.clear (); // for testing purposes

localStorage.removeItem( 'read_comments' ); // remove old read comments storage

var unreadColour = $( 'table:first td:first' ).attr( 'bgcolor' ), // background colour of the top navigation bar
	$comments = null,
	readComments;

// get all comments on this page
if ( ( document.location + '' ).indexOf ( 'item?id=' ) > 0 ) { // we are on a item page
	$comments = $( 'body > center > table > tbody > tr:eq(2) > td table:eq(1) > tbody > tr' );
} else { // we are on threads page
	$comments = $( 'body > center > table > tbody > tr:gt(2)' );
}

readComments = localStorage.getObject( 'read_comments_list' ) || {}; // get all stored unread comments

$comments.each( function () {
	var $this = $( this ),
		commentContentMd5 = md5( $this.find( 'table td:eq(2) span.comment' ).text() );

	if ( readComments[commentContentMd5] === undefined ) {
		// mark this comments as unread
		$this.find( 'table td:eq(2)' ).css( 'border', '1px solid ' + unreadColour );

		readComments[commentContentMd5] = true;
	}
} );

localStorage.setObject( 'read_comments_list', readComments );
