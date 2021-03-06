var Player = {uri: null, playlistUri: null, duration: 0, offset: 0, playing: false, lastTick: 0};

Player.init = function ()
{
	this.uri = null;
	this.playlistUri = null;
	this.duration = 0;
	this.offset = 0;
	this.playing = false;
	this.lastTick = 0;
};

Player.config = function (uri)
{
};

Player.loadPlaylist = function (uri)
{
	this.init();
	this.playlistUri = uri;
};

Player.playlistIsLoaded = function (uri)
{
	return this.playlistUri == uri;
};

Player.seekToPlaylistVideo = function (uri, duration)
{
	this.playing = false;
	this.uri = uri;
	this.duration = duration;
	this.offset = 0;
};

Player.loadVideo = function (uri, duration)
{
	this.init();
	this.uri = uri;
	this.duration = duration;
};

Player.videoIsLoaded = function (uri)
{
	return !this.playlistUri && (this.uri == uri);
};

Player.seekToOffset = function (offset)
{
	this.offset = offset * 1000;
};

Player.play = function ()
{
	if (this.uri)
		this.playing = true;
};

Player.pause = function ()
{
	this.playing = false;
};

Player.unpause = function ()
{
	if (this.uri)
		this.playing = true;
};

Player.onInterval = function (now)
{
	if ((this.lastTick != 0) && this.playing)
		this.offset += (now - this.lastTick);

	this.lastTick = now;

	if (this.playing && (this.offset >= this.duration * 1000) && this.stepCallback)
		this.stepCallback();
};
