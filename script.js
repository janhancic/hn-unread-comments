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

// ID of this news story
var newsItemId = document.location + '';
newsItemId = newsItemId.substr ( newsItemId.indexOf ( '=' ) + 1 );

var $comments = $( "a[id^='up']:gt(0)" );

var readComments = localStorage.getObject ( 'item_' + newsItemId );

if ( readComments === undefined || readComments === null ) {
	readComments = {};
}

$comments.each ( function () {
	var $this = $( this );

	if ( readComments[$this.attr ( 'id' )] === undefined ) {
		$this.parents ( 'table:first' ).find ( 'td:eq(2)' ).css ( 'border', '1px solid #F60' );
		readComments[$this.attr ( 'id' )] = true;
	}
} );

localStorage.setObject ( 'item_' + newsItemId, readComments );