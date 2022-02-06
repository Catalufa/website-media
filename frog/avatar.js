function showCategory(catName) {

    var htmlOut = '';
    var toolTip = '';
    if (shopParts[catName]) {
        curBodyPart = catName;


        for (var part in shopParts[catName]) {


            toolTip = shopParts[catName][part]['name'];


            htmlOut += '<div class="span3 avatar-item" onclick="selectItem(\''+catName+'\', '+part+')" rel="tooltip" title="'+toolTip+'">';

            if (shopParts[catName][part]['default'] == 1) {
                htmlOut += '<img data-original="'+catPath+catName+'/'+shopParts[catName][part]['image']+'_c.png">';
            }
            htmlOut += '<img data-original="'+catPath+catName+'/'+shopParts[catName][part]['image']+'_o.png">';

            if (shopParts[catName][part]['owned'] != 1) {
                htmlOut += '<div class="avatar-shop-price">'+shopParts[catName][part]['price']+'</div>';
            }

            htmlOut += '</div>';

        }
    }

    $('#catList').html(htmlOut);

    $(".avatar-item img").lazyload({
        effect : "fadeIn",
        container: $('#catList'),
        skip_invisible: false
    });

    if (catName == 'background') {
        $('.avatar-nudge').hide();
    } else {
        $('.avatar-nudge').show();
    }

    var curCol = $('#'+curBodyPart).attr('data-colour');

    if (curCol !== '' && curCol != '0') {
        $('#curColour').removeClass('avatar-nocolour');
        $('#curColour').css('background-color', decToHex(curCol));
    } else {
        $('#curColour').addClass('avatar-nocolour');
    }


    tooltips();

    // IE11 ugly fix
    $('#catList').trigger('scroll');

    // scroll category to the top
    $('#catList').animate({ scrollTop: 0}, 'fast');
}

function selectItem(catName, part, ignoreState) {

    var refID = '';
    if (catName != 'feet_left') {
        refID = catName;
    } else {
        refID = 'feet_left';
        catName = 'feet';
    }

    // load outline
    loadSVGImage('#'+refID+'-outline', catPath+catName+'/'+shopParts[catName][part]['image']+'_o.png');

    // load default
    if (shopParts[catName][part]['default'] == 1) {
        loadSVGImage('#'+refID+'-default', catPath+catName+'/'+shopParts[catName][part]['image']+'_c.png');
    } else {
        $('#'+refID+'-default').attr('xlink:href', '');
    }

    // load mask

    if (shopParts[catName][part]['mask'] == 1) {
        loadSVGImage('#'+refID+'-mask-image', catPath+catName+'/'+shopParts[catName][part]['image']+'_m.png');
        if ($('#'+refID).attr('data-colour') != '0' && $('#'+refID).attr('data-colour') != '') {
            $('#'+refID+'-col-rect').attr('opacity', '1');
        }
    } else {
        $('#'+refID+'-mask-image').attr('xlink:href', '');
        $('#'+refID+'-col-rect').attr('opacity', '0');
    }


    // load skin
    if (shopParts[catName][part]['skin'] == 1) {
        loadSVGImage('#'+refID+'-skin-image', catPath+catName+'/'+shopParts[catName][part]['image']+'_s.png');
        $('#'+refID+'-skin-rect').attr('opacity', '1');
    } else {
        $('#'+refID+'-skin-image').attr('xlink:href', '');
        $('#'+refID+'-skin-rect').attr('opacity', '0');
    }


    // set skin colour
    $('#'+refID+'-skin-rect').attr('fill', decToHex(skinColour));


    if (refID == 'feet') {
        selectItem('feet_left', part, ignoreState);

    } else if (refID == 'legs') {

        // always reset nudge on feet when changing legs
        /*$('#feet').css('left','');
        $('#feet_left').css('left','');
        $('#feet').attr('data-nudge-x', '0');
        $('#feet').attr('data-nudge-y', '0');


        cc_feet = ($('#feet').attr('class')) ? $('#feet').attr('class') : '';
        cc_feet_left = ($('#feet_left').attr('class')) ? $('#feet_left').attr('class') : '';


        // set feet together / apart
        if (shopParts[catName][part]['leg_pos'] == '0' || shopParts[catName][part]['leg_pos'] == '') {

            if (cc_feet.indexOf('feet_together') == -1)
                cc_feet += ' feet_together';

            if (cc_feet_left.indexOf('feet_together_left') == -1)
                cc_feet_left += ' feet_together_left';

            $('#feet').attr('class',cc_feet);
            $('#feet_left').attr('class',cc_feet_left);

        } else {

            cc_feet = cc_feet.replace('feet_together', '');
            cc_feet_left = cc_feet_left.replace('feet_together_left', '');

            $('#feet').attr('class', cc_feet);
            $('#feet_left').attr('class', cc_feet_left);

        }

        // set feet above / below the legs
        if (shopParts[catName][part]['leg_layer'] == '1') {

            if (cc_feet.indexOf('feet_ontop') == -1)
                cc_feet += ' feet_ontop';

            if (cc_feet_left.indexOf('feet_ontop') == -1)
                cc_feet_left += ' feet_ontop';

            $('#feet').attr('class',cc_feet);
            $('#feet_left').attr('class',cc_feet_left);

        } else {

            cc_feet = cc_feet.replace('feet_ontop', '');
            cc_feet_left = cc_feet_left.replace('feet_ontop', '');

            $('#feet').attr('class', cc_feet);
            $('#feet_left').attr('class', cc_feet_left);
        }*/

    }

    // reset skin colour
    $('.skinColour').attr('fill', decToHex(skinColour));

    // store selected for saving
    $('#'+catName).attr('data-selected', shopParts[catName][part]['location']);
    $('#'+catName).attr('data-selected-id', part);


    // store selected item, only used when reverting to a saved avatar without refreshing
    partsList[catName]['outline'] = catPath+catName+'/'+shopParts[catName][part]['image']+'_o.png';
    partsList[catName]['mask'] = catPath+catName+'/'+shopParts[catName][part]['image']+'_m.png';
    partsList[catName]['default'] = catPath+catName+'/'+shopParts[catName][part]['image']+'_c.png';
    partsList[catName]['skin'] = catPath+catName+'/'+shopParts[catName][part]['image']+'_s.png';
    partsList[catName]['selected'] = shopParts[catName][part]['location'];
    partsList[catName]['partID'] = part;

    // show purchase link if not owned
    if (shopParts[catName][part]['owned'] === '0') {
        $('#addItemName').text(shopParts[catName][part]['name']);
        $('#addItemCost').text(shopParts[catName][part]['price']);
        $('#addToBasket').attr('data-catname', catName);
        $('#addToBasket').attr('data-partid', part);
        $('#addToBasket').show();
        $('#addedToBasket').hide();
        $('.avatar-buy').show();
    } else {
        $('.avatar-buy').hide();
    }

    if (!ignoreState) {
        updateState();
    }

}


function toggleTools(toolName) {
    if ($('#'+toolName).length) {
        $('#'+toolName).toggle();
    }
}



/*
 * COLOUR MANAGEMENT
 */
function toggleColourWheel(type) {
    if (type) {
        curColourPicker = type;
    }
    $('.color-picker').toggle();

    if ($('.color-picker').css('display') == 'none') {
        if (curColourPicker == 'col') {
            // just closed colour picker so store latest colour
            lastCol = $('#'+curBodyPart).attr('data-colour');

            if (lastCol !== '' && recentColours.indexOf(lastCol) == -1) {

                recentColours.push(lastCol);

                if (recentColours.length > maxRecent) {
                    recentColours.shift();
                }
            }
        }

    } else {
        // showing colour picker so load recent colours
        for (var i = recentColours.length-1; i >= 0; i--) {

            if ($('#palette'+(i+1)).length) {
                $('#palette'+(i+1)).css('background-color', decToHex(recentColours[i]));
            }
        }

        if (type == 'col') {
            $('#resetColourBtn').show();
        } else {
            $('#resetColourBtn').hide();
        }

    }
}

function setColour(e) {

    var rgba = e.rgba();

    var rgbaString = rgba.toString();

    colourPart(rgbaString);

}

function loadPalette(id) {

    if ($('#palette'+id).length) {
        var rgbaString = $('#palette'+id).css('background-color');

        if (rgbaString !== '') {
            colourPart(rgbaString);
        }
    }
}

function colourPart(rgbaString) {
    if (curColourPicker == 'col') {
        if (curBodyPart !== '' && $('#'+curBodyPart+'-col-rect').length && shopParts[curBodyPart][partsList[curBodyPart]['partID']]['mask'] != 0 ) {
            if (rgbaString !== 'rgba(0,0,0,1)') {
                $('#'+curBodyPart+'-col-rect').attr('fill', rgbaString);
                $('#'+curBodyPart+'-col-rect').attr('opacity','1');
            } else {
                $('#'+curBodyPart+'-col-rect').attr('opacity','0');
            }
        }
        $('#'+curBodyPart).attr('data-colour',rgbToDec(rgbaString));

        partsList[curBodyPart]['colour'] = rgbToDec(rgbaString);

        if (curBodyPart == 'feet') {
            // do feet_left too

            if (rgbaString != 'rgba(0,0,0,1)') {
                $('#feet_left-col-rect').attr('fill', rgbaString);
                $('#feet_left-col-rect').attr('opacity','1');
            } else {
                $('#feet_left-col-rect').attr('opacity','0');
            }

            $('#feet_left').attr('data-colour',rgbToDec(rgbaString));

            partsList['feet_left']['colour'] = rgbToDec(rgbaString);

        }

        $('#curColour').removeClass('avatar-nocolour');

        $('#curColour').css('background-color', rgbaString);

    } else {
        skinColour = rgbToDec(rgbaString);

        $('.skinColour').attr('fill', rgbaString);

        $('#skinColour').css('background-color', rgbaString);
    }

    updateState();

}

function defaultColour() {
    // reset the current body part to have no set colour
    $('#'+curBodyPart+'-col-rect').attr('opacity','0');
    $('#'+curBodyPart).attr('data-colour','');

    if (curBodyPart == 'feet') {
        $('#feet_left-col-rect').attr('opacity','0');
        $('#feet_left').attr('data-colour','');
    }

    $('#curColour').css('background-color', '');

    $('#curColour').addClass('avatar-nocolour');


    partsList[curBodyPart]['colour'] = '0';


    updateState();
}

function nudge(xChange, yChange, ignoreState) {
    var moveDist = 5;
    var maxNudges = 500;

    if (curBodyPart !== '' && curBodyPart != 'background') {

        $bpart = $('#'+curBodyPart);

        var bleft = parseInt($bpart.css('left'),10);
        var btop = parseInt($bpart.css('top'),10);



        if (xChange !== 0 && xChange <= maxNudges-1 && xChange >= -maxNudges-1) {
            // move in x
            var xC = xChange * moveDist;

            if ((xC < 0 && bleft > origPositions[curBodyPart]['left'] - (maxNudges*moveDist)) || (xC > 0 && bleft < origPositions[curBodyPart]['left'] + (maxNudges*moveDist))) {

                $bpart.css('left', (bleft+xC) + 'px');

                if (curBodyPart == 'feet') {
                    // move other foot too
                    $('#feet_left').css('left', (parseInt($('#feet_left').css('left'),10)+(-xC)) + 'px');
                }

                var curNudgeX = ((bleft - (origPositions[curBodyPart]['left'])) / moveDist) + parseInt(xChange,10);
                $('#'+curBodyPart).attr('data-nudge-x', curNudgeX);

                partsList[curBodyPart]['posX'] = curNudgeX;
            }
        }

        if (yChange !== 0 && yChange <= maxNudges-1 && yChange >= -maxNudges-1)  {
            // move in y
            var yC = yChange * moveDist;

            if ((yC < 0 && btop > origPositions[curBodyPart]['top'] - (maxNudges*moveDist)) || (yC > 0 && btop < origPositions[curBodyPart]['top'] + (maxNudges*moveDist))) {

                $bpart.css('top', (btop+yC) + 'px');

                if (curBodyPart == 'feet') {
                    // move other foot too
                    $('#feet_left').css('top', (parseInt($('#feet_left').css('top'),10)+(yC)) + 'px');
                }

                var curNudgeY = ((btop - (origPositions[curBodyPart]['top'])) / moveDist) + parseInt(yChange,10);
                $('#'+curBodyPart).attr('data-nudge-y', curNudgeY);

                partsList[curBodyPart]['posY'] = curNudgeY;
            }
        }
    }
    if (!ignoreState) {
        updateState();
    }
}

function unnudge(ignoreState) {
    // reset the current part to 0,0 nudge
    $bpart = $('#'+curBodyPart);

    if (origPositions[curBodyPart]) {

        $bpart.css('top', origPositions[curBodyPart]['top']);
        $bpart.css('left', origPositions[curBodyPart]['left']);

        $('#'+curBodyPart).attr('data-nudge-x', 0);
        $('#'+curBodyPart).attr('data-nudge-y', 0);

        if (curBodyPart == 'feet') {
            // do feet left too
            $('#feet_left').css('top', origPositions[curBodyPart]['top']);
            $('#feet_left').css('left', origPositions[curBodyPart]['left']);

            $('#feet_left').attr('data-nudge-x', 0);
            $('#feet_left').attr('data-nudge-y', 0);
        }
    }

    if (!ignoreState) {
        updateState();
    }
}


/*
 * BASKET
 */
function toggleBasket() {

    if ($('.avatar-basket').css('display') == 'none') {
        // about to show basket

        var basketHTML = '';

        var tCost = 0;

        for (var part in basket) {
            colour = catPath + basket[part] + '/' + shopParts[basket[part]][part]['image'] + '_c.png';
            outline = catPath + basket[part] + '/' + shopParts[basket[part]][part]['image'] + '_o.png';
            price = shopParts[basket[part]][part]['price'];

            basketHTML += '<div id="part'+part+'">';
            if (shopParts[basket[part]][part]['default'] == '1') {
                basketHTML += '<img src="'+colour+'" />';
            }
            if (shopParts[basket[part]][part]['outline'] == '1') {
                basketHTML += '<img src="'+outline+'" />';
            }
            basketHTML += '<span>'+price+'</span>';
            basketHTML += '<i class="icon-2x icon-remove-sign avatar-remove" onclick="removeItem('+part+')"></i>';
            basketHTML += '</div>';

            tCost += parseInt(shopParts[basket[part]][part]['price'],10);

        }


        $('#basketContents').html(basketHTML);

        $('#itemCost').html(tCost);
        $('#currentBalance').html(number_format(userCredits));
        $('#newBalance').html(number_format(userCredits - tCost));
    }

    $('.avatar-basket').toggle();
}

function addToBasket() {

    partID = $('#addToBasket').attr('data-partid');
    catName = $('#addToBasket').attr('data-catname');
    if (partID !== '') {
        basket[partID] = catName;
    }

    refreshBasketCount();

    // replace add button with added note
    $('#addToBasket').hide();
    $('#addedToBasket').show();
}

function refreshBasketCount() {

    var itemCnt = Object.keys(basket).length,
        buyAllButton = $('.btn.buyAll');

    $bdge = $('#basketBtn .badge');

    if (itemCnt === 0) {
        if ($bdge.length) {
            $bdge.remove();
        }
        buyAllButton.addClass('disabled');

    } else {
        if (!$bdge.length) {
            $('#basketBtn').append('<span class="badge badge-important"></span>');
        }
        $('#basketBtn .badge').html(itemCnt);
        buyAllButton.removeClass('disabled');
    }
}

function emptyBasket() {

    basket = {};

    $('#basketContents').html('');

    $('#itemCost').html('0');
    $('#newBalance').html(number_format(userCredits));

    refreshBasketCount();

    toggleBasket();
    $('.btn.buyAll').addClass('disabled');
}

function removeItem(partID) {

    if (basket[partID]) {

        // update credits
        var remCost = $('#itemCost').html() - parseInt(shopParts[basket[partID]][partID]['price'],10);
        $('#itemCost').html(remCost);
        $('#newBalance').html(number_format(userCredits - remCost));

        delete basket[partID];

        $('#part'+partID).remove();

        refreshBasketCount();
    }

}

function buyItems() {
    var buyAllButton = $('.btn.buyAll');

    if (Object.keys(basket).length > 0 && !buyAllButton.hasClass('disabled')) {

        var items = Object.keys(basket);
        var itemList = items.join('|');
        var moneyspent = 0;

        $.ajax({
            type: "GET",
            url: 'index.php?mod=23&hide=1&task=purchase&itemlist='+itemList,
            success: function(data) {
                resp = JSON.parse(data);

                if (resp.success === true) {

                    // hide the add to basket prompt if showing
                    $('.avatar-buy').hide();

                    // change owned flag in category
                    for (var i in basket) {
                        // set item bought in shopParts array
                        shopParts[basket[i]][i]['owned'] = 1;
                        moneyspent += parseInt(shopParts[basket[i]][i]['price'], 10);
                    }

                    // save avatar
                    saveAvatar();

                    // reload current category to apply above
                    showCategory(curBodyPart);

                    // update credits
                    userCredits -= moneyspent;
                    $('#yourCredits').html(number_format(userCredits));

                    // empty and close basket
                    emptyBasket();

                } else {
                    alerts({title:'Error', message:resp.message});
                }
            }
        });

        buyAllButton.addClass('disabled');
    }
}




function loadAvatar(theParts) {
    var partColor, posX, posY;

    for(var part in theParts) {

        if (!theParts.hasOwnProperty(part)) continue;

        $('#'+part+'-outline').attr('xlink:href', theParts[part]['outline']);

        partColor = (theParts[part]['colour'] !== '' && theParts[part]['colour'] != undefined) ? theParts[part]['colour'] : '0';

        if (partColor.toString(16) != '0') {
            $('#'+part+'-col-rect').attr('fill', decToHex(partColor));
            $('#'+part+'-col-rect').attr('opacity', '1');

            if (part != 'feet_left') {
                recentColours.push(partColor);
            }
        } else {
            $('#'+part+'-col-rect').attr('opacity', '0');
        }

        tmpImage = new Image();
        tmpImage.alt = part;
        tmpImage.onload = function() {

            w = this.width;
            h = this.height;

            $('#'+this.alt+' image').attr('width', w);
            $('#'+this.alt+' image').attr('height', h);

            $('#'+this.alt+' rect').attr('width', w);
            $('#'+this.alt+' rect').attr('height', h);
        };
        tmpImage.src = $('#'+part+'-outline').attr('xlink:href');


        if (theParts[part]['posX'] !== '' || theParts[part]['posY'] !== '') {
            posX = (theParts[part]['posX'] === '') ? 0 : theParts[part]['posX'];
            posY = (theParts[part]['posY'] === '') ? 0 : theParts[part]['posY'];

            curBodyPart = part;
            unnudge(true);
            nudge(posX,posY,true);
        }


        selectItem(part, theParts[part]['partID'], true);

    }

    $('.skinColour').attr('fill', decToHex(skinColour));

    $('#skinColour').css('background-color', decToHex(skinColour));

    showCategory('face');

    $('.avatar-catsel').val('face');

    updateState();
}


function saveAvatar(suppressMsg) {

    var outStr = '';

    var allOwned = true;

    var forBasket = [];


    for(var i=0; i<bodyParts.length; i++) {


        var id = $('#'+bodyParts[i]).attr('data-selected-id');
        if (id === '') id = '0';

        var sel = $('#'+bodyParts[i]).attr('data-selected');
        if (sel === '') sel = '0';

        var col = $('#'+bodyParts[i]).attr('data-colour');
        if (col === '') col = '0';

        var nudgeX = $('#'+bodyParts[i]).attr('data-nudge-x');
        if (nudgeX === '') nudgeX = '0';

        var nudgeY = $('#'+bodyParts[i]).attr('data-nudge-y');
        if (nudgeY === '') nudgeY = '0';

        outStr += i + ":" + sel + ":" + col + ":" + nudgeX + "," + nudgeY + "|";

        if (shopParts[bodyParts[i]][id]['owned'] === '0') {
            //allOwned = false;
            alert("You do not own some of these items, however they have been saved anyway.");

            // add to basket for purchase
            //basket[id] = bodyParts[i];
        }

    }
    var buyAllButton = $('.btn.buyAll');

    if (allOwned) {

        outStr += "skin:"+skinColour;

        loadThis({url:'index.php?mod=23&task=avatar&hide=true&avstring='+outStr, target:'hidden'}, 'enableSaveBtn');

        // update save tracker for reverts
        savedParts = cloneObject(partsList);

        savedSkinColour = skinColour;

        // store state for checking if saved
        savedState = outStr;

        updateState();

        if (!suppressMsg) {
            alerts({title:'Avatar Saved', message:'Your avatar has been successfully saved.'});
        }
        buyAllButton.addClass('disabled');

    } else {
        // show basket
        toggleBasket();

        // update basket badge
        refreshBasketCount();
        buyAllButton.removeClass('disabled');
    }



}

function enableSaveBtn() {
    $('#savebtn').prop('disabled', false);
}

function updateState() {

    if (!checkSaveState()) {
        // avatar is different to saved
        $('#savebtn').removeClass('btn-primary').addClass('btn-danger');
    } else {
        $('#savebtn').removeClass('btn-danger').addClass('btn-primary');
    }

}

function checkSaveState() {

    if (savedState == '') {
        // just loaded
        return true;
    }

    var curState = '';

    for(var i=0; i<bodyParts.length; i++) {


        var id = $('#'+bodyParts[i]).attr('data-selected-id');
        if (id === '') id = '0';

        var sel = $('#'+bodyParts[i]).attr('data-selected');
        if (sel === '') sel = '0';

        var col = $('#'+bodyParts[i]).attr('data-colour');
        if (col === '') col = '0';

        var nudgeX = $('#'+bodyParts[i]).attr('data-nudge-x');
        if (nudgeX === '') nudgeX = '0';

        var nudgeY = $('#'+bodyParts[i]).attr('data-nudge-y');
        if (nudgeY === '') nudgeY = '0';

        curState += i + ":" + sel + ":" + col + ":" + nudgeX + "," + nudgeY + "|";
    }

    curState += "skin:"+skinColour;

    return (curState === savedState);

}

function randomAvatar() {

    for(var i=0; i<bodyParts.length; i++) {

        var part = ranPart(bodyParts[i]);

        selectItem(bodyParts[i], part['partID']);
    }
}

function ranPart(bodyPart) {

    var keys = Object.keys(shopParts[bodyPart]);
    var part = shopParts[bodyPart][keys[ keys.length * Math.random() << 0]];

    if (part['owned'] == '1') {
        return part;
    } else {
        return ranPart(bodyPart);
    }

}

function revertAvatar() {

    skinColour = savedSkinColour;

    loadAvatar(savedParts);

    toggleTools('resetpane');
}

function resetAvatar() {

    for(var i=0; i<bodyParts.length; i++) {

        var keys = Object.keys(shopParts[bodyParts[i]]);
        var part = shopParts[bodyParts[i]][keys[0]];


        $('#'+bodyParts[i]).attr('data-selected', part['location']);
        $('#'+bodyParts[i]).attr('data-colour', '');
        $('#'+bodyParts[i]).attr('data-nudge-x', '');
        $('#'+bodyParts[i]).attr('data-nudge-y', '');

        selectItem(bodyParts[i], part['partID']);

        $('#'+bodyParts[i]+'-col-rect').attr('fill','');
        $('#'+bodyParts[i]+'-col-rect').attr('opacity','0');

        curBodyPart = bodyParts[i];
        unnudge();

        skinColour = 14258023;

        if (bodyParts[i] == 'feet') {
            $('#feet_left').attr('data-selected', part['location']);
            $('#feet_left').attr('data-colour', '');
            $('#feet_left').attr('data-nudge-x', '');
            $('#feet_left').attr('data-nudge-y', '');

            $('#feet_left'+'-col-rect').attr('fill','');
            $('#feet_left'+'-col-rect').attr('opacity','0');

            curBodyPart = 'feet_left';
            unnudge();

        }

    }
    toggleTools('resetpane');

}

function screenShot(showBack) {

    if (!checkSaveState()) {
       alerts({title:'Avatar Changed', message:'The photo will be of your saved avatar. Be sure to save your avatar first if you make changes.'});
    }

    window.location = 'index.php?mod=23&task=screenshot&hide=true&back='+showBack;

    toggleTools('screenshotpane');
}




/*
 * HELPER FUNCTIONS
**/


function loadSVGImage(target, src) {

    if ($(target).length) {
        var img = new Image();
        img.onload = function() {
            $(target).attr('xlink:href', src);
        };
        img.src = src;
        img = null;
    }
}

function rgbToDec(rgbaStr) {
    // rgba(0,0,0,1)
    var rgbString, rgba;

    if (rgbaStr.indexOf('rgba(') !== false) {
        rgbString = rgbaStr.substr(5, rgbaStr.length - 6);

        rgba = rgbString.split(',');

        return parseInt(toHex(rgba[0]) + toHex(rgba[1]) + toHex(rgba[2]), 16);

    } else if (rgbaStr.indexOf('rgb(') !== false) {

        rgbString = rgbaStr.substr(4, rgbaStr.length - 5);

        rgba = rgbString.split(',');

        return parseInt(toHex(rgba[0]) + toHex(rgba[1]) + toHex(rgba[2]), 16);

    } else {
        return 0;
    }

}

function decToHex(colour) {
    var parsed = (+colour).toString(16);

    if (parsed.length == 4) {
        parsed = "00"+parsed;
    } else if (parsed.length == 5) {
        parsed = "0"+parsed;
    }
    return '#'+parsed;
}

function toHex(n) {
    n = parseInt(n,10);
    if (isNaN(n)) return "00";
    n = Math.max(0,Math.min(n,255));
    return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);
}

function cloneObject(obj) {

    var ret = {};

    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    for( var key in obj) {
        ret[key] = cloneObject(obj[key]);
    }

    return ret;
}

function number_format(val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



$(function() {

    loadAvatar(partsList);

    // resave avatat to get current state
    //saveAvatar(true);

    this_parent = $('.color-picker .color-wheel').parent();

    pheight = this_parent.height();
    pwidth = this_parent.width();

    minDimention = Math.min(pwidth, pheight);

    minDimention = minDimention-$('.avatar-palette').outerWidth()-20;

    $('.color-picker .color-wheel').css({'height':minDimention,'width':minDimention}).canvasify().on('click', setColour).on('tap', setColour);

    // save button with new timeout func
    $('#savebtn').click(function(){
        $(this).prop('disabled', true);
        saveAvatar()
    });


    // bind cursors to nudge
    $(document).keydown(function(e) {
        switch (e.which) {
            case 37: nudge(-1,0); target = 'nudge_left'; break;
            case 38: nudge(0,-1); target = 'nudge_up';break;
            case 39: nudge(1,0); target = 'nudge_right';break;
            case 40: nudge(0,1); target = 'nudge_down';break;
            default: return;
        }
        e.preventDefault();

        $('.avatar-'+target).addClass('avatar-btn-hover').delay(200).queue(function(next) {
            $(this).removeClass('avatar-btn-hover');
            next();
        });
    });
});
