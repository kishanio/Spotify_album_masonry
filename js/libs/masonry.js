/*!
 * Spotify Like Masonry v1.0
 * Album grid masonry one found on spotify.com
 * MIT License
 * by Kishan Thobhani (@kishanio)
 */


ui = function (a) {
    return {
        applyCss: function (b, a, c) {
            var d = [],
                f = (c.x || 0) | 0,
                g = (c.y || 0) | 0;
            if (0 != f || 0 != g) d = a.csstransforms3d ? d.concat(["-webkit-transform: translate3d(" + f + "px, " + g + "px, 0)", "-moz-transform: translate3d(" + f + "px, " + g + "px, 0)", "-o-transform: translate3d(" + f + "px, " + g + "px, 0)", "-ms-transform: translate3d(" + f + "px, " + g + "px, 0)"]) : a.csstransforms ? d.concat(["-webkit-transform: translateX(" + f + "px) translateY(" + g + "px)", "-moz-transform: translateX(" + f + "px) translateY(" + g + "px)", "-o-transform: translateX(" + f + "px) translateY(" + g + "px)", "-ms-transform: translateX(" + f + "px) translateY(" + g + "px)"]) : d.concat(["position: absolute", "left: " + f + "px", "top: " + g + "px"]);
            c.width && d.push("width: " + (c.width | 0) + "px");
            c.height && d.push("height: " + (c.height | 0) + "px");
            c.visibility && d.push("visibility: " + c.visibility);
            c.border && d.push("border: " + c.border);
            b.style.cssText = d.join(";");

        },
        applyCssGetSupportedFeatures: function () {
            return window.Modernizr ? {
                csstransforms3d: Modernizr.csstransforms3d,
                csstransforms: Modernizr.csstransforms
            } : {
                csstransforms3d: !1,
                csstransforms: !1
            }
        },

    }
}(jQuery);


var masonry = function (b) {
    return {
        init: function (container,images,size) {
            masonry.artworkStrip.init(container, images, size);
        },
        artworkStrip: {
            init: function (c, a, d) {

                this.SMALL_TILE_SIZE = d;
                this.STRIP_OFFSET_TOP = 3 * d;
                this.inner = b(c);
                this.artwork = a;
                this.artworkCount = Math.floor(Math.random() * this.artwork.length);
                this.supportedFeatures = ui.applyCssGetSupportedFeatures();
                this.tiles = [];
                this.grid = [];
                this.currentMinY = -2;
                this.currentMaxY = 1;
                this.currentX = 0;
                this.currentXLarge = this.random(0, 2);
                this.previousDeltaMinY = this.previousDeltaMaxY = 0;
                this.redrawTiles(c);
                var e = this;
                b(window).resize(function () {
                    e.redrawTiles(c)
                });
                return this
            },
            redrawTiles: function (c) {
                ui.applyCss(this.inner[0], this.supportedFeatures, {
                    y: b($(c).parent()).offset().top +50 + b($(c).parent()).outerHeight() - this.inner.height()  / 2,
                    width: b(window).width()
                });
                var c = Math.floor(b(window).width() / this.SMALL_TILE_SIZE) + 1;
                console.log(c);
                c > this.currentX && this.drawTiles(c)
            },
            drawTiles: function (c) {
                for (; this.currentX < c; this.currentX++) {
                    if (this.currentXLarge == this.currentX) {
                        for (var a = masonry.artworkStrip.tile.init(this, this.currentXLarge, this.random(-2, 0), 3); !a.unique();) a.x++, this.currentXLarge++;
                        a.add();
                        this.currentXLarge += this.random(5, 8)
                    }
                    for (var b = this.currentMinY; b < this.currentMaxY; b++) if (null == this.grid[this.currentX] || null == this.grid[this.currentX][b]) a = 1, 0.8 > Math.random() && b < this.currentMaxY - 1 && (a = 2), a = masonry.artworkStrip.tile.init(this, this.currentX, b, a), a.unique() || (a = masonry.artworkStrip.tile.init(this,
                    this.currentX, b, 1)), a.add();
                    if (-1 != this.previousDeltaMinY) {
                        a = b = 0;
                        do b = this.random(-1, 1), a = this.currentMinY + b;
                        while (-4 > a || -1 < a || 3 > this.currentMaxY - a || 4 < this.currentMaxY - a);
                        this.currentMinY = a;
                        this.previousDeltaMinY = b
                    } else this.previousDeltaMinY = 0;
                    if (1 != this.previousDeltaMaxY) {
                        a = b = 0;
                        do b = this.random(-1, 1), a = this.currentMaxY + b;
                        while (3 < a || 1 > a || 3 > a - this.currentMinY || 4 < a - this.currentMinY);
                        this.currentMaxY = a;
                        this.previousDeltaMaxY = b
                    } else this.previousDeltaMaxY = 0
                }
            },
            random: function (b, a) {
                return Math.floor(Math.random() * (a - b + 1)) + b
            },
            isColumnFull: function (b, a, d) {
                for (; a < d; a++) if (null == this.grid[b] || null == this.grid[b][a]) return !1;
                return !0
            },
            tile: {
                init: function (b, a, d, e) {
                    this.strip = b;
                    this.x = a;
                    this.y = d;
                    this.size = e;
                    return this;
                },
                unique: function () {
                    for (var b = 0; b < this.size; b++) for (var a = 0; a < this.size; a++) {
                        var d = this.x + b,
                            e = this.y + a;
                        if (null != this.strip.grid[d] && null != this.strip.grid[d][e]) return !1
                    }
                    return !0;
                },
                add: function () {
                    this.strip.tiles.push(this);
                    for (var b = 0; b < this.size; b++) for (var a = 0; a < this.size; a++) {
                        var d = this.x + b,
                            e = this.y + a;
                        null == this.strip.grid[d] && (this.strip.grid[d] = {});
                        this.strip.grid[d][e] = this;
                    }
                    this.draw();
                },
                draw: function () {
                    this.div = b("<img />");
                    this.div.addClass("artwork-strip-tile");

                    this.div.attr("src",this.strip.artwork[this.strip.artworkCount]);
                    this.strip.artworkCount += 5;
                    this.strip.artworkCount >= this.strip.artwork.length && (this.strip.artworkCount = 0);
                    ui.applyCss(this.div[0], this.strip.supportedFeatures, {
                        x: this.strip.SMALL_TILE_SIZE * this.x,
                        y: this.strip.SMALL_TILE_SIZE * this.y + this.strip.STRIP_OFFSET_TOP,
                        width: this.strip.SMALL_TILE_SIZE * this.size,
                        height: this.strip.SMALL_TILE_SIZE * this.size,
                        border: "2px solid #333",
                        backgroundImageUrl: this.strip.artwork[this.strip.artworkCount],
                    });
                    this.strip.inner.append(this.div);
                },
            },
        },
    }
}(jQuery);