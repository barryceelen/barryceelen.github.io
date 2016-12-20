window.viewportUnitsBuggyfill.init();

var fp = new Fingerprint2();
fp.get(function(result) {
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-434633-1', {'storage': 'none','clientId': result});
ga('set', 'anonymizeIp', true);
ga('send', 'pageview');
});