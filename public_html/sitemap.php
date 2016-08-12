<?php
error_reporting(E_ALL);
ini_set('display_errors','On');

$strDocumentRoot = $_SERVER['DOCUMENT_ROOT'];

function createUrlNode($url, $lastMod = 0, $changeFreq = "weekly", $priority = "0.8"){
	if($lastMod == 0){
		$lastMod = date("Y-m-d", time());
	} else {
		$lastMod = date("Y-m-d", $lastMod);
	}
	return <<<XML
	
	<url>
		<loc>$url</loc>	
		<lastmod>$lastMod</lastmod>	
		<changefreq>$changeFreq</changefreq>	
		<priority>$priority</priority>	
	</url>
	
XML;
	
}

$strYearAndMonth = date("Y-m", time());
$lastMod = strtotime($strYearAndMonth."-01 08:00",time());

header ("Content-Type:text/xml");
echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<?php echo createUrlNode("http://regexpfiddle.com/", $lastMod, "monthly");?>	
</urlset>