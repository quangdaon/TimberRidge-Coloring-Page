<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Interactive Coloring Concept</title>
		<meta name="description" content="A prototype for a coloring page on Timber Ridge Lodge website." />
		<meta name="keywords" content="coloring, drag and drop, svg, material design, website" />
		<meta name="author" content="MarcusTec" />
		<!-- <link rel="shortcut icon" href="favicon.ico"> -->
		<link rel="stylesheet" type="text/css" href="css/normalize.css" />
		<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.3.0/css/font-awesome.min.css" />
		<link rel="stylesheet" type="text/css" href="css/demo.css" />
		<script src="js/jquery-2.1.4.js"></script>
		<script src="js/modernizr.custom.js"></script>
	</head>
	<body>
		<div class="container">
			<header class="codrops-header">
				<div class="codrops-links">
					<a class="codrops-icon codrops-icon--prev" href="http://tympanus.net/Development/AnimatedGridLayout/" title="Previous Demo"><span>Previous Demo</span></a>
					<a class="codrops-icon codrops-icon--drop" href="http://tympanus.net/codrops/?p=23913" title="Back to the article"><span>Back to the Codrops article</span></a>
				</div>
				<h1>Interactive Coloring Concept <span>A fun drag &amp; drop experiment</span></h1>
			</header>
			<div class="content">
<center>

<?php
	echo file_get_contents("coloring-pages/moose-1.svg");
?>

</center>
				<div class="mockup-browser">

					<section class="mockup-section mockup-section--dark paint-area">
						<div class="mockup-content mockup-grid">
							<h2 class="mockup-heading mockup-heading--single paint-area paint-area--text">Testing Box</h2>
							<figure class="mockup-grid__item mockup-width--third">
								<div class="mockup-pricing paint-area">
									<h3 class="mockup-heading mockup-heading--box paint-area"><span>Box 1</span></h3>
									<div class="mockup-bigtext"><span class="paint-area paint-area--text">Test how</span></div>
								</div>
							</figure>
							<figure class="mockup-grid__item mockup-width--third">
								<div class="mockup-pricing paint-area">
									<h3 class="mockup-heading mockup-heading--box paint-area"><span>Box 2</span></h3>
									<div class="mockup-bigtext"><span class="paint-area paint-area--text">things work</span></div>
								</div>
							</figure>
							<figure class="mockup-grid__item mockup-width--third">
								<div class="mockup-pricing paint-area">
									<h3 class="mockup-heading mockup-heading--box paint-area"><span>Box 3</span></h3>
									<div class="mockup-bigtext"><span class="paint-area paint-area--text"></span>in original code.</div>
								</div>
							</figure>
						</div>
					</section>
				</div><!-- /mockup-browser -->
			</div><!-- /content -->
			<div class="customizer">
				<ul class="color-tool"> <!-- cno = Color No. -->
					<li class="color-swatch cno"><div class="drag-element" data-color="hsl(0,0%,10%)"><div class="drop cno"></div><i class="drop-helper-1 cno"></i><i class="drop-helper-2 cno"></i><i class="drop-helper-3 cno"></i><i class="drop-helper-4 cno"></i></div></li>
					<li class="color-swatch cno"><div class="drag-element" data-color="hsl(25, 100%, 25%)"><div class="drop cno"></div><i class="drop-helper-1 cno"></i><i class="drop-helper-2 cno"></i><i class="drop-helper-3 cno"></i><i class="drop-helper-4 cno"></i></div></li>
					<li class="color-swatch cno"><div class="drag-element" data-color="hsl(0, 100%, 65%)"><div class="drop cno"></div><i class="drop-helper-1 cno"></i><i class="drop-helper-2 cno"></i><i class="drop-helper-3 cno"></i><i class="drop-helper-4 cno"></i></div></li>
					<li class="color-swatch cno"><div class="drag-element" data-color="hsl(25, 100%, 65%)"><div class="drop cno"></div><i class="drop-helper-1 cno"></i><i class="drop-helper-2 cno"></i><i class="drop-helper-3 cno"></i><i class="drop-helper-4 cno"></i></div></li>
					<li class="color-swatch cno"><div class="drag-element" data-color="hsl(45, 100%, 65%)"><div class="drop cno"></div><i class="drop-helper-1 cno"></i><i class="drop-helper-2 cno"></i><i class="drop-helper-3 cno"></i><i class="drop-helper-4 cno"></i></div></li>
					<li class="color-swatch cno"><div class="drag-element" data-color="hsl(90, 100%, 65%)"><div class="drop cno"></div><i class="drop-helper-1 cno"></i><i class="drop-helper-2 cno"></i><i class="drop-helper-3 cno"></i><i class="drop-helper-4 cno"></i></div></li>
					<li class="color-swatch cno"><div class="drag-element" data-color="hsl(180, 100%, 65%)"><div class="drop cno"></div><i class="drop-helper-1 cno"></i><i class="drop-helper-2 cno"></i><i class="drop-helper-3 cno"></i><i class="drop-helper-4 cno"></i></div></li>
					<li class="color-swatch cno"><div class="drag-element" data-color="hsl(225, 100%, 65%)"><div class="drop cno"></div><i class="drop-helper-1 cno"></i><i class="drop-helper-2 cno"></i><i class="drop-helper-3 cno"></i><i class="drop-helper-4 cno"></i></div></li>
					<li class="color-swatch cno"><div class="drag-element" data-color="hsl(270, 100%, 65%)"><div class="drop cno"></div><i class="drop-helper-1 cno"></i><i class="drop-helper-2 cno"></i><i class="drop-helper-3 cno"></i><i class="drop-helper-4 cno"></i></div></li>
					<li class="color-swatch cno"><div class="drag-element" data-color="#A3A3A3"><div class="drop cno"></div><i class="drop-helper-1 cno"></i><i class="drop-helper-2 cno"></i><i class="drop-helper-3 cno"></i><i class="drop-helper-4 cno"></i></div></li>
					<li class="color-swatch cno"><div class="drag-element" data-color="#FFFFFF"><div class="drop cno"></div><i class="drop-helper-1 cno"></i><i class="drop-helper-2 cno"></i><i class="drop-helper-3 cno"></i><i class="drop-helper-4 cno"></i></div></li>
					<li><button class="reset-button" title="Reset colors">Reset colors</button></li>
				</ul>
			</div>
			<div class="info-wrap dialog-wrap" id="instructions">
				<div class="info dialog">
					<h3>Timber Ridge Coloring Page</h3>
					<p><img src="img/drag.svg" alt="drag icon"/>Drag any color from the left toolbar to an area on the page. A colored outline will indicate a droppable element.</p>
					<p><img src="img/time.svg" alt="drag icon"/>On mobile, wait a tiny bit until you drag the color drop.</p>
					<p><img src="img/dblclick.svg" alt="drag icon"/>Double click on any area to clear its color.</p>
					<button class="info-close">Got it!</button>
				</div>
			</div>
		</div><!-- /container -->
		<script src="js/classie.js"></script>
		<script src="js/interact-1.2.4.min.js"></script>
		<script src="js/main.js"></script>
	</body>
</html>
