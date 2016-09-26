var port = 8000;
var serverUrl = "127.0.0.1";

var http = require("http");
var path = require("path"); 
var fs = require("fs"),
    url = require('url'),
    qs = require('querystring');
var Router = require('node-router');
var router = Router(); 
var cheerio = require('cheerio'),
	$ = cheerio.load('file.html'),sec = 0, min = 0, hour = 0,
	time ,timeWindow;

console.log("Starting web server at " + serverUrl + ":" + port);

http.createServer( function(req, res) {

	var now = new Date();
	
	var filename = (req.url == "" || req.url == "/") ? "/index.html" :req.url;
	var ext = path.extname(filename);
	var localPath = __dirname;
	var validExtensions = {
		".html" : "text/html",			
		".js": "application/javascript", 
		".css": "application/css",
		".txt": "text/plain",
		".jpg": "image/jpeg",
		".gif": "image/gif",
		".png": "image/png"
	};
	var isValidExt = validExtensions[ext];
	if (isValidExt) {
		if(req.method === 'POST'){
		
			 fs.readFile('./index.html', function (err, html) {
				if (err) {
					throw err; 
				} else {
					if($.html() === "file.html")
						$ = cheerio.load(html.toString());
							
				   var body= '';
					console.log('Request found with POST method');     
					req.on('data', function (data) {
						body += data;
						console.log('got data:'+data);
					});
					req.on('end', function () {

						var POST = qs.parse(body), newfroglist = [], newFrogPos = '';
						timeWindow = $('h2');
						if(POST.start == "start"){
							$ = cheerio.load(html.toString());
							min = 0, sec = 0, hour = 0;
							$('#frogJump button').removeAttr('disabled');
							$('p').css('display','none');
							$('#startbtn').attr('disabled', 'true');
							timeWindow.html(add());
							res.end($.html());
						}else if(POST.reset == "reset"){
							$ = cheerio.load(html.toString());
							res.end($.html());
						}else{
							timeWindow.html(add());
							if(POST.frog > 0){
								var frogArr = $('#frogJump button');
								newfroglist = frogJumpServer(frogArr, POST.frog);
								console.log('newfroglist'+newfroglist);
								$('#frogJump').html(newfroglist);
								newfroglist.each(function() {
									newFrogPos += $(this).find('button').attr('value');	
								});
								if(newFrogPos == "4560123"){
									$('.a').addClass('res');
									time = clearTimeout(setTimeout(add, 1000));
									timeWindow.html(time);
									$(".res h3 span").html(timeWindow.html());
									res.end($.html());									
								}
								else
									res.end($.html());
							}else{
								res.end($.html());
							}
						}
					});
				}
			 });
		   
		}else{
			localPath += filename;
			fs.exists(localPath, function(exists) {
				if(exists) {
					console.log("Serving file: " + localPath);
					if(ext == '.css'){
						router(req, res, css(req,res));
					}else{
						getFile(localPath, res, ext);
					}
				} else {
					console.log("File not found: " + localPath);
					res.writeHead(404);
					res.end();
				}
			});		
		}


	} else {
		console.log("Invalid file extension detected: " + ext)
	}

}).listen(port, serverUrl);

function css(request, response) {
  if (request.url === '/css/style.css') {
    response.writeHead(200, {'Content-type' : 'text/css'});
    var fileContents = fs.readFileSync('./css/style.css', {encoding: 'utf8'});
	response.end(fileContents);
  }
} 


function getFile(localPath, res, mimeType) {
	fs.readFile(localPath, function(err, contents) {
		if(!err) {
			res.setHeader("Content-Length", contents.length);
			res.setHeader("Content-Type", mimeType);
			res.setHeader("encoding", 'utf8');
			res.statusCode = 200;
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
}
function frogJumpServer(frogArr, curpos){
	var secondNext, next, divPos, selectionDiv, nextRocDiv, prev, secondPrev, parentDiv;
	frogArr.each(function(i, elem) {
		if($(this).attr('value') === curpos){
			selectionDiv = $(this);
			if (curpos <= 3){
				next = $(this).parent().next();
				secondNext = $(this).parent().next().next();
			} else{
				prev = $(this).parent().prev();
				secondPrev = $(this).parent().prev().prev();
			}
		}

	});
	parentDiv = selectionDiv.parent();
	if(curpos <= 3){
	
		if(next.find('button').attr('value') == '0'){
			next.insertBefore(parentDiv);			
		}else if(secondNext.find('button').attr('value') == '0'){
			nextRocDiv = secondNext.prev();
			secondNext.insertAfter(parentDiv);
			parentDiv.insertAfter(nextRocDiv);
		}
	}else{
		if(prev.find('button').attr('value') == '0'){
			prev.insertAfter(parentDiv);
		}else if(secondPrev.find('button').attr('value') == '0'){
			nextRocDiv = secondPrev.next();
			secondPrev.insertAfter(parentDiv);
			parentDiv.insertBefore(nextRocDiv);
		}
	}
	newfroglist = $('#frogJump li');
	
	return newfroglist;
		
}
function add() {
	sec++;
	if (sec >= 60) {
		sec = 0;
		min++;

		if (min >= 60) {
			min = 0;
			hour++;
		}
	}

	return (hour ? (hour > 9 ? hour : "0" + hour) : "00") + ":" + (min ? (min > 9 ? min : "0" + min) : "00") + ":" + (sec > 9 ? sec : "0" + sec);
}