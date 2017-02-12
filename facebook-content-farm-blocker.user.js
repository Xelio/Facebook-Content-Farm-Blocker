// ==UserScript==
// @name           Facebook Content Farm Blocker
// @author         Xelio Cheong
// @description    The script hide content farm article from Facebook
// @namespace      http://xelio.eu.org
// @version        1.2
// @include        https://*.facebook.com/
// @include        https://*.facebook.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @grant          none
// @copyright      2017, Xelio
// @source         https://github.com/Xelio/Facebook-Content-Farm-Blocker
// ==/UserScript==

(function() {
  'use strict';

  var debug = false;

  function log(Message){
    if(debug) {
      if(typeof console == "object"){
        if (typeof Message =='undefined'){
          Message = "";
        }
        console.log(Message);
      }
    }
  }

  var $j = jQuery.noConflict();

// Content farm domain list from https://github.com/benlau/ihatecontentfarms
  var blocklist = [
'twgreatdaily.com',
'thegreatdaily.com',
'163nvren.com',
'360doc.com',
'7jiu.com.hk',
'a-gui.com',
'aboutfighter.com',
'apple01.net',
'appnews.fanswong.com',
'asia01.club',
'axn2000.blogspot',
'babymaycry.com',
'baiyongqin.cc',
'bananadaily.net',
'beauties.life',
'beefun01.com',
'biginfo4u.com',
'bignews01.com',
'bomb01.com',
'bottle01.tw',
'bubuko.com',
'bucktop.com',
'bunnygo.net',
'buzz01.com',
'buzzhand.com',
'buzzhand.net',
'buzzjoker.com',
'buzzlife.com.tw',
'buzznews.news',
'ccolorsky.blogspot.com',
'changepw.com',
'chaxf.com',
'chunew.com',
'cibeiwen.com',
'circle01.com',
'ck101.com',
'classicofloves.com',
'clickme.net',
'cmoney.tw',
'coco01.net',
'cocomy.net',
'cocotw.net',
'contw.com',
'dailyfun.cc',
'dailyhearter.net',
'daleba.net',
'daliulian.net',
'dayhot.news',
'dayspot.net',
'discoss.com',
'dnbcw.info',
'dongqiuxiang.net',
'dsy39.com',
'eazon.com',
'enews.com.tw',
'eryunews.com',
'ezgoe.com',
'eznewlife.com',
'ezp9.com',
'ezvivi.com',
'ezvivi2.com',
'f.duckhk.com',
'faminereports.blogspot',
'fanli7.net',
'friends.hk',
'fullyu.com',
'fun.youngboysgirls.com',
'fun01.cc',
'fun01.net',
'funnies.online',
'funssy.com',
'funvdo01.com',
'getez.info',
'getfunfun.com',
'getjoyz.com',
'gigacircle.com',
'gigcasa.com',
'gjoyz.com',
'guowenme.cc',
'guudo.cn',
'handread.cc',
'haolookr.com',
'happies.news',
'happiness.beauties.life',
'happyeverydaymovie.com',
'healthalover.com',
'hehuancui.com',
'hk.maheshbhusal.com.np',
'hkwall.com',
'honey99.net',
'hothk.com',
'hotnews.hk',
'hottimes.org',
'housekook.com',
'how01.com',
'howfunny.org',
'hssszn.com',
'icovideos.com',
'ideapit.com',
'ifuun.com',
'ihot.news',
'ilife97.com',
'ilife99.com',
'immediates.net',
'ipetgroup.com',
'ireaded.com',
'ispot.news',
'izhentoo.cc',
'jimmyfans.com',
'juksy.com',
'justfenxiang.net',
'justhotnews.site',
'kan.world',
'kikinote.net',
'kknews.cc',
'kuso01.tv',
'laughbombclub.com',
'letu.life',
'life.com.tw',
'life.cx',
'life.tw',
'likea.ezvivi.com',
'line-share.tw',
'mama.tw',
'mamicode.com',
'mango01.com',
'maoanbo.net',
'media8.me',
'medialnk.com',
'menclub.co',
'metalballs.com',
'mili010.com',
'mili010.net',
'mimi186.com',
'ml.design-fabrica.com',
'ml.yubhar.com',
'money83.com',
'moneyaaa.com',
'muratify.cc',
'myfbshare.net',
'mytimes.org',
'news.95lady.com',
'news.knowing.asia',
'news.qzapp.net',
'news01.cc',
'newstube01.tv',
'novelfeed.com',
'ohwonews.com',
'onefunnyjoke.com',
'onnewlife.com',
'orange01.org',
'pcasg.com',
'peopleinsider.blogspot',
'peopleinsider.net',
'picallies.com',
'play01.cc',
'plays01.com',
'post01.com',
'programgo.com',
'ptt01.cc',
'pttbook.com',
'push01.com',
'push01.net',
'qianqu.cc',
'qilook.com',
'qiqu.news',
'quiz321.com',
'qzapp.net',
'read01.com',
'reg.youthwant.com.tw',
'share.youthwant.com.tw',
'share001.com',
'share001.net',
'share2fb.net',
'shareba.com',
'shareonion.com',
'sharetify.com',
'sk2zone.com',
'spicemami.com',
'story.bazzfly.com',
'superfun-e.com',
'teepr.com',
'thefundaily.com',
'thegreendaily.net',
'thehealthdaily.org',
'tipelse.com',
'toments.com',
'ttshow.tw',
'tw.anyelse.com',
'tw.jdkartsports.nl',
'vdoobv.com',
'video-lab.net',
'viralane.com',
'watchinese.com',
'whatfunny.org',
'wholehk.com',
'whyhow.online',
'womanaaa.com',
'wonder4.co',
'ww.happy123.org',
'ww.share001.org',
'xianso.com',
'xibao.tw',
'xuxianghui.cc',
'xuxinfang.xyz',
'yibihan.net',
'ymiit.com',
'yourbabb.com',
'yourfacts.club',
'yourhope.info',
'youthwant.com',
'youthwant.com.tw',
'youthwant.ufc.com.tw',
'youthwant.xnnow.com',
'zhentoo.com',
'zhentoo.net',
'zhoucuimei.cc',
'zhulinlin.net'
    ];

  var monitorContainer = 'div#stream_pagelet,div#pagelet_group_mall,div#recent_capsule_container';
  var removeContainer = 'div[role="article"],div[data-testid="fbfeed_story"]';

  var removeContentFarm = function(e) {
    // 1. Check any link contain content farm domain
    var contentFarmLink = e.find('a').filter(function(i, a) {
      var link = $j(a);
      var linkHref = link.attr('href') || '';
      var linkText = link.parent().text() || '';

      return blocklist.some(function(domain) {
        return linkHref.includes(domain) || linkText.includes(domain);
      });
    });

    // 2. Remove articles containing the links in step 1
    contentFarmLink.each(function() {
      var article = $j(this).parents(removeContainer).last();

      if(debug) {
        log({
          articleFound: article.length > 0,
          link: this,
          article: article.clone(),
          articleText: article.text()
        });
      }

      article.html('Content farm article removed.');
    });
  };

  // Check loaded entries
  removeContentFarm($j(monitorContainer));

  // Monitor entries added to page
  $j(monitorContainer).on('DOMSubtreeModified', function(mutations) { removeContentFarm($j(mutations.target)); });
})();