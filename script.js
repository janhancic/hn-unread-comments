//localStorage.clear ();
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

// get all comments (anchors) on this page
var $comments = $( "a[id^='up']:gt(0)" );

// get all stored unread comments
var readComments = localStorage.getObject ( 'read_comments' );
if ( readComments === undefined || readComments === null ) {
	readComments = {};
}

$comments.each ( function () {
	var $this = $( this );

	if ( readComments[$this.attr ( 'id' )] === undefined ) {
		// mark this comments as unread
		$this.parents ( 'table:first' ).find ( 'td:eq(2)' ).css ( 'border', '1px solid ' + unreadColour );

		readComments[$this.attr ( 'id' )] = true;
	}
} );

localStorage.setObject ( 'read_comments', readComments );