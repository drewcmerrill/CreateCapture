var video;
var vScale = 10;
let img;
let movers = [];
var disperse = false;
var move = false;
var home = false;

function preload() { img = loadImage('bird.jpg');
}

function setup()
{
	createCanvas(640, 480);
	pixelDensity(1);

	// video = createCapture(VIDEO);
  // video.size(width / vScale, height / vScale);
	img.resize(width/vScale, height/vScale);
	img.loadPixels();

	for(var y = 0; y < img.height; y++)
	{
		for(var x = 0; x < img.width; x++)
		{
			var index = (x + y * img.width) * 4;
			var r = img.pixels[index + 0];
			var g = img.pixels[index + 1];
			var b = img.pixels[index + 2];

			// fill(r,g,b);
			// rect(x * vScale, y * vScale, vScale, vScale);

			mover = new Mover(x * vScale + vScale/2, y * vScale + vScale/2, vScale/2, r, g, b);
			movers.push(mover);
		}
	}
}
function draw()
{
	background(51);

	// movers = [];
	//
	// video.loadPixels();
	//   for (var y = 0; y < video.height; y++)
	// 	{
	//     for (var x = 0; x < video.width; x++)
	// 		{
	//       var index = (video.width - x + 1 + (y * video.width)) * 4;
	//       var r = video.pixels[index + 0];
	//       var g = video.pixels[index + 1];
	//       var b = video.pixels[index + 2];
	// 			mover = new Mover(x * vScale + vScale/2, y * vScale + vScale/2, vScale/2, r, g, b);
	// 			movers.push(mover);
	//     }
	//   }

	for(let i = 0; i < movers.length; i++)
	{
		if(disperse)
		{
			movers[i].drag(.05);
			movers[i].floatAimlessly();
		}
		if(move)
		{
			movers[i].atOrigin();
		}
		movers[i].edges();
		movers[i].update();
		movers[i].show();
	}

}

function mouseClicked()
{
	if(!disperse)
	{
		for(let i = 0; i < movers.length; i++)
		{
			movers[i].disperse();
		}
	}
	else
	{
		move = !move;
		for(let i = 0; i < movers.length; i++)
		{
			movers[i].returnToOrigin();
		}
	}
	disperse = !disperse;
}
