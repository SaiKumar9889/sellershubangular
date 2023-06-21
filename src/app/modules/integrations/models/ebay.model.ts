import { EbayPolicy } from "./ebay-policy";
import { EbaySetting } from "./ebay-setting";

export class EbayList{
        aboutUs: any;
        auctionStartPrice: 0;
        bankDeposit: boolean;
        bestOfferEnabled: boolean;
        bold: boolean;
        businessSeller: boolean;
        cod: boolean;
        contactUs: any;
        countryOfManufacture: any;
        createdDate: string;
        customTemplateId: 0;
        defaultTemplate: boolean;
        displayStrikeThroughPricing: boolean;
        domesticHandlingTime: any;
        domesticInsurance: any;
        domesticInsuranceValue: any;
        ebayCategoryId: any;
        ebayCategoryId2: any;
        ebayCategoryName: any;
        ebayCategoryName2: any;
        ebaySettingPaymentOption: any = new EbayPolicy();
        ebaySettingPostageOption: any = new EbaySetting();
        ebayStoreCategory2Id: any;
        ebayStoreCategory2Name: any;
        ebayStoreCategoryId: any;
        ebayStoreCategoryName: any;
        ebayUserId:any;
        expediteDomesticShipping: any;
        featureFirst: boolean;
        featuredPlus: boolean;
        galleryFeatured: boolean;
        galleryPicture: boolean;
        galleryPlus: boolean;
        harmonizedSystemCode: any;
        highlight: boolean;
        homePageFeatured: boolean;
        htmltext = `<html><head>

        <title>eBay</title>
        </head><body marginwidth="0" marginheight="0"><table align="center" style="border-spacing: 0px; width: 100%;">
        <tbody><tr>
          <td>
            <div id="ds_div">
                    <font rwr="1" style=""><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Tani-Logics Uk eBay Listing Template</title> <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"> <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"> <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet"> <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet"> <style> @charset "utf-8";body{ margin:0; padding:0; font-family:'Open Sans',sans-serif; font-size:14px; display:inline-block; width:100%; color:#333; overflow-x:hidden; font-weight:400 } input,button,select,textarea{ outline:none; font-family:'Open Sans',sans-serif } #Body,#Body *,font{ font-family:'Open Sans',sans-serif; } a,p,strong,ul,h1,h2,h3,h4,h5,h6{ margin:0; padding:0 } h1{ font-size:24px } h3{ font-size:28px } h4{ font-size:22px } a:focus,input:focus{ outline:none!important; text-decoration:none } a:hover{ text-decoration:none } @media (min-width: 768px) { .container{width:768px } }@media (min-width: 939px) { .container{width:919px } }@media (min-width: 1200px) { .container{width:1050px } }.container{ padding:0 10px } .pagewidth{ float:left; width:100% } .wrappage{ width:100% } input[type=text]::-ms-clear{ display:none!important; width:0!important; height:0!important } input[type=text]::-ms-reveal{ display:none!important; width:0!important; height:0!important } .input-text,.sub_search{ outline:0!important } .sub_search{ border:0!important } #Body .tab-content-m{ float:left; width:100% } select:focus,button:focus,option:focus,select::-moz-focus-inner,option::-moz-focus-inner{ outline:none!important; border:none!important } code{ padding:2px; background:#ddd } img{ max-width:100% } #gh-logo{ max-width:500% } .content-text a.text{ cursor:text } a.text:hover{ text-decoration:none } *,:before,:after{ -webkit-box-sizing:border-box; -moz-box-sizing:border-box; box-sizing:border-box; margin:0; padding:0 } .header{ min-height:125px } .headercontent{ margin-top:30px } .promo .content .footer{ display:inline-block;width:100% } .content .panel-default > .panel-heading{ background:#041a41!important; border-color:#041a41!important; color:#fff; border-radius:0; font-size:18px; text-transform:uppercase; font-weight:400 } .header-container{ display:inline-block; width:100%; border:0; position:relative; display:inline-block; width:100%; border:0; position:relative } .header-container .header-top{ display:inline-block; width:100%; padding:5px 0; text-align:center; background:#f5f5f5 } .header-container .header-top span{ color:#171717; font-size:14px; font-weight:600; font-family:'Open Sans',sans-serif } .icon-menu-mb,.header-container .header-content .nav-trigger{ display:none } .header-container .header-content .logo-content{ display:inline-block; text-align:center; max-width:270px; margin:1.5em 0 } .header-content{ display:inline-block; width:100%; background:#FFF; padding:1em 0 4em; text-align:center } .header-container{ display:inline-block; width:100% } .menu-header{ display:inline-block; width:100%; position:absolute; bottom:-3px; left:0; background:#041a41; text-align:center } .menu-header-mobile{ display:none } .menu-header .container{ position:relative } .menu-header .menu-container{ width:100% } .menu-header ul li{ list-style-type:none; display: inline-block; } .menu-header ul li a{ padding:17px 16px; font-family:'Oswald',sans-serif; font-size:18px; color:#fff; display:inline-block; line-height:18px; text-transform:uppercase; font-weight:400 } .menu-header ul li a:hover{ background:#f5f5f5; color:#666 } .hidden-nav{ display:none } .content{ margin-top:0 } @media (max-width: 768px) { .promo{display:none } }.promo,.promo .promo-content{ display:inline-block; width:100% } .promo{ border-bottom:1px solid #f5f5f5; background:#f5f5f5; box-shadow:0 2px 2px 0 rgba(0,0,0,0.16),0 0 0 1px rgba(0,0,0,0.08) } .promo .promo-content{ text-align:center; padding:15px 0 10px } .promo .promo-content span{ display:inline-block; color:#333; font-size:14px; font-weight:600; font-family:'Open Sans',sans-serif } .promo .promo-content span span{ text-transform:uppercase; font-size:14px; font-family:'Open Sans',sans-serif } .promo .promo-content span.box-promotion{ border-right:1px solid #999; line-height:12px; padding-right:15px; padding-left:15px } .promo .promo-content .fa{ font-size:15x; padding-right:.5em } .promo .promo-content span.box-promotion:last-child{ border-right:0 } .banner{ margin-top:1em } .left-content{ padding-left:0 } .left-content h2{ margin:0; font-size:18px; font-family:'Open Sans',sans-serif; font-weight:700; background:#041a41; color:#fff; width:100%; padding:12px 15px } .left-content .widget_content{ border:1px solid #dbdee1; border-top:0 } .left-content ul li{ border-bottom:1px solid #dbdee1; list-style-type:none; } .left-content ul li:last-child{ border-bottom:0 } .left-content ul li a{ color:#111; background:none; font-family:'Open Sans',sans-serif; font-size:14px; line-height:18px; display:inline-block; font-weight:400; padding:12px 10px } .left-content ul li a:hover{ color:#041a41 } .widget_box{ margin-bottom:15px } .widget_box_text{ background:#0a0a0a; border-radius:10px; padding:15px; color:#fff;text-align:justify;font-family:'Open Sans',sans-serif } .widget_box_text .heading{ color:#fdf234; font-size:16px; font-weight:700; text-align:center } .widget_box_text p{ padding:10px 0 } .content{ border-color:#041a41!important; border-radius:0; margin-top:1em } .product-name{ background:#041a41!important; border-color:#041a41!important; color:#fff; border-radius:0; font-size:18px; text-transform:uppercase; font-weight:400; padding:12px 10px } .subscribe{ background:#041a41!important; border:0; text-transform:uppercase; border-radius:0; margin-top:1em; padding:10px } .subscribe i{ font-size:22px; padding:0 5px 0 0 } .content .panel-default{ border-color:#e2e2e2!important; border-radius:0; font-family:'Open Sans',sans-serif } .right-content{ padding:0 } .image-gallery{ position:relative; width:95%; margin:2em auto auto } .image-gallery img{ margin:0 auto } .slider{ width:100%; display:inline-block; padding-top:480px; text-align:center; } .slider .img-details{ width:100%; position:absolute; left:0; top:0; transition:all .5s; text-align:center; max-height:570px; transition:all .5s; z-index:22; height:445px; background:#fff } .slider .img-details img{ max-width:100%; max-height:443px; } .slider input[name='slide_switch']{ display:none } .slider label{ margin-right:11px; display:inline-block; cursor:pointer; transition:all .5s; opacity:1; margin-bottom:1em } .slider span{ display:table-cell; width:90px; height:90px; text-align:center; border:1px solid #cdcdce; vertical-align:middle; } .slider span:has(img[src*="Liquid"]){ display:none } .slider label img{ max-width:100%; width:auto; padding:1px; max-height:88px } .slider img[src*="Liquid"]{ display:none } .slider input[name='slide_switch']:checked+label{ opacity:1 } .slider input ~ .img-details{ margin-bottom:0 } .slider input[name='slide_switch'] ~ .img-details{ opacity:0; display:none } .slider input[name='slide_switch']:checked + label + .img-details{ opacity:1; display:block; transform:scale(1) } .slider #id1 + label + .img-details{ opacity:1; display:block; transform:scale(1) } .tabPanel-widget{ position:relative; background:#041a41; border:1px solid #041a41; border-top:0 } .content .panel-default > .panel-heading{ background:#041a41!important; border-color:#041a41!important; color:#fff; border-radius:0; font-size:16px; text-transform:uppercase; font-weight:700; font-family:'Open Sans',sans-serif; padding:12px 15px } .title-heading{ width:100%; font-size:16px; font-weight:700; font-family:'Open Sans',sans-serif; background:#041a41; color:#fff; line-height:30px; margin-top:0; border-bottom:2px solid #041a41; padding:5px 10px; text-transform:uppercase } .desc-box{ border:0; } .text-section img{ display: block; max-width: 100%; height: auto; margin:0 auto; } .text-section,.text-section a,.text-section li,.text-section p,.text-section tr,.text-section td{ margin-bottom:0; line-height:22px; font-size:15px; color:#000; font-family:'Open Sans',sans-serif } .text-section{ padding:10px 10px 20px; border:1px solid #e2e2e2; } .text-section a{ color:#111; font-family:'Open Sans',sans-serif } .text-section a:hover{ text-decoration:underline } .text-section ul{ margin-bottom:10px; padding-left:20px } .text-section ul li{ margin:0 0 5px; position:relative;list-style-type:disc } .text-section ol li{ margin:0 0 5px; position:relative;list-style-type:decimal } .text-section ul li:last-child{ margin-bottom:0 } .text-section h1{ font-size:20px; color:#252525; text-transform:uppercase; font-weight:600; line-height:32px; margin-top:10px } .text-section h2{ font-size:18px; color:#252525; text-transform:uppercase; font-weight:600; line-height:25px; margin-top:10px } .text-section h3,.text-section h4,.text-section h5,.text-section h6{ font-size:14px; color:#000; font-weight:700; line-height:20px; margin-top:10px } .tab-content{ display:inline-block; width:100%; position:relative; padding:44px 0 0; font-size:16px } .tabarea section{ display:none; width:100%; margin:0; padding:25px 0 35px; border-top:1px solid #000 } .tabarea input{ display:none } .tabarea label{ display:inline-block; color:#666; text-transform:uppercase; font-size:17px; line-height:24px; font-weight:400; padding:10px 23px; float:left; cursor:pointer; position:absolute; z-index:2; border:0; margin:0 1px 0 0; top:0; left:0; font-family:'Open Sans',sans-serif } .tabarea label span{ font-family:'Open Sans',sans-serif; font-size:16px; font-weight:700 } .tabarea #tab3 + label{ margin-right:0; left:251px } .tabarea #tab4 + label{ margin-right:0; left:384px } .tabarea input:checked + label{ color:#fff; border-bottom:0; background:#041a41; padding-bottom:10px } .tabarea #tab2+ label{ left:126px } #tab1:checked ~ #content1,#tab2:checked ~ #content2,#tab3:checked ~ #content3,#tab4:checked ~ #content4{ display:inline-block } .tabarea section p img{ margin-left:10px } .tabarea section,.tabarea section a,.tabarea section li,.tabarea section p,.tabarea section tr,.tabarea section td{ margin-bottom:0; line-height:22px; font-size:15px; color:#000; font-family:'Open Sans',sans-serif } .tabarea section{ margin:0; padding:25px 20px 35px; border:1px solid #e2e2e2; border-top:1px solid #041a41 } .tabarea section a{ color:#111; font-family:'Open Sans',sans-serif } .tabarea section a:hover{ text-decoration:underline } .tabarea section ul{ margin-bottom:10px } .tabarea section ul li{ margin:0 0 5px; position:relative } .tabarea section ul li:last-child{ margin-bottom:0 } .tabarea section h1{ font-size:20px; color:#252525; text-transform:uppercase; font-weight:600; line-height:32px; margin-top:10px } .tabarea section h2{ font-size:18px; color:#252525; text-transform:uppercase; font-weight:600; line-height:25px; margin-top:10px } .tabarea section h3,.tabarea section h4,.tabarea section h5,.tabarea section h6{ font-size:14px; color:#000; font-weight:700; line-height:20px; margin-top:10px } .description-tab p{ margin:0 0 15px } .footer{ background:#041a41; padding:30px 0 0; color:#d1d1d1; margin-top:2em;  } .footer .head{ font-size:20px; color:#fff; text-transform:uppercase; border-bottom:1px solid #474747; padding-bottom:5px; margin-bottom:8px; font-family:'Open Sans',sans-serif } .footer i{ width:25px } .footer ul{ margin:0; padding:10px 0 0 } .footer p{ margin:0; font-family:'Open Sans',sans-serif; font-size:15px } .footer ul li{ display:block; padding:3px 0 } .footer .footer-signup a{ display:inline-block; padding:8px 19px; line-height:18px; color:#fff; background:#041a41; font-size:14px; font-family:'Open Sans',sans-serif; text-transform:uppercase; margin-top:14px; border-radius:2px } .footer .footer-signup a:hover{ background:#fff; color:#041a41 } .footer ul li a{ color:#d1d1d1!important; font-size:14px; text-transform:uppercase;font-family:'Open Sans',sans-serif } .footer .contact-us{ padding-left:0 } .footer .footer-promo{ padding-right:0 } .footer .contact-us a{ color:#d1d1d1!important } .footer .btn-warning{ background:#fdf234!important; color:#000; border-color:#fdf234!important } .copyrights{ border-top:1px dotted #333; padding:10px; margin-top:2em } @media (max-width: 1210px) and (min-width: 1140px) { .slider{padding-top:495px } .slider .img-details,.slider .img-details img{ max-height:443px } }@media (min-width:769px) and (max-width:992px) { #LeftPanel{width:210px } }@media(min-width:992px) and (max-width:1140px) { .slider #id1 + label + .img-details:hover,.slider input[name='slide_switch']:checked+label+ .img-details:hover{transform:scale(1.1); border:1px solid #041a41 } }@media (max-width: 992px) { .slider{padding-top:495px } .slider .img-details,.slider .img-details img{ max-height:443px } }@media(max-width: 940px) { .footer .footer-promo{display:none } .footer-signup{ float:right } .contact-us{ width:33% } }@media (max-width: 939px) { .slider{padding-top:475px } .slider .img-details,.slider .img-details img{ max-height:443px } }@media(width: 768px) { header-container .header-content .logo-content{width:200px; margin-right:10px } #LeftPanel{ width:210px } .slider{ padding-top:390px } .slider .img-details,.slider .img-details img{ max-height:370px } .slider label{ margin-right:14px } .slider span{ width:81px; height:81px } .slider label img{ max-height:79px } }@media(max-width: 767px) { .header-container{border:0 } .header-container .header-content .logo-content{ padding-bottom:13px; float:none;display:inline-block } .header-container .header-content .logo-content img{ width:210px } .header-content{ padding:20px 0 15px; position:relative;text-align:center } .header-right{ width:100%; display:inline-block } .search-container{ width:100%; float:none } .search-content{ position:relative; width:100%; margin-top:9px } .wrappage .search-content{ margin-top:0!important } .navigation{ background:#111 } .nav-item{ width:100%; border-top:1px solid #ddd; border-bottom:1px solid #000 } .nav-trigger{ position:absolute; clip:rect(0,0,0,0) } .nav-trigger + label{ display:block; background:#041a41; cursor:pointer; color:#fff; line-height:45px; font-size:18px; font-family:"Open Sans",sans-serif; margin:0 } .nav-trigger + label::before{ display:inline-block; width:24px; height:16px; right:10px; top:15px; content:"\f0c9"; font-family:'FontAwesome'; font-size:1.5em; padding-left:10px; vertical-align:middle; float:left; font-weight:400 } .header-content .menu-header{ -webkit-transition:opacity .5s ease-in-out; -moz-transition:opacity .5s ease-in-out; -ms-transition:opacity .5s ease-in-out; -o-transition:opacity .5s ease-in-out; transition:opacity .5s ease-in-out; display:none } .nav-trigger:checked ~ .menu-header{ filter:alpha(opacity=50); opacity:1; display:inline-block } .menu-header{ display:none; z-index:19; width:100%; position:relative; top:1px; left:0; background:#fff;text-align:left } .menu-header-mobile{ display:inline-block; width:100% } .menu-header-mobile .container{ padding:0 } .menu-header ul.menu{ box-shadow:0 4px 4px #e6e6e6 } .menu-header ul{ text-align:center; width:100% } .menu-header ul li{ width:100%; position:relative; border-bottom:1px solid #f5f5f5 } .menu-header ul li a{ background:#041a41; color:#111; line-height:22px; font-size:16px; font-family:"Oswald",sans-serif; padding:10px; display:inline-block; width:100%; color:#fff } .menu-header ul li a:hover{ background:#f5f5f5; color:#041a41 } .menu-header ul li input{ display:none } .contact-us{ display:none!important } .footer-signup{ float:left; width:100%; margin-top:2em } .slider{ padding-top:320px; width:100%; position:relative } .slider .img-details,.slider .img-details img{ max-height:300px } .slider label{ margin-right:12px } .slider span{ width:66px; height:66px } .slider label img{ max-height:64px } .product-name{ font-size:23px!important } .tab-list{ margin:0 0 30px } .tabarea{ border:0; margin:27px 0 0 } .tabarea::before{ display:none } .tabarea label{ width:100%; display:inline-block; position:relative; padding:12px 0; font-size:20px; border-bottom:1px solid #fff; color:#fff; font-weight:700; border-bottom:0; background:#041a41; padding-bottom:12px; padding:12px 20px; border-bottom:1px solid #fff } .tabarea label::before{ display:inline-block; width:24px; height:16px; position:absolute; right:10px; top:15px; content:"\f067"; font-family:'FontAwesome'; font-size:1em; padding-right:10px; vertical-align:middle; float:right; font-weight:400 } .tabarea input:checked + label{ padding:12px 20px } .tabarea input:checked + label::before{ display:inline-block; width:24px; height:16px; content:""; position:absolute; right:10px; top:15px; content:"\f068"; font-family:'FontAwesome'; font-size:1em; padding-right:10px; vertical-align:middle; float:right; font-weight:400 } .tabarea #tab2 + label,.tabarea #tab3 + label,.tabarea #tab4 + label{ left:0; color:#fff; font-weight:700; border-bottom:0; background:#041a41; padding:12px 20px; border-bottom:1px solid #fff } .tabarea input:checked + label{ border-bottom:1px solid #fff; color:#fff; font-weight:700; border-bottom:0; background:#041a41; padding-bottom:12px; border-bottom:1px solid #fff } .tabarea section{ padding:14px 10px 17px; margin:0; border-top:0; border-bottom:1px solid #041a41 } .tabarea section .content-right,.tabarea section .content-left{ width:100%; padding:0 } .tab-content{ padding:0 } }@media(max-width:568px) { .header-container .header-top{display:none } .header-container .header-content .logo-content{ float:none } }
                                  .logo{
                                      display: block;
                                      text-align: center;
        margin-left: auto;
        margin-right: auto;
                                  }
                                  </style>
      <div class="header-container" style="font-family: Arial; font-size: 14pt;"><div class="header-top"><div class="container">
      <p><span>&nbsp;Welcome to Our Official eBay Store</span></p>
      </div>
      </div>
      <div class="header-content"><div class="container"><div class="header-right"><input type="checkbox" id="nav-trigger" class="nav-trigger"><label for="nav-trigger" class="hidden-nav">MENU</label><div class="menu-header menu-header-mobile"><div class="container"><div class="menu-container">
      <ul class="menu">
      <li><a href="" target="_blank">Home</a></li>
      <!--Main Menu Links/Max 8 Links/Bettet Usage for Featured Categories-->
      <li><a href="" target="_blank">New Arrivals</a></li>
      <li><a href="" target="_blank">Ending Soon</a></li>
      <li><a href="" target="_blank">Feedback</a></li>
      <li><a href="" target="_blank">Contact Us</a></li>
      </ul>
      </div>
      </div></div></div></div>
      <div class="menu-header"><div class="container"><div class="menu-container">
      <ul class="menu">
      <li><a href="" target="_blank">Home</a></li>
      <!--Main Menu Links/Max 8 Links/Bettet Usage for Featured Categories-->
      <li><a href="" target="_blank">New Arrivals</a></li>
      <li><a href="" target="_blank">Ending Soon</a></li>
      <li><a href="" target="_blank">Feedback</a></li>
      <li><a href="" target="_blank">Contact Us</a></li>
      </ul>
      </div>
      </div></div></div></div>
      <div class="promo hidden-sm hidden-xs" style="font-family: Arial; font-size: 14pt;"><div class="container"><div class="promo-content">
      <!--Top Promo /Font-Awosem/Edit Text or Icon--> <span class="box-promotion" target="_blank" =""="" title="Fast &amp; Free DELIVERY"><i class="fa fa-truck" aria-hidden="true"></i><span>Fast &amp; Free Delivery</span> </span><span class="box-promotion" target="_blank" =""="" title="FREE HOME DELIVERY"><i class="fa fa-globe" aria-hidden="true"></i><span>United Kingdom Owned</span></span><span class="box-promotion" target="_blank" title="FREE HOME DELIVERY"><i class="fa fa-gbp" aria-hidden="true"></i><span>Best Price Guarantee</span></span><span class="box-promotion" target="_blank" =""="" title="FREE HOME DELIVERY"><i class="fa fa-shield" aria-hidden="true"></i><span>Secure Shopping</span></span></div>
      </div></div>
      <!-- Start Banner -->
      <div class="banner" style="font-family: Arial; font-size: 14pt;"><div class="container"><img src="https://i.postimg.cc/VvQTzxXJ/panoramic-shot-of-toy-shopping-cart-with-small-car-2021-08-30-01-46-34-utc.jpg"></div>
      </div>
      <!-- End Banner --> <!--Header End-->
      <div class="content" style=""><div class="container" style=""><div class="inner-row" style=""><div class="col-sm-3 col-md-3 hidden-xs hidden-sm left-content" style="font-family: Arial; font-size: 14pt;"><div class="hidden-xs hidden-sm"><div class="widget_box"><div class="list-group"><h2>Categories</h2><div class="widget_content">
      <ul>
      <li><a href="https://www.ebay.co.uk/b/Health-Beauty/26395/bn_1840059" target="_blank">Healthy & Beauty</a></li>
      <!--Add Categories Link-->
      <li><a href="https://www.ebay.co.uk/b/Baby-Essentials/2984/bn_1840183" target="_blank">Baby</a></li>
      <li><a href="https://www.ebay.co.uk/b/Home-Furniture-DIY/11700/bn_1842950" target="_blank">Home, Furniture &amp; DIY</a></li>
      <li><a href="https://www.ebay.co.uk/b/Films-TV/11232/bn_1841038" target="_blank">Films & TV</a></li>
      <li><a href="https://www.ebay.co.uk/b/Sporting-Goods/888/bn_1838666" target="_blank">Sporting Goods</a></li>
      </ul>
      </div>
      </div>
      <div class="list-group"><h2>Useful Links</h2><div class="widget_content">
      <ul>
      <li><a href="" target="_blank">View Store</a></li>
      <!--Add Usfull Link-->
      <li><a href="" target="_blank">Add to Favourites</a></li>
      <li><a href="" target="_blank">Ask Question </a></li>
      <li><a href="" target="_blank">View Feedback </a></li>
      </ul>
      </div>
      </div>
      <div class="list-group"><h2>Why Choose Us ?</h2><div class="widget_content"><img src="https://tanilogics.com/clients/aucz487/images/left-promo.png" class="img-responsive"></div>
      </div></div></div></div>

          <img src="https://i.postimg.cc/N0Vj0ssG/Logo.png" alt="Logo" class="logo" style="width: 300px; height: 80px;"  >
      <div class="col-md-9 right-content" style=""><h1 class="title-heading" style="font-family: Arial; font-size: 14pt; text-align: center;">Add your company name here</h1>
      <!--Item Title-->
      <div class="panel panel-default" style="font-family: Arial; font-size: 14pt;"><div class="image-gallery"><div class="slider">
      <!--Image Gallery Start--> <input type="radio" name="slide_switch" id="id1" checked="" value="https://i.postimg.cc/J0Q5kvHY/Baby-Stroller-ca-100-kartz-01-1000x1000.jpg"><label for="id1"><span><img src="https://i.postimg.cc/J0Q5kvHY/Baby-Stroller-ca-100-kartz-01-1000x1000.jpg" width="100"></span></label><div class="img-details"><img src="https://i.postimg.cc/J0Q5kvHY/Baby-Stroller-ca-100-kartz-01-1000x1000.jpg"></div>
      </div></div></div>
      <div class="panel panel-default desc-box" style=""><div class="panel-heading" style="font-family: Arial; font-size: 14pt;">DESCRIPTION</div><div class="text-section" style=""><div class="panel-body" style=""><div style=""><div style=""><div style=""><span style="font-weight: 700;">Features</span><br>Life's little stories bloom with coming of the little one in your life. It completes your life with many joys of parenthood. We endeavor to weave the little stories into our products with an emphasis on child safety and enrichment of features. Meticulously designed, our range of strollers, prams, car seats, buggies and other outdoor gear, lets your baby discover the world from the lap of luxury. They are comfortable nests that accompany your baby on tours through the city streets and country roads. Ergonomically designed to ensure your baby is always comfortably supported. So that your little one gets the comfort that's next only to the warmth of your lap. Conceived with care and made using the latest marvels of science, all products undergo multiple quality checks before they are dispatched to the stores.<br><br><span style="font-weight: 700;">Specifcations</span><br><br>
      <b>Brand</b>	      ABC<br>
      <b>Colour</b>	Black and Blue <br>
      <b>Material	Alloy Steel</b> <br>
      <b>Frame Material</b>	Aluminium <br>
      <b>Maximum Weight</b> Recommendation	15 Kilograms <br>
      <b>Item Weight</b>	8.36 Kilograms<br><br>
      <span style="font-weight: 700;">Package Content</span><br>This is a variation listing you will get what you choose from the drop down menu.</div></div></div>
      <!--Decription Body-->
      </div>
      </div></div>
      <div class="tabarea" style="font-family: Arial; font-size: 14pt;"><div class="tab-content">

          <input id="tab1" type="radio" name="tabs" checked=""><label for="tab1"><span>About Us</span> <!--Tab 1 Name--> </label><section id="content1"> <!--Tab 1 Content--> We Are Professional UK Based. We Sell Great Quality Brand New Products On Very Best Price.Please Visit Our Shop For More Info.
      </section>

          <input id="tab2" type="radio" name="tabs"><label for="tab2"><span>Payment</span> <!--Tab 2 Name--> </label><section id="content2"> <!--Tab 2 Content--> All purchases will go through eBay secured checkout to ensure that your order is processed without any delays. During the checkout, you can make an immediate payment by PayPal or select an alternative method of payment, and receive the necessary payment details.We DO NOT accept payments by cheque. We can take payment by credit or debit card but not by American Express due to.
      </section>

          <input id="tab3" type="radio" name="tabs"><label for="tab3"><span>Delivery</span> <!--Tab 3 Name--> </label><section id="content3"> <!--Tab 3 Content--> Economy Delivery Royal Mail 48 Barcode Tracker,Other Couriers Royal Mail Frist Class ,Parcel Force Express Delivery,Some times Parcel Can Be Late On Delivery We Will Expect Cooperation On That Conditions.
      </section>

          <input id="tab4" type="radio" name="tabs"><label for="tab4"><span>Returns</span> <!--Tab 4 Name--> </label><section id="content4"> <!--Tab 4 Content-->  We Accept Only 14 Day Returns,Buyer Has Pay For The Return If The Item is Not Faulty Or Damage Money Back Guarantee.Please Return The Item To Back Us Within 7 Days And We will Issue Your Refund Once We Received The Item Back From You (Unused). Any Return Of Faulty Or Damage Items We Will Cover The Return Shipping Cost.Please Note,Unless If The Item Is Not Faulty Or Damage And If The Buyer Want Return It Buyer Will Pay For Return Shipping.Returns Should be Recorded Delivery Only.If You Didn't Receive The Item,Please Wait For Maximum 14 Days And Kindly Inform Us Within 14 Days.We Will Appreciate Your Patience.
      </section></div>
      </div></div></div></div>
      <!--Footer Start-->
      <div class="footer" style="font-family: Arial; font-size: 14pt;"><div class="container"><div class="inner-row"><div class="col-sm-4 contact-us"><div class="head">About Us</div>
      <p>We Sell Great Quality Brand New Products On Very Best Price.Please Visit Our Shop For More Info.</p>
      </div>
      <div class="col-sm-1"></div>

      <div class="col-sm-1"></div>
      <div class="col-sm-3 hidden-xs footer-promo"><div class="head">We Accept Only</div>
      <!--Footer Tab-4-->
      <p><img src="https://i.postimg.cc/63SmmQrZ/payment-gateway.png" class="img-responsive"> <!--Payment Banner-Footer-->
      </p>
      </div>
      <div class="clearfix"></div>
      <div class="copyrights">
      <p class="text-center">All rights reserved@2021</p>
      </div>
      </div></div></div> </div></font></div>
                  </td>
        </tr>
      </tbody></table><span id="closeHtml"></span>
      </body></html>`;
        includeExternalId: boolean;
        internationalInsurance: any;
        internationalInsuranceValue: any;
        internationalSiteVisibility: boolean;
        itemLocationCountry: any;
        itemLocationPostcode: any;
        id:any;
        itemSpecific: any;
        kartzhubUserId: 0;
        listingDuration: any;
        listingFormat: any;
        listingQty: 0;
        listingRule: any;
        locationDisplay: any;
        locationDisplayCustomValue: any;
        locationsOne: any;
        locationsTwo: any;
        macros: any;
        modifiedDate: string;
        moneyOrder: boolean;
        moneybookers: boolean;
        outofstock: boolean;
        paisaPay: boolean;
        paymate: boolean;
        paymentOptions: any;
        payonpickup: boolean;
        picturePack: boolean;
        postalOrder: boolean;
        pricingrule: any;
        pricingruleroundvalue: any;
        privateListing: boolean;
        refundMethodSelected: any;
        restockingFee: any;
        restockingOption: any;
        restrictedToBusiness: boolean;
        returnAccepted: boolean;
        returnDurationSelected: any;
        returnPaidBySelected: any;
        returnPolicyText: any;
        shipToRegistrationCountry: boolean;
        shippingOptions: any = 'Flat';
        showBankAccountNumberInCheckout: boolean;
        site: any;
        soldOnEbay: boolean;
        subtitle: boolean;
        supersize: boolean;
        taxState: any;
        templateName: any;
        templateText: any;
        templateType: any;
        useEbayHostedPictures: boolean;
        valuepack: boolean
}
