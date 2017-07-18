"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var top_category_DTO_1 = require("./top.category.DTO");
var link_1 = require("./link");
var link_category_DTO_1 = require("./link.category.DTO");
var public_deck_DTO_1 = require("./public.deck.DTO");
var public_course_DTO_1 = require("./public.course.DTO");
var public_categories_1 = require("./public.categories");
var DTOConverter = (function () {
    function DTOConverter() {
    }
    DTOConverter.jsonToPublicCourse = function (data) {
        var self = DTOConverter.jsonToLink("self", data._links.self);
        return new public_course_DTO_1.CoursePublic(data.name, data.description, self);
    };
    DTOConverter.jsonToPublicDeck = function (data) {
        var self = DTOConverter.jsonToLink("self", data._links.self);
        return new public_deck_DTO_1.DeckPublic(data.name, data.description, self);
    };
    DTOConverter.jsonToTopCategory = function (data) {
        var self = DTOConverter.jsonToLink("self", data._links.self);
        return new top_category_DTO_1.CategoryTop(data.name, data.imagebase64, self);
    };
    DTOConverter.jsonToPublicCategories = function (data) {
        var self = DTOConverter.jsonToLink("self", data._links.self);
        return new public_categories_1.CategoriesPublic(data.name, data.description, data.imagebase64, self);
    };
    DTOConverter.jsonToPublicCategory = function (data) {
        var self = DTOConverter.jsonToLink("self", data._links.self);
        var courses = DTOConverter.jsonToLink("courses", data._links.courses);
        var decks = DTOConverter.jsonToLink("decks", data._links.decks);
        return new link_category_DTO_1.CategoryLink(data.name, data.description, data.imagebase64, self, decks, courses);
    };
    DTOConverter.jsonToLink = function (rel, data) {
        return new link_1.Link(rel, data.href);
    };
    DTOConverter.jsonArrayToCollection = function (callback, data) {
        var array = [];
        data.forEach(function (element) {
            array.push(callback(element));
        });
        return array;
    };
    return DTOConverter;
}());
exports.DTOConverter = DTOConverter;
//# sourceMappingURL=dto.Converter.js.map