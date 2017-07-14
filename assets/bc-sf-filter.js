// Override Settings
var bcSfFilterSettings = {
    general: {
        limit: bcSfFilterConfig.custom.current_page_size,
        /* Optional */
        loadProductFirst: true, // Uncomment after completing the setup
        sortingList: ['manual', 'price-ascending', 'price-descending', 'title-ascending', 'title-descending', 'created-descending', 'created-ascending', 'sale-descending'],
        showLimitList:"9,12,24,36"
    }
};

// Declare Templates
var bcSfFilterTemplate = {
    'soldOutClass': 'sold-out',
    'saleClass': 'on-sale',
    'soldOutLabelHtml': '<div class="product-soldout"><div class="fp-table"><div class="fp-table-cell"><span class="soldout">' + bcSfFilterConfig.label.sold_out + '</span></div></div></div>',
    'saleLabelHtml': '<span class="product-label sale">' + bcSfFilterConfig.label.collections_sale + '</span>',
    'newLabelHtml': '<span class="product-label new" style="display: none;">' + bcSfFilterConfig.label.collections_new + '</div>',
    'vendorHtml': '<div>{{itemVendorLabel}}</div>',

    // Grid Template
    'productGridItemHtml': '<div class="col-md-{{num_col}} col-sm-{{num_col2}} col-xs-{{num_col3}} product-wrap product-wrap1">'+
                              '<div class="product product-grid product-item clearfix">' +
                                  '<div id="product-{{itemId}}" class="product-inner" data-publish-date="{{itemPublishedAt}}">' +
                                      '<div class="product-media">' +
                                          '<div class="product-thumbnail">' +
                                              '<a href="{{itemUrl}}" title="">' +
                                                '<img class="product-featured-image" src="{{itemThumbUrl}}" alt="{{itemTitle}}">' +
                                                '{{itemImageLast}}' +
                                              '</a>' +
                                          '</div>' +
                                          '{{itemSoldOutLabel}}' +
                                          '<div class="product-hover">' +
                                              '<div class="product-actions">' +
                                                  '<form action="/cart/add" method="post" class="variants" id="AddToCartForm-{{itemId}}" enctype="multipart/form-data">' +
                                                      '{{itemButtonCart}}' +
                                                  '</form>' +
                                                  '{{itemWishlist}}' +
                                                  '{{itemQuicView}}' +
                                              '</div>' +
                                          '</div>' +
                                          '{{itemSaleLabel}}' +
                                          '{{itemNewLabel}}' +
                                      '</div>' +
                                      '<div class="product-body">' +
                                          '<h2 class="product-name">' +
                                              '<a href="{{itemUrl}}" title="{{itemTitle}}" >{{itemTitle}}</a> ' +
                                          '</h2>' +
                                          '<div class="product-category">' +
                                              '<span>{{itemType}}</span>' +
                                          '</div>' +
                                          '<div class="product-price">' +
                                              '<span class="amout">' +
                                                  '{{itemPrice}}' +
                                              '</span>' +
                                          '</div>' +
                                      '</div>' +
                                  '</div>' +
                              '</div>' +	
                            '</div>',
    // List Template
    'productListItemHtml': '<div class="product product-grid product-list product-item clearfix">'+
                                  '<div id="product-{{itemId}}" class="product-inner" data-publish-date="{{itemPublishedAt}}">' +
                                      '<div class="product-media">' +
                                          '<div class="product-thumbnail">' +
                                              '<a href="{{itemUrl}}" title="">' +
                                                '<img class="product-featured-image" src="{{itemThumbUrl}}" alt="{{itemTitle}}">' +
                                                '{{itemImageLast}}' +
                                              '</a>' +
                                          '</div>' +
                                          '{{itemSoldOutLabel}}' +
                                          '<div class="product-hover">' +
                                              '<div class="product-actions">' +
                                                  '<form action="/cart/add" method="post" class="variants" id="AddToCartForm-{{itemId}}" enctype="multipart/form-data">' +
                                                      '{{itemButtonCart}}' +
                                                  '</form>' +
                                                  '{{itemWishlist}}' +
                                                  '{{itemQuicView}}' +
                                              '</div>' +
                                          '</div>' +
                                          '{{itemSaleLabel}}' +
                                          '{{itemNewLabel}}' +
                                      '</div>' +
                                      '<div class="product-body">' +
                                          '<h2 class="product-name">' +
                                              '<a href="{{itemUrl}}" title="{{itemTitle}}" >{{itemTitle}}</a> ' +
                                          '</h2>' +
                                          '<div class="product-category">' +
                                              '<span>{{itemType}}</span>' +
                                          '</div>' +
                                          '<div class="product-price">' +
                                              '<span class="amout">' +
                                                  '{{itemPrice}}' +
                                              '</span>' +
                                          '</div>' +
                                          '<div class="product-stars">' +
                                          	'<span class="shopify-product-reviews-badge" data-id="{{itemId}}"></span>' +
                                          '</div>' +
                                          '<div class="product-description">' +
                                          	'<p>{{itemDescription}}</p>' +
                                          '</div>' +
                                      '</div>' +
                                  '</div>' +
                            '</div>',

    // Pagination Template
    'previousActiveHtml': '<li class="pagination-prev"><a href="{{itemUrl}}"><span><i class="icon icon-arrow-prev"></i></span></a></li>',
    'previousDisabledHtml': '<li class="disabled"><span><i class="icon icon-arrow-prev"></i></span></li>',
    'nextActiveHtml': '<li class="pagination-next"><a href="{{itemUrl}}"><span><i class="icon icon-arrow-next"></i></span></a></li>',
    'nextDisabledHtml': '<li class="disabled"><span><i class="icon icon-arrow-next"></i></span></li>',
    'pageItemHtml': '<li><a href="{{itemUrl}}">{{itemTitle}}</a></li>',
    'pageItemSelectedHtml': '<li class="active"><span>{{itemTitle}}</span></li>',
    'pageItemRemainHtml': '<li><span>{{itemTitle}}</span></li>',
    'paginateHtml': '<ul class="pagination">{{previous}}{{pageItems}}{{next}}</ul>',
  
    // Sorting Template
    'sortingHtml': '<label>' + bcSfFilterConfig.label.sorting + '</label><select>{{sortingItems}}</select>',
  	'showLimitHtml': '<select>{{showLimitItems}}</select>',
};

/************************** BUILD PRODUCT LIST **************************/

// Build Product Grid Item
BCSfFilter.prototype.buildProductGridItem = function(data) { 
    /*** Prepare data ***/
    data.price_min *= 100, data.price_max *= 100, data.compare_at_price_min *= 100, data.compare_at_price_max *= 100; // Displaying price policy of Shopify, have to multiple by 100
    var soldOut = !data.available; // Check a product is out of stock
    var onSale = data.compare_at_price_min > data.price_min; // Check a product is on sale
    var priceVaries = data.price_min != data.price_max; // Check a product has many prices
    // Get First Variant (selected_or_first_available_variant)
    var firstVariant = data['variants'][0];
    if (getParam('variant') !== null && getParam('variant') != '') {
        var paramVariant = data.variants.filter(function(e) { return e.id == getParam('variant'); });
        if (typeof paramVariant[0] !== 'undefined') {
            firstVariant = paramVariant[0];
        }
    }
    /*** End Prepare data ***/

    // Get Template
    var itemHtml = bcSfFilterTemplate.productGridItemHtml; 
  
  	var num_col = bcSfFilterConfig.custom.num_col;
    var num_col2 = bcSfFilterConfig.custom.num_col_2;
    var num_col3 = bcSfFilterConfig.custom.num_col_3;
  	itemHtml = itemHtml.replace(/{{num_col}}/g, num_col);
    itemHtml = itemHtml.replace(/{{num_col2}}/g, num_col2);
    itemHtml = itemHtml.replace(/{{num_col3}}/g, num_col3);

    // Add Thumbnail
    var images = Object.keys(data.images).map(function (key) { return data.images[key]; });
    var itemThumbUrl = images.length > 0 ? this.optimizeImage(images[0], 'large') : bcSfFilterConfig.general.no_image_url;
    itemHtml = itemHtml.replace(/{{itemThumbUrl}}/g, itemThumbUrl);

    var itemImageLastHtml = '';
    if(images.length > 1) { 
        for(var i = 0 ; i <= images.length ; i ++) {
            if( i == images.length - 1) { 
                itemImageLastHtml += '<img src="' +  this.optimizeImage(images[i], 'large')  + '" alt="{{itemTitle}}">';
             
            }
        }
    }
    itemHtml = itemHtml.replace(/{{itemImageLast}}/g, itemImageLastHtml);
    /*** Optional Elements ***/

    // Add soldOut class
    var soldOutClass = soldOut ? bcSfFilterTemplate.soldOutClass : '';
    itemHtml = itemHtml.replace(/{{soldOutClass}}/g, soldOutClass);
  
    // Add onSale class
    var saleClass = onSale ? bcSfFilterTemplate.saleClass : '';
    itemHtml = itemHtml.replace(/{{saleClass}}/g, saleClass);
  
    // Add soldOut Label
    var itemSoldOutLabelHtml = soldOut ? bcSfFilterTemplate.soldOutLabelHtml : '';
    itemHtml = itemHtml.replace(/{{itemSoldOutLabel}}/g, itemSoldOutLabelHtml);

    // Add onSale Label
    var itemSaleLabelHtml = onSale ? bcSfFilterTemplate.saleLabelHtml : '';
    itemHtml = itemHtml.replace(/{{itemSaleLabel}}/g, itemSaleLabelHtml);

    // Add Vendor
    var itemVendorHtml = bcSfFilterConfig.custom.vendor_enable ? bcSfFilterTemplate.vendorHtml.replace(/{{itemVendorLabel}}/g, data.vendor) : '';
    itemHtml = itemHtml.replace(/{{itemVendor}}/g, itemVendorHtml);

    // Add Description
    var itemDescription = jQ('<p>' + data.body_html + '</p>').text();
    // Truncate by word
    itemDescription = (itemDescription.split(" ")).length > 40 ? itemDescription.split(" ").splice(0, 40).join(" ") + '...' : itemDescription.split(" ").splice(0, 40).join(" ");
    // Truncate by character
    //itemDescription = itemDescription.length > 350 ? itemDescription.substring(0, 350) + '...' : itemDescription.substring(0, 350);
    itemHtml = itemHtml.replace(/{{itemDescription}}/g, itemDescription);
  
  	var itemButtonCartHtml = '';
    if(soldOut) {
        itemButtonCartHtml += '<a class="btn-select-option awe-button product-add-cart" data-toggle="tooltip" title="' + bcSfFilterConfig.label.product_add_cart + '" href="{{itemUrl}}" ><i class="icon icon-shopping-bag"></i></a>';
    }
    else {
        if(data.available && data.variants.length > 1) {
            itemButtonCartHtml += '<a class="btn-select-option awe-button product-add-cart" data-toggle="tooltip" title="' + bcSfFilterConfig.label.product_options+ '" href="{{itemUrl}}" ><i class="icon icon-shopping-bag"></i></a>';
        }
        else {
            itemButtonCartHtml += '<input type="hidden" name="id" value="' + firstVariant.id + '" />';
            itemButtonCartHtml +=  '<a class="btn-addToCart awe-button product-add-cart" data-toggle="tooltip" title="' + bcSfFilterConfig.label.product_add_cart + '" href="javascript:void(0)" ><i class="icon icon-shopping-bag"></i></a>';
        }
    }
    itemHtml = itemHtml.replace(/{{itemButtonCart}}/g, itemButtonCartHtml);
  
  	//Add New Label
  	var itemNewLabelHtml = '';
    if(bcSfFilterConfig.custom.show_new_label) {
      itemNewLabelHtml += bcSfFilterTemplate.newLabelHtml;
    }
	itemHtml = itemHtml.replace(/{{itemNewLabel}}/g, itemNewLabelHtml);
  
  	// Add WishList
    var itemWishlistHtml = '';
    if (bcSfFilterConfig.customer.email != '') {
        var value = (data.id).toString();
        var productId = (data.id).toString();
        for (var k in bcSfFilterConfig.customer.tags) {
            var tagID = bcSfFilterConfig['customer']['tags'][k];
            if (tagID.indexOf(productId) > -1) {
                value = 'x' + tagID;
            }
            if (value.length == 0) value = productId;
        }
        if (value.length > 0) {
            var check = ((value.length - productId.length) / 2).toString();
            check = check.split('.');
            var display = check.length > 1 && check[1].indexOf('5') > - 1 ? false : true;
        }
        if (typeof display !== 'undefined' && display == true) {
            itemWishlistHtml += '<form method="post" action="/contact#contact_form" id="contact_form" class="contact-form" accept-charset="UTF-8">';
            itemWishlistHtml += '<input type="hidden" value="customer" name="form_type">';
            itemWishlistHtml += '<input type="hidden" name="utf8" value="✓">';
            itemWishlistHtml += '<input type="hidden" name="contact[email]" value="' + bcSfFilterConfig.customer.email + '"/>';
            itemWishlistHtml += '<input type="hidden" name="contact[tags]" value="' + value + '" />';
            itemWishlistHtml += '<a class="wishlist add-to-wishlist awe-button product-quick-whistlist" href="#" data-toggle="tooltip" title="' + bcSfFilterConfig.label.product_wishlist+ '"><i class="icon icon-star"></i></a>';
            itemWishlistHtml += '</form>';
        } else {
            itemWishlistHtml += '<a class="wishlist added  awe-button product-quick-whistlist" href="/pages/wishlist" data-toggle="tooltip" title="' + bcSfFilterConfig.label.product_wishlist+ '"><i class="icon icon-star"></i></a>';
        }
    } else {
      
        itemWishlistHtml = '<a class="wishlist  awe-button product-quick-whistlist" href="/account/login" data-toggle="tooltip" title="' + bcSfFilterConfig.label.product_wishlist+ '"><i class="icon icon-star"></i></a>';
    }
    itemHtml = itemHtml.replace(/{{itemWishlist}}/g, itemWishlistHtml);

  	//Add QuickView
    var itemQuicViewHtml = '';
    itemQuicViewHtml += '<a href="javascript:void(0)" id="{{itemHandle}}" class="awe-button product-quick-view btn-quickview" data-toggle="tooltip" title="' + bcSfFilterConfig.label.product_quickview + '">';
    itemQuicViewHtml += '<i class="icon icon-eye"></i>';
    itemQuicViewHtml += '</a>';
    itemHtml = itemHtml.replace(/{{itemQuicView}}/g, itemQuicViewHtml);

  	//Add Price
    var price = this.formatMoney(data.price_min, this.moneyFormat);
    var price_varies = priceVaries ? (bcSfFilterConfig.label.from_html).replace(/{{ price }}/g, this.formatMoney(data.price_min, this.moneyFormat)) : price;
    var compare_at_price = onSale ? '<del class="sale-price">' + this.formatMoney(data.compare_at_price_min, this.moneyFormat) + '</del>' : '';
    var itemPriceHtml = '';
    itemPriceHtml += '<span>';
    itemPriceHtml += price_varies;
    itemPriceHtml += compare_at_price;
    itemPriceHtml += '</span>';
	itemHtml = itemHtml.replace(/{{itemPrice}}/g, itemPriceHtml);

    /*** End Optional Elements ***/

    // Add main attribute (Always put at the end of this function)
    itemHtml = itemHtml.replace(/{{itemId}}/g, data.id);
    itemHtml = itemHtml.replace(/{{itemHandle}}/g, data.handle);
    itemHtml = itemHtml.replace(/{{itemTitle}}/g, data.title);
    itemHtml = itemHtml.replace(/{{itemUrl}}/g, this.buildProductItemUrl(data));
  	itemHtml = itemHtml.replace(/{{itemPublishedAt}}/g, data.published_at);
	itemHtml = itemHtml.replace(/{{itemType}}/g, data.product_type);


    return itemHtml;
};

// Build Product List Item
BCSfFilter.prototype.buildProductListItem = function(data) {
/*** Prepare data ***/
    data.price_min *= 100, data.price_max *= 100, data.compare_at_price_min *= 100, data.compare_at_price_max *= 100; // Displaying price policy of Shopify, have to multiple by 100
    var soldOut = !data.available; // Check a product is out of stock
    var onSale = data.compare_at_price_min > data.price_min; // Check a product is on sale
    var priceVaries = data.price_min != data.price_max; // Check a product has many prices
    // Get First Variant (selected_or_first_available_variant)
    var firstVariant = data['variants'][0];
    if (getParam('variant') !== null && getParam('variant') != '') {
        var paramVariant = data.variants.filter(function(e) { return e.id == getParam('variant'); });
        if (typeof paramVariant[0] !== 'undefined') {
            firstVariant = paramVariant[0];
        }
    }
    /*** End Prepare data ***/

    // Get Template
    var itemHtml = bcSfFilterTemplate.productListItemHtml; 
  
  	var num_col = bcSfFilterConfig.custom.num_col;
    var num_col2 = bcSfFilterConfig.custom.num_col_2;
    var num_col3 = bcSfFilterConfig.custom.num_col_3;
  	itemHtml = itemHtml.replace(/{{num_col}}/g, num_col);
    itemHtml = itemHtml.replace(/{{num_col2}}/g, num_col2);
    itemHtml = itemHtml.replace(/{{num_col3}}/g, num_col3);

    // Add Thumbnail
    var images = Object.keys(data.images).map(function (key) { return data.images[key]; });
    var itemThumbUrl = images.length > 0 ? this.optimizeImage(images[0], 'large') : bcSfFilterConfig.general.no_image_url;
    itemHtml = itemHtml.replace(/{{itemThumbUrl}}/g, itemThumbUrl);

    var itemImageLastHtml = '';
    if(images.length > 1) { 
        for(var i = 0 ; i <= images.length ; i ++) {
            if( i == images.length - 1) { 
                itemImageLastHtml += '<img src="' +  this.optimizeImage(images[i], 'large')  + '" alt="{{itemTitle}}">';
             
            }
        }
    }
    itemHtml = itemHtml.replace(/{{itemImageLast}}/g, itemImageLastHtml);
    /*** Optional Elements ***/

    // Add soldOut class
    var soldOutClass = soldOut ? bcSfFilterTemplate.soldOutClass : '';
    itemHtml = itemHtml.replace(/{{soldOutClass}}/g, soldOutClass);
  
    // Add onSale class
    var saleClass = onSale ? bcSfFilterTemplate.saleClass : '';
    itemHtml = itemHtml.replace(/{{saleClass}}/g, saleClass);
  
    // Add soldOut Label
    var itemSoldOutLabelHtml = soldOut ? bcSfFilterTemplate.soldOutLabelHtml : '';
    itemHtml = itemHtml.replace(/{{itemSoldOutLabel}}/g, itemSoldOutLabelHtml);

    // Add onSale Label
    var itemSaleLabelHtml = onSale ? bcSfFilterTemplate.saleLabelHtml : '';
    itemHtml = itemHtml.replace(/{{itemSaleLabel}}/g, itemSaleLabelHtml);

    // Add Vendor
    var itemVendorHtml = bcSfFilterConfig.custom.vendor_enable ? bcSfFilterTemplate.vendorHtml.replace(/{{itemVendorLabel}}/g, data.vendor) : '';
    itemHtml = itemHtml.replace(/{{itemVendor}}/g, itemVendorHtml);

    // Add Description
    var itemDescription = jQ('<p>' + data.body_html + '</p>').text();
    // Truncate by word
    itemDescription = (itemDescription.split(" ")).length > 40 ? itemDescription.split(" ").splice(0, 40).join(" ") + '...' : itemDescription.split(" ").splice(0, 40).join(" ");
    // Truncate by character
    //itemDescription = itemDescription.length > 350 ? itemDescription.substring(0, 350) + '...' : itemDescription.substring(0, 350);
    itemHtml = itemHtml.replace(/{{itemDescription}}/g, itemDescription);
  
  	var itemButtonCartHtml = '';
    if(soldOut) {
        itemButtonCartHtml += '<a class="btn-select-option awe-button product-add-cart" data-toggle="tooltip" title="' + bcSfFilterConfig.label.product_add_cart + '" href="{{itemUrl}}" ><i class="icon icon-shopping-bag"></i></a>';
    }
    else {
        if(data.available && data.variants.length > 1) {
            itemButtonCartHtml += '<a class="btn-select-option awe-button product-add-cart" data-toggle="tooltip" title="' + bcSfFilterConfig.label.product_options+ '" href="{{itemUrl}}" ><i class="icon icon-shopping-bag"></i></a>';
        }
        else {
            itemButtonCartHtml += '<input type="hidden" name="id" value="' + firstVariant.id + '" />';
            itemButtonCartHtml +=  '<a class="btn-addToCart awe-button product-add-cart" data-toggle="tooltip" title="' + bcSfFilterConfig.label.product_add_cart + '" href="javascript:void(0)" ><i class="icon icon-shopping-bag"></i></a>';
        }
    }
    itemHtml = itemHtml.replace(/{{itemButtonCart}}/g, itemButtonCartHtml);
  
  	//Add New Label
  	var itemNewLabelHtml = '';
    if(bcSfFilterConfig.custom.show_new_label) {
      itemNewLabelHtml += bcSfFilterTemplate.newLabelHtml;
    }
	itemHtml = itemHtml.replace(/{{itemNewLabel}}/g, itemNewLabelHtml);
  
  	// Add WishList
    var itemWishlistHtml = '';
    if (bcSfFilterConfig.customer.email != '') {
        var value = (data.id).toString();
        var productId = (data.id).toString();
        for (var k in bcSfFilterConfig.customer.tags) {
            var tagID = bcSfFilterConfig['customer']['tags'][k];
            if (tagID.indexOf(productId) > -1) {
                value = 'x' + tagID;
            }
            if (value.length == 0) value = productId;
        }
        if (value.length > 0) {
            var check = ((value.length - productId.length) / 2).toString();
            check = check.split('.');
            var display = check.length > 1 && check[1].indexOf('5') > - 1 ? false : true;
        }
        if (typeof display !== 'undefined' && display == true) {
            itemWishlistHtml += '<form method="post" action="/contact#contact_form" id="contact_form" class="contact-form" accept-charset="UTF-8">';
            itemWishlistHtml += '<input type="hidden" value="customer" name="form_type">';
            itemWishlistHtml += '<input type="hidden" name="utf8" value="✓">';
            itemWishlistHtml += '<input type="hidden" name="contact[email]" value="' + bcSfFilterConfig.customer.email + '"/>';
            itemWishlistHtml += '<input type="hidden" name="contact[tags]" value="' + value + '" />';
            itemWishlistHtml += '<a class="wishlist add-to-wishlist awe-button product-quick-whistlist" href="#" data-toggle="tooltip" title="' + bcSfFilterConfig.label.product_wishlist+ '"><i class="icon icon-star"></i></a>';
            itemWishlistHtml += '</form>';
        } else {
            itemWishlistHtml += '<a class="wishlist added  awe-button product-quick-whistlist" href="/pages/wishlist" data-toggle="tooltip" title="' + bcSfFilterConfig.label.product_wishlist+ '"><i class="icon icon-star"></i></a>';
        }
    } else {
      
        itemWishlistHtml = '<a class="wishlist  awe-button product-quick-whistlist" href="/account/login" data-toggle="tooltip" title="' + bcSfFilterConfig.label.product_wishlist+ '"><i class="icon icon-star"></i></a>';
    }
    itemHtml = itemHtml.replace(/{{itemWishlist}}/g, itemWishlistHtml);

  	//Add QuickView
    var itemQuicViewHtml = '';
    itemQuicViewHtml += '<a href="javascript:void(0)" id="{{itemHandle}}" class="awe-button product-quick-view btn-quickview" data-toggle="tooltip" title="' + bcSfFilterConfig.label.product_quickview + '">';
    itemQuicViewHtml += '<i class="icon icon-eye"></i>';
    itemQuicViewHtml += '</a>';
    itemHtml = itemHtml.replace(/{{itemQuicView}}/g, itemQuicViewHtml);

  	//Add Price
    var price = this.formatMoney(data.price_min, this.moneyFormat);
    var price_varies = priceVaries ? (bcSfFilterConfig.label.from_html).replace(/{{ price }}/g, this.formatMoney(data.price_min, this.moneyFormat)) : price;
    var compare_at_price = onSale ? '<del class="sale-price">' + this.formatMoney(data.compare_at_price_min, this.moneyFormat) + '</del>' : '';
    var itemPriceHtml = '';
    itemPriceHtml += '<span>';
    itemPriceHtml += price_varies;
    itemPriceHtml += compare_at_price;
    itemPriceHtml += '</span>';
	itemHtml = itemHtml.replace(/{{itemPrice}}/g, itemPriceHtml);

    /*** End Optional Elements ***/

    // Add main attribute (Always put at the end of this function)
    itemHtml = itemHtml.replace(/{{itemId}}/g, data.id);
    itemHtml = itemHtml.replace(/{{itemHandle}}/g, data.handle);
    itemHtml = itemHtml.replace(/{{itemTitle}}/g, data.title);
    itemHtml = itemHtml.replace(/{{itemUrl}}/g, this.buildProductItemUrl(data));
  	itemHtml = itemHtml.replace(/{{itemPublishedAt}}/g, data.published_at);
	itemHtml = itemHtml.replace(/{{itemType}}/g, data.product_type);


    return itemHtml;
};

// Customize data to suit the data of Shopify API
// Using for building Variants
BCSfFilter.prototype.prepareProductData = function(data) {
    for (var k in data) {
        // Add Featured Image
        var images = Object.keys(data[k].images).map(function (key) { return data[k].images[key]; });
        var featuredImage = images.length > 0 ? images[0] : bcSfFilterConfig.general.no_image_url;
        data[k]['featured_image'] = featuredImage;

        // Add Options
        var optionsArr = [];
        for (var i in data[k]['options_with_values']) {
            optionsArr.push(data[k]['options_with_values'][i]['name']);
        }
        data[k]['options'] = optionsArr;

        // Customize variants
        for (var i in data[k]['variants']) {
            var variantOptionArr = [];
            var count = 1;
            var variant = data[k]['variants'][i];
            // Add Options
            var variantOptions = variant['merged_options'];
            if (Array.isArray(variantOptions)) {
                for (var j = 0; j < variantOptions.length; j++) {
                    var temp = variantOptions[j].split(':');
                    data[k]['variants'][i]['option' + (parseInt(j) + 1)] = temp[1];
                    data[k]['variants'][i]['option_' + temp[0]] = temp[1];
                    variantOptionArr.push(temp[1]);
                }
                data[k]['variants'][i]['options'] = variantOptionArr;
            }
            data[k]['variants'][i]['compare_at_price'] = parseFloat(data[k]['variants'][i]['compare_at_price']) * 100;
            data[k]['variants'][i]['price'] = parseFloat(data[k]['variants'][i]['price']) * 100;
        }
    }
    return data;
};

/************************** END BUILD PRODUCT LIST **************************/

// Build Pagination
BCSfFilter.prototype.buildPagination = function(totalProduct) {
    // Get page info
    var currentPage = parseInt(this.queryParams.page);
    var totalPage = Math.ceil(totalProduct / this.queryParams.limit);

    // If it has only one page, clear Pagination
    if (totalPage == 1) {
        jQ(this.selector.bottomPagination).html('');
        return false;
    }

    if (this.getSettingValue('general.paginationType') == 'default') {
        var paginationHtml = bcSfFilterTemplate.paginateHtml;

        // Build Previous
        var previousHtml = (currentPage > 1) ? bcSfFilterTemplate.previousActiveHtml : bcSfFilterTemplate.previousDisabledHtml;
        previousHtml = previousHtml.replace(/{{itemUrl}}/g, this.buildToolbarLink('page', currentPage, currentPage - 1));
        paginationHtml = paginationHtml.replace(/{{previous}}/g, previousHtml);

        // Build Next
        var nextHtml = (currentPage < totalPage) ? bcSfFilterTemplate.nextActiveHtml :  bcSfFilterTemplate.nextDisabledHtml;
        nextHtml = nextHtml.replace(/{{itemUrl}}/g, this.buildToolbarLink('page', currentPage, currentPage + 1));
        paginationHtml = paginationHtml.replace(/{{next}}/g, nextHtml);

        // Create page items array
        var beforeCurrentPageArr = [];
        for (var iBefore = currentPage - 1; iBefore > currentPage - 3 && iBefore > 0; iBefore--) {
            beforeCurrentPageArr.unshift(iBefore);
        }
        if (currentPage - 4 > 0) {
            beforeCurrentPageArr.unshift('...');
        }
        if (currentPage - 4 >= 0) {
            beforeCurrentPageArr.unshift(1);
        }
        beforeCurrentPageArr.push(currentPage);

        var afterCurrentPageArr = [];
        for (var iAfter = currentPage + 1; iAfter < currentPage + 3 && iAfter <= totalPage; iAfter++) {
            afterCurrentPageArr.push(iAfter);
        }
        if (currentPage + 3 < totalPage) {
            afterCurrentPageArr.push('...');
        }
        if (currentPage + 3 <= totalPage) {
            afterCurrentPageArr.push(totalPage);
        }

        // Build page items
        var pageItemsHtml = '';
        var pageArr = beforeCurrentPageArr.concat(afterCurrentPageArr);
        for (var iPage = 0; iPage < pageArr.length; iPage++) {
            if (pageArr[iPage] == '...') {
                pageItemsHtml += bcSfFilterTemplate.pageItemRemainHtml;
            } else {
                pageItemsHtml += (pageArr[iPage] == currentPage) ? bcSfFilterTemplate.pageItemSelectedHtml : bcSfFilterTemplate.pageItemHtml;
            }
            pageItemsHtml = pageItemsHtml.replace(/{{itemTitle}}/g, pageArr[iPage]);
            pageItemsHtml = pageItemsHtml.replace(/{{itemUrl}}/g, this.buildToolbarLink('page', currentPage, pageArr[iPage]));
        }
        paginationHtml = paginationHtml.replace(/{{pageItems}}/g, pageItemsHtml);

        jQ(this.selector.bottomPagination).html(paginationHtml);
    }
};

/************************** BUILD TOOLBAR **************************/

// Build Sorting
BCSfFilter.prototype.buildFilterSorting = function() {
    if (bcSfFilterTemplate.hasOwnProperty('sortingHtml')) {
        jQ(this.selector.topSorting).html('');

        var sortingArr = this.getSortingList();
        if (sortingArr) {
            // Build content 
            var sortingItemsHtml = '';
            for (var k in sortingArr) {
                sortingItemsHtml += '<option value="' + k +'">' + sortingArr[k] + '</option>';
            }
            var html = bcSfFilterTemplate.sortingHtml.replace(/{{sortingItems}}/g, sortingItemsHtml);
            jQ(this.selector.topSorting).html(html);

            // Set current value
            jQ(this.selector.topSorting + ' select').val(this.queryParams.sort);
        }
    }
};

// Build Display type (List / Grid / Collage)
/**************** Display Type (Grid / List) ****************/
BCSfFilter.prototype.buildFilterDisplayType = function() {
    // bc-sf-filter-top-display-type
    var itemHtml = '<a href="' + this.buildToolbarLink('display', 'list', 'grid') + '" title="Grid view" class="view-icon active grid bc-sf-filter-display-grid" data-view="grid"><span class="icon icon-th"></span></a>';
    itemHtml += '<a href="' + this.buildToolbarLink('display', 'grid', 'list') + '" title="List view" class="view-icon list bc-sf-filter-display-list" data-view="list"><span class="icon icon-th-list"></span></a>';
    jQ(this.selector.topDisplayType).html(itemHtml);
    
    // Active current display type
    jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-list').removeClass('active');
    jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-grid').removeClass('active');
    if (this.queryParams.display == 'list') { 
        jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-list').addClass('active');
        //jQ('#bc-sf-filter-products').addClass('row-view');
    } else if (this.queryParams.display == 'grid') {
        jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-grid').addClass('active');
        //jQ('#bc-sf-filter-products').removeClass('row-view');
    }
};

//Build Show Limit
BCSfFilter.prototype.buildFilterShowLimit = function() {
    if (bcSfFilterTemplate.hasOwnProperty('showLimitHtml')) {
        jQ(this.selector.topShowLimit).html('');

        var numberList = this.getSettingValue('general.showLimitList');
        if (numberList != '') {
            // Build content
            var showLimitItemsHtml = '';
            var arr = numberList.split(',');
            for (var k = 0; k < arr.length; k++) {
                showLimitItemsHtml += '<option value="' + arr[k] +'">' + arr[k] + '</option>';
            }
            var html = bcSfFilterTemplate.showLimitHtml.replace(/{{showLimitItems}}/g, showLimitItemsHtml);
            jQ(this.selector.topShowLimit).html(html);

            // Set value
            jQ(this.selector.topShowLimit + ' select').val(this.queryParams.limit);
        }
    }
};

/************************** END BUILD TOOLBAR **************************/

// Add additional feature for product list, used commonly in customizing product list
BCSfFilter.prototype.buildExtrasProductList = function(data, eventType) {
	$('[data-toggle="tooltip"]').tooltip();
   	quickView();
  	currency();
};

// Build additional elements
BCSfFilter.prototype.buildAdditionalElements = function(data, eventType) {
	var from = this.queryParams.page == 1 ? this.queryParams.page : (this.queryParams.page - 1) * this.queryParams.limit + 1;
    var to = from + data.products.length - 1;
    jQ('.bc-sf-filter-show-items').html('</span>' + bcSfFilterConfig.label.item + '</span> ' + from + ' ' + bcSfFilterConfig.label.to + ' ' + to + ' <span>' + bcSfFilterConfig.label.of + '</span> ' + data.total_product + ' ' + bcSfFilterConfig.label.items);
};
