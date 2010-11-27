//localStorage.clear (); // for testing purposes

// remove old read comments storage
localStorage.removeItem ( 'read_comments' );

Storage.prototype.setObject = function ( key, value ) {
	this.setItem ( key, JSON.stringify ( value ) );
};

Storage.prototype.getObject = function ( key ) {
	var item = this.getItem ( key );

	if ( item === undefined ) {
		return undefined;
	}

	return JSON.parse ( item );
};

// get the background colour of the top navigation bar
var unreadColour = $( 'table:first td:first' ).attr ( 'bgcolor' );

// get all comments on this page
var $comments = null;

if ( ( document.location + '' ).indexOf ( 'item?id=' ) > 0 ) {
	// we are on a item page
	$comments = $( 'body > center > table > tbody > tr:eq(2) > td table:eq(1) > tbody > tr' );
} else {
	// we are on threads page
	$comments = $( 'body > center > table > tbody > tr:gt(2)' );
}

// get all stored unread comments
var readComments = localStorage.getObject ( 'read_comments_list' );
if ( readComments === undefined || readComments === null ) {
	readComments = {};
}

$comments.each ( function () {
	var $this = $( this );

	var commentContentMd5 = md5 ( $this.find ( 'table td:eq(2) span.comment' ).text () );

	if ( readComments[commentContentMd5] === undefined ) {
		// mark this comments as unread
		$this.find ( 'table td:eq(2)' ).css ( 'border', '1px solid ' + unreadColour );

		readComments[commentContentMd5] = true;
	}
} );

localStorage.setObject ( 'read_comments_list', readComments );