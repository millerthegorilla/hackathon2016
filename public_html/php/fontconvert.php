<?php

include "svgfont.php";
$svgFont = new SVGFont();
echo $_GET['fontPath'];
$svgFont->load('/scripts/ui/GWMonospaceBold.svg');
$result = $svgFont->textToPaths('hello', 20);
?>
