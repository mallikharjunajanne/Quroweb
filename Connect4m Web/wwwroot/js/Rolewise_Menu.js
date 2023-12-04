//const { DH_CHECK_P_NOT_PRIME } = require("constants");

//const { debug } = require("util");

$(document).ready(function () {
    //loaddingimg.css('display', 'block');

    var parentmenulist = $(".main-navbar .custom-scrollbar");
   // alert(parentmenulist.find('li').length);
 //   debugger;
 //   if (parentmenulist.find('li').length == 0) {
    $("#loading1").css('display', 'block');

        $(parentmenulist).text('');
        parentmenulist.append('<li class="back-btn">' +
            '<div class= "mobile-back text-end" ><span>Back</span><i class="fa fa-angle-right ps-2" aria-hidden="true"></i></div ></li >');
        var menuData = [];
        performCrudOperationCommonFunction("GET", "/UserScreens/RoleMenulist", null, function (response) {
           // debugger;

            menuData = response[0].roleMenuByRoleId;
            if (menuData != null) {
               // debugger;
                var ChileMenu_List = [];
                $.each(menuData, function (index, item1) {
                    if (item1.menuUrl !== "") {
                        ChileMenu_List.push({
                            InstanceMenuId: item1.instanceMenuId,
                            MenuName: item1.menuName,
                            MenuUrl: item1.menuUrl,
                            ParentMenuId: item1.parentMenuId
                        });
                    }
                });

                var ChileMenu_Listlenth = ChileMenu_List.length;
               // alert(ChileMenu_Listlenth);
             //   debugger;
                var Notparent = 0;
                //  alert("hiiii");
               // loaddingimg.css('display', 'block');
                $.each(menuData, function (index, item) {
                   // loaddingimg.css('display', 'block');


                    
                    Notparent = 0;
                  //  if (item.instanceMenuId !== 7223 && item.instanceMenuId !== 7291) {
                        var li = $('<li class="dropdown">');
                        for (var i = 0; i < ChileMenu_Listlenth; i++) {
                            if (item.instanceMenuId === parseInt(ChileMenu_List[i].ParentMenuId)) {
                              
                                if (item.menuUrl !== "") {

                                    var a = $('<a class="nav-link menu-title" href="javascript:void(0)"><span>' + item.menuName + '</span></a>');
                                    li.append(a);
                                  //  li.append('<div class="according-menu"><i class="fa fa-caret-down"></i></div>');
                                    var ul = $('<ul class="nav-submenu menu-content">');
                                    for (var newval = i; newval < ChileMenu_Listlenth; newval++) {
                                        Notparent++;
                                        if (item.instanceMenuId == parseInt(ChileMenu_List[newval].ParentMenuId)) {
                                            if (ChileMenu_List[newval].MenuUrl !== "") {
                                                ul.append('<li><a href="' + ChileMenu_List[newval].MenuUrl + '">' + ChileMenu_List[newval].MenuName + '</a></li>');
                                            }
                                        }
                                    }

                                    li.append(ul);
                                    parentmenulist.append(li);
                                   // console.log(li);
                                    i = ChileMenu_Listlenth;
                                }
                            }
                        }
                        if (Notparent == 0) {
                            if (item.menuUrl !== "" && item.parentMenuId=="") {
                                var a = $('<a class="nav-link menu-title link-nav" href="' + item.menuUrl + '"><span>' + item.menuName + '</span></a>');
                                li.append(a);
                                parentmenulist.append(li);
                                //console.log(li);
                            }
                        }
                    //}
                  //  loaddingimg.css('display', 'none');
                    $("#loading1").css('display', 'none');

                });

                $(".toggle-nav").click(function () {
                    $('.nav-menu').css("left", "0px");
                });
                $(".mobile-back").click(function () {
                    $('.nav-menu').css("left", "-410px");
                });

                $(".page-wrapper").attr("class", "page-wrapper " + localStorage.getItem('page-wrapper'));
                $(".page-body-wrapper").attr("class", "page-body-wrapper " + localStorage.getItem('page-body-wrapper'));

                if (localStorage.getItem("page-wrapper") === null) {
                    $(".page-wrapper").addClass("compact-wrapper");
                    $(".page-body-wrapper").addClass("sidebar-icon");
                }
                //debugger;
                // left sidebar and vertical menu
                if ($('#pageWrapper').hasClass('compact-wrapper')) {

                    jQuery('.menu-title').append('<div class="according-menu"><i class="fa fa-caret-right"></i></div>');
                    jQuery('.menu-title').click(function () {
                     //   alert("hiii");
                        jQuery('.menu-title').removeClass('active').find('div').replaceWith('<div class="according-menu"><i class="fa fa-caret-right"></i></div>');
                        jQuery('.menu-content').slideUp('normal');
                        if (jQuery(this).next().is(':hidden') == true) {
                            jQuery(this).addClass('active');
                            jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-caret-down"></i></div>');
                            jQuery(this).next().slideDown('normal');
                        } else {
                            jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-caret-right"></i></div>');
                        }
                    });
                    jQuery('.menu-content').hide();


                    jQuery('.submenu-title').append('<div class="according-menu"><i class="fa fa-caret-right"></i></div>');
                    jQuery('.submenu-title').click(function () {
                        jQuery('.submenu-title').removeClass('active').find('div').replaceWith('<div class="according-menu"><i class="fa fa-caret-right"></i></div>');
                        jQuery('.submenu-content').slideUp('normal');
                        if (jQuery(this).next().is(':hidden') == true) {
                            jQuery(this).addClass('active');
                            jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-caret-down"></i></div>');
                            jQuery(this).next().slideDown('normal');
                        } else {
                            jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-caret-right"></i></div>');
                        }
                    });
                    jQuery('.submenu-content').hide();

                } else if ($('#pageWrapper').hasClass('horizontal-wrapper')) {
                    var contentwidth = jQuery(window).width();
                    if ((contentwidth) < '992') {
                        $('#pageWrapper').removeClass('horizontal-wrapper').addClass('compact-wrapper');
                        $('.page-body-wrapper').removeClass('horizontal-menu').addClass('sidebar-icon');
                        jQuery('.submenu-title').append('<div class="according-menu"><i class="fa fa-caret-right"></i></div>');
                        jQuery('.submenu-title').click(function () {
                            jQuery('.submenu-title').removeClass('active');
                            jQuery('.submenu-title').find('div').replaceWith('<div class="according-menu"><i class="fa fa-caret-right"></i></div>');
                            jQuery('.submenu-content').slideUp('normal');
                            if (jQuery(this).next().is(':hidden') == true) {
                                jQuery(this).addClass('active');
                                jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-caret-down"></i></div>');
                                jQuery(this).next().slideDown('normal');
                            } else {
                                jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-caret-right"></i></div>');
                            }
                        });
                        jQuery('.submenu-content').hide();

                        jQuery('.menu-title').append('<div class="according-menu"><i class="fa fa-caret-right"></i></div>');
                        jQuery('.menu-title').click(function () {
                            jQuery('.menu-title').removeClass('active');
                            jQuery('.menu-title').find('div').replaceWith('<div class="according-menu"><i class="fa fa-caret-right"></i></div>');
                            jQuery('.menu-content').slideUp('normal');
                            if (jQuery(this).next().is(':hidden') == true) {
                                jQuery(this).addClass('active');
                                jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-caret-down"></i></div>');
                                jQuery(this).next().slideDown('normal');
                            } else {
                                jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-caret-right"></i></div>');
                            }
                        });
                        jQuery('.menu-content').hide();
                    }

                }

                // toggle sidebar
                $nav = $('.main-nav');
                $header = $('.page-main-header');
                $toggle_nav_top = $('#sidebar-toggle');
                $toggle_nav_top.click(function () {
                    $this = $(this);
                    $nav = $('.main-nav');
                    $nav.toggleClass('close_icon');
                    $header.toggleClass('close_icon');
                });

                $(window).resize(function () {
                    $nav = $('.main-nav');
                    $header = $('.page-main-header');
                    $toggle_nav_top = $('#sidebar-toggle');
                    $toggle_nav_top.click(function () {
                        $this = $(this);
                        $nav = $('.main-nav');
                        $nav.toggleClass('close_icon');
                        $header.toggleClass('close_icon');
                    });
                });

                $body_part_side = $('.body-part');
                $body_part_side.click(function () {
                    $toggle_nav_top.attr('checked', false);
                    $nav.addClass('close_icon');
                    $header.addClass('close_icon');
                });

                //    responsive sidebar
                var $window = $(window);
                var widthwindow = $window.width();
                (function ($) {
                    "use strict";
                    if (widthwindow <= 991) {
                        $toggle_nav_top.attr('checked', false);
                        $nav.addClass("close_icon");
                        $header.addClass("close_icon");
                    }
                })(jQuery);
                $(window).resize(function () {
                    var widthwindaw = $window.width();
                    if (widthwindaw <= 991) {
                        $toggle_nav_top.attr('checked', false);
                        $nav.addClass("close_icon");
                        $header.addClass("close_icon");
                    } else {
                        $toggle_nav_top.attr('checked', true);
                        $nav.removeClass("close_icon");
                        $header.removeClass("close_icon");
                    }
                });

                // horizontal arrowss
                var view = $("#mainnav");
                var move = "500px";
                var leftsideLimit = -500

                // var Windowwidth = jQuery(window).width();
                // get wrapper width
                var getMenuWrapperSize = function () {
                    return $('.sidebar-wrapper').innerWidth();
                }
                var menuWrapperSize = getMenuWrapperSize();

                if ((menuWrapperSize) >= '1660') {
                    var sliderLimit = -3000

                } else if ((menuWrapperSize) >= '1440') {
                    var sliderLimit = -3600
                } else {
                    var sliderLimit = -4200
                }

                $("#left-arrow").addClass("disabled");

                $("#right-arrow").click(function () {
                    var currentPosition = parseInt(view.css("left"));
                    if (currentPosition >= sliderLimit) {
                        $("#left-arrow").removeClass("disabled");
                        view.stop(false, true).animate({ left: "-=" + move }, { duration: 400 })
                        if (currentPosition == sliderLimit) {
                            $(this).addClass("disabled");
                        }
                    }
                });

                $("#left-arrow").click(function () {
                    var currentPosition = parseInt(view.css("left"));
                    if (currentPosition < 0) {
                        view.stop(false, true).animate({ left: "+=" + move }, { duration: 400 })
                        $("#right-arrow").removeClass("disabled");
                        $("#left-arrow").removeClass("disabled");
                        if (currentPosition >= leftsideLimit) {
                            $(this).addClass("disabled");
                        }
                    }

                });

                // page active
                $(".main-navbar").find("a").removeClass("active");
                $(".main-navbar").find("li").removeClass("active");

                var current = window.location.pathname
                $(".main-navbar ul>li a").filter(function () {

                    var link = $(this).attr("href");
                    if (link) {
                        if (current.indexOf(link) != -1) {
                            $(this).parents().children('a').addClass('active');
                            $(this).parents().parents().children('ul').css('display', 'block');
                            $(this).addClass('active');
                            $(this).parent().parent().parent().children('a').find('div').replaceWith('<div class="according-menu"><i class="fa fa-caret-down"></i></div>');
                            $(this).parent().parent().parent().parent().parent().children('a').find('div').replaceWith('<div class="according-menu"><i class="fa fa-caret-down"></i></div>');
                            return false;
                        }
                    }
                });
                //$('.custom-scrollbar').animate({
                //    scrollTop: $('a.nav-link.menu-title.active').offset().top - 500
                //}, 1000);
              //  loaddingimg.css('display', 'none');
            }
        }, function (error) {
            loaddingimg.css('display', 'none');
            alert(error);
            //  $("#Main_Span_Error").text("Something Error1");
            //console.error(error);
        });
// }
   
});
