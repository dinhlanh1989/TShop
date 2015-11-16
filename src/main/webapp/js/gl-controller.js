/**
 * Created by DangLanh on 11/3/2014.
 */

var sliderApp=angular.module('sliderApp',['dc.endlessScroll']);


function queryImg(){
    var images = [
        {
            src: 'images/slider4.jpg',
            title: 'TSHOP JEANS',
            price: 'Free Shipping on $100',
            content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, ' +
                'sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'
        },
        {
            src: 'images/slider0.jpg',
            title: 'TSHOP Girl',
            price: 'Free Shipping on $100',
            content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, ' +
                'sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'
        },
        {
            src: 'images/slider1.jpg',
            title: 'TSHOP COAST',
            price: 'Free Shipping on $100',
            content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, ' +
                'sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'
        },
        {
            src: 'images/slider3.jpg',
            title: 'TSHOP SHIT',
            price: 'Free Shipping on $100',
            content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, ' +
                'sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'
        },
        {
            src: 'images/slider4.jpg',
            title: 'TSHOP JEANS',
            price: 'Free Shipping on $100',
            content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, ' +
                'sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'
        },
        {
            src: 'images/slider4.jpg',
            title: 'TSHOP BOY',
            price: 'Free Shipping on $100',
            content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, ' +
                'sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'
        }

    ];
    images.forEach(function(image){
        image.active=false;
    });
    images[0].active=true;
    return images;
};


//config
sliderApp.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
});

// Service
sliderApp.factory('PostLoader', function($http, $q) {
    function PostLoader() {}

    PostLoader.prototype.init = function(params) {
        params = angular.extend({ page: 1 }, params);

        // Properties
        this.pagination = { perPage: 20, maxPages: 50 };
        this.posts = [];

        // Load the initial page, using the URL param if available
        return this.load(params.page);
    };

    PostLoader.prototype.load = function(page) {
        page = parseInt(page, 10);
        page = isNaN(page) ? 1 : page;

        var method = this.pagination.lastPage && page < this.pagination.lastPage ? 'unshift' : 'push';

        // Define the current page
        if (this.pagination.totalPages) {
            page = Math.min(Math.max(page, 1), this.pagination.totalPages);
        }

        // Only load a new page if it is not already loaded
        if ((page > this.pagination.lastPage || !this.pagination.lastPage) ||
            (page < this.pagination.firstPage || !this.pagination.firstPage)) {
            return this.get(page)
                .success(angular.bind(this, function(data) {
                    var response = data.response;

                    // Set the last page
                    if (!this.pagination.lastPage || page > this.pagination.lastPage) {
                        this.pagination.lastPage = page;
                    }

                    // Set the first page, if not already set
                    if (!this.pagination.firstPage || page < this.pagination.firstPage) {
                        this.pagination.firstPage = page;
                    }

                    // Determine the total number of pages
                    this.pagination.totalPages = Math.ceil(response.total_posts / this.pagination.perPage);

                    if (this.pagination.maxPages) {
                        this.pagination.totalPages = Math.min(this.pagination.totalPages, this.pagination.maxPages);
                    }

                    // Append or prepend the fetched posts, depending if they are posts from the next or previous page
                    this.posts[method].apply(this.posts, response.posts);

                    // Return the array of posts
                    return response.posts;
                }));
        } else {
            return $q.reject();
        }
    };

    PostLoader.prototype.next = function() {
        var page = !this.pagination.lastPage ? 1 : this.pagination.lastPage + 1;

        // Get the next page
        return this.load(page);
    };

    PostLoader.prototype.previous = function() {
        var page = !this.pagination.firstPage ? 1 : this.pagination.firstPage - 1;

        // Get the previous page
        return this.load(page);
    };

    PostLoader.prototype.get = function(page) {
        var url = 'http://api.tumblr.com/v2/blog/fuckyeahcats.tumblr.com/posts/photo',
            config = {
                params: {
                    api_key: 'z46iUTiovIf3N5KdioKhU2vvTBMWRHA8KLeIBruDnEHTXpiK8n',
                    jsonp: 'JSON_CALLBACK',
                    limit: this.pagination.perPage
                }
            };

        // Define the post number to start from
        config.params.offset = (page - 1) * config.params.limit;

        // Make a HTTP request
        return $http.jsonp(url, config);
    };

    return {
        create: function() {
            return new PostLoader();
        }
    };
});


sliderApp.controller('SliderController', function($scope, $http, $templateCache, $timeout, PostLoader) {

    var postLoader = PostLoader.create();

    // Private methods
    function onPageLoad() {
        $scope.posts = postLoader.posts;
        $scope.pagination = postLoader.pagination;
        $scope.loading = false;
    }

    function onPageLoadError() {
        $scope.loading = false;
    }

    // Scope methods
    $scope.nextPage = function() {
        $scope.loading = true;

        postLoader.next().then(onPageLoad, onPageLoadError);
    };

    $scope.previousPage = function() {
        $scope.loading = true;

        postLoader.previous().then(onPageLoad, onPageLoadError);
    };

    // Register event handlers
    $scope.$on('endlessScroll:next', $scope.nextPage);
    $scope.$on('endlessScroll:previous', $scope.previousPage);

    // Initialise
    var params = {
        page: $location.search().page
    };

    postLoader.init(params).then(onPageLoad);

    $scope.images1 = [
        {src: 'img/img1.jpg', title: 'Pic 1', visible: true},
        {src: 'img/img2.jpg', title: 'Pic 2', visible: false},
        {src: 'img/img3.jpg', title: 'Pic 3', visible: false},
        {src: 'img/img4.jpg', title: 'Pic 4', visible: false},
        {src: 'img/img5.jpg', title: 'Pic 5', visible: false}
    ];
    $scope.productList = [
        {
            name : 'aliquam erat volutpat' ,
            content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
            size : 'XL / XXL / S',
            price : '$25',
            oldPrice : '$75',
            discount : '15% OFF',
            new : 'NEW',
            link : 'GreenlightProductDetail.htm',
            img : 'images/30.jpg'
        },
        {
            name : 'aliquam erat volutpat' ,
            content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
            size : 'XL / XXL / S',
            price : '$25',
            oldPrice : '$75',
            discount : '15% OFF',
            new : 'NEW',
            link : 'GreenlightProductDetail.htm',
            img : 'images/30.jpg'
        },
        {
            name : 'aliquam erat volutpat' ,
            content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
            size : 'XL / XXL / S',
            price : '$25',
            oldPrice : '$75',
            discount : '15% OFF',
            new : 'NEW',
            link : 'GreenlightProductDetail.htm',
            img : 'images/30.jpg'
        },
        {
            name : 'aliquam erat volutpat' ,
            content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
            size : 'XL / XXL / S',
            price : '$25',
            oldPrice : '$75',
            discount : '15% OFF',
            new : 'NEW',
            link : 'GreenlightProductDetail.htm',
            img : 'images/30.jpg'
        },
        {
            name : 'aliquam erat volutpat' ,
            content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
            size : 'XL / XXL / S',
            price : '$25',
            oldPrice : '$75',
            discount : '15% OFF',
            new : 'NEW',
            link : 'GreenlightProductDetail.htm',
            img : 'images/30.jpg'
        },
        {
            name : 'aliquam erat volutpat' ,
            content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
            size : 'XL / XXL / S',
            price : '$25',
            oldPrice : '$75',
            discount : '15% OFF',
            new : 'NEW',
            link : 'GreenlightProductDetail.htm',
            img : 'images/30.jpg'
        },
        {
            name : 'aliquam erat volutpat' ,
            content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
            size : 'XL / XXL / S',
            price : '$25',
            oldPrice : '$75',
            discount : '15% OFF',
            new : 'NEW',
            link : 'GreenlightProductDetail.htm',
            img : 'images/30.jpg'
        },
        {
            name : 'aliquam erat volutpat' ,
            content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
            size : 'XL / XXL / S',
            price : '$25',
            oldPrice : '$75',
            discount : '15% OFF',
            new : 'NEW',
            link : 'GreenlightProductDetail.htm',
            img : 'images/30.jpg'
        }
    ];
    $scope.cartItems = [
        {
            productName : 'T Shirt Black',
            productSize : '12 x 1.5 L',
            productPrice : '$8.80',
            quantity : 'X 1',
            subtotal : '$8.80',
            img : 'images/3.jpg',
            link : 'GreenlightProductDetail.htm'
        },
        {
            productName : 'T Shirt Black',
            productSize : '12 x 1.5 L',
            productPrice : '$8.80',
            quantity : 'X 1',
            subtotal : '$8.80',
            img : 'images/3.jpg',
            link : 'GreenlightProductDetail.htm'
        },
        {
            productName : 'T Shirt Black',
            productSize : '12 x 1.5 L',
            productPrice : '$8.80',
            quantity : 'X 1',
            subtotal : '$8.80',
            img : 'images/3.jpg',
            link : 'GreenlightProductDetail.htm'
        },
        {
            productName : 'T Shirt Black',
            productSize : '12 x 1.5 L',
            productPrice : '$8.80',
            quantity : 'X 1',
            subtotal : '$8.80',
            img : 'images/3.jpg',
            link : 'GreenlightProductDetail.htm'
        },
        {
            productName : 'T Shirt Black',
            productSize : '12 x 1.5 L',
            productPrice : '$8.80',
            quantity : 'X 1',
            subtotal : '$8.80',
            img : 'images/3.jpg',
            link : 'GreenlightProductDetail.htm'
        },
        {
            productName : 'T Shirt Black',
            productSize : '12 x 1.5 L',
            productPrice : '$8.80',
            quantity : 'X 1',
            subtotal : '$8.80',
            img : 'images/3.jpg',
            link : 'GreenlightProductDetail.htm'
        }
    ];


    var timer;
    $scope.sliderFunc = function(){
        timer=$timeout(function(){
            var cartItem = {
                productName : 'T Shirt Blue',
                productSize : '12 x 1.5 L',
                productPrice : '$8.80',
                quantity : 'X 1',
                subtotal : '$8.80',
                img : 'images/4.jpg',
                link : 'GreenlightProductDetail.htm'
            };
            $scope.cartItems.push(cartItem);
            timer=$timeout($scope.sliderFunc,5000);
        },5000);
    };

    $scope.sliderFunc();

    $scope.loadMoreProduct = function(){
        for(var i = 0; i < 10; i++){
            var product = {
                name : 'aliquam erat volutpat' ,
                content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                size : 'XL / XXL / S',
                price : '$25',
                oldPrice : '$75',
                discount : '15% OFF',
                new : 'NEW',
                link : 'GreenlightProductDetail.htm',
                img : 'images/31.jpg'
            };

            $scope.productList.push(product);
        }
    };

    $scope.loadMoreProduct1 = function(){
        alert('hehe');
    };

    $scope.status = "";
    $scope.slideitems = [];
    //$scope.images = queryImg();

    function getImgJson(){
        $http.get('json/slide.json')
            .success(function(data, status, headers, config) {
                $scope.images = data.images;
                if($scope.images.length > 0){
                    $scope.images.forEach(function(image){
                        image.visible=false;
                    });
                    $scope.images[0].visible = true;
                }
                //alert(data.images.length)
                // this callback will be called asynchronously
                // when the response is available
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    };
    $scope.images=queryImg();
    $scope.showMsg = function(){
        alert("hello");
    };

});

sliderApp.directive('slider', function ($timeout) {
    return {
        restrict: 'AE',
        replace: true,
        scope:{
            images: '='
        },
        link: function (scope, elem, attrs) {

            scope.currentIndex=0;

            scope.next=function(){
                scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
            };

            scope.prev=function(){
                scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
            };

            scope.getActiveClassForSliderItem = function(index){
                return (scope.images[index].visible?"slider-item-active1":"slider-item-disabled");
            };

            scope.getActiveClassForThumbItem = function(index){
                return (scope.images[index].visible?"cycle-pager-active":"");
            };

            scope.goToSlide = function(index){
                scope.currentIndex = index;
            };

            scope.$watch('currentIndex',function(){
                if(scope.images.length > 0) {
                    scope.images.forEach(function (image) {
                        image.visible = false;
                    });
                    scope.images[scope.currentIndex].visible = true;
                }
            });

            /* Start: For Automatic slideshow*/

            var timer;

            var sliderFunc=function(){
                timer=$timeout(function(){
                    scope.next();

                    timer=$timeout(sliderFunc,5000);
                },5000);
            };

            sliderFunc();

            scope.$on('$destroy',function(){
                $timeout.cancel(timer);
            });

            /* End : For Automatic slideshow*/

        },
        templateUrl:'sliderTemplate1.html'
    }
});


//new enless-scroll
/**
 * @member dc.endlessScroll.endlessScroll
 *
 * @description
 * A directive for implementing an endless scrolling list.
 */
sliderApp.directive('endlessScroll', function($window, $timeout) {
    var NG_REPEAT_REGEXP = /^\s*(.+)\s+in\s+([\r\n\s\S]*?)\s*(\s+track\s+by\s+(.+)\s*)?$/;

    /**
     * @function throttle
     * @private
     * @param {Function} fn
     * @param {number} delay
     * @returns {Function}
     *
     * @description
     * Return a function that only gets executed once within a given time period.
     */
    function throttle(fn, delay) {
        var timeout,
            previous = 0;

        return function() {
            var current = new Date().getTime(),
                remaining = delay - (current - previous),
                args = arguments;

            if (remaining <= 0) {
                if (timeout) {
                    $timeout.cancel(timeout);
                }

                timeout = undefined;
                previous = current;

                fn.apply(this, args);
            } else if (!timeout) {
                timeout = $timeout(function() {
                    timeout = undefined;
                    previous = new Date().getTime();

                    fn.apply(this, args);
                }, remaining);
            }
        };
    }

    /**
     * @function parseNgRepeatExp
     * @private
     * @param {string} expression
     * @returns {Object}
     *
     * @description
     * Parse ngRepeat expression and
     * return the name of the loop variable, the collection and tracking expression
     */
    function parseNgRepeatExp(expression) {
        var matches = expression.match(NG_REPEAT_REGEXP);

        return {
            item: matches[1],
            collection: matches[2],
            trackBy: matches[3]
        };
    }

    /**
     * @constructor dc.endlessScroll.EndlessScroller
     * @param {Object} scope The scope of the directive.
     * @param {Object} element The element of the directive.
     * @param {Object} attrs The attributes of the directive.
     *
     * @description
     * The controller of endlessScroll directive.
     * Each directive creates an instance of EndlessScroller.
     */
    function EndlessScroller(scope, element, attrs) {
        var defaultOptions = {
            scrollOffset: -100,
            scrollThrottle: 300
        };

        // Priviledged properties
        this.scope = scope;
        this.attrs = attrs;
        this.element = $(element);
        this.options = angular.extend({}, defaultOptions, this.scope.$eval(this.attrs.endlessScrollOptions));
        this.docWindow = $($window);
        this.window = this.options.window ? $(this.options.window) : this.docWindow;
        this.dimension = { window: {}, parent: {}, items: [] };
        this.status = {};
        this.expression = parseNgRepeatExp(this.attrs.endlessScroll);

        // Watch for events and scope changes
        this._watch();
    }

    /**
     * @function dc.endlessScroll.EndlessScroller#check
     *
     * @description
     * Check to see if more items need to be fetched
     * by checking if the user has scrolled to the bottom or top.
     */
    EndlessScroller.prototype.check = function() {
        // Determine if scrolling up or down and if we reach the end of list or not
        angular.extend(this.status, this._getScrollStatus());

        // Determine window dimension
        this.dimension.window = this._getDimension('window');

        // Determine parent element dimension
        this.dimension.parent = this._getDimension('parent');

        // Clean up off-screen elements
        this.clean();

        // If scrolled to bottom, request more items
        if (this.status.isEndReached && this.status.isScrollingDown &&
            this.dimension.parent.bottom + this.options.scrollOffset <= this.dimension.window.bottom) {
            this.next();
        }

        // If scrolled to top, request more items
        if (this.status.isStartReached && this.status.isScrollingUp &&
            this.dimension.parent.top - this.options.scrollOffset >= this.dimension.window.top) {
            this.previous();
        }
    };

    /**
     * @function dc.endlessScroll.EndlessScroller#next
     *
     * @description
     * Request the next page of items by notifying its parent controller.
     */
    EndlessScroller.prototype.next = function() {
        if (!this.status.isPendingNext) {
            this._setPending('next', true);

            // Notify parent scope
            this.scope.$emit('endlessScroll:next', this);
        }
    };

    /**
     * @function dc.endlessScroll.EndlessScroller#previous
     *
     * @description
     * Request the previous page of items by notifying its parent controller.
     */
    EndlessScroller.prototype.previous = function() {
        if (!this.status.isPendingPrevious) {
            this._setPending('previous', true);

            // Notify parent scope
            this.scope.$emit('endlessScroll:previous', this);
        }
    };

    /**
     * @function dc.endlessScroll.EndlessScroller#update
     * @param {Array} collection A list of items bound to the directive.
     *
     * @description
     * Insert new items before or after a list of existing items and render them.
     */
    EndlessScroller.prototype.update = function(collection) {
        var beforeItems,
            afterItems,
            firstCommonItemIndex,
            lastCommonItemIndex,
            oldCollection,
            i,
            len;

        // KLUGE: collection == oldCollection before AngularJS 1.2.15
        oldCollection = this.previousOriginalItems;

        // Retain reference to original items
        this.originalItems = collection;

        // Get new items
        if (angular.isArray(collection) && angular.isArray(oldCollection)) {
            // Find first common item index
            for (i = 0, len = collection.length; i < len; i++) {
                if (collection[i] === oldCollection[0] && collection[i] !== undefined) {
                    firstCommonItemIndex = i;
                    break;
                }
            }

            // Find last common item index
            for (i = collection.length - 1; i >= 0; i--) {
                if (collection[i] === oldCollection[oldCollection.length - 1] && collection[i] !== undefined) {
                    lastCommonItemIndex = i;
                    break;
                }
            }

            if (firstCommonItemIndex) {
                beforeItems = collection.slice(0, firstCommonItemIndex);
            }

            if (lastCommonItemIndex) {
                afterItems = collection.slice(lastCommonItemIndex + 1);
            }
        }

        // Add to items
        if (!angular.isArray(this.items) || this.items.length === 0) {
            if (angular.isArray(collection)) {
                this.items = collection.slice();
            }
        } else {
            if (beforeItems) {
                this.items.unshift.apply(this.items, beforeItems);
            }

            if (afterItems) {
                this.items.push.apply(this.items, afterItems);
            }
        }

        // Previous collection
        if (angular.isArray(collection)) {
            this.previousOriginalItems = collection.slice();
        }

        // Flag status
        $timeout(angular.bind(this, function() {
            this._setPending('next', false);
            this._setPending('previous', false);

            // Perform check
            if (angular.isArray(collection) && angular.isArray(oldCollection)) {
                this.check();
            }
        }));
    };

    /**
     * @function dc.endlessScroll.EndlessScroller#clean
     *
     * @description
     * Remove items which are not visible in the viewport from DOM
     * and re-insert them when they become visible again.
     */
    EndlessScroller.prototype.clean = function() {
        var firstVisibleItemIndex,
            lastVisibleItemIndex,
            defaultPlaceholderAttrs,
            placeholderHeight,
            itemTagName,
            newItems,
            children,
            parent = this._getParent();

        // Set default placeholder attrs
        defaultPlaceholderAttrs = {
            visibility: 'hidden',
            padding: 0,
            border: 0
        };

        // Determine dimension of each repeated element
        this.dimension.items = this._getDimension('items');

        if (this.dimension.items && this.originalItems &&
            this.dimension.items.length === this.originalItems.length) {
            // Determine tag name
            children = this._getChildren();
            itemTagName = children.get(0) && children.prop('tagName').toLowerCase();

            // Determine first and last visible item
            angular.forEach(this.dimension.items, function(dimension, itemIndex) {
                var isVisible = dimension.bottom >= this.dimension.window.top - this.dimension.window.height &&
                    dimension.top <= this.dimension.window.bottom + this.dimension.window.height;

                // Set reference to item index
                if (isVisible) {
                    if (firstVisibleItemIndex === undefined) {
                        firstVisibleItemIndex = itemIndex;
                    }

                    lastVisibleItemIndex = itemIndex;
                }
            }, this);

            // Create placeholder
            if (!this.placeholder && itemTagName) {
                this.placeholder = $('<' + itemTagName + '>');

                // Insert placeholder before all items
                this.placeholder
                    .css(defaultPlaceholderAttrs)
                    .prependTo(parent);
            }

            // Calculate total space occupied by items before the first visible item
            if (this.placeholder) {
                if (angular.isDefined(firstVisibleItemIndex)) {
                    placeholderHeight = this.dimension.items[firstVisibleItemIndex].top - this.dimension.parent.top;
                } else {
                    placeholderHeight = 0;
                }

                this.placeholder.height(placeholderHeight);
            }

            // Add to items
            if (angular.isDefined(firstVisibleItemIndex) &&
                angular.isDefined(lastVisibleItemIndex) &&
                angular.isArray(this.items) &&
                angular.isArray(this.originalItems)) {
                newItems = this.originalItems.slice(firstVisibleItemIndex, lastVisibleItemIndex + 1);
                this.items.splice.apply(this.items, [0, this.items.length].concat(newItems));
            }
        }
    };

    /**
     * @function dc.endlessScroll.EndlessScroller#_watch
     * @protected
     *
     * @description
     * Watch for changes to scope properties and events fired by the scope and DOM
     */
    EndlessScroller.prototype._watch = function() {
        var collectionExp = this.expression.collection;

        if (collectionExp) {
            // Watch for data changes
            this.scope.$watchCollection(collectionExp, angular.bind(this, function watchCollection() {
                this.update.apply(this, arguments);
            }));

            // Watch for onScroll event
            this.window.on('scroll', this._boundOnScroll = angular.bind(this, this._onScroll));

            // Watch for $destroy event
            this.scope.$on('$destroy', angular.bind(this, this._unwatch));
        }
    };

    /**
     * @function dc.endlessScroll.EndlessScroller#_unwatch
     * @protected
     *
     * @description
     * Watch for changes to scope properties and events fired by the scope and DOM
     */
    EndlessScroller.prototype._unwatch = function() {
        if (this._boundOnScroll) {
            this.window.off('scroll', this._boundOnScroll);
        }
    };

    /**
     * @function dc.endlessScroll.EndlessScroller#_setPending
     * @protected
     * @param {string} type
     * @param {boolean} [bool=true]
     *
     * @description
     * Set a flag to indicate if the directive is pending for more items.
     */
    EndlessScroller.prototype._setPending = function(type, bool) {
        var attr = 'isPending' + type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

        this.status[attr] = angular.isUndefined(bool) ? true : !!bool;
        this.timeouts = this.timeouts || {};

        if (this.status[attr]) {
            if (this.timeouts[attr]) {
                $timeout.cancel(this.timeouts[attr]);
                delete this.timeouts[attr];
            }

            // Automatically set the wait status to false after a time period
            this.timeouts[attr] = $timeout(angular.bind(this, function() {
                this.status[attr] = false;
            }), 5000);
        }
    };

    /**
     * @function dc.endlessScroll.EndlessScroller#_onScroll
     * @protected
     *
     * @description
     * An event handler for scrolling.
     */
    EndlessScroller.prototype._onScroll = function() {
        this.scope.$apply(angular.bind(this, function() {
            // Define a throttled check method, if it's not already defined
            if (!this._throttledCheck) {
                this._throttledCheck = throttle(angular.bind(this, this.check), this.options.scrollThrottle);
            }

            // Check if there's a need to fetch more data
            this._throttledCheck();
        }));
    };

    /**
     * @function dc.endlessScroll.EndlessScroller#_getParent
     * @protected
     * @returns {Object} The parent element of the directive element.
     *
     * @description
     * Find the parent element of the directive and return it.
     */
    EndlessScroller.prototype._getParent = function() {
        if (!this._parent || !this._parent.get(0)) {
            this._parent = this.element.parent();
        }

        return this._parent;
    };

    /**
     * @function dc.endlessScroll.EndlessScroller#_getOffsetTop
     * @protected
     * @returns {Number} The offset top of an element relative to the document
     *
     * @description
     * Get the offset top of an element
     */
    EndlessScroller.prototype._getOffsetTop = function(element) {
        var offset = element.offset();

        if (this.window.get(0) === $window) {
            return offset.top;
        } else {
            return offset.top + this.window.scrollTop() - this.docWindow.scrollTop();
        }
    };

    /**
     * @function dc.endlessScroll.EndlessScroller#_getDimension
     * @protected
     * @param {string} type
     */
    EndlessScroller.prototype._getDimension = function(type) {
        var height,
            top,
            bottom,
            parent = this._getParent();

        switch(type) {
            case 'window':
                height = this.window.outerHeight();
                top    = this.window.scrollTop();
                bottom = top + height;

                return {
                    height: height,
                    top:    top,
                    bottom: bottom
                };

            case 'parent':
                height = parent.outerHeight();
                top    = parent.get(0) && this._getOffsetTop(parent);
                bottom = top + height;

                return {
                    height: height,
                    top:    top,
                    bottom: bottom
                };

            case 'items':
                var itemIndex,
                    items = this.dimension.items.slice();

                this._getChildren()
                    .each(angular.bind(this, function(i, child) {
                        child = $(child);
                        height = child.outerHeight();
                        top = child.get(0) && this._getOffsetTop(child);
                        bottom = top + height;
                        itemIndex = $.inArray(child.scope()[this.expression.item], this.originalItems);

                        // Set reference to the dimension of each visible element
                        if (itemIndex > -1) {
                            items[itemIndex] = {
                                height: height,
                                top: top,
                                bottom: bottom
                            };
                        }
                    }));

                return items;
        }
    };

    /**
     * @function dc.endlessScroll.EndlessScroller#_getScrollStatus
     * @protected
     * @returns {Object} An object containing information about the scroll status of the directive element.
     */
    EndlessScroller.prototype._getScrollStatus = function() {
        var windowTop = this.window.scrollTop(),
            status = {};

        if (this.dimension.window.top > 0) {
            status.isScrollingUp = windowTop - this.dimension.window.top < 0;
            status.isScrollingDown = windowTop - this.dimension.window.top > 0;
        } else {
            status.isScrollingUp = false;
            status.isScrollingDown = true;
        }

        if (angular.isArray(this.items) && angular.isArray(this.originalItems)) {
            status.isEndReached = this.items[this.items.length - 1] === this.originalItems[this.originalItems.length - 1];
            status.isStartReached = this.items[0] === this.originalItems[0];
        } else {
            status.isEndReached = true;
            status.isStartReached = false;
        }

        return status;
    };

    /**
     * @function dc.endlessScroll.EndlessScroller#_getChildren
     * @protected
     * @returns The child elements of the directive element. It is the list of items which are currently rendered in DOM.
     */
    EndlessScroller.prototype._getChildren = function() {
        var selector = '[ng-repeat]';

        return this._getParent().children(selector);
    };

    /**
     * @constructor dc.endlessScroll.EndlessScrollerTemplate
     * @param {Object} element The directive element.
     * @param {Object} attrs The directive attributes.
     *
     * @description
     * The template of endlessScroll directive.
     */
    function EndlessScrollerTemplate(element, attrs) {
        this.html = this._create(element, attrs);
    }

    /**
     * @function dc.endlessScroll.EndlessScrollerTemplate#toString
     * @returns {String} The template element as HTML string
     */
    EndlessScrollerTemplate.prototype.toString = function() {
        return this.html;
    };

    /**
     * @function dc.endlessScroll.EndlessScrollerTemplate#_create
     * @param element {Object}
     * @param attrs {Object}
     * @returns {String} The template element as HTML string
     *
     * @description
     * Create a template element for the directive.
     */
    EndlessScrollerTemplate.prototype._create = function(element, attrs) {
        var elementAttrs = Array.prototype.slice.call(element.prop('attributes'), 0),
            parsedExp = parseNgRepeatExp(attrs.endlessScroll),
            ngRepeatExp = parsedExp.item + ' in _endlessScroll.items' + (parsedExp.trackBy ? ' ' + parsedExp.trackBy : '');

        // Remove all element attributes as 'replace' already copies over these attributes
        angular.forEach(elementAttrs, function(attr) {
            element.removeAttr(attr.name);
        });

        // Retain reference to the original repeat expression
        element.attr('ng-repeat', ngRepeatExp);

        return element.prop('outerHTML');
    };

    return {
        restrict: 'A',
        scope: true,
        replace: true,

        template: function(element, attrs) {
            return (new EndlessScrollerTemplate(element, attrs)).toString();
        },

        controller: function($scope, $element, $attrs) {
            return new EndlessScroller($scope, $element, $attrs);
        },

        link: function(scope, element, attrs, controller) {
            scope._endlessScroll = controller;
        }
    };
});






